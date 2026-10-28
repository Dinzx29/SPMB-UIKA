import React, { useState } from 'react';
import SearchableSelect from '../../components/ui/SearchableSelect';

const OneDayService = () => {
  // State untuk Filter
  const [periode, setPeriode] = useState('2026 Genap');
  const [gelombang, setGelombang] = useState('-- Semua Gelombang --');
  const [jalur, setJalur] = useState('-- Semua Jalur Pendaftaran --');
  const [sistemKuliah, setSistemKuliah] = useState('-- Semua Sistem Kuliah --');

  // State untuk Tab Aktif di bagian Statistik
  const [activeStatTab, setActiveStatTab] = useState('Peminat');

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

  // Tab Statistik (4 kotak di bawah)
  const statTabs = [
    { id: 'Peminat', label: 'Peminat' },
    { id: 'Pendaftar', label: 'Pendaftar' },
    { id: 'Peserta Seleksi', label: 'Peserta Seleksi' },
    { id: 'Daftar Ulang', label: 'Daftar Ulang' },
  ];

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">
      
      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2 font-medium">
              <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-gray-400">›</span>
              <span>One Day Service</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900">Pendaftaran</h2>
          </div>

          {/* Tombol Cari Semua Pendaftar */}
          <button className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003865] text-white px-5 py-2.5 rounded-md text-[14px] font-medium transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            Cari Semua Pendaftar
          </button>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-[3px] border-t-[#004b87] rounded-md p-6 shadow-sm relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            
            {/* Kiri */}
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

            {/* Kanan */}
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

        {/* KOTAK STATISTIK TAB & BADGE */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 mt-2 overflow-hidden flex flex-col">
          
          {/* Navigasi Tab Statistik (Peminat, Pendaftar, dll) */}
          <div className="flex border-b border-gray-200">
            {statTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStatTab(tab.id)}
                className={`flex-1 py-4 text-[14px] font-medium transition-colors border-r border-gray-200 last:border-r-0 flex items-center justify-center gap-2 ${
                  activeStatTab === tab.id
                    ? 'bg-white border-b-[3px] border-b-[#004b87] text-[#004b87] font-bold z-10 -mb-[1px]'
                    : 'bg-[#f8fafc] text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {tab.label}
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            ))}
          </div>

          {/* Konten Tab Statistik */}
          <div className="p-6">
            {activeStatTab === 'Peminat' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-[32px] font-bold text-[#004b87]">0</h3>
                
                {/* Sub-tab (Belum Dihubungi & Sudah Dihubungi) */}
                <div className="flex gap-6 border-b border-gray-200 pb-2">
                  <button className="flex items-center gap-3 text-[14px] font-bold text-[#004b87] border-b-[3px] border-b-[#004b87] pb-2 -mb-[11px]">
                    Belum Dihubungi
                    <span className="bg-[#004b87] text-white text-[12px] font-bold px-2 py-0.5 rounded-md">0</span>
                  </button>
                  <button className="flex items-center gap-3 text-[14px] font-bold text-gray-500 hover:text-gray-700 pb-2">
                    Sudah Dihubungi
                    <span className="bg-gray-400 text-white text-[12px] font-bold px-2 py-0.5 rounded-md">0</span>
                  </button>
                </div>
              </div>
            )}

            {activeStatTab !== 'Peminat' && (
              <div className="flex flex-col gap-6">
                <h3 className="text-[32px] font-bold text-[#004b87]">0</h3>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default OneDayService;