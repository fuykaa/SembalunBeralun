import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { tambahProker } from "../actions"

const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function TambahProkerPage() {
  if (!(await isAdmin())) redirect("/dashboard")
  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/proker">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Program Kerja</h1>
      </div>

      <form action={tambahProker} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div>
          <label className={label}>Nama Program Kerja *</label>
          <input name="nama" required className={input} placeholder="Nama program kerja" />
        </div>

        <div>
          <label className={label}>Deskripsi *</label>
          <textarea name="deskripsi" required rows={4} className={input + " resize-none"} placeholder="Deskripsi singkat program kerja" />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={label}>Sub-unit *</label>
            <select name="sub_unit" required className={input}>
              <option value="">Pilih</option>
              <option value="sembalun">Sembalun</option>
              <option value="sajang">Sajang</option>
              <option value="bersama">Bersama</option>
            </select>
          </div>
          <div>
            <label className={label}>Pilar *</label>
            <select name="pilar" required className={input}>
              <option value="">Pilih</option>
              <option value="agrowisata">Agrowisata</option>
              <option value="pemberdayaan">Pemberdayaan</option>
              <option value="digital">Digital</option>
              <option value="pendidikan">Pendidikan</option>
            </select>
          </div>
          <div>
            <label className={label}>Status *</label>
            <select name="status" required className={input}>
              <option value="direncanakan">Direncanakan</option>
              <option value="berjalan">Sedang Berjalan</option>
              <option value="terlaksana">Terlaksana</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Simpan Program Kerja</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/proker">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
