import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-300">
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 hidden sm:block">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h2>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:hidden">
            {user?.businessName}
          </h2>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}