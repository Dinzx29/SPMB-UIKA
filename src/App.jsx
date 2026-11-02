import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './context/Login';
import DashboardLayout from './components/ui/DashboardLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Pendaftar from './pages/admin/Pendaftar';
import DataPendaftar from './pages/admin/DataPendaftar'; // 🔥 Import Detail/Tambah Pendaftar
import OneDayService from './pages/admin/OneDayService';
import OdsPencarianPendaftar from './pages/admin/OdsPencarianPendaftar'; // 🔥 Import Pencarian Pendaftar ODS
import LeadsMaukuliah from './pages/admin/LeadsMaukuliah'; // 🔥 Import halaman Leads Maukuliah

// 🔥 Import Modul & Laporan Rekognisi Pembelajaran Lampau (RPL) Terpisah & Rapi
import KesiapanRpl from './pages/admin/rpl/KesiapanRpl';
import MasterAsesorRpl from './pages/admin/rpl/MasterAsesorRpl';
import SeleksiRpl from './pages/admin/rpl/SeleksiRpl';
import RekapPendaftarRpl from './pages/admin/rpl/RekapPendaftarRpl';
import SierraRpl from './pages/admin/rpl/SierraRpl';
import SkPenerimaanRpl from './pages/admin/rpl/SkPenerimaanRpl';
import HasilPenilaianRpl from './pages/admin/rpl/HasilPenilaianRpl';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/admin/dashboard" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardLayout><AdminDashboard /></DashboardLayout></ProtectedRoute>} />

          <Route path="/admin/pendaftar" element={<ProtectedRoute><DashboardLayout><Pendaftar /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/data_pendaftar" element={<ProtectedRoute><DashboardLayout><DataPendaftar /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/pendaftar/tambah" element={<ProtectedRoute><DashboardLayout><DataPendaftar /></DashboardLayout></ProtectedRoute>} />

          {/* 🔥 Rute One Day Service */}
          <Route path="/admin/one_day_service" element={<ProtectedRoute><DashboardLayout><OneDayService /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/ods_pencarianpendaftar" element={<ProtectedRoute><DashboardLayout><OdsPencarianPendaftar /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/one_day_service/pencarian" element={<ProtectedRoute><DashboardLayout><OdsPencarianPendaftar /></DashboardLayout></ProtectedRoute>} />

          {/* 🔥 Rute Leads Maukuliah */}
          <Route path="/admin/list_leads" element={<ProtectedRoute><DashboardLayout><LeadsMaukuliah /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/pendaftar/list_leads" element={<ProtectedRoute><DashboardLayout><LeadsMaukuliah /></DashboardLayout></ProtectedRoute>} />

          {/* 🔥 Rute Modul Utama Rekognisi Pembelajaran Lampau (RPL) */}
          <Route path="/admin/rpl/kesiapan" element={<ProtectedRoute><DashboardLayout><KesiapanRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/list_kesiapan_rpl" element={<ProtectedRoute><DashboardLayout><KesiapanRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/rpl/list_kesiapan_rpl" element={<ProtectedRoute><DashboardLayout><KesiapanRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/rpl/asesor" element={<ProtectedRoute><DashboardLayout><MasterAsesorRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/rpl/seleksi" element={<ProtectedRoute><DashboardLayout><SeleksiRpl /></DashboardLayout></ProtectedRoute>} />

          {/* 🔥 Rute Laporan-Laporan RPL */}
          <Route path="/admin/rpl/rekap-pendaftar" element={<ProtectedRoute><DashboardLayout><RekapPendaftarRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/rpl/sierra" element={<ProtectedRoute><DashboardLayout><SierraRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/rpl/sk-penerimaan" element={<ProtectedRoute><DashboardLayout><SkPenerimaanRpl /></DashboardLayout></ProtectedRoute>} />
          <Route path="/admin/rpl/hasil-penilaian" element={<ProtectedRoute><DashboardLayout><HasilPenilaianRpl /></DashboardLayout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;