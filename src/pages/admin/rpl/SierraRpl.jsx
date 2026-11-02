import React, { useState } from 'react';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { SIERRA_RPL_DATA } from '../../../data/rplData';
import { PERIODE_OPTIONS } from '../../../data/kesiapanData';

const SierraRpl = () => {
  const [periode, setPeriode] = useState('2026 Genap');
  const [dataList, setDataList] = useState(SIERRA_RPL_DATA);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setDataList((prev) =>
        prev.map((item) => ({
          ...item,
          statusSync: 'Tersinkronisasi',
          tglSync: 'Baru saja'
        }))
      );
      showNotification('Sinkronisasi data ke portal SIERRA Kemdiktisaintek berhasil!');
    }, 1200);
  };

  const handleSyncSingle = (id, prodi) => {
    setDataList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, statusSync: 'Tersinkronisasi', tglSync: 'Baru saja' }
          : item
      )
    );
    showNotification(`Data ${prodi} berhasil disinkronkan ke SIERRA.`);
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
              <span className="text-gray-400">Laporan</span>
              <span className="text-gray-400">›</span>
              <span className="text-gray-700 font-semibold">Formulir Penyelenggaraan RPL ke SIERRA</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
              Formulir Penyelenggaraan RPL ke SIERRA
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Integrasi dan pelaporan data penyelenggaraan RPL Universitas Ibn Khaldun ke platform SIERRA Kemdiktisaintek.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className={`flex items-center gap-2 bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm ${
                isSyncing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <svg className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Semua ke SIERRA'}</span>
            </button>
          </div>
        </div>

        {/* STATUS BANNER SIERRA */}
        <div className="bg-gradient-to-r from-[#004b87] to-[#0066b3] text-white p-5 rounded-md shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[16px]">Koneksi SIERRA Kemdiktisaintek: TERHUBUNG</div>
              <div className="text-[12.5px] text-white/80">Kode PT: 041014 | Universitas Ibn Khaldun Bogor | Protokol Web Service v2.4</div>
            </div>
          </div>
          <span className="bg-green-400 text-gray-900 font-bold px-3 py-1 rounded text-[12px] uppercase tracking-wide">
            API Aktif
          </span>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-[3px] border-t-[#d97706] rounded-md p-6 shadow-sm">
          <div className="flex items-center gap-4 max-w-md">
            <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
              Periode Pelaporan
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
        </div>

        {/* TABEL PELAPORAN SIERRA */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#004b87] text-white text-[13px] font-bold">
                  <th className="py-3.5 px-4 text-center w-[50px] border-r border-[#003c6c]">No</th>
                  <th className="py-3.5 px-4 w-[110px] border-r border-[#003c6c]">Kode Prodi</th>
                  <th className="py-3.5 px-4 border-r border-[#003c6c]">Nama Program Studi</th>
                  <th className="py-3.5 px-4 w-[180px] border-r border-[#003c6c]">Jenis RPL</th>
                  <th className="py-3.5 px-4 text-center w-[130px] border-r border-[#003c6c]">Kuota SIERRA</th>
                  <th className="py-3.5 px-4 text-center w-[130px] border-r border-[#003c6c]">Dilaporkan</th>
                  <th className="py-3.5 px-4 text-center w-[150px] border-r border-[#003c6c]">Status Sync</th>
                  <th className="py-3.5 px-4 text-center w-[120px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                {dataList.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-gray-600">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-gray-800">{item.kodeProdi}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{item.namaProdi}</div>
                      <div className="text-[11px] text-gray-500 font-mono">Reg SIERRA: {item.noRegistrasiSierra}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{item.jenisRpl}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.kuotaSierra}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#004b87]">{item.terlaporSierra}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold inline-block ${
                        item.statusSync === 'Tersinkronisasi'
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {item.statusSync}
                      </span>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.tglSync}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleSyncSingle(item.id, item.namaProdi)}
                        className="bg-[#004b87] hover:bg-[#003865] text-white px-2.5 py-1.5 rounded text-[11.5px] font-medium transition-colors shadow-xs"
                      >
                        Sync Ulang
                      </button>
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

export default SierraRpl;

