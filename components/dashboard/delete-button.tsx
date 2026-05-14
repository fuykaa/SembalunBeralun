"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

function DeleteSubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="destructive" size="xs" disabled={pending}>
      {pending ? "..." : "Hapus"}
    </Button>
  )
}

export function DeleteButton({
  action,
  id,
  label,
}: {
  action: (formData: FormData) => Promise<void>
  id: string
  label: string
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Hapus "${label}"?`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <DeleteSubmitButton />
    </form>
  )
}
