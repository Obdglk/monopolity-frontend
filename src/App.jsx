import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/public/HomePage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import MobileLibraryPage from './pages/public/MobileLibraryPage';
import DigitalLibraryPage from './pages/public/DigitalLibraryPage';
import SchoolPage from './pages/public/SchoolPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import Profile from './pages/public/account/Profile';
import MyPurchases from './pages/public/account/MyPurchases';
import CartPage from './pages/public/CartPage';
import SourcesPage from './pages/public/SourcesPage';

// Route protégée pour les clients
function ClientProtectedRoute() {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/bibliotheque/a-domicile" element={<MobileLibraryPage />} />
          <Route path="/bibliotheque/numerique" element={<DigitalLibraryPage />} />
          <Route path="/ecole" element={<SchoolPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/sources" element={<SourcesPage />} />
          {/* Routes protégées client */}
          <Route path="/account" element={<ClientProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="purchases" element={<MyPurchases />} />
          </Route>
        </Route>
        {/* Routes admin (exemple racine) */}
        <Route path="/admin" element={<AdminDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
