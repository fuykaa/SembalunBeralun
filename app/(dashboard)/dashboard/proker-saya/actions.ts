"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { getCurrentAnggota } from "@/lib/supabase/get-current-anggota"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function errRedirect(path: string, msg: string): never {
  redirect(path + "?error=" + encodeURIComponent(msg))
}

export async function tambahProkerSaya(formData: FormData) {
  const anggota = await getCurrentAnggota()
  if (!anggota) errRedirect("/dashboard/proker-saya/tambah", "Profil belum diklaim.")

  const supabase = createAdminClient()

  const { error } = await supabase.from("proker_anggota").insert({
    anggota_id: anggota.id,
    nama: String(formData.get("nama")),
    deskripsi: formData.get("deskripsi") || null,
    pilar: String(formData.get("pilar")),
    status: String(formData.get("status")),
  })

  if (error) errRedirect("/dashboard/proker-saya/tambah", error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/proker-saya")
  redirect("/dashboard/proker-saya?success=1")
}

export async function editProkerSaya(id: string, formData: FormData) {
  const anggota = await getCurrentAnggota()
  if (!anggota) errRedirect("/dashboard/proker-saya", "Profil belum diklaim.")

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from("proker_anggota")
    .select("anggota_id")
    .eq("id", id)
    .single()

  if (existing?.anggota_id !== anggota.id) {
    errRedirect("/dashboard/proker-saya", "Tidak diizinkan.")
  }

  const { error } = await supabase
    .from("proker_anggota")
    .update({
      nama: String(formData.get("nama")),
      deskripsi: formData.get("deskripsi") || null,
      pilar: String(formData.get("pilar")),
      status: String(formData.get("status")),
    })
    .eq("id", id)

  if (error) errRedirect(`/dashboard/proker-saya/${id}/edit`, error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/proker-saya")
  redirect("/dashboard/proker-saya?success=1")
}

export async function hapusProkerSaya(formData: FormData) {
  const anggota = await getCurrentAnggota()
  if (!anggota) errRedirect("/dashboard/proker-saya", "Profil belum diklaim.")

  const supabase = createAdminClient()
  const id = String(formData.get("id"))

  const { data: existing } = await supabase
    .from("proker_anggota")
    .select("anggota_id")
    .eq("id", id)
    .single()

  if (existing?.anggota_id !== anggota.id) {
    errRedirect("/dashboard/proker-saya", "Tidak diizinkan.")
  }

  const { error } = await supabase.from("proker_anggota").delete().eq("id", id)
  if (error) errRedirect("/dashboard/proker-saya", error.message)

  revalidatePath("/tim")
  revalidatePath("/dashboard/proker-saya")
}
