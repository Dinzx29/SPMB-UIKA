// src/components/ui/TabelFunnelPendaftaran.jsx
import React, { useState } from 'react';
import SearchableSelect from './SearchableSelect'; 

// ============================================================
// 🔥 DATA FUNNEL LENGKAP — SESUAI FAKULTAS & PRODI DI DASHBOARD
// ============================================================
const dataFunnel = [
  {
    id: 'univ',
    title: 'Universitas Ibn Khaldun',
    peminat: 2988, pendaftar: 2794, lulus: 2354, daftarUlang: 2148, mahasiswa: 2144, periodeLalu: 3715,
    persenPeminat: 94, persenPendaftar: 84, persenLulus: 91, persenDaftarUlang: 100,
    persenPerbandingan: 57.71,
    topKota: [],
    children: [
      {
        id: 'fkip',
        title: 'Fakultas Keguruan dan Ilmu Pendidikan',
        peminat: 776, pendaftar: 758, lulus: 704, daftarUlang: 690, mahasiswa: 688, periodeLalu: 2136,
        persenPeminat: 98, persenPendaftar: 93, persenLulus: 98, persenDaftarUlang: 100,
        persenPerbandingan: 32.21,
        topKota: [],
        children: [
          { id: 'fkip-1', title: 'S1 - Pendidikan Vokasional Desain Fashion', peminat: 30, pendaftar: 29, lulus: 28, daftarUlang: 25, mahasiswa: 25, periodeLalu: 23, persenPeminat: 97, persenPendaftar: 97, persenLulus: 89, persenDaftarUlang: 100, persenPerbandingan: 108.70, topKota: ['1. KABUPATEN BOGOR (41)', '2. KOTA BOGOR (15)', '3. KOTA DEPOK (3)'] },
          { id: 'fkip-2', title: 'S1 - Pendidikan Matematika', peminat: 15, pendaftar: 9, lulus: 6, daftarUlang: 6, mahasiswa: 4, periodeLalu: 23, persenPeminat: 60, persenPendaftar: 67, persenLulus: 100, persenDaftarUlang: 67, persenPerbandingan: 17.39, topKota: ['1. KABUPATEN BOGOR (21)', '2. KOTA BOGOR (6)', '3. KABUPATEN SUKABUMI (3)'] },
          { id: 'fkip-3', title: 'S1 - Teknologi Pendidikan', peminat: 180, pendaftar: 168, lulus: 145, daftarUlang: 128, mahasiswa: 128, periodeLalu: 210, persenPeminat: 93, persenPendaftar: 86, persenLulus: 88, persenDaftarUlang: 88, persenPerbandingan: 85.71, topKota: ['1. KOTA BOGOR (34)', '2. KABUPATEN BOGOR (28)', '3. KOTA DEPOK (12)'] },
          { id: 'fkip-4', title: 'S1 - Pendidikan Masyarakat', peminat: 165, pendaftar: 152, lulus: 132, daftarUlang: 118, mahasiswa: 117, periodeLalu: 195, persenPeminat: 92, persenPendaftar: 87, persenLulus: 89, persenDaftarUlang: 89, persenPerbandingan: 84.62, topKota: ['1. KOTA BOGOR (32)', '2. KABUPATEN BOGOR (24)', '3. KABUPATEN SUKABUMI (10)'] },
          { id: 'fkip-5', title: 'Prof - Pendidikan Profesi Guru', peminat: 480, pendaftar: 455, lulus: 410, daftarUlang: 360, mahasiswa: 360, periodeLalu: 820, persenPeminat: 95, persenPendaftar: 90, persenLulus: 88, persenDaftarUlang: 88, persenPerbandingan: 58.54, topKota: ['1. KOTA BOGOR (120)', '2. KABUPATEN BOGOR (95)', '3. KOTA BEKASI (48)'] },
          { id: 'fkip-6', title: 'S1 - Pendidikan Bahasa Inggris', peminat: 1055, pendaftar: 963, lulus: 823, daftarUlang: 674, mahasiswa: 674, periodeLalu: 1420, persenPeminat: 91, persenPendaftar: 85, persenLulus: 82, persenDaftarUlang: 82, persenPerbandingan: 74.30, topKota: ['1. KOTA BOGOR (280)', '2. KABUPATEN BOGOR (215)', '3. KOTA DEPOK (98)'] }
        ]
      },
      {
        id: 'hukum',
        title: 'Fakultas Hukum',
        peminat: 1240, pendaftar: 1150, lulus: 980, daftarUlang: 860, mahasiswa: 858, periodeLalu: 1820,
        persenPeminat: 93, persenPendaftar: 85, persenLulus: 88, persenDaftarUlang: 88, persenPerbandingan: 68.13,
        topKota: [],
        children: [
          { id: 'hukum-1', title: 'S2 - Hukum Bisnis (2)', peminat: 80, pendaftar: 72, lulus: 60, daftarUlang: 52, mahasiswa: 52, periodeLalu: 95, persenPeminat: 90, persenPendaftar: 83, persenLulus: 87, persenDaftarUlang: 87, persenPerbandingan: 84.21, topKota: ['1. KOTA BOGOR (24)', '2. KABUPATEN BOGOR (16)', '3. KOTA JAKARTA SELATAN (8)'] },
          { id: 'hukum-2', title: 'S1 - Ilmu Hukum', peminat: 1160, pendaftar: 1078, lulus: 920, daftarUlang: 808, mahasiswa: 806, periodeLalu: 1725, persenPeminat: 93, persenPendaftar: 85, persenLulus: 88, persenDaftarUlang: 88, persenPerbandingan: 67.25, topKota: ['1. KOTA BOGOR (310)', '2. KABUPATEN BOGOR (245)', '3. KOTA DEPOK (120)'] }
        ]
      },
      {
        id: 'feb',
        title: 'Fakultas Ekonomi dan Bisnis',
        peminat: 1980, pendaftar: 1830, lulus: 1540, daftarUlang: 1180, mahasiswa: 1178, periodeLalu: 3210,
        persenPeminat: 92, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 77, persenPerbandingan: 61.68,
        topKota: [],
        children: [
          { id: 'feb-1', title: 'S1 - Manajemen', peminat: 720, pendaftar: 665, lulus: 560, daftarUlang: 430, mahasiswa: 429, periodeLalu: 1180, persenPeminat: 92, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 77, persenPerbandingan: 61.02, topKota: ['1. KOTA BOGOR (205)', '2. KABUPATEN BOGOR (160)', '3. KOTA DEPOK (78)'] },
          { id: 'feb-2', title: 'S1 - Bisnis Digital', peminat: 340, pendaftar: 315, lulus: 265, daftarUlang: 205, mahasiswa: 205, periodeLalu: 420, persenPeminat: 93, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 77, persenPerbandingan: 80.95, topKota: ['1. KOTA BOGOR (98)', '2. KABUPATEN BOGOR (72)', '3. KOTA BEKASI (35)'] },
          { id: 'feb-3', title: 'S1 - Akuntansi', peminat: 620, pendaftar: 575, lulus: 485, daftarUlang: 375, mahasiswa: 374, periodeLalu: 1080, persenPeminat: 93, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 77, persenPerbandingan: 57.41, topKota: ['1. KOTA BOGOR (180)', '2. KABUPATEN BOGOR (135)', '3. KOTA DEPOK (62)'] },
          { id: 'feb-4', title: 'S1 - Perdangan Internasional', peminat: 300, pendaftar: 275, lulus: 230, daftarUlang: 170, mahasiswa: 170, periodeLalu: 530, persenPeminat: 92, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 74, persenPerbandingan: 56.60, topKota: ['1. KOTA BOGOR (85)', '2. KABUPATEN BOGOR (60)', '3. KOTA DEPOK (28)'] }
        ]
      },
      {
        id: 'fai',
        title: 'Fakultas Agama Islam',
        peminat: 1450, pendaftar: 1330, lulus: 1120, daftarUlang: 880, mahasiswa: 878, periodeLalu: 2410,
        persenPeminat: 92, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 78, persenPerbandingan: 60.17,
        topKota: [],
        children: [
          { id: 'fai-1', title: 'S1 - Ekonomi Syariah', peminat: 280, pendaftar: 260, lulus: 220, daftarUlang: 175, mahasiswa: 175, periodeLalu: 420, persenPeminat: 93, persenPendaftar: 85, persenLulus: 85, persenDaftarUlang: 80, persenPerbandingan: 66.67, topKota: ['1. KOTA BOGOR (82)', '2. KABUPATEN BOGOR (60)', '3. KOTA DEPOK (25)'] },
          { id: 'fai-2', title: 'S1 - Manajemen Haji Dan Umroh', peminat: 160, pendaftar: 145, lulus: 120, daftarUlang: 95, mahasiswa: 95, periodeLalu: 280, persenPeminat: 91, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 79, persenPerbandingan: 57.14, topKota: ['1. KOTA BOGOR (48)', '2. KABUPATEN BOGOR (34)', '3. KOTA BEKASI (15)'] },
          { id: 'fai-3', title: 'S1 - Bimbingan Dan Konseling Pendidikan Islam', peminat: 175, pendaftar: 160, lulus: 135, daftarUlang: 105, mahasiswa: 105, periodeLalu: 310, persenPeminat: 91, persenPendaftar: 84, persenLulus: 84, persenDaftarUlang: 78, persenPerbandingan: 56.45, topKota: ['1. KOTA BOGOR (52)', '2. KABUPATEN BOGOR (38)', '3. KOTA DEPOK (16)'] },
          { id: 'fai-4', title: 'S1 - Komunikasi Dan Penyiaran Islam', peminat: 210, pendaftar: 195, lulus: 165, daftarUlang: 130, mahasiswa: 130, periodeLalu: 350, persenPeminat: 93, persenPendaftar: 85, persenLulus: 85, persenDaftarUlang: 79, persenPerbandingan: 60.00, topKota: ['1. KOTA BOGOR (62)', '2. KABUPATEN BOGOR (45)', '3. KOTA DEPOK (20)'] },
          { id: 'fai-5', title: 'S1 - Hukum Keluarga Islam', peminat: 145, pendaftar: 132, lulus: 110, daftarUlang: 88, mahasiswa: 88, periodeLalu: 245, persenPeminat: 91, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 80, persenPerbandingan: 59.18, topKota: ['1. KOTA BOGOR (42)', '2. KABUPATEN BOGOR (30)', '3. KOTA DEPOK (14)'] },
          { id: 'fai-6', title: "S1 - Ilmu Al-Qur'an Dan Tafsir", peminat: 130, pendaftar: 118, lulus: 100, daftarUlang: 80, mahasiswa: 80, periodeLalu: 210, persenPeminat: 91, persenPendaftar: 85, persenLulus: 85, persenDaftarUlang: 80, persenPerbandingan: 61.90, topKota: ['1. KOTA BOGOR (38)', '2. KABUPATEN BOGOR (26)', '3. KOTA DEPOK (12)'] },
          { id: 'fai-7', title: 'S1 - Pendidikan Agama Islam', peminat: 220, pendaftar: 205, lulus: 170, daftarUlang: 132, mahasiswa: 132, periodeLalu: 365, persenPeminat: 93, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 78, persenPerbandingan: 60.27, topKota: ['1. KOTA BOGOR (65)', '2. KABUPATEN BOGOR (48)', '3. KOTA DEPOK (22)'] },
          { id: 'fai-8', title: 'S1 - Pendidikan Guru Madrasah Ibtidaiyah', peminat: 130, pendaftar: 115, lulus: 100, daftarUlang: 75, mahasiswa: 75, periodeLalu: 230, persenPeminat: 88, persenPendaftar: 87, persenLulus: 87, persenDaftarUlang: 75, persenPerbandingan: 56.52, topKota: ['1. KOTA BOGOR (40)', '2. KABUPATEN BOGOR (28)', '3. KABUPATEN SUKABUMI (12)'] }
        ]
      },
      {
        id: 'fts',
        title: 'Fakultas Teknik dan Sains',
        peminat: 1560, pendaftar: 1430, lulus: 1180, daftarUlang: 900, mahasiswa: 898, periodeLalu: 2480,
        persenPeminat: 92, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 76, persenPerbandingan: 62.90,
        topKota: [],
        children: [
          { id: 'fts-1', title: 'S1 - Teknik Elektro', peminat: 180, pendaftar: 165, lulus: 135, daftarUlang: 102, mahasiswa: 102, periodeLalu: 280, persenPeminat: 92, persenPendaftar: 82, persenLulus: 82, persenDaftarUlang: 76, persenPerbandingan: 64.29, topKota: ['1. KOTA BOGOR (52)', '2. KABUPATEN BOGOR (38)', '3. KOTA DEPOK (18)'] },
          { id: 'fts-2', title: 'S1 - Teknik Mesin', peminat: 195, pendaftar: 178, lulus: 148, daftarUlang: 112, mahasiswa: 112, periodeLalu: 310, persenPeminat: 91, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 76, persenPerbandingan: 62.90, topKota: ['1. KOTA BOGOR (58)', '2. KABUPATEN BOGOR (42)', '3. KOTA BEKASI (20)'] },
          { id: 'fts-3', title: 'S1 - Teknik Sipil', peminat: 240, pendaftar: 220, lulus: 180, daftarUlang: 138, mahasiswa: 138, periodeLalu: 385, persenPeminat: 92, persenPendaftar: 82, persenLulus: 82, persenDaftarUlang: 77, persenPerbandingan: 62.34, topKota: ['1. KOTA BOGOR (72)', '2. KABUPATEN BOGOR (52)', '3. KOTA DEPOK (25)'] },
          { id: 'fts-4', title: 'S1 - Ilmu Lingkungan', peminat: 130, pendaftar: 118, lulus: 98, daftarUlang: 72, mahasiswa: 72, periodeLalu: 210, persenPeminat: 91, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 73, persenPerbandingan: 61.90, topKota: ['1. KOTA BOGOR (38)', '2. KABUPATEN BOGOR (26)', '3. KOTA DEPOK (12)'] },
          { id: 'fts-5', title: 'S1 - Rekayasa Pertanian Dan Biosistem', peminat: 110, pendaftar: 100, lulus: 82, daftarUlang: 60, mahasiswa: 60, periodeLalu: 180, persenPeminat: 91, persenPendaftar: 82, persenLulus: 82, persenDaftarUlang: 73, persenPerbandingan: 61.11, topKota: ['1. KOTA BOGOR (32)', '2. KABUPATEN BOGOR (22)', '3. KABUPATEN SUKABUMI (10)'] },
          { id: 'fts-6', title: 'S1 - Teknik Informatika', peminat: 450, pendaftar: 415, lulus: 345, daftarUlang: 268, mahasiswa: 267, periodeLalu: 720, persenPeminat: 92, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 78, persenPerbandingan: 62.50, topKota: ['1. KOTA BOGOR (135)', '2. KABUPATEN BOGOR (98)', '3. KOTA DEPOK (48)'] },
          { id: 'fts-7', title: 'S1 - Sistem Informasi', peminat: 255, pendaftar: 234, lulus: 192, daftarUlang: 148, mahasiswa: 147, periodeLalu: 395, persenPeminat: 92, persenPendaftar: 82, persenLulus: 82, persenDaftarUlang: 77, persenPerbandingan: 64.56, topKota: ['1. KOTA BOGOR (78)', '2. KABUPATEN BOGOR (56)', '3. KOTA DEPOK (26)'] }
        ]
      },
      {
        id: 'pasca',
        title: 'Sekolah Pascasarjana',
        peminat: 340, pendaftar: 300, lulus: 250, daftarUlang: 200, mahasiswa: 198, periodeLalu: 530,
        persenPeminat: 88, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 80, persenPerbandingan: 64.15,
        topKota: [],
        children: [
          { id: 'pasca-1', title: 'S3 - Ekonomi Syariah (S3)', peminat: 35, pendaftar: 30, lulus: 25, daftarUlang: 20, mahasiswa: 20, periodeLalu: 55, persenPeminat: 86, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 80, persenPerbandingan: 63.64, topKota: ['1. KOTA BOGOR (10)', '2. KOTA JAKARTA SELATAN (6)', '3. KABUPATEN BOGOR (4)'] },
          { id: 'pasca-2', title: 'S2 - Ekonomi Syariah (S2)', peminat: 55, pendaftar: 48, lulus: 40, daftarUlang: 32, mahasiswa: 32, periodeLalu: 85, persenPeminat: 87, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 80, persenPerbandingan: 64.71, topKota: ['1. KOTA BOGOR (16)', '2. KABUPATEN BOGOR (10)', '3. KOTA DEPOK (5)'] },
          { id: 'pasca-3', title: 'S2 - Manajemen (S2)', peminat: 60, pendaftar: 53, lulus: 44, daftarUlang: 35, mahasiswa: 35, periodeLalu: 95, persenPeminat: 88, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 80, persenPerbandingan: 63.16, topKota: ['1. KOTA BOGOR (18)', '2. KABUPATEN BOGOR (11)', '3. KOTA BEKASI (5)'] },
          { id: 'pasca-4', title: 'S2 - Komunikasi Dan Penyiaran Islam (S2)', peminat: 40, pendaftar: 35, lulus: 28, daftarUlang: 22, mahasiswa: 22, periodeLalu: 65, persenPeminat: 88, persenPendaftar: 80, persenLulus: 80, persenDaftarUlang: 79, persenPerbandingan: 61.54, topKota: ['1. KOTA BOGOR (12)', '2. KABUPATEN BOGOR (7)', '3. KOTA DEPOK (3)'] },
          { id: 'pasca-5', title: 'S3 - Pendidikan Agama Islam (S3)', peminat: 30, pendaftar: 26, lulus: 22, daftarUlang: 18, mahasiswa: 18, periodeLalu: 48, persenPeminat: 87, persenPendaftar: 85, persenLulus: 85, persenDaftarUlang: 82, persenPerbandingan: 62.50, topKota: ['1. KOTA BOGOR (9)', '2. KABUPATEN BOGOR (5)', '3. KOTA DEPOK (2)'] },
          { id: 'pasca-6', title: 'S2 - Teknologi Pendidikan (S2)', peminat: 45, pendaftar: 40, lulus: 33, daftarUlang: 26, mahasiswa: 26, periodeLalu: 68, persenPeminat: 89, persenPendaftar: 83, persenLulus: 83, persenDaftarUlang: 79, persenPerbandingan: 66.18, topKota: ['1. KOTA BOGOR (14)', '2. KABUPATEN BOGOR (8)', '3. KOTA DEPOK (3)'] },
          { id: 'pasca-7', title: 'S2 - Pendidikan Agama Islam (S2)', peminat: 75, pendaftar: 68, lulus: 58, daftarUlang: 47, mahasiswa: 45, periodeLalu: 114, persenPeminat: 91, persenPendaftar: 85, persenLulus: 85, persenDaftarUlang: 81, persenPerbandingan: 65.79, topKota: ['1. KOTA BOGOR (22)', '2. KABUPATEN BOGOR (15)', '3. KOTA DEPOK (6)'] }
        ]
      },
      {
        id: 'fik',
        title: 'Fakultas Ilmu Kesehatan',
        peminat: 1140, pendaftar: 1060, lulus: 930, daftarUlang: 680, mahasiswa: 678, periodeLalu: 750,
        persenPeminat: 93, persenPendaftar: 88, persenLulus: 88, persenDaftarUlang: 73, persenPerbandingan: 152.00,
        topKota: [],
        children: [
          { id: 'fik-1', title: 'S1 - Kesehatan Masyarakat', peminat: 540, pendaftar: 502, lulus: 442, daftarUlang: 322, mahasiswa: 322, periodeLalu: 350, persenPeminat: 93, persenPendaftar: 88, persenLulus: 88, persenDaftarUlang: 73, persenPerbandingan: 154.29, topKota: ['1. KOTA BOGOR (162)', '2. KABUPATEN BOGOR (118)', '3. KOTA DEPOK (56)'] },
          { id: 'fik-2', title: 'S1 - Gizi', peminat: 600, pendaftar: 558, lulus: 488, daftarUlang: 356, mahasiswa: 356, periodeLalu: 400, persenPeminat: 93, persenPendaftar: 88, persenLulus: 88, persenDaftarUlang: 73, persenPerbandingan: 150.00, topKota: ['1. KOTA BOGOR (180)', '2. KABUPATEN BOGOR (132)', '3. KOTA DEPOK (62)'] }
        ]
      }
    ]
  }
];

