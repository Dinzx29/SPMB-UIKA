import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from 'recharts';
import SearchableSelect from './SearchableSelect'; 
import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// =====================================================================
// 🚨 DATA DUMMY: GRAFIK UTAMA (PER FREKUENSI)
// =====================================================================
const dataPerFrekuensi = [
  { name: 'Periode 1', Daftar: 10, Aktif: 5, Finalisasi: 3, Lulus: 2, 'Daftar Ulang': 1 },
  { name: 'Periode 2', Daftar: 45, Aktif: 30, Finalisasi: 20, Lulus: 15, 'Daftar Ulang': 10 },
  { name: 'Periode 3', Daftar: 50, Aktif: 35, Finalisasi: 25, Lulus: 20, 'Daftar Ulang': 15 },
  { name: 'Periode 4', Daftar: 55, Aktif: 40, Finalisasi: 30, Lulus: 25, 'Daftar Ulang': 20 },
  { name: 'Periode 5', Daftar: 250, Aktif: 150, Finalisasi: 100, Lulus: 80, 'Daftar Ulang': 50 },
  { name: 'Periode 6', Daftar: 400, Aktif: 280, Finalisasi: 200, Lulus: 160, 'Daftar Ulang': 100 },
  { name: 'Periode 7', Daftar: 600, Aktif: 500, Finalisasi: 350, Lulus: 220, 'Daftar Ulang': 150 },
  { name: 'Periode 8', Daftar: 1300, Aktif: 1250, Finalisasi: 1200, Lulus: 850, 'Daftar Ulang': 980 },
  { name: 'Periode 9', Daftar: 150, Aktif: 100, Finalisasi: 80, Lulus: 60, 'Daftar Ulang': 400 },
  { name: 'Periode 10', Daftar: 80, Aktif: 60, Finalisasi: 50, Lulus: 40, 'Daftar Ulang': 450 },
  { name: 'Periode 11', Daftar: 20, Aktif: 10, Finalisasi: 5, Lulus: 2, 'Daftar Ulang': 5 },
];

// =====================================================================
// 🚨 DATA DUMMY: GRAFIK KUMULATIF (SESUAI FOTO)
// =====================================================================
const dataKumulatif = [
  { name: 'Periode 1', Daftar: 5, Aktif: 2, Finalisasi: 1, Lulus: 0, 'Daftar Ulang': 0 },
  { name: 'Periode 2', Daftar: 20, Aktif: 8, Finalisasi: 3, Lulus: 1, 'Daftar Ulang': 1 },
  { name: 'Periode 3', Daftar: 30, Aktif: 12, Finalisasi: 5, Lulus: 2, 'Daftar Ulang': 2 },
  { name: 'Periode 4', Daftar: 45, Aktif: 18, Finalisasi: 8, Lulus: 4, 'Daftar Ulang': 3 },
  { name: 'Periode 5', Daftar: 60, Aktif: 25, Finalisasi: 12, Lulus: 6, 'Daftar Ulang': 5 },
  { name: 'Periode 6', Daftar: 130, Aktif: 60, Finalisasi: 25, Lulus: 15, 'Daftar Ulang': 10 },
  { name: 'Periode 7', Daftar: 320, Aktif: 230, Finalisasi: 180, Lulus: 260, 'Daftar Ulang': 260 },
  { name: 'Periode 8', Daftar: 320, Aktif: 240, Finalisasi: 180, Lulus: 280, 'Daftar Ulang': 280 },
  { name: 'Periode 9', Daftar: 340, Aktif: 260, Finalisasi: 185, Lulus: 300, 'Daftar Ulang': 300 },
  { name: 'Periode 10', Daftar: 350, Aktif: 270, Finalisasi: 185, Lulus: 305, 'Daftar Ulang': 305 },
  { name: 'Periode 11', Daftar: 358, Aktif: 275, Finalisasi: 186, Lulus: 318, 'Daftar Ulang': 318 },
];

// Data dummy Pie Chart (Tidak berubah)
const dataTrafik = [
  { name: 'Portal PMB', value: 89.29, color: '#7cb5ec' },
  { name: 'Didaftarkan Admin PMB', value: 10.71, color: '#434348' },
  { name: 'Import Excel', value: 0, color: '#90ed7d' },
  { name: 'Sumber Lainnya', value: 0, color: '#f7a35c' },
];

const dataFunnel = [
  { name: 'Peminat', Periode1: 7, Periode2: 36 },
  { name: 'Pendaftar', Periode1: 7, Periode2: 32 },
  { name: 'Mengisi Biodata', Periode1: 6, Periode2: 6 },
  { name: 'Finalisasi Data', Periode1: 6, Periode2: 6 },
  { name: 'Mengikuti Seleksi', Periode1: 0, Periode2: 0 },
  { name: 'Lulus', Periode1: 7, Periode2: 30 },
  { name: 'Daftar Ulang', Periode1: 7, Periode2: 30 },
  { name: 'Generate NIM', Periode1: 7, Periode2: 30 },
];

