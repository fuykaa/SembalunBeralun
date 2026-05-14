-- ============================================================
-- Schema Database KKN Sembalun Beralun
-- Supabase project: kyqxbeuoamimvktjjsuj
-- Update file ini setiap ada perubahan struktur tabel.
-- ============================================================

-- ------------------------------------------------------------
-- anggota
-- Dibuat: Fase 2
-- Kolom user_id & role ditambah: Fase 3 (auth)
-- ------------------------------------------------------------
CREATE TABLE anggota (
  id            TEXT PRIMARY KEY,           -- crypto.randomUUID() dari app
  nama          TEXT NOT NULL,
  nama_panggilan TEXT,
  sub_unit      TEXT NOT NULL CHECK (sub_unit IN ('sembalun', 'sajang')),
  fakultas      TEXT NOT NULL,
  jurusan       TEXT NOT NULL,
  angkatan      INTEGER NOT NULL,
  jabatan       TEXT,                       -- mis: Kormanit, Kormasit, Kormater Agro
  foto_path     TEXT,                       -- path relatif ke /public/images/tim/
  bio           TEXT,
  instagram     TEXT,
  linkedin      TEXT,
  email         TEXT,
  user_id       UUID UNIQUE,               -- auth.uid() setelah anggota klaim profil
  role          TEXT NOT NULL DEFAULT 'anggota' CHECK (role IN ('anggota', 'admin'))
);

-- ------------------------------------------------------------
-- proker (Program Kerja Unggulan)
-- Dibuat: Fase 2
-- Dikelola admin saja.
-- ------------------------------------------------------------
CREATE TABLE proker (
  id        TEXT PRIMARY KEY,              -- crypto.randomUUID() dari app
  nama      TEXT NOT NULL,
  deskripsi TEXT NOT NULL,
  sub_unit  TEXT NOT NULL CHECK (sub_unit IN ('sembalun', 'sajang', 'bersama')),
  pilar     TEXT NOT NULL CHECK (pilar IN ('agrowisata', 'pemberdayaan', 'digital', 'pendidikan')),
  status    TEXT NOT NULL DEFAULT 'direncanakan'
              CHECK (status IN ('direncanakan', 'berjalan', 'terlaksana'))
);

-- ------------------------------------------------------------
-- proker_anggota (Proker Individual per Anggota)
-- Dibuat: Fase 3 (sesi proker individual)
-- Max 5 per anggota (enforced di app layer).
-- ------------------------------------------------------------
CREATE TABLE proker_anggota (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anggota_id  TEXT NOT NULL REFERENCES anggota(id) ON DELETE CASCADE,
  nama        TEXT NOT NULL,
  deskripsi   TEXT,
  pilar       TEXT NOT NULL CHECK (pilar IN ('agrowisata', 'pemberdayaan', 'digital', 'pendidikan')),
  status      TEXT NOT NULL DEFAULT 'direncanakan'
                CHECK (status IN ('direncanakan', 'berjalan', 'terlaksana')),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------
-- galeri
-- Dibuat: Fase 3 (manajemen galeri)
-- Kolom created_by & tipe ditambah: Fase 3 (auth + split galeri)
-- tipe='tim'  → Galeri Tim (anggota upload, hapus milik sendiri)
-- tipe='desa' → Galeri Desa (semua upload, hanya admin hapus)
-- ------------------------------------------------------------
CREATE TABLE galeri (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path TEXT NOT NULL,              -- path di Supabase Storage bucket 'galeri'
  url          TEXT NOT NULL,              -- public URL
  alt          TEXT NOT NULL,              -- alt text aksesibilitas
  keterangan   TEXT,
  kategori     TEXT,                       -- untuk galeri tim: sembalun/sajang/bersama
  tipe         TEXT NOT NULL DEFAULT 'tim' CHECK (tipe IN ('tim', 'desa')),
  is_featured  BOOLEAN NOT NULL DEFAULT FALSE, -- foto berbintang tampil duluan di /galeri
  created_by   UUID,                       -- auth.uid() uploader
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------
-- log_narsum (Log Pertemuan Narasumber)
-- Dibuat: Fase 3
-- Kolom created_by ditambah: Fase 3 (auth)
-- Anggota bisa tambah log sendiri; edit/hapus hanya milik sendiri atau admin.
-- ------------------------------------------------------------
CREATE TABLE log_narsum (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tanggal     DATE NOT NULL,
  nama_narsum TEXT NOT NULL,
  jabatan     TEXT,
  institusi   TEXT,
  topik       TEXT NOT NULL,
  hasil       TEXT,
  sub_unit    TEXT NOT NULL CHECK (sub_unit IN ('sembalun', 'sajang', 'bersama')),
  created_by  UUID,                        -- auth.uid() pembuat log
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
