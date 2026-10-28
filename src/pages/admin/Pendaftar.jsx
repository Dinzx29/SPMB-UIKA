import { useState, useRef, useEffect } from 'react';
import SearchableSelect from '../../components/ui/SearchableSelect';

const Pendaftar = () => {
  // 🔥 STATE UNTUK SEMUA FILTER 
  const [periode, setPeriode] = useState('-- Semua Periode --');
  const [gelombang, setGelombang] = useState('-- Semua Gelombang --');
  const [jalur, setJalur] = useState('-- Semua Jalur Pendaftaran --');
  const [sistemKuliah, setSistemKuliah] = useState('-- Semua Sistem Kuliah --');
  const [prodi, setProdi] = useState('-- Semua Unit / Program Studi --');
  const [pilihan, setPilihan] = useState('-- Semua Pilihan --');
  const [statusPendaftar, setStatusPendaftar] = useState([]);

  // 🔥 STATE UNTUK PENCARIAN
  const [searchQuery, setSearchQuery] = useState('');

  // 🔥 STATE UNTUK KONTROL DROPDOWN KUSTOM
  const [isPilihanOpen, setIsPilihanOpen] = useState(false);
  const pilihanRef = useRef(null);

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef(null);

  const [isAksiOpen, setIsAksiOpen] = useState(false);
  const aksiRef = useRef(null);

  // 🔥 STATE UNTUK TOOLBAR DROPDOWN
  const [isToolbarFilterOpen, setIsToolbarFilterOpen] = useState(false);
  const [toolbarFilterValue, setToolbarFilterValue] = useState('-- Semua --');
  const toolbarFilterRef = useRef(null);

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
      if (toolbarFilterRef.current && !toolbarFilterRef.current.contains(event.target)) setIsToolbarFilterOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 FUNGSI SAAT PRODI DIUBAH
  const handleProdiChange = (value) => {
    setProdi(value);
    if (value === '-- Semua Unit / Program Studi --' || value === 'Universitas Ibn Khaldun') {
      setPilihan('-- Semua Pilihan --');
    }
  };

  // 🔥 LOGIKA DISABLE PILIHAN
  const isPilihanDisabled = prodi === '-- Semua Unit / Program Studi --' || prodi === 'Universitas Ibn Khaldun';

  // 🔥 FUNGSI HANDLE MULTI-SELECT STATUS
  const handleStatusSelect = (value) => {
    if (statusPendaftar.includes(value)) {
      setStatusPendaftar(statusPendaftar.filter((v) => v !== value));
    } else {
      setStatusPendaftar([...statusPendaftar, value]);
    }
  };

  // 🔥 FUNGSI HAPUS CHIP STATUS
  const handleRemoveStatusChip = (e, value) => {
    e.stopPropagation();
    setStatusPendaftar(statusPendaftar.filter((v) => v !== value));
  };

  // 🔥 DATA OPSI FILTER
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

  // 🔥 DATA STATUS PENDAFTAR (BERKELOMPOK)
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

  // 🔥 DUMMY DATA PENDAFTAR
  const pendaftarData = [
    { id: 1, inisial: 'AI', warna: 'bg-[#1e3a8a]', nama: 'ASEP IRVAN SOPANDI', kode: '4112560003', jalur: '2025 Ganjil - Gelombang 1', ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', prodi: 'S2 - Teknologi Pendidikan (S2)', status: ['Belum Finalisasi', 'Belum Diterima Prodi'], email: 'afessirfan@gmail.com', telepon: '085794077317' },
    { id: 2, inisial: 'AB', warna: 'bg-[#0f766e]', nama: 'ASEP BADRUZZAMAN', kode: '4112560002', jalur: '2025 Ganjil - Gelombang 1', ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', prodi: 'S2 - Pendidikan Agama Islam (S2)', status: ['Belum Finalisasi', 'Belum Diterima Prodi'], email: 'asepbaz94@gmail.com', telepon: '085764952671' },
    { id: 3, inisial: 'MZ', warna: 'bg-[#4c1d95]', nama: 'M. ZAENI DAHLAN, S.PD.I', kode: '4112560001', jalur: '2025 Ganjil - Gelombang 1', ketJalur: 'RPL PEROLEHAN SKS (S2) - Karyawan', prodi: 'S2 - Manajemen (S2)', status: ['Belum Finalisasi', 'Belum Diterima Prodi'], email: 'dahlan.zaini@gmail.com', telepon: '083892831630' },
    { id: 4, inisial: 'RR', warna: 'bg-[#14532d]', nama: 'RIO RAMADAN', kode: '4112550101', jalur: '2025 Ganjil - Gelombang 3', ketJalur: 'RPL PEROLEHAN SKS - Karyawan', prodi: 'S1 - Ilmu Hukum', status: ['Belum Finalisasi', 'Lulus', 'Sudah Daftar Ulang', 'Sudah Memiliki NIM'], email: 'ryoramaal2@gmail.com', telepon: '089510009111' },
    { id: 5, inisial: 'NK', warna: 'bg-[#334155]', nama: 'NASYA KHARISA LESTARI', kode: '4112550100', jalur: '2025 Ganjil - Gelombang 3', ketJalur: 'RPL PEROLEHAN SKS - Karyawan', prodi: 'S1 - Ilmu Hukum', status: ['Belum Finalisasi', 'Lulus', 'Sudah Daftar Ulang', 'Sudah Memiliki NIM'], email: 'nasyakharisa03@gmail.com', telepon: '0816731861' },
  ];

  // 🔥 LOGIKA FILTER PENCARIAN
  const filteredData = pendaftarData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.nama.toLowerCase().includes(query) ||
      item.kode.toLowerCase().includes(query) ||
      item.prodi.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">
      
      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-600 mb-2">
              <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <span className="text-gray-400">›</span>
              <span>Pendaftar</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-[26px] font-bold text-gray-900">Pendaftar</h2>
              <span className="text-[16px] text-gray-400 font-thin">Daftar Biodata Pendaftar</span>
            </div>
          </div>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-2 border-t-[#f59e0b] rounded-md p-5 shadow-sm relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            
            {/* Kiri */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 relative z-50">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Periode</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={periodeOptions} value={periode} onChange={setPeriode} placeholder="Pilih Periode..." /></div>
              </div>
              <div className="flex items-center gap-3 relative z-40">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Gelombang</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={gelombangOptions} value={gelombang} onChange={setGelombang} placeholder="Pilih Gelombang..." /></div>
              </div>
              
              <div className="flex items-center gap-3 relative z-30">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Unit / Program Studi</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={prodiOptions} value={prodi} onChange={handleProdiChange} placeholder="Pilih Program Studi..." />
                </div>
              </div>

              {/* FILTER PILIHAN (KUSTOM) */}
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
                      className="flex items-center justify-between w-full border border-gray-300 rounded-md py-2 px-3 text-[14px] text-gray-700 outline-none bg-white hover:border-gray-400 focus:border-[#f59e0b]"
                    >
                      <span className="truncate">{pilihan}</span>
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {isPilihanOpen && (
                      <div className="absolute z-50 mt-1 w-full bg-[#5c5c5c] rounded-md shadow-lg py-1">
                        {pilihanOptions.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => { setPilihan(opt); setIsPilihanOpen(false); }}
                            className={`flex items-center w-full text-left px-4 py-2.5 text-[14px] transition-colors ${
                              pilihan === opt ? 'bg-[#3b82f6] text-white' : 'text-gray-200 hover:bg-[#4a4a4a] hover:text-white'
                            }`}
                          >
                            <span className="w-5 shrink-0 text-white">{pilihan === opt && '✓'}</span>{opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 relative z-10">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Jalur Pendaftaran</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={jalurOptions} value={jalur} onChange={setJalur} placeholder="Pilih Jalur..." /></div>
              </div>
              <div className="flex items-center gap-3 relative z-0">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Sistem Kuliah</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={sistemKuliahOptions} value={sistemKuliah} onChange={setSistemKuliah} placeholder="Pilih Sistem Kuliah..." /></div>
              </div>

              {/* FILTER STATUS PENDAFTAR (KUSTOM BERKELOMPOK & MULTI-SELECT) */}
              <div className="flex items-center gap-3 relative z-0" ref={statusRef}>
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Status Pendaftar</label>
                <div className="relative w-full max-w-[360px]">
                  <button 
                    onClick={() => setIsStatusOpen(!isStatusOpen)} 
                    className="flex items-center justify-between w-full min-h-[42px] border border-gray-300 rounded-md py-1.5 px-3 text-[14px] text-gray-700 outline-none bg-white hover:border-gray-400 focus:border-[#f59e0b]"
                  >
                    <div className="flex flex-wrap gap-1.5 overflow-hidden">
                      {statusPendaftar.length > 0 ? (
                        statusPendaftar.map((val, idx) => (
                          <span key={idx} className="flex items-center gap-1.5 bg-white border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[13px] shadow-sm">
                            {val}
                            <svg onClick={(e) => handleRemoveStatusChip(e, val)} className="w-3.5 h-3.5 cursor-pointer text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">-- Semua Status Pendaftar --</span>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-gray-400 shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {isStatusOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg py-1 max-h-[300px] overflow-y-auto">
                      <button 
                        onClick={() => { setStatusPendaftar([]); setIsStatusOpen(false); }} 
                        className={`flex items-center w-full text-left px-4 py-2.5 text-[14px] transition-colors ${statusPendaftar.length === 0 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <span className="w-5 shrink-0">{statusPendaftar.length === 0 && '✓'}</span>
                        -- Semua Status Pendaftar --
                      </button>

                      {statusPendaftarGroups.map((item, idx) => {
                        if (item.isGroupHeader) {
                          return (
                            <div key={idx} className="px-4 py-1.5 mt-1 text-[13px] font-bold text-gray-500 bg-gray-100 border-y border-gray-200">
                              {item.label}
                            </div>
                          );
                        }
                        const isSelected = statusPendaftar.includes(item.value);
                        return (
                          <button 
                            key={idx} 
                            onClick={() => handleStatusSelect(item.value)} 
                            className={`flex items-center w-full text-left px-4 py-2.5 text-[14px] transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
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

        {/* TABEL PENDAFTAR */}
        <div className="w-full bg-white rounded-md shadow-sm border-t-2 border-t-[#10b981] p-4 relative z-10">
          
          {/* Toolbar Atas */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              
              {/* 🔥 DROPDOWN TOOLBAR KUSTOM (SESUAI GAMBAR) */}
              <div className="relative" ref={toolbarFilterRef}>
                <button 
                  onClick={() => setIsToolbarFilterOpen(!isToolbarFilterOpen)}
                  className="flex items-center justify-between gap-2 border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none bg-white min-w-[180px] text-left hover:border-gray-400 focus:ring-1 focus:ring-emerald-500"
                >
                  <span className="truncate">{toolbarFilterValue}</span>
                  <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {isToolbarFilterOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-[#5c5c5c] border border-gray-600 rounded-sm shadow-lg py-1">
                    {toolbarFilterOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setToolbarFilterValue(opt);
                          setIsToolbarFilterOpen(false);
                        }}
                        className={`flex items-center w-full text-left px-4 py-2 text-[13px] transition-colors ${
                          toolbarFilterValue === opt 
                            ? 'bg-[#0f3b66] text-white' 
                            : 'text-gray-100 hover:bg-[#4a4a4a]'
                        }`}
                      >
                        <span className="w-5 shrink-0 text-white">{toolbarFilterValue === opt && '✓'}</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <input 
                type="text" 
                placeholder="Cari Pendaftar" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none w-[200px] focus:border-emerald-500" 
              />
              <button className="bg-[#10b981] text-white p-1.5 rounded-sm hover:bg-[#059669]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
              <button onClick={() => setSearchQuery('')} className="bg-[#6366f1] text-white p-1.5 rounded-sm hover:bg-[#4f46e5] transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> Tambah</button>
              <button className="flex items-center gap-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus</button>
              
              <div className="relative" ref={aksiRef}>
                <button 
                  onClick={() => setIsAksiOpen(!isAksiOpen)}
                  className="flex items-center gap-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Aksi <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>

                {isAksiOpen && (
                  <div className="absolute z-50 mt-1 right-0 w-[250px] bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Review Data Pendaftar</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Set KIP Kuliah</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Set Finalisasi</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Update Data Pendaftar</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Reset Password Pendaftar</button>
                    <button onClick={() => setIsAksiOpen(false)} className="block w-full text-left px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-100">Import</button>
                  </div>
                )}
              </div>

              <button className="flex items-center gap-1.5 bg-[#06b6d4] hover:bg-[#0891b2] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> Leads Maukuliah</button>
            </div>
          </div>

          {/* TABEL PENDAFTAR */}
          <div className="overflow-x-auto border border-gray-200 rounded-sm">
            <table className="w-full text-left text-[13px] text-gray-700 border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#0f3b66] text-white">
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[4%] text-center">
                    <input type="checkbox" className="accent-blue-600 w-4 h-4 cursor-pointer" />
                  </th>
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[10%] text-center">Foto<br/>Pendaftar</th>
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[18%]">Nama & Kode<br/>Pendaftar</th>
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[16%]">Jalur Pendaftaran</th>
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[18%]">Program Studi</th>
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[14%] text-center">Status<br/>Pendaftar</th>
                  <th className="px-4 py-4 font-semibold border-r border-[#1e4f80] w-[16%]">Kontak</th>
                  <th className="px-4 py-4 font-semibold text-center w-[8%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-center border-r border-gray-200">
                        <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                      </td>
                      <td className="px-4 py-4 flex justify-center border-r border-gray-200">
                        <div className={`w-14 h-14 ${item.warna} text-white flex items-center justify-center rounded-sm font-bold text-xl shadow-sm`}>
                          {item.inisial}
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200">
                        <p className="text-[#1e40af] font-bold">{item.nama}</p>
                        <p className="text-gray-600 text-[13px]">{item.kode}</p>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200">
                        <p className="font-bold text-gray-800">{item.jalur}</p>
                        <p className="text-gray-600 text-[12px] mt-1">{item.ketJalur}</p>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200">
                        <div className="flex items-start gap-2">
                          <span className="bg-[#1e3a8a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 shrink-0">1</span>
                          <span className="font-medium text-gray-800">{item.prodi}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center border-r border-gray-200">
                        <div className="flex flex-wrap justify-center gap-1.5">
                          {item.status.map((st, idx) => (
                            <span 
                              key={idx} 
                              className={`text-white text-[11px] font-medium px-2 py-0.5 rounded-sm ${
                                st.includes('Lulus') || st.includes('Sudah') ? 'bg-[#10b981]' : 
                                st.includes('Belum') ? 'bg-[#f97316]' : 'bg-[#ef4444]'
                              }`}
                            >
                              {st}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-4 border-r border-gray-200">
                        <div className="flex flex-col gap-1.5 text-[#1e40af] text-[13px]">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="truncate">{item.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>{item.telepon}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex justify-center gap-1.5">
                          <button className="bg-[#38bdf8] hover:bg-[#0284c7] text-white p-1.5 rounded-sm transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                          <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white p-1.5 rounded-sm transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
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

          {/* 🔥 PAGINATION BAWAH TABEL */}
          {filteredData.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
              
              {/* Info Jumlah Data */}
              <div className="w-full md:w-auto bg-[#f8fafc] border border-gray-100 rounded-sm px-4 py-2">
                <span className="text-[13px] text-gray-700">
                  Hal 1/508 (<span className="text-[#0f3b66]">5.078 data</span>, 0.296 detik)
                </span>
              </div>

              {/* Kontrol Pagination */}
              <div className="flex flex-wrap items-center gap-4">
                
                {/* Dropdown Baris per Halaman */}
                <select className="border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none bg-white cursor-pointer hover:border-gray-400">
                  <option value="10">10 baris</option>
                  <option value="25">25 baris</option>
                  <option value="50">50 baris</option>
                  <option value="100">100 baris</option>
                </select>

                {/* Navigasi Halaman */}
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
    </div>
  );
};

export default Pendaftar;