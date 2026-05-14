"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getAnggotaOrThrow() {
  const anggota = await getCurrentAnggota()
  if (!anggota) throw new Error("Profil belum diklaim.")
  return anggota
}

export async function tambahProkerSaya(formData: FormData) {
  const anggota = await getAnggotaOrThrow()
  const supabase = createAdminClient()

  const { error } = await supabase.from("proker_anggota").insert({
    anggota_id: anggota.id,
    nama: String(formData.get("nama")),
    deskripsi: formData.get("deskripsi") || null,
    pilar: String(formData.get("pilar")),
    status: String(formData.get("status")),
  })

  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/proker-saya")
  redirect("/dashboard/proker-saya")
}

export async function editProkerSaya(id: string, formData: FormData) {
  const anggota = await getAnggotaOrThrow()
  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from("proker_anggota")
    .select("anggota_id")
    .eq("id", id)
    .single()

  if (existing?.anggota_id !== anggota.id) throw new Error("Tidak diizinkan.")

  const { error } = await supabase
    .from("proker_anggota")
    .update({
      nama: String(formData.get("nama")),
      deskripsi: formData.get("deskripsi") || null,
      pilar: String(formData.get("pilar")),
      status: String(formData.get("status")),
    })
    .eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/proker-saya")
  redirect("/dashboard/proker-saya")
}

export async function hapusProkerSaya(formData: FormData) {
  const anggota = await getAnggotaOrThrow()
  const supabase = createAdminClient()
  const id = String(formData.get("id"))

  const { data: existing } = await supabase
    .from("proker_anggota")
    .select("anggota_id")
    .eq("id", id)
    .single()

  if (existing?.anggota_id !== anggota.id) throw new Error("Tidak diizinkan.")

  const { error } = await supabase.from("proker_anggota").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/proker-saya")
}
