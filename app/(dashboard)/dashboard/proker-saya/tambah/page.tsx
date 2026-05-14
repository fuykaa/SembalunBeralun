import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { createAdminClient } from "@/lib/supabase/admin"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/dashboard/submit-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { tambahProkerSaya } from "../actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function TambahProkerSayaPage() {
  const anggota = await getCurrentAnggota()
  if (!anggota) redirect("/dashboard/profil/klaim")

  const supabase = createAdminClient()
  const { count } = await supabase
    .from("proker_anggota")
    .select("*", { count: "exact", head: true })
    .eq("anggota_id", anggota.id)

  if ((count ?? 0) >= 5) redirect("/dashboard/proker-saya")

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/proker-saya">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tambah Proker</h1>
      </div>

      <FormAlert />

      <form
        action={tambahProkerSaya}
        className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6"
      >
        <div>
          <label className={label}>Nama Program Kerja *</label>
          <input name="nama" required className={input} placeholder="Nama program kerja" />
        </div>

        <div>
          <label className={label}>Deskripsi</label>
          <textarea
            name="deskripsi"
            rows={3}
            className={input + " resize-none"}
            placeholder="Deskripsi singkat (opsional)"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Pilar *</label>
            <select name="pilar" required className={input}>
              <option value="">Pilih pilar</option>
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
          <SubmitButton>Simpan</SubmitButton>
          <Button asChild variant="outline">
            <Link href="/dashboard/proker-saya">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
