import { LoginButton } from "./login-button"

const errorMessages: Record<string, string> = {
  domain: "Hanya akun @mail.ugm.ac.id yang diizinkan masuk.",
  auth: "Terjadi kesalahan saat login. Coba lagi.",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard KKN
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sembalun Beralun · Universitas Gadjah Mada
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errorMessages[error] ?? errorMessages.auth}
            </div>
          )}
          <LoginButton />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Gunakan akun <span className="font-medium">@mail.ugm.ac.id</span>
          </p>
        </div>
      </div>
    </div>
  )
}
