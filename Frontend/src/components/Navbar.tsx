import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store, QrCode, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link to="/" className={clsx("font-medium hover:text-amber-600 transition-colors", location.pathname === '/' && "text-amber-600")}>Home</Link>
      {!isAuthenticated ? (
        <>
          <Link to="/about" className={clsx("font-medium hover:text-amber-600 transition-colors", location.pathname === '/about' && "text-amber-600")}>About</Link>
          <Link to="/tools" className={clsx("font-medium hover:text-amber-600 transition-colors", location.pathname === '/tools' && "text-amber-600")}>Digital Tools</Link>
          <Link to="/learn" className={clsx("font-medium hover:text-amber-600 transition-colors", location.pathname === '/learn' && "text-amber-600")}>Learn</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className={clsx("font-medium hover:text-amber-600 transition-colors", location.pathname === '/dashboard' && "text-amber-600")}>Dashboard</Link>
          <Link to="/tools" className={clsx("font-medium hover:text-amber-600 transition-colors", location.pathname === '/tools' && "text-amber-600")}>Modules</Link>
          <Link to={`/shop/${user?.id}`} className="font-medium hover:text-amber-600 transition-colors">My Shop</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed w-full h-16 bg-white dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center bg-amber-600 text-white w-9 h-9 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
            <Store size={20} className="absolute z-10" />
            <QrCode size={36} className="absolute opacity-20" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Digital<span className="text-amber-600">Dukaan</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-400">
          <NavLinks />
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-500 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle Dark Mode">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-slate-600 dark:text-slate-400 font-medium hover:text-amber-600 transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Get Started
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-slate-600 dark:text-slate-400 font-medium hover:text-red-600 transition-colors">
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:text-amber-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle Dark Mode">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-slate-600 dark:text-slate-400 p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-4 flex flex-col text-slate-600 dark:text-slate-400">
            <NavLinks />
            <hr className="border-slate-100 dark:border-slate-800" />
            {!isAuthenticated ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-center font-medium py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Login</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="text-center font-medium py-2 rounded-lg bg-amber-600 text-white shadow-sm">Get Started</Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="text-left font-medium text-red-600 py-2">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}