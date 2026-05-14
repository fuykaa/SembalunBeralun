"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { compressProfil } from "@/lib/compress-image"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function nullable(val: FormDataEntryValue | null): string | null {
  return val === "" || val === null ? null : String(val)
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

function errRedirect(path: string, msg: string): never {
  redirect(path + "?error=" + encodeURIComponent(msg))
}

async function uploadFotoProfil(
  file: File,
  oldUrl?: string | null
): Promise<{ url: string } | { error: string }> {
  if (!(file.type in ALLOWED_FOTO_TYPES)) {
    return { error: "Format tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF." }
  }
  if (file.size > 5 * 1024 * 1024) return { error: "Ukuran foto maksimal 5 MB." }

  const supabase = createAdminClient()

  if (oldUrl) {
    const oldPath = extractStoragePath(oldUrl)
    if (oldPath) await supabase.storage.from("galeri").remove([oldPath])
  }

  const storagePath = `profil/${crypto.randomUUID()}.jpg`
  const { data: compressed, contentType } = await compressProfil(await file.arrayBuffer(), file.type)

  const { error: uploadError } = await supabase.storage
    .from("galeri")
    .upload(storagePath, compressed, { contentType })
  if (uploadError) return { error: uploadError.message }

  const {
    data: { publicUrl },
  } = supabase.storage.from("galeri").getPublicUrl(storagePath)
  return { url: publicUrl }
}

export async function tambahAnggota(formData: FormData) {
  if (!(await isAdmin())) redirect("/dashboard")

  const supabase = createAdminClient()
  const errPath = "/dashboard/anggota/tambah"

  const file = formData.get("foto") as File | null
  let fotoUrl: string | null = null
  if (file && file.size > 0) {
    const result = await uploadFotoProfil(file)
    if ("error" in result) errRedirect(errPath, result.error)
    fotoUrl = result.url
  }

  const { error } = await supabase.from("anggota").insert({
    id: crypto.randomUUID(),
    nama: String(formData.get("nama")),
    nama_panggilan: nullable(formData.get("nama_panggilan")),
    sub_unit: String(formData.get("sub_unit")),
    fakultas: String(formData.get("fakultas")),
    jurusan: String(formData.get("jurusan")),
    angkatan: parseInt(String(formData.get("angkatan"))),
    jabatan: nullable(formData.get("jabatan")),
    foto_path: fotoUrl,
    bio: nullable(formData.get("bio")),
    instagram: nullable(formData.get("instagram")),
    linkedin: nullable(formData.get("linkedin")),
    email: nullable(formData.get("email")),
  })

  if (error) errRedirect(errPath, error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/anggota")
  redirect("/dashboard/anggota?success=1")
}

export async function editAnggota(id: string, formData: FormData) {
  if (!(await isAdmin())) redirect("/dashboard/profil")

  const supabase = createAdminClient()
  const errPath = `/dashboard/anggota/${id}/edit`

  const { data: existing } = await supabase
    .from("anggota")
    .select("foto_path")
    .eq("id", id)
    .single()

  const file = formData.get("foto") as File | null
  let fotoUrl: string | null = existing?.foto_path ?? null
  if (file && file.size > 0) {
    const result = await uploadFotoProfil(file, existing?.foto_path)
    if ("error" in result) errRedirect(errPath, result.error)
    fotoUrl = result.url
  }

  const { error } = await supabase
    .from("anggota")
    .update({
      nama: String(formData.get("nama")),
      nama_panggilan: nullable(formData.get("nama_panggilan")),
      sub_unit: String(formData.get("sub_unit")),
      fakultas: String(formData.get("fakultas")),
      jurusan: String(formData.get("jurusan")),
      angkatan: parseInt(String(formData.get("angkatan"))),
      jabatan: nullable(formData.get("jabatan")),
      foto_path: fotoUrl,
      bio: nullable(formData.get("bio")),
      instagram: nullable(formData.get("instagram")),
      linkedin: nullable(formData.get("linkedin")),
      email: nullable(formData.get("email")),
    })
    .eq("id", id)

  if (error) errRedirect(errPath, error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/anggota")
  redirect("/dashboard/anggota?success=1")
}

export async function hapusAnggota(formData: FormData) {
  if (!(await isAdmin())) redirect("/dashboard")

  const supabase = createAdminClient()
  const id = String(formData.get("id"))

  const { data: existing } = await supabase
    .from("anggota")
    .select("foto_path")
    .eq("id", id)
    .single()

  if (existing?.foto_path) {
    const oldPath = extractStoragePath(existing.foto_path)
    if (oldPath) await supabase.storage.from("galeri").remove([oldPath])
  }

  const { error } = await supabase.from("anggota").delete().eq("id", id)
  if (error) errRedirect("/dashboard/anggota", error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/anggota")
}
