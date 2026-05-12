import type { Metadata } from "next"
import { Mail, MapPin, ExternalLink } from "lucide-react"
import { InstagramIcon } from "@/components/public/instagram-icon"
import { KontakForm } from "@/components/public/kontak-form"

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi KKN Sembalun Beralun UGM untuk kolaborasi, informasi program, atau pertanyaan seputar Desa Sembalun dan Desa Sajang.",
}

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 max-w-xl">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          Kami senang mendengar dari kamu
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Hubungi Kami
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Terbuka untuk kolaborasi dengan pemerintah desa, pelaku UMKM, lembaga
          pendidikan, maupun wisatawan yang ingin mengenal Sembalun lebih dalam.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <div>
          <h2 className="mb-5 text-base font-semibold text-foreground">
            Kirim Pesan
          </h2>
          <KontakForm />
        </div>

        {/* Info kontak */}
        <div>
          <h2 className="mb-5 text-base font-semibold text-foreground">
            Temukan Kami Di
          </h2>
          <div className="flex flex-col gap-3">
            {/* Email */}
            <a
              href="mailto:alunansembalun@gmail.com"
              className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted"
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--hijau-sembalun)" }}
              >
                <Mail className="size-5 text-slate-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="truncate text-sm font-medium text-foreground">
                  alunansembalun@gmail.com
                </p>
              </div>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/sembalun.beralun"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted"
            >
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--jingga-sembalun)" }}
              >
                <InstagramIcon className="size-5 text-slate-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Instagram</p>
                <p className="text-sm font-medium text-foreground">
                  @sembalun.beralun
                </p>
              </div>
              <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </a>

            {/* Lokasi */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "var(--biru-sembalun)" }}
              >
                <MapPin className="size-5 text-slate-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Lokasi</p>
                <p className="text-sm font-medium text-foreground">
                  Kecamatan Sembalun, Lombok Timur, NTB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
