"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function nullable(val: FormDataEntryValue | null): string | null {
  return val === "" || val === null ? null : String(val)
}

function errRedirect(path: string, msg: string): never {
  redirect(path + "?error=" + encodeURIComponent(msg))
}

export async function tambahLog(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()

  const { error } = await admin.from("log_narsum").insert({
    tanggal: String(formData.get("tanggal")),
    nama_narsum: String(formData.get("nama_narsum")),
    jabatan: nullable(formData.get("jabatan")),
    institusi: nullable(formData.get("institusi")),
    topik: String(formData.get("topik")),
    hasil: nullable(formData.get("hasil")),
    sub_unit: String(formData.get("sub_unit")),
    created_by: user.id,
  })

  if (error) errRedirect("/dashboard/narsum/tambah", error.message)

  revalidatePath("/dashboard/narsum")
  redirect("/dashboard/narsum?success=1")
}

export async function editLog(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()

  const { data: log } = await admin
    .from("log_narsum")
    .select("created_by")
    .eq("id", id)
    .single()

  if (log?.created_by !== user.id && !(await isAdmin())) {
    errRedirect("/dashboard/narsum", "Tidak diizinkan.")
  }

  const { error } = await admin
    .from("log_narsum")
    .update({
      tanggal: String(formData.get("tanggal")),
      nama_narsum: String(formData.get("nama_narsum")),
      jabatan: nullable(formData.get("jabatan")),
      institusi: nullable(formData.get("institusi")),
      topik: String(formData.get("topik")),
      hasil: nullable(formData.get("hasil")),
      sub_unit: String(formData.get("sub_unit")),
    })
    .eq("id", id)

  if (error) errRedirect(`/dashboard/narsum/${id}/edit`, error.message)

  revalidatePath("/dashboard/narsum")
  redirect("/dashboard/narsum?success=1")
}

export async function hapusLog(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const admin = createAdminClient()
  const id = String(formData.get("id"))

  const { data: log } = await admin
    .from("log_narsum")
    .select("created_by")
    .eq("id", id)
    .single()

  if (log?.created_by !== user.id && !(await isAdmin())) {
    errRedirect("/dashboard/narsum", "Tidak diizinkan.")
  }

  const { error } = await admin.from("log_narsum").delete().eq("id", id)
  if (error) errRedirect("/dashboard/narsum", error.message)

  revalidatePath("/dashboard/narsum")
}
