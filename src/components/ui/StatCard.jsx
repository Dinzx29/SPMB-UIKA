import { useState } from 'react';

const StatCard = ({ title, value, icon, theme, leftData, rightData }) => {
  // State untuk mendeteksi hover pada masing-masing frame
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  // Peta warna gradien berdasarkan tema
  const themes = {
    blue: 'bg-gradient-to-br from-[#38bdf8] to-[#0284c7]',
    green: 'bg-gradient-to-br from-[#34d399] to-[#059669]',
    orange: 'bg-gradient-to-br from-[#fbbf24] to-[#ea580c]',
    pink: 'bg-gradient-to-br from-[#f472b6] to-[#be123c]',
  };

  return (
    // Animasi Kartu Utama
    <div className={`relative p-5 rounded-xl text-white shadow-md flex flex-col justify-between h-full min-h-[190px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:brightness-105 cursor-pointer ${themes[theme]}`}>
      
      {/* Bagian Atas: Judul & Ikon */}
      <div className="flex justify-between items-start gap-3 mb-2">
        <h3 className="text-[14px] font-bold leading-snug flex-1">
          {title}
        </h3>
        <div className="bg-white/20 p-2 rounded-lg shrink-0">
          {icon}
        </div>
      </div>

      {/* Angka Utama */}
      <div className="text-[38px] font-bold leading-none my-2">
        {value}
      </div>

      {/* 🔥 DUA FRAME KANAN KIRI */}
      {leftData && rightData ? (
        <div className="flex gap-2 mt-auto">
          
          {/* Frame Kiri */}
          <div 
            onMouseEnter={() => setHoverLeft(true)}
            onMouseLeave={() => setHoverLeft(false)}
            className={`flex-1 bg-white/20 rounded-lg p-2.5 flex justify-between items-center transition-all duration-300 ease-in-out cursor-default ${
              hoverLeft ? 'bg-white/30 shadow-inner scale-[1.03]' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-[17px] font-bold leading-none mb-1">{leftData.value}</span>
              <span className="text-[10px] opacity-90 leading-tight text-center">{leftData.label}</span>
            </div>
            {/* Panah Muncul Saat Hover Kiri */}
            <div className={`flex items-center justify-center shrink-0 transition-all duration-300 ${
              hoverLeft ? 'opacity-100 translate-x-0 w-5' : 'opacity-0 -translate-x-2 w-0'
            }`}>
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          {/* Frame Kanan */}
          <div 
            onMouseEnter={() => setHoverRight(true)}
            onMouseLeave={() => setHoverRight(false)}
            className={`flex-1 bg-white/20 rounded-lg p-2.5 flex justify-between items-center transition-all duration-300 ease-in-out cursor-default ${
              hoverRight ? 'bg-white/30 shadow-inner scale-[1.03]' : ''
            }`}
          >
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-[17px] font-bold leading-none mb-1">{rightData.value}</span>
              <span className="text-[10px] opacity-90 leading-tight text-center">{rightData.label}</span>
            </div>
            {/* Panah Muncul Saat Hover Kanan */}
            <div className={`flex items-center justify-center shrink-0 transition-all duration-300 ${
              hoverRight ? 'opacity-100 translate-x-0 w-5' : 'opacity-0 -translate-x-2 w-0'
            }`}>
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

        </div>
      ) : (
        <div className="h-[52px]"></div>
      )}
      
    </div>
  );
};

export default StatCard;