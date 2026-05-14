"use client"

import { klaimProfil } from "@/app/(dashboard)/dashboard/profil/actions"

export function KlaimButton({ anggotaId, nama }: { anggotaId: string; nama: string }) {
  return (
    <form
      action={klaimProfil}
      onSubmit={(e) => {
        if (!confirm(`Klaim profil "${nama}"?`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="anggota_id" value={anggotaId} />
      <button
        type="submit"
        className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition-colors hover:bg-muted"
      >
        <div>
          <p className="font-medium text-foreground">{nama}</p>
        </div>
        <span className="text-xs text-muted-foreground">Klaim →</span>
      </button>
    </form>
  )
}
