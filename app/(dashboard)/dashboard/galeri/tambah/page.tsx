import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { GaleriTimInput } from "@/components/dashboard/galeri-tim-input"
import { tambahFoto } from "../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default function TambahFotoPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/galeri">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Foto</h1>
      </div>

      <FormAlert />

      <form
        action={tambahFoto}
        className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6"
      >
        <div>
          <label className={label}>Foto *</label>
          <GaleriTimInput />
        </div>

        <div>
          <label className={label}>Keterangan Foto *</label>
          <input
            name="keterangan"
            required
            className={input}
            placeholder="Mis: Anggota KKN bersama petani bawang di ladang Sembalun"
          />
        </div>

        <div>
          <label className={label}>Kategori</label>
          <select name="kategori" className={input}>
            <option value="">Semua / Umum</option>
            <option value="sembalun">Sub-unit Sembalun</option>
            <option value="sajang">Sub-unit Sajang</option>
            <option value="bersama">Kegiatan Bersama</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton>Upload Foto</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/galeri">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
