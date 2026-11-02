import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// DATA PENDAFTAR REALISTIS UNTUK PENCARIAN ODS
const MOCK_PENDAFTAR_DATA = [
  {
    id: '4102641838',
    nama: 'KAFKA NAVISA RAHMAN',
    prodiPilihan: 'S1 Manajemen, S1 Bisnis Digital, S1 Akuntansi',
    informasi: '2026 Ganjil - Reguler | BEASISWA KIP - Gelombang 1 | Status: Peminat Baru'
  },
  {
    id: '4102641837',
    nama: 'DEDE RAHMAWATI',
    prodiPilihan: 'S1 Pendidikan Agama Islam, S1 Komunikasi dan Penyiaran Islam, S1 Pendidikan Guru Madrasah Ibtidaiyah',
    informasi: '2026 Ganjil - Reguler | BEASISWA KIP - Gelombang 1 | Status: Peminat Baru'
  },
  {
    id: '4102680008',
    nama: 'ABDAD ABDILLAH KHAIRULLAH',
    prodiPilihan: 'S1 Pendidikan Masyarakat',
    informasi: '2026 Ganjil - Reguler | DISABILITAS - Gelombang 2 | Status: Perlu Verifikasi Berkas'
  },
  {
    id: '4102680001',
    nama: 'MUHAMMAD RAHID ALFARAFS',
    prodiPilihan: "S1 Ilmu Al-Qur'an dan Tafsir, S1 Pendidikan Bahasa Inggris",
    informasi: '2026 Ganjil - Reguler | DISABILITAS - Gelombang 1 | Status: Perlu Verifikasi Berkas'
  },
  {
    id: '4112530093',
    nama: 'SUCI ISTRIANA',
    prodiPilihan: 'S3 Pendidikan Agama Islam (S3), S3 Ekonomi Syariah (S3)',
    informasi: '2026 Ganjil - Karyawan | PASCASARJANA (S3) - Gelombang 1 | Status: Peserta Seleksi'
  },
  {
    id: '4101262047',
    nama: 'MUHAMAD FADLI AL FARABI',
    prodiPilihan: 'S1 - Teknik Mesin',
    informasi: '2026 Ganjil - Reguler | SELEKSI MANDIRI - Gelombang 2 | Status: Lulus / Perlu Verifikasi Daftar Ulang'
  },
  {
    id: '4112560008',
    nama: 'UBAIDILLAH',
    prodiPilihan: 'S2 - Pendidikan Agama Islam (S2)',
    informasi: '2025 Ganjil - Karyawan | RPL PEROLEHAN SKS (S2) | Status: Belum Finalisasi'
  }
];

