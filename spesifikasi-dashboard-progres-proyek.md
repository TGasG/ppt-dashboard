# Spesifikasi Dashboard Progres Proyek
### PT Pembangunan Property (PPt) — Digital Transformation Office

| | |
|---|---|
| Nama sistem | Papan Direksi — Dashboard Progres Proyek |
| Versi dokumen | 1.0 |
| Tanggal | 15 September 2026 |
| Disusun untuk | Direktur Digital Transformation Office |
| Status | Rancangan untuk ditinjau |
| Lampiran | `dashboard-progres-proyek-ppt.html` (prototipe antarmuka) |

---

## 1. Latar Belakang dan Tujuan

### 1.1 Latar belakang

Ekspansi bisnis PPt berjalan lebih cepat daripada kemampuan sistem informasinya. Audit internal menemukan empat kelompok masalah yang berulang:

1. Selisih besar antara material yang dipesan dan stok di gudang, dengan dugaan kehilangan material dalam perjalanan dari gudang ke lokasi konstruksi.
2. Ketidakseimbangan stok antar lokasi — surplus di satu proyek, defisit di proyek lain, yang menghambat pekerjaan.
3. Pelaporan audit yang masih manual, sehingga tindak lanjut teknis tertunda 1–2 minggu dan daftar temuan terus bertambah.
4. Komunikasi yang buruk dengan masyarakat sekitar proyek, yang beberapa kali berujung pada perusakan proyek.

### 1.2 Tujuan sistem

Dashboard ini menyediakan satu tampilan tunggal bagi Dewan Direksi untuk memantau seluruh portofolio proyek secara langsung, mengenali proyek bermasalah sebelum kerugian membesar, dan mengarahkan tindakan koreksi kepada manajer operasional yang tepat.

### 1.3 Sasaran terukur

| Sasaran | Kondisi saat ini | Target 12 bulan |
|---|---|---|
| Waktu temuan audit sampai tindak lanjut | 9,4 hari | ≤ 3 hari |
| Selisih material gudang ke lokasi | 6,8% | ≤ 2% |
| Hari berhenti kerja karena kekurangan material | 46 hari-proyek/kuartal | ≤ 10 |
| Biaya perbaikan ulang | Rp 74,3 M/tahun | turun 50% |
| Waktu tanggap aduan masyarakat | 2,8 hari | ≤ 1 hari |
| Kesegaran data di dashboard | laporan mingguan | ≤ 5 menit |

### 1.4 Batasan

Dashboard ini bersifat **baca dan pantau**. Sistem tidak menggantikan ERP, tidak dipakai untuk menyetujui transaksi, dan tidak menjadi sumber kebenaran data. Seluruh angka berasal dari sistem sumber. Penyesuaian data hanya boleh dilakukan di sistem sumbernya.

---

## 2. Pengguna dan Kebutuhan

| Peran | Kebutuhan utama | Tingkat kedalaman | Perangkat |
|---|---|---|---|
| Dewan Direksi | Kondisi portofolio, proyek berisiko, isu yang menunggu keputusan | Ringkasan, drill-down satu tingkat | Layar besar ruang direksi, tablet |
| Direktur Operasi | Proyek bermasalah, penyebabnya, penanggung jawab | Ringkasan sampai detail proyek | Desktop, tablet |
| Manajer Operasional | Proyek yang dia pegang, temuan terbuka, stok kritis | Detail proyek dan daftar temuan | Aplikasi seluler |
| Divisi Analitik | Verifikasi angka, penelusuran data mentah | Penuh, termasuk ekspor | Desktop |
| Tim Audit Internal | Anomali material, riwayat temuan | Detail temuan | Tablet, desktop |

### 2.1 Prinsip desain

- **Tampilkan yang menyimpang, bukan semuanya.** Panel menonjolkan proyek dan indikator yang melewati batas. Proyek yang berjalan normal cukup terlihat hijau.
- **Satu pandangan, satu kesimpulan.** Setiap panel menjawab satu pertanyaan direksi.
- **Berjenjang.** Portofolio → proyek → temuan atau isu. Tidak lebih dari tiga tingkat.
- **Setiap angka punya pemilik.** Isu kritis selalu disertai nama penanggung jawab dan tenggat.
- **Bahasa bisnis, bukan bahasa sistem.** "Selisih material", bukan "variance inventory reconciliation".

---

## 3. Arsitektur Informasi

