import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchableSelect from '../../components/ui/SearchableSelect'; 

const Pendaftar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // State Tampilkan Panduan
  const [showPanduan, setShowPanduan] = useState(true);
  
  // 🔥 State untuk nilai Filter
  const [periode, setPeriode] = useState('-- Semua Periode --');
  const [jenjang, setJenjang] = useState('-- Semua Jenjang --');
  const [jalur, setJalur] = useState('-- Semua Jalur Pendaftaran --');
  const [gelombang, setGelombang] = useState('-- Semua Gelombang --');
  const [sistemKuliah, setSistemKuliah] = useState('-- Semua Sistem Kuliah --');
  const [prodi, setProdi] = useState('-- Semua Unit / Program Studi --');
  const [statusPendaftar, setStatusPendaftar] = useState('-- Semua Status Pendaftar --');
  const [pilihan, setPilihan] = useState('-- Semua Pilihan --');

  // 🔥 Daftar Opsi
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
  const jenjangOptions = ["-- Semua Jenjang --", "D3 - Diploma 3", "D4 - Sarjana Terapan", "S1 - Strata 1", "Prof - Profesi", "S2 - Strata 2", "S3 - Strata 3"];
  const jalurOptions = ["-- Semua Jalur Pendaftaran --", "Jalur Reguler (Ujian Mandiri)", "Jalur Beasiswa KIP", "Jalur Prestasi", "Jalur Alih Jenjang / Pindahan", "Jalur Pascasarjana & Profesi"];
  const gelombangOptions = ["-- Semua Gelombang --", "Gelombang 1", "Gelombang 2", "Gelombang 3", "KIP A", "KIP B", "KIP C"];
  const sistemKuliahOptions = ["-- Semua Sistem Kuliah --", "Reguler", "Karyawan", "Karyawan RPL YAPE"];
  const statusPendaftarOptions = ["-- Semua Status Pendaftar --", "Lulus", "Belum Lulus", "Sudah Daftar Ulang", "Belum Daftar Ulang", "Belum Memiliki NIM"];
  const pilihanOptions = ["-- Semua Pilihan --", "Pilihan 1", "Pilihan 2", "Pilihan 3"];

  const prodiOptions = [
    "-- Semua Unit / Program Studi --",
    "Universitas Ibn Khaldun",
    "-- Fakultas Keguruan Dan Ilmu Pendidikan",
     "--- S1 - Pendidikan Vokasional Desain Fashion",
     "--- S1 - Pendidikan Matematika",
     "--- S1 - Teknologi Pendidikan",
     "--- S1 - Pendidikan Masyarakat",
     "--- Prof - Pendidikan Profesi Guru",
     "--- S1 - Pendidikan Bahasa Inggris",
    "-- Fakultas Hukum",
     "--- S2 - Hukum Bisnis (2)",
     "--- S1 - Ilmu Hukum",
    "-- Fakultas Ekonomi Dan Bisnis",
     "--- S1 - Manajemen",
     "--- S1 - Bisnis Digital",
     "--- S1 - Akuntansi",
     "--- S1 - Perdangan Internasional",
    "-- Fakultas Agama Islam",
     "--- S1 - Ekonomi Syariah",
     "--- S1 - Manajemen Haji Dan Umroh",
     "--- S1 - Bimbingan Dan Konseling Pendidikan Islam",
     "--- S1 - Komunikasi Dan Penyiaran Islam",
     "--- S1 - Hukum Keluarga Islam",
     "--- S1 - Ilmu Al-Qur'an Dan Tafsir",
     "--- S1 - Pendidikan Agama Islam",
     "--- S1 - Pendidikan Guru Madrasah Ibtidaiyah",
    "-- Fakultas Teknik Dan Sains",
     "--- S1 - Teknik Elektro",
     "--- S1 - Teknik Mesin",
     "--- S1 - Teknik Sipil",
     "--- S1 - Ilmu Lingkungan",
     "--- S1 - Rekayasa Pertanian Dan Biosistem",
     "--- S1 - Teknik Informatika",
     "--- S1 - Sistem Informasi",
    "-- Sekolah Pascasarjana",
     "--- S3 - Ekonomi Syariah (S3)",
     "--- S2 - Ekonomi Syariah (S2)",
     "--- S2 - Manajemen (S2)",
     "--- S2 - Komunikasi Dan Penyiaran Islam (S2)",
     "--- S3 - Pendidikan Agama Islam (S3)",
     "--- S2 - Teknologi Pendidikan(S2)",
     "--- S2 - Pendidikan Agama Islam (S2)",
    "-- Fakultas Ilmu Kesehatan",
     "--- S1 - Kesehatan Masyarakat",
     "--- S1 - Gizi",
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Data dummy pendaftar
  const pendaftarData = [
    {
      id: 1,
      foto: 'AE',
      nama: 'AWALUDIN FAHMI',
      kode: '4112550031',
      jalur: '2025 Ganjil - Gelombang 3',
      prodi: 'S1 - Teknologi Pendidikan',
      status: ['Lulus', 'Sudah Daftar Ulang', 'Belum Memiliki NIM'],
      email: 'udinfahmiawal@gmail.com',
      telepon: '089515319147'
    }
  ];

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
          
          <div className="flex gap-3">
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-[13px] font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-2 border-t-[#f59e0b] rounded-md p-5 shadow-sm relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            
            {/* Kiri */}
            <div className="space-y-3">
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
                  <SearchableSelect options={prodiOptions} value={prodi} onChange={setProdi} placeholder="Pilih Program Studi..." />
                </div>
              </div>
              <div className="flex items-center gap-3 relative z-20">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Pilihan</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={pilihanOptions} value={pilihan} onChange={setPilihan} placeholder="Pilih Pilihan..." />
                </div>
              </div>
            </div>

            {/* Kanan */}
            <div className="space-y-3">
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
              <div className="flex items-center gap-3 relative z-0">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Status Pendaftar</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={statusPendaftarOptions} value={statusPendaftar} onChange={setStatusPendaftar} placeholder="Pilih Status..." />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TABEL PENDAFTAR */}
        <div className="w-full bg-white rounded-md shadow-sm border-t-2 border-t-[#10b981] p-4">
          
          {/* Toolbar Atas */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <select className="border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none">
                <option>-- Semua --</option>
              </select>
              <input type="text" placeholder="Cari Pendaftar" className="border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none w-[200px]" />
              <button className="bg-[#10b981] text-white p-1.5 rounded-sm hover:bg-[#059669]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
              <button className="bg-[#6366f1] text-white p-1.5 rounded-sm hover:bg-[#4f46e5]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg></button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> Tambah</button>
              <button className="flex items-center gap-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Hapus</button>
              <button className="flex items-center gap-1.5 bg-[#f59e0b] hover:bg-[#d97706] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> Aksi <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></button>
              <button className="flex items-center gap-1.5 bg-[#06b6d4] hover:bg-[#0891b2] text-white px-3 py-1.5 rounded-sm text-[13px] font-medium transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> Leads Maukuliah</button>
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto border border-gray-200 rounded-sm">
            <table className="w-full text-left text-[13px] text-gray-700">
              <thead className="bg-[#1e40af] text-white">
                <tr>
                  <th className="px-3 py-3 w-10 text-center"><input type="checkbox" className="accent-blue-600" /></th>
                  <th className="px-3 py-3 font-semibold text-center border-l border-blue-800">Foto Pendaftar</th>
                  <th className="px-3 py-3 font-semibold border-l border-blue-800">Nama & Kode Pendaftar</th>
                  <th className="px-3 py-3 font-semibold border-l border-blue-800">Jalur Pendaftaran</th>
                  <th className="px-3 py-3 font-semibold border-l border-blue-800">Program Studi</th>
                  <th className="px-3 py-3 font-semibold border-l border-blue-800 text-center">Status Pendaftar</th>
                  <th className="px-3 py-3 font-semibold border-l border-blue-800">Kontak</th>
                  <th className="px-3 py-3 font-semibold border-l border-blue-800 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pendaftarData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-3 py-3 text-center"><input type="checkbox" /></td>
                    <td className="px-3 py-3 flex justify-center">
                      <div className="w-12 h-12 bg-[#6b2d2d] text-white flex items-center justify-center rounded-sm font-bold text-lg">
                        {item.foto}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-[#1e40af] font-bold">{item.nama}</p>
                      <p className="text-gray-500 text-[12px]">{item.kode}</p>
                    </td>
                    <td className="px-3 py-3 font-medium">
                      {item.jalur}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-start gap-2">
                        <span className="bg-[#10b981] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm mt-0.5">1</span>
                        <span>{item.prodi}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="bg-[#10b981] text-white text-[11px] px-2 py-0.5 rounded-sm">{item.status[0]}</span>
                        <span className="bg-[#10b981] text-white text-[11px] px-2 py-0.5 rounded-sm">{item.status[1]}</span>
                        <span className="bg-[#ef4444] text-white text-[11px] px-2 py-0.5 rounded-sm">{item.status[2]}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex flex-col gap-1 text-[#1e40af]">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          <span>{item.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          <span>{item.telepon}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div className="flex justify-center gap-1.5">
                        <button className="bg-[#38bdf8] hover:bg-[#0284c7] text-white p-1.5 rounded-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
                        <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white p-1.5 rounded-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
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

export default Pendaftar;