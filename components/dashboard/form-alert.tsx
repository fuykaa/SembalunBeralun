"use client"

import { useEffect, useState } from "react"

type AlertState = { type: "error" | "success"; text: string } | null

export function FormAlert({ successText = "Berhasil disimpan." }: { successText?: string }) {
  const [alert, setAlert] = useState<AlertState>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get("error")
    const success = params.get("success")

    if (error) setAlert({ type: "error", text: decodeURIComponent(error) })
    else if (success) setAlert({ type: "success", text: successText })

    if (error || success) {
      const url = new URL(window.location.href)
      url.searchParams.delete("error")
      url.searchParams.delete("success")
      window.history.replaceState({}, "", url.toString())
    }
  }, [successText])

  if (!alert) return null

  return (
    <div
      role="alert"
      className={`rounded-lg border px-4 py-3 text-sm font-medium ${
        alert.type === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-green-200 bg-green-50 text-green-700"
      }`}
    >
      {alert.type === "error" ? `Gagal: ${alert.text}` : alert.text}
    </div>
  )
}