const PersenBadge = ({ value }) => {
  let bgColor = 'bg-[#ef4444]';
  if (value >= 100) bgColor = 'bg-[#10b981]';
  else if (value >= 50) bgColor = 'bg-[#ef4444]';
  else bgColor = 'bg-[#f97316]';

  return (
    <span className={`${bgColor} text-white text-[11px] font-bold px-2 py-0.5 rounded-sm inline-block`}>
      {value.toFixed(2)} %
    </span>
  );
};

const PersenText = ({ value }) => {
  let color = 'text-[#10b981]';
  if (value < 90) color = 'text-[#f97316]';
  if (value < 60) color = 'text-[#ef4444]';

  return <div className={`text-[11px] font-bold ${color} mt-1`}>{value}%</div>;
};

// ============================================================
// 📍 DATA MASTER PROVINSI & KOTA DI INDONESIA (LENGKAP)
// ============================================================
const dataProvinsiKota = {
  "Aceh": ["Kota Banda Aceh", "Kota Langsa", "Kota Lhokseumawe", "Kota Sabang", "Kota Subulussalam", "Kabupaten Aceh Barat", "Kabupaten Aceh Besar", "Kabupaten Pidie"],
  "Sumatera Utara": ["Kota Medan", "Kota Binjai", "Kota Pematangsiantar", "Kota Tebing Tinggi", "Kabupaten Deli Serdang", "Kabupaten Karo", "Kabupaten Simalungun"],
  "Sumatera Barat": ["Kota Padang", "Kota Bukittinggi", "Kota Payakumbuh", "Kota Solok", "Kabupaten Agam", "Kabupaten Tanah Datar", "Kabupaten Pesisir Selatan"],
  "Riau": ["Kota Pekanbaru", "Kota Dumai", "Kabupaten Kampar", "Kabupaten Siak", "Kabupaten Bengkalis", "Kabupaten Pelalawan"],
  "Jambi": ["Kota Jambi", "Kota Sungai Penuh", "Kabupaten Batanghari", "Kabupaten Muaro Jambi", "Kabupaten Kerinci"],
  "Sumatera Selatan": ["Kota Palembang", "Kota Prabumulih", "Kota Pagar Alam", "Kabupaten Ogan Komering Ilir", "Kabupaten Muara Enim", "Kabupaten Banyuasin"],
  "Bengkulu": ["Kota Bengkulu", "Kabupaten Rejang Lebong", "Kabupaten Seluma", "Kabupaten Kaur"],
  "Lampung": ["Kota Bandar Lampung", "Kota Metro", "Kabupaten Lampung Selatan", "Kabupaten Lampung Tengah", "Kabupaten Lampung Utara"],
  "Kepulauan Bangka Belitung": ["Kota Pangkal Pinang", "Kabupaten Bangka", "Kabupaten Belitung", "Kabupaten Bangka Tengah"],
  "Kepulauan Riau": ["Kota Batam", "Kota Tanjungpinang", "Kabupaten Bintan", "Kabupaten Karimun", "Kabupaten Natuna"],
  "DKI Jakarta": ["Kota Jakarta Pusat", "Kota Jakarta Utara", "Kota Jakarta Barat", "Kota Jakarta Selatan", "Kota Jakarta Timur", "Kabupaten Kepulauan Seribu"],
  "Jawa Barat": ["Kota Bogor", "Kabupaten Bogor", "Kota Depok", "Kota Bekasi", "Kabupaten Bekasi", "Kota Bandung", "Kabupaten Bandung", "Kota Sukabumi", "Kabupaten Sukabumi", "Kota Cimahi", "Kabupaten Cianjur", "Kabupaten Garut", "Kabupaten Karawang", "Kabupaten Purwakarta"],
  "Jawa Tengah": ["Kota Semarang", "Kota Surakarta (Solo)", "Kota Magelang", "Kota Salatiga", "Kabupaten Semarang", "Kabupaten Klaten", "Kabupaten Boyolali", "Kabupaten Banyumas", "Kabupaten Cilacap"],
  "DI Yogyakarta": ["Kota Yogyakarta", "Kabupaten Sleman", "Kabupaten Bantul", "Kabupaten Gunungkidul", "Kabupaten Kulon Progo"],
  "Jawa Timur": ["Kota Surabaya", "Kota Malang", "Kota Kediri", "Kota Madiun", "Kabupaten Sidoarjo", "Kabupaten Gresik", "Kabupaten Malang", "Kabupaten Jember", "Kabupaten Banyuwangi"],
  "Banten": ["Kota Serang", "Kota Tangerang", "Kota Tangerang Selatan", "Kota Cilegon", "Kabupaten Serang", "Kabupaten Tangerang", "Kabupaten Lebak", "Kabupaten Pandeglang"],
  "Bali": ["Kota Denpasar", "Kabupaten Badung", "Kabupaten Gianyar", "Kabupaten Tabanan", "Kabupaten Buleleng"],
  "Nusa Tenggara Barat": ["Kota Mataram", "Kota Bima", "Kabupaten Lombok Barat", "Kabupaten Lombok Tengah", "Kabupaten Sumbawa"],
  "Nusa Tenggara Timur": ["Kota Kupang", "Kabupaten Sikka", "Kabupaten Ende", "Kabupaten Manggarai", "Kabupaten Belu"],
  "Kalimantan Barat": ["Kota Pontianak", "Kota Singkawang", "Kabupaten Kubu Raya", "Kabupaten Sambas", "Kabupaten Sintang"],
  "Kalimantan Tengah": ["Kota Palangka Raya", "Kabupaten Kotawaringin Timur", "Kabupaten Kapuas", "Kabupaten Barito Utara"],
  "Kalimantan Selatan": ["Kota Banjarmasin", "Kota Banjarbaru", "Kabupaten Banjar", "Kabupaten Tanah Laut", "Kabupaten Tabalong"],
  "Kalimantan Timur": ["Kota Samarinda", "Kota Balikpapan", "Kota Bontang", "Kabupaten Kutai Kartanegara", "Kabupaten Penajam Paser Utara"],
  "Kalimantan Utara": ["Kota Tarakan", "Kabupaten Bulungan", "Kabupaten Nunukan", "Kabupaten Malinau"],
  "Sulawesi Utara": ["Kota Manado", "Kota Bitung", "Kota Tomohon", "Kabupaten Minahasa", "Kabupaten Bolaang Mongondow"],
  "Sulawesi Tengah": ["Kota Palu", "Kabupaten Sigi", "Kabupaten Poso", "Kabupaten Banggai", "Kabupaten Tolitoli"],
  "Sulawesi Selatan": ["Kota Makassar", "Kota Parepare", "Kota Palopo", "Kabupaten Gowa", "Kabupaten Maros", "Kabupaten Bone", "Kabupaten Sinjai"],
  "Sulawesi Tenggara": ["Kota Kendari", "Kota Baubau", "Kabupaten Konawe", "Kabupaten Kolaka", "Kabupaten Muna"],
  "Gorontalo": ["Kota Gorontalo", "Kabupaten Gorontalo", "Kabupaten Bone Bolango", "Kabupaten Pohuwato"],
  "Sulawesi Barat": ["Kabupaten Mamuju", "Kabupaten Majene", "Kabupaten Polewali Mandar", "Kabupaten Mamasa"],
  "Maluku": ["Kota Ambon", "Kota Tual", "Kabupaten Maluku Tengah", "Kabupaten Maluku Tenggara", "Kabupaten Buru"],
  "Maluku Utara": ["Kota Ternate", "Kota Tidore Kepulauan", "Kabupaten Halmahera Barat", "Kabupaten Halmahera Tengah"],
  "Papua": ["Kota Jayapura", "Kabupaten Biak Numfor", "Kabupaten Jayapura", "Kabupaten Nabire", "Kabupaten Merauke"],
  "Papua Barat": ["Kota Sorong", "Kabupaten Manokwari", "Kabupaten Fakfak", "Kabupaten Teluk Bintuni"],
  "Papua Barat Daya": ["Kota Sorong", "Kabupaten Sorong", "Kabupaten Raja Ampat", "Kabupaten Tambrauw"],
  "Papua Tengah": ["Kabupaten Nabire", "Kabupaten Mimika", "Kabupaten Paniai", "Kabupaten Dogiyai"],
  "Papua Pegunungan": ["Kabupaten Jayawijaya", "Kabupaten Pegunungan Bintang", "Kabupaten Yahukimo", "Kabupaten Tolikara"],
  "Papua Selatan": ["Kabupaten Merauke", "Kabupaten Boven Digoel", "Kabupaten Mappi", "Kabupaten Asmat"]
};

