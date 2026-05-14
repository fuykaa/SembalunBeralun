import type { Metadata } from "next"
import { createAdminClient } from "@/lib/supabase/admin"
import type { Proker } from "@/lib/supabase/types"

export const metadata: Metadata = {
  title: "Program Kerja | KKN Sembalun Beralun UGM",
  description:
    "Daftar program kerja KKN Sembalun Beralun UGM di Desa Sembalun dan Desa Sajang.",
}

const pilarConfig: Record<
  Proker["pilar"],
  { label: string; deskripsi: string; warna: string; bg: string }
> = {
  agrowisata: {
    label: "Agrowisata Berkelanjutan",
    deskripsi: "Mengembangkan potensi pertanian dan pariwisata desa secara berkelanjutan.",
    warna: "var(--hijau-sembalun)",
    bg: "color-mix(in srgb, var(--hijau-sembalun) 15%, transparent)",
  },
  pemberdayaan: {
    label: "Pemberdayaan Masyarakat",
    deskripsi: "Meningkatkan kapasitas warga melalui pendampingan dan pelatihan.",
    warna: "var(--biru-sembalun)",
    bg: "color-mix(in srgb, var(--biru-sembalun) 15%, transparent)",
  },
  digital: {
    label: "Transformasi Digital",
    deskripsi: "Mendorong literasi digital dan pemasaran online untuk UMKM desa.",
    warna: "var(--jingga-sembalun)",
    bg: "color-mix(in srgb, var(--jingga-sembalun) 15%, transparent)",
  },
  pendidikan: {
    label: "Pendidikan & Kebudayaan",
    deskripsi: "Mengembangkan SDM lokal berbasis kebudayaan dan kearifan lokal.",
    warna: "var(--kuning-sembalun)",
    bg: "color-mix(in srgb, var(--kuning-sembalun) 15%, transparent)",
  },
}

const subUnitLabel: Record<Proker["sub_unit"], string> = {
  sembalun: "Sub-unit Sembalun",
  sajang: "Sub-unit Sajang",
  bersama: "Bersama",
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
  const pilar = pilarConfig[item.pilar]
  return (
    <div className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md">
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
        style={{ background: pilar.warna }}
      />
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-foreground">{item.nama}</h3>
        <span
          className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
          style={{ color: statusWarna[item.status], background: `color-mix(in srgb, ${statusWarna[item.status]} 12%, transparent)` }}
        >
          {statusLabel[item.status]}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">{item.deskripsi}</p>
      <p className="text-[11px] text-muted-foreground">{subUnitLabel[item.sub_unit]}</p>
    </div>
  )
}

const pilarOrder: Proker["pilar"][] = ["agrowisata", "pemberdayaan", "digital", "pendidikan"]

export default async function ProkerPage() {
  const supabase = createAdminClient()
  const { data: proker } = await supabase.from("proker").select("*")

  const daftarProker = (proker ?? []) as Proker[]

  const total = daftarProker.length
  const terlaksana = daftarProker.filter((p) => p.status === "terlaksana").length
  const berjalan = daftarProker.filter((p) => p.status === "berjalan").length
  const direncanakan = daftarProker.filter((p) => p.status === "direncanakan").length

  const perPilar = pilarOrder.reduce<Record<string, Proker[]>>((acc, pilar) => {
    acc[pilar] = daftarProker.filter((p) => p.pilar === pilar)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          KKN Sembalun Beralun UGM
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Program Kerja
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Seluruh program berakar pada empat pilar: agrowisata berkelanjutan, pemberdayaan
          masyarakat, transformasi digital, dan pendidikan & kebudayaan.
        </p>
      </div>

      {/* Stats */}
      {total > 0 && (
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total Program", nilai: total, warna: "var(--hijau-sembalun)" },
            { label: "Terlaksana", nilai: terlaksana, warna: "var(--hijau-sembalun)" },
            { label: "Sedang Berjalan", nilai: berjalan, warna: "var(--biru-sembalun)" },
            { label: "Direncanakan", nilai: direncanakan, warna: "var(--kuning-sembalun)" },
          ].map(({ label, nilai, warna }) => (
            <div key={label} className="rounded-xl border border-border bg-background p-4">
              <p className="text-2xl font-bold" style={{ color: warna }}>
                {nilai}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      )}

      {total === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Data program kerja belum tersedia.
        </div>
      ) : (
        <div className="flex flex-col gap-14">
          {pilarOrder.map((pilar) => {
            const items = perPilar[pilar]
            if (items.length === 0) return null
            const config = pilarConfig[pilar]
            return (
              <section key={pilar}>
                <div
                  className="mb-6 rounded-xl p-5"
                  style={{ background: config.bg }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="size-2.5 rounded-full shrink-0"
                      style={{ background: config.warna }}
                    />
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                      {config.label}
                    </h2>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {items.length} program
                    </span>
                  </div>
                  <p className="mt-1.5 pl-[1.375rem] text-sm text-muted-foreground">
                    {config.deskripsi}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <KartuProker key={p.id} item={p} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
