import type { Metadata } from "next"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/admin"

export const metadata: Metadata = {
  title: "Desa | KKN Sembalun Beralun UGM",
  description:
    "Mengenal Desa Sembalun dan Desa Sajang — potensi alam, pertanian, dan daya tarik agrowisata di kaki Gunung Rinjani.",
}

function PlaceholderFoto() {
  return (
    <div
      className="aspect-square w-full rounded-xl"
      style={{ background: "var(--gradien-hijau-kuning)" }}
    />
  )
}

export default async function DesaPage() {
  const supabase = createAdminClient()
  const { data: fotos } = await supabase
    .from("galeri")
    .select("id, url, alt, keterangan")
    .eq("tipe", "desa")
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          Mengenal Lokasi KKN
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Desa Sembalun & Desa Sajang
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Terletak di kaki Gunung Rinjani, Kecamatan Sembalun, Kabupaten Lombok Timur — dua desa
          dengan potensi pertanian, alam, dan budaya yang luar biasa.
        </p>
      </div>

      {fotos && fotos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {fotos.map(({ id, url, alt, keterangan }) => (
            <figure key={id} className="group flex flex-col gap-1.5">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={url}
                  alt={alt}
                  width={400}
                  height={400}
                  unoptimized
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {keterangan && (
                <figcaption className="text-xs text-muted-foreground">{keterangan}</figcaption>
              )}
            </figure>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">Foto akan ditambahkan segera.</p>
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
