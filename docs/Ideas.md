# IDEAS.md — Ide Fitur Masa Depan

> Tempat menampung ide yang muncul saat ngoding tapi **di luar scope fase saat ini**.
> Jangan langsung diimplementasi. Saat fase baru dimulai, review file ini dan pindahkan yang relevan ke CLAUDE.md.

---

## Format Pencatatan

Tambahkan ide baru di bawah dengan format:

```
### [Judul singkat]
- **Kapan muncul:** tanggal / sesi
- **Konteks:** kenapa kepikiran ini
- **Fase tujuan:** fase 2 / 3 / 4 / nanti
- **Catatan teknis:** (opsional) library, pendekatan, referensi
```

---

## Ide Terkumpul

### Newsletter / langganan update KKN
- **Kapan muncul:** sesi planning awal
- **Konteks:** stakeholder dan keluarga anggota mungkin mau update berkala
- **Fase tujuan:** fase 3+ (butuh Resend)
- **Catatan teknis:** bisa pakai Resend audiences

### Filter & search di galeri
- **Kapan muncul:** sesi planning awal
- **Konteks:** kalau foto sudah banyak, perlu cara navigasi
- **Fase tujuan:** fase 2 (setelah konten pindah ke DB)
- **Catatan teknis:** tag system di Supabase, filter by proker/tanggal/sub-unit

### Map interaktif lokasi proker
- **Kapan muncul:** sesi planning awal
- **Konteks:** Sembalun & Sajang punya banyak titik lokasi kegiatan
- **Fase tujuan:** fase 2+
- **Catatan teknis:** Leaflet atau MapLibre (open-source, tanpa API key)

### Export laporan ke PDF
- **Kapan muncul:** sesi planning awal
- **Konteks:** untuk submission ke DPL atau dokumentasi formal
- **Fase tujuan:** fase 3+
- **Catatan teknis:** react-pdf atau Puppeteer di Edge Function

### Integrasi Google Calendar untuk jadwal
- **Kapan muncul:** sesi planning awal
- **Konteks:** anggota mungkin sudah pakai GCal, sinkronisasi memudahkan
- **Fase tujuan:** fase 3+
- **Catatan teknis:** Google Calendar API, OAuth scope tambahan