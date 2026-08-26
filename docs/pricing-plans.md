# Harga Temukita

Temukita adalah platform **undangan digital**. Bayar sekali per acara — tidak
ada langganan bulanan.

---

## Model Harga

Harga dibedakan berdasarkan **jenis acara** dan **tingkat kustomisasi**,
bukan tingkatan fitur.

Dulu ada dua tier (`Sederhana` / `Elegan`) yang dibedakan dengan fitur
digembok. Model itu dihapus karena tabel perbandingan fitur membuat orang
menunda keputusan beli, dan karena pembeda yang sebenarnya bukan kualitas
produk melainkan besar acaranya.

Sekarang: dua kategori acara dengan harga tetap, plus satu paket bespoke.
Fitur dasarnya identik di ketiganya — yang berbeda **kuota** dan **tingkat
kustomisasi**.

| | Undangan Wedding | Undangan Birthday | Undangan Custom |
|---|---|---|---|
| Harga | Rp 250.000 sekali bayar | Rp 150.000 sekali bayar | hubungi kami |
| Masa aktif | 12 bulan | 12 bulan | 24 bulan |
| Undangan termasuk | 300 | 150 | tanpa batas |
| Kuota WA blast | 100 pesan | 40 pesan | 200 pesan |
| Desain | dari template | dari template | dirancang dari nol |

Wedding lebih mahal dari Birthday karena budget acaranya jauh lebih besar
(anggaran undangan cetak saja biasanya jutaan), bukan karena produknya lebih
lengkap. Custom tidak dipajang harganya karena **ada jam kerja manusia di dalamnya** —
itu satu-satunya paket yang biayanya naik seiring jumlah pesanan, dan lingkupnya
tidak seragam.

Jumlah undangan bukan angka mati: pembeli bisa menambahnya langsung di kartu
harga, dan harga ikut naik. Lihat bagian Perbandingan Kuota.

---

## Undangan Wedding — Rp 250.000

Untuk pernikahan, akad, dan resepsi.

- Masa aktif 12 bulan sejak diterbitkan
- 300 undangan termasuk, bisa ditambah
- Kuota 100 pesan WA blast
- Semua fitur (lihat bagian Fitur)

## Undangan Birthday — Rp 150.000

Untuk ulang tahun, aqiqah, dan syukuran.

- Masa aktif 12 bulan sejak diterbitkan
- 150 undangan termasuk, bisa ditambah
- Kuota 40 pesan WA blast
- Semua fitur (lihat bagian Fitur)

## Undangan Custom — hubungi kami

Untuk yang tidak mau memakai template yang sama dengan orang lain.

- Desain dirancang dari nol bersama desainer, bukan menyesuaikan template
- Masa aktif 24 bulan
- Undangan tanpa batas
- Kuota 200 pesan WA blast
- Fitur dasarnya **sama persis** dengan dua paket lain (lihat bagian Fitur)

**Tidak ada harga yang dipajang.** Lingkup pekerjaan bespoke tidak seragam —
undangan dengan ilustrasi custom atau animasi khusus jelas lebih mahal daripada
penyesuaian tata letak. Mengunci satu angka untuk pekerjaan yang belum diketahui
lingkupnya berakhir di dua tempat: kerja rugi, atau pembeli yang merasa
dibohongi. Jadi slot harga di kartu berisi "Hubungi kami", bukan angka.

**Tidak ada checkout untuk paket ini.** Custom harus dimulai dari percakapan —
kebutuhan digali dulu, baru harga keluar. CTA-nya membuka WhatsApp dengan pesan
sudah terisi.

**Daftar fiturnya tidak dibuat lebih panjang dari paket lain.** Pembedanya ada
di strip kuota (undangan tanpa batas, masa aktif 24 bulan) dan di subtitle
("desain dibuat dari nol"). Menempel lima baris ekstra hanya di satu kartu
membuat ketiganya tidak sejajar dan membuat dua paket lain terlihat kekurangan
fitur, padahal tidak.

### Kenapa Custom masuk akal secara bisnis

Dua paket template menjual **kapasitas** (server, penyimpanan, kuota pesan) —
marginnya tinggi dan skalanya tak terbatas. Custom menjual **waktu**, jadi
marginnya lebih tipis dan tidak bisa diskalakan. Fungsinya bukan jadi sumber
volume, tapi:

1. **Menangkap segmen yang tidak akan pernah beli paket template.** Mereka ada,
   dan sebelumnya tidak punya apa pun untuk dibeli.
2. **Membuat Rp 250.000 terlihat murah.** Kartu tanpa harga di sebelahnya
   membuat dua paket bertarif terlihat sebagai pilihan yang gampang diputuskan —
   ini efek terbesarnya, bahkan kalau Custom jarang terjual.

Batasi jumlah slot Custom per bulan sesuai kapasitas desainer. Menjual lebih
banyak dari yang bisa dikerjakan adalah cara tercepat merusak reputasi.

---

## Perbandingan Kuota

