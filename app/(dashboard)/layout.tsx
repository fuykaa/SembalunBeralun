import Link from "next/link"
import { LayoutDashboard, Users, ClipboardList, ExternalLink } from "lucide-react"

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/anggota", label: "Anggota", icon: Users },
  { href: "/dashboard/proker", label: "Program Kerja", icon: ClipboardList },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            Lihat Website <ExternalLink className="size-3" />
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>
    </div>
  )
}
