// Opsi Filter
export const PERIODE_OPTIONS = [
  '2026 Genap',
  '2026 Ganjil',
  '2025 Genap',
  '2025 Ganjil',
  '2024 Genap',
  '2024 Ganjil'
];

export const TAHUN_KURIKULUM_OPTIONS = [
  '-- Semua Tahun Kurikulum --',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020'
];

export const JENJANG_OPTIONS = [
  '-- Semua Jenjang --',
  'S1',
  'S2',
  'S3',
  'Prof',
  'D3'
];

export const STATUS_CPMK_OPTIONS = [
  '-- Semua Status CPMK --',
  'Belum Terisi',
  'Sudah Terisi'
];

export const UNIT_OPTIONS = [
  'Universitas Ibn Khaldun',
  'Fakultas Keguruan dan Ilmu Pendidikan',
  'Fakultas Hukum',
  'Fakultas Ekonomi dan Bisnis',
  'Fakultas Agama Islam',
  'Fakultas Teknik dan Sains',
  'Sekolah Pascasarjana',
  'Fakultas Ilmu Kesehatan'
];

// Data Hirarki Lengkap Kesiapan RPL Sesuai SIAKAD UIKA: Universitas -> Fakultas -> Program Studi
export const INITIAL_KESIAPAN_DATA = [
  // 1. FAKULTAS KEGURUAN DAN ILMU PENDIDIKAN
  {
    fakultasId: 'FKIP',
    fakultasNama: 'Fakultas Keguruan dan Ilmu Pendidikan',
    prodiList: [
      {
        id: 'FKIP-01',
        nama: 'S1 - Pendidikan Vokasional Desain Fashion',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FKIP-02',
        nama: 'S1 - Pendidikan Matematika',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FKIP-03',
        nama: 'S1 - Teknologi Pendidikan',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FKIP-04',
        nama: 'S1 - Pendidikan Masyarakat',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FKIP-05',
        nama: 'Prof - Pendidikan Profesi Guru',
        jenjang: 'Prof',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FKIP-06',
        nama: 'S1 - Pendidikan Bahasa Inggris',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  },

  // 2. FAKULTAS HUKUM
  {
    fakultasId: 'FH',
    fakultasNama: 'Fakultas Hukum',
    prodiList: [
      {
        id: 'FH-01',
        nama: 'S2 - Hukum Bisnis (S2)',
        jenjang: 'S2',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FH-02',
        nama: 'S1 - Ilmu Hukum',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  },

  // 3. FAKULTAS EKONOMI DAN BISNIS
  {
    fakultasId: 'FEB',
    fakultasNama: 'Fakultas Ekonomi dan Bisnis',
    prodiList: [
      {
        id: 'FEB-01',
        nama: 'S1 - Manajemen',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FEB-02',
        nama: 'S1 - Bisnis Digital',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FEB-03',
        nama: 'S1 - Akuntansi',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FEB-04',
        nama: 'S1 - Perdagangan Internasional',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  },

  // 4. FAKULTAS AGAMA ISLAM
  {
    fakultasId: 'FAI',
    fakultasNama: 'Fakultas Agama Islam',
    prodiList: [
      {
        id: 'FAI-01',
        nama: 'S1 - Pendidikan Agama Islam',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-02',
        nama: 'S1 - Ahwal Al-Syakhshiyyah',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-03',
        nama: 'S1 - Ekonomi Syariah',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-04',
        nama: 'S1 - Manajemen Haji Dan Umroh',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-05',
        nama: 'S1 - Bimbingan Dan Konseling Pendidikan Islam',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-06',
        nama: 'S1 - Komunikasi Dan Penyiaran Islam',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-07',
        nama: 'S1 - Hukum Keluarga Islam',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-08',
        nama: "S1 - Ilmu Al-Qur'an Dan Tafsir",
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FAI-09',
        nama: 'S1 - Pendidikan Guru Madrasah Ibtidaiyah',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  },

  // 5. FAKULTAS TEKNIK DAN SAINS
  {
    fakultasId: 'FTS',
    fakultasNama: 'Fakultas Teknik dan Sains',
    prodiList: [
      {
        id: 'FTS-01',
        nama: 'S1 - Teknik Elektro',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FTS-02',
        nama: 'S1 - Teknik Mesin',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FTS-03',
        nama: 'S1 - Teknik Sipil',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FTS-04',
        nama: 'S1 - Ilmu Lingkungan',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FTS-05',
        nama: 'S1 - Rekayasa Pertanian Dan Biosistem',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FTS-06',
        nama: 'S1 - Teknik Informatika',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FTS-07',
        nama: 'S1 - Sistem Informasi',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  },

  // 6. SEKOLAH PASCASARJANA
  {
    fakultasId: 'PASCA',
    fakultasNama: 'Sekolah Pascasarjana',
    prodiList: [
      {
        id: 'PASCA-01',
        nama: 'S3 - Ekonomi Syariah (S3)',
        jenjang: 'S3',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'PASCA-02',
        nama: 'S2 - Ekonomi Syariah (S2)',
        jenjang: 'S2',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'PASCA-03',
        nama: 'S2 - Manajemen (S2)',
        jenjang: 'S2',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'PASCA-04',
        nama: 'S2 - Komunikasi Dan Penyiaran Islam (S2)',
        jenjang: 'S2',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'PASCA-05',
        nama: 'S3 - Pendidikan Agama Islam (S3)',
        jenjang: 'S3',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'PASCA-06',
        nama: 'S2 - Teknologi Pendidikan (S2)',
        jenjang: 'S2',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'PASCA-07',
        nama: 'S2 - Pendidikan Agama Islam (S2)',
        jenjang: 'S2',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  },

  // 7. FAKULTAS ILMU KESEHATAN (Termasuk S1 - Gizi Sesuai Permintaan)
  {
    fakultasId: 'FIK',
    fakultasNama: 'Fakultas Ilmu Kesehatan',
    prodiList: [
      {
        id: 'FIK-01',
        nama: 'S1 - Kesehatan Masyarakat',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      },
      {
        id: 'FIK-02',
        nama: 'S1 - Gizi',
        jenjang: 'S1',
        kurikulum: '',
        mataKuliahKonversi: '0 Mata Kuliah (0 SKS)',
        sksTotal: 0,
        sksWajib: 0,
        sksPilihan: 0,
        statusCpmk: 'Belum Terisi',
        tahunKurikulum: '2024'
      }
    ]
  }
];