```
Papan Direksi
├── A. Papan proyek (hero)          — kondisi seluruh portofolio
│   └── Panel rincian proyek        — drill-down saat kartu dipilih
├── B. Jadwal dan biaya
│   ├── B1. Kurva-S rencana vs aktual
│   └── B2. Anggaran vs realisasi
├── C. Material dan rantai pasok
│   ├── C1. Jejak material
│   └── C2. Keseimbangan stok antar proyek
├── D. Mutu dan tindak lanjut
│   ├── D1. Tren temuan inspeksi
│   ├── D2. Umur temuan terbuka
│   └── D3. Keselamatan dan sumber daya
├── E. Hubungan masyarakat
│   ├── E1. Suara masyarakat
│   ├── E2. Indeks risiko sosial
│   └── E3. Program komunitas
└── F. Peringatan dini
    ├── F1. Prediksi risiko proyek
    └── F2. Isu kritis menunggu keputusan
```

Penyaring global yang berlaku ke seluruh panel: **Semua / Perumahan / Gedung / Infrastruktur / Perlu perhatian**.

---

## 4. Spesifikasi Panel

### A. Papan Proyek

**Pertanyaan yang dijawab:** Proyek mana yang sedang bermasalah hari ini?

Setiap proyek ditampilkan sebagai kartu berisi nama, kategori, nilai kontrak, batang progres aktual dengan penanda posisi rencana, progres, dan SPI. Pita warna di sisi kiri menyatakan status RAG. Kartu dengan selisih material di atas ambang diberi penanda "Anomali".

**Aturan penetapan status RAG**

| Status | Kondisi |
|---|---|
| Merah (Kritis) | SPI < 0,90 **atau** CPI < 0,92 **atau** selisih material > 5% |
| Kuning (Waspada) | SPI < 0,95 **atau** CPI < 0,96 **atau** selisih material > 2,5% |
| Hijau (Sesuai rencana) | tidak memenuhi kondisi di atas |

Ambang batas dikelola oleh Divisi Analitik dan dapat diubah tanpa mengubah kode.

**Panel samping** menampilkan jumlah proyek aktif dengan rincian RAG, total nilai kontrak berjalan beserta porsi yang berada di proyek kritis, dan lima proyek dengan skor risiko tertinggi.

**Interaksi:** memilih kartu membuka panel rincian berisi progres fisik vs rencana, SPI dan CPI, selisih material, jumlah temuan terbuka dan umur temuan tertua, skor risiko, serta langkah yang diusulkan sistem.

| Sumber data | Kesegaran |
|---|---|
| ERP modul Project Management, ERP modul keuangan, aplikasi inspeksi | 15 menit |

---

### B1. Kurva-S Rencana vs Aktual

**Pertanyaan:** Apakah portofolio akan selesai tepat waktu?

Grafik garis progres kumulatif: rencana, aktual, dan proyeksi akhir tahun berdasarkan laju tiga bulan terakhir. Area proyeksi diberi latar berbeda agar tidak tertukar dengan data aktual.

**Indikator pendamping:** SPI portofolio, jumlah milestone terlambat, rata-rata deviasi tanggal selesai, progres fisik aktual.

**Rumus:**
```
SPI = Earned Value / Planned Value
Deviasi selesai = tanggal selesai proyeksi − tanggal selesai kontrak (hari)
Proyeksi = progres aktual + (laju rata-rata 3 bulan × sisa bulan)
```

| Sumber data | Kesegaran |
|---|---|
| ERP modul Project Management, laporan harian lapangan via tablet | harian pukul 06.00 |

---

### B2. Anggaran vs Realisasi

**Pertanyaan:** Ke mana uang mengalir dan berapa proyeksi selisihnya?

Batang horizontal per kategori proyek: anggaran (abu) dibanding realisasi (hijau bila terkendali, merah bila melampaui). Baris **Perbaikan ulang** ditampilkan terpisah karena seluruhnya merupakan pemborosan yang seharusnya bisa dicegah.

**Indikator pendamping:** CPI portofolio, proyeksi selisih (EAC − BAC), total biaya perbaikan ulang.

**Rumus:**
```
CPI = Earned Value / Actual Cost
EAC = BAC / CPI
Biaya rework = biaya pekerjaan yang ditandai "perbaikan temuan" pada ERP
```

Pemisahan biaya rework mensyaratkan kode biaya khusus di ERP yang ditautkan ke nomor temuan inspeksi. Ini adalah prasyarat implementasi.

