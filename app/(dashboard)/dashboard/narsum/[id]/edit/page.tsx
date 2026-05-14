import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { editLog } from "../../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function EditLogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const authClient = await createClient()
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) redirect("/login")

  const supabase = createAdminClient()
  const { data: log } = await supabase.from("log_narsum").select("*").eq("id", id).single()

  if (!log) notFound()
  if (log.created_by !== user.id && !(await isAdmin())) redirect("/dashboard/narsum")

  const action = editLog.bind(null, id)

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/narsum">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Log Narasumber</h1>
      </div>

      <FormAlert />

      <form action={action} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Tanggal *</label>
            <input name="tanggal" type="date" required defaultValue={log.tanggal} className={input} />
          </div>
          <div>
            <label className={label}>Sub-unit *</label>
            <select name="sub_unit" required defaultValue={log.sub_unit} className={input}>
              <option value="">Pilih sub-unit</option>
              <option value="sembalun">Sembalun</option>
              <option value="sajang">Sajang</option>
              <option value="bersama">Keduanya</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Nama Narasumber *</label>
            <input name="nama_narsum" required defaultValue={log.nama_narsum} className={input} />
          </div>
          <div>
            <label className={label}>Jabatan</label>
            <input name="jabatan" defaultValue={log.jabatan ?? ""} className={input} />
          </div>
        </div>

        <div>
          <label className={label}>Institusi / Organisasi</label>
          <input name="institusi" defaultValue={log.institusi ?? ""} className={input} />
        </div>

        <div>
          <label className={label}>Topik Pembahasan *</label>
          <textarea
            name="topik"
            required
            rows={3}
            defaultValue={log.topik}
            className={input + " resize-none"}
          />
        </div>

        <div>
          <label className={label}>Hasil / Kesimpulan</label>
          <textarea
            name="hasil"
            rows={4}
            defaultValue={log.hasil ?? ""}
            className={input + " resize-none"}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton>Simpan Perubahan</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/narsum">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
