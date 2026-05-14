import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const email = data.user.email ?? ""

      const adminEmails = (process.env.ADMIN_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean)

      if (adminEmails.includes(email)) {
        return NextResponse.redirect(`${origin}/dashboard`)
      }

      if (email.endsWith("@mail.ugm.ac.id")) {
        const admin = createAdminClient()
        const { data: anggota } = await admin
          .from("anggota")
          .select("id")
          .eq("email", email)
          .maybeSingle()

        if (anggota) {
          return NextResponse.redirect(`${origin}/dashboard`)
        }
      }

      await supabase.auth.signOut()
      return NextResponse.redirect(`${origin}/login?error=not-member`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
