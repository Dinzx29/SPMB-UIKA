import React, { useState, useMemo } from 'react';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { INITIAL_SELEKSI_RPL_DATA } from '../../../data/rplData';
import { PERIODE_OPTIONS } from '../../../data/kesiapanData';

const SeleksiRpl = () => {
  // State Data
  const [seleksiList, setSeleksiList] = useState(INITIAL_SELEKSI_RPL_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [periode, setPeriode] = useState('2026 Genap');
  const [filterTahap, setFilterTahap] = useState('-- Semua Tahap Seleksi --');
  const [filterStatus, setFilterStatus] = useState('-- Semua Status --');
  const [notification, setNotification] = useState(null);

  // State Modal Asesmen
  const [selectedPeserta, setSelectedPeserta] = useState(null);
  const [inputSksDiakui, setInputSksDiakui] = useState(0);
  const [inputStatusKeputusan, setInputStatusKeputusan] = useState('Lulus Seleksi RPL');
  const [inputCatatanAsesor, setInputCatatanAsesor] = useState('');

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const tahapOptions = [
    '-- Semua Tahap Seleksi --',
    'Verifikasi Berkas',
    'Asesmen Portofolio',
    'Sidang Asesmen CPMK',
    'Penetapan Kelulusan'
  ];

  const statusOptions = [
    '-- Semua Status --',
    'Lulus Seleksi RPL',
    'Menunggu Review Asesor',
    'Sedang Diasesmen',
    'Perbaikan Berkas'
  ];

  // Filter Data
  const filteredData = useMemo(() => {
    return seleksiList.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.noPendaftaran.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.prodi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTahap =
        filterTahap === '-- Semua Tahap Seleksi --' || item.tahap === filterTahap;

      const matchStatus =
        filterStatus === '-- Semua Status --' || item.statusSeleksi === filterStatus;

      return matchSearch && matchTahap && matchStatus;
    });
  }, [seleksiList, searchQuery, filterTahap, filterStatus]);

  // Buka Modal Asesmen
  const handleOpenAsesmen = (item) => {
    setSelectedPeserta(item);
    setInputSksDiakui(item.sksDiakui);
    setInputStatusKeputusan(item.statusSeleksi);
    setInputCatatanAsesor('');
  };

  // Simpan Hasil Asesmen
  const handleSaveAsesmen = (e) => {
    e.preventDefault();
    if (!selectedPeserta) return;

    setSeleksiList((prev) =>
      prev.map((item) =>
        item.id === selectedPeserta.id
          ? {
              ...item,
              sksDiakui: Number(inputSksDiakui),
              statusSeleksi: inputStatusKeputusan,
              tglUpdate: 'Hari ini'
            }
          : item
      )
    );

    showNotification(`Penilaian asesmen ${selectedPeserta.nama} berhasil disimpan!`);
    setSelectedPeserta(null);
  };

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">
      
      {/* Toast Notifikasi */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg text-white text-[13.5px] flex items-center gap-2 transition-all duration-300 animate-slideIn ${
          notification.type === 'info' ? 'bg-[#337ab7]' : 'bg-[#00a65a]'
        }`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{notification.msg}</span>
        </div>
      )}

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
              <span className="text-gray-700 font-semibold">Seleksi RPL</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Seleksi RPL</h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Verifikasi berkas portofolio, proses asesmen capaian pembelajaran mata kuliah (CPMK), dan konversi perolehan SKS.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Mengekspor rekap seleksi RPL...')}
              className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003865] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Seleksi</span>
            </button>
          </div>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-[3px] border-t-[#d97706] rounded-md p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            
            <div className="flex items-center gap-3">
              <label className="w-32 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Periode
              </label>
              <div className="relative w-full">
                <SearchableSelect
                  options={PERIODE_OPTIONS}
                  value={periode}
                  onChange={setPeriode}
                  placeholder="Pilih Periode..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Tahap Seleksi
              </label>
              <div className="relative w-full">
                <SearchableSelect
                  options={tahapOptions}
                  value={filterTahap}
                  onChange={setFilterTahap}
                  placeholder="Pilih Tahap..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="w-32 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Status
              </label>
              <div className="relative w-full">
                <SearchableSelect
                  options={statusOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  placeholder="Pilih Status..."
                />
              </div>
            </div>

          </div>
        </div>

        {/* TABEL DATA SELEKSI RPL */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
            <div className="flex items-center gap-2 text-[13px] text-gray-600">
              <span>Total Pendaftar Terseleksi: <strong>{filteredData.length}</strong></span>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari No. Pendaftaran, Nama, atau Prodi..."
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
                  <th className="py-3.5 px-4 w-[160px] border-r border-[#003c6c]">No. Pendaftaran</th>
                  <th className="py-3.5 px-4 border-r border-[#003c6c]">Nama Calon Mahasiswa</th>
                  <th className="py-3.5 px-4 w-[230px] border-r border-[#003c6c]">Program Studi & Jalur</th>
                  <th className="py-3.5 px-4 w-[180px] border-r border-[#003c6c]">Asesor Penilai</th>
                  <th className="py-3.5 px-4 text-center w-[130px] border-r border-[#003c6c]">Konversi SKS</th>
                  <th className="py-3.5 px-4 text-center w-[160px] border-r border-[#003c6c]">Hasil Seleksi</th>
                  <th className="py-3.5 px-4 text-center w-[110px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center text-gray-600 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-gray-800">
                      {item.noPendaftaran}
                      <div className="text-[11px] text-gray-500 font-normal">NIK: {item.nik}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{item.nama}</div>
                      <div className="text-[11.5px] text-blue-700">Tahap: {item.tahap}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{item.prodi}</div>
                      <div className="text-[11px] text-gray-500">{item.jalur}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-[12.5px]">
                      {item.asesor}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="font-bold text-[#004b87] text-[14px]">
                        {item.sksDiakui} / {item.sksDiajukan} SKS
                      </div>
                      <div className="text-[10.5px] text-gray-500">Diakui / Diajukan</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold inline-block ${
                        item.statusSeleksi === 'Lulus Seleksi RPL'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : item.statusSeleksi === 'Perbaikan Berkas'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {item.statusSeleksi}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenAsesmen(item)}
                        className="bg-[#004b87] hover:bg-[#003865] text-white px-2.5 py-1.5 rounded text-[12px] font-medium transition-colors shadow-xs"
                      >
                        Asesmen
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      Tidak ada peserta seleksi RPL yang sesuai filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL ASESMEN & KONVERSI SKS */}
      {selectedPeserta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
            <div className="bg-[#004b87] px-6 py-4 flex items-center justify-between text-white">
              <div>
                <h3 className="text-[16px] font-bold">Penilaian &amp; Rekomendasi RPL</h3>
                <p className="text-[12px] text-white/80">{selectedPeserta.nama} ({selectedPeserta.noPendaftaran})</p>
              </div>
              <button onClick={() => setSelectedPeserta(null)} className="text-white/80 hover:text-white text-xl leading-none">
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveAsesmen} className="p-6 space-y-4 text-[13.5px]">
              <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
                <div><span className="text-gray-500">Program Studi:</span> <strong>{selectedPeserta.prodi}</strong></div>
                <div><span className="text-gray-500">Asesor:</span> <strong>{selectedPeserta.asesor}</strong></div>
                <div><span className="text-gray-500">SKS Diajukan:</span> <strong>{selectedPeserta.sksDiajukan} SKS</strong></div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Total SKS Diakui / Dikonversi</label>
                <input
                  type="number"
                  min="0"
                  max={selectedPeserta.sksDiajukan}
                  value={inputSksDiakui}
                  onChange={(e) => setInputSksDiakui(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] font-bold text-[#004b87] outline-none focus:border-[#004b87]"
                />
                <span className="text-[11.5px] text-gray-500">Maksimum SKS yang dapat diakui: {selectedPeserta.sksDiajukan} SKS</span>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Keputusan Status Seleksi</label>
                <select
                  value={inputStatusKeputusan}
                  onChange={(e) => setInputStatusKeputusan(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                >
                  <option value="Lulus Seleksi RPL">Lulus Seleksi RPL</option>
                  <option value="Menunggu Review Asesor">Menunggu Review Asesor</option>
                  <option value="Sedang Diasesmen">Sedang Diasesmen</option>
                  <option value="Perbaikan Berkas">Perbaikan Berkas</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Catatan Asesor / Berita Acara</label>
                <textarea
                  rows="3"
                  value={inputCatatanAsesor}
                  onChange={(e) => setInputCatatanAsesor(e.target.value)}
                  placeholder="Tambahkan catatan penilaian capaian portofolio mahasiswa..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedPeserta(null)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-[13px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white font-medium rounded text-[13px] transition-colors shadow-sm"
                >
                  Simpan Keputusan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SeleksiRpl;

