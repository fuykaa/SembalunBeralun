import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { hapusLog } from "./actions"

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function NarsumPage() {
  const [authClient, anggota] = await Promise.all([createClient(), getCurrentAnggota()])
  const {
    data: { user },
  } = await authClient.auth.getUser()
  const admin = anggota?.role === "admin"

  const supabase = createAdminClient()
  const { data: logs } = await supabase
    .from("log_narsum")
    .select("*")
    .order("tanggal", { ascending: false })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Log Narasumber</h1>
        <Button asChild size="sm">
          <Link href="/dashboard/narsum/tambah">+ Tambah Log</Link>
        </Button>
      </div>

      {!logs || logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada log. Klik &quot;Tambah Log&quot; untuk mulai.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tanggal</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Narasumber</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">Topik</th>
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Sub-unit</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => {
                const canAct = admin || log.created_by === user?.id
                return (
                  <tr key={log.id} className="hover:bg-muted/30">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {formatTanggal(log.tanggal)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{log.nama_narsum}</p>
                      {(log.jabatan || log.institusi) && (
                        <p className="text-xs text-muted-foreground">
                          {[log.jabatan, log.institusi].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </td>
                    <td className="hidden max-w-xs px-4 py-3 text-muted-foreground md:table-cell">
                      <p className="line-clamp-2">{log.topik}</p>
                    </td>
                    <td className="hidden px-4 py-3 capitalize text-muted-foreground sm:table-cell">
                      {log.sub_unit}
                    </td>
                    <td className="px-4 py-3">
                      {canAct && (
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild variant="outline" size="xs">
                            <Link href={`/dashboard/narsum/${log.id}/edit`}>Edit</Link>
                          </Button>
                          <DeleteButton action={hapusLog} id={log.id} label={log.nama_narsum} />
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