| Kuota | Wedding | Birthday | Custom |
|---|:---:|:---:|:---:|
| Masa aktif | 12 bulan | 12 bulan | 24 bulan |
| Undangan termasuk | 300 | 150 | tanpa batas |
| Tambah undangan | +100 / Rp 25.000 | +100 / Rp 25.000 | tidak perlu |
| WA blast | 100 pesan | 40 pesan | 200 pesan |

### Undangan sebagai sumbu harga

Jumlah undangan **bisa ditambah langsung di kartu harga**, dan harga yang
ditampilkan ikut naik: satu blok `+100 undangan` = `+Rp 25.000`. Maksimal 9 blok
(sampai 1.200 undangan di paket Wedding); setelah itu kartu berhenti menawarkan
dan mengarahkan ke Custom, karena menumpuk 10 blok sudah lebih mahal daripada
paket Custom yang tanpa batas.

Ini yang membuat harga terasa adil: acara 150 tamu tidak ikut membayar kapasitas
acara 800 tamu. Dan karena undangan tambahan **nol biaya marginal** untuk kami,
seluruh Rp 25.000 itu margin.

### Kenapa kuota tamu longgar tapi kuota blast ketat

Sifat biaya keduanya berbeda, dan itu yang menentukan angkanya:

- **Nama tamu = biaya nol.** Menyimpan 300 baris nama di DB gratis. Kuota ini
  murni *value metric* — bikin harga terasa masuk akal dan skalanya cocok
  dengan besar acara. Boleh longgar.
- **Pesan WA blast = biaya per unit nyata.** Meta menagih per template message
  terkirim. Kuota ini wajib ketat, kelebihannya dijual sebagai add-on.

Menyatukan keduanya jadi satu angka ("maks 300 tamu, blast sepuasnya") membuat
margin hilang begitu ada acara 500 tamu. Dipisah, keduanya aman.

---

## Fitur

Satu daftar, berlaku sama di **ketiga** paket. Tidak ada fitur yang digembok.

- Link undangan aktif
- RSVP konfirmasi hadir
- Info acara, peta, & countdown
- Galeri foto & musik latar
- Amplop digital & buku ucapan
- Bagikan via WA & QR
- Rekap RSVP & daftar tamu

---

## Add-on

Dijual **setelah pembelian**, dari halaman kelola undangan. Bukan paket
tersendiri di landing page.

| Add-on | Harga | Biaya kami | Margin |
|---|---|---|---|
| +100 pesan WA blast | Rp 79.000 | ~Rp 65.000 | ~18% |
| Perpanjang masa aktif 12 bulan | Rp 49.000 | ~0 | ~100% |

Pembeli lama jauh lebih mudah dijual daripada pengunjung baru. Karena itu
add-on tidak diiklankan sebagai pilihan di awal — hanya sebagai catatan kecil di
bawah kartu paket.

---

## Ekonomi WA Blast

**Status: belum dibangun.** Di landing page, baris kuota WA blast diberi
penanda "Segera". Jangan iklankan sebagai aktif sebelum WABA ter-provision dan
template disetujui Meta.

Tarif Meta per template message, kategori **marketing**, Indonesia, kisaran
**Rp 600–700 per pesan**. Undangan ke pihak ketiga masuk kategori marketing,
bukan utility — utility hanya untuk notifikasi transaksi yang diminta user
sendiri. Lewat BSP (Qontak, Wati, Twilio) ada markup dan/atau langganan bulanan
di atas tarif itu.

Pakai Rp 650/pesan:

| | Wedding Rp 250rb | Birthday Rp 150rb | Custom |
|---|---|---|---|
| Blast termasuk | 100 pesan | 40 pesan | 200 pesan |
| Biaya WA | Rp 65.000 | Rp 26.000 | Rp 130.000 |
| Fee payment gateway (QRIS ~0,7% + PPN) | ~Rp 1.950 | ~Rp 1.150 | tergantung nilai |
| Sisa margin kotor | Rp 183.050 (73%) | Rp 122.850 (82%) | dihitung per penawaran |

Angka 83% di kolom Custom **menyesatkan** kalau dibaca sendirian: yang belum
dikurangi adalah jam kerja desainer, dan itu justru komponen biaya terbesar di
paket ini. Pada dua paket template, biaya per pesanan hampir seluruhnya
variabel dan bisa dihitung di tabel ini; pada Custom tidak.

Belum termasuk langganan BSP bulanan (kisaran Rp 300rb–1jt) — itu biaya tetap
yang butuh volume untuk diamortisasi. Di ~30 order/bulan jadi ~Rp 10rb–33rb per
order.

Kuota blast Custom dibatasi **200 pesan**, bukan tanpa batas seperti undangannya.
Undangan tambahan nol biaya marginal, pesan WA tidak — 200 pesan sudah Rp 130.000
biaya nyata. Saat menyusun penawaran Custom, angka itu harus masuk hitungan
sebelum jam kerja desainer, dan kelebihannya ditagih sebagai add-on.

**Aksi wajib sebelum fitur ini dijual:** kunci tarif riil dari satu BSP
Indonesia dan konfirmasi kategori template yang disetujui. Kalau markup BSP
tebal, turunkan kuota blast (100 → 60), jangan naikkan harga.

### Jalur luapan wajib ada: WA click-to-chat

