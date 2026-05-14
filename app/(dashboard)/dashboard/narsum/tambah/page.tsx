import Link from "next/link"
import { Button } from "@/components/ui/button"
import { tambahLog } from "../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default function TambahLogPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/narsum">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Log Narasumber</h1>
      </div>

      <form action={tambahLog} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Tanggal *</label>
            <input name="tanggal" type="date" required className={input} />
          </div>
          <div>
            <label className={label}>Sub-unit *</label>
            <select name="sub_unit" required className={input}>
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
            <input name="nama_narsum" required className={input} placeholder="Nama lengkap" />
          </div>
          <div>
            <label className={label}>Jabatan</label>
            <input name="jabatan" className={input} placeholder="Mis: Kepala Desa" />
          </div>
        </div>

        <div>
          <label className={label}>Institusi / Organisasi</label>
          <input name="institusi" className={input} placeholder="Mis: Pemerintah Desa Sembalun" />
        </div>

        <div>
          <label className={label}>Topik Pembahasan *</label>
          <textarea
            name="topik"
            required
            rows={3}
            className={input + " resize-none"}
            placeholder="Topik utama yang dibahas dalam pertemuan"
          />
        </div>

        <div>
          <label className={label}>Hasil / Kesimpulan</label>
          <textarea
            name="hasil"
            rows={4}
            className={input + " resize-none"}
            placeholder="Hasil, kesepakatan, atau tindak lanjut dari pertemuan (opsional)"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Simpan Log</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/narsum">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
