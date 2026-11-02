// Data Master Asesor RPL
export const INITIAL_ASESOR_DATA = [
  {
    id: 1,
    nidn: '0412038501',
    nama: 'Dr. H. Ahmad Fauzi, M.Pd.I.',
    prodi: 'S2 - Pendidikan Agama Islam (S2)',
    fakultas: 'Fakultas Agama Islam',
    noSk: 'SK-ASESOR/UIKA/2025/089',
    sertifikat: 'BNSP-RPL-2024-0012',
    status: 'Aktif',
    totalAsesmen: 14
  },
  {
    id: 2,
    nidn: '0425087802',
    nama: 'Dr. Imas Maesaroh, M.Si.',
    prodi: 'S1 - Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Sains',
    noSk: 'SK-ASESOR/UIKA/2025/090',
    sertifikat: 'BNSP-RPL-2024-0045',
    status: 'Aktif',
    totalAsesmen: 22
  },
  {
    id: 3,
    nidn: '0415068203',
    nama: 'Prof. Dr. H. Hendri Tanjung, Ph.D.',
    prodi: 'S2 - Ekonomi Syariah (S2)',
    fakultas: 'Sekolah Pascasarjana',
    noSk: 'SK-ASESOR/UIKA/2025/091',
    sertifikat: 'BNSP-RPL-2023-0118',
    status: 'Aktif',
    totalAsesmen: 18
  },
  {
    id: 4,
    nidn: '0403118904',
    nama: 'Budi Hartono, M.Kom.',
    prodi: 'S1 - Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Sains',
    noSk: 'SK-ASESOR/UIKA/2025/092',
    sertifikat: 'BNSP-RPL-2025-0008',
    status: 'Aktif',
    totalAsesmen: 9
  },
  {
    id: 5,
    nidn: '0418047901',
    nama: 'Dra. Hj. Siti Nurhasanah, M.M.',
    prodi: 'S1 - Manajemen',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    noSk: 'SK-ASESOR/UIKA/2024/044',
    sertifikat: 'BNSP-RPL-2023-0092',
    status: 'Tidak Aktif',
    totalAsesmen: 31
  }
];

// Data Seleksi RPL
export const INITIAL_SELEKSI_RPL_DATA = [
  {
    id: 1,
    noPendaftaran: 'RPL202601001',
    nama: 'Ubaidillah, S.Pd.',
    nik: '3201010802000001',
    prodi: 'S2 - Pendidikan Agama Islam (S2)',
    jalur: 'RPL Tipe A (Perolehan SKS)',
    tahap: 'Asesmen Portofolio',
    asesor: 'Dr. H. Ahmad Fauzi, M.Pd.I.',
    berkasStatus: 'Lengkap',
    sksDiajukan: 44,
    sksDiakui: 18,
    statusSeleksi: 'Lulus Seleksi RPL',
    tglUpdate: '28 Okt 2026'
  },
  {
    id: 2,
    noPendaftaran: 'RPL202601002',
    nama: 'Ricka Krisnawati, S.E.',
    nik: '3201014112560007',
    prodi: 'S2 - Ekonomi Syariah (S2)',
    jalur: 'RPL Tipe A (Perolehan SKS)',
    tahap: 'Sidang Asesmen CPMK',
    asesor: 'Prof. Dr. H. Hendri Tanjung, Ph.D.',
    berkasStatus: 'Lengkap',
    sksDiajukan: 40,
    sksDiakui: 16,
    statusSeleksi: 'Menunggu Review Asesor',
    tglUpdate: '27 Okt 2026'
  },
  {
    id: 3,
    noPendaftaran: 'RPL202601003',
    nama: 'Ahmad Sogi Nugraha',
    nik: '3201014112560006',
    prodi: 'S1 - Teknik Informatika',
    jalur: 'RPL Tipe A (Transfer SKS & Portofolio)',
    tahap: 'Verifikasi Berkas',
    asesor: 'Dr. Imas Maesaroh, M.Si.',
    berkasStatus: 'Perlu Perbaikan',
    sksDiajukan: 72,
    sksDiakui: 0,
    statusSeleksi: 'Perbaikan Berkas',
    tglUpdate: '26 Okt 2026'
  },
  {
    id: 4,
    noPendaftaran: 'RPL202601004',
    nama: 'Aenul Yakin Maulana',
    nik: '3201014112560005',
    prodi: 'S1 - Manajemen',
    jalur: 'RPL Tipe A (Perolehan SKS)',
    tahap: 'Penetapan Kelulusan',
    asesor: 'Dra. Hj. Siti Nurhasanah, M.M.',
    berkasStatus: 'Lengkap',
    sksDiajukan: 60,
    sksDiakui: 42,
    statusSeleksi: 'Lulus Seleksi RPL',
    tglUpdate: '25 Okt 2026'
  },
  {
    id: 5,
    noPendaftaran: 'RPL202601005',
    nama: 'M. Rizky Ramadhan',
    nik: '3201014112560010',
    prodi: 'S1 - Teknik Informatika',
    jalur: 'RPL Tipe A (Pengalaman Kerja > 3 Thn)',
    tahap: 'Asesmen Portofolio',
    asesor: 'Budi Hartono, M.Kom.',
    berkasStatus: 'Lengkap',
    sksDiajukan: 48,
    sksDiakui: 24,
    statusSeleksi: 'Sedang Diasesmen',
    tglUpdate: '24 Okt 2026'
  }
];

