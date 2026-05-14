import Link from "next/link"
import Image from "next/image"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdmin } from "@/lib/supabase/get-current-anggota"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/dashboard/delete-button"
import { FormAlert } from "@/components/dashboard/form-alert"
import { hapusFotoDesa, toggleFeaturedDesa } from "./actions"
import { StarButton } from "@/components/dashboard/star-button"

export default async function GaleriDesaDashboardPage() {
  const [supabase, admin] = [createAdminClient(), await isAdmin()]
  const { data: fotos } = await supabase
    .from("galeri")
    .select("*")
    .eq("tipe", "desa")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false })

  return (
    <div>
      <FormAlert successText="Foto desa berhasil diupload." />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Galeri Desa</h1>
        <Button asChild size="sm">
          <Link href="/dashboard/galeri-desa/tambah">+ Tambah Foto</Link>
        </Button>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Foto daya tarik desa yang ditampilkan di halaman publik <strong>/desa</strong>.
        Semua anggota bisa upload; hanya admin yang bisa edit dan hapus.
      </p>

      {!fotos || fotos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada foto. Klik &quot;Tambah Foto&quot; untuk mulai.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {fotos.map((foto) => (
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
                </div>
                {admin && (
                  <div className="flex shrink-0 items-center gap-1">
                    <StarButton id={foto.id} isFeatured={foto.is_featured ?? false} action={toggleFeaturedDesa} />
                    <div className="flex shrink-0 flex-col gap-1">
                      <Button asChild variant="outline" size="xs">
                        <Link href={`/dashboard/galeri-desa/${foto.id}/edit`}>Edit</Link>
                      </Button>
                      <DeleteButton
                        action={hapusFotoDesa}
                        id={foto.id}
                        label={foto.keterangan ?? foto.alt}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
