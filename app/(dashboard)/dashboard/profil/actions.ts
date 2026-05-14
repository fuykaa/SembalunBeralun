"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { compressProfil } from "@/lib/compress-image"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function nullable(val: FormDataEntryValue | null): string | null {
  return val === "" || val === null ? null : String(val)
}

function errRedirect(path: string, msg: string): never {
  redirect(path + "?error=" + encodeURIComponent(msg))
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

export async function klaimProfil(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const anggotaId = String(formData.get("anggota_id"))
  const admin = createAdminClient()

  const { data: existing } = await admin
    .from("anggota")
    .select("user_id")
    .eq("id", anggotaId)
    .single()

  if (existing?.user_id) errRedirect("/dashboard/profil/klaim", "Profil ini sudah diklaim.")

  const { error } = await admin
    .from("anggota")
    .update({ user_id: user.id })
    .eq("id", anggotaId)

  if (error) errRedirect("/dashboard/profil/klaim", error.message)

  revalidatePath("/dashboard/profil")
  redirect("/dashboard/profil?success=1")
}

export async function updateProfil(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const errPath = "/dashboard/profil"

  const { data: anggota } = await admin
    .from("anggota")
    .select("user_id, foto_path")
    .eq("id", id)
    .single()

  if (anggota?.user_id !== user.id) errRedirect(errPath, "Tidak diizinkan.")

  const file = formData.get("foto") as File | null
  let fotoUrl: string | null = anggota?.foto_path ?? null

  if (file && file.size > 0) {
    if (!(file.type in ALLOWED_FOTO_TYPES)) {
      errRedirect(errPath, "Format tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.")
    }
    if (file.size > 5 * 1024 * 1024) errRedirect(errPath, "Ukuran foto maksimal 5 MB.")

    if (anggota?.foto_path) {
      const oldPath = extractStoragePath(anggota.foto_path)
      if (oldPath) await admin.storage.from("galeri").remove([oldPath])
    }

    const storagePath = `profil/${crypto.randomUUID()}.jpg`
    const { data: compressed, contentType } = await compressProfil(await file.arrayBuffer(), file.type)

    const { error: uploadError } = await admin.storage
      .from("galeri")
      .upload(storagePath, compressed, { contentType })
    if (uploadError) errRedirect(errPath, uploadError.message)

    const {
      data: { publicUrl },
    } = admin.storage.from("galeri").getPublicUrl(storagePath)
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

  if (error) errRedirect(errPath, error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/profil")
  redirect("/dashboard/profil?success=1")
}
