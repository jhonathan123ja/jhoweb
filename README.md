# Sistem Rekam Medis - localStorage Version

Sistem manajemen rekam medis berbasis web dengan penyimpanan data menggunakan localStorage browser untuk kemudahan penggunaan dan pengembangan.

## 🚀 Fitur Utama

- ✅ Autentikasi pengguna (Admin, Dokter)
- ✅ Manajemen data dokter, pasien, dan obat
- ✅ Pencatatan rekam medis
- ✅ Sistem jadwal dokter
- ✅ Dashboard dengan statistik real-time
- ✅ Interface responsif dengan Bootstrap
- ✅ Penyimpanan data di localStorage browser
- ✅ Tidak memerlukan server/database eksternal

## 📋 Persyaratan Sistem

- **Browser**: Modern browser dengan JavaScript dan localStorage support
- **Tidak memerlukan**: Server, database, atau software tambahan
- **Kompatibilitas**: Semua browser modern (Chrome, Firefox, Safari, Edge)

## 🛠️ Instalasi dan Setup

### Cara Menjalankan:

1. **Download atau clone** repository ini
2. **Buka file `index.html`** di browser web Anda
3. **Sistem siap digunakan!**

### Akun Default:
- **Admin**: username: `admin`, password: `admin123`
- **Dokter**: Buat akun baru melalui halaman register

### Fitur Utama:
- **Admin Dashboard**: Mengelola dokter, pasien, obat, dan melihat laporan
- **Doctor Dashboard**: Mengelola rekam medis pasien
- **Data Storage**: Semua data tersimpan di browser localStorage
- **Responsive Design**: Bekerja di desktop dan mobile

## 📁 Struktur File

```
rekam-medis/
├── index.html              # Halaman utama
├── login.html              # Halaman login
├── register.html           # Halaman registrasi
├── css/
│   └── style.css          # Styling aplikasi
├── js/
│   └── script.js          # Logic aplikasi (localStorage)
└── pages/
    ├── dashboard.html      # Dashboard admin
    ├── doctor-dashboard.html # Dashboard dokter
    ├── add-record.html     # Tambah rekam medis
    ├── edit-record.html    # Edit rekam medis
    ├── view-records.html   # Lihat rekam medis
    ├── manage-doctors.html # Kelola dokter
    ├── manage-patients.html # Kelola pasien
    ├── manage-medicines.html # Kelola obat
    └── ...
```

## � Fitur Export & Laporan

### Export Data
- **CSV Format**: Export data dalam format CSV untuk spreadsheet
- **PDF Format**: Export laporan profesional dengan:
  - Header perusahaan yang elegan
  - Tabel data yang terstruktur
  - Footer dengan informasi tanggal dan halaman
  - Format yang siap cetak

### Jenis Laporan PDF:
- **Laporan Data Pasien**: Detail informasi pasien
- **Laporan Data Dokter**: Daftar dokter dan spesialisasi
- **Laporan Data Obat**: Inventori obat dengan nilai total
- **Laporan Rekam Medis**: Riwayat pengobatan pasien
- **Laporan Lengkap**: Semua data dalam satu dokumen PDF

### Fitur Khusus PDF:
- ✅ Header dengan branding Sistem Rekam Medis
- ✅ Tabel dengan styling profesional
- ✅ Footer dengan timestamp dan nomor halaman
- ✅ Format A4 siap cetak
- ✅ Multi-page support untuk data besar
- ✅ Ringkasan statistik di setiap laporan

---

**Versi**: 1.0 - localStorage Version
**Tanggal**: Januari 2026
**Kompatibilitas**: Semua browser modern