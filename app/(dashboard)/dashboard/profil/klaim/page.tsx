import Link from "next/link"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { KlaimButton } from "@/components/dashboard/klaim-button"

export default async function KlaimProfilPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Cek apakah user sudah punya profil terhubung
  const admin = createAdminClient()
  const { data: sudahKlaim } = await admin
    .from("anggota")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (sudahKlaim) redirect("/dashboard/profil")

  // Ambil anggota yang belum diklaim
  const { data: daftarAnggota } = await admin
    .from("anggota")
    .select("id, nama, sub_unit, fakultas")
    .is("user_id", null)
    .order("sub_unit")
    .order("nama")

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/profil">← Kembali</Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Klaim Profil</h1>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Pilih nama kamu dari daftar di bawah untuk menghubungkan akun Google-mu ke data profil.
        Setelah diklaim, hanya kamu yang bisa mengedit profil tersebut.
      </p>

      {!daftarAnggota || daftarAnggota.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          Semua profil sudah diklaim.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {daftarAnggota.map((a) => (
            <div key={a.id}>
              <p className="mb-1 px-1 text-xs text-muted-foreground">
                {a.fakultas} · Sub-unit {a.sub_unit.charAt(0).toUpperCase() + a.sub_unit.slice(1)}
              </p>
              <KlaimButton anggotaId={a.id} nama={a.nama} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
