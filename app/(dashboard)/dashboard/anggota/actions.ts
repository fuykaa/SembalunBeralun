"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function nullable(val: FormDataEntryValue | null): string | null {
  return val === "" || val === null ? null : String(val)
}

export async function tambahAnggota(formData: FormData) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("anggota").insert({
    id: crypto.randomUUID(),
    nama: String(formData.get("nama")),
    nama_panggilan: nullable(formData.get("nama_panggilan")),
    sub_unit: String(formData.get("sub_unit")),
    fakultas: String(formData.get("fakultas")),
    jurusan: String(formData.get("jurusan")),
    angkatan: parseInt(String(formData.get("angkatan"))),
    jabatan: nullable(formData.get("jabatan")),
    foto_path: nullable(formData.get("foto_path")),
    bio: nullable(formData.get("bio")),
    instagram: nullable(formData.get("instagram")),
    linkedin: nullable(formData.get("linkedin")),
    email: nullable(formData.get("email")),
  })

  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/anggota")
  redirect("/dashboard/anggota")
}

export async function editAnggota(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("anggota").update({
    nama: String(formData.get("nama")),
    nama_panggilan: nullable(formData.get("nama_panggilan")),
    sub_unit: String(formData.get("sub_unit")),
    fakultas: String(formData.get("fakultas")),
    jurusan: String(formData.get("jurusan")),
    angkatan: parseInt(String(formData.get("angkatan"))),
    jabatan: nullable(formData.get("jabatan")),
    foto_path: nullable(formData.get("foto_path")),
    bio: nullable(formData.get("bio")),
    instagram: nullable(formData.get("instagram")),
    linkedin: nullable(formData.get("linkedin")),
    email: nullable(formData.get("email")),
  }).eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/anggota")
  redirect("/dashboard/anggota")
}

export async function hapusAnggota(formData: FormData) {
  const supabase = createAdminClient()
  const id = String(formData.get("id"))

  const { error } = await supabase.from("anggota").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/anggota")
}
