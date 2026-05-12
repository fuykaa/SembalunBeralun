export type Proker = {
  id: string
  nama: string
  deskripsi: string
  subUnit: "sembalun" | "sajang" | "bersama"
  pilar: "agrowisata" | "pemberdayaan" | "digital" | "pendidikan"
  status: "terlaksana" | "berjalan" | "direncanakan"
}

export const proker: Proker[] = [
  {
    id: "placeholder-1",
    nama: "Nama Program Kerja",
    deskripsi: "Deskripsi singkat program kerja ini.",
    subUnit: "sembalun",
    pilar: "agrowisata",
    status: "direncanakan",
  },
  {
    id: "placeholder-2",
    nama: "Nama Program Kerja",
    deskripsi: "Deskripsi singkat program kerja ini.",
    subUnit: "sajang",
    pilar: "pemberdayaan",
    status: "direncanakan",
  },
  {
    id: "placeholder-3",
    nama: "Nama Program Kerja",
    deskripsi: "Deskripsi singkat program kerja ini.",
    subUnit: "bersama",
    pilar: "digital",
    status: "direncanakan",
  },
]
