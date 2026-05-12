import Link from "next/link"
import { createAdminClient } from "@/lib/supabase/admin"
import { Users, ClipboardList, ArrowRight } from "lucide-react"

export default async function DashboardPage() {
  const supabase = createAdminClient()

  const [{ count: totalAnggota }, { count: totalProker }] = await Promise.all([
    supabase.from("anggota").select("*", { count: "exact", head: true }),
    supabase.from("proker").select("*", { count: "exact", head: true }),
  ])

  const cards = [
    {
      label: "Total Anggota",
      value: totalAnggota ?? 0,
      icon: Users,
      href: "/dashboard/anggota",
      warna: "var(--hijau-sembalun)",
    },
    {
      label: "Program Kerja",
      value: totalProker ?? 0,
      icon: ClipboardList,
      href: "/dashboard/proker",
      warna: "var(--biru-sembalun)",
    },
  ]

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
        Overview
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ label, value, icon: Icon, href, warna }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:bg-muted"
          >
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-lg"
              style={{ background: warna }}
            >
              <Icon className="size-6 text-slate-700" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-3xl font-bold text-foreground">{value}</p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  )
}
