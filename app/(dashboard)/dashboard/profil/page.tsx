import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { FotoProfilInput } from "@/components/dashboard/foto-profil-input"
import { updateProfil } from "./actions"

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function ProfilPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const anggota = await getCurrentAnggota()

  if (!anggota) {
    return (
      <div className="max-w-xl">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground">Profil Saya</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Akun Google-mu belum terhubung ke data anggota. Klaim profilmu terlebih dahulu.
        </p>
        <Button asChild>
          <Link href="/dashboard/profil/klaim">Klaim Profil Saya</Link>
        </Button>
      </div>
    )
  }

  const action = updateProfil.bind(null, anggota.id)

  return (
    <div className="max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">Profil Saya</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Halo, <strong>{anggota.nama}</strong>. Kamu bisa mengubah info di bawah ini.
        Data struktural (nama lengkap, sub-unit, fakultas) hanya bisa diubah oleh admin.
      </p>

      <div className="mb-6 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-muted-foreground">
          <span>Nama lengkap</span>
          <span className="font-medium text-foreground">{anggota.nama}</span>
          <span>Sub-unit</span>
          <span className="font-medium capitalize text-foreground">{anggota.sub_unit}</span>
          <span>Fakultas</span>
          <span className="font-medium text-foreground">{anggota.fakultas}</span>
          <span>Jurusan</span>
          <span className="font-medium text-foreground">{anggota.jurusan}</span>
          {anggota.jabatan && (
            <>
              <span>Jabatan</span>
              <span className="font-medium text-foreground">{anggota.jabatan}</span>
            </>
          )}
        </div>
      </div>

      <form action={action} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div>
          <label className={label}>Nama Panggilan</label>
          <input
            name="nama_panggilan"
            defaultValue={anggota.nama_panggilan ?? ""}
            className={input}
            placeholder="Opsional"
          />
        </div>

        <div>
          <label className={label}>Bio</label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={anggota.bio ?? ""}
            className={input + " resize-none"}
            placeholder="Deskripsi singkat tentang dirimu"
          />
        </div>

        <div>
          <label className={label}>Foto Profil</label>
          <FotoProfilInput currentFoto={anggota.foto_path} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={label}>Instagram</label>
            <input
              name="instagram"
              defaultValue={anggota.instagram ?? ""}
              className={input}
              placeholder="username (tanpa @)"
            />
          </div>
          <div>
            <label className={label}>LinkedIn</label>
            <input
              name="linkedin"
              defaultValue={anggota.linkedin ?? ""}
              className={input}
              placeholder="username"
            />
          </div>
          <div>
            <label className={label}>Email Pribadi</label>
            <input
              name="email"
              type="email"
              defaultValue={anggota.email ?? ""}
              className={input}
              placeholder="email@domain.com"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Simpan Perubahan</Button>
        </div>
      </form>
    </div>
  )
}