// Data Rekapitulasi Pendaftar RPL per Program Studi
export const REKAP_PENDAFTAR_RPL_DATA = [
  {
    id: 1,
    prodi: 'S1 - Pendidikan Agama Islam',
    fakultas: 'Fakultas Agama Islam',
    jenjang: 'S1',
    dayaTampung: 40,
    pendaftar: 28,
    berkasLengkap: 26,
    lulusAsesmen: 22,
    daftarUlang: 19
  },
  {
    id: 2,
    prodi: 'S1 - Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Sains',
    jenjang: 'S1',
    dayaTampung: 50,
    pendaftar: 42,
    berkasLengkap: 38,
    lulusAsesmen: 34,
    daftarUlang: 30
  },
  {
    id: 3,
    prodi: 'S1 - Manajemen',
    fakultas: 'Fakultas Ekonomi dan Bisnis',
    jenjang: 'S1',
    dayaTampung: 45,
    pendaftar: 35,
    berkasLengkap: 31,
    lulusAsesmen: 27,
    daftarUlang: 24
  },
  {
    id: 4,
    prodi: 'S2 - Pendidikan Agama Islam (S2)',
    fakultas: 'Sekolah Pascasarjana',
    jenjang: 'S2',
    dayaTampung: 30,
    pendaftar: 24,
    berkasLengkap: 24,
    lulusAsesmen: 20,
    daftarUlang: 18
  },
  {
    id: 5,
    prodi: 'S2 - Ekonomi Syariah (S2)',
    fakultas: 'Sekolah Pascasarjana',
    jenjang: 'S2',
    dayaTampung: 25,
    pendaftar: 16,
    berkasLengkap: 15,
    lulusAsesmen: 13,
    daftarUlang: 12
  }
];

// Data Sinkronisasi SIERRA Kemdiktisaintek
export const SIERRA_RPL_DATA = [
  {
    id: 1,
    kodeProdi: '74201',
    namaProdi: 'S1 - Pendidikan Agama Islam',
    jenjang: 'S1',
    jenisRpl: 'Tipe A (Perolehan SKS)',
    kuotaSierra: 40,
    terlaporSierra: 22,
    statusSync: 'Tersinkronisasi',
    tglSync: '28 Okt 2026, 10:14 WIB',
    noRegistrasiSierra: 'SIERRA-UIKA-2026-0081'
  },
  {
    id: 2,
    kodeProdi: '55201',
    namaProdi: 'S1 - Teknik Informatika',
    jenjang: 'S1',
    jenisRpl: 'Tipe A (Perolehan SKS)',
    kuotaSierra: 50,
    terlaporSierra: 34,
    statusSync: 'Tersinkronisasi',
    tglSync: '28 Okt 2026, 10:16 WIB',
    noRegistrasiSierra: 'SIERRA-UIKA-2026-0082'
  },
  {
    id: 3,
    kodeProdi: '61201',
    namaProdi: 'S1 - Manajemen',
    jenjang: 'S1',
    jenisRpl: 'Tipe A (Perolehan SKS)',
    kuotaSierra: 45,
    terlaporSierra: 27,
    statusSync: 'Tersinkronisasi',
    tglSync: '28 Okt 2026, 10:19 WIB',
    noRegistrasiSierra: 'SIERRA-UIKA-2026-0083'
  },
  {
    id: 4,
    kodeProdi: '74101',
    namaProdi: 'S2 - Pendidikan Agama Islam (S2)',
    jenjang: 'S2',
    jenisRpl: 'Tipe A (Perolehan SKS)',
    kuotaSierra: 30,
    terlaporSierra: 20,
    statusSync: 'Tersinkronisasi',
    tglSync: '28 Okt 2026, 10:22 WIB',
    noRegistrasiSierra: 'SIERRA-UIKA-2026-0084'
  },
  {
    id: 5,
    kodeProdi: '61101',
    namaProdi: 'S2 - Ekonomi Syariah (S2)',
    jenjang: 'S2',
    jenisRpl: 'Tipe A (Perolehan SKS)',
    kuotaSierra: 25,
    terlaporSierra: 13,
    statusSync: 'Menunggu Validasi',
    tglSync: '27 Okt 2026, 16:40 WIB',
    noRegistrasiSierra: 'SIERRA-UIKA-2026-0085'
  }
];

