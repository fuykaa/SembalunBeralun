import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const email = data.user.email ?? ""
      if (email.endsWith("@mail.ugm.ac.id")) {
        return NextResponse.redirect(`${origin}/dashboard`)
      }
      await supabase.auth.signOut()
      return NextResponse.redirect(`${origin}/login?error=domain`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`)
}
