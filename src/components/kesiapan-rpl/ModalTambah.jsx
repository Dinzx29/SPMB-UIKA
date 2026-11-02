import React, { useState } from 'react';
import SearchableSelect from '../ui/SearchableSelect';
import { TAHUN_KURIKULUM_OPTIONS } from '../../data/kesiapanData';

const ModalTambah = ({ isOpen, onClose, onSave, faculties }) => {
  if (!isOpen) return null;

  // Flatten prodi list for selection
  const prodiOptions = faculties.flatMap(f =>
    f.prodiList.map(p => `${f.fakultasNama} - ${p.nama}`)
  );

  const [selectedProdiFull, setSelectedProdiFull] = useState(prodiOptions[0] || '');
  const [tahunKurikulum, setTahunKurikulum] = useState('2024');
  const [sksWajib, setSksWajib] = useState(120);
  const [sksPilihan, setSksPilihan] = useState(24);
  const [mataKuliahKonversi, setMataKuliahKonversi] = useState('4 Mata Kuliah (12 SKS)');
  const [statusCpmk, setStatusCpmk] = useState('Sudah Terisi');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProdiFull) return;

    // Find prodi ID
    let targetProdiId = null;
    faculties.forEach(f => {
      f.prodiList.forEach(p => {
        if (`${f.fakultasNama} - ${p.nama}` === selectedProdiFull) {
          targetProdiId = p.id;
        }
      });
    });

    const sksTotal = Number(sksWajib) + Number(sksPilihan);

    onSave({
      prodiId: targetProdiId,
      kurikulum: tahunKurikulum,
      sksTotal,
      sksWajib: Number(sksWajib),
      sksPilihan: Number(sksPilihan),
      mataKuliahKonversi,
      statusCpmk
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
        {/* Header Modal */}
        <div className="bg-[#004b87] px-6 py-4 flex items-center justify-between text-white">
          <h3 className="text-[16px] font-bold">Tambah / Konfigurasi Kesiapan RPL</h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-[13.5px]">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Program Studi &amp; Unit
            </label>
            <SearchableSelect
              options={prodiOptions}
              value={selectedProdiFull}
              onChange={setSelectedProdiFull}
              placeholder="Pilih Program Studi..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Tahun Kurikulum
              </label>
              <SearchableSelect
                options={TAHUN_KURIKULUM_OPTIONS.filter(o => !o.includes('--'))}
                value={tahunKurikulum}
                onChange={setTahunKurikulum}
                placeholder="Pilih Tahun Kurikulum..."
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Status CPMK
              </label>
              <select
                value={statusCpmk}
                onChange={(e) => setStatusCpmk(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
              >
                <option value="Belum Terisi">Belum Terisi</option>
                <option value="Sudah Terisi">Sudah Terisi</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Mata Kuliah Konversi RPL
            </label>
            <input
              type="text"
              value={mataKuliahKonversi}
              onChange={(e) => setMataKuliahKonversi(e.target.value)}
              placeholder="Contoh: 4 Mata Kuliah (12 SKS)"
              className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                SKS Wajib
              </label>
              <input
                type="number"
                value={sksWajib}
                onChange={(e) => setSksWajib(e.target.value)}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                SKS Pilihan
              </label>
              <input
                type="number"
                value={sksPilihan}
                onChange={(e) => setSksPilihan(e.target.value)}
                min="0"
                className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
              />
            </div>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-[13px]"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white font-medium rounded text-[13px] transition-colors shadow-sm"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalTambah;

