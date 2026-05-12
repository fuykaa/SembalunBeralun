import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dokumentasi kegiatan KKN Sembalun Beralun UGM di Desa Sembalun dan Desa Sajang.",
}

type FotoGaleri = {
  id: string
  src: string
  alt: string
  keterangan?: string
}

const foto: FotoGaleri[] = [
  // Tambahkan foto di sini. Contoh:
  // {
  //   id: "foto-1",
  //   src: "/images/galeri/nama-foto.jpg",
  //   alt: "Deskripsi foto untuk aksesibilitas",
  //   keterangan: "Keterangan opsional yang ditampilkan",
  // },
]

function PlaceholderFoto() {
  return (
    <div
      className="aspect-square w-full rounded-xl"
      style={{ background: "var(--gradien-hijau-biru)" }}
    />
  )
}

export default function GaleriPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          Dokumentasi Kegiatan
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Galeri
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Momen-momen bersama masyarakat Desa Sembalun dan Desa Sajang.
        </p>
      </div>

      {foto.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {foto.map(({ id, src, alt, keterangan }) => (
            <figure key={id} className="group flex flex-col gap-1.5">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {keterangan && (
                <figcaption className="text-xs text-muted-foreground">
                  {keterangan}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Foto akan ditambahkan segera.
          </p>
          <div className="grid grid-cols-2 gap-3 opacity-30 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PlaceholderFoto key={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
