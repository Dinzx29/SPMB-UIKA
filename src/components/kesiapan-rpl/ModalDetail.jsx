import React, { useState } from 'react';

const ModalDetail = ({ isOpen, onClose, prodi }) => {
  if (!isOpen || !prodi) return null;

  const [activeTab, setActiveTab] = useState('mk');

  // Dummy list mata kuliah konversi untuk prodi ini
  const dummyMataKuliah = [
    { kode: 'MK-101', nama: 'Pengantar ' + prodi.nama.replace(/^S[1-3] - /, ''), sks: 3, sifat: 'Wajib', cpmk: 'CPMK-1, CPMK-2' },
    { kode: 'MK-102', nama: 'Metodologi Penelitian & Penulisan Ilmiah', sks: 3, sifat: 'Wajib', cpmk: 'CPMK-3' },
    { kode: 'MK-103', nama: 'Praktik Profesi & Portofolio Lapangan', sks: 4, sifat: 'Pilihan', cpmk: 'CPMK-4' },
    { kode: 'MK-104', nama: 'Studi Kasus & Analisis Terapan', sks: 2, sifat: 'Wajib', cpmk: 'CPMK-5' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden animate-fadeIn">
        {/* Header Modal */}
        <div className="bg-[#004b87] px-6 py-4 flex items-center justify-between text-white">
          <div>
            <h3 className="text-[16px] font-bold">Detail Kesiapan RPL &amp; CPMK</h3>
            <p className="text-[12px] text-white/80">{prodi.nama}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Info Ringkas */}
        <div className="p-6 pb-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-md border border-gray-200 text-[12.5px]">
            <div>
              <span className="text-gray-500 block">Kurikulum</span>
              <strong className="text-gray-800">{prodi.kurikulum || '2024'}</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Total SKS</span>
              <strong className="text-[#f39c12]">{prodi.sksTotal} SKS</strong>
            </div>
            <div>
              <span className="text-gray-500 block">SKS Wajib / Pilihan</span>
              <strong className="text-gray-800">{prodi.sksWajib} / {prodi.sksPilihan} SKS</strong>
            </div>
            <div>
              <span className="text-gray-500 block">Status CPMK</span>
              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                prodi.statusCpmk === 'Sudah Terisi' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {prodi.statusCpmk}
              </span>
            </div>
          </div>

          {/* Tab Navigasi */}
          <div className="flex border-b border-gray-200 mt-4 text-[13px]">
            <button
              onClick={() => setActiveTab('mk')}
              className={`py-2 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'mk'
                  ? 'border-[#004b87] text-[#004b87]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mata Kuliah Konversi RPL
            </button>
            <button
              onClick={() => setActiveTab('cpmk')}
              className={`py-2 px-4 font-semibold border-b-2 transition-colors ${
                activeTab === 'cpmk'
                  ? 'border-[#004b87] text-[#004b87]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pemetaan CPMK
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 pt-2 max-h-[300px] overflow-y-auto">
          {activeTab === 'mk' ? (
            <table className="w-full text-left text-[12.5px] border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                  <th className="py-2 px-3">Kode</th>
                  <th className="py-2 px-3">Nama Mata Kuliah</th>
                  <th className="py-2 px-3 text-center">SKS</th>
                  <th className="py-2 px-3 text-center">Sifat</th>
                  <th className="py-2 px-3">CPMK Terkait</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dummyMataKuliah.map((mk, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-2 px-3 font-mono text-gray-600">{mk.kode}</td>
                    <td className="py-2 px-3 font-medium text-gray-800">{mk.nama}</td>
                    <td className="py-2 px-3 text-center">{mk.sks}</td>
                    <td className="py-2 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        mk.sifat === 'Wajib' ? 'bg-blue-100 text-blue-700' : 'bg-cyan-100 text-cyan-700'
                      }`}>
                        {mk.sifat}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-600">{mk.cpmk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="space-y-3 text-[13px]">
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#004b87] block mb-1">CPMK-1: Pemahaman Konseptual Terapan</span>
                <p className="text-gray-600 text-[12.5px]">Mampu mengidentifikasi, menganalisis, dan menerapkan prinsip teori kejuruan dalam penyelesaian masalah nyata di bidang keahlian.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#004b87] block mb-1">CPMK-2: Keterampilan Portofolio Praktis</span>
                <p className="text-gray-600 text-[12.5px]">Mampu mendemonstrasikan pengalaman kerja minimal 2 tahun atau karya inovatif yang relevan dengan standar industri.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded border border-gray-200">
                <span className="font-bold text-[#004b87] block mb-1">CPMK-3: Etika &amp; Komunikasi Profesional</span>
                <p className="text-gray-600 text-[12.5px]">Mampu mengomunikasikan hasil asesmen dan rekomendasi portofolio secara lisan maupun tertulis dengan integritas akademik.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#004b87] hover:bg-[#003865] text-white font-medium rounded text-[13px] transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetail;

