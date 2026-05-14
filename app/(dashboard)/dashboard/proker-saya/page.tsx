import Link from "next/link"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { createAdminClient } from "@/lib/supabase/admin"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { hapusProkerSaya } from "./actions"

const pilarLabel: Record<string, string> = {
  agrowisata: "Agrowisata",
  pemberdayaan: "Pemberdayaan",
  digital: "Digital",
  pendidikan: "Pendidikan",
}

const statusLabel: Record<string, string> = {
  terlaksana: "Terlaksana",
  berjalan: "Berjalan",
  direncanakan: "Direncanakan",
}

export default async function ProkerSayaPage() {
  const anggota = await getCurrentAnggota()

  if (!anggota) {
    return (
      <div className="max-w-lg">
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground">Proker Saya</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Klaim profilmu terlebih dahulu untuk bisa mengelola program kerja.
        </p>
        <Button asChild>
          <Link href="/dashboard/profil/klaim">Klaim Profil</Link>
        </Button>
      </div>
    )
  }

  const supabase = createAdminClient()
  const { data: proker } = await supabase
    .from("proker_anggota")
    .select("*")
    .eq("anggota_id", anggota.id)
    .order("created_at")

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Proker Saya</h1>
        {(!proker || proker.length < 5) && (
          <Button asChild size="sm">
            <Link href="/dashboard/proker-saya/tambah">+ Tambah</Link>
          </Button>
        )}
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Program kerja milik <strong>{anggota.nama}</strong> · {proker?.length ?? 0}/5 proker
      </p>

      {!proker || proker.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada proker. Klik &quot;Tambah&quot; untuk mulai.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nama</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Pilar</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {proker.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{p.nama}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {pilarLabel[p.pilar] ?? p.pilar}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {statusLabel[p.status] ?? p.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="outline" size="xs">
                        <Link href={`/dashboard/proker-saya/${p.id}/edit`}>Edit</Link>
                      </Button>
                      <DeleteButton action={hapusProkerSaya} id={p.id} label={p.nama} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
