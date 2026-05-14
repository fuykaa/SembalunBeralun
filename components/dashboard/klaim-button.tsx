"use client"

import { useFormStatus } from "react-dom"
import { klaimProfil } from "@/app/(dashboard)/dashboard/profil/actions"

function KlaimSubmitButton({ nama }: { nama: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition-colors hover:bg-muted disabled:opacity-60"
    >
      <p className="font-medium text-foreground">{nama}</p>
      <span className="text-xs text-muted-foreground">{pending ? "Mengklaim..." : "Klaim →"}</span>
    </button>
  )
}

export function KlaimButton({ anggotaId, nama }: { anggotaId: string; nama: string }) {
  return (
    <form
      action={klaimProfil}
      onSubmit={(e) => {
        if (!confirm(`Klaim profil "${nama}"?`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="anggota_id" value={anggotaId} />
      <KlaimSubmitButton nama={nama} />
    </form>
  )
}