const dataGender = [
  { name: 'Laki-laki', value: 64.29, color: '#7cb5ec' },
  { name: 'Perempuan', value: 35.71, color: '#434348' },
];

const dataTahun = [
  { name: '1995', value: 3.57, color: '#434348' },
  { name: '1997', value: 3.57, color: '#7cb5ec' },
  { name: '2000', value: 3.57, color: '#f7a35c' },
  { name: '2004', value: 3.57, color: '#90ed7d' },
  { name: '2006', value: 3.57, color: '#e4d354' },
  { name: '2007', value: 3.57, color: '#2b908f' },
  { name: '2010', value: 3.57, color: '#f45b5b' },
  { name: '2012', value: 3.57, color: '#91e8e1' },
  { name: '2013', value: 10.71, color: '#f15c80' },
  { name: '2015', value: 3.57, color: '#8085e9' },
  { name: '2019', value: 3.57, color: '#f7a35c' },
  { name: '2021', value: 10.71, color: '#7cb5ec' },
  { name: '2022', value: 3.57, color: '#90ed7d' },
  { name: '2023', value: 7.14, color: '#e4d354' },
  { name: '2025', value: 21.43, color: '#f15c80' },
  { name: '2026', value: 3.57, color: '#2b908f' },
];

const dataJenisPendidikan = [
  { name: 'Universitas', value: 53.57, color: '#7cb5ec' },
  { name: 'Sekolah Tinggi', value: 28.57, color: '#434348' },
  { name: 'Institusi', value: 10.71, color: '#90ed7d' },
  { name: 'Akademi', value: 3.57, color: '#f7a35c' },
  { name: 'Politeknik', value: 3.57, color: '#8085e9' },
];

const dataJurusanPendidikan = [
  { name: 'Manajemen (S1)', value: 3.57, color: '#434348' },
  { name: 'Tidak Diisi', value: 96.43, color: '#7cb5ec' },
];

// Komponen Pembungkus Chart (agar rapi dan bisa download)
const ChartCard = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownload = async (format) => {
    setIsMenuOpen(false);
    if (!cardRef.current) return;
    if (format === 'Print') { window.print(); return; }

    try {
      const canvas = await html2canvas(cardRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const fileName = `Statistik-${title.replace(/\s+/g, '-')}`;

      if (format === 'PNG') {
        const link = document.createElement('a'); link.href = imgData; link.download = `${fileName}.png`; link.click();
      } else if (format === 'JPEG') {
        const jpegData = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a'); link.href = jpegData; link.download = `${fileName}.jpg`; link.click();
      } else if (format === 'PDF') {
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); pdf.save(`${fileName}.pdf`);
      }
    } catch (error) { alert("Gagal mengunduh grafik."); }
  };

  return (
    <div className="flex flex-col w-full" ref={cardRef}>
      <div className="flex justify-between items-center pb-3 mb-2">
        <h3 className="text-[18px] font-bold text-gray-800 flex-1 text-center pl-6">{title}</h3>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-800 p-1 rounded transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-[200px] bg-white border border-gray-200 rounded shadow-xl py-1 text-[13px] text-gray-700 z-[999]">
              <button onClick={() => handleDownload('Print')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Print chart</button>
              <div className="border-t border-gray-100 my-1"></div>
              <button onClick={() => handleDownload('PNG')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Download PNG image</button>
              <button onClick={() => handleDownload('JPEG')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Download JPEG image</button>
              <button onClick={() => handleDownload('PDF')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Download PDF document</button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[300px]">{children}</div>
    </div>
  );
};

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name, value }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isRight = x > cx;
  return (
    <text x={x} y={y} fill="#333" textAnchor={isRight ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight={500}>
      {`${name}: ${value}%`}
    </text>
  );
};

const renderCustomizedLabelLine = ({ cx, cy, midAngle, outerRadius }) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-midAngle * RADIAN);
  const cos = Math.cos(-midAngle * RADIAN);
  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15;
  return <path d={`M${sx},${sy}L${mx},${my}L${ex},${my}`} stroke="#999" fill="none" />;
};