Kuota blast pasti habis — acara 300 tamu hanya dapat 100 blast. Tanpa jalur
lain, user mentok.

Jalur luapan: **link WA terpersonalisasi (click-to-chat)**, gratis, tanpa
batas. Sistem menyiapkan daftar tamu dengan pesan sudah terisi + link undangan
unik per tamu; user klik satu-satu, WhatsApp terbuka dari nomor sendiri. Nol
biaya, nol risiko kebijakan.

Ini **bukan** pengganti API resmi — API resmi tetap fitur berbayar yang dijual
(otomatis, tanpa user klik). Click-to-chat hanya penampung sisa tamu di luar
kuota. Dua-duanya hidup bersama.

---

## Risiko Opt-in WhatsApp

Meta mensyaratkan penerima sudah opt-in sebelum menerima template message. Tamu
pernikahan tidak pernah opt-in ke Temukita.

Konsekuensi nyata: tingkat block/report tinggi → quality rating nomor turun →
nomor dibatasi kirim atau diblokir permanen. Ini risiko akun, bukan sekadar
risiko biaya.

Mitigasi: kirim dari WABA milik Temukita dengan template yang sudah disetujui
Meta, ramp-up volume bertahap, pantau quality rating di WhatsApp Manager, dan
sediakan click-to-chat sebagai jalur utama saat rating turun. Jangan janjikan
blast otomatis tanpa syarat.

---

## Catatan untuk Implementasi

**Feature gating tidak ada lagi.** Karena fitur identik di kedua kategori,
gating tinggal **tiga angka per pesanan** dan **nol boolean flag**:

```ts
{ activeMonths: 12, inviteQuota: 300,  waQuota: 100 }  // Wedding
{ activeMonths: 12, inviteQuota: 150,  waQuota: 40  }  // Birthday
{ activeMonths: 24, inviteQuota: null, waQuota: 200 }  // Custom — null = tanpa batas
```

`inviteQuota: null` berarti tanpa batas, bukan nol. Itu satu-satunya cabang
render yang dibutuhkan, dan sekaligus yang menyembunyikan tombol tambah undangan
di kartu Custom.

Pesanan nanti perlu menyimpan **jumlah blok tambahan** yang dipilih pembeli,
bukan hanya paketnya:

```ts
{ plan: 'wedding', extraInviteBlocks: 3 }
// harga  = 250_000 + 3 * 25_000
// kuota  = 300     + 3 * 100
```

Custom menambah dua field opsional di `Plan`, dan keduanya hanya dipakai Custom:
`priceNote` (mengganti "sekali bayar" di bawah harga) dan `extras` (baris fitur
tambahan yang di-append ke daftar bersama). Tidak ada boolean gating baru.

Enam flag yang direncanakan di model lama (`musik`, `countdown`,
`amplop_digital`, `buku_tamu`, `rekap_rsvp`, `custom_link`) semuanya dihapus —
semua fitur nyala di ketiga paket.

Tambahan hanya menaikkan salah satu dari tiga angka itu:

| Tambahan | Efek | Dibeli kapan |
|---|---|---|
| +100 undangan | `inviteQuota += 100`, harga `+25.000` | sebelum bayar, di kartu harga |
| +100 pesan WA blast | `waQuota += 100` | setelah undangan aktif |
| Perpanjang 12 bulan | `activeMonths += 12` | setelah undangan aktif |

Bedanya penting: **undangan dipilih sebelum bayar** karena itu yang menentukan
harga, sedangkan dua add-on lain dijual setelah undangan aktif karena tidak ada
yang tahu kebutuhannya di awal.

Sumber data harga saat ini ada di dalam `src/components/landing/LandingPricing.tsx`
(const `plans`), dan bentuk kartunya di `PricingCard.tsx` (client component,
karena stepper undangan butuh state). `price` disimpan sebagai `number` supaya
checkout nanti tidak perlu mem-parsing string tampilan. Pindahkan ke modul
tersendiri saat checkout
jadi konsumen kedua — bukan sebelum itu.

**Belum ada template birthday.** `template1`, `template2`, `template3` ketiganya
bertema pernikahan. CTA card Birthday sengaja mengarah ke `#mulai` di hero,
bukan ke preview pernikahan.

---

## Jalur Pemesanan Sementara

Belum ada checkout. Sampai ada, semua pemesanan lewat **WhatsApp
0812-4353-0207**, dengan pesan yang sudah terisi sesuai konteksnya:

| Dari mana | Isi pesan |
|---|---|
| Kartu Custom di `/#harga` | menanyakan paket Custom |
| Tiap kartu di `/templates` | menyebut nama template yang diklik |
| Tautan di bawah daftar template | pertanyaan umum soal template |

Nomornya **hanya ditulis satu kali**, di `WA_NUMBER` dalam
`src/components/landing/ui.tsx`, dipakai lewat helper `waLink(message)`. Nomor
telepon yang ditempel di beberapa file adalah nomor yang cepat atau lambat jadi
tidak seragam.

Pesan terisi itu bukan hiasan: tanpa itu, setiap chat masuk berbunyi "halo" dan
percakapannya dimulai dari nol.
