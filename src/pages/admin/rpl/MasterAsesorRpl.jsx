import React, { useState, useMemo } from 'react';
import SearchableSelect from '../../../components/ui/SearchableSelect';
import { INITIAL_ASESOR_DATA } from '../../../data/rplData';
import { UNIT_OPTIONS } from '../../../data/kesiapanData';

const MasterAsesorRpl = () => {
  // State Data
  const [asesorList, setAsesorList] = useState(INITIAL_ASESOR_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFakultas, setFilterFakultas] = useState('-- Semua Fakultas / Unit --');
  const [filterStatus, setFilterStatus] = useState('-- Semua Status --');
  const [notification, setNotification] = useState(null);

  // State Modal Tambah
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formNidn, setFormNidn] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formProdi, setFormProdi] = useState('S1 - Teknik Informatika');
  const [formFakultas, setFormFakultas] = useState('Fakultas Teknik dan Sains');
  const [formNoSk, setFormNoSk] = useState('');
  const [formSertifikat, setFormSertifikat] = useState('');
  const [formStatus, setFormStatus] = useState('Aktif');

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const prodiOptions = [
    'S1 - Teknik Informatika',
    'S1 - Pendidikan Agama Islam',
    'S1 - Manajemen',
    'S1 - Akuntansi',
    'S2 - Pendidikan Agama Islam (S2)',
    'S2 - Ekonomi Syariah (S2)'
  ];

  const statusOptions = ['-- Semua Status --', 'Aktif', 'Tidak Aktif'];
  const fakultasFilterOptions = ['-- Semua Fakultas / Unit --', ...UNIT_OPTIONS.filter(u => u !== 'Universitas Ibn Khaldun')];

  // Filter Data
  const filteredData = useMemo(() => {
    return asesorList.filter((item) => {
      const matchSearch =
        item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nidn.includes(searchQuery) ||
        item.prodi.toLowerCase().includes(searchQuery.toLowerCase());

      const matchFakultas =
        filterFakultas === '-- Semua Fakultas / Unit --' || item.fakultas === filterFakultas;

      const matchStatus =
        filterStatus === '-- Semua Status --' || item.status === filterStatus;

      return matchSearch && matchFakultas && matchStatus;
    });
  }, [asesorList, searchQuery, filterFakultas, filterStatus]);

  // Handler Hapus
  const handleDelete = (id, nama) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus asesor ${nama}?`)) {
      setAsesorList((prev) => prev.filter((item) => item.id !== id));
      showNotification(`Asesor ${nama} berhasil dihapus.`, 'info');
    }
  };

  // Handler Toggle Status
  const handleToggleStatus = (id) => {
    setAsesorList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Aktif' ? 'Tidak Aktif' : 'Aktif' }
          : item
      )
    );
    showNotification('Status asesor berhasil diperbarui!');
  };

  // Handler Submit Tambah
  const handleAddAsesor = (e) => {
    e.preventDefault();
    if (!formNidn || !formNama) {
      alert('NIDN dan Nama Lengkap wajib diisi!');
      return;
    }

    const newAsesor = {
      id: Date.now(),
      nidn: formNidn,
      nama: formNama,
      prodi: formProdi,
      fakultas: formFakultas,
      noSk: formNoSk || `SK-ASESOR/UIKA/2026/${Math.floor(100 + Math.random() * 900)}`,
      sertifikat: formSertifikat || 'BNSP-RPL-2026-REG',
      status: formStatus,
      totalAsesmen: 0
    };

    setAsesorList((prev) => [newAsesor, ...prev]);
    setIsModalOpen(false);
    setFormNidn('');
    setFormNama('');
    setFormNoSk('');
    setFormSertifikat('');
    showNotification(`Asesor ${formNama} berhasil ditambahkan!`);
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
              <span className="text-gray-700 font-semibold">Master Asesor RPL</span>
            </div>
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Master Asesor RPL</h2>
            <p className="text-[13px] text-gray-500 mt-1">
              Data dosen penilai, verifikator portofolio, dan tim asesor Rekognisi Pembelajaran Lampau (RPL) UIKA Bogor.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
            >
              <span className="text-[16px] leading-none">+</span>
              <span>Tambah Asesor</span>
            </button>
            <button
              onClick={() => alert('Fitur Ekspor Data Asesor ke Excel sedang diproses...')}
              className="flex items-center gap-2 bg-[#004b87] hover:bg-[#003865] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-[3px] border-t-[#d97706] rounded-md p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            
            <div className="flex items-center gap-4">
              <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Fakultas / Unit
              </label>
              <div className="relative w-full max-w-[360px]">
                <SearchableSelect
                  options={fakultasFilterOptions}
                  value={filterFakultas}
                  onChange={setFilterFakultas}
                  placeholder="Pilih Fakultas..."
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="w-44 text-[13.5px] font-bold text-[#b45309] shrink-0">
                Status Asesor
              </label>
              <div className="relative w-full max-w-[360px]">
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

        {/* TABEL DATA ASESOR */}
        <div className="w-full bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Toolbar Search & Info */}
          <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3 bg-gray-50/50">
            <div className="flex items-center gap-2 text-[13px] text-gray-600">
              <span>Menampilkan: <strong>{filteredData.length}</strong> data asesor</span>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari NIDN, Nama Asesor, atau Prodi..."
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
                  <th className="py-3.5 px-4 w-[130px] border-r border-[#003c6c]">NIDN</th>
                  <th className="py-3.5 px-4 border-r border-[#003c6c]">Nama Asesor</th>
                  <th className="py-3.5 px-4 w-[240px] border-r border-[#003c6c]">Program Studi</th>
                  <th className="py-3.5 px-4 w-[220px] border-r border-[#003c6c]">No. SK Penugasan</th>
                  <th className="py-3.5 px-4 text-center w-[120px] border-r border-[#003c6c]">Asesmen Selesai</th>
                  <th className="py-3.5 px-4 text-center w-[110px] border-r border-[#003c6c]">Status</th>
                  <th className="py-3.5 px-4 text-center w-[110px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-gray-700 divide-y divide-gray-200">
                {filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 text-center text-gray-600 font-mono">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-medium text-gray-800">{item.nidn}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{item.nama}</div>
                      <div className="text-[11.5px] text-gray-500">Sertifikat: {item.sertifikat}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{item.prodi}</div>
                      <div className="text-[11px] text-gray-500">{item.fakultas}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[12px] text-gray-600">{item.noSk}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full text-[12px]">
                        {item.totalAsesmen} Mhs
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        title="Klik untuk ubah status"
                        className={`px-2.5 py-1 rounded text-[11px] font-bold transition-transform active:scale-95 ${
                          item.status === 'Aktif'
                            ? 'bg-[#00a65a] text-white hover:bg-[#008d4c]'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}
                      >
                        {item.status}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => alert(`Detail Asesor:\nNama: ${item.nama}\nNIDN: ${item.nidn}\nProdi: ${item.prodi}\nSK: ${item.noSk}`)}
                          title="Lihat Detail"
                          className="bg-[#00c0ef] hover:bg-[#00a7d0] text-white p-1.5 rounded-sm transition-colors shadow-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.nama)}
                          title="Hapus Asesor"
                          className="bg-[#dd4b39] hover:bg-[#c23321] text-white p-1.5 rounded-sm transition-colors shadow-xs"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-500">
                      Tidak ada data asesor yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* MODAL TAMBAH ASESOR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden animate-fadeIn">
            <div className="bg-[#004b87] px-6 py-4 flex items-center justify-between text-white">
              <h3 className="text-[16px] font-bold">Tambah Data Asesor RPL</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white text-xl leading-none">
                &times;
              </button>
            </div>

            <form onSubmit={handleAddAsesor} className="p-6 space-y-4 text-[13.5px]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">NIDN / NIK *</label>
                  <input
                    type="text"
                    required
                    value={formNidn}
                    onChange={(e) => setFormNidn(e.target.value)}
                    placeholder="Contoh: 0412038501"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Status Keaktifan</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  placeholder="Contoh: Dr. H. Ahmad Fauzi, M.Pd.I."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Program Studi</label>
                <SearchableSelect
                  options={prodiOptions}
                  value={formProdi}
                  onChange={setFormProdi}
                  placeholder="Pilih Program Studi..."
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Fakultas / Unit</label>
                <SearchableSelect
                  options={fakultasFilterOptions.filter(o => !o.includes('--'))}
                  value={formFakultas}
                  onChange={setFormFakultas}
                  placeholder="Pilih Fakultas..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nomor SK Penugasan</label>
                  <input
                    type="text"
                    value={formNoSk}
                    onChange={(e) => setFormNoSk(e.target.value)}
                    placeholder="Contoh: SK-ASESOR/UIKA/2026/099"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">No. Sertifikat Asesor</label>
                  <input
                    type="text"
                    value={formSertifikat}
                    onChange={(e) => setFormSertifikat(e.target.value)}
                    placeholder="Contoh: BNSP-RPL-2026-0021"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:border-[#004b87]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-[13px]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white font-medium rounded text-[13px] transition-colors shadow-sm"
                >
                  Simpan Asesor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MasterAsesorRpl;

