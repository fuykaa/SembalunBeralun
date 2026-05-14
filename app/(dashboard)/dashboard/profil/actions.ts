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

export async function updateProfil(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()

  // Verifikasi bahwa record ini milik user yang sedang login
  const { data: anggota } = await admin
    .from("anggota")
    .select("user_id")
    .eq("id", id)
    .single()

  if (anggota?.user_id !== user.id) throw new Error("Tidak diizinkan.")

  const { error } = await admin
    .from("anggota")
    .update({
      nama_panggilan: nullable(formData.get("nama_panggilan")),
      bio: nullable(formData.get("bio")),
      foto_path: nullable(formData.get("foto_path")),
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
