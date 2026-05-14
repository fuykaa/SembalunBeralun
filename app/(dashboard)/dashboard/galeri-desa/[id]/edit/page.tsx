import Link from "next/link"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { editFotoDesa } from "../../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function EditFotoDesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!(await isAdmin())) redirect("/dashboard/galeri-desa")

  const supabase = createAdminClient()
  const { data: foto } = await supabase
    .from("galeri")
    .select("*")
    .eq("id", id)
    .eq("tipe", "desa")
    .single()

  if (!foto) notFound()

  const action = editFotoDesa.bind(null, id)

  return (
    <div className="max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/galeri-desa">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Foto Desa</h1>
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
            className="w-full object-cover"
          />
        </div>

        <div>
          <label className={label}>Keterangan Foto *</label>
          <input
            name="keterangan"
            required
            defaultValue={foto.keterangan ?? foto.alt}
            className={input}
            placeholder="Mis: Hamparan ladang bawang merah di lereng Rinjani"
          />
        </div>

        <div>
          <label className={label}>Ganti Foto</label>
          <input
            name="foto"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className={
              input +
              " cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-xs file:font-medium file:text-foreground"
            }
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Kosongkan jika tidak ingin mengganti foto. Maks. 5 MB.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton>Simpan Perubahan</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/galeri-desa">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
