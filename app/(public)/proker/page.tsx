import type { Metadata } from "next"
import { createAdminClient } from "@/lib/supabase/admin"
import type { Proker } from "@/lib/supabase/types"

export const metadata: Metadata = {
  title: "Program Kerja",
  description:
    "Daftar program kerja KKN Sembalun Beralun UGM di Desa Sembalun dan Desa Sajang.",
}

const pilarLabel: Record<Proker["pilar"], string> = {
  agrowisata: "Agrowisata Berkelanjutan",
  pemberdayaan: "Pemberdayaan Masyarakat",
  digital: "Transformasi Digital",
  pendidikan: "Pendidikan & Kebudayaan",
}

const pilarWarna: Record<Proker["pilar"], string> = {
  agrowisata: "var(--hijau-sembalun)",
  pemberdayaan: "var(--biru-sembalun)",
  digital: "var(--jingga-sembalun)",
  pendidikan: "var(--kuning-sembalun)",
}

const statusLabel: Record<Proker["status"], string> = {
  terlaksana: "Terlaksana",
  berjalan: "Sedang Berjalan",
  direncanakan: "Direncanakan",
}

const statusWarna: Record<Proker["status"], string> = {
  terlaksana: "var(--hijau-sembalun)",
  berjalan: "var(--biru-sembalun)",
  direncanakan: "var(--kuning-sembalun)",
}

function KartuProker({ item }: { item: Proker }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-5">
      <div className="flex items-start justify-between gap-2">
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-slate-700"
          style={{ background: pilarWarna[item.pilar] }}
        >
          {pilarLabel[item.pilar]}
        </span>
        <span
          className="shrink-0 text-xs font-medium"
          style={{ color: statusWarna[item.status] }}
        >
          {statusLabel[item.status]}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground">{item.nama}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {item.deskripsi}
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        {item.sub_unit === "sembalun"
          ? "Sub-unit Sembalun"
          : item.sub_unit === "sajang"
          ? "Sub-unit Sajang"
          : "Bersama"}
      </p>
    </div>
  )
}

export default async function ProkerPage() {
  const supabase = createAdminClient()
  const { data: proker } = await supabase
    .from("proker")
    .select("*")
    .order("sub_unit")

  const daftarProker = proker ?? []
  const sembalun = daftarProker.filter((p) => p.sub_unit === "sembalun")
  const sajang = daftarProker.filter((p) => p.sub_unit === "sajang")
  const bersama = daftarProker.filter((p) => p.sub_unit === "bersama")

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          KKN Sembalun Beralun UGM
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Program Kerja
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Seluruh program kerja berakar pada empat pilar utama: agrowisata
          berkelanjutan, pemberdayaan masyarakat, transformasi digital, dan
          pendidikan &amp; kebudayaan.
        </p>
      </div>

      {daftarProker.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Data program kerja belum tersedia.
        </div>
      ) : (
        <div className="flex flex-col gap-14">
          {bersama.length > 0 && (
            <section>
              <h2 className="mb-5 text-lg font-semibold tracking-tight text-foreground">
                Program Bersama
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bersama.map((p) => <KartuProker key={p.id} item={p} />)}
              </div>
            </section>
          )}

          {sembalun.length > 0 && (
            <section>
              <h2 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
                Sub-unit Sembalun
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">Desa Sembalun</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sembalun.map((p) => <KartuProker key={p.id} item={p} />)}
              </div>
            </section>
          )}

          {sajang.length > 0 && (
            <section>
              <h2 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
                Sub-unit Sajang
              </h2>
              <p className="mb-5 text-sm text-muted-foreground">Desa Sajang</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sajang.map((p) => <KartuProker key={p.id} item={p} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