const opsiProvinsi = ["-- Semua Provinsi --", ...Object.keys(dataProvinsiKota).sort()];

// ============================================================
// KOMPONEN UTAMA
// ============================================================
const TabelFunnelPendaftaran = () => {
  const [expanded, setExpanded] = useState([
    'univ', 'fkip', 'hukum', 'feb', 'fai', 'fts', 'pasca', 'fik'
  ]);

  const [filterBerdasarkan, setFilterBerdasarkan] = useState('Kota / Kabupaten');
  const [filterJumlah, setFilterJumlah] = useState('3');
  const [filterProvinsi, setFilterProvinsi] = useState('-- Semua Provinsi --');
  const [filterKota, setFilterKota] = useState('-- Semua Kota / Kabupaten --');

  const opsiBerdasarkan = ['Kota / Kabupaten', 'Sekolah'];
  const opsiJumlah = ['3', '5', '10'];

  const opsiKota = filterProvinsi === '-- Semua Provinsi --' 
    ? ['-- Semua Kota / Kabupaten --'] 
    : ['-- Semua Kota / Kabupaten --', ...dataProvinsiKota[filterProvinsi]];

  const handleProvinsiChange = (val) => {
    setFilterProvinsi(val);
    setFilterKota('-- Semua Kota / Kabupaten --');
  };

  const toggleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  const renderRow = (row, level = 0) => {
    const isExpanded = expanded.includes(row.id);
    const hasChildren = row.children && row.children.length > 0;

    const isTopLevel = level === 0;
    const isFaculty = level === 1;

    let rowBg = 'bg-white';
    let titleStyle = 'font-medium text-gray-700';
    if (isTopLevel) {
      rowBg = 'bg-gray-100';
      titleStyle = 'font-bold text-gray-900';
    } else if (isFaculty) {
      rowBg = 'bg-gray-50';
      titleStyle = 'font-bold text-gray-800';
    }

    return (
      <React.Fragment key={row.id}>
        <tr className={`${rowBg} border-b border-gray-200 hover:bg-gray-100 transition-colors`}>
          <td className={`px-4 py-4 border-r border-gray-200 ${isTopLevel ? 'pl-4' : isFaculty ? 'pl-10' : 'pl-16'}`}>
            <div
              className={`flex items-center gap-2 ${hasChildren ? 'cursor-pointer' : ''} ${titleStyle}`}
              onClick={() => hasChildren && toggleExpand(row.id)}
            >
              {hasChildren && (
                <span className="text-gray-500 text-[10px] w-4">
                  {isExpanded ? '▼' : '▶'}
                </span>
              )}
              {row.title}
            </div>
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200">
            <div className={isTopLevel ? 'font-bold text-gray-900' : 'text-gray-700'}>{row.peminat.toLocaleString('id-ID')}</div>
            {row.persenPeminat && <PersenText value={row.persenPeminat} />}
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200">
            <div className={isTopLevel ? 'font-bold text-gray-900' : 'text-gray-700'}>{row.pendaftar.toLocaleString('id-ID')}</div>
            {row.persenPendaftar && <PersenText value={row.persenPendaftar} />}
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200">
            <div className={isTopLevel ? 'font-bold text-gray-900' : 'text-gray-700'}>{row.lulus.toLocaleString('id-ID')}</div>
            {row.persenLulus && <PersenText value={row.persenLulus} />}
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200">
            <div className={isTopLevel ? 'font-bold text-gray-900' : 'text-gray-700'}>{row.daftarUlang.toLocaleString('id-ID')}</div>
            {row.persenDaftarUlang && <PersenText value={row.persenDaftarUlang} />}
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200">
            <div className={isTopLevel ? 'font-bold text-gray-900' : 'text-gray-700'}>{row.mahasiswa.toLocaleString('id-ID')}</div>
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200 text-gray-700">
            {row.periodeLalu.toLocaleString('id-ID')}
          </td>
          <td className="px-2 py-4 text-center border-r border-gray-200">
            {row.persenPerbandingan && <PersenBadge value={row.persenPerbandingan} />}
          </td>
          <td className="px-4 py-4 text-[12px] text-gray-600 leading-relaxed">
            {row.topKota && row.topKota.map((kota, i) => (
              <div key={i}>{kota}</div>
            ))}
          </td>
        </tr>
        {isExpanded && hasChildren && row.children.map((child) => renderRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-6">
      
      <h2 className="text-[22px] font-bold text-gray-900 mb-2">Funnel Penerimaan Mahasiswa Baru</h2>

      {/* FILTER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        {/* Kiri */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold text-[#2176c7]">Tampilkan Peminat Terbanyak Berdasarkan</label>
            <SearchableSelect 
              options={opsiBerdasarkan} 
              value={filterBerdasarkan} 
              onChange={setFilterBerdasarkan} 
              placeholder="Pilih Berdasarkan..." 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold text-[#2176c7]">Jumlah Kota / Kabupaten Ditampilkan</label>
            <SearchableSelect 
              options={opsiJumlah} 
              value={filterJumlah} 
              onChange={setFilterJumlah} 
              placeholder="Pilih Jumlah..." 
            />
          </div>
        </div>

        {/* Kanan */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold text-[#2176c7]">Provinsi</label>
            <SearchableSelect 
              options={opsiProvinsi} 
              value={filterProvinsi} 
              onChange={handleProvinsiChange} 
              placeholder="Pilih Provinsi..." 
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-bold text-[#2176c7]">Kota / Kabupaten</label>
            
            {/* 🔥 FIX: Kursor Not-Allowed (Larangan) & Disable Penuh Saat Provinsi Belum Dipilih */}
            <div 
              className={`relative rounded-md transition-all duration-200 
                ${filterProvinsi === '-- Semua Provinsi --' 
                  ? 'cursor-not-allowed opacity-60 bg-gray-50 pointer-events-auto' 
                  : ''}`}
              title={filterProvinsi === '-- Semua Provinsi --' ? "Silakan pilih Provinsi terlebih dahulu" : ""}
            >
              <div className={filterProvinsi === '-- Semua Provinsi --' ? 'pointer-events-none' : ''}>
                <SearchableSelect 
                  options={opsiKota} 
                  value={filterKota} 
                  onChange={setFilterKota} 
                  placeholder="Pilih Kota..." 
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="text-[14px] font-bold text-gray-800 mb-2">Keterangan :</h3>
        <ul className="list-disc list-inside text-[13px] text-gray-600 space-y-1 ml-2">
          <li>Jumlah Peminat dan Pendaftar dihitung dari Pilihan Prodi Pertama (Utama)</li>
          <li>Jumlah Lulus dihitung dari Pendaftar yang dinyatakan Lulus Seleksi di Prodi Pertama atau Lainnya</li>
        </ul>
      </div>

      {/* Tabel Funnel */}
      <div className="overflow-x-auto border border-gray-200 rounded-sm">
        <table className="w-full text-left text-[13px] text-gray-700 border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#0f3b66] text-white">
              <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[22%]">Unit Kerja / Program Studi</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[8%]">Peminat</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[8%]">Pendaftar</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[8%]">Lulus</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[9%]">Daftar Ulang</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[9%]">Mahasiswa</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[9%]">Mahasiswa<br/>Periode<br/>2025!</th>
              <th className="px-2 py-4 font-semibold text-center border-r border-[#1e4f80] w-[10%]">Perbandingan<br/>(2026! / 2025! x 100%)</th>
              <th className="px-4 py-4 font-semibold text-center w-[17%]">3 Kota / Kabupaten<br/>Peminat Terbanyak</th>
            </tr>
          </thead>
          <tbody>
            {dataFunnel.map((row) => renderRow(row, 0))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelFunnelPendaftaran;