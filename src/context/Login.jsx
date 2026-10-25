import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logoUika from '../assets/img/logo.jpg'; 
import fotoGedung from '../assets/img/gedung.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  
  // 🔥 State untuk menampilkan/menyembunyikan password
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Validasi input kosong
    if (!email || !password) {
      setError('Mohon isi email dan password!');
      return;
    }

    // Logika Validasi
    const validEmail = 'admin@uika.ac.id';
    const validPassword = 'admin123';

    if (email === validEmail && password === validPassword) {
      login(email);
      navigate('/admin/dashboard', { state: { justLoggedIn: true, userName: email } });
    } else {
      setError('Email atau Password yang Anda masukkan salah!');
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex overflow-hidden bg-white font-sans">
      
      {/* ===== KOLOM KIRI: FORM ===== */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-white p-6 md:p-12 overflow-y-auto">
        <div className="w-full max-w-[400px] flex flex-col">
          
          <div className="text-center mb-8">
            <img
              src={logoUika}
              alt="Logo UIKA"
              className="w-24 h-24 mx-auto mb-4 object-contain"
            />
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Sign In SPMB
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Selamat datang di sistem penerimaan mahasiswa baru <br />
              <span className="text-emerald-600 font-bold">
                Universitas Ibn Khaldun Bogor.
              </span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-800">Alamat Email</label>
              <input
                type="email"
                placeholder="admin@uika.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all box-border"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-800">Password</label>
              
              {/* 🔥 Input dengan Ikon Mata */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pr-12 rounded-lg border border-gray-300 text-sm text-gray-900 bg-white outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all box-border"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                  {showPassword ? (
                    // Ikon Mata Terbuka
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    // Ikon Mata Dicoret (Sembunyi)
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-lg font-medium border border-red-100">
                {error}
              </p>
            )}

            <div className="flex justify-between items-center text-sm mt-1">
              <label className="flex items-center gap-2 text-gray-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
                />
                Ingat saya
              </label>
              <a href="#" className="text-emerald-600 font-bold hover:underline">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-base transition-colors mt-2 shadow-sm"
            >
              Masuk Sekarang
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-3">
              Belum memiliki akun?{' '}
              <a href="#" className="text-emerald-600 font-bold hover:underline">
                Daftar di sini
              </a>
            </p>
            <p className="text-xs">
              <a href="#" className="text-gray-400 hover:text-gray-600 hover:underline">
                Tentang Kami
              </a>
            </p>
          </div>

        </div>
      </div>

      {/* ===== KOLOM KANAN: BANNER ===== */}
      <div className="hidden md:flex w-1/2 h-full relative items-end bg-emerald-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(4, 120, 87, 0.9) 0%, rgba(4, 120, 87, 0.5) 100%), url(${fotoGedung})`,
          }}
        />
        <div className="relative z-10 w-full p-12 bg-gradient-to-t from-black/90 to-transparent">
          <div className="text-white max-w-[480px]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Pengumuman Sistem Penerimaan Mahasiswa Baru
            </h2>
            <p className="text-sm text-gray-200 leading-relaxed mb-6">
              Berdasarkan Pengumuman Rektor UIKA Nomor: 1911/K.11/UIKA/2023
              tentang Pembayaran Biaya Perkuliahan Semester GASAL Tahun
              Akademik 2023/2024.
            </p>
            <div className="flex gap-2"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;