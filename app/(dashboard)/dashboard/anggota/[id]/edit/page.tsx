import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { FotoProfilInput } from "@/components/dashboard/foto-profil-input"
import { editAnggota } from "../../actions"

const input = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
const label = "block text-sm font-medium text-foreground mb-1"

export default async function EditAnggotaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (!(await isAdmin())) redirect("/dashboard/profil")

  const supabase = createAdminClient()
  const { data: anggota } = await supabase
    .from("anggota")
    .select("*")
    .eq("id", id)
    .single()

  if (!anggota) notFound()

  const action = editAnggota.bind(null, id)

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/anggota">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Anggota</h1>
      </div>

      <form action={action} className="flex flex-col gap-5 rounded-xl border border-border bg-background p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Nama Lengkap *</label>
            <input name="nama" required defaultValue={anggota.nama} className={input} />
          </div>
          <div>
            <label className={label}>Nama Panggilan</label>
            <input name="nama_panggilan" defaultValue={anggota.nama_panggilan ?? ""} className={input} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Sub-unit *</label>
            <select name="sub_unit" required defaultValue={anggota.sub_unit} className={input}>
              <option value="sembalun">Sembalun</option>
              <option value="sajang">Sajang</option>
            </select>
          </div>
          <div>
            <label className={label}>Jabatan</label>
            <select name="jabatan" defaultValue={anggota.jabatan ?? ""} className={input}>
              <option value="">Anggota</option>
              <option value="Kormanit">Kormanit</option>
              <option value="Kormasit Sajang">Kormasit Sajang</option>
              <option value="Kormasit Sembalun">Kormasit Sembalun</option>
              <option value="Kormater Agro">Kormater Agro</option>
              <option value="Kormater Medika">Kormater Medika</option>
              <option value="Kormater Saintek">Kormater Saintek</option>
              <option value="Kormater Soshum">Kormater Soshum</option>
              <option value="Anggota (IT)">Anggota (IT)</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Fakultas *</label>
            <input name="fakultas" required defaultValue={anggota.fakultas} className={input} />
          </div>
          <div>
            <label className={label}>Jurusan *</label>
            <input name="jurusan" required defaultValue={anggota.jurusan} className={input} />
          </div>
        </div>

        <div>
          <label className={label}>Angkatan *</label>
          <input name="angkatan" type="number" required defaultValue={anggota.angkatan} className={input} />
        </div>

        <div>
          <label className={label}>Bio</label>
          <textarea name="bio" rows={3} defaultValue={anggota.bio ?? ""} className={input + " resize-none"} />
        </div>

        <div>
          <label className={label}>Foto Profil</label>
          <FotoProfilInput currentFoto={anggota.foto_path} />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={label}>Instagram</label>
            <input name="instagram" defaultValue={anggota.instagram ?? ""} className={input} placeholder="username (tanpa @)" />
          </div>
          <div>
            <label className={label}>LinkedIn</label>
            <input name="linkedin" defaultValue={anggota.linkedin ?? ""} className={input} />
          </div>
          <div>
            <label className={label}>Email Pribadi</label>
            <input name="email" type="email" defaultValue={anggota.email ?? ""} className={input} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Simpan Perubahan</Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/anggota">Batal</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
