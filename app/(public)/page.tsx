import Link from "next/link"
import {
  Sprout,
  Users,
  Wifi,
  BookOpen,
  MapPin,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const pilar = [
  {
    icon: Sprout,
    judul: "Agrowisata Berkelanjutan",
    deskripsi:
      "Mengembangkan potensi pertanian dan pariwisata Sembalun dengan prinsip keberlanjutan lingkungan, ekonomi, dan sosial, menuju destinasi agrowisata yang edukatif dan berdaya saing.",
    warna: "var(--hijau-sembalun)",
  },
  {
    icon: Users,
    judul: "Pemberdayaan Masyarakat",
    deskripsi:
      "Meningkatkan kapasitas masyarakat melalui pendampingan, pelatihan, dan kolaborasi lintas sektor — termasuk mendorong UMKM lokal berbasis pertanian, pariwisata, dan budaya.",
    warna: "var(--biru-sembalun)",
  },
  {
    icon: Wifi,
    judul: "Transformasi Digital",
    deskripsi:
      "Membangun literasi digital, pemasaran online, dan sistem informasi desa untuk mendukung promosi dan manajemen agrowisata secara modern.",
    warna: "var(--jingga-sembalun)",
  },
  {
    icon: BookOpen,
    judul: "Pendidikan & Kebudayaan",
    deskripsi:
      "Mengembangkan pendidikan dan pelatihan berbasis kebudayaan lokal untuk mewujudkan SDM unggul, inovatif, dan adaptif terhadap perubahan zaman.",
    warna: "var(--kuning-sembalun)",
  },
]

const stats = [
  { angka: "29", label: "Anggota" },
  { angka: "2", label: "Desa" },
  { angka: "1", label: "Kecamatan" },
]

export default function BerandaPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center px-4 py-28 text-center md:py-40"
        style={{ background: "var(--gradien-hijau-biru)" }}
      >
        <div className="flex items-center gap-1.5 rounded-full bg-white/30 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-sm">
          <MapPin className="size-3" />
          Sembalun &amp; Sajang, Lombok Timur, NTB
        </div>

        <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
          Menyemai Jejak,
          <br />
          Tumbuhkan Rasa,
          <br />
          Menuju Sembalun Berdaya
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-700">
          KKN Sembalun Beralun — Universitas Gadjah Mada, hadir untuk mendampingi
          masyarakat Desa Sembalun dan Desa Sajang menuju desa agrowisata yang
          berdaya saing dan berkelanjutan.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/proker">Lihat Program Kerja</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-slate-400 px-6 bg-white/40 backdrop-blur-sm hover:bg-white/60"
          >
            <Link href="/tim">Kenali Tim Kami</Link>
          </Button>
        </div>
      </section>

      {/* Stats + Tentang singkat */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12">
          {stats.map(({ angka, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {angka}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Tentang KKN Sembalun Beralun
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Kami adalah 29 mahasiswa Universitas Gadjah Mada yang bertugas di
            Kecamatan Sembalun, Kabupaten Lombok Timur. Terbagi dalam dua
            sub-unit di Desa Sembalun dan Desa Sajang, kami bekerja bersama
            masyarakat untuk mewujudkan desa agrowisata yang mandiri dan
            berdaya saing.
          </p>
          <Link
            href="/tentang"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
          >
            Selengkapnya <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>

      {/* 4 Pilar Misi */}
      <section className="bg-muted/40 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Empat Pilar Program Kami
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Setiap program kerja berakar pada salah satu dari empat pilar ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pilar.map(({ icon: Icon, judul, deskripsi, warna }) => (
              <div
                key={judul}
                className="flex flex-col gap-3 rounded-xl bg-background p-5 shadow-sm"
              >
                <div
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{ background: warna }}
                >
                  <Icon className="size-5 text-slate-700" />
                </div>
                <h3 className="text-sm font-semibold leading-snug text-foreground">
                  {judul}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {deskripsi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bawah */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Ingin tahu lebih lanjut atau berkolaborasi?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Kami terbuka untuk kolaborasi dengan pemerintah desa, pelaku UMKM,
            lembaga pendidikan, maupun wisatawan yang ingin mengenal Sembalun
            lebih dalam.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-8">
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
