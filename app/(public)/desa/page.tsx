import type { Metadata } from "next"
import { createAdminClient } from "@/lib/supabase/admin"
import { GaleriDesaGrid } from "@/components/public/galeri-desa-grid"

export const metadata: Metadata = {
  title: "Desa | KKN Sembalun Beralun UGM",
  description:
    "Mengenal Desa Sembalun dan Desa Sajang — potensi alam, pertanian, dan daya tarik agrowisata di kaki Gunung Rinjani.",
}

const highlights = [
  { label: "Ketinggian", nilai: "±1.100 mdpl", ket: "kaki Gunung Rinjani" },
  { label: "Komoditas", nilai: "Bawang & Stroberi", ket: "andalan petani lokal" },
  { label: "Wisata", nilai: "Bukit Selong", ket: "panorama sawah terasering" },
  { label: "Lokasi", nilai: "Lombok Timur", ket: "Nusa Tenggara Barat" },
]

export default async function DesaPage() {
  const supabase = createAdminClient()
  const { data: fotos } = await supabase
    .from("galeri")
    .select("id, url, alt, keterangan")
    .eq("tipe", "desa")
    .order("created_at", { ascending: false })

  const daftarFoto = fotos ?? []

  return (
    <div>
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--gradien-hijau-biru)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="text-sm font-medium text-slate-700">Mengenal Lokasi KKN</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Desa Sembalun<br />& Desa Sajang
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-700">
            Di kaki Gunung Rinjani, dua desa menyimpan keindahan alam, kekayaan pertanian,
            dan kehangatan budaya yang belum banyak dikenal dunia.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
        />
      </div>

      {/* Highlights */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-3 py-10 sm:grid-cols-4">
          {highlights.map(({ label, nilai, ket }) => (
            <div key={label} className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{nilai}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{ket}</p>
            </div>
          ))}
        </div>

        {/* Galeri */}
        <div className="pb-20">
          <div className="mb-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Galeri Desa
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Potret alam, masyarakat, dan kehidupan sehari-hari di Sembalun dan Sajang.
            </p>
          </div>

          {daftarFoto.length > 0 ? (
            <GaleriDesaGrid fotos={daftarFoto} />
          ) : (
            <div className="rounded-xl border border-dashed border-border py-20 text-center">
              <p className="text-sm text-muted-foreground">Foto akan ditambahkan segera.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
