import { Mail } from "lucide-react"
import { InstagramIcon } from "@/components/public/instagram-icon"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row">
        <p>
          KKN Sembalun Beralun &mdash; Universitas Gadjah Mada &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/sembalun.beralun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram KKN Sembalun Beralun"
            className="transition-colors hover:text-foreground"
          >
            <InstagramIcon className="size-4" />
          </a>
          <a
            href="mailto:alunansembalun@gmail.com"
            aria-label="Email KKN Sembalun Beralun"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
