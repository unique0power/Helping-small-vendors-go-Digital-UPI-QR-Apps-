import { Users, Store, QrCode, Receipt, IndianRupee, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: "Total Vendors", value: "1,248", icon: <Users size={24} className="text-amber-500" /> },
    { title: "Active Vendors", value: "892", icon: <Store size={24} className="text-emerald-500" /> },
    { title: "Digital Shops", value: "1,105", icon: <Store size={24} className="text-amber-500" /> },
    { title: "QR Codes Generated", value: "4,592", icon: <QrCode size={24} className="text-purple-500" /> },
    { title: "Bills Generated", value: "12,845", icon: <Receipt size={24} className="text-amber-500" /> },
    { title: "Total Sales Recorded", value: "₹4.2 Cr", icon: <IndianRupee size={24} className="text-emerald-600" /> }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Platform Overview</h1>
        <p className="text-slate-500">Monitor DigitalDukaan's growth across India.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</h3>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Recent Vendor Registrations</h3>
          </div>
          <div className="space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">V{i}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Vendor {i} Store</p>
                    <p className="text-xs text-slate-500">Joined {i} hour{i>1?'s':''} ago</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">Active</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-gradient-to-br from-amber-600 to-amber-700 text-white">
          <h3 className="font-bold mb-2 flex items-center gap-2"><TrendingUp size={20} /> Weekly Growth</h3>
          <p className="text-amber-100 mb-8 text-sm">Platform usage is accelerating rapidly.</p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Vendor Growth</span>
                <span className="font-bold">+24%</span>
              </div>
              <div className="w-full bg-amber-900/50 rounded-full h-2">
                <div className="bg-white dark:bg-slate-900 h-2 rounded-full w-[75%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>QR Code Usage</span>
                <span className="font-bold">+42%</span>
              </div>
              <div className="w-full bg-amber-900/50 rounded-full h-2">
                <div className="bg-emerald-400 h-2 rounded-full w-[90%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Digital Bills Created</span>
                <span className="font-bold">+18%</span>
              </div>
              <div className="w-full bg-amber-900/50 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full w-[60%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
