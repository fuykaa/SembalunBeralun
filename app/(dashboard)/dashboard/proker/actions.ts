"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function tambahProker(formData: FormData) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("proker").insert({
    id: crypto.randomUUID(),
    nama: String(formData.get("nama")),
    deskripsi: String(formData.get("deskripsi")),
    sub_unit: String(formData.get("sub_unit")),
    pilar: String(formData.get("pilar")),
    status: String(formData.get("status")),
  })

  if (error) throw new Error(error.message)

  revalidatePath("/proker")
  revalidatePath("/dashboard/proker")
  redirect("/dashboard/proker")
}

export async function editProker(id: string, formData: FormData) {
  const supabase = createAdminClient()

  const { error } = await supabase.from("proker").update({
    nama: String(formData.get("nama")),
    deskripsi: String(formData.get("deskripsi")),
    sub_unit: String(formData.get("sub_unit")),
    pilar: String(formData.get("pilar")),
    status: String(formData.get("status")),
  }).eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/proker")
  revalidatePath("/dashboard/proker")
  redirect("/dashboard/proker")
}

export async function hapusProker(formData: FormData) {
  const supabase = createAdminClient()
  const id = String(formData.get("id"))

  const { error } = await supabase.from("proker").delete().eq("id", id)
  if (error) throw new Error(error.message)

  revalidatePath("/proker")
  revalidatePath("/dashboard/proker")
}
