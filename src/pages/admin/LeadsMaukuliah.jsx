import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchableSelect from '../../components/ui/SearchableSelect';

const LeadsMaukuliah = () => {
  const navigate = useNavigate();

  // State untuk Filter
  const [tahunMasuk, setTahunMasuk] = useState('-- Semua Status --');
  const [sumberLeads, setSumberLeads] = useState('-- Semua Status --');
  const [statusLeads, setStatusLeads] = useState('-- Semua Status --');
  const [searchQuery, setSearchQuery] = useState('');
  const [toolbarFilterValue, setToolbarFilterValue] = useState('-- Semua --');

  // Opsi Filter
  const tahunMasukOptions = ['-- Semua Status --', '2024', '2025', '2026', '2027'];
  const sumberLeadsOptions = ['-- Semua Status --', 'Admission', 'Prospect'];
  const statusLeadsOptions = [
    '-- Semua Status --',
    'Belum Dihubungi',
    'Sudah Dihubungi',
    'Terdaftar Di PMB'
  ];

  const toolbarFilterOptions = [
    '-- Semua --',
    'Nama Leads',
    'Kontak',
    'Sumber Data',
    'Status'
  ];

  // Dummy Data Tabel
  const leadsData = [
    {
      id: 1,
      tanggalMasuk: '26 Okt 2026, 17:29:18',
      nama: 'Salwa Fauziah',
      email: 'salwaf1412@gmail.com',
      telepon: '081381771616',
      tglLahir: '',
      sumber: 'Prospect',
      status: 'Belum dihubungi',
      tglDihubungi: ''
    },
    {
      id: 2,
      tanggalMasuk: '19 Agu 2026, 07:40:47',
      nama: 'Andhy',
      email: 'andhy.lesmana@yahoo.com',
      telepon: '08128022373',
      tglLahir: '',
      sumber: 'Prospect',
      status: 'Belum dihubungi',
      tglDihubungi: ''
    },
    {
      id: 3,
      tanggalMasuk: '18 Agu 2026, 17:56:54',
      nama: 'Miftahul Aflah',
      email: 'miftahulaflah296@gmail.com',
      telepon: '',
      tglLahir: '',
      sumber: 'Prospect',
      status: 'Belum dihubungi',
      tglDihubungi: ''
    },
    {
      id: 4,
      tanggalMasuk: '10 Agu 2026, 11:54:46',
      nama: 'sahabat livin',
      email: 'sahabatlivin@gmail.com',
      telepon: '',
      tglLahir: '',
      sumber: 'Prospect',
      status: 'Belum dihubungi',
      tglDihubungi: ''
    },
    {
      id: 5,
      tanggalMasuk: '3 Jul 2026, 09:42:15',
      nama: 'Lee Alvarez',
      email: 'leealvarez2307@gmail.com',
      telepon: '',
      tglLahir: '',
      sumber: 'Prospect',
      status: 'Belum dihubungi',
      tglDihubungi: ''
    },
  ];

  // Penentu warna badge status
  const getStatusBadgeStyle = (st) => {
    const s = st.toLowerCase();
    if (s.includes('belum')) return 'bg-[#dd4b39] text-white'; // Merah
    if (s.includes('sudah')) return 'bg-[#f39c12] text-white'; // Oranye
    if (s.includes('terdaftar')) return 'bg-[#00a65a] text-white'; // Hijau
    return 'bg-[#dd4b39] text-white';
  };

  // Data Terfilter
  const filteredData = leadsData.filter((item) => {
    if (tahunMasuk !== '-- Semua Status --' && !item.tanggalMasuk.includes(tahunMasuk)) {
      return false;
    }
    if (sumberLeads !== '-- Semua Status --' && item.sumber !== sumberLeads) {
      return false;
    }
    if (statusLeads !== '-- Semua Status --' && item.status.toLowerCase() !== statusLeads.toLowerCase()) {
      return false;
    }

    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    if (toolbarFilterValue === 'Nama Leads') {
      return item.nama.toLowerCase().includes(query);
    }
    if (toolbarFilterValue === 'Kontak') {
      return item.email.toLowerCase().includes(query) || (item.telepon && item.telepon.includes(query));
    }
    if (toolbarFilterValue === 'Sumber Data') {
      return item.sumber.toLowerCase().includes(query);
    }
    if (toolbarFilterValue === 'Status') {
      return item.status.toLowerCase().includes(query);
    }

    return (
      item.nama.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      (item.telepon && item.telepon.includes(query)) ||
      item.sumber.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.tanggalMasuk.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative flex flex-col gap-5 w-full font-sans bg-[#f5f6f8] p-5 min-h-screen">
      
      <div className="max-w-[1700px] w-full mx-auto flex flex-col gap-5">
        
        {/* HEADER & BREADCRUMB */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2 font-normal">
              <svg className="w-4 h-4 cursor-pointer text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-gray-400">›</span>
              <Link to="/admin/pendaftar" className="text-gray-600 hover:text-emerald-600 transition-colors">Pendaftar</Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600">Data Pendaftar berasal dari data Leads Maukuliah</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-[26px] font-bold text-[#1e293b] tracking-tight">Daftar Leads Maukuliah</h2>
              <span className="text-[16px] text-gray-400 font-light">Data Pendaftar berasal dari data Leads Maukuliah</span>
            </div>
          </div>
        </div>

        {/* KOTAK FILTER (BORDER TOP ORANYE) */}
        <div className="w-full bg-white border-t-[3px] border-t-[#f59e0b] rounded-sm p-5 shadow-sm relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5">
            
            {/* Kolom Kiri */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 relative z-30">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Tahun Masuk Leads</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={tahunMasukOptions} value={tahunMasuk} onChange={setTahunMasuk} placeholder="Pilih Tahun..." />
                </div>
              </div>
              <div className="flex items-center gap-3 relative z-20">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Status Leads</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={statusLeadsOptions} value={statusLeads} onChange={setStatusLeads} placeholder="Pilih Status..." />
                </div>
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3 relative z-10">
                <label className="w-36 text-[13px] font-bold text-[#f59e0b] shrink-0">Sumber Leads</label>
                <div className="relative w-full max-w-[360px]">
                  <SearchableSelect options={sumberLeadsOptions} value={sumberLeads} onChange={setSumberLeads} placeholder="Pilih Sumber..." />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TABEL LEADS (BORDER TOP HIJAU) */}
        <div className="w-full bg-white rounded-sm shadow-sm border-t-[3px] border-t-[#00a65a] p-4 relative z-10">
          
          {/* TOOLBAR ATAS (TERPADU PERSIS SEPERTI DI PENDAFTAR) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
            
            {/* Bagian Kiri: Dropdown Filter Kategori & Search Input Terpadu */}
            <div className="flex flex-wrap items-center gap-2">
              <select 
                value={toolbarFilterValue}
                onChange={(e) => setToolbarFilterValue(e.target.value)}
                className="border border-gray-300 rounded-sm h-[34px] px-3 text-[13px] outline-none bg-white min-w-[180px] text-gray-700 cursor-pointer shadow-xs hover:border-gray-400 focus:border-emerald-500"
              >
                {toolbarFilterOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
              
              {/* Input Group Pencarian Terpadu dengan Tombol Hijau & Biru Tua */}
              <div className="flex items-center h-[34px] rounded-sm border border-gray-300 bg-white overflow-hidden shadow-xs focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                <input 
                  type="text" 
                  placeholder="Cari Daftar Leads Maukuliah" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-full pl-3 pr-2 text-[13px] outline-none w-[220px] sm:w-[260px] text-gray-700 bg-transparent placeholder-gray-400" 
                />
                <div className="flex items-center h-full border-l border-gray-300 shrink-0">
                  <button 
                    type="button"
                    title="Cari"
                    className="bg-[#00a65a] hover:bg-[#008d4c] text-white px-3.5 h-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button 
                    type="button"
                    title="Reset Pencarian"
                    onClick={() => { setSearchQuery(''); setToolbarFilterValue('-- Semua --'); }} 
                    className="bg-[#286090] hover:bg-[#204d74] text-white px-3.5 h-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Bagian Kanan: Tombol Kembali ke Pendaftar */}
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => navigate('/admin/pendaftar')}
                className="flex items-center gap-1.5 bg-[#00c0ef] hover:bg-[#00acd6] text-white px-3.5 h-[34px] rounded-sm text-[13px] font-medium transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Pendaftar
              </button>
            </div>
          </div>

          {/* TABEL DATA LEADS */}
          <div className="overflow-x-auto border border-[#cbd5e1] rounded-sm">
            <table className="w-full text-left text-[13px] text-gray-700 border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#004b87] text-white">
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[15%]">Tanggal Masuk</th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[18%]">Nama Leads</th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[22%]">Kontak</th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[10%]">Tanggal Lahir</th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[10%]">Sumber Data</th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[12%]">Status</th>
                  <th className="px-3 py-3 font-semibold border-r border-[#005a9c] text-center w-[10%]">Tanggal dihubungi</th>
                  <th className="px-3 py-3 font-semibold text-center w-[8%]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className={`border-b border-[#e5e7eb] transition-colors ${
                        index % 2 === 0 ? 'bg-white hover:bg-[#f1f5f9]' : 'bg-[#f9fafc] hover:bg-[#f1f5f9]'
                      }`}
                    >
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] text-gray-800 align-top">
                        {item.tanggalMasuk}
                      </td>
                      
                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] text-gray-900 font-medium align-top">
                        {item.nama}
                      </td>

                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top">
                        <div className="flex flex-col gap-1.5 text-[13px]">
                          <a href={`mailto:${item.email}`} className="flex items-center gap-1.5 text-[#0073b7] hover:underline">
                            <svg className="w-3.5 h-3.5 shrink-0 text-[#0073b7]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="truncate">{item.email}</span>
                          </a>
                          {item.telepon && (
                            <a href={`tel:${item.telepon}`} className="flex items-center gap-1.5 text-[#0073b7] hover:underline">
                              <svg className="w-3.5 h-3.5 shrink-0 text-[#0073b7]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                              </svg>
                              <span>{item.telepon}</span>
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top text-gray-700">
                        {item.tglLahir}
                      </td>

                      <td className="px-3 py-3.5 text-center border-r border-[#e5e7eb] align-top">
                        <span className="bg-[#f59e0b] text-white text-[11px] font-bold px-3 py-1 rounded-sm inline-block shadow-xs">
                          {item.sumber}
                        </span>
                      </td>

                      <td className="px-3 py-3.5 text-center border-r border-[#e5e7eb] align-top">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-sm inline-block shadow-xs ${getStatusBadgeStyle(item.status)}`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="px-3 py-3.5 border-r border-[#e5e7eb] align-top text-gray-700">
                        {item.tglDihubungi}
                      </td>

                      <td className="px-3 py-3.5 text-center align-top">
                        <div className="flex justify-center items-center gap-1">
                          <button 
                            title="Tandai Selesai"
                            className="bg-[#00a65a] hover:bg-[#008d4c] text-white p-1.5 rounded-sm transition-colors shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button 
                            title="Lihat Detail"
                            className="bg-[#00c0ef] hover:bg-[#00acd6] text-white p-1.5 rounded-sm transition-colors shadow-xs"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500 bg-white border-b border-gray-200">
                      Tidak ada data leads yang cocok dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION BAWAH TABEL */}
          {filteredData.length > 0 && (
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">

              <div className="w-full md:w-auto bg-[#f8fafc] border border-gray-100 rounded-sm px-4 py-2">
                <span className="text-[13px] text-gray-700">
                  Hal 1/1 (<span className="text-[#0f3b66] font-semibold">{filteredData.length} data</span>, 0.024 detik)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4">

                <select className="border border-gray-300 rounded-sm py-1.5 px-3 text-[13px] outline-none bg-white cursor-pointer hover:border-gray-400">
                  <option value="10">10 baris</option>
                  <option value="25">25 baris</option>
                  <option value="50">50 baris</option>
                  <option value="100">100 baris</option>
                </select>

                <div className="flex items-center">
                  <button className="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-l-sm text-[13px] disabled:opacity-50">«</button>
                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-[13px]">‹</button>

                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-[#1e40af] text-white font-medium text-[13px]">1</button>

                  <button className="px-3 py-1.5 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50 text-[13px]">›</button>
                  <button className="px-3 py-1.5 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-r-sm text-[13px] disabled:opacity-50">»</button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LeadsMaukuliah;
