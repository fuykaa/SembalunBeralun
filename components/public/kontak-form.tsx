"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function KontakForm() {
  const [nama, setNama] = useState("")
  const [subjek, setSubjek] = useState("")
  const [pesan, setPesan] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Dari: ${nama}\n\n${pesan}`
    const url = `https://mail.google.com/mail/?view=cm&to=alunansembalun@gmail.com&su=${encodeURIComponent(subjek)}&body=${encodeURIComponent(body)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="nama" className="text-sm font-medium text-foreground">
          Nama
        </label>
        <input
          id="nama"
          type="text"
          required
          placeholder="Nama kamu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subjek" className="text-sm font-medium text-foreground">
          Subjek
        </label>
        <input
          id="subjek"
          type="text"
          required
          placeholder="Perihal pesan"
          value={subjek}
          onChange={(e) => setSubjek(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pesan" className="text-sm font-medium text-foreground">
          Pesan
        </label>
        <textarea
          id="pesan"
          required
          rows={5}
          placeholder="Tuliskan pesanmu di sini..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          className={inputClass + " resize-none"}
        />
      </div>

      <Button type="submit" className="w-full gap-2 rounded-lg">
        <Send className="size-4" />
        Kirim via Email
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Tombol ini akan membuka Gmail di tab baru.
      </p>
    </form>
  )
}
