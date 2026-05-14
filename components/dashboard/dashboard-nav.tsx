"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Images,
  BookOpen,
  UserCircle,
  ListChecks,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
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

export function DashboardNav({
  displayName,
  signOut,
}: {
  displayName: string
  signOut: () => Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold text-foreground">Dashboard KKN</span>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground",
                  pathname === href ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
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

        <button
          className="rounded-md p-2 text-foreground transition-colors hover:bg-muted md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors",
                    pathname === href
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="truncate text-xs text-muted-foreground">{displayName}</span>
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Lihat Website <ExternalLink className="size-3" />
                  </Link>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="size-3.5" />
                      Keluar
                    </button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
