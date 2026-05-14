import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { hapusAnggota } from "./actions"

export default async function AnggotaPage() {
  const [supabase, admin] = [createAdminClient(), await isAdmin()]
  const { data: anggota } = await supabase
    .from("anggota")
    .select("*")
    .order("sub_unit")
    .order("nama")

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Anggota</h1>
        {admin && (
          <Button asChild size="sm">
            <Link href="/dashboard/anggota/tambah">+ Tambah Anggota</Link>
          </Button>
        )}
      </div>

      {!anggota || anggota.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada anggota.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Nama</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Sub-unit</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Fakultas</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Jabatan</th>
                {admin && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {anggota.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{a.nama}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{a.sub_unit}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{a.fakultas}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{a.jabatan ?? "—"}</td>
                  {admin && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="xs">
                          <Link href={`/dashboard/anggota/${a.id}/edit`}>Edit</Link>
                        </Button>
                        <DeleteButton action={hapusAnggota} id={a.id} label={a.nama} />
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
