import Link from "next/link"
import { Suspense } from "react"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { getCurrentAnggota, isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { NarsumFilter } from "@/components/dashboard/narsum-filter"
import { hapusLog } from "./actions"

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function NarsumPage({
  searchParams,
}: {
  searchParams: Promise<{ pembuat?: string; dari?: string; sampai?: string }>
}) {
  const { pembuat: filterPembuat, dari: filterDari, sampai: filterSampai } = await searchParams

  const [authClient, adminCheck] = await Promise.all([createClient(), isAdmin()])
  const {
    data: { user },
  } = await authClient.auth.getUser()

  const supabase = createAdminClient()

  let query = supabase.from("log_narsum").select("*").order("tanggal", { ascending: false })
  if (filterPembuat) query = query.eq("created_by", filterPembuat)
  if (filterDari) query = query.gte("tanggal", filterDari)
  if (filterSampai) query = query.lte("tanggal", filterSampai)

  const [{ data: logs }, { data: daftarAnggota }] = await Promise.all([
    query,
    supabase.from("anggota").select("user_id, nama").not("user_id", "is", null),
  ])

  const namaByUserId = Object.fromEntries(
    (daftarAnggota ?? [])
      .filter((a): a is { user_id: string; nama: string } => a.user_id !== null)
      .map((a) => [a.user_id, a.nama])
  )

  const pembuatOptions = (daftarAnggota ?? []).filter(
    (a): a is { user_id: string; nama: string } => a.user_id !== null
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Log Narasumber</h1>
        <Button asChild size="sm">
          <Link href="/dashboard/narsum/tambah">+ Tambah Log</Link>
        </Button>
      </div>

      <div className="mb-5">
        <Suspense fallback={null}>
          <NarsumFilter pembuat={pembuatOptions} />
        </Suspense>
      </div>

      {!logs || logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          {filterPembuat || filterDari || filterSampai
            ? "Tidak ada log yang sesuai filter."
            : "Belum ada log. Klik \"Tambah Log\" untuk mulai."}
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
                <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">Dibuat oleh</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => {
                const canAct = adminCheck || log.created_by === user?.id
                const namaPembuat = log.created_by ? (namaByUserId[log.created_by] ?? "—") : "—"
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
                    <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                      {namaPembuat}
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
