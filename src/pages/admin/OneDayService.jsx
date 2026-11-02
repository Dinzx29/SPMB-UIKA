import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchableSelect from '../../components/ui/SearchableSelect';
import KoalaEmptyIllustration from '../../components/ui/KoalaEmptyIllustration';

// ==========================================
// DATA DUMMY 
// ==========================================

// 1. DATA PEMINAT 
const INITIAL_PEMINAT_BELUM = [
  {
    id: '4102641838',
    nama: 'KAFKA NAVISA RAHMAN',
    jk: 'L',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'BEASISWA KIP - Gelombang 1',
    pilihanProdi: ['S1 Manajemen', 'S1 Bisnis Digital', 'S1 Akuntansi'],
    email: 'kapkanavisa72@gmail.com',
    telepon: '081995778346'
  },
  {
    id: '4102641837',
    nama: 'DEDE RAHMAWATI',
    jk: 'P',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'BEASISWA KIP - Gelombang 1',
    pilihanProdi: ['S1 Pendidikan Agama Islam', 'S1 Komunikasi dan Penyiaran Islam', 'S1 Pendidikan Guru Madrasah Ibtidaiyah'],
    email: 'dederahmawati510@gmail.com',
    telepon: '085880816966'
  },
  {
    id: '4102641835',
    nama: 'PUTRI AURA TANDANI',
    jk: 'P',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'BEASISWA KIP - Gelombang 1',
    pilihanProdi: ['S1 Pendidikan Agama Islam', 'S1 Pendidikan Guru Madrasah Ibtidaiyah', 'S1 Komunikasi dan Penyiaran Islam'],
    email: 'auratandaniputri@gmail.com',
    telepon: '089688029002'
  }
];

// 2. DATA PENDAFTAR (Tab Pendaftar)
const INITIAL_PENDAFTAR_VERIFIKASI = [
  {
    id: '4102680008',
    nama: 'ABDAD ABDILLAH KHAIRULLAH',
    jk: 'L',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'DISABILITAS - Gelombang 2',
    pilihanProdi: ['S1 Pendidikan Masyarakat'],
    email: 'bundaabdadabsyar@gmail.com',
    telepon: '0895351988481'
  },
  {
    id: '4102680001',
    nama: 'MUHAMMAD RAHID ALFARAFS',
    jk: 'L',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'DISABILITAS - Gelombang 1',
    pilihanProdi: ['S1 Ilmu Al-Qur\'an dan Tafsir', 'S1 Pendidikan Bahasa Inggris'],
    email: 'rahidm457@gmail.com',
    telepon: '082288084708'
  },
  {
    id: '4102660032',
    nama: 'ZALFA HAYA HUMAIRA',
    jk: 'P',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'Jalur Afirmasi 1 - Gelombang 1',
    pilihanProdi: ['D4 Perbankan dan Keuangan Digital (Sarjana Terapan)'],
    email: 'zalfhaha@gmail.com',
    telepon: '089652250261'
  },
  {
    id: '4102660016',
    nama: 'CASEY SACHIO SYABANA',
    jk: 'L',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'Beasiswa Orang Tua Asuh - Gelombang 1',
    pilihanProdi: ['S1 Manajemen', 'S1 Bisnis Digital', 'S1 Ilmu Lingkungan'],
    email: 'esacti29@gmail.com',
    telepon: '08567902699'
  }
];

