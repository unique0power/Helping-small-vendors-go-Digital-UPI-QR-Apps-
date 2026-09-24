import { Link, useLocation } from 'react-router-dom';
import { Store, QrCode, LayoutDashboard, Settings, ShoppingBag, Receipt, LineChart, GraduationCap, Package } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'My Shop', icon: Store, path: '/shop/1', isPublic: true },
  { name: 'Digital Tools', icon: Package, path: '/tools' },
  { name: 'QR Code', icon: QrCode, path: '/qr' },
  { name: 'Products', icon: ShoppingBag, path: '/products' },
  { name: 'Sales', icon: LineChart, path: '/sales' },
  { name: 'Bills', icon: Receipt, path: '/bills' },
  { name: 'Learn Digital', icon: GraduationCap, path: '/learn' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col h-full text-slate-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center bg-amber-600 text-white w-8 h-8 rounded-lg overflow-hidden">
            <Store size={18} className="absolute z-10" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Digital<span className="text-amber-500">Dukaan</span>
          </span>
        </Link>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-1">
        <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Menu</div>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path === '/shop/1' ? '/shop' : item.path);
          return (
            <Link
              key={item.name}
              to={item.path === '/shop/1' ? '/shop/' + (user?.id || '1') : item.path}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-amber-600 text-white shadow-md shadow-amber-900/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon size={18} className={clsx("transition-colors", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
              {item.name}
              {item.isPublic && (
                <span className="ml-auto text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-md">Public</span>
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.businessName}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}