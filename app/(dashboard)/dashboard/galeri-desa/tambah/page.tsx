import Link from "next/link"
import { Button } from "@/components/ui/button"
import { tambahFotoDesa } from "../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default function TambahFotoDesaPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/galeri-desa">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Foto Desa</h1>
      </div>

      <form
        action={tambahFotoDesa}
        className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6"
      >
        <div>
          <label className={label}>Foto *</label>
          <input
            name="foto"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            className={
              input +
              " cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-muted file:px-3 file:py-1 file:text-xs file:font-medium file:text-foreground"
            }
          />
          <p className="mt-1 text-xs text-muted-foreground">Format: JPG, PNG, atau WebP.</p>
        </div>

        <div>
          <label className={label}>Deskripsi Foto (Alt Text) *</label>
          <input
            name="alt"
            required
            className={input}
            placeholder="Mis: Hamparan ladang bawang merah di lereng Rinjani"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Deskripsi singkat isi foto — digunakan untuk aksesibilitas.
          </p>
        </div>

        <div>
          <label className={label}>Keterangan</label>
          <input
            name="keterangan"
            className={input}
            placeholder="Keterangan yang ditampilkan di bawah foto (opsional)"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Upload Foto</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/galeri-desa">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
