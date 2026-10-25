import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './context/Login';
import DashboardLayout from './components/ui/DashboardLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Pendaftar from './pages/admin/Pendaftar'; // 🔥 Import Pendaftar

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
          
          {/* 🔥 Rute Pendaftar */}
          <Route path="/admin/pendaftar" element={<ProtectedRoute><DashboardLayout><Pendaftar /></DashboardLayout></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;