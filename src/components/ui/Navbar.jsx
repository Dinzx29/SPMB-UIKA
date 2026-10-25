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

  const handleProfileClick = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setProfilePos({
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right
      });
    }
    
    if (isProfileOpen) {
      setIsAnimating(false);
      setTimeout(() => setIsProfileOpen(false), 200);
    } else {
      setIsProfileOpen(true);
      setTimeout(() => setIsAnimating(true), 10);
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
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/admin/dashboard') return currentPath === path;
    return currentPath.startsWith(path);
  };

  const getLinkClass = (path) => {
    return isActive(path)
      ? 'text-white border-b-[2px] border-white pb-1'
      : 'text-white/95 border-b-[2px] border-transparent hover:text-white pb-1';
  };

  const getDivClass = (path) => {
    return isActive(path)
      ? 'text-white border-b-[2px] border-white pb-1 cursor-pointer'
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
          
          {/* 🔥 Grup Ikon dengan Efek Hover Lingkaran */}
          <div className="flex items-center gap-2 text-white/90">
            
            {/* Bell Icon */}
            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Home Icon */}
            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </button>

            {/* Chat Icon */}
            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Grid Icon */}
            <button className="p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* 🔥 TOMBOL PROFIL dengan Efek Hover Lingkaran */}
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
          
          <Link to="#" className={`flex items-center ${getLinkClass('/one-day')}`}>
            <div className="h-[36px] flex flex-col justify-center text-center leading-[1.15]">
              <span>One Day Service</span>
            </div>
          </Link>
          
          <Link to="#" className={`flex items-center gap-1 ${getLinkClass('/rekognisi')}`}>
            <div className="h-[36px] flex flex-col justify-center leading-[1.15]">
              <span>Rekognisi Pembelajaran Lampau</span>
            </div>
            <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </Link>
          
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
          {/* Header Profil */}
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

          {/* Menu List */}
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
    </div>
  );
};

export default Navbar;