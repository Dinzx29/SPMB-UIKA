import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchableSelect from '../../components/ui/SearchableSelect';

const Pendaftar = () => {
  const navigate = useNavigate();

  // STATE UNTUK SEMUA FILTER 
  const [periode, setPeriode] = useState('-- Semua Periode --');
  const [gelombang, setGelombang] = useState('-- Semua Gelombang --');
  const [jalur, setJalur] = useState('-- Semua Jalur Pendaftaran --');
  const [sistemKuliah, setSistemKuliah] = useState('-- Semua Sistem Kuliah --');
  const [prodi, setProdi] = useState('-- Semua Unit / Program Studi --');
  const [pilihan, setPilihan] = useState('-- Semua Pilihan --');
  const [statusPendaftar, setStatusPendaftar] = useState([]);

  // STATE UNTUK PENCARIAN & TOOLBAR FILTER
  const [searchQuery, setSearchQuery] = useState('');
  const [toolbarFilterValue, setToolbarFilterValue] = useState('-- Semua --');

  // STATE UNTUK KONTROL DROPDOWN KUSTOM
  const [isPilihanOpen, setIsPilihanOpen] = useState(false);
  const pilihanRef = useRef(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef(null);
  const [isAksiOpen, setIsAksiOpen] = useState(false);
  const aksiRef = useRef(null);

  // STATE UNTUK MODAL REVIEW & ANIMASI
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isReviewAnimating, setIsReviewAnimating] = useState(false);

  const toolbarFilterOptions = [
    '-- Semua --', 'Foto Pendaftar', 'Nama & Kode Pendaftar', 'Jalur Pendaftaran',
    'Program Studi', 'Kontak', 'NIK / No. KTP', 'NIM', 'NIM Mahasiswa'
  ];

  // Menutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (pilihanRef.current && !pilihanRef.current.contains(event.target)) setIsPilihanOpen(false);
      if (statusRef.current && !statusRef.current.contains(event.target)) setIsStatusOpen(false);
      if (aksiRef.current && !aksiRef.current.contains(event.target)) setIsAksiOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // LOGIKA BUKA/TUTUP MODAL REVIEW DENGAN ANIMASI SMOOTH
  const openReviewModal = () => {
    setIsReviewModalOpen(true);
    setTimeout(() => setIsReviewAnimating(true), 50);
  };

  const closeReviewModal = () => {
    setIsReviewAnimating(false);
    setTimeout(() => setIsReviewModalOpen(false), 500);
  };

  const handleProdiChange = (value) => {
    setProdi(value);
    if (value === '-- Semua Unit / Program Studi --' || value === 'Universitas Ibn Khaldun') {
      setPilihan('-- Semua Pilihan --');
    }
  };

  const isPilihanDisabled = prodi === '-- Semua Unit / Program Studi --' || prodi === 'Universitas Ibn Khaldun';

  const handleStatusSelect = (value) => {
    if (statusPendaftar.includes(value)) {
      setStatusPendaftar(statusPendaftar.filter((v) => v !== value));
    } else {
      setStatusPendaftar([...statusPendaftar, value]);
    }
  };

  const handleRemoveStatusChip = (e, value) => {
    e.stopPropagation();
    setStatusPendaftar(statusPendaftar.filter((v) => v !== value));
  };

  // DATA OPSI FILTER
  const generatePeriodeOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = ['-- Semua Periode --'];
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
  const pilihanOptions = ["-- Semua Pilihan --", "Pilihan 1"];

  const prodiOptions = [
    "-- Semua Unit / Program Studi --", "Universitas Ibn Khaldun", "-- Fakultas Keguruan Dan Ilmu Pendidikan",
    "--- S1 - Pendidikan Vokasional Desain Fashion", "--- S1 - Pendidikan Matematika", "--- S1 - Teknologi Pendidikan", "--- S1 - Pendidikan Masyarakat", "--- Prof - Pendidikan Profesi Guru", "--- S1 - Pendidikan Bahasa Inggris",
    "-- Fakultas Hukum", "--- S2 - Hukum Bisnis (2)", "--- S1 - Ilmu Hukum",
    "-- Fakultas Ekonomi Dan Bisnis", "--- S1 - Manajemen", "--- S1 - Bisnis Digital", "--- S1 - Akuntansi", "--- S1 - Perdangan Internasional",
    "-- Fakultas Agama Islam", "--- S1 - Ekonomi Syariah", "--- S1 - Manajemen Haji Dan Umroh", "--- S1 - Bimbingan Dan Konseling Pendidikan Islam", "--- S1 - Komunikasi Dan Penyiaran Islam", "--- S1 - Hukum Keluarga Islam", "--- S1 - Ilmu Al-Qur'an Dan Tafsir", "--- S1 - Pendidikan Agama Islam", "--- S1 - Pendidikan Guru Madrasah Ibtidaiyah",
    "-- Fakultas Teknik Dan Sains", "--- S1 - Teknik Elektro", "--- S1 - Teknik Mesin", "--- S1 - Teknik Sipil", "--- S1 - Ilmu Lingkungan", "--- S1 - Rekayasa Pertanian Dan Biosistem", "--- S1 - Teknik Informatika", "--- S1 - Sistem Informasi",
    "-- Sekolah Pascasarjana", "--- S3 - Ekonomi Syariah (S3)", "--- S2 - Ekonomi Syariah (S2)", "--- S2 - Manajemen (S2)", "--- S2 - Komunikasi Dan Penyiaran Islam (S2)", "--- S3 - Pendidikan Agama Islam (S3)", "--- S2 - Teknologi Pendidikan(S2)", "--- S2 - Pendidikan Agama Islam (S2)",
    "-- Fakultas Ilmu Kesehatan", "--- S1 - Kesehatan Masyarakat", "--- S1 - Gizi",
  ];

  const statusPendaftarGroups = [
    { label: 'Status Akun', isGroupHeader: true },
    { label: 'Akun Aktif (Pendaftar)', value: 'Akun Aktif (Pendaftar)' },
    { label: 'Akun Belum Aktif (Peminat)', value: 'Akun Belum Aktif (Peminat)' },
    { label: 'Finalisasi Pendaftaran', isGroupHeader: true },
    { label: 'Sudah Finalisasi', value: 'Sudah Finalisasi' },
    { label: 'Belum Finalisasi', value: 'Belum Finalisasi' },
    { label: 'Hasil Kelulusan', isGroupHeader: true },
    { label: 'Lulus', value: 'Lulus' },
    { label: 'Tidak Lulus', value: 'Tidak Lulus' },
    { label: 'Belum Diterima Prodi', value: 'Belum Diterima Prodi' },
    { label: 'Direkomendasikan', value: 'Direkomendasikan' },
    { label: 'Cadangan', value: 'Cadangan' },
    { label: 'Status Daftar Ulang', isGroupHeader: true },
    { label: 'Sudah Daftar Ulang', value: 'Sudah Daftar Ulang' },
    { label: 'Belum Daftar Ulang', value: 'Belum Daftar Ulang' },
    { label: 'Status Mahasiswa', isGroupHeader: true },
    { label: 'Sudah Memiliki NIM', value: 'Sudah Memiliki NIM' },
    { label: 'Belum Memiliki NIM', value: 'Belum Memiliki NIM' },
    { label: 'NIM Tidak Sama Dengan PMB', value: 'NIM Tidak Sama Dengan PMB' },
    { label: 'Belum Memiliki Prodi', value: 'Belum Memiliki Prodi' },
  ];

  // DUMMY DATA UNTUK MODAL REVIEW
  const reviewData = [
    { no: 1, status: 'Akun Aktif (Pendaftar)', jumlah: '', ket: '' },
    { no: 2, status: 'Akun Belum Aktif (Peminat)', jumlah: '', ket: '' },
    { no: 3, status: 'Sudah Finalisasi', jumlah: '', ket: '' },
    { no: 4, status: 'Belum Finalisasi', jumlah: '', ket: '' },
    { no: 5, status: 'Lulus', jumlah: '', ket: '' },
    { no: 6, status: 'Tidak Lulus', jumlah: '', ket: '' },
    { no: 7, status: 'Rekomendasi', jumlah: '', ket: '' },
    { no: 8, status: 'Belum Daftar Ulang', jumlah: '', ket: '' },
    { no: 9, status: 'Belum Diterima Prodi', jumlah: '', ket: '' },
    { no: 10, status: 'Cadangan', jumlah: '', ket: '' },
    { no: 11, status: 'Daftar Ulang', jumlah: '', ket: '' },
    { no: 12, status: 'Sudah Memiliki NIM', jumlah: '', ket: '' },
    { no: 13, status: 'Belum Memiliki NIM', jumlah: '', ket: '' },
    { no: 14, status: 'NIM Tidak Sama dengan PMB', jumlah: '', ket: '' },
    { no: 15, status: 'Tidak Memiliki Prodi', jumlah: '', ket: '' },
  ];

  // DUMMY DATA PENDAFTAR (TABEL UTAMA - WARNA DAN DATA PERSIS SEPERTI DI FOTO)
  const pendaftarData = [
    { 
      id: 1, 
      inisial: 'UB', 
      warna: 'bg-[#4a3838]', 
      isFoto: false, 
      nama: 'UBAIDILLAH', 
      kode: '4112560008', 
      jalur: '2025 Ganjil - Gelombang 1', 
      ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', 
      prodi: ['S2 - Pendidikan Agama Islam (S2)'], 
      status: ['Belum Finalisasi', 'Belum Diterima Prodi'], 
      email: 'ud659454@gmail.com', 
      telepon: '085810582733' 
    },
    { 
      id: 2, 
      inisial: 'RK', 
      warna: 'bg-[#1b5e52]', 
      isFoto: false, 
      nama: 'RICKA KRISNAWATI', 
      kode: '4112560007', 
      jalur: '2025 Ganjil - Gelombang 1', 
      ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', 
      prodi: ['S2 - Ekonomi Syariah (S2)'], 
      status: ['Belum Finalisasi', 'Belum Diterima Prodi'], 
      email: 'rickakrisnawati42@gmail.com', 
      telepon: '081380576099' 
    },
    { 
      id: 3, 
      inisial: 'AS', 
      warna: 'bg-[#28442e]', 
      isFoto: false, 
      nama: 'AHMAD SOGI', 
      kode: '4112560006', 
      jalur: '2025 Ganjil - Gelombang 1', 
      ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', 
      prodi: ['S2 - Pendidikan Agama Islam (S2)'], 
      status: ['Belum Finalisasi', 'Belum Diterima Prodi'], 
      email: 'ahmadsogi58@gmail.com', 
      telepon: '085959516263' 
    },
    { 
      id: 4, 
      inisial: '', 
      warna: '', 
      isFoto: true, 
      nama: 'AENUL YAKIN', 
      kode: '4112560005', 
      jalur: '2025 Ganjil - Gelombang 1', 
      ketJalur: 'PASCASARJANA (S2) - Karyawan', 
      prodi: ['S2 - Manajemen (S2)', 'S2 - Ekonomi Syariah (S2)', 'S2 - Teknologi Pendidikan (S2)'], 
      status: ['Lulus', 'Sudah Daftar Ulang', 'Belum Memiliki NIM'], 
      email: 'intanbariyah@gmail.com', 
      telepon: '081382058641' 
    },
    { 
      id: 5, 
      inisial: 'DD', 
      warna: 'bg-[#b91c1c]', 
      isFoto: false, 
      nama: 'DIORA DICKY FAURILIO', 
      kode: '4112560004', 
      jalur: '2025 Ganjil - Gelombang 1', 
      ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', 
      prodi: ['S2 - Pendidikan Agama Islam (S2)'], 
      status: ['Belum Diterima Prodi'], 
      email: 'dioradiodf@gmail.com', 
      telepon: '081931710836' 
    },
    { 
      id: 6, 
      inisial: 'AI', 
      warna: 'bg-[#1e3a8a]', 
      isFoto: false, 
      nama: 'ASEP IRVAN SOPANDI', 
      kode: '4112560003', 
      jalur: '2025 Ganjil - Gelombang 1', 
      ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', 
      prodi: ['S2 - Teknologi Pendidikan (S2)'], 
      status: ['Belum Finalisasi', 'Belum Diterima Prodi'], 
      email: 'afessirfan@gmail.com', 
      telepon: '085794077317' 
    },
  ];

  // Helper Penentu Warna Badge Status sesuai Foto
  const getStatusBadgeStyle = (st) => {
    if (st === 'Belum Finalisasi' || st.includes('Tidak Lulus') || st.includes('Batal')) {
      return 'bg-[#dd4b39] text-white'; // Merah
    }
    if (st.includes('Lulus') || st.includes('Sudah')) {
      return 'bg-[#00a65a] text-white'; // Hijau
    }
    // Belum Diterima Prodi, Belum Memiliki NIM, Cadangan, Rekomendasi
    return 'bg-[#f39c12] text-white'; // Oranye / Kuning Tua
  };

  const filteredData = pendaftarData.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    if (toolbarFilterValue === 'Nama & Kode Pendaftar') {
      return item.nama.toLowerCase().includes(query) || item.kode.toLowerCase().includes(query);
    }
    if (toolbarFilterValue === 'Jalur Pendaftaran') {
      return item.jalur.toLowerCase().includes(query) || item.ketJalur.toLowerCase().includes(query);
    }
    if (toolbarFilterValue === 'Program Studi') {
      return item.prodi.join(' ').toLowerCase().includes(query);
    }
    if (toolbarFilterValue === 'Kontak') {
      return item.email.toLowerCase().includes(query) || (item.telepon && item.telepon.toLowerCase().includes(query));
    }

    return (
      item.nama.toLowerCase().includes(query) ||
      item.kode.toLowerCase().includes(query) ||
      item.prodi.join(' ').toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.jalur.toLowerCase().includes(query) ||
      item.ketJalur.toLowerCase().includes(query) ||
      (item.telepon && item.telepon.toLowerCase().includes(query))
    );
  });

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">

      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">

        {/* HEADER & BREADCRUMB */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
              <svg className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600">Pendaftar</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-[26px] font-bold text-[#1e293b] tracking-tight">Pendaftar</h2>
              <span className="text-[16px] text-gray-400 font-light">Daftar Biodata Pendaftar</span>
            </div>
          </div>
        </div>

        {/* KOTAK FILTER (BORDER TOP ORANYE) */}
        <div className="w-full bg-white border-t-[3px] border-t-[#f59e0b] rounded-sm p-5 shadow-sm relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">

            {/* Kolom Kiri */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 relative z-50">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Periode</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={periodeOptions} value={periode} onChange={setPeriode} placeholder="Pilih Periode..." />
                </div>
              </div>
              <div className="flex items-center gap-3 relative z-40">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Gelombang</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={gelombangOptions} value={gelombang} onChange={setGelombang} placeholder="Pilih Gelombang..." />
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-30">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Unit / Program Studi</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={prodiOptions} value={prodi} onChange={handleProdiChange} placeholder="Pilih Program Studi..." />
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-20" ref={pilihanRef}>
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Pilihan</label>
                <div
                  className={`relative w-full max-w-[360px] transition-all duration-200 
                    ${isPilihanDisabled ? 'cursor-not-allowed opacity-60 bg-gray-50 pointer-events-auto' : ''}`}
                  title={isPilihanDisabled ? "Pilih Fakultas atau Program Studi terlebih dahulu" : ""}
                >
                  <div className={isPilihanDisabled ? 'pointer-events-none' : ''}>
                    <button
                      onClick={() => setIsPilihanOpen(!isPilihanOpen)}
                      className="flex items-center justify-between w-full h-[34px] border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] text-gray-700 outline-none bg-white hover:border-gray-400 focus:border-[#f59e0b]"
                    >
                      <span className="truncate">{pilihan}</span>
                      <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isPilihanOpen && (
                      <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg py-1">
                        {pilihanOptions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setPilihan(opt); setIsPilihanOpen(false); }}
                            className={`flex items-center w-full text-left px-4 py-2 text-[13px] transition-colors ${
                              pilihan === opt ? 'bg-[#3b82f6] text-white' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="w-5 shrink-0">{pilihan === opt && '✓'}</span>{opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 relative z-10">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Jalur Pendaftaran</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={jalurOptions} value={jalur} onChange={setJalur} placeholder="Pilih Jalur..." />
                </div>
              </div>
              <div className="flex items-center gap-3 relative z-0">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Sistem Kuliah</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={sistemKuliahOptions} value={sistemKuliah} onChange={setSistemKuliah} placeholder="Pilih Sistem Kuliah..." />
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-0" ref={statusRef}>
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Status Pendaftar</label>
                <div className="relative w-full max-w-[360px]">
                  <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="flex items-center justify-between w-full h-[34px] border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] text-gray-700 outline-none bg-white hover:border-gray-400 focus:border-[#f59e0b]"
                  >
                    <div className="flex flex-wrap gap-1.5 overflow-hidden">
                      {statusPendaftar.length > 0 ? (
                        statusPendaftar.map((val, idx) => (
                          <span key={idx} className="flex items-center gap-1.5 bg-white border border-gray-300 text-gray-700 px-1.5 py-0.2 rounded text-[12px] shadow-xs">
                            {val}
                            <svg onClick={(e) => handleRemoveStatusChip(e, val)} className="w-3 h-3 cursor-pointer text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-[13px]">-- Semua Status Pendaftar --</span>
                      )}
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {isStatusOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-sm shadow-lg py-1 max-h-[300px] overflow-y-auto">
                      <button
                        onClick={() => { setStatusPendaftar([]); setIsStatusOpen(false); }}
                        className={`flex items-center w-full text-left px-4 py-2 text-[13px] transition-colors ${statusPendaftar.length === 0 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <span className="w-5 shrink-0">{statusPendaftar.length === 0 && '✓'}</span>
                        -- Semua Status Pendaftar --
                      </button>

                      {statusPendaftarGroups.map((item, idx) => {
                        if (item.isGroupHeader) {
                          return (
                            <div key={idx} className="px-4 py-1 mt-1 text-[12px] font-bold text-gray-500 bg-gray-100 border-y border-gray-200">
                              {item.label}
                            </div>
                          );
                        }
                        const isSelected = statusPendaftar.includes(item.value);
                        return (
                          <button
                            key={idx}
                            onClick={() => handleStatusSelect(item.value)}
                            className={`flex items-center w-full text-left px-4 py-2 text-[13px] transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            <span className="w-5 shrink-0">{isSelected && '✓'}</span>
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* TABEL PENDAFTAR (BORDER TOP HIJAU) */}
        <div className="w-full bg-white rounded-sm shadow-sm border-t-[3px] border-t-[#00a65a] p-4 relative z-10">

          {/* TOOLBAR ATAS (PERSIS SEPERTI DI FOTO) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">

            {/* Bagian Kiri: Dropdown Filter Kategori & Search Input Terpadu */}
            <div className="flex flex-wrap items-center gap-2">

              <select
                value={toolbarFilterValue}
                onChange={(e) => setToolbarFilterValue(e.target.value)}
                className="border border-gray-300 rounded-sm h-[34px] px-3 text-[13px] outline-none bg-white min-w-[180px] text-gray-700 cursor-pointer shadow-xs hover:border-gray-400 focus:border-emerald-500"
              >
                {toolbarFilterOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>

              {/* Input Group Pencarian Terpadu dengan Tombol Hijau & Biru Tua */}
              <div className="flex items-center h-[34px] rounded-sm border border-gray-300 bg-white overflow-hidden shadow-xs focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                <input
                  type="text"
                  placeholder="Cari Pendaftar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-full pl-3 pr-2 text-[13px] outline-none w-[220px] sm:w-[260px] text-gray-700 bg-transparent placeholder-gray-400"
                />
                <div className="flex items-center h-full border-l border-gray-300 shrink-0">
                  <button
                    type="button"
                    title="Cari"
                    className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 h-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="Reset Pencarian"
                    onClick={() => { setSearchQuery(''); setToolbarFilterValue('-- Semua --'); }}
                    className="bg-[#286090] hover:bg-[#204d74] text-white px-3.5 h-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

            {/* Bagian Kanan: 4 Tombol Aksi (Tambah, Hapus, Aksi, Leads Maukuliah) */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Tombol Tambah (Hijau) */}
              <button className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 h-[34px] rounded-sm text-[13px] font-medium transition-colors shadow-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
                Tambah
              </button>

              {/* Tombol Hapus (Merah) */}
              <button className="flex items-center gap-1.5 bg-[#dd4b39] hover:bg-[#c23321] text-white px-3.5 h-[34px] rounded-sm text-[13px] font-medium transition-colors shadow-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus
              </button>

              {/* Tombol Aksi (Kuning/Oranye) */}
              <div className="relative" ref={aksiRef}>
                <button
                  onClick={() => setIsAksiOpen(!isAksiOpen)}
                  className="flex items-center gap-1.5 bg-[#f39c12] hover:bg-[#e08e0b] text-white px-3.5 h-[34px] rounded-sm text-[13px] font-medium transition-colors shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Aksi
                  <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isAksiOpen && (
                  <div className="absolute z-50 mt-1 right-0 w-[250px] bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <button onClick={() => { openReviewModal(); setIsAksiOpen(false); }} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Review Data Pendaftar</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Set KIP Kuliah</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Set Finalisasi</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Update Data Pendaftar</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Reset Password Pendaftar</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Import</button>
                  </div>
                )}
              </div>

              {/* Tombol Leads Maukuliah (Biru Cyan) */}
              <button
                onClick={() => navigate('/admin/list_leads')}
                className="flex items-center gap-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white px-3.5 h-[34px] rounded-sm text-[13px] font-medium transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Leads Maukuliah
              </button>
            </div>
          </div>

          {/* TABEL DATA PENDAFTAR (WARNA & TATA LETAK PERSIS SEPERTI DI FOTO) */}
          <div className="overflow-x-auto border border-[#cbd5e1] rounded-sm">
            <table className="w-full text-left text-[13px] text-gray-700 border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#004b87] text-white">
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[4%] text-center">
                    <div className="w-4 h-4 bg-white/20 border-2 border-white rounded-[2px] mx-auto cursor-pointer"></div>
                  </th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[9%] text-center">
                    Foto<br />Pendaftar
                  </th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[17%] text-center">
                    Nama & Kode<br />Pendaftar
                  </th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[17%] text-center">
                    Jalur Pendaftaran
                  </th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[18%] text-center">
                    Program Studi
                  </th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[13%] text-center">
                    Status<br />Pendaftar
                  </th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] w-[14%] text-center">
                    Kontak
                  </th>
                  <th className="px-3 py-3 font-semibold text-center w-[8%]">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b border-[#e5e7eb] transition-colors ${
                        index % 2 === 0 ? 'bg-white hover:bg-[#f1f5f9]' : 'bg-[#f9fafc] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-3 py-3.5 text-center border-r border-[#e5e7eb] align-top">
                        <input type="checkbox" className="w-4 h-4 cursor-pointer border-gray-300 rounded-sm" />
                      </td>

                      {/* Foto / Inisial */}
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top">
                        <div className="flex justify-center items-center">
                          {item.isFoto ? (
                            <div className="w-[58px] h-[58px] bg-gray-200 flex items-center justify-center overflow-hidden rounded-sm border border-gray-300">
                              <span className="text-gray-400 text-[9px] text-center font-bold leading-tight uppercase">FOTO<br />PENDAFTAR</span>
                            </div>
                          ) : (
                            <div className={`w-[58px] h-[58px] ${item.warna} text-white flex items-center justify-center rounded-sm font-bold text-2xl tracking-tight shadow-xs`}>
                              {item.inisial}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Nama & Kode */}
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top">
                        <p className="text-[#0073b7] hover:underline font-bold text-[13.5px] leading-tight mb-1 cursor-pointer tracking-tight uppercase">
                          {item.nama}
                        </p>
                        <p className="text-gray-700 text-[12.5px] font-normal">{item.kode}</p>
                      </td>

                      {/* Jalur Pendaftaran */}
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top">
                        <p className="font-bold text-gray-900 text-[13px] leading-tight mb-1">{item.jalur}</p>
                        <p className="text-gray-700 text-[12.5px] leading-snug">{item.ketJalur}</p>
                      </td>

                      {/* Program Studi dengan Nomor Lingkaran Hitam */}
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top">
                        <div className="flex flex-col gap-1.5">
                          {item.prodi.map((prd, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="bg-[#4b5563] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-gray-900 text-[13px] leading-tight">{prd}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Status Pendaftar (Badge Warna Persis di Foto) */}
                      <td className="px-3 py-3.5 text-center border-r border-[#e5e7eb] align-top">
                        <div className="flex flex-col items-center gap-1">
                          {item.status.map((st, idx) => (
                            <span
                              key={idx}
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm w-full max-w-[135px] text-center shadow-xs ${getStatusBadgeStyle(st)}`}
                            >
                              {st}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Kontak (Ikon Email & Telepon Biru) */}
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top">
                        <div className="flex flex-col gap-1.5 text-[13px]">
                          <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 text-[#0073b7] hover:underline">
                            <svg className="w-3.5 h-3.5 shrink-0 text-[#0073b7]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="truncate">{item.email}</span>
                          </a>
                          {item.telepon && (
                            <a href={`tel:${item.telepon}`} className="flex items-center gap-1.5 text-[#0073b7] hover:underline">
                              <svg className="w-3.5 h-3.5 shrink-0 text-[#0073b7]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                              </svg>
                              <span>{item.telepon}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Aksi (Tombol Mata Cyan & Tombol Tempat Sampah Merah) */}
                      <td className="px-3 py-3.5 text-center align-top">
                        <div className="flex justify-center items-center gap-1">
                          <button 
                            title="Detail Pendaftar" 
                            className="bg-[#00c0ef] hover:bg-[#00acd6] text-white p-1.5 rounded-sm transition-colors shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            title="Hapus Pendaftar" 
                            className="bg-[#dd4b39] hover:bg-[#c23321] text-white p-1.5 rounded-sm transition-colors shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500 bg-white border-b border-gray-200">
                      Tidak ada data pendaftar yang cocok dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAWAH TABEL */}
          {filteredData.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">

              <div className="w-full md:w-auto bg-[#f8fafc] border border-gray-100 rounded-sm px-4 py-2">
                <span className="text-[13px] text-gray-700">
                  Hal 1/508 (<span className="text-[#0f3b66] font-semibold">5.078 data</span>, 0.296 detik)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">

                <select className="border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none bg-white cursor-pointer hover:border-gray-400">
                  <option value="10">10 baris</option>
                  <option value="25">25 baris</option>
                  <option value="50">50 baris</option>
                  <option value="100">100 baris</option>
                </select>

                <div className="flex items-center">
                  <button className="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-l-sm text-[13px] disabled:opacity-50">«</button>
                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-[13px]">‹</button>

                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-[#1e40af] text-white font-medium text-[13px]">1</button>
                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-[13px]">2</button>
                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-[13px]">3</button>
                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50 text-[13px]">4</button>

                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-[13px]">›</button>
                  <button className="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-r-sm text-[13px] disabled:opacity-50">»</button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* MODAL REVIEW DATA PENDAFTAR */}
      {isReviewModalOpen && (
        <div 
          className={`fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 transition-opacity duration-500 ${
            isReviewAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeReviewModal}
        >
          <div 
            className={`bg-white rounded-xl shadow-2xl w-full max-w-[900px] overflow-hidden flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[85vh] ${
              isReviewAnimating ? 'translate-y-0' : 'translate-y-[100px]'
            }`}
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header Modal */}
            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
              <h3 className="text-[20px] font-bold text-gray-800">Review Data Pendaftaran</h3>
              <button onClick={closeReviewModal} className="text-gray-400 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Body Modal */}
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left text-[14px] text-gray-700 border-collapse">
                <thead className="bg-[#004b87] text-white sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-4 font-semibold border-r border-[#005a9c] w-[10%] text-center">No</th>
                    <th className="px-6 py-4 font-semibold border-r border-[#005a9c] w-[40%]">Status Pendaftar</th>
                    <th className="px-4 py-4 font-semibold border-r border-[#005a9c] w-[20%] text-center">Jumlah Pendaftar</th>
                    <th className="px-6 py-4 font-semibold w-[30%] text-center">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewData.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-[#e2e8f0] transition-colors ${
                        index % 2 === 0 ? 'bg-white hover:bg-[#f8fafc]' : 'bg-[#f8fafc] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      <td className="px-4 py-3 text-center text-gray-600 border-r border-[#e2e8f0]">{row.no}</td>
                      <td className="px-6 py-3 font-bold text-gray-800 border-r border-[#e2e8f0]">{row.status}</td>
                      <td className="px-4 py-3 text-center font-bold text-[#004b87] text-[15px] border-r border-[#e2e8f0]">{row.jumlah}</td>
                      <td className="px-6 py-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
              <button 
                onClick={closeReviewModal}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-[14px] rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pendaftar;
