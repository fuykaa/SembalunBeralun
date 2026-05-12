"use client"

import { Button } from "@/components/ui/button"

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
      <Button type="submit" variant="destructive" size="xs">
        Hapus
      </Button>
    </form>
  )
}
