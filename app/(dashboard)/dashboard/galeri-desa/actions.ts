"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { compressGaleri } from "@/lib/compress-image"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function errRedirect(path: string, msg: string): never {
  redirect(path + "?error=" + encodeURIComponent(msg))
}

export async function tambahFotoDesa(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const file = formData.get("foto") as File
  const keterangan = String(formData.get("keterangan")).trim()

  const errPath = "/dashboard/galeri-desa/tambah"

  if (!file || file.size === 0) errRedirect(errPath, "Foto wajib dipilih.")
  if (!keterangan) errRedirect(errPath, "Keterangan foto wajib diisi.")

  const ALLOWED_TYPES: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  }
  if (!(file.type in ALLOWED_TYPES)) errRedirect(errPath, "Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.")
  if (file.size > 5 * 1024 * 1024) errRedirect(errPath, "Ukuran file maksimal 5 MB.")

  const ext = ALLOWED_TYPES[file.type]
  const storagePath = `desa/${crypto.randomUUID()}.${ext}`

  const { data: compressed, contentType } = await compressGaleri(await file.arrayBuffer(), file.type)
  const { error: uploadError } = await admin.storage
    .from("galeri")
    .upload(storagePath, compressed, { contentType })

  if (uploadError) errRedirect(errPath, uploadError.message)

  const {
    data: { publicUrl },
  } = admin.storage.from("galeri").getPublicUrl(storagePath)

  const { error: dbError } = await admin.from("galeri").insert({
    storage_path: storagePath,
    url: publicUrl,
    alt: keterangan,
    keterangan,
    created_by: user.id,
    tipe: "desa",
  })

  if (dbError) errRedirect(errPath, dbError.message)

  revalidatePath("/desa")
  revalidatePath("/dashboard/galeri-desa")
  redirect("/dashboard/galeri-desa?success=1")
}

export async function editFotoDesa(id: string, formData: FormData) {
  if (!(await isAdmin())) errRedirect("/dashboard/galeri-desa", "Tidak diizinkan.")

  const admin = createAdminClient()
  const errPath = `/dashboard/galeri-desa/${id}/edit`

  const { data: foto } = await admin
    .from("galeri")
    .select("storage_path")
    .eq("id", id)
    .single()

  if (!foto) errRedirect(errPath, "Foto tidak ditemukan.")

  const keterangan = String(formData.get("keterangan")).trim()
  if (!keterangan) errRedirect(errPath, "Keterangan foto wajib diisi.")

  const file = formData.get("foto") as File | null
  let newStoragePath: string | null = null
  let newUrl: string | null = null

  if (file && file.size > 0) {
    const ALLOWED_TYPES: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    }
    if (!(file.type in ALLOWED_TYPES)) errRedirect(errPath, "Format file tidak didukung.")
    if (file.size > 5 * 1024 * 1024) errRedirect(errPath, "Ukuran file maksimal 5 MB.")

    const ext = ALLOWED_TYPES[file.type]
    newStoragePath = `desa/${crypto.randomUUID()}.${ext}`

    const { data: compressed, contentType } = await compressGaleri(await file.arrayBuffer(), file.type)
    const { error: uploadError } = await admin.storage
      .from("galeri")
      .upload(newStoragePath, compressed, { contentType })
    if (uploadError) errRedirect(errPath, uploadError.message)

    const { data: { publicUrl } } = admin.storage.from("galeri").getPublicUrl(newStoragePath)
    newUrl = publicUrl

    if (foto.storage_path) {
      await admin.storage.from("galeri").remove([foto.storage_path])
    }
  }

  const updateData: Record<string, unknown> = {
    alt: keterangan,
    keterangan,
  }
  if (newStoragePath) updateData.storage_path = newStoragePath
  if (newUrl) updateData.url = newUrl

  const { error: dbError } = await admin.from("galeri").update(updateData).eq("id", id)
  if (dbError) errRedirect(errPath, dbError.message)

  revalidatePath("/desa")
  revalidatePath("/dashboard/galeri-desa")
  redirect("/dashboard/galeri-desa?success=1")
}

export async function toggleFeaturedDesa(formData: FormData) {
  if (!(await isAdmin())) errRedirect("/dashboard/galeri-desa", "Tidak diizinkan.")
  const id = String(formData.get("id"))
  const current = formData.get("is_featured") === "true"
  const admin = createAdminClient()
  const { error } = await admin
    .from("galeri")
    .update({ is_featured: !current })
    .eq("id", id)
    .eq("tipe", "desa")
  if (error) errRedirect("/dashboard/galeri-desa", error.message)
  revalidatePath("/desa")
  revalidatePath("/dashboard/galeri-desa")
}

export async function hapusFotoDesa(formData: FormData) {
  if (!(await isAdmin())) errRedirect("/dashboard/galeri-desa", "Tidak diizinkan.")

  const admin = createAdminClient()
  const id = String(formData.get("id"))

  const { data: foto } = await admin
    .from("galeri")
    .select("storage_path")
    .eq("id", id)
    .single()

  if (foto?.storage_path) {
    await admin.storage.from("galeri").remove([foto.storage_path])
  }

  const { error } = await admin.from("galeri").delete().eq("id", id)
  if (error) errRedirect("/dashboard/galeri-desa", error.message)

  revalidatePath("/desa")
  revalidatePath("/dashboard/galeri-desa")
}
