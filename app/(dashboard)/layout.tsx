import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Users, ClipboardList, Images, BookOpen, UserCircle, ListChecks, ExternalLink, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/anggota", label: "Anggota", icon: Users },
  { href: "/dashboard/proker", label: "Program Kerja", icon: ClipboardList },
  { href: "/dashboard/galeri", label: "Galeri Tim", icon: Images },
  { href: "/dashboard/galeri-desa", label: "Galeri Desa", icon: Images },
  { href: "/dashboard/narsum", label: "Log Narsum", icon: BookOpen },
  { href: "/dashboard/proker-saya", label: "Proker Saya", icon: ListChecks },
  { href: "/dashboard/profil", label: "Profil Saya", icon: UserCircle },
]

async function signOut() {
  "use server"
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "Pengguna"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-foreground">
              Dashboard KKN
            </span>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-3.5" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Lihat Website <ExternalLink className="size-3" />
            </Link>
            <div className="h-4 w-px bg-border" />
            <span className="max-w-[160px] truncate text-xs text-muted-foreground">
              {displayName}
            </span>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="xs" className="gap-1.5 text-muted-foreground">
                <LogOut className="size-3.5" />
                Keluar
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>
    </div>
  )
}
