"use client"

import { useState, useRef } from "react"
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

interface Props {
  currentFoto?: string | null
}

export function GaleriTimInput({ currentFoto }: Props) {
  const [imgSrc, setImgSrc] = useState("")
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentFoto ?? null)
  const [isOpen, setIsOpen] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImgSrc(reader.result as string)
      setIsOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 85 }, 1, width, height),
        width,
        height
      )
    )
  }

  const handleConfirm = () => {
    if (!imgRef.current || !completedCrop) return

    const img = imgRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const scaleX = img.naturalWidth / img.width
    const scaleY = img.naturalHeight / img.height

    const OUTPUT = 1080
    canvas.width = OUTPUT
    canvas.height = OUTPUT

    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      OUTPUT,
      OUTPUT
    )

    canvas.toBlob(
      (blob) => {
        if (!blob || !hiddenInputRef.current) return
        const dt = new DataTransfer()
        dt.items.add(new File([blob], "foto.jpg", { type: "image/jpeg" }))
        hiddenInputRef.current.files = dt.files
        setPreviewUrl(URL.createObjectURL(blob))
        setIsOpen(false)
        if (fileInputRef.current) fileInputRef.current.value = ""
      },
      "image/jpeg",
      0.88
    )
  }

  const handleCancel = () => {
    setIsOpen(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <>
      {/* Input tersembunyi — dibaca server action via name="foto" */}
      <input ref={hiddenInputRef} type="file" name="foto" className="hidden" />

      {/* Preview foto */}
      {previewUrl && (
        <div className="mb-3">
          <img
            src={previewUrl}
            alt="Preview foto"
            className="aspect-square w-24 rounded-lg object-cover ring-2 ring-border"
          />
        </div>
      )}

      {/* Trigger picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={onSelectFile}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {previewUrl ? "Ganti Foto" : "Pilih Foto"}
      </button>
      <p className="mt-1 text-xs text-muted-foreground">
        Maks. 5 MB · JPEG, PNG, WebP, GIF · Foto akan di-crop 1:1
        {!previewUrl && " · Wajib"}
      </p>

      {/* Crop modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col gap-4 rounded-xl bg-background p-6 shadow-xl">
            <div>
              <h2 className="text-base font-semibold text-foreground">Crop Foto</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Seret dan resize kotak untuk memilih area foto (rasio 1:1).
              </p>
            </div>

            <div className="overflow-auto rounded-lg bg-muted/30">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                minWidth={60}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Pilih area crop"
                  onLoad={onImageLoad}
                  className="max-h-[55vh] w-full object-contain"
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!completedCrop}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-800 disabled:opacity-50"
                style={{ background: "var(--hijau-sembalun)" }}
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
