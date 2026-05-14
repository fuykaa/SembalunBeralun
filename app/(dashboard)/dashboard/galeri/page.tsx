import Link from "next/link"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { hapusFoto } from "./actions"

export default async function GaleriDashboardPage() {
  const [authClient, admin] = await Promise.all([createClient(), isAdmin()])
  const {
    data: { user },
  } = await authClient.auth.getUser()

  const supabase = createAdminClient()
  const { data: fotos } = await supabase
    .from("galeri")
    .select("*")
    .eq("tipe", "tim")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Galeri Tim</h1>
        <Button asChild size="sm">
          <Link href="/dashboard/galeri/tambah">+ Tambah Foto</Link>
        </Button>
      </div>

      {!fotos || fotos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada foto. Klik &quot;Tambah Foto&quot; untuk mulai.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {fotos.map((foto) => {
            const canDelete = admin || foto.created_by === user?.id
            return (
              <div
                key={foto.id}
                className="overflow-hidden rounded-xl border border-border bg-background"
              >
                <div className="relative aspect-square">
                  <Image
                    src={foto.url}
                    alt={foto.alt}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-2 p-2">
                  <div className="min-w-0 flex-1">
                    {foto.keterangan && (
                      <p className="truncate text-xs text-muted-foreground">{foto.keterangan}</p>
                    )}
                    {foto.kategori && (
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                        style={{ background: "var(--hijau-sembalun)", color: "#1a2e15" }}
                      >
                        {foto.kategori}
                      </span>
                    )}
                  </div>
                  {canDelete && (
                    <DeleteButton
                      action={hapusFoto}
                      id={foto.id}
                      label={foto.keterangan ?? foto.alt}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
