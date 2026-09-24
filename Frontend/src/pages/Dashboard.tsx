import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IndianRupee, TrendingUp, TrendingDown, Target, QrCode, Plus, Receipt } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../context/DataContext';

export default function Dashboard() {
  const { sales, expenses, getDigitalScore, scoreFeatures } = useData();
  const score = getDigitalScore();

  // Calculate today's stats
  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(s => s.date.startsWith(today)).reduce((sum, s) => sum + s.amount, 0);
  const todayExpenses = expenses.filter(e => e.date.startsWith(today)).reduce((sum, e) => sum + e.amount, 0);
  const profit = todaySales - todayExpenses;

  // Chart data (mock week data combined with real today data)
  const chartData = [
    { name: 'Mon', sales: 1200 },
    { name: 'Tue', sales: 1900 },
    { name: 'Wed', sales: 1500 },
    { name: 'Thu', sales: 2200 },
    { name: 'Fri', sales: 1800 },
    { name: 'Sat', sales: 2800 },
    { name: 'Sun', sales: todaySales > 0 ? todaySales : 1000 }, // Use actual today if exists
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Sales" value={`₹${todaySales}`} icon={<TrendingUp size={24} className="text-emerald-500" />} trend="+12% from yesterday" />
        <StatCard title="Today's Expenses" value={`₹${todayExpenses}`} icon={<TrendingDown size={24} className="text-rose-500" />} trend="Within daily limit" />
        <StatCard title="Estimated Profit" value={`₹${profit}`} icon={<IndianRupee size={24} className="text-amber-500" />} trend="Great job today!" />
        <StatCard title="Digital Score" value={`${score}%`} icon={<Target size={24} className="text-amber-500" />} trend={score === 100 ? "Fully Digital!" : "Needs Improvement"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Weekly Sales Overview</h3>
            <select className="text-sm border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 focus:ring-amber-500 focus:border-amber-500">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(val) => `₹${val}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value}`, 'Sales']}
                />
                <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Digital Readiness */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-2">Digital Readiness</h3>
          <p className="text-sm text-slate-500 mb-6">Complete these steps to become a fully digital business.</p>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700 dark:text-slate-300">Your Score</span>
              <span className="font-bold text-amber-600">{score}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-amber-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${score}%` }}></div>
            </div>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto pr-2">
            <ChecklistItem title="Setup UPI Payments" isDone={scoreFeatures.upi} />
            <ChecklistItem title="Generate QR Code" isDone={scoreFeatures.qr} />
            <ChecklistItem title="Create Digital Profile" isDone={scoreFeatures.onlineProfile} />
            <ChecklistItem title="Add Products to Catalog" isDone={scoreFeatures.catalog} />
            <ChecklistItem title="Track Daily Sales" isDone={scoreFeatures.salesTracking} />
            <ChecklistItem title="Generate Digital Bills" isDone={scoreFeatures.digitalBills} />
          </div>

          <Link to="/onboarding" className="mt-4 w-full py-2.5 bg-amber-50 text-amber-600 font-medium rounded-lg text-center hover:bg-amber-100 transition-colors">
            Improve Score
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction title="Generate QR" icon={<QrCode size={20} />} path="/qr" color="bg-amber-100 text-amber-600" />
          <QuickAction title="Add Sale" icon={<Plus size={20} />} path="/sales" color="bg-emerald-100 text-emerald-600" />
          <QuickAction title="Create Bill" icon={<Receipt size={20} />} path="/bills" color="bg-amber-100 text-amber-600" />
          <QuickAction title="Add Product" icon={<Plus size={20} />} path="/products" color="bg-amber-100 text-amber-600" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</h4>
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{icon}</div>
      </div>
      <p className="text-xs text-slate-500 mt-4">{trend}</p>
    </div>
  );
}

function ChecklistItem({ title, isDone }: { title: string, isDone: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs ${isDone ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 text-transparent'}`}>
        ✓
      </div>
      <span className={`text-sm ${isDone ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300 font-medium'}`}>{title}</span>
    </div>
  );
}

function QuickAction({ title, icon, path, color }: { title: string, icon: React.ReactNode, path: string, color: string }) {
  return (
    <Link to={path} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center gap-3 hover:shadow-md hover:border-amber-300 transition-all group">
      <div className={`p-2.5 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="font-semibold text-slate-700 dark:text-slate-300">{title}</span>
    </Link>
  );
}