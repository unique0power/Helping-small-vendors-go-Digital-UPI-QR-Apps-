import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DigitalTools from './pages/DigitalTools';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Expenses from './pages/Expenses';
import QrGenerator from './pages/QrGenerator';
import Bills from './pages/Bills';
import MyShop from './pages/MyShop';
import Learn from './pages/Learn';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === 'Admin';

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes with Main Navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/tools" element={<DigitalTools />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : (isAdmin ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />)} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={isAuthenticated ? <Onboarding /> : <Navigate to="/login" />} />

        {/* Vendor Dashboard Routes */}
        <Route element={isAuthenticated && !isAdmin ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/qr" element={<QrGenerator />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route element={isAuthenticated && isAdmin ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Public Shop Route */}
        <Route path="/shop/:id" element={<MyShop />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