// 3. DATA PESERTA SELEKSI 
const INITIAL_PESERTA_SELEKSI = [
  {
    id: '4112530093',
    nama: 'SUCI ISTRIANA',
    jk: 'P',
    periode: '2026 Ganjil - Karyawan',
    jalurGelombang: 'PASCASARJANA (S3) - Gelombang 1',
    pilihanProdi: ['S3 Pendidikan Agama Islam (S3)', 'S3 Ekonomi Syariah (S3)'],
    seleksiDetail: ''
  },
  {
    id: '4112530092',
    nama: 'FAISAL AMRI',
    jk: 'L',
    periode: '2026 Ganjil - Karyawan',
    jalurGelombang: 'PASCASARJANA (S3) - Gelombang 1',
    pilihanProdi: ['S3 Ekonomi Syariah (S3)', 'S3 Pendidikan Agama Islam (S3)'],
    seleksiDetail: ''
  },
  {
    id: '4102660024',
    nama: 'SAFIRATUL ADAWIYAH',
    jk: 'P',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'Beasiswa Orang Tua Asuh - Gelombang 1',
    pilihanProdi: ['S1 Sistem Informasi', 'S1 Manajemen Haji dan Umrah', 'D4 Perbankan dan Keuangan Digital (Sarjana Terapan)'],
    seleksiDetail: ''
  },
  {
    id: '4102660018',
    nama: 'SITI NABILA S',
    jk: 'P',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'Beasiswa Orang Tua Asuh - Gelombang 1',
    pilihanProdi: ['S1 Gizi', 'S1 Rekayasa Pertanian dan Biosistem', 'S1 Pendidikan Bahasa Inggris'],
    seleksiDetail: ''
  }
];

// 4. DATA DAFTAR ULANG (Foto 3 User: Tab Daftar Ulang)
const INITIAL_DAFTAR_ULANG_VERIFIKASI = [
  {
    id: '4101262047',
    nama: 'MUHAMAD FADLI AL FARABI',
    jk: 'L',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'SELEKSI MANDIRI - Gelombang 2',
    prodiDiterima: 'S1 - Teknik Mesin',
    email: 'mfadialfarabi4@gmail.com',
    telepon: '088296653709'
  },
  {
    id: '4101261446',
    nama: 'LINA MELINDA KUSUMAWATY',
    jk: 'P',
    periode: '2026 Ganjil - Karyawan',
    jalurGelombang: 'PASCASARJANA (S3) - Gelombang 1',
    prodiDiterima: 'S3 - Pendidikan Agama Islam (S3)',
    email: 'lina.m.kusumawaty@gmail.com',
    telepon: '085921236893'
  },
  {
    id: '4101260706',
    nama: 'KEYZA ALUNA KHANZA',
    jk: 'P',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'SELEKSI MANDIRI - Gelombang 2',
    prodiDiterima: 'S1 - Perdagangan Internasional',
    email: 'raferthaal@gmail.com',
    telepon: '085924218063'
  },
  {
    id: '4101260408',
    nama: 'ABDILLAH HAFIZNI',
    jk: 'L',
    periode: '2026 Ganjil - Reguler',
    jalurGelombang: 'SELEKSI MANDIRI - Gelombang 1',
    prodiDiterima: 'S1 - Pendidikan Agama Islam',
    email: 'niiscary11@gmail.com',
    telepon: '08987492976'
  }
];

