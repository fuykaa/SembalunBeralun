import type { Metadata } from "next"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/admin"
import type { Anggota } from "@/lib/supabase/types"

export const metadata: Metadata = {
  title: "Tim",
  description:
    "Kenali 29 anggota KKN Sembalun Beralun UGM — terbagi dalam Sub-unit Sembalun dan Sub-unit Sajang.",
}

const subUnits = [
  { key: "sembalun" as const, label: "Sub-unit Sembalun", desa: "Desa Sembalun" },
  { key: "sajang" as const, label: "Sub-unit Sajang", desa: "Desa Sajang" },
]

function AvatarPlaceholder({ nama }: { nama: string }) {
  const inisial = nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <div
      className="flex size-full items-center justify-center text-xl font-semibold text-slate-700"
      style={{ background: "var(--gradien-hijau-biru)" }}
    >
      {inisial}
    </div>
  )
}

function KartuAnggota({ anggota }: { anggota: Anggota }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-5 text-center">
      <div className="size-20 overflow-hidden rounded-full">
        {anggota.foto_path ? (
          <Image
            src={anggota.foto_path}
            alt={`Foto ${anggota.nama}`}
            width={80}
            height={80}
            className="size-full object-cover"
          />
        ) : (
          <AvatarPlaceholder nama={anggota.nama} />
        )}
      </div>

      <div>
        <p className="text-sm font-semibold text-foreground">{anggota.nama}</p>
        {anggota.jabatan && (
          <p
            className="mt-0.5 text-xs font-medium"
            style={{ color: "var(--hijau-sembalun)" }}
          >
            {anggota.jabatan}
          </p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">{anggota.fakultas}</p>
        <p className="text-xs text-muted-foreground">{anggota.jurusan}</p>
      </div>

      {(anggota.instagram || anggota.email) && (
        <div className="flex gap-3">
          {anggota.instagram && (
            <a
              href={`https://www.instagram.com/${anggota.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground hover:underline"
            >
              Instagram
            </a>
          )}
          {anggota.email && (
            <a
              href={`mailto:${anggota.email}`}
              className="text-xs text-muted-foreground hover:text-foreground hover:underline"
            >
              Email
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default async function TimPage() {
  const supabase = createAdminClient()
  const { data: anggota } = await supabase
    .from("anggota")
    .select("*")
    .order("jabatan", { ascending: true, nullsFirst: false })

  const daftarAnggota = anggota ?? []

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12">
        <p className="text-sm font-medium" style={{ color: "var(--hijau-sembalun)" }}>
          Universitas Gadjah Mada
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tim Kami
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          29 mahasiswa UGM terbagi dalam dua sub-unit yang bertugas di Desa
          Sembalun dan Desa Sajang, Kecamatan Sembalun, Lombok Timur.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {subUnits.map(({ key, label, desa }) => {
          const anggotaSubUnit = daftarAnggota.filter((a) => a.sub_unit === key)
          return (
            <section key={key}>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {label}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{desa}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {anggotaSubUnit.length} anggota
                </span>
              </div>

              {anggotaSubUnit.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {anggotaSubUnit.map((a) => (
                    <KartuAnggota key={a.id} anggota={a} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
                  Data anggota belum tersedia.
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