| Sumber data | Kesegaran |
|---|---|
| ERP modul keuangan, tautan ke aplikasi inspeksi | harian |

---

### C1. Jejak Material: Pesan sampai Terpasang

**Pertanyaan:** Di tahap mana material hilang?

Empat tahap ditampilkan sebagai batang menurun dengan persentase susut antar tahap:

```
Dipesan ke pemasok  →  Diterima gudang  →  Keluar gudang  →  Tercatat terpasang
```

Susut terbesar disorot dengan keterangan penyebab dugaan. Tahap "keluar gudang → terpasang" adalah titik yang paling dicurigai berdasarkan temuan audit.

**Indikator pendamping:** selisih gudang ke lokasi (%), nilai rupiah material tidak terlacak, jumlah anomali sensor tujuh hari terakhir.

**Definisi anomali sensor:** kendaraan terdeteksi keluar gerbang proyek membawa muatan tanpa dokumen serah terima yang cocok dalam ERP, atau selisih timbangan masuk-keluar melebihi 3%.

**Rumus:**
```
Selisih (%) = (keluar gudang − tercatat terpasang) / keluar gudang × 100
Nilai tidak terlacak = Σ (selisih kuantitas × harga satuan terakhir)
```

| Sumber data | Kesegaran |
|---|---|
| ERP procurement dan inventory, sensor RFID gerbang, timbangan kendaraan, aplikasi serah terima lapangan | 5 menit (aliran sensor) |

---

### C2. Keseimbangan Stok Antar Proyek

**Pertanyaan:** Proyek mana yang akan berhenti karena kehabisan material, dan dari mana stok bisa diambil?

Matriks material × proyek berisi **hari pasokan tersisa**, dengan pewarnaan:

| Warna | Rentang | Arti |
|---|---|---|
| Merah | ≤ 4 hari | Konstruksi terancam berhenti |
| Kuning | 5–9 hari | Perlu pemesanan segera |
| Hijau | 10–20 hari | Ideal |
| Biru | > 20 hari | Modal mengendap, kandidat dipindahkan |

**Rumus:**
```
Hari pasokan = stok di lokasi / rata-rata pemakaian harian 14 hari terakhir
```

Di bawah matriks ditampilkan **usulan pemindahan stok** berisi material, lokasi asal, lokasi tujuan, jumlah, dan estimasi penghematan. Usulan dihitung dari besarnya defisit, jarak antar lokasi, biaya angkut, dan rencana pemakaian dua minggu ke depan. Usulan bersifat rekomendasi; eksekusi tetap melalui proses persetujuan di ERP.

| Sumber data | Kesegaran |
|---|---|
| ERP inventory lintas lokasi, mesin rekomendasi pada platform big data | 1 jam |

---

### D1. Tren Temuan Inspeksi

**Pertanyaan:** Apakah mutu pekerjaan membaik atau memburuk?

Batang bertumpuk per bulan: temuan yang sudah ditutup dan yang masih terbuka. Bila garis tren temuan terbuka naik, sistem menampilkan keterangan besaran kenaikan.

**Indikator pendamping:** persentase bangunan lolos standar, jumlah temuan terbuka, jumlah temuan berkategori berat.

**Kategori temuan:** Berat (mempengaruhi struktur atau keselamatan), Sedang (mempengaruhi fungsi), Ringan (estetika dan kerapian).

| Sumber data | Kesegaran |
|---|---|
| Aplikasi inspeksi pada tablet, unggah langsung dari lokasi | waktu nyata |

---

### D2. Umur Temuan Terbuka

**Pertanyaan:** Berapa lama temuan menunggu ditindaklanjuti?

Batang horizontal untuk empat kelompok umur: 0–3 hari, 4–7 hari, 8–14 hari, lebih dari 14 hari. Kelompok terakhir diberi warna merah.

**Indikator pendamping:** rata-rata waktu temuan ke tindak lanjut dibandingkan target 3 hari.

**Aturan eskalasi otomatis:**

| Umur temuan | Tindakan sistem |
|---|---|
| > 3 hari | Pengingat ke penanggung jawab lapangan |
| > 7 hari | Notifikasi ke Manajer Operasional |
| > 14 hari | Masuk laporan Direktur Operasi setiap Senin pagi |
| > 14 hari dan berkategori berat | Masuk panel F2 sebagai isu kritis |