const OneDayService = () => {
  const navigate = useNavigate();

  // State Filter Atas
  const [periode, setPeriode] = useState('2026 Genap');
  const [gelombang, setGelombang] = useState('-- Semua Gelombang --');
  const [jalur, setJalur] = useState('-- Semua Jalur Pendaftaran --');
  const [sistemKuliah, setSistemKuliah] = useState('-- Semua Sistem Kuliah --');

  // State Tab Statistik Utama (Peminat | Pendaftar | Peserta Seleksi | Daftar Ulang)
  const [activeStatTab, setActiveStatTab] = useState('Peminat');

  // Sub-Tab per Tab Utama
  const [subTabPeminat, setSubTabPeminat] = useState('belum'); // 'belum' | 'sudah'
  const [subTabPendaftar, setSubTabPendaftar] = useState('verifikasi'); // 'verifikasi' | 'belum_final'
  const [subTabDaftarUlang, setSubTabDaftarUlang] = useState('verifikasi'); // 'verifikasi' | 'belum_bayar' | 'sudah'

  // State Pencarian & Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Opsi Filter
  const generatePeriodeOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
    for (let year = currentYear; year >= 1990; year--) {
      options.push(`${year} Genap`);
      options.push(`${year} Ganjil`);
    }
    return options;
  };

  const periodeOptions = generatePeriodeOptions();
  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3", "KIP A", "KIP B", "KIP C"];
  const jalurOptions = ["-- Semua Jalur Pendaftaran --", "Jalur Reguler (Ujian Mandiri)", "Jalur Beasiswa KIP", "Jalur Prestasi", "Jalur Alih Jenjang / Pindahan", "Jalur Pascasarjana & Profesi"];
  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler", "Karyawan", "Karyawan RPL YAPE"];

  // 4 Kartu Tab Sesuai Foto
  const statTabs = [
    {
      id: 'Peminat',
      label: 'Peminat',
      count: '167',
      alertBadge: '18 Peminat Baru'
    },
    {
      id: 'Pendaftar',
      label: 'Pendaftar',
      count: '628',
      alertBadge: '389 Perlu Diverifikasi'
    },
    {
      id: 'Peserta Seleksi',
      label: 'Peserta Seleksi',
      count: '40',
      alertBadge: '5 Perlu Dinilai'
    },
    {
      id: 'Daftar Ulang',
      label: 'Daftar Ulang',
      count: '2293',
      alertBadge: '8 Perlu Diverifikasi'
    },
  ];

  // Helper Pagination Component Sesuai Foto
  const renderPagination = (displayedCount, totalCount, label) => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-5 pb-1 border-t border-gray-200 text-[13.5px] text-gray-600">
        <div>
          Menampilkan <strong className="text-gray-900 font-bold">{displayedCount}</strong> dari <strong className="text-gray-900 font-bold">{totalCount}</strong> data {label}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Tampilkan</span>
            <select
              value={rowsPerPage}
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-gray-300 rounded px-2.5 py-1 text-[13px] bg-white outline-none cursor-pointer focus:border-[#004b87]"
            >
              <option value={10}>10 baris</option>
              <option value={25}>25 baris</option>
              <option value={50}>50 baris</option>
              <option value={100}>100 baris</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 rounded flex items-center justify-center font-bold text-[13.5px] transition-colors cursor-pointer ${
                currentPage === 1 ? 'bg-[#004b87] text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 rounded flex items-center justify-center font-medium text-[13.5px] transition-colors cursor-pointer ${
                currentPage === 2 ? 'bg-[#004b87] text-white font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 rounded flex items-center justify-center font-medium text-[13.5px] transition-colors cursor-pointer ${
                currentPage === 3 ? 'bg-[#004b87] text-white font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              3
            </button>
            <button
              onClick={() => setCurrentPage(4)}
              className={`w-8 h-8 rounded flex items-center justify-center font-medium text-[13.5px] transition-colors cursor-pointer ${
                currentPage === 4 ? 'bg-[#004b87] text-white font-bold' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              4
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, 4))}
              className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              &gt;
            </button>
            <button
              onClick={() => setCurrentPage(4)}
              className="w-8 h-8 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">
      
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a65a] text-white px-4 py-2.5 rounded shadow-lg text-[13.5px] flex items-center gap-2 animate-fadeIn">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-1">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2 font-medium">
              <svg className="w-4 h-4 cursor-pointer text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-gray-400">›</span>
              <span>One Day Service</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Pendaftaran</h2>
          </div>

          <button
            onClick={() => navigate('/admin/ods_pencarianpendaftar')}
            className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003865] text-white px-5 py-2.5 rounded-md text-[14px] font-medium transition-colors shadow-sm cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Cari Semua Pendaftar</span>
          </button>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-[3px] border-t-[#004b87] rounded-md p-6 shadow-sm relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 relative z-50">
                <label className="w-40 text-[14px] font-bold text-gray-800 shrink-0">Periode</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={periodeOptions} value={periode} onChange={setPeriode} placeholder="Pilih Periode..." />
                </div>
              </div>
              <div className="flex items-center gap-4 relative z-40">
                <label className="w-40 text-[14px] font-bold text-gray-800 shrink-0">Jalur Pendaftaran</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={jalurOptions} value={jalur} onChange={setJalur} placeholder="Pilih Jalur..." />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 relative z-30">
                <label className="w-40 text-[14px] font-bold text-gray-800 shrink-0">Gelombang</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={gelombangOptions} value={gelombang} onChange={setGelombang} placeholder="Pilih Gelombang..." />
                </div>
              </div>
              <div className="flex items-center gap-4 relative z-20">
                <label className="w-40 text-[14px] font-bold text-gray-800 shrink-0">Sistem Kuliah</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={sistemKuliahOptions} value={sistemKuliah} onChange={setSistemKuliah} placeholder="Pilih Sistem Kuliah..." />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK STATISTIK TAB & BADGE SESUAI PERSIS FOTO */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 mt-2 overflow-hidden flex flex-col">
          
          {/* 4 TAB KOTAK DENGAN ANGKA BESAR & BADGE ORANYE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-gray-200">
            {statTabs.map((tab) => {
              const isActive = activeStatTab === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => {
                    setActiveStatTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`p-5 border-r border-gray-200 last:border-r-0 cursor-pointer transition-all ${
                    isActive
                      ? 'bg-white border-t-[3px] border-t-[#004b87] -mt-[1px]'
                      : 'bg-white hover:bg-gray-50/80 border-t-[3px] border-t-transparent'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-gray-700 text-[14px] font-medium">
                    <span>{tab.label}</span>
                    <span className="text-gray-400 text-[13px]">ⓘ</span>
                  </div>

                  <div className="flex items-baseline gap-3 mt-2">
                    <span className="text-[32px] font-bold text-[#004b87] leading-none tracking-tight">
                      {tab.count}
                    </span>
                    {tab.alertBadge && (
                      <div className="flex items-center gap-1 text-[#e67e22] text-[12px] font-semibold">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#fcf8e3] border border-[#f39c12] text-[#f39c12] flex items-center justify-center text-[10px] font-bold">
                          !
                        </span>
                        <span>{tab.alertBadge}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* KONTEN TAB UTAMA */}
          <div className="p-6">
            
            {/* ============================================================== */}
            {/* 1. TAB PEMINAT (Foto Peminat) */}
            {/* ============================================================== */}
            {activeStatTab === 'Peminat' && (
              <div className="flex flex-col gap-6">
                
                {/* SUB-TAB: Belum Dihubungi (18) & Sudah Dihubungi (149) */}
                <div className="flex items-center gap-8 border-b border-gray-200 pb-2">
                  <button
                    onClick={() => { setSubTabPeminat('belum'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabPeminat === 'belum'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Belum Dihubungi</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#004b87] text-white">
                      18
                    </span>
                  </button>

                  <button
                    onClick={() => { setSubTabPeminat('sudah'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabPeminat === 'sudah'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Sudah Dihubungi</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#6c757d] text-white">
                      149
                    </span>
                  </button>
                </div>

                {/* Toolbar Search & Export Kontak */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  <div className="flex items-center w-full max-w-[340px]">
                    <input
                      type="text"
                      placeholder="Cari Peminat"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border border-gray-300 rounded-l px-3.5 py-2 text-[13.5px] w-full outline-none focus:border-[#004b87] bg-white placeholder-gray-400"
                    />
                    <button className="bg-[#004b87] hover:bg-[#003865] text-white px-3.5 py-2 rounded-r transition-colors flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => showToast('Kontak peminat sedang diekspor ke file Excel...')}
                    className="flex items-center justify-center gap-2 bg-[#f39c12] hover:bg-[#e67e22] text-white px-5 py-2 rounded-md text-[13.5px] font-bold transition-colors shadow-sm cursor-pointer shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export Kontak</span>
                  </button>
                </div>

                {/* Tabel Peminat */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[950px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-800 text-[13.5px] font-bold">
                        <th className="py-3 px-4 w-[230px]">Peminat</th>
                        <th className="py-3 px-4 w-[240px]">Periode</th>
                        <th className="py-3 px-4 w-[250px]">Pilihan Prodi</th>
                        <th className="py-3 px-4 w-[280px]">Kontak Peminat</th>
                        <th className="py-3 px-4 text-center w-[160px]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                      {INITIAL_PEMINAT_BELUM.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-4 px-4 align-top">
                            <div className="text-[12px] text-gray-500 font-mono mb-0.5">{item.id}</div>
                            <div className="font-bold text-gray-900 leading-snug">
                              <span className="underline cursor-pointer hover:text-[#004b87]">{item.nama}</span>{' '}
                              <span className="font-normal text-gray-600">({item.jk})</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <div className="text-gray-600 text-[12.5px] mb-0.5">{item.periode}</div>
                            <div className="font-bold text-gray-900 text-[13px]">{item.jalurGelombang}</div>
                          </td>
                          <td className="py-4 px-4 align-top text-gray-800">
                            <div className="space-y-1">
                              {item.pilihanProdi.map((prodi, pIdx) => (
                                <div key={pIdx} className="leading-tight">{prodi}</div>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4 align-top">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                <a href={`mailto:${item.email}`} className="text-[#004b87] hover:underline flex items-center gap-1 font-medium text-[12.5px]">
                                  <span>{item.email}</span>
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" /></svg>
                                <a href={`https://wa.me/${item.telepon.replace(/^0/, '62')}`} target="_blank" rel="noreferrer" className="text-[#004b87] hover:underline flex items-center gap-1 font-medium text-[12.5px]">
                                  <span>{item.telepon}</span>
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center align-top">
                            <button
                              onClick={() => showToast(`Peminat ${item.nama} telah ditandai.`)}
                              className="w-full inline-flex items-center justify-center gap-2 border border-[#004b87] text-[#004b87] hover:bg-[#004b87] hover:text-white px-3.5 py-2 rounded-md font-semibold text-[13px] transition-colors shadow-xs cursor-pointer"
                            >
                              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                              <span>Sudah Dihubungi</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {renderPagination('10', '167', 'peminat')}
              </div>
            )}

            {/* ============================================================== */}
            {/* 2. TAB PENDAFTAR (Foto 1 User: Perlu Diverifikasi & Belum Finalisasi) */}
            {/* ============================================================== */}
            {activeStatTab === 'Pendaftar' && (
              <div className="flex flex-col gap-6">
                
                {/* SUB-TAB: Perlu Diverifikasi (389) & Belum Finalisasi (239) */}
                <div className="flex items-center gap-8 border-b border-gray-200 pb-2">
                  <button
                    onClick={() => { setSubTabPendaftar('verifikasi'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabPendaftar === 'verifikasi'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Perlu Diverifikasi</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#004b87] text-white">
                      389
                    </span>
                  </button>

                  <button
                    onClick={() => { setSubTabPendaftar('belum_final'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabPendaftar === 'belum_final'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Belum Finalisasi</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#6c757d] text-white">
                      239
                    </span>
                  </button>
                </div>

                {/* Toolbar Search Pendaftar */}
                <div className="flex items-center w-full max-w-[340px]">
                  <input
                    type="text"
                    placeholder="Cari Pendaftar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-l px-3.5 py-2 text-[13.5px] w-full outline-none focus:border-[#004b87] bg-white placeholder-gray-400"
                  />
                  <button className="bg-[#004b87] hover:bg-[#003865] text-white px-3.5 py-2 rounded-r transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Tabel Pendaftar Sesuai Foto */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[950px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-800 text-[13.5px] font-bold">
                        <th className="py-3 px-4 w-[230px]">Pendaftar</th>
                        <th className="py-3 px-4 w-[240px]">Periode</th>
                        <th className="py-3 px-4 w-[260px]">Pilihan Prodi</th>
                        <th className="py-3 px-4 w-[280px]">Kontak Pendaftar</th>
                        <th className="py-3 px-4 text-center w-[170px]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                      {INITIAL_PENDAFTAR_VERIFIKASI.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-4 px-4 align-top">
                            <div className="text-[12px] text-gray-500 font-mono mb-0.5">{item.id}</div>
                            <div className="font-bold text-gray-900 leading-snug">
                              <span className="underline cursor-pointer hover:text-[#004b87]">{item.nama}</span>{' '}
                              <span className="font-normal text-gray-600">({item.jk})</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="text-gray-600 text-[12.5px] mb-0.5">{item.periode}</div>
                            <div className="font-bold text-gray-900 text-[13px]">{item.jalurGelombang}</div>
                          </td>

                          <td className="py-4 px-4 align-top text-gray-800">
                            <div className="space-y-1">
                              {item.pilihanProdi.map((prodi, pIdx) => (
                                <div key={pIdx} className="leading-tight">{prodi}</div>
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                <a href={`mailto:${item.email}`} className="text-[#004b87] hover:underline flex items-center gap-1 font-medium text-[12.5px]">
                                  <span>{item.email}</span>
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" /></svg>
                                <a href={`https://wa.me/${item.telepon.replace(/^0/, '62')}`} target="_blank" rel="noreferrer" className="text-[#004b87] hover:underline flex items-center gap-1 font-medium text-[12.5px]">
                                  <span>{item.telepon}</span>
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                            </div>
                          </td>

                          {/* Tombol Aksi Verifikasi Berkas Sesuai Foto */}
                          <td className="py-4 px-4 text-center align-top">
                            <button
                              onClick={() => showToast(`Buka verifikasi berkas untuk ${item.nama}`)}
                              className="w-full inline-flex items-center justify-center gap-2 border border-[#004b87] text-[#004b87] hover:bg-[#004b87] hover:text-white px-3.5 py-2.5 rounded-md font-semibold text-[13px] transition-colors shadow-xs cursor-pointer"
                            >
                              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Verifikasi Berkas</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {renderPagination('10', '389', 'pendaftar')}
              </div>
            )}

            {/* ============================================================== */}
            {/* 3. TAB PESERTA SELEKSI (Foto 2 User: Set Kelulusan) */}
            {/* ============================================================== */}
            {activeStatTab === 'Peserta Seleksi' && (
              <div className="flex flex-col gap-6">
                
                {/* Toolbar Search Peserta Seleksi */}
                <div className="flex items-center w-full max-w-[340px]">
                  <input
                    type="text"
                    placeholder="Cari Pendaftar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-l px-3.5 py-2 text-[13.5px] w-full outline-none focus:border-[#004b87] bg-white placeholder-gray-400"
                  />
                  <button className="bg-[#004b87] hover:bg-[#003865] text-white px-3.5 py-2 rounded-r transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Tabel Peserta Seleksi Sesuai Foto */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[950px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-800 text-[13.5px] font-bold">
                        <th className="py-3 px-4 w-[230px]">Pendaftar</th>
                        <th className="py-3 px-4 w-[240px]">Periode</th>
                        <th className="py-3 px-4 w-[270px]">Pilihan Prodi</th>
                        <th className="py-3 px-4 w-[230px]">Seleksi</th>
                        <th className="py-3 px-4 text-center w-[170px]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                      {INITIAL_PESERTA_SELEKSI.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-5 px-4 align-top">
                            <div className="text-[12px] text-gray-500 font-mono mb-1">{item.id}</div>
                            <div className="font-bold text-gray-900 leading-snug">
                              <span className="underline cursor-pointer hover:text-[#004b87]">{item.nama}</span>{' '}
                              <span className="font-normal text-gray-600">({item.jk})</span>
                            </div>
                          </td>

                          <td className="py-5 px-4 align-top">
                            <div className="text-gray-600 text-[12.5px] mb-1">{item.periode}</div>
                            <div className="font-bold text-gray-900 text-[13px]">{item.jalurGelombang}</div>
                          </td>

                          <td className="py-5 px-4 align-top text-gray-800">
                            <div className="space-y-1">
                              {item.pilihanProdi.map((prodi, pIdx) => (
                                <div key={pIdx} className="leading-tight">{prodi}</div>
                              ))}
                            </div>
                          </td>

                          <td className="py-5 px-4 align-top text-gray-500">
                            {item.seleksiDetail || '-'}
                          </td>

                          {/* Tombol Aksi Set Kelulusan (Hijau Sesuai Foto) */}
                          <td className="py-5 px-4 text-center align-top">
                            <button
                              onClick={() => showToast(`Set kelulusan untuk ${item.nama}`)}
                              className="w-full inline-flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-600 hover:text-white px-3.5 py-2 rounded-md font-semibold text-[13px] transition-colors shadow-xs cursor-pointer"
                            >
                              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>Set Kelulusan</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {renderPagination('10', '40', 'peserta seleksi')}
              </div>
            )}

            {/* ============================================================== */}
            {/* 4. TAB DAFTAR ULANG (Foto 3 User: Perlu Diverifikasi & Belum Bayar) */}
            {/* ============================================================== */}
            {activeStatTab === 'Daftar Ulang' && (
              <div className="flex flex-col gap-6">
                
                {/* SUB-TAB: Perlu Diverifikasi (8) | Belum Bayar (197) | Sudah Daftar Ulang (2088) */}
                <div className="flex items-center gap-8 border-b border-gray-200 pb-2">
                  <button
                    onClick={() => { setSubTabDaftarUlang('verifikasi'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabDaftarUlang === 'verifikasi'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Perlu Diverifikasi</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#004b87] text-white">
                      8
                    </span>
                  </button>

                  <button
                    onClick={() => { setSubTabDaftarUlang('belum_bayar'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabDaftarUlang === 'belum_bayar'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Belum Bayar</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#6c757d] text-white">
                      197
                    </span>
                  </button>

                  <button
                    onClick={() => { setSubTabDaftarUlang('sudah'); setCurrentPage(1); }}
                    className={`flex items-center gap-2.5 text-[14px] pb-2 cursor-pointer transition-colors ${
                      subTabDaftarUlang === 'sudah'
                        ? 'font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] -mb-[11px]'
                        : 'font-semibold text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>Sudah Daftar Ulang</span>
                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-[3px] bg-[#6c757d] text-white">
                      2088
                    </span>
                  </button>
                </div>

                {/* Toolbar Search Daftar Ulang */}
                <div className="flex items-center w-full max-w-[340px]">
                  <input
                    type="text"
                    placeholder="Cari Pendaftar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-l px-3.5 py-2 text-[13.5px] w-full outline-none focus:border-[#004b87] bg-white placeholder-gray-400"
                  />
                  <button className="bg-[#004b87] hover:bg-[#003865] text-white px-3.5 py-2 rounded-r transition-colors flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Tabel Daftar Ulang Sesuai Foto 3 */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[950px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-800 text-[13.5px] font-bold">
                        <th className="py-3 px-4 w-[230px]">Pendaftar</th>
                        <th className="py-3 px-4 w-[240px]">Periode</th>
                        <th className="py-3 px-4 w-[250px]">Prodi Diterima</th>
                        <th className="py-3 px-4 w-[280px]">Kontak Pendaftar</th>
                        <th className="py-3 px-4 text-center w-[170px]">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                      {INITIAL_DAFTAR_ULANG_VERIFIKASI.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-4 px-4 align-top">
                            <div className="text-[12px] text-gray-500 font-mono mb-0.5">{item.id}</div>
                            <div className="font-bold text-gray-900 leading-snug">
                              <span className="underline cursor-pointer hover:text-[#004b87]">{item.nama}</span>{' '}
                              <span className="font-normal text-gray-600">({item.jk})</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="text-gray-600 text-[12.5px] mb-0.5">{item.periode}</div>
                            <div className="font-bold text-gray-900 text-[13px]">{item.jalurGelombang}</div>
                          </td>

                          <td className="py-4 px-4 align-top font-medium text-gray-800">
                            {item.prodiDiterima}
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                <a href={`mailto:${item.email}`} className="text-[#004b87] hover:underline flex items-center gap-1 font-medium text-[12.5px]">
                                  <span>{item.email}</span>
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" /></svg>
                                <a href={`https://wa.me/${item.telepon.replace(/^0/, '62')}`} target="_blank" rel="noreferrer" className="text-[#004b87] hover:underline flex items-center gap-1 font-medium text-[12.5px]">
                                  <span>{item.telepon}</span>
                                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                </a>
                              </div>
                            </div>
                          </td>

                          {/* Tombol Aksi Verifikasi Berkas Sesuai Foto 3 */}
                          <td className="py-4 px-4 text-center align-top">
                            <button
                              onClick={() => showToast(`Verifikasi berkas daftar ulang ${item.nama}`)}
                              className="w-full inline-flex items-center justify-center gap-2 border border-[#004b87] text-[#004b87] hover:bg-[#004b87] hover:text-white px-3.5 py-2.5 rounded-md font-semibold text-[13px] transition-colors shadow-xs cursor-pointer"
                            >
                              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Verifikasi Berkas</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {renderPagination('4', '8', 'daftar ulang')}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default OneDayService;
