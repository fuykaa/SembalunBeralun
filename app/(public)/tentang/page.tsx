import type { Metadata } from "next"
import {
  Leaf,
  Users,
  Store,
  Monitor,
  GraduationCap,
  Handshake,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import { visi, misi, subUnit } from "@/content/visi-misi"

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Visi, misi, dan profil KKN Sembalun Beralun — Universitas Gadjah Mada di Desa Sembalun dan Desa Sajang, Kecamatan Sembalun, Lombok Timur.",
}

const ikonMap: Record<string, LucideIcon> = {
  Leaf,
  Users,
  Store,
  Monitor,
  GraduationCap,
  Handshake,
}

const warnaMisi = [
  "var(--hijau-sembalun)",
  "var(--biru-sembalun)",
  "var(--kuning-sembalun)",
  "var(--jingga-sembalun)",
  "var(--biru-sembalun)",
  "var(--hijau-sembalun)",
]

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <div className="mb-14">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          KKN Sembalun Beralun — Universitas Gadjah Mada
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tentang Kami
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Kami adalah 29 mahasiswa Universitas Gadjah Mada yang bertugas di
          Kecamatan Sembalun, Kabupaten Lombok Timur, Nusa Tenggara Barat.
          Terbagi dalam dua sub-unit, kami mendampingi masyarakat menuju desa
          agrowisata yang mandiri dan berdaya saing.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          {subUnit.map(({ nama, desa }) => (
            <div key={nama} className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" style={{ color: "var(--hijau-sembalun)" }} />
              <span>
                <span className="font-medium text-foreground">{nama}</span> — {desa}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visi */}
      <section className="mb-14">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
          Visi
        </h2>
        <blockquote
          className="rounded-xl border-l-4 bg-muted/50 px-5 py-4 text-base leading-relaxed text-foreground italic"
          style={{ borderColor: "var(--hijau-sembalun)" }}
        >
          &ldquo;{visi}&rdquo;
        </blockquote>
      </section>

      {/* Misi */}
      <section>
        <h2 className="mb-6 text-lg font-semibold tracking-tight text-foreground">
          Misi
        </h2>
        <ol className="flex flex-col gap-5">
          {misi.map(({ judul, isi, icon }, i) => {
            const Icon = ikonMap[icon]
            return (
              <li key={judul} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: warnaMisi[i] }}
                  >
                    <Icon className="size-5 text-slate-700" />
                  </div>
                  {i < misi.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-border" />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-sm font-semibold text-foreground">{judul}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {isi}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}
