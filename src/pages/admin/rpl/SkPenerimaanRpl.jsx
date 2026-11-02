import React, { useState } from 'react';
import { SK_PENERIMAAN_RPL_DATA } from '../../../data/rplData';

const SkPenerimaanRpl = () => {
  const [skList] = useState(SK_PENERIMAAN_RPL_DATA);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = skList.filter(
    (item) =>
      item.noSk.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.perihal.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span className="text-gray-700 font-semibold">SK Penerimaan Mahasiswa RPL</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
              SK Penerimaan Mahasiswa RPL
            </h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Surat Keputusan (SK) Rektor Universitas Ibn Khaldun mengenai penetapan kelulusan pendaftar jalur RPL.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Fitur unggah / generate draft SK Rektor')}
              className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
            >
              <span className="text-[16px] leading-none">+</span>
              <span>Buat SK Baru</span>
            </button>
          </div>
        </div>

        {/* TABEL DATA SK */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
            <span className="text-[13px] text-gray-600 font-medium">
              Total Surat Keputusan: <strong>{filteredData.length}</strong> Dokumen
            </span>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari Nomor SK atau Perihal..."
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
                  <th className="py-3.5 px-4 w-[230px] border-r border-[#003c6c]">Nomor SK Rektor</th>
                  <th className="py-3.5 px-4 border-r border-[#003c6c]">Perihal & Keterangan</th>
                  <th className="py-3.5 px-4 w-[160px] border-r border-[#003c6c]">Tanggal Penetapan</th>
                  <th className="py-3.5 px-4 text-center w-[130px] border-r border-[#003c6c]">Total Diterima</th>
                  <th className="py-3.5 px-4 text-center w-[140px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center font-mono text-gray-600">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                      {item.noSk}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-800">{item.perihal}</div>
                      <div className="text-[11.5px] text-gray-500 mt-0.5">Penandatangan: {item.penandatangan}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">{item.tglSk}</td>
                    <td className="py-3.5 px-4 text-center font-bold text-[#004b87] text-[14px]">
                      {item.totalMahasiswa} Mahasiswa
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => alert(`Mengunduh file ${item.filePdf}...`)}
                          className="bg-[#004b87] hover:bg-[#003865] text-white px-3 py-1.5 rounded text-[12px] font-medium flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Unduh SK</span>
                        </button>
                      </div>
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

export default SkPenerimaanRpl;

