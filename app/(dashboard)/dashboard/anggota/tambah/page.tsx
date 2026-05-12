import Link from "next/link"
import { Button } from "@/components/ui/button"
import { tambahAnggota } from "../actions"

const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default function TambahAnggotaPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/anggota">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Anggota</h1>
      </div>

      <form action={tambahAnggota} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Nama Lengkap *</label>
            <input name="nama" required className={input} placeholder="Nama lengkap" />
          </div>
          <div>
            <label className={label}>Nama Panggilan</label>
            <input name="nama_panggilan" className={input} placeholder="Opsional" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Sub-unit *</label>
            <select name="sub_unit" required className={input}>
              <option value="">Pilih sub-unit</option>
              <option value="sembalun">Sembalun</option>
              <option value="sajang">Sajang</option>
            </select>
          </div>
          <div>
            <label className={label}>Jabatan</label>
            <input name="jabatan" className={input} placeholder="Mis: Koordinator Mahasiswa" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Fakultas *</label>
            <input name="fakultas" required className={input} placeholder="Nama fakultas" />
          </div>
          <div>
            <label className={label}>Jurusan *</label>
            <input name="jurusan" required className={input} placeholder="Nama jurusan/prodi" />
          </div>
        </div>

        <div>
          <label className={label}>Angkatan *</label>
          <input name="angkatan" type="number" required className={input} placeholder="Mis: 2022" min="2000" max="2030" />
        </div>

        <div>
          <label className={label}>Bio</label>
          <textarea name="bio" rows={3} className={input + " resize-none"} placeholder="Deskripsi singkat (opsional)" />
        </div>

        <div>
          <label className={label}>Path Foto</label>
          <input name="foto_path" className={input} placeholder="/images/tim/nama-file.jpg" />
          <p className="mt-1 text-xs text-muted-foreground">Upload foto ke /public/images/tim/ lalu isi path-nya di sini.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={label}>Instagram</label>
            <input name="instagram" className={input} placeholder="username (tanpa @)" />
          </div>
          <div>
            <label className={label}>LinkedIn</label>
            <input name="linkedin" className={input} placeholder="username" />
          </div>
          <div>
            <label className={label}>Email Pribadi</label>
            <input name="email" type="email" className={input} placeholder="email@domain.com" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Simpan Anggota</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/anggota">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
