"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

const input =
  "rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"

type AnggotaOption = { user_id: string; nama: string }

export function NarsumFilter({ pembuat }: { pembuat: AnggotaOption[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      router.replace(`/dashboard/narsum?${params.toString()}`)
    },
    [router, searchParams]
  )

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className={input}
        defaultValue={searchParams.get("pembuat") ?? ""}
        onChange={(e) => update("pembuat", e.target.value)}
      >
        <option value="">Semua anggota</option>
        {pembuat.map((a) => (
          <option key={a.user_id} value={a.user_id}>
            {a.nama}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <input
          type="date"
          className={input}
          defaultValue={searchParams.get("dari") ?? ""}
          onChange={(e) => update("dari", e.target.value)}
          aria-label="Dari tanggal"
        />
        <span className="text-sm text-muted-foreground">—</span>
        <input
          type="date"
          className={input}
          defaultValue={searchParams.get("sampai") ?? ""}
          onChange={(e) => update("sampai", e.target.value)}
          aria-label="Sampai tanggal"
        />
      </div>

      {(searchParams.get("pembuat") || searchParams.get("dari") || searchParams.get("sampai")) && (
        <button
          className="text-xs text-muted-foreground underline hover:text-foreground"
          onClick={() => router.replace("/dashboard/narsum")}
        >
          Reset filter
        </button>
      )}
    </div>
  )
}
