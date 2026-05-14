"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function nullable(val: FormDataEntryValue | null): string | null {
  return val === "" || val === null ? null : String(val)
}

export async function klaimProfil(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const anggotaId = String(formData.get("anggota_id"))
  const admin = createAdminClient()

  // Pastikan record ini belum diklaim siapapun
  const { data: existing } = await admin
    .from("anggota")
    .select("user_id")
    .eq("id", anggotaId)
    .single()

  if (existing?.user_id) throw new Error("Profil ini sudah diklaim.")

  const { error } = await admin
    .from("anggota")
    .update({ user_id: user.id })
    .eq("id", anggotaId)

  if (error) throw new Error(error.message)

  revalidatePath("/dashboard/profil")
  redirect("/dashboard/profil")
}

const ALLOWED_FOTO_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

function extractStoragePath(url: string): string | null {
  const marker = "/storage/v1/object/public/galeri/"
  const idx = url.indexOf(marker)
  return idx === -1 ? null : url.slice(idx + marker.length)
}

export async function updateProfil(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()

  const { data: anggota } = await admin
    .from("anggota")
    .select("user_id, foto_path")
    .eq("id", id)
    .single()

  if (anggota?.user_id !== user.id) throw new Error("Tidak diizinkan.")

  const file = formData.get("foto") as File | null
  let fotoUrl: string | null = anggota?.foto_path ?? null

  if (file && file.size > 0) {
    if (!(file.type in ALLOWED_FOTO_TYPES)) {
      throw new Error("Format tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.")
    }
    if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran foto maksimal 5 MB.")

    if (anggota?.foto_path) {
      const oldPath = extractStoragePath(anggota.foto_path)
      if (oldPath) await admin.storage.from("galeri").remove([oldPath])
    }

    const ext = ALLOWED_FOTO_TYPES[file.type]
    const storagePath = `profil/${crypto.randomUUID()}.${ext}`
    const bytes = await file.arrayBuffer()

    const { error: uploadError } = await admin.storage
      .from("galeri")
      .upload(storagePath, bytes, { contentType: file.type })
    if (uploadError) throw new Error(uploadError.message)

    const { data: { publicUrl } } = admin.storage.from("galeri").getPublicUrl(storagePath)
    fotoUrl = publicUrl
  }

  const { error } = await admin
    .from("anggota")
    .update({
      nama_panggilan: nullable(formData.get("nama_panggilan")),
      bio: nullable(formData.get("bio")),
      foto_path: fotoUrl,
      instagram: nullable(formData.get("instagram")),
      linkedin: nullable(formData.get("linkedin")),
      email: nullable(formData.get("email")),
    })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/profil")
  redirect("/dashboard/profil")
}
