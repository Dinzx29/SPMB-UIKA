import React, { useState, useMemo } from 'react';
import FilterSection from '../../../components/kesiapan-rpl/FilterSection';
import TableKesiapan from '../../../components/kesiapan-rpl/TableKesiapan';
import ModalTambah from '../../../components/kesiapan-rpl/ModalTambah';
import ModalDetail from '../../../components/kesiapan-rpl/ModalDetail';
import { INITIAL_KESIAPAN_DATA } from '../../../data/kesiapanData';

const KesiapanRpl = () => {
  // State Filter
  const [periode, setPeriode] = useState('2026 Genap');
  const [tahunKurikulum, setTahunKurikulum] = useState('-- Semua Tahun Kurikulum --');
  const [jenjang, setJenjang] = useState('-- Semua Jenjang --');
  const [statusCpmk, setStatusCpmk] = useState('-- Semua Status CPMK --');
  const [unit, setUnit] = useState('Universitas Ibn Khaldun');

  // State Data Tabel
  const [data, setData] = useState(INITIAL_KESIAPAN_DATA);
  const [selectedIds, setSelectedIds] = useState([]);

  // State Modal & Notifikasi
  const [isModalTambahOpen, setIsModalTambahOpen] = useState(false);
  const [detailProdi, setDetailProdi] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter Data berdasarkan pilihan filter pengguna
  const filteredData = useMemo(() => {
    return data
      .map(fakultas => {
        // Cek filter Unit (Fakultas)
        if (unit !== 'Universitas Ibn Khaldun' && fakultas.fakultasNama !== unit) {
          return null;
        }

        // Filter Program Studi dalam fakultas ini
        const matchingProdi = fakultas.prodiList.filter(prodi => {
          if (jenjang !== '-- Semua Jenjang --' && prodi.jenjang !== jenjang) {
            return false;
          }
          if (statusCpmk !== '-- Semua Status CPMK --' && prodi.statusCpmk !== statusCpmk) {
            return false;
          }
          if (tahunKurikulum !== '-- Semua Tahun Kurikulum --' && prodi.tahunKurikulum !== tahunKurikulum) {
            return false;
          }
          return true;
        });

        if (matchingProdi.length === 0) return null;

        return {
          ...fakultas,
          prodiList: matchingProdi
        };
      })
      .filter(Boolean);
  }, [data, unit, jenjang, statusCpmk, tahunKurikulum]);

  // Handler Checkbox
  const handleToggleSelect = (prodiId) => {
    setSelectedIds(prev =>
      prev.includes(prodiId)
        ? prev.filter(id => id !== prodiId)
        : [...prev, prodiId]
    );
  };

  const handleToggleSelectFaculty = (fakultasId) => {
    const targetFaculty = filteredData.find(f => f.fakultasId === fakultasId);
    if (!targetFaculty) return;

    const prodiIds = targetFaculty.prodiList.map(p => p.id);
    const isAllFacultySelected = prodiIds.every(id => selectedIds.includes(id));

    if (isAllFacultySelected) {
      setSelectedIds(prev => prev.filter(id => !prodiIds.includes(id)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...prodiIds])));
    }
  };

  const handleToggleSelectAll = () => {
    const allProdiIds = filteredData.flatMap(f => f.prodiList.map(p => p.id));
    const isAllSelected = allProdiIds.length > 0 && allProdiIds.every(id => selectedIds.includes(id));

    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allProdiIds);
    }
  };

  // Handler Hapus Single / Bulk
  const handleDeleteSingle = (prodiId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data kesiapan prodi ini?')) {
      setData(prev =>
        prev.map(f => ({
          ...f,
          prodiList: f.prodiList.filter(p => p.id !== prodiId)
        }))
      );
      setSelectedIds(prev => prev.filter(id => id !== prodiId));
      showNotification('Data program studi berhasil dihapus.', 'info');
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      alert('Pilih data terlebih dahulu melalui kotak centang.');
      return;
    }

    if (window.confirm(`Hapus ${selectedIds.length} data kesiapan prodi yang dipilih?`)) {
      setData(prev =>
        prev.map(f => ({
          ...f,
          prodiList: f.prodiList.filter(p => !selectedIds.includes(p.id))
        }))
      );
      setSelectedIds([]);
      showNotification(`${selectedIds.length} data berhasil dihapus.`, 'info');
    }
  };

  // Handler Tambah / Update Prodi
  const handleSaveTambah = (newConfig) => {
    setData(prev =>
      prev.map(f => ({
        ...f,
        prodiList: f.prodiList.map(p => {
          if (p.id === newConfig.prodiId) {
            return {
              ...p,
              ...newConfig
            };
          }
          return p;
        })
      }))
    );
    showNotification('Konfigurasi kesiapan RPL prodi berhasil disimpan!');
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
        <div className="flex flex-col gap-2">
          {/* Breadcrumb Sesuai Foto */}
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-gray-400">›</span>
            <span>Rekognisi Pembelajaran Lampau</span>
            <span className="text-gray-400">›</span>
            <span className="text-gray-700 font-semibold">Kesiapan RPL dan Generate Mahasiswa</span>
          </div>

          {/* Judul Halaman Sesuai Foto */}
          <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">
            Kesiapan RPL dan Generate Mahasiswa
          </h2>
        </div>

        {/* KOTAK FILTER MODULAR */}
        <FilterSection
          periode={periode}
          setPeriode={setPeriode}
          tahunKurikulum={tahunKurikulum}
          setTahunKurikulum={setTahunKurikulum}
          jenjang={jenjang}
          setJenjang={setJenjang}
          statusCpmk={statusCpmk}
          setStatusCpmk={setStatusCpmk}
          unit={unit}
          setUnit={setUnit}
        />

        {/* TOMBOL AKSI ATAS TABEL: + Tambah & Hapus */}
        <div className="flex justify-end items-center gap-2 pt-2">
          <button
            onClick={() => setIsModalTambahOpen(true)}
            className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm"
          >
            <span className="text-[16px] leading-none">+</span>
            <span>Tambah</span>
          </button>

          <button
            onClick={handleDeleteSelected}
            className={`flex items-center gap-1.5 bg-[#dd4b39] hover:bg-[#c23321] text-white px-4 py-2 rounded-sm text-[13px] font-bold transition-colors shadow-sm ${
              selectedIds.length === 0 ? 'opacity-85' : 'opacity-100'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Hapus {selectedIds.length > 0 ? `(${selectedIds.length})` : ''}</span>
          </button>
        </div>

        {/* TABEL DATA KESIAPAN MODULAR */}
        <TableKesiapan
          data={filteredData}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectFaculty={handleToggleSelectFaculty}
          onToggleSelectAll={handleToggleSelectAll}
          onViewDetail={(p) => setDetailProdi(p)}
          onDeleteProdi={handleDeleteSingle}
        />

      </div>

      {/* MODAL TAMBAH KONFIGURASI */}
      <ModalTambah
        isOpen={isModalTambahOpen}
        onClose={() => setIsModalTambahOpen(false)}
        onSave={handleSaveTambah}
        faculties={data}
      />

      {/* MODAL DETAIL CPMK & KONVERSI */}
      <ModalDetail
        isOpen={Boolean(detailProdi)}
        onClose={() => setDetailProdi(null)}
        prodi={detailProdi}
      />

    </div>
  );
};

export default KesiapanRpl;