| Sumber data | Kesegaran |
|---|---|
| Alur kerja tindak lanjut pada aplikasi inspeksi | waktu nyata |

---

### D3. Keselamatan dan Sumber Daya

**Pertanyaan:** Apakah tenaga kerja dan alat dipakai secara efisien, dan apakah lokasi aman?

Empat indikator ringkas: kehadiran pekerja, utilisasi alat berat, jumlah insiden K3 bulan berjalan, dan hari tanpa insiden berat. Dilengkapi keterangan lokasi dengan alat berat paling menganggur.

Keselamatan kerja tidak disebut eksplisit dalam studi kasus, tetapi merupakan risiko melekat pada proyek konstruksi dan berdampak langsung pada biaya serta reputasi, sehingga dimasukkan ke dalam pemantauan direksi.

**Rumus:**
```
Kehadiran = pekerja terdeteksi masuk / rencana tenaga kerja harian
Utilisasi alat = jam mesin aktif / jam tersedia
```

| Sumber data | Kesegaran |
|---|---|
| Sensor keluar-masuk proyek, telematika alat berat, laporan HSE | 1 jam |

---

### E1. Suara Masyarakat

**Pertanyaan:** Bagaimana persepsi masyarakat terhadap proyek kita?

Batang bertumpuk komposisi sentimen per bulan (positif, netral, negatif), dengan persentase negatif ditampilkan di dalam batang dan keterangan arah tren di bawahnya.

**Indikator pendamping:** jumlah aspirasi masuk bulan berjalan, rata-rata waktu tanggap, jumlah insiden gangguan proyek.

Sentimen dihitung dari analisis teks aduan, komentar media sosial, dan pemberitaan lokal di sekitar radius proyek. Klasifikasi menggunakan model bahasa yang ditinjau berkala oleh Divisi Analitik; sampel acak diperiksa manual setiap bulan untuk memastikan akurasi.

| Sumber data | Kesegaran |
|---|---|
| Social CRM, pemantauan media sosial, kanal aduan aplikasi warga | 30 menit |

---

### E2. Indeks Risiko Sosial

**Pertanyaan:** Lokasi mana yang berpotensi bergejolak?

Tabel peringkat lokasi dengan skor indeks (0–100) dan jumlah aduan yang belum dijawab.

**Rumus indeks:**
```
Indeks = 0,35 × skor sentimen negatif
       + 0,25 × skor aduan belum terjawab
       + 0,20 × skor keterlambatan waktu tanggap
       + 0,20 × skor riwayat insiden 12 bulan
```
Setiap komponen dinormalisasi ke skala 0–100. Bobot dapat disesuaikan oleh Divisi Analitik.

| Sumber data | Kesegaran |
|---|---|
| Social CRM, basis pengetahuan penanganan konflik (CKMS) | 1 jam |

---

### E3. Program Komunitas

**Pertanyaan:** Apakah janji perusahaan kepada masyarakat sudah dipenuhi?

Batang progres realisasi terhadap target untuk: warga lokal yang direkrut, klinik dan posyandu, rumah ibadah yang diperbaiki, dan ruas jalan warga. Panel ini penting karena program komunitas adalah instrumen pencegahan konflik, bukan sekadar laporan CSR.

| Sumber data | Kesegaran |
|---|---|
| Modul CSR dan HR, ditautkan ke lokasi proyek | harian |

---

### F1. Prediksi Risiko Proyek

**Pertanyaan:** Proyek mana yang kemungkinan besar gagal memenuhi target?

Tabel tujuh proyek dengan skor risiko tertinggi (0–100) beserta pemicu utamanya.

**Masukan model:** SPI, CPI, selisih material, jumlah dan umur temuan terbuka, hari pasokan material terendah, indeks risiko sosial, kompleksitas proyek, dan rekam jejak kontraktor pelaksana.

**Interpretasi:** skor di atas 70 berarti model memperkirakan kemungkinan besar keterlambatan lebih dari 30 hari. Model dilatih dari riwayat proyek lima tahun terakhir dan dijalankan ulang setiap malam. Skor adalah alat bantu, bukan pengganti penilaian manajemen; setiap skor selalu disertai pemicu agar direksi dapat menilai kewajarannya.

| Sumber data | Kesegaran |
|---|---|
| Platform big data, model prediksi | harian pukul 02.00 |

---

### F2. Isu Kritis Menunggu Keputusan Direksi

