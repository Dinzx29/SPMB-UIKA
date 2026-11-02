import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import logoUika from '../../assets/img/logo.jpg';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const profileRef = useRef(null);
  const [profilePos, setProfilePos] = useState({ top: 0, right: 0 });

  // 🔥 STATE UNTUK DROPDOWN REKOGNISI PEMBELAJARAN LAMPAU (RPL)
  const [isRplOpen, setIsRplOpen] = useState(false);
  const [isRplAnimating, setIsRplAnimating] = useState(false);
  const rplRef = useRef(null);
  const [rplPos, setRplPos] = useState({ top: 0, left: 0 });
  const [isLaporanOpen, setIsLaporanOpen] = useState(false);

  const handleProfileClick = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setProfilePos({
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right
      });
    }
    
    // Tutup dropdown RPL jika profil dibuka
    if (isRplOpen) {
      setIsRplAnimating(false);
      setIsRplOpen(false);
      setIsLaporanOpen(false);
    }

    if (isProfileOpen) {
      setIsAnimating(false);
      setTimeout(() => setIsProfileOpen(false), 200);
    } else {
      setIsProfileOpen(true);
      setTimeout(() => setIsAnimating(true), 10);
    }
  };

  const handleRplClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (rplRef.current) {
      const rect = rplRef.current.getBoundingClientRect();
      setRplPos({
        top: rect.bottom + 6,
        left: Math.max(16, rect.left)
      });
    }

    // Tutup profil jika RPL dibuka
    if (isProfileOpen) {
      setIsAnimating(false);
      setIsProfileOpen(false);
    }

    if (isRplOpen) {
      setIsRplAnimating(false);
      setTimeout(() => setIsRplOpen(false), 200);
      setIsLaporanOpen(false);
    } else {
      setIsRplOpen(true);
      setTimeout(() => setIsRplAnimating(true), 10);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        const dropdownElement = document.getElementById('profile-dropdown-portal');
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setIsAnimating(false);
          setTimeout(() => setIsProfileOpen(false), 200);
        }
      }

      if (rplRef.current && !rplRef.current.contains(event.target)) {
        const rplElement = document.getElementById('rpl-dropdown-portal');
        if (rplElement && !rplElement.contains(event.target)) {
          setIsRplAnimating(false);
          setTimeout(() => setIsRplOpen(false), 200);
          setIsLaporanOpen(false);
        }
      }
    }

    function handleWindowChange() {
      if (isRplOpen && rplRef.current) {
        const rect = rplRef.current.getBoundingClientRect();
        setRplPos({
          top: rect.bottom + 6,
          left: Math.max(16, rect.left)
        });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleWindowChange, { passive: true });
    window.addEventListener("resize", handleWindowChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleWindowChange);
      window.removeEventListener("resize", handleWindowChange);
    };
  }, [isRplOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/admin/dashboard') return currentPath === path;
    // Halaman Leads Maukuliah (/admin/list_leads) & Data Pendaftar (/admin/data_pendaftar) merupakan bagian dari menu Pendaftar
    if (path === '/admin/pendaftar') {
      return currentPath.startsWith('/admin/pendaftar') || currentPath.startsWith('/admin/list_leads') || currentPath.startsWith('/admin/data_pendaftar');
    }
    // Halaman Pencarian Pendaftar (/admin/ods_pencarianpendaftar) merupakan bagian dari One Day Service
    if (path === '/admin/one_day_service') {
      return currentPath.startsWith('/admin/one_day_service') || currentPath.startsWith('/admin/ods_pencarianpendaftar');
    }
    return currentPath.startsWith(path);
  };

  const getLinkClass = (path) => {
    return isActive(path)
      ? 'text-white border-b-[2px] border-white pb-1 font-medium'
      : 'text-white/95 border-b-[2px] border-transparent hover:text-white pb-1';
  };

  const getDivClass = (path) => {
    return isActive(path)
      ? 'text-white border-b-[2px] border-white pb-1 cursor-pointer font-medium'
      : 'text-white/95 border-b-[2px] border-transparent hover:text-white pb-1 cursor-pointer';
  };

  return (
    <div className="bg-[#047857] text-white shadow-sm relative z-40 font-sans w-full">
      
      {/* OVERLAY GELAP */}
      {isProfileOpen && createPortal(
        <div 
          className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ease-in-out ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`} 
          onClick={handleProfileClick}
        ></div>,
        document.body
      )}

      {/* Ornamen Batik */}
      <div 
        className="absolute top-0 right-0 h-full w-1/2 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1.5' stroke-opacity='0.8'%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='0' cy='0' r='15'/%3E%3Ccircle cx='80' cy='0' r='15'/%3E%3Ccircle cx='0' cy='80' r='15'/%3E%3Ccircle cx='80' cy='80' r='15'/%3E%3C/g%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Ccircle cx='0' cy='0' r='3'/%3E%3Ccircle cx='80' cy='0' r='3'/%3E%3Ccircle cx='0' cy='80' r='3'/%3E%3Ccircle cx='80' cy='80' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to left, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)'
        }}
      />

      {/* BAGIAN ATAS */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center">
        
        {/* Logo & Teks */}
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-xl shadow-sm shrink-0">
            <img src={logoUika} alt="Logo UIKA" className="w-14 h-14 rounded-lg object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[15px] text-white/90 font-normal mb-1">
              SIM Seleksi Penerimaan Mahasiswa Baru
            </span>
            <h1 className="text-[26px] font-bold leading-none tracking-wide">
              Universitas Ibn Khaldun
            </h1>
          </div>
        </div>

        {/* Kanan: Ikon & Profil */}
        <div className="flex items-center gap-8">
          
          <div className="flex items-center gap-2 text-white/90">
            
            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
            </button>

            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </button>

            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
              </svg>
            </button>

            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div 
            ref={profileRef}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-white/20 transition-all duration-200"
            onClick={handleProfileClick}
          >
            <div className="w-[40px] h-[40px] bg-white rounded-full p-[2px] overflow-hidden border-2 border-white shadow-sm shrink-0">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="w-full h-full object-cover rounded-full bg-[#e5e7eb]" />
            </div>
            <svg className={`w-4 h-4 text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* BAGIAN BAWAH: MENU NAVIGASI */}
      <div className="relative z-10 pt-2 pb-4">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center text-[14px] font-light tracking-wide overflow-x-auto whitespace-nowrap hide-scrollbar h-[48px]">
          
          <Link to="/admin/dashboard" className={`flex items-center ${getLinkClass('/admin/dashboard')}`}>
            <div className="h-[36px] flex items-center">Dashboard</div>
          </Link>
          
          <Link to="/admin/pendaftar" className={`flex items-center ${getLinkClass('/admin/pendaftar')}`}>
            <div className="h-[36px] flex items-center">Pendaftar</div>
          </Link>
          
          {/* 🔥 LINK ONE DAY SERVICE DISAMBUNGKAN KE RUTE */}
          <Link to="/admin/one_day_service" className={`flex items-center ${getLinkClass('/admin/one_day_service')}`}>
            <div className="h-[36px] flex flex-col justify-center text-center leading-[1.15]">
              <span>One Day Service</span>
            </div>
          </Link>
          
          {/* 🔥 REKOGNISI PEMBELAJARAN LAMPAU DENGAN DROPDOWN & IKON BERGERAK (TANPA GARIS BAWAH SAAT DIBUKA) */}
          <div ref={rplRef} className="relative flex items-center">
            <button 
              onClick={handleRplClick} 
              className={`flex items-center gap-1.5 cursor-pointer outline-none transition-colors ${
                currentPath.startsWith('/admin/rpl') || currentPath.startsWith('/admin/list_kesiapan_rpl')
                  ? 'text-white border-b-[2px] border-white pb-1 font-medium'
                  : 'text-white/95 border-b-[2px] border-transparent hover:text-white pb-1'
              }`}
            >
              <div className="h-[36px] flex flex-col justify-center leading-[1.15] text-left">
                <span>Rekognisi Pembelajaran Lampau</span>
              </div>
              <svg 
                className={`w-3.5 h-3.5 text-white/90 transition-transform duration-300 ${isRplOpen ? 'rotate-180' : ''}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className={getDivClass('/pengaturan')}>
            <div className="h-[36px] flex items-center gap-1.5">
              <span>Pengaturan</span> 
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </div>
          </div>
          <div className={getDivClass('/seleksi')}>
            <div className="h-[36px] flex items-center gap-1.5">
              <span>Seleksi</span> 
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </div>
          </div>
          <div className={getDivClass('/kelulusan')}>
            <div className="h-[36px] flex items-center gap-1.5">
              <span>Kelulusan</span> 
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </div>
          </div>
          <div className={getDivClass('/referensi')}>
            <div className="h-[36px] flex items-center gap-1.5">
              <span>Referensi</span> 
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </div>
          </div>
          <div className={getDivClass('/laporan')}>
            <div className="h-[36px] flex items-center gap-1.5">
              <span>Laporan</span> 
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
            </div>
          </div>
          
          <Link to="#" className={`flex items-center ${getLinkClass('/login-as')}`}>
            <div className="h-[36px] flex flex-col justify-center text-right leading-[1.15]">
              <span>Login</span>
              <span>As</span>
            </div>
          </Link>

        </div>
      </div>

      {/* DROPDOWN PROFIL (DIRENDER KE PORTAL) */}
      {isProfileOpen && createPortal(
        <div 
          id="profile-dropdown-portal"
          className={`fixed w-[340px] bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] text-gray-800 overflow-hidden origin-top-right transition-all duration-300 ease-out ${
            isAnimating ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
          }`}
          style={{
            top: `${profilePos.top}px`,
            right: `${profilePos.right}px`,
          }}
        >
          <div className="p-6 flex items-center gap-4 bg-white">
            <div className="w-[56px] h-[56px] rounded-full border border-gray-200 overflow-hidden shrink-0 bg-gray-50 p-0.5">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="User" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[16px] font-bold text-gray-900 uppercase leading-tight mb-1">
                MUHAMMAD BAEDILLAH
              </h3>
              <Link to="#" className="text-[13px] text-blue-600 font-semibold hover:underline flex items-center gap-1">
                Lihat Profil <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-100 mx-6"></div>

          <div className="p-4 space-y-1 bg-white">
            <div className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
              <div className="flex items-center gap-4 text-gray-600 group-hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-[14px] font-medium">Bahasa Aplikasi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-gray-400 font-medium">ID</span>
                <div className="w-[22px] h-[14px] bg-red-600 rounded-[2px] flex flex-col justify-between overflow-hidden">
                  <div className="w-full h-1/2 bg-red-600"></div>
                  <div className="w-full h-1/2 bg-white"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 px-3 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors text-gray-600 group">
              <svg className="w-5 h-5 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[14px] font-medium group-hover:text-gray-900">Bantuan</span>
            </div>

            <div className="border-t border-gray-100 my-2"></div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-3 py-3 hover:bg-red-50 rounded-lg cursor-pointer transition-colors text-red-600 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-[14px] font-semibold">Keluar</span>
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* 🔥 DROPDOWN REKOGNISI PEMBELAJARAN LAMPAU (TEMA IJO PURE PERSIS NAVBAR) */}
      {isRplOpen && createPortal(
        <div 
          id="rpl-dropdown-portal"
          className={`fixed w-[310px] bg-[#047857] text-white rounded-xl shadow-2xl z-[90] overflow-visible origin-top-left transition-all duration-200 ease-out border border-white/20 ${
            isRplAnimating ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'
          }`}
          style={{
            top: `${rplPos.top}px`,
            left: `${rplPos.left}px`,
          }}
        >
          {/* Header Judul Kategori */}
          <div 
            className="px-6 pt-5 pb-3"
            onMouseEnter={() => setIsLaporanOpen(false)}
          >
            <h4 className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
              REKOGNISI PEMBELAJARAN LAMPAU
            </h4>
          </div>

          <div className="border-t border-white/15 mx-6 mb-1"></div>

          {/* Daftar Menu Items */}
          <div className="py-1 text-[13.5px]">
            <Link 
              to="/admin/rpl/kesiapan" 
              onMouseEnter={() => setIsLaporanOpen(false)}
              onClick={() => { setIsRplAnimating(false); setTimeout(() => setIsRplOpen(false), 200); setIsLaporanOpen(false); }}
              className="flex items-center px-6 py-3 text-white/95 hover:text-white hover:bg-white/10 font-normal transition-colors"
            >
              Kesiapan RPL dan Generate Mahasiswa
            </Link>

            <Link 
              to="/admin/rpl/asesor" 
              onMouseEnter={() => setIsLaporanOpen(false)}
              onClick={() => { setIsRplAnimating(false); setTimeout(() => setIsRplOpen(false), 200); }}
              className="flex items-center px-6 py-3 text-white/95 hover:text-white hover:bg-white/10 font-normal transition-colors"
            >
              Master Asesor RPL
            </Link>

            <Link 
              to="/admin/rpl/seleksi" 
              onMouseEnter={() => setIsLaporanOpen(false)}
              onClick={() => { setIsRplAnimating(false); setTimeout(() => setIsRplOpen(false), 200); }}
              className="flex items-center px-6 py-3 text-white/95 hover:text-white hover:bg-white/10 font-normal transition-colors"
            >
              Seleksi RPL
            </Link>

            {/* Menu Laporan dengan Submenu Flyout */}
            <div 
              className="relative"
              onMouseEnter={() => setIsLaporanOpen(true)}
            >
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsLaporanOpen(prev => !prev);
                }}
                className={`w-full flex items-center justify-between px-6 py-3 text-white/95 hover:text-white transition-colors text-left cursor-pointer ${
                  isLaporanOpen ? 'bg-white/15 text-white font-medium' : 'hover:bg-white/10 font-normal'
                }`}
              >
                <span>Laporan</span>
                <svg className={`w-4 h-4 text-white/80 transition-transform ${isLaporanOpen ? 'translate-x-0.5' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 🔥 SUBMENU FLYOUT LAPORAN (PANEL PUTIH SESUAI PERSIS FOTO SIAKAD UIKA) */}
          <div 
            className={`absolute left-[calc(100%-1px)] top-[42px] w-[340px] bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-100 origin-top-left transition-all duration-200 ease-out z-[95] overflow-hidden before:absolute before:-left-3 before:top-0 before:w-3 before:h-full before:content-[''] ${
              isLaporanOpen 
                ? 'opacity-100 scale-100 translate-x-0 visible pointer-events-auto' 
                : 'opacity-0 scale-95 -translate-x-1 invisible pointer-events-none'
            }`}
            onMouseEnter={() => setIsLaporanOpen(true)}
            onMouseLeave={() => setIsLaporanOpen(false)}
          >
            {/* Header Judul Kategori Laporan */}
            <div className="px-6 pt-5 pb-3">
              <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                LAPORAN
              </h5>
            </div>

            <div className="border-t border-gray-100 mx-6 mb-1"></div>

            {/* Daftar 4 Menu Laporan */}
            <div className="py-1 text-[13px]">
              <Link 
                to="/admin/rpl/rekap-pendaftar"
                onClick={() => { 
                  setIsRplAnimating(false); 
                  setTimeout(() => setIsRplOpen(false), 200); 
                  setIsLaporanOpen(false); 
                }}
                className="block px-6 py-3.5 text-gray-700 hover:text-[#047857] hover:bg-gray-50/80 font-normal transition-colors border-b border-gray-100/80"
              >
                Rekapitulasi Pendaftar RPL
              </Link>

              <Link 
                to="/admin/rpl/sierra"
                onClick={() => { 
                  setIsRplAnimating(false); 
                  setTimeout(() => setIsRplOpen(false), 200); 
                  setIsLaporanOpen(false); 
                }}
                className="block px-6 py-3.5 text-gray-700 hover:text-[#047857] hover:bg-gray-50/80 font-normal transition-colors border-b border-gray-100/80"
              >
                Formulir Penyelenggaraan RPL ke SIERRA
              </Link>

              <Link 
                to="/admin/rpl/sk-penerimaan"
                onClick={() => { 
                  setIsRplAnimating(false); 
                  setTimeout(() => setIsRplOpen(false), 200); 
                  setIsLaporanOpen(false); 
                }}
                className="block px-6 py-3.5 text-gray-700 hover:text-[#047857] hover:bg-gray-50/80 font-normal transition-colors border-b border-gray-100/80"
              >
                SK Penerimaan Mahasiswa RPL
              </Link>

              <Link 
                to="/admin/rpl/hasil-penilaian"
                onClick={() => { 
                  setIsRplAnimating(false); 
                  setTimeout(() => setIsRplOpen(false), 200); 
                  setIsLaporanOpen(false); 
                }}
                className="block px-6 py-3.5 text-gray-700 hover:text-[#047857] hover:bg-gray-50/80 font-normal transition-colors"
              >
                Hasil Penilaian Seleksi RPL
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Navbar;