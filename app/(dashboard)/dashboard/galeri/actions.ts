"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { compressGaleri } from "@/lib/compress-image"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function tambahFoto(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const file = formData.get("foto") as File
  const alt = String(formData.get("alt")).trim()
  const keterangan = formData.get("keterangan")
  const kategori = formData.get("kategori")

  if (!file || file.size === 0) throw new Error("Foto wajib dipilih.")
  if (!alt) throw new Error("Deskripsi (alt text) wajib diisi.")

  const ALLOWED_TYPES: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  }
  if (!(file.type in ALLOWED_TYPES)) throw new Error("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.")
  if (file.size > 5 * 1024 * 1024) throw new Error("Ukuran file maksimal 5 MB.")

  const ext = ALLOWED_TYPES[file.type]
  const storagePath = `${crypto.randomUUID()}.${ext}`

  const { data: compressed, contentType } = await compressGaleri(await file.arrayBuffer(), file.type)
  const { error: uploadError } = await admin.storage
    .from("galeri")
    .upload(storagePath, compressed, { contentType })

  if (uploadError) throw new Error(uploadError.message)

  const {
    data: { publicUrl },
  } = admin.storage.from("galeri").getPublicUrl(storagePath)

  const { error: dbError } = await admin.from("galeri").insert({
    storage_path: storagePath,
    url: publicUrl,
    alt,
    keterangan: !keterangan || keterangan === "" ? null : String(keterangan),
    kategori: !kategori || kategori === "" ? null : String(kategori),
    created_by: user.id,
    tipe: "tim",
  })

  if (dbError) throw new Error(dbError.message)

  revalidatePath("/galeri")
  revalidatePath("/dashboard/galeri")
  redirect("/dashboard/galeri")
}

export async function hapusFoto(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const id = String(formData.get("id"))

  const { data: foto } = await admin
    .from("galeri")
    .select("storage_path, created_by")
    .eq("id", id)
    .single()

  if (foto?.created_by !== user.id && !(await isAdmin())) {
    throw new Error("Tidak diizinkan.")
  }

  if (foto?.storage_path) {
    await admin.storage.from("galeri").remove([foto.storage_path])
  }

  const { error } = await admin.from("galeri").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/galeri")
  revalidatePath("/dashboard/galeri")
}
