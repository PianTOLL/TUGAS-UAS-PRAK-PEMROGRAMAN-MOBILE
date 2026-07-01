# Cara Menjalankan Aplikasi 

## 1. Clone Repository

Clone repository dari GitHub menggunakan perintah berikut:

```bash
git clone https://github.com/USERNAME/NAMA_REPOSITORY.git
```

Masuk ke folder project:

```bash
cd NAMA_REPOSITORY
```

---

## 2. Install Dependencies

Install seluruh package yang dibutuhkan menggunakan npm:

```bash
npm install
```

atau menggunakan Yarn:

```bash
yarn install
```

---

## 3. Menjalankan Metro Bundler

Jalankan Metro Bundler dengan perintah:

```bash
npx react-native start
```

Jika menggunakan Expo, jalankan:

```bash
npx expo start
```

---

## 4. Menjalankan Aplikasi

### Android

Pastikan Android Emulator atau perangkat Android sudah terhubung, kemudian jalankan:

```bash
npx react-native run-android
```

Jika menggunakan Expo:

```bash
npx expo start
```

Kemudian:

* Scan QR Code menggunakan aplikasi **Expo Go**, atau
* Jalankan pada Android Emulator.

### iOS (macOS)

```bash
npx react-native run-ios
```

---

## 5. Struktur Project

```
project/
│
├── components/
├── data/
│   └── data.ts
├── screens/
│   ├── JadwalScreen.tsx
│   ├── PertemuanScreen.tsx
│   └── RingkasanScreen.tsx
├── App.tsx
├── package.json
└── tsconfig.json
```

---

## 6. Fitur Aplikasi

* Menampilkan jadwal kuliah berdasarkan hari.
* Menampilkan daftar pertemuan.
* Menampilkan ringkasan mata kuliah.
* Pencarian data (Search).
* Pull to Refresh.
* Floating Action Button.
* Statistik jumlah mata kuliah dan total SKS.
* Tampilan antarmuka modern dan responsif.

---

## 7. Menghentikan Aplikasi

Tekan:

```
Ctrl + C
```

pada terminal untuk menghentikan Metro Bundler atau server React Native.
