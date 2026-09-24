import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, Users, BarChart, Settings, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-800 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-amber-950 border-r border-amber-900 hidden md:flex flex-col h-full text-amber-200">
        <div className="h-16 flex items-center px-6 border-b border-amber-900 bg-amber-950">
          <Link to="/admin" className="flex items-center gap-2">
            <Store size={18} className="text-amber-400" />
            <span className="text-lg font-bold text-white tracking-tight">Admin<span className="text-amber-400">Panel</span></span>
          </Link>
        </div>
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-amber-600 text-white shadow-md shadow-amber-900/20">
            <BarChart size={18} /> Overview
          </Link>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-900 hover:text-white cursor-pointer transition-colors">
            <Users size={18} /> Vendors
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-900 hover:text-white cursor-pointer transition-colors">
            <Store size={18} /> Businesses
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-900 hover:text-white cursor-pointer transition-colors">
            <Settings size={18} /> Settings
          </div>
        </div>
        <div className="p-4 border-t border-amber-900">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 w-full transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 z-10 shrink-0">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Admin Dashboard</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
