import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { hapusProker } from "./actions"

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

export default async function ProkerDashboardPage() {
  const [supabase, admin] = [createAdminClient(), await isAdmin()]
  const { data: proker } = await supabase
    .from("proker")
    .select("*")
    .order("sub_unit")
    .order("nama")

  return (
    <div>
      <FormAlert successText="Program kerja berhasil disimpan." />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Program Kerja</h1>
        {admin && (
          <Button asChild size="sm">
            <Link href="/dashboard/proker/tambah">+ Tambah Proker</Link>
          </Button>
        )}
      </div>

      {!proker || proker.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada program kerja.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nama</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Sub-unit</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Pilar</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                {admin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {proker.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{p.nama}</td>
                  <td className="hidden px-4 py-3 capitalize text-muted-foreground sm:table-cell">{p.sub_unit}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{pilarLabel[p.pilar] ?? p.pilar}</td>
                  <td className="px-4 py-3 text-muted-foreground">{statusLabel[p.status] ?? p.status}</td>
                  {admin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="xs">
                          <Link href={`/dashboard/proker/${p.id}/edit`}>Edit</Link>
                        </Button>
                        <DeleteButton action={hapusProker} id={p.id} label={p.nama} />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
