import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DataPendaftar = () => {
  const navigate = useNavigate();

  // Active Sidebar Menu Tab
  const [activeSidebarTab, setActiveSidebarTab] = useState('Data Pendaftar');

  // Active Bottom Sub-Tab
  const [activeBottomTab, setActiveBottomTab] = useState('Pekerjaan');

  // Notification Toast / Alert
  const [toastMessage, setToastMessage] = useState(null);

  // State untuk Validasi & Pop up Modal Peringatan Garis Merah
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isInfoAnimating, setIsInfoAnimating] = useState(false);

  const openInfoModal = () => {
    setIsInfoModalOpen(true);
    setTimeout(() => setIsInfoAnimating(true), 20);
  };

  const closeInfoModal = () => {
    setIsInfoAnimating(false);
    setTimeout(() => setIsInfoModalOpen(false), 200);
  };

  const isFieldError = (field) => {
    return hasAttemptedSubmit && !formData[field];
  };

  const getFieldClass = (field) => {
    const base = 'flex-1 rounded-sm px-3 py-1.5 text-[13px] outline-none transition-colors text-gray-900';
    if (isFieldError(field)) {
      return `${base} border border-red-500 bg-[#fffbfa] focus:border-red-600 focus:ring-1 focus:ring-red-400`;
    }
    return `${base} border border-gray-300 focus:border-[#004b87] bg-white`;
  };

  const getDateFieldClass = (field) => {
    const base = 'w-full rounded-sm pl-9 pr-3 py-1.5 text-[13px] outline-none transition-colors text-gray-900';
    if (isFieldError(field)) {
      return `${base} border border-red-500 bg-[#fffbfa] focus:border-red-600 focus:ring-1 focus:ring-red-400`;
    }
    return `${base} border border-gray-300 focus:border-[#004b87] bg-white`;
  };

  // Database Dinamis Wilayah
  const dataWilayah = {
    'ACEH': {
      'KOTA BANDA ACEH': ['BAITURRAHMAN', 'KUTA ALAM', 'MEURAXA', 'SYIAH KUALA', 'ULEE KARENG'],
      'KABUPATEN ACEH BESAR': ['DARUL IMARAH', 'INGIN JAYA', 'KUTA MALAKA', 'MONTASIK'],
      'KABUPATEN ACEH BARAT': ['JOHAN PAHLAWAN', 'KAWAY XVI', 'MEUREUBO']
    },
    'JAWA BARAT': {
      'KOTA BOGOR': ['BOGOR BARAT', 'BOGOR TENGAH', 'BOGOR SELATAN', 'BOGOR TIMUR', 'BOGOR UTARA', 'TANAH SAREAL'],
      'KABUPATEN BOGOR': ['CIBINONG', 'CISAAT', 'CIMANGGIS', 'GUNUNG PUTRI', 'PARUNG', 'SITU GEDE'],
      'KOTA BANDUNG': ['BANDUNG WETAN', 'COBLONG', 'SUMUR BANDUNG', 'CICENDO'],
      'KOTA DEPOK': ['BEJI', 'CIMANGGIS', 'PANCORAN MAS', 'SUKMAJAYA']
    },
    'DKI JAKARTA': {
      'KOTA JAKARTA SELATAN': ['CILANDAK', 'KEBAYORAN BARU', 'KEBAYORAN LAMA', 'MAMPANG PRAPATAN', 'SETIABUDI'],
      'KOTA JAKARTA BARAT': ['GROGOL PETAMBURAN', 'KEBON JERUK', 'PALMERAH', 'TAMAN SARI'],
      'KOTA JAKARTA PUSAT': ['CEMPAKA PUTIH', 'GAMBIR', 'MENTENG', 'TANAH ABANG']
    },
    'JAWA TENGAH': {
      'KOTA SEMARANG': ['BANYUMANIK', 'CANDISARI', 'GAJAHMUNGKUR', 'PEDURUNGAN'],
      'KOTA SURAKARTA': ['BANJARSARI', 'JEBRES', 'LAWYAN', 'PASAR KLIWON']
    },
    'JAWA TIMUR': {
      'KOTA SURABAYA': ['GUBENG', 'WONOKROMO', 'TEGALSARI', 'GENTENG'],
      'KOTA MALANG': ['KLOJEN', 'LOWOKWARU', 'SUKUN', 'BLIMBING']
    }
  };

  // Daftar Opsi Pekerjaan Sesuai Foto
  const listPekerjaan = [
    'Tidak Bekerja',
    'Bekerja',
    'Ibu Rumah Tangga',
    'Belum Bekerja',
    'PNS',
    'BUMN',
    'Pelajar',
    'Wiraswasta',
    'Guru',
    'Dosen',
    'Petani',
    'Nelayan',
    'Pedagang',
    'TNI',
    'POLRI',
    'Buruh Harian Lepas',
    'Supir',
    'Pensiunan',
    'PNS (Tugas Belajar)',
    'Peneliti',
    'Magang',
    'Tenaga Pengajar / Instruktur / Fasilitator',
    'Pimpinan / Manajerial',
    'Karyawan'
  ];

  // Form State
  const [formData, setFormData] = useState({
    kodePendaftar: '',
    periode: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: '',
    suku: '',
    jenisProgram: '',
    tanggalDaftar: new Date().toISOString().split('T')[0],
    tanggalAktivasi: '',

    // Checkboxes
    aktif: false,
    finalisasiData: false,
    generateTagihan: false,
    kipKuliah: false,
    umumkanKelulusan: false,

    // Identitas Akademik
    nim: '',
    noUjian: '',
    pemberiRekomendasi: '',
    sumberPendaftar: '',
    kebutuhanKhusus: 'Tidak',
    idDataSebelumnya: '',

    // Tab Pelengkap
    nik: '',
    noPaspor: '',
    noKk: '',
    email: '',
    telepon: '',
    tinggiBadan: '',
    noHp: '',
    nisn: '',
    npsn: '',
    beratBadan: '',
    ukuranJas: '',

    // Tab Domisili
    negara: 'Indonesia',
    provinsi: 'JAWA BARAT',
    kota: 'KOTA BOGOR',
    kecamatan: 'BOGOR BARAT',
    kelurahan: '',
    dusun: '',
    alamat: '',
    rt: '',
    rw: '',
    kodePos: '',

    // Tab Pesantren
    pernahPesantren: false,
    namaPesantren: '',
    berapaTahun: '',
    alamatPesantren: '',

    // Tab Pekerjaan
    pekerjaan: '',
    instansiPekerjaan: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'negara' && value !== 'Indonesia') {
        updated.provinsi = '';
        updated.kota = '';
        updated.kecamatan = '';
      }

      if (field === 'provinsi') {
        const availableKota = dataWilayah[value] ? Object.keys(dataWilayah[value]) : [];
        updated.kota = availableKota[0] || '';
        const availableKec = (dataWilayah[value] && availableKota[0]) ? dataWilayah[value][availableKota[0]] : [];
        updated.kecamatan = availableKec[0] || '';
      }

      if (field === 'kota') {
        const currentProv = updated.provinsi;
        const availableKec = (dataWilayah[currentProv] && dataWilayah[currentProv][value])
          ? dataWilayah[currentProv][value]
          : [];
        updated.kecamatan = availableKec[0] || '';
      }

      return updated;
    });
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    setHasAttemptedSubmit(true);

    const requiredFields = [
      'periode',
      'nama',
      'tempatLahir',
      'tanggalLahir',
      'jenisKelamin',
      'jenisProgram',
      'nik'
    ];

    const hasEmptyField = requiredFields.some((f) => !formData[f]);

    if (hasEmptyField) {
      openInfoModal();
      return;
    }

    setToastMessage({ type: 'success', text: 'Data pendaftar baru berhasil disimpan!' });
    setTimeout(() => {
      setToastMessage(null);
      navigate('/admin/pendaftar');
    }, 1500);
  };

  const sidebarMenuItems = [
    'Data Pendaftar',
    'Pilihan Prodi',
    'Keluarga',
    'Pendidikan',
    'Riwayat Keuangan',
    'Seleksi Pendaftaran'
  ];

  const bottomTabs = ['Pelengkap', 'Domisili', 'Pesantren', 'Pekerjaan'];

  const listNegara = [
    'Indonesia', 'Afganistan', 'Afrika Selatan', 'Afrika Tengah, Republik', 'Åland, Kepulauan',
    'Albania', 'Aljazair', 'Amerika Serikat', 'Andorra', 'Angola', 'Anguilla', 'Antarktika',
    'Antigua dan Barbuda', 'Antillen Belanda', 'Arab Saudi', 'Argentina', 'Armenia', 'Aruba',
    'Australia', 'Austria', 'Azerbaijan', 'Bahama', 'Bahrain', 'Bangladesh', 'Barbados',
    'Belanda', 'Belarus', 'Belgia', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia',
    'Bosnia dan Herzegovina', 'Botswana', 'Brasil', 'Brunei Darussalam', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Ceko', 'Chili', 'China', 'Denmark', 'Djibouti', 'Dominika',
    'Ekuador', 'El Salvador', 'Eritrea', 'Estonia', 'Etiopia', 'Fiji', 'Filipina', 'Finlandia',
    'Gabon', 'Gambia', 'Georgia', 'Ghana', 'Gibraltar', 'Grenada', 'Greenland', 'Guadeloupe',
    'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Hong Kong', 'Hongaria', 'India', 'Inggris', 'Irak', 'Iran', 'Irlandia', 'Islandia', 'Israel',
    'Italia', 'Jamaika', 'Jepang', 'Jerman', 'Kamboja', 'Kamerun', 'Kanada', 'Kazakhstan',
    'Kenya', 'Kirgizstan', 'Kolombia', 'Komoro', 'Korsel', 'Kutub Selatan', 'Kuwait', 'Laos',
    'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lituania', 'Luksemburg',
    'Madagaskar', 'Makau', 'Makedonia', 'Maladewa', 'Malawi', 'Malaysia', 'Mali', 'Malta',
    'Maroko', 'Meksiko', 'Mesir', 'Mikronesia', 'Moldova', 'Monako', 'Mongolia', 'Montenegro',
    'Mozambik', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Niger', 'Nigeria', 'Nikaragua',
    'Norwegia', 'Oman', 'Pakistan', 'Palau', 'Palestina', 'Panama', 'Papua Nugini', 'Paraguay',
    'Perancis', 'Peru', 'Polandia', 'Portugal', 'Puerto Riko', 'Qatar', 'Rumania', 'Rusia',
    'Rwanda', 'Selandia Baru', 'Senegal', 'Serbia', 'Singapura', 'Siprus', 'Slovenia', 'Slowakia',
    'Somalia', 'Spanyol', 'Sri Lanka', 'Sudan', 'Suriah', 'Suriname', 'Swedia', 'Swiss',
    'Taiwan', 'Tajikistan', 'Tanjung Verde', 'Tanzania', 'Thailand', 'Timor Leste', 'Togo',
    'Tonga', 'Trinidad dan Tobago', 'Tunisia', 'Turki', 'Turkmenistan', 'Uganda', 'Ukraina',
    'Uni Emirat Arab', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatikan', 'Venezuela', 'Vietnam',
    'Yaman', 'Yordania', 'Yunani', 'Zambia', 'Zimbabwe'
  ];

  const optionsKota = formData.provinsi && dataWilayah[formData.provinsi]
    ? Object.keys(dataWilayah[formData.provinsi])
    : [];

  const optionsKecamatan = formData.provinsi && formData.kota && dataWilayah[formData.provinsi] && dataWilayah[formData.provinsi][formData.kota]
    ? dataWilayah[formData.provinsi][formData.kota]
    : [];

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen text-gray-900">

      {/* MODAL PERINGATAN (POP-UP INFORMASI) */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            onClick={closeInfoModal}
            className={`fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 ${isInfoAnimating ? 'opacity-100' : 'opacity-0'
              }`}
          />

          <div
            className={`relative bg-white rounded-md shadow-2xl w-full max-w-[420px] p-6 sm:p-8 z-10 text-center transform transition-all duration-200 ${isInfoAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
            <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#fef3c7] mb-5">
              <span className="text-[#f59e0b] font-bold text-3xl font-serif">i</span>
            </div>

            <h3 className="text-[20px] font-semibold text-gray-800 mb-2">
              Informasi
            </h3>

            <p className="text-[14px] text-gray-600 mb-7 leading-relaxed">
              Mohon mengisi isian yang bergaris merah
            </p>

            <button
              type="button"
              onClick={closeInfoModal}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-4 rounded-md transition-colors text-[14px] cursor-pointer shadow-sm active:scale-[0.98]"
            >
              Oke
            </button>
          </div>
        </div>
      )}

      {/* Toast Notifikasi */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-[150] px-5 py-3 rounded-md shadow-xl text-[13.5px] font-medium flex items-center gap-2.5 transition-all text-white ${toastMessage.type === 'success' ? 'bg-[#00a65a]' : 'bg-[#e08e0b]'
            }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage.text}</span>
        </div>
      )}

      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-4">

        {/* BREADCRUMB & HEADER JUDUL */}
        <div>
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2 font-medium">
            <button
              onClick={() => navigate('/admin/pendaftar')}
              className="hover:text-gray-900 cursor-pointer flex items-center"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-gray-400">›</span>
            <button
              onClick={() => navigate('/admin/pendaftar')}
              className="text-gray-500 hover:text-[#004b87] cursor-pointer"
            >
              Pendaftar
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-600">Detail Pendaftar</span>
          </div>

          <div className="flex items-baseline gap-3">
            <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Pendaftaran</h2>
            <span className="text-[16px] text-gray-400 font-light">Detail Pendaftar</span>
          </div>
        </div>

        {/* ALERT BANNER */}
        <div className="w-full bg-[#fdf2f2] border border-[#fca5a5] rounded-sm px-4 py-3 flex items-center gap-2.5 text-[13.5px] text-[#991b1b]">
          <svg className="w-4 h-4 text-[#ef4444] shrink-0 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <strong className="font-bold">Ups!</strong> Pendaftar belum memiliki prodi.{' '}
            <button
              type="button"
              onClick={() => setActiveSidebarTab('Pilihan Prodi')}
              className="text-[#15803d] hover:underline font-medium cursor-pointer"
            >
              Klik disini untuk menambahkan prodi.
            </button>
          </div>
        </div>

        {/* TOOLBAR PENCARIAN & TOMBOL AKSI ATAS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">

          <div className="flex items-center h-[34px] rounded-sm overflow-hidden shadow-2xs">
            <button
              onClick={() => navigate('/admin/pendaftar')}
              title="Kembali ke Daftar"
              className="bg-[#f39c12] hover:bg-[#e08e0b] text-white px-2.5 h-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Cari Pendaftar"
              className="border-y border-gray-300 px-3 text-[13px] outline-none h-full bg-white text-gray-700 w-[180px] sm:w-[220px] placeholder-gray-400"
            />
            <button
              title="Cari"
              className="bg-[#337ab7] hover:bg-[#286090] text-white px-3.5 h-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/admin/pendaftar')}
              className="flex items-center gap-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white px-4 h-[34px] rounded-sm text-[13px] font-medium transition-colors shadow-2xs cursor-pointer"
            >
              <span>&lt;</span>
              <span>Kembali ke Daftar</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white px-4 h-[34px] rounded-sm text-[13px] font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span>Simpan</span>
            </button>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="w-full bg-white border-t-[3px] border-t-[#00a65a] rounded-sm p-5 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* SISI KIRI: NAVIGASI MENU */}
            <div className="w-full lg:w-[200px] shrink-0 flex flex-col gap-1">
              <div className="w-full aspect-square bg-[#1a1061] rounded-sm flex items-center justify-center text-white mb-2 shadow-xs">
              </div>

              <div className="flex flex-col border border-gray-200 rounded-sm overflow-hidden text-[13px]">
                {sidebarMenuItems.map((item) => {
                  const isActive = activeSidebarTab === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setActiveSidebarTab(item)}
                      className={`w-full text-left px-3.5 py-2.5 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer ${isActive
                          ? 'bg-[#e0f2fe] text-[#0284c7] font-semibold'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SISI KANAN: FORM DATA */}
            <div className="flex-1 w-full space-y-6">

              {/* TAB DATA PENDAFTAR */}
              {activeSidebarTab === 'Data Pendaftar' && (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3.5 text-[13px]">

                    {/* KOLOM KIRI */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Kode Pendaftar</label>
                        <input
                          type="text"
                          placeholder="Jika tidak diisi akan digenerate"
                          value={formData.kodePendaftar}
                          onChange={(e) => handleChange('kodePendaftar', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white placeholder-gray-400 text-gray-900"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                          Periode<span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.periode}
                          onChange={(e) => handleChange('periode', e.target.value)}
                          className={getFieldClass('periode')}
                        >
                          <option value="">-- Pilih Periode --</option>
                          <option value="2026 Genap">2026 Genap</option>
                          <option value="2026 Ganjil">2026 Ganjil</option>
                          <option value="2025 Genap">2025 Genap</option>
                          <option value="2025 Ganjil">2025 Ganjil</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                          Nama<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.nama}
                          onChange={(e) => handleChange('nama', e.target.value)}
                          className={getFieldClass('nama')}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                          Tempat Lahir<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.tempatLahir}
                          onChange={(e) => handleChange('tempatLahir', e.target.value)}
                          className={getFieldClass('tempatLahir')}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                          Tanggal Lahir<span className="text-red-500">*</span>
                        </label>
                        <div className="flex-1 relative flex items-center">
                          <span className="absolute left-3 text-gray-400">📅</span>
                          <input
                            type="date"
                            value={formData.tanggalLahir}
                            onChange={(e) => handleChange('tanggalLahir', e.target.value)}
                            className={getDateFieldClass('tanggalLahir')}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                          Jenis Kelamin<span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.jenisKelamin}
                          onChange={(e) => handleChange('jenisKelamin', e.target.value)}
                          className={getFieldClass('jenisKelamin')}
                        >
                          <option value="">-- Pilih Jenis Kelamin --</option>
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Agama</label>
                        <select
                          value={formData.agama}
                          onChange={(e) => handleChange('agama', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer text-gray-900"
                        >
                          <option value="">-- Pilih Agama --</option>
                          <option value="Islam">Islam</option>
                          <option value="Kristen">Kristen</option>
                          <option value="Katolik">Katolik</option>
                          <option value="Hindu">Hindu</option>
                          <option value="Buddha">Buddha</option>
                          <option value="Konghucu">Konghucu</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Suku</label>
                        <select
                          value={formData.suku}
                          onChange={(e) => handleChange('suku', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer text-gray-900"
                        >
                          <option value="">-- Pilih Suku --</option>
                          <option value="Sunda">Sunda</option>
                          <option value="Jawa">Jawa</option>
                          <option value="Betawi">Betawi</option>
                          <option value="Minang">Minang</option>
                          <option value="Batak">Batak</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                          Jenis Program<span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.jenisProgram}
                          onChange={(e) => handleChange('jenisProgram', e.target.value)}
                          className={getFieldClass('jenisProgram')}
                        >
                          <option value="">-- Pilih Jenis Program --</option>
                          <option value="Reguler">Reguler</option>
                          <option value="Karyawan">Karyawan</option>
                          <option value="RPL">RPL</option>
                          <option value="Pascasarjana">Pascasarjana</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Tanggal Daftar</label>
                        <div className="flex-1 relative flex items-center">
                          <span className="absolute left-3 text-gray-400">📅</span>
                          <input
                            type="date"
                            value={formData.tanggalDaftar}
                            onChange={(e) => handleChange('tanggalDaftar', e.target.value)}
                            className="w-full border border-gray-300 rounded-sm pl-9 pr-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Tanggal Aktivasi Akun</label>
                        <div className="flex-1 text-gray-900 text-[13px] py-1.5">
                          {formData.tanggalAktivasi || '-'}
                        </div>
                      </div>

                    </div>

                    {/* KOLOM KANAN */}
                    <div className="space-y-3">
                      <div className="space-y-2 border-b border-gray-100 pb-3">
                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-[#337ab7] font-bold">Aktif?</span>
                          <input
                            type="checkbox"
                            checked={formData.aktif}
                            onChange={(e) => handleChange('aktif', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#004b87] cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-[#337ab7] font-bold">Finalisasi Data?</span>
                          <input
                            type="checkbox"
                            checked={formData.finalisasiData}
                            onChange={(e) => handleChange('finalisasiData', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#004b87] cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-[#337ab7] font-bold">Generate Tagihan Formulir?</span>
                          <input
                            type="checkbox"
                            checked={formData.generateTagihan}
                            onChange={(e) => handleChange('generateTagihan', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#004b87] cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-[#337ab7] font-bold">KIP Kuliah?</span>
                          <input
                            type="checkbox"
                            checked={formData.kipKuliah}
                            onChange={(e) => handleChange('kipKuliah', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#004b87] cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center justify-between py-0.5">
                          <span className="text-[#337ab7] font-bold">Umumkan Kelulusan?</span>
                          <input
                            type="checkbox"
                            checked={formData.umumkanKelulusan}
                            onChange={(e) => handleChange('umumkanKelulusan', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-[#004b87] cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">NIM</label>
                        <div className="flex-1 text-gray-900 py-1.5">{formData.nim || '-'}</div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">No. Ujian</label>
                        <div className="flex-1 text-gray-900 py-1.5">{formData.noUjian || '-'}</div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">Pemberi Rekomendasi</label>
                        <select
                          value={formData.pemberiRekomendasi}
                          onChange={(e) => handleChange('pemberiRekomendasi', e.target.value)}
                          className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer text-gray-900"
                        >
                          <option value="">-- Belum Diisi --</option>
                          <option value="Guru BK">Guru BK</option>
                          <option value="Alumni">Alumni</option>
                          <option value="Dosen">Dosen</option>
                          <option value="Orang Tua">Orang Tua</option>
                          <option value="Teman/Kerabat">Teman / Kerabat</option>
                        </select>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">Sumber Pendaftar</label>
                        <div className="flex-1 text-gray-900 py-1.5">{formData.sumberPendaftar || '-'}</div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">
                          Kebutuhan Khusus<span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-5 py-1">
                          <label className="flex items-center gap-2 cursor-pointer text-gray-900">
                            <input
                              type="radio"
                              name="kebutuhanKhusus"
                              value="Tidak"
                              checked={formData.kebutuhanKhusus === 'Tidak'}
                              onChange={() => handleChange('kebutuhanKhusus', 'Tidak')}
                              className="w-4 h-4 text-[#004b87] cursor-pointer"
                            />
                            <span>Tidak</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-gray-900">
                            <input
                              type="radio"
                              name="kebutuhanKhusus"
                              value="Ya"
                              checked={formData.kebutuhanKhusus === 'Ya'}
                              onChange={() => handleChange('kebutuhanKhusus', 'Ya')}
                              className="w-4 h-4 text-[#004b87] cursor-pointer"
                            />
                            <span>Ya</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">ID Data Sebelumnya</label>
                        <div className="flex-1 text-gray-900 py-1.5">{formData.idDataSebelumnya || '-'}</div>
                      </div>

                    </div>

                  </div>

                  {/* SUB-TABS BAWAH */}
                  <div className="pt-6 border-t border-gray-200">

                    <div className="flex flex-wrap items-center gap-1 mb-4">
                      {bottomTabs.map((tab) => {
                        const isActive = activeBottomTab === tab;
                        return (
                          <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveBottomTab(tab)}
                            className={`px-4 py-2 rounded-t-sm text-[13px] font-semibold transition-colors cursor-pointer ${isActive
                                ? 'bg-[#0073b7] text-white shadow-xs'
                                : 'bg-[#e5e7eb] hover:bg-[#d1d5db] text-gray-700'
                              }`}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </div>

                    {/* SUB-TAB PELENGKAP */}
                    {activeBottomTab === 'Pelengkap' && (
                      <div className="p-4 border border-gray-200 rounded-sm bg-white grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3.5 text-[13px]">
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              NIK (No. KTP)<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={formData.nik}
                              onChange={(e) => handleChange('nik', e.target.value)}
                              className={getFieldClass('nik')}
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">No. Paspor</label>
                            <input
                              type="text"
                              value={formData.noPaspor}
                              onChange={(e) => handleChange('noPaspor', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">No. KK</label>
                            <input
                              type="text"
                              value={formData.noKk}
                              onChange={(e) => handleChange('noKk', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Email</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Telepon</label>
                            <input
                              type="text"
                              value={formData.telepon}
                              onChange={(e) => handleChange('telepon', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">Tinggi Badan (cm)</label>
                            <input
                              type="number"
                              value={formData.tinggiBadan}
                              onChange={(e) => handleChange('tinggiBadan', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">No. HP</label>
                            <input
                              type="text"
                              value={formData.noHp}
                              onChange={(e) => handleChange('noHp', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">NISN</label>
                            <div className="flex-1 text-gray-900 py-1.5">{formData.nisn || '-'}</div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">NPSN</label>
                            <div className="flex-1 text-gray-900 py-1.5">{formData.npsn || '-'}</div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">Berat Badan (Kg)</label>
                            <input
                              type="number"
                              value={formData.beratBadan}
                              onChange={(e) => handleChange('beratBadan', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-40 text-[#337ab7] font-bold shrink-0">Ukuran Jas Almamater</label>
                            <select
                              value={formData.ukuranJas}
                              onChange={(e) => handleChange('ukuranJas', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer text-gray-900"
                            >
                              <option value="">-- Pilih Ukuran Jas Almamater --</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                              <option value="XXL">XXL</option>
                              <option value="XXXL">XXXL</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB DOMISILI */}
                    {activeBottomTab === 'Domisili' && (
                      <div className="p-4 border border-gray-200 rounded-sm bg-white grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3.5 text-[13px]">
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Negara
                            </label>
                            <select
                              value={formData.negara}
                              onChange={(e) => handleChange('negara', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer text-gray-900 font-medium"
                            >
                              {listNegara.map((n) => (
                                <option key={n} value={n} className="text-gray-900">{n}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Provinsi
                            </label>
                            <select
                              disabled={formData.negara !== 'Indonesia'}
                              value={formData.provinsi}
                              onChange={(e) => handleChange('provinsi', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer font-medium text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value="" className="text-gray-900">-- Pilih Provinsi --</option>
                              {Object.keys(dataWilayah).map((p) => (
                                <option key={p} value={p} className="text-gray-900">{p}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Kota / Kabupaten
                            </label>
                            <select
                              disabled={formData.negara !== 'Indonesia' || !formData.provinsi}
                              value={formData.kota}
                              onChange={(e) => handleChange('kota', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer font-medium text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value="" className="text-gray-900">-- Pilih Kota / Kabupaten --</option>
                              {optionsKota.map((k) => (
                                <option key={k} value={k} className="text-gray-900">{k}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Kecamatan
                            </label>
                            <select
                              disabled={formData.negara !== 'Indonesia' || !formData.kota}
                              value={formData.kecamatan}
                              onChange={(e) => handleChange('kecamatan', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer font-medium text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            >
                              <option value="" className="text-gray-900">-- Pilih Kecamatan --</option>
                              {optionsKecamatan.map((kec) => (
                                <option key={kec} value={kec} className="text-gray-900">{kec}</option>
                              ))}
                            </select>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Desa / Kelurahan
                            </label>
                            <input
                              type="text"
                              value={formData.kelurahan}
                              onChange={(e) => handleChange('kelurahan', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 font-medium"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Dusun
                            </label>
                            <input
                              type="text"
                              value={formData.dusun}
                              onChange={(e) => handleChange('dusun', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 font-medium"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Alamat
                            </label>
                            <input
                              type="text"
                              value={formData.alamat}
                              onChange={(e) => handleChange('alamat', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 font-medium"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              RT
                            </label>
                            <input
                              type="text"
                              value={formData.rt}
                              onChange={(e) => handleChange('rt', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 font-medium"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              RW
                            </label>
                            <input
                              type="text"
                              value={formData.rw}
                              onChange={(e) => handleChange('rw', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 font-medium"
                            />
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Kodepos
                            </label>
                            <input
                              type="text"
                              value={formData.kodePos}
                              onChange={(e) => handleChange('kodePos', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SUB-TAB PESANTREN */}
                    {activeBottomTab === 'Pesantren' && (
                      <div className="p-4 border border-gray-200 rounded-sm bg-white grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3.5 text-[13px]">

                        {/* SISI KIRI PESANTREN */}
                        <div className="space-y-3">
                          {/* Pernah Pesantren ? */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Pernah Pesantren ?
                            </label>
                            <div className="flex-1 flex items-center h-[34px]">
                              <input
                                type="checkbox"
                                checked={formData.pernahPesantren}
                                onChange={(e) => handleChange('pernahPesantren', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 text-[#004b87] cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Nama Pesantren */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Nama Pesantren
                            </label>
                            <input
                              type="text"
                              value={formData.namaPesantren}
                              onChange={(e) => handleChange('namaPesantren', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>
                        </div>

                        {/* SISI KANAN PESANTREN */}
                        <div className="space-y-3">
                          {/* Berapa Tahun? */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Berapa Tahun?
                            </label>
                            <input
                              type="text"
                              value={formData.berapaTahun}
                              onChange={(e) => handleChange('berapaTahun', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>

                          {/* Alamat Pesantren */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Alamat Pesantren
                            </label>
                            <input
                              type="text"
                              value={formData.alamatPesantren}
                              onChange={(e) => handleChange('alamatPesantren', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900"
                            />
                          </div>
                        </div>

                      </div>
                    )}

                    {/* SUB-TAB PEKERJAAN (FULL FIX DROPDOWN DARI GAMBAR SIAKAD UIKA BOGOR) */}
                    {activeBottomTab === 'Pekerjaan' && (
                      <div className="p-4 border border-gray-200 rounded-sm bg-white grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-3.5 text-[13px]">

                        {/* SISI KIRI PEKERJAAN */}
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Pekerjaan
                            </label>
                            <select
                              value={formData.pekerjaan}
                              onChange={(e) => handleChange('pekerjaan', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white cursor-pointer text-gray-900 font-medium"
                            >
                              <option value="">-- Pilih Pekerjaan Anda --</option>
                              {listPekerjaan.map((p) => (
                                <option key={p} value={p}>{p}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* SISI KANAN PEKERJAAN */}
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <label className="sm:w-36 text-[#337ab7] font-bold shrink-0">
                              Instansi Pekerjaan
                            </label>
                            <input
                              type="text"
                              value={formData.instansiPekerjaan}
                              onChange={(e) => handleChange('instansiPekerjaan', e.target.value)}
                              placeholder="Instansi Tempat Anda Bekerja"
                              className="flex-1 border border-gray-300 rounded-sm px-3 py-1.5 text-[13px] outline-none focus:border-[#004b87] bg-white text-gray-900 placeholder-gray-400"
                            />
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                </>
              )}

              {/* TAB PILIHAN PRODI */}
              {activeSidebarTab === 'Pilihan Prodi' && (
                <div className="p-6 border border-gray-200 rounded-sm bg-white space-y-4">
                  <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Pilihan Program Studi
                  </h3>
                  <div className="space-y-3 max-w-xl text-[13px]">
                    <div className="flex items-center gap-4">
                      <label className="w-28 font-medium text-gray-800">Pilihan 1</label>
                      <select className="flex-1 border border-gray-300 rounded-sm px-3 py-2 outline-none text-gray-800">
                        <option>-- Pilih Program Studi 1 --</option>
                        <option>S1 - Manajemen</option>
                        <option>S1 - Bisnis Digital</option>
                        <option>S1 - Teknik Informatika</option>
                        <option>S1 - Sistem Informasi</option>
                        <option>S1 - Pendidikan Agama Islam</option>
                        <option>S1 - Hukum Keluarga Islam</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="w-28 font-medium text-gray-800">Pilihan 2</label>
                      <select className="flex-1 border border-gray-300 rounded-sm px-3 py-2 outline-none text-gray-800">
                        <option>-- Pilih Program Studi 2 --</option>
                        <option>S1 - Manajemen</option>
                        <option>S1 - Bisnis Digital</option>
                        <option>S1 - Akuntansi</option>
                        <option>S1 - Teknik Sipil</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="w-28 font-medium text-gray-800">Pilihan 3</label>
                      <select className="flex-1 border border-gray-300 rounded-sm px-3 py-2 outline-none text-gray-800">
                        <option>-- Pilih Program Studi 3 --</option>
                        <option>S1 - Pendidikan Matematika</option>
                        <option>S1 - Ilmu Komunikasi</option>
                        <option>S1 - Gizi</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB KELUARGA */}
              {activeSidebarTab === 'Keluarga' && (
                <div className="p-6 border border-gray-200 rounded-sm bg-white space-y-4">
                  <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Data Keluarga & Orang Tua / Wali
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[13px]">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Data Ayah</h4>
                      <input type="text" placeholder="Nama Ayah" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                      <input type="text" placeholder="NIK Ayah" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                      <input type="text" placeholder="Pekerjaan Ayah" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Data Ibu</h4>
                      <input type="text" placeholder="Nama Ibu" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                      <input type="text" placeholder="NIK Ibu" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                      <input type="text" placeholder="Pekerjaan Ibu" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB PENDIDIKAN */}
              {activeSidebarTab === 'Pendidikan' && (
                <div className="p-6 border border-gray-200 rounded-sm bg-white space-y-4">
                  <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Riwayat Pendidikan Terakhir
                  </h3>
                  <div className="space-y-3 max-w-xl text-[13px]">
                    <input type="text" placeholder="Nama Sekolah / Kampus Asal" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                    <input type="text" placeholder="Jurusan" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                    <input type="text" placeholder="Tahun Lulus" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                    <input type="text" placeholder="Nilai Rata-rata / IPK" className="w-full border border-gray-300 rounded-sm px-3 py-2 text-gray-800" />
                  </div>
                </div>
              )}

              {/* TAB RIWAYAT KEUANGAN */}
              {activeSidebarTab === 'Riwayat Keuangan' && (
                <div className="p-6 border border-gray-200 rounded-sm bg-white space-y-4">
                  <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Riwayat Tagihan & Pembayaran
                  </h3>
                  <p className="text-[13px] text-gray-500">Belum ada transaksi pembayaran yang tercatat untuk pendaftar ini.</p>
                </div>
              )}

              {/* TAB SELEKSI PENDAFTARAN */}
              {activeSidebarTab === 'Seleksi Pendaftaran' && (
                <div className="p-6 border border-gray-200 rounded-sm bg-white space-y-4">
                  <h3 className="text-[16px] font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Nilai & Hasil Seleksi Pendaftaran
                  </h3>
                  <p className="text-[13px] text-gray-500">Hasil tes seleksi atau verifikasi berkas belum dimasukkan.</p>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DataPendaftar;