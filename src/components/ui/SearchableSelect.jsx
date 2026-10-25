import { useState, useRef, useEffect } from 'react';

const SearchableSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setSearchTerm('');
    setIsOpen(false);
  };

  // 🔥 Fungsi format teks dengan Indentasi yang lebih pendek & tidak meluber
  const formatOptionText = (text, isMainBox = false) => {
    
    // Opsi Default (Semua...)
    if (text.startsWith('-- Semua')) {
      return <span className="font-medium text-gray-800">{text}</span>;
    }

    // Level 3: Program Studi (Awalan "--- ") -> Indentasi sedang (pl-8)
    if (text.startsWith('--- ')) {
      return (
        <span className={`${isMainBox ? 'pl-0' : 'pl-8'} block text-gray-500 text-[13px] truncate`}>
          {text.replace('--- ', '')}
        </span>
      );
    }

    // Level 2: Fakultas (Awalan "-- ") -> Indentasi kecil (pl-4)
    if (text.startsWith('-- ')) {
      return (
        <span className={`${isMainBox ? 'pl-0' : 'pl-4'} block text-gray-700 font-medium text-[13px] truncate`}>
          {text.replace('-- ', '')}
        </span>
      );
    }

    // Level 1: Universitas / Opsi Utama
    return <span className="block font-semibold text-gray-900 text-[13px] truncate">{text}</span>;
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className="w-full appearance-none border border-gray-400 rounded-sm py-1.5 px-3 text-[13px] text-gray-700 bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-gray-700' : 'text-gray-400'} truncate pr-2`}>
          {value ? formatOptionText(value, true) : placeholder}
        </span>
        <svg className={`w-3.5 h-3.5 text-gray-600 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-xl">
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-sm py-1.5 px-2 text-[13px] outline-none focus:border-blue-500"
              placeholder="Ketik untuk mencari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {/* 🔥 max-w-full dan overflow-hidden mencegah dropdown melebar */}
          <ul className="max-h-60 overflow-y-auto overflow-x-hidden py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  className={`px-3 py-2 text-[13px] cursor-pointer hover:bg-blue-50 ${value === option ? 'bg-blue-100' : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  {formatOptionText(option)}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-[13px] text-gray-500 text-center">Tidak ditemukan</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;