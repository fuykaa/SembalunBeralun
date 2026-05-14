import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function getCurrentAnggota() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const admin = createAdminClient()
  const { data } = await admin
    .from("anggota")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return data ?? null
}

export async function isAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  // Developer/super admin bypass via env var
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean)
  if (adminEmails.includes(user.email ?? "")) return true

  const anggota = await getCurrentAnggota()
  return anggota?.role === "admin"
}
