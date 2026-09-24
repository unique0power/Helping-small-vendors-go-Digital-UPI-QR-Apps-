import { Link } from 'react-router-dom';
import { Store, QrCode } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4 inline-flex">
              <div className="relative flex items-center justify-center bg-amber-600 text-white w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                <Store size={18} className="absolute z-10" />
                <QrCode size={30} className="absolute opacity-20" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Digital<span className="text-amber-500">Dukaan</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              "Helping small businesses go digital."
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">Digital Tools</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">Dashboard</Link></li>
              <li><Link to="/shop/1" className="text-slate-400 hover:text-white transition-colors text-sm">My Shop</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Learn</h3>
            <ul className="space-y-3">
              <li><Link to="/learn" className="text-slate-400 hover:text-white transition-colors text-sm">UPI Payments</Link></li>
              <li><Link to="/learn" className="text-slate-400 hover:text-white transition-colors text-sm">Online Presence</Link></li>
              <li><Link to="/learn" className="text-slate-400 hover:text-white transition-colors text-sm">Marketing</Link></li>
              <li><Link to="/learn" className="text-slate-400 hover:text-white transition-colors text-sm">Business Management</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 DigitalDukaan. Built to empower local businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}