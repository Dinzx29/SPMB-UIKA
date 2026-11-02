import React, { useState, useMemo } from 'react';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { REKAP_PENDAFTAR_RPL_DATA } from '../../../data/rplData';
import { PERIODE_OPTIONS } from '../../../data/kesiapanData';

const RekapPendaftarRpl = () => {
  const [periode, setPeriode] = useState('2026 Genap');
  const [jenjangFilter, setJenjangFilter] = useState('-- Semua Jenjang --');
  const [searchQuery, setSearchQuery] = useState('');

  const jenjangOptions = ['-- Semua Jenjang --', 'S1', 'S2', 'S3'];

  const filteredData = useMemo(() => {
    return REKAP_PENDAFTAR_RPL_DATA.filter((item) => {
      const matchSearch =
        item.prodi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fakultas.toLowerCase().includes(searchQuery.toLowerCase());
      const matchJenjang =
        jenjangFilter === '-- Semua Jenjang --' || item.jenjang === jenjangFilter;
      return matchSearch && matchJenjang;
    });
  }, [jenjangFilter, searchQuery]);

  // Total summary
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, cur) => ({
        dayaTampung: acc.dayaTampung + cur.dayaTampung,
        pendaftar: acc.pendaftar + cur.pendaftar,
        berkasLengkap: acc.berkasLengkap + cur.berkasLengkap,
        lulusAsesmen: acc.lulusAsesmen + cur.lulusAsesmen,
        daftarUlang: acc.daftarUlang + cur.daftarUlang
      }),
      { dayaTampung: 0, pendaftar: 0, berkasLengkap: 0, lulusAsesmen: 0, daftarUlang: 0 }
    );
  }, [filteredData]);

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
              <span className="text-gray-700 font-semibold">Rekapitulasi Pendaftar RPL</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
              Rekapitulasi Pendaftar RPL
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Rekapitulasi data pendaftar jalur Rekognisi Pembelajaran Lampau (RPL) per program studi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Mengekspor Rekapitulasi Pendaftar RPL ke Excel...')}
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
              <span>Cetak Laporan</span>
            </button>
          </div>
        </div>

        {/* SUMMARY STAT CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-md border-l-4 border-l-[#004b87] shadow-sm">
            <span className="text-[12px] text-gray-500 font-semibold uppercase">Total Pendaftar RPL</span>
            <div className="text-[24px] font-bold text-gray-900 mt-1">{totals.pendaftar}</div>
            <span className="text-[11px] text-gray-400">Calon Mahasiswa</span>
          </div>

          <div className="bg-white p-4 rounded-md border-l-4 border-l-[#f39c12] shadow-sm">
            <span className="text-[12px] text-gray-500 font-semibold uppercase">Berkas Lengkap</span>
            <div className="text-[24px] font-bold text-gray-900 mt-1">{totals.berkasLengkap}</div>
            <span className="text-[11px] text-gray-400">Siap Asesmen CPMK</span>
          </div>

          <div className="bg-white p-4 rounded-md border-l-4 border-l-[#00a65a] shadow-sm">
            <span className="text-[12px] text-gray-500 font-semibold uppercase">Lulus Asesmen RPL</span>
            <div className="text-[24px] font-bold text-gray-900 mt-1">{totals.lulusAsesmen}</div>
            <span className="text-[11px] text-gray-400">Mendapat Konversi SKS</span>
          </div>

          <div className="bg-white p-4 rounded-md border-l-4 border-l-[#047857] shadow-sm">
            <span className="text-[12px] text-gray-500 font-semibold uppercase">Daftar Ulang</span>
            <div className="text-[24px] font-bold text-gray-900 mt-1">{totals.daftarUlang}</div>
            <span className="text-[11px] text-gray-400">Telah Registrasi Ulang</span>
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
                Jenjang Pendidikan
              </label>
              <div className="relative w-full max-w-[360px]">
                <SearchableSelect
                  options={jenjangOptions}
                  value={jenjangFilter}
                  onChange={setJenjangFilter}
                  placeholder="Pilih Jenjang..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABEL REKAPITULASI */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
            <span className="text-[13px] text-gray-600 font-medium">
              Data Rekapitulasi: <strong>{filteredData.length}</strong> Program Studi
            </span>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari program studi atau fakultas..."
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
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-[#004b87] text-white text-[13px] font-bold">
                  <th className="py-3.5 px-4 text-center w-[50px] border-r border-[#003c6c]">No</th>
                  <th className="py-3.5 px-4 border-r border-[#003c6c]">Program Studi & Fakultas</th>
                  <th className="py-3.5 px-4 text-center w-[90px] border-r border-[#003c6c]">Jenjang</th>
                  <th className="py-3.5 px-4 text-center w-[120px] border-r border-[#003c6c]">Daya Tampung</th>
                  <th className="py-3.5 px-4 text-center w-[110px] border-r border-[#003c6c]">Pendaftar</th>
                  <th className="py-3.5 px-4 text-center w-[130px] border-r border-[#003c6c]">Berkas Lengkap</th>
                  <th className="py-3.5 px-4 text-center w-[130px] border-r border-[#003c6c]">Lolos Asesmen</th>
                  <th className="py-3.5 px-4 text-center w-[120px]">Daftar Ulang</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-gray-600">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{item.prodi}</div>
                      <div className="text-[11.5px] text-gray-500">{item.fakultas}</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-gray-700">{item.jenjang}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.dayaTampung}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#004b87]">{item.pendaftar}</td>
                    <td className="py-3 px-4 text-center font-mono text-amber-700 font-semibold">{item.berkasLengkap}</td>
                    <td className="py-3 px-4 text-center font-mono text-green-700 font-bold">{item.lulusAsesmen}</td>
                    <td className="py-3 px-4 text-center font-mono text-emerald-800 font-bold">{item.daftarUlang}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
                  <td colSpan={3} className="py-3 px-4 text-right">TOTAL KESELURUHAN:</td>
                  <td className="py-3 px-4 text-center font-mono">{totals.dayaTampung}</td>
                  <td className="py-3 px-4 text-center font-mono text-[#004b87]">{totals.pendaftar}</td>
                  <td className="py-3 px-4 text-center font-mono text-amber-700">{totals.berkasLengkap}</td>
                  <td className="py-3 px-4 text-center font-mono text-green-700">{totals.lulusAsesmen}</td>
                  <td className="py-3 px-4 text-center font-mono text-emerald-800">{totals.daftarUlang}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RekapPendaftarRpl;

