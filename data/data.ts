// ============================================================
// TYPES
// ============================================================

export type MataKuliah = {
  id: string;
  nama: string;
  kode: string;
  sks: number;
  dosen: string;
};

export type Pertemuan = {
  id: string;
  matkul: string;
  pertemuanKe: number;
  topik: string;
  tanggal: string;
};

export type JadwalItem = {
  id: string;
  matkul: string;
  ruangan: string;
  jamMulai: string;
  jamSelesai: string;
};

export type JadwalSection = {
  title: string;
  data: JadwalItem[];
};

// ============================================================
// DATA STATIS
// ============================================================

export const mataKuliah: MataKuliah[] = [
  { id: 'MK001', nama: 'Pemrograman Mobile',      kode: 'IF-401', sks: 3, dosen: 'Dr. Ahmad Fauzi' },
  { id: 'MK002', nama: 'Basis Data Lanjut',        kode: 'IF-312', sks: 3, dosen: 'Dr. Sari Dewi'   },
  { id: 'MK003', nama: 'Kecerdasan Buatan',        kode: 'IF-405', sks: 3, dosen: 'Dr. Rizal Hakim'  },
  { id: 'MK004', nama: 'Jaringan Komputer',        kode: 'IF-308', sks: 2, dosen: 'Dr. Putri Indah'  },
  { id: 'MK005', nama: 'Rekayasa Perangkat Lunak', kode: 'IF-402', sks: 3, dosen: 'Dr. Hendra Putra' },
];

export const pertemuan: Pertemuan[] = [
  { id: 'P001', matkul: 'Pemrograman Mobile',      pertemuanKe: 1,  topik: 'Pengenalan React Native',       tanggal: '4 Sep 2025'  },
  { id: 'P002', matkul: 'Basis Data Lanjut',        pertemuanKe: 1,  topik: 'Review SQL Dasar',              tanggal: '5 Sep 2025'  },
  { id: 'P003', matkul: 'Kecerdasan Buatan',        pertemuanKe: 1,  topik: 'Intro AI & Machine Learning',   tanggal: '6 Sep 2025'  },
  { id: 'P004', matkul: 'Pemrograman Mobile',      pertemuanKe: 2,  topik: 'Komponen & Props',              tanggal: '11 Sep 2025' },
  { id: 'P005', matkul: 'Basis Data Lanjut',        pertemuanKe: 2,  topik: 'Normalisasi Database',          tanggal: '12 Sep 2025' },
  { id: 'P006', matkul: 'Kecerdasan Buatan',        pertemuanKe: 2,  topik: 'Search Algorithms',             tanggal: '13 Sep 2025' },
  { id: 'P007', matkul: 'Jaringan Komputer',        pertemuanKe: 1,  topik: 'Model OSI & TCP/IP',            tanggal: '9 Sep 2025'  },
  { id: 'P008', matkul: 'Rekayasa Perangkat Lunak', pertemuanKe: 1,  topik: 'SDLC & Agile',                 tanggal: '10 Sep 2025' },
  { id: 'P009', matkul: 'Pemrograman Mobile',      pertemuanKe: 3,  topik: 'State & Lifecycle',             tanggal: '18 Sep 2025' },
  { id: 'P010', matkul: 'Basis Data Lanjut',        pertemuanKe: 3,  topik: 'Query Optimization',            tanggal: '19 Sep 2025' },
  { id: 'P011', matkul: 'Jaringan Komputer',        pertemuanKe: 2,  topik: 'IP Addressing & Subnetting',    tanggal: '16 Sep 2025' },
  { id: 'P012', matkul: 'Rekayasa Perangkat Lunak', pertemuanKe: 2,  topik: 'Requirements Engineering',      tanggal: '17 Sep 2025' },
];

export const jadwalPerHari: JadwalSection[] = [
  {
    title: 'Senin',
    data: [
      { id: 'J001', matkul: 'Pemrograman Mobile',      ruangan: 'Ruang A201',  jamMulai: '08.00', jamSelesai: '10.30' },
      { id: 'J002', matkul: 'Kecerdasan Buatan',        ruangan: 'Ruang B102',  jamMulai: '13.00', jamSelesai: '15.30' },
    ],
  },
  {
    title: 'Selasa',
    data: [
      { id: 'J003', matkul: 'Basis Data Lanjut',        ruangan: 'Ruang C301',  jamMulai: '09.00', jamSelesai: '11.30' },
      { id: 'J004', matkul: 'Jaringan Komputer',        ruangan: 'Lab Jaringan', jamMulai: '13.00', jamSelesai: '14.40' },
    ],
  },
  {
    title: 'Rabu',
    data: [
      { id: 'J005', matkul: 'Rekayasa Perangkat Lunak', ruangan: 'Ruang A301',  jamMulai: '10.00', jamSelesai: '12.30' },
    ],
  },
];
