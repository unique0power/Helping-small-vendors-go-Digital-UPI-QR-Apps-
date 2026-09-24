import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, QrCode, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || !password) {
      toast.error('Please enter mobile number and password');
      return;
    }
    
    // Mock login
    login(mobile);
    toast.success('Welcome back to DigitalDukaan!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center bg-amber-600 text-white w-10 h-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform shadow-md">
              <Store size={22} className="absolute z-10" />
              <QrCode size={40} className="absolute opacity-20" />
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Digital<span className="text-amber-600">Dukaan</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Login to manage your digital business.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100 dark:border-slate-800">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                  placeholder="Enter your 10-digit number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all hover:shadow-lg hover:shadow-amber-600/30"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-amber-600 hover:text-amber-500 transition-colors inline-flex items-center gap-1">
                Create Account <ArrowRight size={14} />
              </Link>
            </p>
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-300 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}