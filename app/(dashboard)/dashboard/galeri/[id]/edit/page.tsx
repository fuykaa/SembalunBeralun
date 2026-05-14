import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { GaleriTimInput } from "@/components/dashboard/galeri-tim-input"
import { editFoto } from "../../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function EditFotoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const authClient = await createClient()
  const {
    data: { user },
  } = await authClient.auth.getUser()
  if (!user) redirect("/login")

  const supabase = createAdminClient()
  const { data: foto } = await supabase
    .from("galeri")
    .select("*")
    .eq("id", id)
    .eq("tipe", "tim")
    .single()

  if (!foto) notFound()

  const admin = await isAdmin()
  if (foto.created_by !== user.id && !admin) redirect("/dashboard/galeri")

  const action = editFoto.bind(null, id)

  return (
    <div className="max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/galeri">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Foto</h1>
      </div>

      <FormAlert />

      <form action={action} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        {/* Preview foto saat ini */}
        <div className="overflow-hidden rounded-lg">
          <Image
            src={foto.url}
            alt={foto.alt}
            width={400}
            height={400}
            unoptimized
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <label className={label}>Keterangan Foto *</label>
          <input
            name="keterangan"
            required
            defaultValue={foto.keterangan ?? foto.alt}
            className={input}
            placeholder="Mis: Anggota KKN bersama petani bawang di ladang Sembalun"
          />
        </div>

        <div>
          <label className={label}>Kategori</label>
          <select name="kategori" defaultValue={foto.kategori ?? ""} className={input}>
            <option value="">Semua / Umum</option>
            <option value="sembalun">Sub-unit Sembalun</option>
            <option value="sajang">Sub-unit Sajang</option>
            <option value="bersama">Kegiatan Bersama</option>
          </select>
        </div>

        <div>
          <label className={label}>Ganti Foto</label>
          <GaleriTimInput currentFoto={foto.url} />
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton>Simpan Perubahan</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/galeri">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
