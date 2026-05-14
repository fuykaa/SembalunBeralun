"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type Foto = {
  id: string
  url: string
  alt: string
  keterangan: string | null
}

export function GaleriDesaGrid({ fotos }: { fotos: Foto[] }) {
  const [selected, setSelected] = useState<number | null>(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => setSelected((v) => (v !== null && v > 0 ? v - 1 : v)), [])
  const next = useCallback(
    () => setSelected((v) => (v !== null && v < fotos.length - 1 ? v + 1 : v)),
    [fotos.length]
  )

  useEffect(() => {
    if (selected === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [selected, close, next, prev])

  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [selected])

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {fotos.map((foto, i) => (
          <figure
            key={foto.id}
            className="group mb-3 cursor-pointer break-inside-avoid"
            onClick={() => setSelected(i)}
          >
            <div className="relative overflow-hidden rounded-xl">
              <Image
                src={foto.url}
                alt={foto.alt}
                width={600}
                height={400}
                unoptimized
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
              <div className="absolute inset-0 flex items-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {foto.keterangan && (
                  <p className="line-clamp-2 text-xs font-medium text-white drop-shadow">
                    {foto.keterangan}
                  </p>
                )}
              </div>
            </div>
          </figure>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={close}
        >
          <button
            className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            onClick={close}
            aria-label="Tutup"
          >
            <X className="size-5" />
          </button>

          {selected > 0 && (
            <button
              className="absolute left-3 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="size-6" />
            </button>
          )}

          {selected < fotos.length - 1 && (
            <button
              className="absolute right-3 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="size-6" />
            </button>
          )}

          <div
            className="flex max-h-[90vh] max-w-4xl w-full flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotos[selected].url}
              alt={fotos[selected].alt}
              width={1200}
              height={900}
              unoptimized
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />
            {fotos[selected].keterangan && (
              <p className="text-center text-sm text-white/60">{fotos[selected].keterangan}</p>
            )}
            <p className="text-xs text-white/30">
              {selected + 1} / {fotos.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