// Data SK Penerimaan Mahasiswa RPL
export const SK_PENERIMAAN_RPL_DATA = [
  {
    id: 1,
    noSk: '048/SK-REK/UIKA/IX/2026',
    perihal: 'Penetapan Kelulusan Seleksi Penerimaan Mahasiswa Baru Jalur RPL Gelombang 1 TA 2026/2027',
    tglSk: '15 September 2026',
    penandatangan: 'Prof. Dr. H. E. Mujahidin, M.Si. (Rektor)',
    totalMahasiswa: 68,
    filePdf: 'SK_RPL_Gelombang_1_2026.pdf'
  },
  {
    id: 2,
    noSk: '062/SK-REK/UIKA/X/2026',
    perihal: 'Penetapan Kelulusan Seleksi Penerimaan Mahasiswa Baru Jalur RPL Gelombang 2 TA 2026/2027',
    tglSk: '20 Oktober 2026',
    penandatangan: 'Prof. Dr. H. E. Mujahidin, M.Si. (Rektor)',
    totalMahasiswa: 45,
    filePdf: 'SK_RPL_Gelombang_2_2026.pdf'
  },
  {
    id: 3,
    noSk: '012/SK-REK/UIKA/II/2026',
    perihal: 'Penetapan Kelulusan Seleksi Penerimaan Mahasiswa Baru Jalur RPL Semester Genap TA 2025/2026',
    tglSk: '18 Februari 2026',
    penandatangan: 'Prof. Dr. H. E. Mujahidin, M.Si. (Rektor)',
    totalMahasiswa: 52,
    filePdf: 'SK_RPL_Genap_2025_2026.pdf'
  }
];

// Data Hasil Penilaian Seleksi RPL
export const HASIL_PENILAIAN_RPL_DATA = [
  {
    id: 1,
    noPeserta: 'RPL202601001',
    nama: 'Ubaidillah, S.Pd.',
    prodi: 'S2 - Pendidikan Agama Islam (S2)',
    nilaiPortofolio: 88.5,
    nilaiWawancara: 85.0,
    nilaiAkhir: 86.75,
    sksDiakui: 18,
    rekomendasi: 'Diterima RPL',
    asesor: 'Dr. H. Ahmad Fauzi, M.Pd.I.',
    catatan: 'Portofolio pengalaman mengajar dan karya ilmiah memenuhi kriteria capaian CPMK.'
  },
  {
    id: 2,
    noPeserta: 'RPL202601002',
    nama: 'Ricka Krisnawati, S.E.',
    prodi: 'S2 - Ekonomi Syariah (S2)',
    nilaiPortofolio: 82.0,
    nilaiWawancara: 84.0,
    nilaiAkhir: 83.00,
    sksDiakui: 16,
    rekomendasi: 'Diterima RPL',
    asesor: 'Prof. Dr. H. Hendri Tanjung, Ph.D.',
    catatan: 'Sertifikat kompetensi perbankan syariah diakui untuk 4 mata kuliah keahlian.'
  },
  {
    id: 3,
    noPeserta: 'RPL202601003',
    nama: 'Ahmad Sogi Nugraha',
    prodi: 'S1 - Teknik Informatika',
    nilaiPortofolio: 65.0,
    nilaiWawancara: 70.0,
    nilaiAkhir: 67.50,
    sksDiakui: 0,
    rekomendasi: 'Perbaikan Berkas',
    asesor: 'Dr. Imas Maesaroh, M.Si.',
    catatan: 'Bukti sertifikasi kompetensi industri belum melampirkan transkrip silabus.'
  },
  {
    id: 4,
    noPeserta: 'RPL202601004',
    nama: 'Aenul Yakin Maulana',
    prodi: 'S1 - Manajemen',
    nilaiPortofolio: 91.0,
    nilaiWawancara: 89.5,
    nilaiAkhir: 90.25,
    sksDiakui: 42,
    rekomendasi: 'Diterima RPL',
    asesor: 'Dra. Hj. Siti Nurhasanah, M.M.',
    catatan: 'Pengalaman manajerial > 7 tahun dan portofolio laporan tahunan diakui penuh.'
  },
  {
    id: 5,
    noPeserta: 'RPL202601005',
    nama: 'M. Rizky Ramadhan',
    prodi: 'S1 - Teknik Informatika',
    nilaiPortofolio: 78.5,
    nilaiWawancara: 80.0,
    nilaiAkhir: 79.25,
    sksDiakui: 24,
    rekomendasi: 'Diterima RPL',
    asesor: 'Budi Hartono, M.Kom.',
    catatan: 'Portofolio pengembangan web fullstack mengonversi mata kuliah praktikum & pemrograman.'
  }
];

