import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, QrCode } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!formData.fullName || !formData.businessName || !formData.mobile) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Mock registration login
    login(formData.mobile, formData.fullName, formData.businessName);
    toast.success('Account created successfully!');
    navigate('/onboarding');
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
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Create Your Digital Shop
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Join thousands of smart vendors growing their business online.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100 dark:border-slate-800">
          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name *</label>
                <input
                  name="fullName" type="text" required
                  value={formData.fullName} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="Rahul Sharma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Business Name *</label>
                <input
                  name="businessName" type="text" required
                  value={formData.businessName} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="Sharma General Store"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Mobile Number *</label>
                <input
                  name="mobile" type="tel" required
                  value={formData.mobile} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email (Optional)</label>
                <input
                  name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="rahul@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password *</label>
                <input
                  name="password" type="password" required
                  value={formData.password} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password *</label>
                <input
                  name="confirmPassword" type="password" required
                  value={formData.confirmPassword} onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all hover:shadow-lg hover:shadow-amber-600/30"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500 transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}