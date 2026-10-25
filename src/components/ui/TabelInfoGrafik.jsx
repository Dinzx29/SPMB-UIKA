import React, { useState } from 'react';
import SearchableSelect from './SearchableSelect';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

// 🔥 DATA MULTI-SKENARIO LENGKAP
const dataMultiSkenario = {
  'Peminat': {
    id: 'univ',
    title: 'Universitas Ibn Khaldun',
    p1: 356, p2: 0, p3: 0, total: 356,
    children: [
      {
        id: 'fkip', title: 'Fakultas Keguruan Dan Ilmu Pendidikan', p1: 167, p2: 0, p3: 0, total: 167,
        children: [
          { id: 'fkip-1', title: 'S1 - Pendidikan Vokasional Desain Fashion', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-2', title: 'S1 - Pendidikan Matematika', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-3', title: 'S1 - Teknologi Pendidikan', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-4', title: 'S1 - Pendidikan Masyarakat', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-5', title: 'Prof - Pendidikan Profesi Guru', p1: 165, p2: 0, p3: 0, total: 165 },
          { id: 'fkip-6', title: 'S1 - Pendidikan Bahasa Inggris', p1: 2, p2: 0, p3: 0, total: 2 },
        ]
      },
      {
        id: 'hukum', title: 'Fakultas Hukum', p1: 70, p2: 8, p3: 17, total: 95,
        children: [
          { id: 'hukum-1', title: 'S2 - Hukum Bisnis (S2)', p1: 8, p2: 8, p3: 17, total: 33 },
          { id: 'hukum-2', title: 'S1 - Ilmu Hukum', p1: 62, p2: 0, p3: 0, total: 62 },
        ]
      },
      {
        id: 'feb', title: 'Fakultas Ekonomi Dan Bisnis', p1: 3, p2: 0, p3: 0, total: 3,
        children: [
          { id: 'feb-1', title: 'S1 - Manajemen', p1: 2, p2: 0, p3: 0, total: 2 },
          { id: 'feb-2', title: 'S1 - Bisnis Digital', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'feb-3', title: 'S1 - Akuntansi', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'feb-4', title: 'S1 - Perdangan Internasional', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fai', title: 'Fakultas Agama Islam', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'fai-1', title: 'S1 - Ekonomi Syariah', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-2', title: 'S1 - Manajemen Haji Dan Umroh', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-3', title: 'S1 - Bimbingan Dan Konseling Pendidikan Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-4', title: 'S1 - Komunikasi Dan Penyiaran Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-5', title: 'S1 - Hukum Keluarga Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-6', title: 'S1 - Ilmu Al-Qur\'an Dan Tafsir', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-7', title: 'S1 - Pendidikan Agama Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-8', title: 'S1 - Pendidikan Guru Madrasah Ibtidaiyah', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fts', title: 'Fakultas Teknik Dan Sains', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'fts-1', title: 'S1 - Teknik Elektro', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-2', title: 'S1 - Teknik Mesin', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-3', title: 'S1 - Teknik Sipil', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-4', title: 'S1 - Ilmu Lingkungan', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-5', title: 'S1 - Rekayasa Pertanian Dan Biosistem', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-6', title: 'S1 - Teknik Informatika', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-7', title: 'S1 - Sistem Informasi', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'pascasarjana', title: 'Sekolah Pascasarjana', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'pasca-1', title: 'S3 - Ekonomi Syariah (S3)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-2', title: 'S2 - Ekonomi Syariah (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-3', title: 'S2 - Manajemen (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-4', title: 'S2 - Komunikasi Dan Penyiaran Islam (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-5', title: 'S3 - Pendidikan Agama Islam (S3)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-6', title: 'S2 - Teknologi Pendidikan(S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-7', title: 'S2 - Pendidikan Agama Islam (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fik', title: 'Fakultas Ilmu Kesehatan', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'fik-1', title: 'S1 - Kesehatan Masyarakat', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fik-2', title: 'S1 - Gizi', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      }
    ]
  },
  'Pendaftar': {
    id: 'univ',
    title: 'Universitas Ibn Khaldun',
    p1: 250, p2: 10, p3: 5, total: 265,
    children: [
      {
        id: 'fkip', title: 'Fakultas Keguruan Dan Ilmu Pendidikan', p1: 120, p2: 0, p3: 0, total: 120,
        children: [
          { id: 'fkip-1', title: 'S1 - Pendidikan Vokasional Desain Fashion', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-2', title: 'S1 - Pendidikan Matematika', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-3', title: 'S1 - Teknologi Pendidikan', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-4', title: 'S1 - Pendidikan Masyarakat', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-5', title: 'Prof - Pendidikan Profesi Guru', p1: 120, p2: 0, p3: 0, total: 120 },
          { id: 'fkip-6', title: 'S1 - Pendidikan Bahasa Inggris', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'hukum', title: 'Fakultas Hukum', p1: 50, p2: 5, p3: 3, total: 58,
        children: [
          { id: 'hukum-1', title: 'S2 - Hukum Bisnis (S2)', p1: 5, p2: 5, p3: 3, total: 13 },
          { id: 'hukum-2', title: 'S1 - Ilmu Hukum', p1: 45, p2: 0, p3: 0, total: 45 },
        ]
      },
      {
        id: 'feb', title: 'Fakultas Ekonomi Dan Bisnis', p1: 20, p2: 2, p3: 1, total: 23,
        children: [
          { id: 'feb-1', title: 'S1 - Manajemen', p1: 10, p2: 2, p3: 1, total: 13 },
          { id: 'feb-2', title: 'S1 - Bisnis Digital', p1: 5, p2: 0, p3: 0, total: 5 },
          { id: 'feb-3', title: 'S1 - Akuntansi', p1: 5, p2: 0, p3: 0, total: 5 },
          { id: 'feb-4', title: 'S1 - Perdangan Internasional', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fai', title: 'Fakultas Agama Islam', p1: 10, p2: 1, p3: 0, total: 11,
        children: [
          { id: 'fai-1', title: 'S1 - Ekonomi Syariah', p1: 2, p2: 1, p3: 0, total: 3 },
          { id: 'fai-2', title: 'S1 - Manajemen Haji Dan Umroh', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'fai-3', title: 'S1 - Bimbingan Dan Konseling Pendidikan Islam', p1: 2, p2: 0, p3: 0, total: 2 },
          { id: 'fai-4', title: 'S1 - Komunikasi Dan Penyiaran Islam', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'fai-5', title: 'S1 - Hukum Keluarga Islam', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'fai-6', title: 'S1 - Ilmu Al-Qur\'an Dan Tafsir', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'fai-7', title: 'S1 - Pendidikan Agama Islam', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'fai-8', title: 'S1 - Pendidikan Guru Madrasah Ibtidaiyah', p1: 1, p2: 0, p3: 0, total: 1 },
        ]
      },
      {
        id: 'fts', title: 'Fakultas Teknik Dan Sains', p1: 40, p2: 2, p3: 1, total: 43,
        children: [
          { id: 'fts-1', title: 'S1 - Teknik Elektro', p1: 5, p2: 0, p3: 0, total: 5 },
          { id: 'fts-2', title: 'S1 - Teknik Mesin', p1: 5, p2: 0, p3: 0, total: 5 },
          { id: 'fts-3', title: 'S1 - Teknik Sipil', p1: 10, p2: 1, p3: 0, total: 11 },
          { id: 'fts-4', title: 'S1 - Ilmu Lingkungan', p1: 2, p2: 0, p3: 0, total: 2 },
          { id: 'fts-5', title: 'S1 - Rekayasa Pertanian Dan Biosistem', p1: 3, p2: 0, p3: 0, total: 3 },
          { id: 'fts-6', title: 'S1 - Teknik Informatika', p1: 10, p2: 1, p3: 1, total: 12 },
          { id: 'fts-7', title: 'S1 - Sistem Informasi', p1: 5, p2: 0, p3: 0, total: 5 },
        ]
      },
      {
        id: 'pascasarjana', title: 'Sekolah Pascasarjana', p1: 5, p2: 0, p3: 0, total: 5,
        children: [
          { id: 'pasca-1', title: 'S3 - Ekonomi Syariah (S3)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-2', title: 'S2 - Ekonomi Syariah (S2)', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'pasca-3', title: 'S2 - Manajemen (S2)', p1: 2, p2: 0, p3: 0, total: 2 },
          { id: 'pasca-4', title: 'S2 - Komunikasi Dan Penyiaran Islam (S2)', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'pasca-5', title: 'S3 - Pendidikan Agama Islam (S3)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-6', title: 'S2 - Teknologi Pendidikan(S2)', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'pasca-7', title: 'S2 - Pendidikan Agama Islam (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fik', title: 'Fakultas Ilmu Kesehatan', p1: 5, p2: 0, p3: 0, total: 5,
        children: [
          { id: 'fik-1', title: 'S1 - Kesehatan Masyarakat', p1: 3, p2: 0, p3: 0, total: 3 },
          { id: 'fik-2', title: 'S1 - Gizi', p1: 2, p2: 0, p3: 0, total: 2 },
        ]
      }
    ]
  },
  'Diterima Program Studi': {
    id: 'univ',
    title: 'Universitas Ibn Khaldun',
    p1: 316, p2: 0, p3: 0, total: 316,
    children: [
      {
        id: 'fkip', title: 'Fakultas Keguruan Dan Ilmu Pendidikan', p1: 155, p2: 0, p3: 0, total: 155,
        children: [
          { id: 'fkip-1', title: 'S1 - Pendidikan Vokasional Desain Fashion', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-2', title: 'S1 - Pendidikan Matematika', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-3', title: 'S1 - Teknologi Pendidikan', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-4', title: 'S1 - Pendidikan Masyarakat', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fkip-5', title: 'Prof - Pendidikan Profesi Guru', p1: 153, p2: 0, p3: 0, total: 153 },
          { id: 'fkip-6', title: 'S1 - Pendidikan Bahasa Inggris', p1: 2, p2: 0, p3: 0, total: 2 },
        ]
      },
      {
        id: 'hukum', title: 'Fakultas Hukum', p1: 65, p2: 0, p3: 0, total: 65,
        children: [
          { id: 'hukum-1', title: 'S2 - Hukum Bisnis (S2)', p1: 5, p2: 0, p3: 0, total: 5 },
          { id: 'hukum-2', title: 'S1 - Ilmu Hukum', p1: 60, p2: 0, p3: 0, total: 60 },
        ]
      },
      {
        id: 'feb', title: 'Fakultas Ekonomi Dan Bisnis', p1: 2, p2: 0, p3: 0, total: 2,
        children: [
          { id: 'feb-1', title: 'S1 - Manajemen', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'feb-2', title: 'S1 - Bisnis Digital', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'feb-3', title: 'S1 - Akuntansi', p1: 1, p2: 0, p3: 0, total: 1 },
          { id: 'feb-4', title: 'S1 - Perdangan Internasional', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fai', title: 'Fakultas Agama Islam', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'fai-1', title: 'S1 - Ekonomi Syariah', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-2', title: 'S1 - Manajemen Haji Dan Umroh', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-3', title: 'S1 - Bimbingan Dan Konseling Pendidikan Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-4', title: 'S1 - Komunikasi Dan Penyiaran Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-5', title: 'S1 - Hukum Keluarga Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-6', title: 'S1 - Ilmu Al-Qur\'an Dan Tafsir', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-7', title: 'S1 - Pendidikan Agama Islam', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fai-8', title: 'S1 - Pendidikan Guru Madrasah Ibtidaiyah', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fts', title: 'Fakultas Teknik Dan Sains', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'fts-1', title: 'S1 - Teknik Elektro', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-2', title: 'S1 - Teknik Mesin', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-3', title: 'S1 - Teknik Sipil', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-4', title: 'S1 - Ilmu Lingkungan', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-5', title: 'S1 - Rekayasa Pertanian Dan Biosistem', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-6', title: 'S1 - Teknik Informatika', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fts-7', title: 'S1 - Sistem Informasi', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'pascasarjana', title: 'Sekolah Pascasarjana', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'pasca-1', title: 'S3 - Ekonomi Syariah (S3)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-2', title: 'S2 - Ekonomi Syariah (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-3', title: 'S2 - Manajemen (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-4', title: 'S2 - Komunikasi Dan Penyiaran Islam (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-5', title: 'S3 - Pendidikan Agama Islam (S3)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-6', title: 'S2 - Teknologi Pendidikan(S2)', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'pasca-7', title: 'S2 - Pendidikan Agama Islam (S2)', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      },
      {
        id: 'fik', title: 'Fakultas Ilmu Kesehatan', p1: 0, p2: 0, p3: 0, total: 0,
        children: [
          { id: 'fik-1', title: 'S1 - Kesehatan Masyarakat', p1: 0, p2: 0, p3: 0, total: 0 },
          { id: 'fik-2', title: 'S1 - Gizi', p1: 0, p2: 0, p3: 0, total: 0 },
        ]
      }
    ]
  }
};

const TabelInfoGrafik = () => {
  const [expanded, setExpanded] = useState(['univ', 'fkip', 'hukum', 'feb']);
  
  const [tahapan, setTahapan] = useState('Diterima Program Studi');
  const [tampilan, setTampilan] = useState('Tabel');

  const opsiTahapan = ['Peminat', 'Pendaftar', 'Diterima Program Studi'];
  const opsiTampilan = ['Tabel', 'Grafik'];

  const dataAktif = dataMultiSkenario[tahapan] || dataMultiSkenario['Diterima Program Studi'];

  // Menyiapkan data untuk Bar Chart
  const dataGrafik = [];
  if (dataAktif && dataAktif.children) {
    dataAktif.children.forEach(fakultas => {
      if (fakultas.children) {
        fakultas.children.forEach(prodi => {
          dataGrafik.push({
            name: prodi.title,
            'Pilihan 1': prodi.p1,
            'Pilihan 2': prodi.p2,
            'Pilihan 3': prodi.p3,
            Total: prodi.total
          });
        });
      }
    });
  }

  const toggleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      
      <h2 className="text-[20px] font-bold text-gray-900 mb-2">Info Grafik Penerimaan Mahasiswa Baru</h2>

      {/* Filter Atas */}
      <div className="flex justify-end gap-4 mb-4 relative z-20">
        <div className="flex flex-col gap-1 w-[250px]">
          <label className="text-[13px] font-bold text-[#0284c7]">Tahapan Pendaftaran</label>
          <SearchableSelect options={opsiTahapan} value={tahapan} onChange={setTahapan} placeholder="Pilih Tahapan..." />
        </div>
        <div className="flex flex-col gap-1 w-[200px]">
          <label className="text-[13px] font-bold text-[#0284c7]">Tampilkan Sebagai</label>
          <SearchableSelect options={opsiTampilan} value={tampilan} onChange={setTampilan} placeholder="Pilih Tampilan..." />
        </div>
      </div>

      {/* LOGIKA TAMPILAN */}
      {tampilan === 'Tabel' ? (
        // ====== TAMPILAN TABEL ======
        <div className="overflow-x-auto border border-gray-200 rounded-sm relative z-10">
          <table className="w-full text-left text-[13px] text-gray-700 border-collapse">
            <thead>
              <tr className="bg-[#0f3b66] text-white">
                <th className="px-4 py-3 font-semibold border-r border-[#1e4f80] w-1/2">Unit Kerja / Program Studi</th>
                <th className="px-4 py-3 font-semibold text-center border-r border-[#1e4f80] w-[12%]">Pilihan 1</th>
                <th className="px-4 py-3 font-semibold text-center border-r border-[#1e4f80] w-[12%]">Pilihan 2</th>
                <th className="px-4 py-3 font-semibold text-center border-r border-[#1e4f80] w-[12%]">Pilihan 3</th>
                <th className="px-4 py-3 font-semibold text-center w-[12%]">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 font-bold text-gray-800 border-b border-gray-200">
                <td className="px-4 py-3 flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand(dataAktif.id)}>
                  <span className="text-gray-500 text-[10px] w-4">{expanded.includes(dataAktif.id) ? '▼' : '▶'}</span>
                  {dataAktif.title}
                </td>
                <td className="px-4 py-3 text-center border-l border-gray-200">{dataAktif.p1}</td>
                <td className="px-4 py-3 text-center border-l border-gray-200">{dataAktif.p2}</td>
                <td className="px-4 py-3 text-center border-l border-gray-200">{dataAktif.p3}</td>
                <td className="px-4 py-3 text-center border-l border-gray-200">{dataAktif.total}</td>
              </tr>
              
              {expanded.includes(dataAktif.id) && dataAktif.children.map((fakultas) => (
                <React.Fragment key={fakultas.id}>
                  <tr className="bg-gray-50 font-bold text-gray-800 border-b border-gray-200">
                    <td className="px-4 py-3 pl-10 flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand(fakultas.id)}>
                      <span className="text-gray-500 text-[10px] w-4">{expanded.includes(fakultas.id) ? '▼' : '▶'}</span>
                      {fakultas.title}
                    </td>
                    <td className="px-4 py-3 text-center border-l border-gray-200">{fakultas.p1}</td>
                    <td className="px-4 py-3 text-center border-l border-gray-200">{fakultas.p2}</td>
                    <td className="px-4 py-3 text-center border-l border-gray-200">{fakultas.p3}</td>
                    <td className="px-4 py-3 text-center border-l border-gray-200">{fakultas.total}</td>
                  </tr>
                  
                  {expanded.includes(fakultas.id) && fakultas.children.map((prodi) => (
                    <tr key={prodi.id} className="bg-white text-gray-600 border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 pl-16">{prodi.title}</td>
                      <td className="px-4 py-3 text-center border-l border-gray-200">{prodi.p1}</td>
                      <td className="px-4 py-3 text-center border-l border-gray-200">{prodi.p2}</td>
                      <td className="px-4 py-3 text-center border-l border-gray-200">{prodi.p3}</td>
                      <td className="px-4 py-3 text-center border-l border-gray-200">{prodi.total}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // ====== TAMPILAN GRAFIK (DIRATAKAN / LEBIH PROPORSIONAL) ======
        <div className="w-full h-[700px] mt-4 relative z-10 border border-gray-200 rounded-sm p-4 bg-white">
          <div className="flex justify-between items-center mb-6 px-4">
            <h3 className="text-[20px] font-semibold text-gray-800 mx-auto">{dataAktif.title}</h3>
            <button className="text-gray-500 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={dataGrafik}
              layout="vertical"
              // 🔥 Margin disesuaikan agar grafik berada di tengah (tidak terlalu ke kanan/kiri)
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis 
                dataKey="name" 
                type="category" 
                // 🔥 Font standar, lebar dikurangi agar tidak terlalu jauh ke kiri
                tick={{ fontSize: 12, fill: '#374151' }} 
                width={220}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingBottom: '20px' }} />
              
              <Bar dataKey="Pilihan 1" fill="#7cb5ec" barSize={24} radius={[0, 4, 4, 0]}>
                <LabelList dataKey="Pilihan 1" position="right" style={{ fontSize: '11px', fill: '#4b5563' }} />
              </Bar>
              <Bar dataKey="Pilihan 2" fill="#90ed7d" barSize={24} radius={[0, 4, 4, 0]} />
              <Bar dataKey="Pilihan 3" fill="#f7a35c" barSize={24} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
};

export default TabelInfoGrafik;