const PendaftarChart = () => {
  // 🔥 State untuk Dropdown
  const [jenisPerhitungan, setJenisPerhitungan] = useState('Jumlah Pendaftar Per Frekuensi');
  const [frekuensi, setFrekuensi] = useState('Bulanan');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const chartRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownloadMain = async (format) => {
    setIsMenuOpen(false);
    if (!chartRef.current) return;
    if (format === 'Print') { window.print(); return; }

    try {
      const canvas = await html2canvas(chartRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      if (format === 'PNG') {
        const link = document.createElement('a'); link.href = imgData; link.download = 'Statistik-PMB.png'; link.click();
      } else if (format === 'JPEG') {
        const jpegData = canvas.toDataURL('image/jpeg', 0.9);
        const link = document.createElement('a'); link.href = jpegData; link.download = 'Statistik-PMB.jpg'; link.click();
      } else if (format === 'PDF') {
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); pdf.save('Statistik-PMB.pdf');
      }
    } catch (error) { alert("Gagal mengunduh grafik."); }
  };

  const jenisOptions = ['Jumlah Pendaftar Per Frekuensi', 'Jumlah Pendaftar Kumulatif'];
  const frekuensiOptions = ['Bulanan', '2 Mingguan', 'Mingguan', 'Harian'];

  // 🔥 Logika Pemilihan Data berdasarkan Dropdown
  const dataAktif = jenisPerhitungan === 'Jumlah Pendaftar Kumulatif' ? dataKumulatif : dataPerFrekuensi;
  const isKumulatif = jenisPerhitungan === 'Jumlah Pendaftar Kumulatif';

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-6">
      
      {/* ====== BAGIAN 1: CHART UTAMA ====== */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4 mb-6 gap-4">
          <h2 className="text-[20px] font-bold text-gray-900">Statistik Penerimaan Mahasiswa Baru</h2>
          <div className="flex flex-wrap items-start gap-4 w-full md:w-auto relative z-20">
            <div className="flex flex-col gap-1 w-full md:w-[280px]">
              <label className="text-[13px] font-bold text-blue-600">Jenis Perhitungan Grafik</label>
              <SearchableSelect options={jenisOptions} value={jenisPerhitungan} onChange={setJenisPerhitungan} placeholder="Pilih Jenis..." />
            </div>
            <div className="flex flex-col gap-1 w-full md:w-[160px]">
              <label className="text-[13px] font-bold text-blue-600">Frekuensi</label>
              <SearchableSelect options={frekuensiOptions} value={frekuensi} onChange={setFrekuensi} placeholder="Pilih Frekuensi..." />
            </div>
          </div>
        </div>

        <div className="relative w-full h-[380px] bg-white">
          <div className="absolute top-0 right-0 z-30" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-800 bg-white p-1 rounded transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-[200px] bg-white border border-gray-200 rounded shadow-2xl py-1 text-[13px] text-gray-700 z-[999]">
                <button onClick={() => handleDownloadMain('Print')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Print chart</button>
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={() => handleDownloadMain('PNG')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Download PNG image</button>
                <button onClick={() => handleDownloadMain('JPEG')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Download JPEG image</button>
                <button onClick={() => handleDownloadMain('PDF')} className="w-full text-left px-4 py-2 hover:bg-gray-100">Download PDF document</button>
              </div>
            )}
          </div>

          <div ref={chartRef} className="w-full h-full pt-8 bg-white">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataAktif} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#e5e7eb" />
                
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: '#6b7280' }} 
                  axisLine={{ stroke: '#d1d5db' }} 
                  tickLine={false} 
                  // 🔥 Memecah teks menjadi 2 baris untuk grafik kumulatif
                  tickFormatter={(value) => isKumulatif ? value.replace(' ', '\n') : value.replace(' ', '\n')} 
                />
                
                {/* 🔥 Domain Y Axis disesuaikan untuk Kumulatif */}
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  axisLine={false} 
                  tickLine={false} 
                  domain={isKumulatif ? [0, 400] : [0, 1500]} 
                  label={{ value: 'Jumlah Pendaftar', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }} 
                />
                
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={40} iconType="circle" wrapperStyle={{ fontSize: '13px', color: '#4b5563', paddingTop: '30px' }} />
                
                {/* 🔥 GARIS MERAH PUTUS-PUTUS (Hanya muncul di Kumulatif) */}
                {isKumulatif && (
                  <ReferenceLine y={80} stroke="red" strokeDasharray="5 5" strokeWidth={2} />
                )}

                <Line type="monotone" dataKey="Daftar" stroke="#9ca3af" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Aktif" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Finalisasi" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Lulus" stroke="#f97316" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Daftar Ulang" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="text-center text-[13px] text-gray-500 mt-4">Tanggal</div>
      </div>

      <hr className="border-gray-100 my-4" />

      {/* ====== BAGIAN 2: GRID 6 CHART (TIDAK BERUBAH) ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-4">
        
        <ChartCard title="Sumber Trafik Pendaftar">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataTrafik} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={renderCustomizedLabel} labelLine={renderCustomizedLabelLine}>
                {dataTrafik.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Funnel Penerimaan Mahasiswa Baru">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataFunnel} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={{ stroke: '#d1d5db' }} tickLine={false} interval={0} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} domain={[0, 40]} />
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              <Line type="monotone" dataKey="Periode1" name="Periode 20261" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Periode2" name="Periode 20251" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Jenis Kelamin">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataGender} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={renderCustomizedLabel} labelLine={renderCustomizedLabelLine}>
                {dataGender.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tahun Lulus">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataTahun} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} fill="#8884d8" label={renderCustomizedLabel} labelLine={renderCustomizedLabelLine}>
                {dataTahun.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Jenis Pendidikan">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataJenisPendidikan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={renderCustomizedLabel} labelLine={renderCustomizedLabelLine}>
                {dataJenisPendidikan.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Jurusan Pendidikan">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataJurusanPendidikan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="#8884d8" label={renderCustomizedLabel} labelLine={renderCustomizedLabelLine}>
                {dataJurusanPendidikan.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

    </div>
  );
};

export default PendaftarChart;