**Pertanyaan:** Apa yang harus diputuskan direksi minggu ini?

Tabel berisi uraian isu, proyek terkait, penanggung jawab, tenggat, dan status. Isu yang melewati tenggat ditandai merah dan otomatis masuk agenda rapat direksi berikutnya.

Isu masuk ke panel ini melalui tiga jalur: eskalasi otomatis dari panel D2, anomali material bernilai di atas Rp 1 M dari panel C1, dan pengajuan manual oleh Direktur Operasi.

| Sumber data | Kesegaran |
|---|---|
| Alur kerja manajemen isu, eskalasi otomatis dari panel lain | waktu nyata |

---

## 5. Sistem Visual

| Aspek | Ketentuan |
|---|---|
| Palet dasar | Beton `#E5E5DF`, panel `#FBFBF8`, garis `#CDCDC4`, tinta `#16233B` |
| Warna status | Merah `#BE3A2B`, kuning `#D9860F`, hijau `#2E7D5B`, biru `#2B5F9E` |
| Warna perhatian | Kuning hi-vis `#F2C200`, dipakai hanya untuk penanda anomali dan garis identitas |
| Huruf angka dan judul | Barlow Condensed — padat, terbaca dari jarak jauh di layar ruang direksi |
| Huruf isi | IBM Plex Sans |
| Bentuk | Sudut siku, tanpa bayangan, garis tipis. Struktur visual berasal dari garis dan warna status, bukan dari kartu bertumpuk |
| Gerak | Hanya sebagai respons tindakan pengguna (membuka panel rincian). Tidak ada animasi otomatis |

Palet diambil dari kosakata visual lapangan konstruksi: warna beton, navy gambar teknik, dan kuning rambu keselamatan. Warna status merah-kuning-hijau tidak pernah dipakai untuk keperluan dekoratif agar maknanya tetap tunggal.

**Aksesibilitas:** rasio kontras teks minimal 4,5:1; status tidak pernah disampaikan hanya lewat warna (selalu disertai angka atau label); fokus papan tik terlihat jelas; preferensi `prefers-reduced-motion` dihormati.

---

## 6. Arsitektur Data dan Teknis

### 6.1 Alur data

```
SUMBER                    PENYERAPAN          PENYIMPANAN        PENGOLAHAN         PENYAJIAN
─────────────────────────────────────────────────────────────────────────────────────────────
ERP (keuangan,        ┐   CDC / batch     ┐                 ┐  Pembersihan     ┐
  PM, inventory,      │   harian          │                 │  dan penyelarasan│
  procurement)        │                   │   Data lake     │                  │  API
                      │                   │   (raw zone)    │  Perhitungan KPI │  agregat
Aplikasi inspeksi     │   API waktu nyata ├──►              ├─►                ├─► ──────────►
  (tablet)            │                   │   Data warehouse│  Mesin           │  Dashboard
                      │                   │   (curated)     │  rekomendasi     │  direksi
Sensor IoT (RFID      │   Message broker  │                 │  stok            │
  gerbang, timbangan, │   (aliran)        │                 │                  │  Aplikasi
  telematika alat)    │                   │   Feature store │  Model prediksi  │  seluler
                      │                   │                 │  risiko          │
Social CRM dan        │   Konektor        │                 │                  │
  media sosial        ┘   terjadwal       ┘                 ┘  Analisis        ┘
                                                               sentimen
```

### 6.2 Komponen

| Lapisan | Peran | Catatan implementasi |
|---|---|---|
| Penyerapan | Menarik data dari sistem sumber | Aliran untuk sensor dan inspeksi, batch harian untuk ERP |
| Data lake | Menyimpan data mentah apa adanya | Menjadi jejak audit; data mentah tidak pernah diubah |
| Data warehouse | Data bersih siap dianalisis | Model dimensi: fakta progres, biaya, material, temuan, aduan |
| Pengolahan | Menghitung KPI, menjalankan model | Perhitungan dilakukan di lapisan ini, bukan di antarmuka |
| API agregat | Melayani dashboard dan aplikasi seluler | Hanya mengirim angka yang sudah dihitung |
| Antarmuka | Dashboard web dan aplikasi seluler | Prototipe terlampir |

### 6.3 Kebutuhan non-fungsional

