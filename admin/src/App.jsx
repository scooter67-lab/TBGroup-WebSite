import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CasesAdmin from './pages/CasesAdmin';
import ReviewsAdmin from './pages/ReviewsAdmin';
import ServicesAdmin from './pages/ServicesAdmin';
import BannersAdmin from './pages/BannersAdmin';
import SettingsAdmin from './pages/SettingsAdmin';
import PagesAdmin from './pages/PagesAdmin';
import ContactsAdmin from './pages/ContactsAdmin';
import ProfileAdmin from './pages/ProfileAdmin';

function PrivateRoute({ children }) {
  const { isAuth, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cases" element={<CasesAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="banners" element={<BannersAdmin />} />
        <Route path="pages" element={<PagesAdmin />} />
        <Route path="settings" element={<SettingsAdmin />} />
        <Route path="contacts" element={<ContactsAdmin />} />
        <Route path="profile" element={<ProfileAdmin />} />
      </Route>
    </Routes>
  );
}
