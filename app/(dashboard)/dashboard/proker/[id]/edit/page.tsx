import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { editProker } from "../../actions"

const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function EditProkerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!(await isAdmin())) redirect("/dashboard")

  const supabase = createAdminClient()
  const { data: proker } = await supabase
    .from("proker")
    .select("*")
    .eq("id", id)
    .single()

  if (!proker) notFound()

  const action = editProker.bind(null, id)

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/proker">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Program Kerja</h1>
      </div>

      <FormAlert />

      <form action={action} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div>
          <label className={label}>Nama Program Kerja *</label>
          <input name="nama" required defaultValue={proker.nama} className={input} />
        </div>

        <div>
          <label className={label}>Deskripsi *</label>
          <textarea name="deskripsi" required rows={4} defaultValue={proker.deskripsi} className={input + " resize-none"} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={label}>Sub-unit *</label>
            <select name="sub_unit" required defaultValue={proker.sub_unit} className={input}>
              <option value="sembalun">Sembalun</option>
              <option value="sajang">Sajang</option>
              <option value="bersama">Bersama</option>
            </select>
          </div>
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
          <SubmitButton>Simpan Perubahan</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/proker">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
