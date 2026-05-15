-- Seed data 29 anggota KKN Sembalun Beralun UGM
-- sub_unit = 'sajang' sementara, nanti dipisah manual
-- Jalankan di Supabase SQL Editor

INSERT INTO anggota (id, nama, nama_panggilan, sub_unit, fakultas, jurusan, angkatan, jabatan, foto_path, bio, instagram, linkedin, email, user_id, role) VALUES

-- SOSHUM
(gen_random_uuid(), 'Akbar Bayu Laksono', NULL, 'sajang', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Departemen Politik dan Pembangunan', 2023, NULL, NULL, NULL, NULL, NULL, 'akbarbayulaksono@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Talita Yosefin', NULL, 'sajang', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Departemen Politik dan Pembangunan', 2023, NULL, NULL, NULL, NULL, NULL, 'talitayosefinmanurung@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Marwah Zakiyah', NULL, 'sajang', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Pembangunan Sosial dan Kesejahteraan', 2023, NULL, NULL, NULL, NULL, NULL, 'marwahrafiatuzzakiyah@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Jason Emmanuel', NULL, 'sajang', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Ilmu Komunikasi', 2023, NULL, NULL, NULL, NULL, NULL, 'jasonemmanuel669@gmail.com', NULL, 'anggota'),
(gen_random_uuid(), 'Wieyza Ananda Luqman', NULL, 'sajang', 'Sekolah Vokasi', 'Manajemen Penilaian Properti', 2023, NULL, NULL, NULL, NULL, NULL, 'wieyzaanandaluqman2005@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Naora Anjani Wicakso', NULL, 'sajang', 'Sekolah Vokasi', 'Bisnis Perjalanan Wisata', 2023, NULL, NULL, NULL, NULL, NULL, 'naoranjn@gmail.com', NULL, 'anggota'),
(gen_random_uuid(), 'Khoirunnisa Yasmin', NULL, 'sajang', 'Fakultas Psikologi', 'Psikologi', 2023, NULL, NULL, NULL, NULL, NULL, 'khoirunnisayasminwillemina@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Kayla Angelica Kosasih', NULL, 'sajang', 'Fakultas Hukum', 'Hukum', 2023, NULL, NULL, NULL, NULL, NULL, 'kaylaangelicakosasih@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Elvina Syarifah Hery Maharani', NULL, 'sajang', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Ilmu Komunikasi', 2023, NULL, NULL, NULL, NULL, NULL, 'elvinasyarifahherymaharani2005@mail.ugm.ac.id', NULL, 'anggota'),

-- SAINTEK
(gen_random_uuid(), 'Siti Mutiara Az-Zahra', NULL, 'sajang', 'Fakultas Matematika dan Ilmu Pengetahuan Alam', 'Ilmu Aktuaria', 2023, NULL, NULL, NULL, NULL, NULL, 'sitimutiaraaz-zahra@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Lorria Ardhani Fadilla', NULL, 'sajang', 'Fakultas Matematika dan Ilmu Pengetahuan Alam', 'Kimia', 2023, NULL, NULL, NULL, NULL, NULL, 'lorriaardhanifadilla2005@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Kistosi Al Ghifari', NULL, 'sajang', 'Fakultas Teknik', 'Teknologi Informasi', 2023, NULL, NULL, NULL, NULL, NULL, 'kistosialghifari2005@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Hakan Rifqi', NULL, 'sajang', 'Fakultas Teknik', 'Teknik Geodesi', 2023, NULL, NULL, NULL, NULL, NULL, 'hakanrifqi@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Yanuar Rizky Darmawan Laksono', NULL, 'sajang', 'Fakultas Teknik', 'Teknik Kimia', 2023, NULL, NULL, NULL, NULL, NULL, 'yanuarrizkydarmawanl@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Luthfiani Fathonah', NULL, 'sajang', 'Fakultas Teknik', 'Teknik Industri', 2023, NULL, NULL, NULL, NULL, NULL, 'luthfianifathonah@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Krisna Budhiantoro Mahdabakti Kusuma', NULL, 'sajang', 'Sekolah Vokasi', 'Teknologi Rekayasa Internet', 2023, NULL, NULL, NULL, NULL, NULL, 'krisnabudhiantoromah@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Dias Lintang Prabowo', NULL, 'sajang', 'Sekolah Vokasi', 'Teknologi Rekayasa Perangkat Lunak', 2023, NULL, NULL, NULL, NULL, NULL, 'diaslintangprabowo@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Muhammad Ihsan Salim', NULL, 'sajang', 'Sekolah Vokasi', 'Teknik Pengelolaan dan Pemeliharaan Infrastruktur Sipil', 2023, NULL, NULL, NULL, NULL, NULL, 'muhammadihsansalim@mail.ugm.ac.id', NULL, 'anggota'),

-- AGRO
(gen_random_uuid(), 'Annisa Tiara Nabila', NULL, 'sajang', 'Fakultas Kedokteran Hewan', 'Kedokteran Hewan', 2023, NULL, NULL, NULL, NULL, NULL, 'annisatiaranabila@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Cita Ayu Larasati', NULL, 'sajang', 'Fakultas Pertanian', 'Ilmu Tanah', 2023, NULL, NULL, NULL, NULL, NULL, 'citaayularasati@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'M Naufal Al Ayyuba', NULL, 'sajang', 'Fakultas Pertanian', 'Agronomi', 2023, NULL, NULL, NULL, NULL, NULL, 'muhammadnaufalalayyuba@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Welly Armando', NULL, 'sajang', 'Fakultas Teknologi Pertanian', 'Teknik Pertanian', 2023, NULL, NULL, NULL, NULL, NULL, 'wellyarmando@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Emma Widyastuti', NULL, 'sajang', 'Fakultas Pertanian', 'Ekonomi Pertanian dan Agribisnis', 2023, NULL, NULL, NULL, NULL, NULL, 'emmawidyastuti2004@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Salma Alvina Putri', NULL, 'sajang', 'Fakultas Teknologi Pertanian', 'Teknologi Pangan dan Hasil Pertanian', 2023, NULL, NULL, NULL, NULL, NULL, 'salmaalvinaputri@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Hasen Falqo Hermas Sanjaya', NULL, 'sajang', 'Fakultas Peternakan', 'Ilmu dan Industri Peternakan', 2023, NULL, NULL, NULL, NULL, NULL, 'hasenfalqohermassanjaya@mail.ugm.ac.id', NULL, 'anggota'),

-- MEDIKA
(gen_random_uuid(), 'Evellyn Cetta Salsabilla', NULL, 'sajang', 'Fakultas Farmasi', 'Farmasi', 2023, NULL, NULL, NULL, NULL, NULL, 'evellyncettasalsabilla@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Muhammad Awan Adhim Majid', NULL, 'sajang', 'Fakultas Farmasi', 'Farmasi', 2023, NULL, NULL, NULL, NULL, NULL, 'muhammadawanadhimmajid2004@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Nazhifa Nasywa Nisrina', NULL, 'sajang', 'Fakultas Kedokteran, Kesehatan Masyarakat, dan Keperawatan', 'Gizi Kesehatan', 2023, NULL, NULL, NULL, NULL, NULL, 'nazhifanasywanisrina@mail.ugm.ac.id', NULL, 'anggota'),
(gen_random_uuid(), 'Fadhiil Lathief', NULL, 'sajang', 'Fakultas Kedokteran Gigi', 'Kedokteran Gigi', 2023, NULL, NULL, NULL, NULL, NULL, 'fadhiillathief@mail.ugm.ac.id', NULL, 'anggota');
