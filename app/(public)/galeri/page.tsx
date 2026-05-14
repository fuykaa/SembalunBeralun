import type { Metadata } from "next"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/admin"

export const metadata: Metadata = {
  title: "Galeri Tim | KKN Sembalun Beralun UGM",
  description:
    "Dokumentasi kegiatan tim KKN Sembalun Beralun UGM di Desa Sembalun dan Desa Sajang.",
}

function PlaceholderFoto() {
  return (
    <div
      className="aspect-square w-full rounded-xl"
      style={{ background: "var(--gradien-hijau-biru)" }}
    />
  )
}

export default async function GaleriPage() {
  const supabase = createAdminClient()
  const { data: fotos } = await supabase
    .from("galeri")
    .select("id, url, alt, keterangan")
    .eq("tipe", "tim")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          Dokumentasi Kegiatan
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Galeri Tim
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Dari masa persiapan hingga momen bersama warga Desa Sembalun dan Desa Sajang.
        </p>
      </div>

      {fotos && fotos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {fotos.map(({ id, url, alt, keterangan }) => (
            <figure key={id} className="group relative overflow-hidden rounded-xl cursor-pointer">
              <Image
                src={url}
                alt={alt}
                width={400}
                height={400}
                unoptimized
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {keterangan && (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
                  <p className="text-xs text-white leading-relaxed">{keterangan}</p>
                </div>
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
