// Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SearchableSelect from '../../components/ui/SearchableSelect';
import StatCard from '../../components/ui/StatCard';
import PendaftarChart from '../../components/ui/PendaftarChart';
import TabelInfoGrafik from '../../components/ui/TabelInfoGrafik';
import TabelFunnelPendaftaran from '../../components/ui/TabelFunnelPendaftaran';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showPanduan, setShowPanduan] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);

  // 🔥 STATE UNTUK POP-UP RESET
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('Statistik');

  const [periode, setPeriode] = useState('2027 Genap');
  const [jenjang, setJenjang] = useState('-- Semua Jenjang --');
  const [jalur, setJalur] = useState('-- Semua Jalur Pendaftaran --');
  const [gelombang, setGelombang] = useState('-- Semua Gelombang --');
  const [sistemKuliah, setSistemKuliah] = useState('-- Semua Sistem Kuliah --');
  const [prodi, setProdi] = useState('-- Semua Unit / Program Studi --');

  // 🔥 STATE UNTUK PANDUAN & PROGRESS
  const [panduanData, setPanduanData] = useState([
    { id: 1, title: 'Setting Pendaftaran', desc: 'Pastikan semua data master pendaftaran telah terdata lengkap, termasuk input untuk gelombang, jalur pendaftaran, sistem kuliah, dan jenis program', done: false, loading: false, date: null },
    { id: 2, title: 'Setting Seleksi', desc: 'Silahkan setting seleksi untuk pendaftar.', done: false, loading: false, date: null },
    { id: 3, title: 'Jalur Pendaftaran', desc: 'Silakan buat jalur pendaftaran yang akan dibuka.', done: false, loading: false, date: null },
    { id: 4, title: 'Biaya Formulir', desc: 'Jika berbayar, silakan setting nominal biaya pendaftaran Penerimaan Mahasiswa Baru.', done: false, loading: false, date: null },
    { id: 5, title: 'Prodi yang dibuka', desc: 'Silakan setting Prodi yang dibuka pada tiap jalur Penerimaan Mahasiswa Baru.', done: false, loading: false, date: null },
    { id: 6, title: 'Syarat Pendaftaran', desc: 'Silakan buat syarat yang perlu dilampirkan pendaftar sesuai dengan jalur PMB yang dibuka.', done: false, loading: false, date: null },
    { id: 7, title: 'Jadwal Seleksi', desc: 'Silakan buat jadwal agar pendaftar mengetahui jadwal seleksi PMB.', done: false, loading: false, date: null },
    { id: 8, title: 'Validasi Berkas Pendaftar', desc: 'Silakan lakukan validasi berkas yang sudah dikumpulkan pendaftar.', done: false, loading: false, date: null },
    { id: 9, title: 'Seleksi dan Input Nilai Seleksi', desc: 'Silakan input hasil seleksi pendaftar, dapat berupa nilai atau keterangan.', done: false, loading: false, date: null },
    { id: 10, title: 'Kelulusan/Rekomendasi Prodi', desc: 'Silakan setting rekomendasi Prodi atau kelulusan pendaftar untuk mendata Prodi yang menerima pendaftar.', done: false, loading: false, date: null },
    { id: 11, title: 'Validasi Berkas Daftar Ulang', desc: 'Silakan validasi berkas persyaratan daftar ulang yang telah di-upload pendaftar.', done: false, loading: false, date: null },
    { id: 12, title: 'Generate NIM & Mahasiswa', desc: 'Silakan generate NIM dan ekspor data mahasiswa baru, agar data siap dikirim ke modul akademik.', done: false, loading: false, date: null },
  ]);

  // 🔥 FUNGSI UNTUK MENANGANI CHECKLIST
  const handleChecklist = (id) => {
    setShowSuccessAlert(true);

    setPanduanData((prev) => 
      prev.map((item) => {
        if (item.id === id) {
          if (item.done) {
            return { ...item, done: false, date: null };
          }
          return { ...item, loading: true };
        }
        return item;
      })
    );

    setTimeout(() => {
      setPanduanData((prev) => 
        prev.map((item) => {
          if (item.id === id && item.loading) {
            const now = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
            const formattedDate = now.toLocaleDateString('id-ID', options).replace('.', ':');

            return { ...item, loading: false, done: true, date: `Diselesaikan pada ${formattedDate}` };
          }
          return item;
        })
      );
    }, 1000);
  };

  // 🔥 FUNGSI TANDAI SELESAI SEMUA
  const handleMarkAllDone = () => {
    setShowSuccessAlert(true);
    setPanduanData((prev) => 
      prev.map((item) => {
        if (!item.done) {
          const now = new Date();
          const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
          const formattedDate = now.toLocaleDateString('id-ID', options).replace('.', ':');
          return { ...item, done: true, loading: false, date: `Diselesaikan pada ${formattedDate}` };
        }
        return item;
      })
    );
  };

  // 🔥 FUNGSI EKSEKUSI RESET
  const executeReset = () => {
    setPanduanData((prev) => 
      prev.map((item) => ({ ...item, done: false, loading: false, date: null }))
    );
    setShowSuccessAlert(true);
    setIsResetModalOpen(false); 
  };

  const generatePeriodeOptions = () => {
    const currentYear = new Date().getFullYear();
    const options = [];
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

  const tabs = [
    'Statistik', 'Info Grafik', 'Funnel Pendaftaran', 'Funnel Bulanan',
    'Mahasiswa', 'Wilayah', 'Sekolah', 'Seleksi', 'Kuesioner', 'Orang Tua'
  ];

  const totalDone = panduanData.filter(item => item.done).length;

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      setToast({ show: true, message: `Selamat datang kembali, ${location.state.userName || 'Admin'}!`, type: 'success' });
      const timer = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">

      {/* TOAST NOTIFIKASI */}
      <div className={`fixed top-5 right-5 z-[100] transition-all duration-500 ease-in-out transform ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}`}>
        <div className="bg-white rounded-lg shadow-xl border-l-4 border-emerald-500 p-4 flex items-center gap-3 min-w-[300px]">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">Login Berhasil!</p>
            <p className="text-gray-500 text-xs mt-0.5">{toast.message}</p>
          </div>
        </div>
      </div>

      {/* OVERLAY GELAP (DRAWER) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 z-[60] transition-opacity" onClick={() => setIsDrawerOpen(false)}></div>
      )}

      {/* 🔥 MODAL POP-UP RESET (EFEK FADE STANDAR) */}
      {isResetModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-fade-in"
          onClick={() => setIsResetModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-[500px] text-center animate-fade-in"
            onClick={(e) => e.stopPropagation()} 
          >
            <h3 className="text-[22px] font-bold text-gray-900 mb-3 leading-snug">
              Yakin ingin reset check list<br />Penerimaan Mahasiswa Baru (PMB)?
            </h3>
            <p className="text-[14px] text-gray-600 mb-8 leading-relaxed px-4">
              Setiap tahapan yang sudah anda tandai selesai akan terhapus, tetapi tidak dengan data yang telah di isi.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setIsResetModalOpen(false)}
                className="px-8 py-2.5 rounded-lg border-2 border-[#3b82f6] text-[#3b82f6] font-bold text-[15px] hover:bg-blue-50 transition-colors w-[160px]"
              >
                Batalkan
              </button>
              <button 
                onClick={executeReset}
                className="px-8 py-2.5 rounded-lg bg-[#3b82f6] text-white font-bold text-[15px] hover:bg-[#2563eb] transition-colors shadow-md w-[160px]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 PANEL SAMPING (DRAWER PANDUAN) */}
      <div className={`fixed top-0 right-0 h-full w-[500px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className={`absolute top-1/2 -translate-y-1/2 -left-10 transition-all duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={() => setIsDrawerOpen(false)} className="bg-[#047857] hover:bg-[#035e44] text-white p-2 rounded-l-lg shadow-lg transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h3 className="text-[22px] font-bold text-gray-900 mb-2">Penerimaan Mahasiswa Baru (PMB)</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">Panduan persiapan PMB, mulai dari proses pendaftaran hingga menjadi mahasiswa baru, serta pelaporan data ke PDDIKTI. Setelah selesai, tandai centang untuk memantau progres.</p>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-gray-700 mt-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="px-6 py-3 flex justify-between items-center border-b border-gray-100">
          <button 
            onClick={() => setIsResetModalOpen(true)} 
            className="flex items-center gap-1.5 text-[13px] text-red-500 font-medium hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Reset
          </button>
          <button onClick={handleMarkAllDone} className="text-[13px] text-blue-600 font-medium hover:underline">
            Tandai Selesai Semua
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc]">
          
          {/* ALERT BANNER JIKA SEMUA SELESAI */}
          {totalDone === panduanData.length && showSuccessAlert && (
            <div className="mb-6 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 flex items-start justify-between shadow-sm animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-[14px] text-[#065f46] font-medium leading-relaxed">
                  Selamat, Anda telah menyelesaikan semua tahapan Penerimaan Mahasiswa Baru (PMB).
                </p>
              </div>
              <button 
                onClick={() => setShowSuccessAlert(false)}
                className="text-[#10b981] hover:text-[#047857] p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          <div className="relative">
            {panduanData.map((item, index) => {
              return (
                <div key={item.id} className="relative pb-6 flex gap-4">
                  
                  {index !== panduanData.length - 1 && (
                    <div className={`absolute left-[19px] top-[38px] bottom-0 w-0 border-l-2 border-dashed ${item.done ? 'border-green-300' : 'border-gray-300'}`}></div>
                  )}

                  <div className="relative z-10 shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] border-2 shadow-sm
                      ${item.done 
                        ? 'bg-white border-green-500 text-green-600' 
                        : item.loading 
                        ? 'bg-white border-blue-500 text-blue-600'
                        : 'bg-[#f0f7ff] border-blue-200 text-blue-600'
                      }`}
                    >
                      {item.id}
                    </div>
                  </div>

                  <div className={`flex-1 rounded-xl p-4 transition-all duration-300 border
                    ${item.done 
                      ? 'bg-white border-gray-200 shadow-sm opacity-80' 
                      : 'bg-white border-blue-100 shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-3">
                        <h4 className={`text-[15px] font-bold ${item.done ? 'text-gray-700' : 'text-blue-600'}`}>
                          {item.title}
                        </h4>
                        {item.done && (
                          <span className="bg-[#e6f4ea] text-[#10b981] text-[11px] font-bold px-2 py-0.5 rounded-md">
                            Done
                          </span>
                        )}
                      </div>

                      <button 
                        onClick={() => handleChecklist(item.id)}
                        disabled={item.loading}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 shrink-0 mt-0.5
                          ${item.done 
                            ? 'bg-[#3b82f6] border-[#3b82f6] text-white' 
                            : 'bg-white border-gray-300 text-transparent hover:border-blue-500'
                          }`}
                      >
                        {item.loading ? (
                          <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : item.done ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        ) : null}
                      </button>
                    </div>
                    
                    <p className={`text-[13px] leading-relaxed mb-2 ${item.done ? 'text-gray-500' : 'text-gray-600'}`}>
                      {item.desc}
                    </p>

                    {item.done && item.date && (
                      <p className="text-[12px] text-gray-400 italic font-medium">
                        {item.date}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-600 mb-2">
              <svg className="w-4 h-4 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              <span className="text-gray-400">›</span>
              <Link to="/admin/dashboard" onClick={(e) => { if (window.location.pathname === '/admin/dashboard') { e.preventDefault(); window.location.reload(); } }} className="hover:text-emerald-600 transition-colors font-medium">Dashboard</Link>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-[26px] font-bold text-gray-900">Dashboard</h2>
              <span className="text-[16px] text-gray-400 font-thin">Selamat Datang di Sistem Informasi Penerimaan Mahasiswa Baru</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setShowPanduan(!showPanduan)} className="flex items-center gap-2 bg-[#047857] hover:bg-[#035e44] text-white px-3.5 py-2 rounded text-[13px] font-medium transition-colors shadow-sm">
              {showPanduan ? (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>Sembunyikan Panduan</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>Tampilkan Panduan</>
              )}
            </button>
          </div>
        </div>

        {/* BANNER HIJAU */}
        <div className={`w-full overflow-visible transition-all duration-500 ease-in-out ${showPanduan ? 'max-h-[300px] opacity-100 mb-0' : 'max-h-0 opacity-0 mb-[-20px]'}`}>
          <div className="w-full bg-[#047857] rounded-md flex items-stretch relative h-[120px] shadow-sm">
            <div className="absolute right-0 top-0 h-full w-[35%] flex items-center justify-center opacity-15">
              <svg className="w-40 h-40 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div className="w-1/3 pl-6 flex flex-col justify-center z-10">
              <h2 className="text-white text-[16px] font-bold leading-snug">Ikuti Petunjuk<br/>Panduan Kerja</h2>
            </div>
            <div className="w-[260px] absolute left-[18%] top-1/2 -translate-y-1/2 z-20 group">
              <div className="bg-white rounded-lg p-2.5 shadow-lg transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-emerald-500 group-hover:ring-offset-1 cursor-pointer">
                <div className="flex items-start gap-2 mb-1">
                  <div className="bg-[#047857] p-1 rounded text-white shrink-0 mt-0.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
                  <h4 className="font-bold text-gray-900 text-[12px] leading-tight">Penerimaan Mahasiswa<br/>Baru (PMB)</h4>
                </div>
                <div className="flex justify-between items-center text-[10px] mb-1 text-gray-500">
                  <span>Progres</span><span>{totalDone} dari {panduanData.length} tahap</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${totalDone === panduanData.length ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`} style={{ width: `${(totalDone / panduanData.length) * 100}%` }}></div>
                </div>
                <div className="text-right">
                  <button onClick={() => setIsDrawerOpen(true)} className={`font-semibold text-[11px] hover:underline ${totalDone === panduanData.length ? 'text-[#10b981]' : 'text-[#047857]'}`}>
                    {totalDone === panduanData.length ? 'Selesai' : 'Proses'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK FILTER */}
        <div className="w-full bg-white border-t-2 border-t-[#f59e0b] rounded-md p-5 shadow-sm relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            <div className="space-y-3">
              <div className="flex items-center gap-3 relative z-50">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Periode</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={periodeOptions} value={periode} onChange={setPeriode} placeholder="Pilih Periode..." /></div>
              </div>
              <div className="flex items-center gap-3 relative z-40">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Jalur Pendaftaran</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={jalurOptions} value={jalur} onChange={setJalur} placeholder="Pilih Jalur..." /></div>
              </div>
              <div className="flex items-center gap-3 relative z-30">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Jenjang</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={jenjangOptions} value={jenjang} onChange={setJenjang} placeholder="Pilih Jenjang..." /></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 relative z-20">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Gelombang</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={gelombangOptions} value={gelombang} onChange={setGelombang} placeholder="Pilih Gelombang..." /></div>
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Sistem Kuliah</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={sistemKuliahOptions} value={sistemKuliah} onChange={setSistemKuliah} placeholder="Pilih Sistem Kuliah..." /></div>
              </div>
              <div className="flex items-center gap-3 relative z-0">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Unit / Program Studi</label>
                <div className="relative w-full max-w-[360px]"><SearchableSelect options={prodiOptions} value={prodi} onChange={setProdi} placeholder="Pilih Program Studi..." /></div>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          <StatCard title="Jumlah Peminat" value="0" theme="blue" icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>} leftData={{ value: '0', label: 'Akun Aktif' }} rightData={{ value: '0', label: 'Akun Belum Aktif' }} />
          <StatCard title="Jumlah Pendaftar" value="0" theme="green" icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>} leftData={{ value: '0', label: 'Sudah Finalisasi' }} rightData={{ value: '0', label: 'Belum Finalisasi' }} />
          <StatCard title="Jumlah Pendaftar Diterima Program Studi" value="0" theme="orange" icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>} />
          <StatCard title="Jumlah Pendaftar Daftar Ulang" value="0" theme="pink" icon={<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>} leftData={{ value: '0', label: 'Sudah Daftar Ulang' }} rightData={{ value: '0', label: 'Belum Daftar Ulang' }} />
        </div>

        {/* KOTAK STATISTIK & TAB NAVIGASI */}
        <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 mt-4 overflow-hidden">

          <div className="flex flex-wrap gap-2 border-b border-gray-200 p-4 bg-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-[14px] font-medium rounded-md transition-all duration-200 border ${
                  activeTab === tab
                    ? 'bg-white border-emerald-500 text-emerald-600 shadow-sm'
                    : 'bg-transparent border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'Statistik' && <PendaftarChart />}
            {activeTab === 'Info Grafik' && <TabelInfoGrafik />}
            {activeTab === 'Funnel Pendaftaran' && <TabelFunnelPendaftaran />}
            {activeTab !== 'Statistik' && activeTab !== 'Info Grafik' && activeTab !== 'Funnel Pendaftaran' && (
              <div className="flex items-center justify-center h-[400px] text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p>Konten untuk <strong>{activeTab}</strong> belum tersedia.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;