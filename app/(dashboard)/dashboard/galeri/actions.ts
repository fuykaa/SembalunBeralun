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

export async function tambahFoto(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const file = formData.get("foto") as File
  const keterangan = String(formData.get("keterangan")).trim()
  const kategori = formData.get("kategori")

  const errPath = "/dashboard/galeri/tambah"

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
  const storagePath = `${crypto.randomUUID()}.${ext}`

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
    kategori: !kategori || kategori === "" ? null : String(kategori),
    created_by: user.id,
    tipe: "tim",
  })

  if (dbError) errRedirect(errPath, dbError.message)

  revalidatePath("/galeri")
  revalidatePath("/dashboard/galeri")
  redirect("/dashboard/galeri?success=1")
}

export async function editFoto(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const errPath = `/dashboard/galeri/${id}/edit`

  const { data: foto } = await admin
    .from("galeri")
    .select("storage_path, created_by")
    .eq("id", id)
    .single()

  if (!foto) errRedirect(errPath, "Foto tidak ditemukan.")
  if (foto.created_by !== user.id && !(await isAdmin())) {
    errRedirect(errPath, "Tidak diizinkan.")
  }

  const keterangan = String(formData.get("keterangan")).trim()
  if (!keterangan) errRedirect(errPath, "Keterangan foto wajib diisi.")

  const kategori = formData.get("kategori")

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
    newStoragePath = `${crypto.randomUUID()}.${ext}`

    const { data: compressed, contentType } = await compressGaleri(await file.arrayBuffer(), file.type)
    const { error: uploadError } = await admin.storage
      .from("galeri")
      .upload(newStoragePath, compressed, { contentType })
    if (uploadError) errRedirect(errPath, uploadError.message)

    const { data: { publicUrl } } = admin.storage.from("galeri").getPublicUrl(newStoragePath)
    newUrl = publicUrl

    // Hapus foto lama dari storage
    if (foto.storage_path) {
      await admin.storage.from("galeri").remove([foto.storage_path])
    }
  }

  const updateData: Record<string, unknown> = {
    alt: keterangan,
    keterangan,
    kategori: !kategori || kategori === "" ? null : String(kategori),
  }
  if (newStoragePath) updateData.storage_path = newStoragePath
  if (newUrl) updateData.url = newUrl

  const { error: dbError } = await admin.from("galeri").update(updateData).eq("id", id)
  if (dbError) errRedirect(errPath, dbError.message)

  revalidatePath("/galeri")
  revalidatePath("/dashboard/galeri")
  redirect("/dashboard/galeri?success=1")
}

export async function toggleFeatured(formData: FormData) {
  if (!(await isAdmin())) errRedirect("/dashboard/galeri", "Tidak diizinkan.")
  const id = String(formData.get("id"))
  const current = formData.get("is_featured") === "true"
  const supabase = createAdminClient()
  const { error } = await supabase
    .from("galeri")
    .update({ is_featured: !current })
    .eq("id", id)
    .eq("tipe", "tim")
  if (error) errRedirect("/dashboard/galeri", error.message)
  revalidatePath("/galeri")
  revalidatePath("/dashboard/galeri")
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
    errRedirect("/dashboard/galeri", "Tidak diizinkan.")
  }

  if (foto?.storage_path) {
    await admin.storage.from("galeri").remove([foto.storage_path])
  }

  const { error } = await admin.from("galeri").delete().eq("id", id)
  if (error) errRedirect("/dashboard/galeri", error.message)

  revalidatePath("/galeri")
  revalidatePath("/dashboard/galeri")
}
