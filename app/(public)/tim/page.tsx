import type { Metadata } from "next"
import { createAdminClient } from "@/lib/supabase/admin"
import { KartuAnggota } from "@/components/public/kartu-anggota"
import type { Anggota, ProkerAnggota } from "@/lib/supabase/types"

export const metadata: Metadata = {
  title: "Tim | KKN Sembalun Beralun UGM",
  description:
    "Kenali 29 anggota KKN Sembalun Beralun UGM — terbagi dalam Sub-unit Sembalun dan Sub-unit Sajang.",
}

const subUnits = [
  { key: "sembalun" as const, label: "Sub-unit Sembalun", desa: "Desa Sembalun" },
  { key: "sajang" as const, label: "Sub-unit Sajang", desa: "Desa Sajang" },
]

export default async function TimPage() {
  const supabase = createAdminClient()

  const [{ data: anggotaData }, { data: prokerData }] = await Promise.all([
    supabase
      .from("anggota")
      .select("*")
      .order("jabatan", { ascending: true, nullsFirst: false }),
    supabase.from("proker_anggota").select("*"),
  ])

  const daftarAnggota = (anggotaData ?? []) as Anggota[]
  const daftarProker = (prokerData ?? []) as ProkerAnggota[]

  const prokerByAnggota = daftarProker.reduce<Record<string, ProkerAnggota[]>>((acc, p) => {
    if (!acc[p.anggota_id]) acc[p.anggota_id] = []
    acc[p.anggota_id].push(p)
    return acc
  }, {})

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
          29 mahasiswa UGM terbagi dalam dua sub-unit yang bertugas di Desa Sembalun dan Desa
          Sajang, Kecamatan Sembalun, Lombok Timur.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {subUnits.map(({ key, label, desa }) => {
          const anggotaSubUnit = daftarAnggota.filter((a) => a.sub_unit === key)
          return (
            <section key={key}>
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">{label}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{desa}</p>
                </div>
                <span className="text-sm text-muted-foreground">{anggotaSubUnit.length} anggota</span>
              </div>

              {anggotaSubUnit.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {anggotaSubUnit.map((a) => (
                    <KartuAnggota
                      key={a.id}
                      anggota={a}
                      proker={prokerByAnggota[a.id] ?? []}
                    />
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
