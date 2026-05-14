"use client"

import { useState } from "react"
import Image from "next/image"
import type { Anggota, ProkerAnggota } from "@/lib/supabase/types"

const pilarLabel: Record<string, string> = {
  agrowisata: "Agrowisata",
  pemberdayaan: "Pemberdayaan",
  digital: "Digital",
  pendidikan: "Pendidikan",
}

const pilarWarna: Record<string, string> = {
  agrowisata: "var(--hijau-sembalun)",
  pemberdayaan: "var(--biru-sembalun)",
  digital: "var(--jingga-sembalun)",
  pendidikan: "var(--kuning-sembalun)",
}

const statusLabel: Record<string, string> = {
  terlaksana: "Terlaksana",
  berjalan: "Berjalan",
  direncanakan: "Direncanakan",
}

function jabatanBadgeStyle(jabatan: string): React.CSSProperties {
  const j = jabatan.toLowerCase()
  if (j.includes("kormanit")) return { background: "var(--jingga-sembalun)", color: "#5a2a00" }
  if (j.includes("kormasit")) return { background: "var(--biru-sembalun)", color: "#0a2a30" }
  if (j.includes("kormater")) return { background: "var(--kuning-sembalun)", color: "#3a2a00" }
  return { background: "var(--hijau-sembalun)", color: "#1a2e15" }
}

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

export function KartuAnggota({
  anggota,
  proker,
}: {
  anggota: Anggota
  proker: ProkerAnggota[]
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col rounded-xl border border-border bg-background">
      <div className="flex flex-col items-center gap-3 p-5 text-center">
        <div className="size-20 overflow-hidden rounded-full">
          {anggota.foto_path ? (
            <Image
              src={anggota.foto_path}
              alt={`Foto ${anggota.nama}`}
              width={80}
              height={80}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            <AvatarPlaceholder nama={anggota.nama} />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">{anggota.nama}</p>
          {anggota.jabatan && (
            <span
              className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium"
              style={jabatanBadgeStyle(anggota.jabatan)}
            >
              {anggota.jabatan}
            </span>
          )}
          <p className="mt-1.5 text-xs text-muted-foreground">{anggota.fakultas}</p>
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

        {proker.length > 0 && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 text-xs font-medium transition-colors"
            style={{ color: "var(--hijau-sembalun)" }}
          >
            {proker.length} program kerja {expanded ? "▲" : "▼"}
          </button>
        )}
      </div>

      {expanded && proker.length > 0 && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <ul className="flex flex-col gap-2">
            {proker.map((p) => (
              <li key={p.id} className="flex flex-col gap-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-medium text-foreground leading-snug">{p.nama}</p>
                  <span
                    className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
                    style={{ background: pilarWarna[p.pilar] ?? "var(--hijau-sembalun)" }}
                  >
                    {pilarLabel[p.pilar] ?? p.pilar}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">{statusLabel[p.status]}</p>
                {p.deskripsi && (
                  <p className="text-[10px] leading-relaxed text-muted-foreground">{p.deskripsi}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