const OdsPencarianPendaftar = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchKeyword.trim().toLowerCase();
    setHasSearched(true);

    if (!query) {
      setSearchResult(null);
      return;
    }

    const found = MOCK_PENDAFTAR_DATA.find(
      (item) => item.id.toLowerCase().includes(query) || item.nama.toLowerCase().includes(query)
    );

    setSearchResult(found || null);
  };

  const handleReset = () => {
    setSearchKeyword('');
    setSearchResult(null);
    setHasSearched(false);
  };

  return (
    <div className="relative flex flex-col gap-6 w-full font-sans bg-[#f5f6f8] p-6 min-h-screen">
      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">
        
        {/* BREADCRUMB & HEADER JUDUL */}
        <div>
          <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-2 font-medium">
            <button
              onClick={() => navigate('/admin/one_day_service')}
              className="hover:text-[#004b87] flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-gray-400">›</span>
            <button
              onClick={() => navigate('/admin/one_day_service')}
              className="hover:text-[#004b87] hover:underline cursor-pointer"
            >
              One Day Service
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600 font-semibold">Pencarian Pendaftar</span>
          </div>

          <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
            Pencarian Pendaftar
          </h2>
        </div>

        {/* KOTAK 1: FORM PENCARIAN (GARIS ATAS ORANYE SESUAI FOTO) */}
        <div className="w-full bg-white border-t-[3px] border-t-[#f39c12] rounded-md p-7 shadow-sm">
          <form onSubmit={handleSearch} className="flex flex-col items-center justify-center max-w-[650px] mx-auto">
            
            {/* Label Oranye di Atas Input */}
            <label className="text-[#f39c12] font-bold text-[14px] mb-3 text-center">
              Nama / ID Pendaftar
            </label>

            {/* Input Group & Tombol Cari */}
            <div className="flex w-full items-stretch">
              <input
                type="text"
                placeholder="Masukkan Kode / Nama Pendaftar"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 border border-gray-300 border-r-0 rounded-l px-4 py-2.5 text-[14px] outline-none focus:border-[#004b87] bg-white text-gray-800 placeholder-gray-400 transition-colors shadow-2xs"
              />
              <button
                type="submit"
                className="bg-[#1b4f9c] hover:bg-[#163d7a] text-white px-5 py-2.5 rounded-r font-medium text-[14px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Cari</span>
              </button>
            </div>

            {/* Hint & Reset Helper */}
            {hasSearched && (
              <div className="mt-2.5 flex items-center justify-between w-full text-[12.5px]">
                {searchResult ? (
                  <span className="text-emerald-600 font-medium">✓ Data ditemukan untuk &quot;{searchKeyword}&quot;</span>
                ) : (
                  <span className="text-amber-600 font-medium">Data &quot;{searchKeyword}&quot; tidak ditemukan.</span>
                )}
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-gray-400 hover:text-gray-700 underline cursor-pointer"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </form>
        </div>

        {/* KOTAK 2: DETAIL HASIL PENDAFTAR (GARIS ATAS HIJAU SESUAI FOTO) */}
        <div className="w-full bg-white border-t-[3px] border-t-[#00a65a] rounded-md p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            
            {/* SISI KIRI: KOTAK FOTO / SILHOUETTE AVATAR SESUAI FOTO */}
            <div className="w-full md:w-[220px] shrink-0 flex items-center justify-center p-3 border border-gray-200 rounded-sm bg-[#f8fafc]">
              <div className="w-full h-[220px] flex items-center justify-center bg-[#eef2f6] rounded border border-gray-100 overflow-hidden relative">
                {/* SVG Silhouette Avatar Kepala & Pundak Sesuai Tampilan Asli */}
                <svg
                  className="w-36 h-36 text-[#b6c7d6]"
                  viewBox="0 0 120 140"
                  fill="currentColor"
                >
                  {/* Head */}
                  <circle cx="60" cy="45" r="28" />
                  {/* Shoulders */}
                  <path d="M15 135 C15 95 35 85 60 85 C85 85 105 95 105 135 Z" />
                </svg>
              </div>
            </div>

            {/* SISI KANAN: TABEL INFORMASI DENGAN GARIS BAWAH BIRU SESUAI FOTO */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="w-full border border-gray-200 border-b-0 text-[13.5px]">
                
                {/* Baris 1: ID Pendaftar */}
                <div className="flex items-center border-b border-gray-200 bg-white">
                  <div className="w-[180px] px-4 py-3 font-medium text-gray-700 border-r border-gray-200 shrink-0">
                    ID Pendaftar
                  </div>
                  <div className="w-[30px] px-2 py-3 text-center text-gray-500 font-bold border-r border-gray-200 shrink-0">
                    :
                  </div>
                  <div className="flex-1 px-4 py-3 font-semibold text-gray-900">
                    {searchResult ? searchResult.id : ''}
                  </div>
                </div>

                {/* Baris 2: Nama */}
                <div className="flex items-center border-b border-gray-200 bg-[#fbfcfd]">
                  <div className="w-[180px] px-4 py-3 font-medium text-gray-700 border-r border-gray-200 shrink-0">
                    Nama
                  </div>
                  <div className="w-[30px] px-2 py-3 text-center text-gray-500 font-bold border-r border-gray-200 shrink-0">
                    :
                  </div>
                  <div className="flex-1 px-4 py-3 font-bold text-gray-900">
                    {searchResult ? searchResult.nama : ''}
                  </div>
                </div>

                {/* Baris 3: Prodi Pilihan */}
                <div className="flex items-center border-b border-gray-200 bg-white">
                  <div className="w-[180px] px-4 py-3 font-medium text-gray-700 border-r border-gray-200 shrink-0">
                    Prodi Pilihan
                  </div>
                  <div className="w-[30px] px-2 py-3 text-center text-gray-500 font-bold border-r border-gray-200 shrink-0">
                    :
                  </div>
                  <div className="flex-1 px-4 py-3 text-gray-800">
                    {searchResult ? searchResult.prodiPilihan : ''}
                  </div>
                </div>

                {/* Baris 4: Informasi */}
                <div className="flex items-center border-b border-gray-200 bg-[#fbfcfd]">
                  <div className="w-[180px] px-4 py-3 font-medium text-gray-700 border-r border-gray-200 shrink-0">
                    Informasi
                  </div>
                  <div className="w-[30px] px-2 py-3 text-center text-gray-500 font-bold border-r border-gray-200 shrink-0">
                    :
                  </div>
                  <div className="flex-1 px-4 py-3 text-gray-600">
                    {searchResult ? searchResult.informasi : '- - -'}
                  </div>
                </div>

              </div>

              {/* Garis Border Biru Bawah Tabel Sesuai Foto Asli */}
              <div className="h-1 bg-[#004b87] w-full"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default OdsPencarianPendaftar;

