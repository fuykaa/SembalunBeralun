export type SubUnitAnggota = "sembalun" | "sajang"
export type SubUnitProker = "sembalun" | "sajang" | "bersama"
export type PilarProker = "agrowisata" | "pemberdayaan" | "digital" | "pendidikan"
export type StatusProker = "terlaksana" | "berjalan" | "direncanakan"

export type Anggota = {
  id: string
  nama: string
  nama_panggilan: string | null
  sub_unit: SubUnitAnggota
  fakultas: string
  jurusan: string
  angkatan: number
  jabatan: string | null
  foto_path: string | null
  bio: string | null
  instagram: string | null
  linkedin: string | null
  email: string | null
  user_id: string | null
  role: "anggota" | "admin"
}

export type ProkerAnggota = {
  id: string
  anggota_id: string
  nama: string
  deskripsi: string | null
  pilar: PilarProker
  status: StatusProker
}

export type Proker = {
  id: string
  nama: string
  deskripsi: string
  sub_unit: SubUnitProker
  pilar: PilarProker
  status: StatusProker
}