| Aspek | Ketentuan |
|---|---|
| Waktu muat halaman | ≤ 3 detik pada koneksi kantor |
| Kesegaran data | Sensor 5 menit, inspeksi waktu nyata, ERP harian |
| Ketersediaan | 99,5% pada jam kerja |
| Perangkat | Layar besar ruang direksi, desktop, tablet, ponsel |
| Peramban | Dua versi terakhir Chrome, Edge, Safari |
| Penyimpanan riwayat | Data mentah 5 tahun, agregat 10 tahun |
| Jejak audit | Setiap perubahan ambang batas dan bobot indeks dicatat |

### 6.4 Hak akses

| Peran | Cakupan data | Hak |
|---|---|---|
| Dewan Direksi | Seluruh proyek | Lihat, ekspor |
| Direktur Operasi | Seluruh proyek | Lihat, ekspor, ajukan isu |
| Manajer Operasional | Proyek yang ditugaskan | Lihat, tutup temuan |
| Divisi Analitik | Seluruh proyek | Lihat, ubah ambang batas dan bobot |
| Audit Internal | Seluruh proyek, data mentah material | Lihat, ekspor, tandai anomali |

Data sensitif (nilai kontrak, biaya, identitas pelapor aduan) hanya terlihat sesuai peran. Setiap akses tercatat.

### 6.5 Versi seluler

Aplikasi seluler untuk manajer operasional menampilkan urutan yang disederhanakan: kartu proyek yang ditugaskan kepadanya, temuan terbuka yang mendekati tenggat, stok material di bawah 5 hari, dan aduan masyarakat yang belum dijawab. Notifikasi dorong dikirim untuk eskalasi temuan dan stok kritis.

---

## 7. Keterkaitan dengan Kerangka Tata Kelola

| Kerangka | Kaitan |
|---|---|
| COBIT 2019 | APO12 Managed Risk dan BAI11 Managed Projects sebagai dasar indikator risiko dan progres; MEA01 Performance and Conformance Monitoring sebagai dasar mekanisme pemantauan direksi; APO14 Managed Data untuk tata kelola kualitas data |
| ITIL v4 | Measurement and reporting, Monitoring and event management, dan Problem management sebagai dasar aturan eskalasi dan pengelolaan temuan |
| Balanced Scorecard | Perspektif keuangan (panel B2), proses internal (panel B1, C, D), pelanggan dan masyarakat (panel E), pembelajaran (CKMS dan panel F1) |
| TOGAF | Dashboard merupakan komponen lapisan Application Architecture yang bersandar pada Data Architecture (platform big data) dan Technology Architecture (cloud) |

---

## 8. Asumsi dan Prasyarat

1. ERP menyediakan API atau mekanisme CDC untuk modul keuangan, project management, inventory, dan procurement.
2. Seluruh lokasi proyek memiliki konektivitas yang memadai untuk unggah data inspeksi dan sensor.
3. Sensor RFID gerbang dan timbangan kendaraan telah terpasang di seluruh gudang dan lokasi proyek prioritas.
4. Master data proyek, material, dan lokasi sudah diselaraskan antar sistem. Tanpa ini, rekonsiliasi material tidak dapat dihitung.
5. Kode biaya khusus untuk pekerjaan perbaikan temuan tersedia di ERP.
6. Tim inspeksi sudah menggunakan aplikasi tablet, bukan formulir kertas.

---

## 9. Rencana Bertahap

| Tahap | Cakupan | Prasyarat utama |
|---|---|---|
| 1 | Panel A, B1, B2 | Integrasi ERP, penyelarasan master data |
| 2 | Panel C1, C2, D1, D2 | Sensor gerbang, aplikasi inspeksi, alur eskalasi |
| 3 | Panel E1, E2, E3, D3 | Social CRM, kanal aduan warga, telematika alat |
| 4 | Panel F1, F2, aplikasi seluler | Riwayat data cukup untuk melatih model prediksi |

Panel F1 memerlukan data historis minimal 12 bulan dari panel tahap sebelumnya agar model prediksi memiliki dasar yang memadai.

---

## 10. Pengukuran Keberhasilan

Keberhasilan dashboard tidak diukur dari jumlah pengguna atau kelengkapan panel, melainkan dari perubahan sasaran pada bagian 1.3. Peninjauan dilakukan setiap kuartal oleh DTO bersama Divisi Analitik, mencakup akurasi data, ketepatan ambang batas, akurasi model prediksi, dan panel mana yang benar-benar dipakai dalam rapat direksi. Panel yang tidak pernah dipakai dalam dua kuartal berturut-turut dicabut.
