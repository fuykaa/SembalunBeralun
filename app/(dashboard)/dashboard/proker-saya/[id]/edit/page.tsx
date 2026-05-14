import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { createAdminClient } from "@/lib/supabase/admin"
import { Button } from "@/components/ui/button"
import { editProkerSaya } from "../../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function EditProkerSayaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const anggota = await getCurrentAnggota()
  if (!anggota) redirect("/dashboard/profil/klaim")

  const supabase = createAdminClient()
  const { data: proker } = await supabase
    .from("proker_anggota")
    .select("*")
    .eq("id", id)
    .single()

  if (!proker) notFound()
  if (proker.anggota_id !== anggota.id) redirect("/dashboard/proker-saya")

  const action = editProkerSaya.bind(null, id)

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/proker-saya">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Proker</h1>
      </div>

      <form
        action={action}
        className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6"
      >
        <div>
          <label className={label}>Nama Program Kerja *</label>
          <input name="nama" required defaultValue={proker.nama} className={input} />
        </div>

        <div>
          <label className={label}>Deskripsi</label>
          <textarea
            name="deskripsi"
            rows={3}
            defaultValue={proker.deskripsi ?? ""}
            className={input + " resize-none"}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Pilar *</label>
            <select name="pilar" required defaultValue={proker.pilar} className={input}>
              <option value="agrowisata">Agrowisata</option>
              <option value="pemberdayaan">Pemberdayaan</option>
              <option value="digital">Digital</option>
              <option value="pendidikan">Pendidikan</option>
            </select>
          </div>
          <div>
            <label className={label}>Status *</label>
            <select name="status" required defaultValue={proker.status} className={input}>
              <option value="direncanakan">Direncanakan</option>
              <option value="berjalan">Sedang Berjalan</option>
              <option value="terlaksana">Terlaksana</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Simpan Perubahan</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/proker-saya">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
