"use client"

import { useFormStatus } from "react-dom"
import { Star } from "lucide-react"

function StarSubmitButton({ isFeatured }: { isFeatured: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      title={isFeatured ? "Hapus bintang" : "Beri bintang — tampil duluan"}
      className="flex h-6 w-6 items-center justify-center rounded transition-opacity disabled:opacity-40"
    >
      <Star
        size={14}
        className={isFeatured ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
      />
    </button>
  )
}

export function StarButton({
  id,
  isFeatured,
  action,
}: {
  id: string
  isFeatured: boolean
  action: (formData: FormData) => Promise<void>
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="is_featured" value={String(isFeatured)} />
      <StarSubmitButton isFeatured={isFeatured} />
    </form>
  )
}
