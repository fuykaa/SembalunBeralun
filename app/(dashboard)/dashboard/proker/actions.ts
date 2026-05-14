"use server"

import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function errRedirect(path: string, msg: string): never {
  redirect(path + "?error=" + encodeURIComponent(msg))
}

export async function tambahProker(formData: FormData) {
  if (!(await isAdmin())) redirect("/dashboard")

  const supabase = createAdminClient()

  const { error } = await supabase.from("proker").insert({
    id: crypto.randomUUID(),
    nama: String(formData.get("nama")),
    deskripsi: String(formData.get("deskripsi")),
    sub_unit: String(formData.get("sub_unit")),
    pilar: String(formData.get("pilar")),
    status: String(formData.get("status")),
  })

  if (error) errRedirect("/dashboard/proker/tambah", error.message)

  revalidatePath("/proker")
  revalidatePath("/dashboard/proker")
  redirect("/dashboard/proker?success=1")
}

export async function editProker(id: string, formData: FormData) {
  if (!(await isAdmin())) redirect("/dashboard")

  const supabase = createAdminClient()

  const { error } = await supabase
    .from("proker")
    .update({
      nama: String(formData.get("nama")),
      deskripsi: String(formData.get("deskripsi")),
      sub_unit: String(formData.get("sub_unit")),
      pilar: String(formData.get("pilar")),
      status: String(formData.get("status")),
    })
    .eq("id", id)

  if (error) errRedirect(`/dashboard/proker/${id}/edit`, error.message)

  revalidatePath("/proker")
  revalidatePath("/dashboard/proker")
  redirect("/dashboard/proker?success=1")
}

export async function hapusProker(formData: FormData) {
  if (!(await isAdmin())) redirect("/dashboard")

  const supabase = createAdminClient()
  const id = String(formData.get("id"))

  const { error } = await supabase.from("proker").delete().eq("id", id)
  if (error) errRedirect("/dashboard/proker", error.message)

  revalidatePath("/proker")
  revalidatePath("/dashboard/proker")
}
