import React, { useState, useMemo } from 'react';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { HASIL_PENILAIAN_RPL_DATA } from '../../../data/rplData';
import { PERIODE_OPTIONS } from '../../../data/kesiapanData';

const HasilPenilaianRpl = () => {
  const [periode, setPeriode] = useState('2026 Genap');
  const [filterRekomendasi, setFilterRekomendasi] = useState('-- Semua Hasil --');
  const [searchQuery, setSearchQuery] = useState('');

  const rekomendasiOptions = ['-- Semua Hasil --', 'Diterima RPL', 'Perbaikan Berkas'];

  const filteredData = useMemo(() => {
    return HASIL_PENILAIAN_RPL_DATA.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.noPeserta.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prodi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRekomendasi =
        filterRekomendasi === '-- Semua Hasil --' || item.rekomendasi === filterRekomendasi;

      return matchSearch && matchRekomendasi;
    });
  }, [filterRekomendasi, searchQuery]);

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">
      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2 font-medium">
              <svg className="w-4 h-4 cursor-pointer text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-gray-400">›</span>
              <span>Rekognisi Pembelajaran Lampau</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-400">Laporan</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-700 font-semibold">Hasil Penilaian Seleksi RPL</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
              Hasil Penilaian Seleksi RPL
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Rekapitulasi nilai portofolio, wawancara CPMK, konversi SKS, dan keputusan rekomendasi tim asesor.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Mengekspor rekap hasil penilaian ke Excel...')}
              className="flex items-center gap-2 bg-[#047857] hover:bg-[#035e44] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003865] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Cetak Hasil</span>
            </button>
          </div>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-[3px] border-t-[#d97706] rounded-md p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="flex items-center gap-4">
              <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Periode Akademik
              </label>
              <div className="relative w-full max-w-[360px]">
                <SearchableSelect
                  options={PERIODE_OPTIONS}
                  value={periode}
                  onChange={setPeriode}
                  placeholder="Pilih Periode..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Keputusan Kelulusan
              </label>
              <div className="relative w-full max-w-[360px]">
                <SearchableSelect
                  options={rekomendasiOptions}
                  value={filterRekomendasi}
                  onChange={setFilterRekomendasi}
                  placeholder="Pilih Keputusan..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABEL DATA HASIL PENILAIAN */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
            <span className="text-[13px] text-gray-600 font-medium">
              Data Penilaian Asesor: <strong>{filteredData.length}</strong> Calon Mahasiswa
            </span>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari nama, no peserta, atau prodi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-l px-3 py-1.5 text-[13px] w-72 outline-none focus:border-[#004b87]"
              />
              <button className="bg-[#004b87] text-white px-3 py-1.5 rounded-r hover:bg-[#003865] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              <thead>
                <tr className="bg-[#004b87] text-white text-[13px] font-bold">
                  <th className="py-3.5 px-4 text-center w-[50px] border-r border-[#003c6c]">No</th>
                  <th className="py-3.5 px-4 w-[150px] border-r border-[#003c6c]">No. Peserta</th>
                  <th className="py-3.5 px-4 border-r border-[#003c6c]">Nama Mahasiswa & Prodi</th>
                  <th className="py-3.5 px-4 w-[160px] border-r border-[#003c6c]">Asesor</th>
                  <th className="py-3.5 px-4 text-center w-[90px] border-r border-[#003c6c]">Portofolio</th>
                  <th className="py-3.5 px-4 text-center w-[90px] border-r border-[#003c6c]">Wawancara</th>
                  <th className="py-3.5 px-4 text-center w-[100px] border-r border-[#003c6c]">Nilai Akhir</th>
                  <th className="py-3.5 px-4 text-center w-[110px] border-r border-[#003c6c]">Konversi SKS</th>
                  <th className="py-3.5 px-4 text-center w-[140px]">Keputusan</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-gray-600">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-gray-800">{item.noPeserta}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{item.nama}</div>
                      <div className="text-[11.5px] text-gray-500">{item.prodi}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5 italic">{item.catatan}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-[12px]">{item.asesor}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.nilaiPortofolio}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.nilaiWawancara}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#004b87] text-[14px]">
                      {item.nilaiAkhir}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-[#047857]">
                      {item.sksDiakui} SKS
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold inline-block ${
                        item.rekomendasi === 'Diterima RPL'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {item.rekomendasi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HasilPenilaianRpl;

