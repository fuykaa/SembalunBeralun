import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
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

      <FormAlert />

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
          <label className={label}>Keterangan Foto *</label>
          <input
            name="keterangan"
            required
            className={input}
            placeholder="Mis: Hamparan ladang bawang merah di lereng Rinjani"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <SubmitButton>Upload Foto</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/galeri-desa">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
