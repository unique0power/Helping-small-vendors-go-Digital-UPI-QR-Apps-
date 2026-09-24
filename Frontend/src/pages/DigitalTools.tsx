import { Link } from 'react-router-dom';
import { Smartphone, QrCode, Store, Package, Receipt, LineChart, TrendingDown, Megaphone, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function DigitalTools() {
  const { scoreFeatures } = useData();

  const tools = [
    {
      title: "UPI Setup",
      desc: "Learn how to accept digital payments directly to your bank.",
      icon: <Smartphone className="text-amber-600" size={28} />,
      path: "/learn",
      bg: "bg-amber-100",
      status: scoreFeatures.upi ? "Active" : "Pending"
    },
    {
      title: "QR Code Generator",
      desc: "Generate a QR code using your UPI ID for customers to scan.",
      icon: <QrCode className="text-amber-600" size={28} />,
      path: "/qr",
      bg: "bg-amber-100",
      status: scoreFeatures.qr ? "Active" : "Pending"
    },
    {
      title: "Digital Business Profile",
      desc: "Create and manage your online shop profile for customers.",
      icon: <Store className="text-fuchsia-600" size={28} />,
      path: "/shop/1",
      bg: "bg-fuchsia-100",
      status: scoreFeatures.onlineProfile ? "Active" : "Pending"
    },
    {
      title: "Digital Catalog",
      desc: "Create and manage your products and pricing.",
      icon: <Package className="text-emerald-600" size={28} />,
      path: "/products",
      bg: "bg-emerald-100",
      status: scoreFeatures.catalog ? "Active" : "Pending"
    },
    {
      title: "Bill Generator",
      desc: "Generate professional digital receipts for your customers.",
      icon: <Receipt className="text-amber-600" size={28} />,
      path: "/bills",
      bg: "bg-amber-100",
      status: scoreFeatures.digitalBills ? "Active" : "Pending"
    },
    {
      title: "Sales Tracker",
      desc: "Record daily sales and analyze your revenue.",
      icon: <LineChart className="text-cyan-600" size={28} />,
      path: "/sales",
      bg: "bg-cyan-100",
      status: scoreFeatures.salesTracking ? "Active" : "Pending"
    },
    {
      title: "Expense Tracker",
      desc: "Record business expenses and monitor your cash flow.",
      icon: <TrendingDown className="text-rose-600" size={28} />,
      path: "/expenses",
      bg: "bg-rose-100",
      status: "Available"
    },
    {
      title: "Digital Marketing",
      desc: "Learn basic online marketing to grow your business.",
      icon: <Megaphone className="text-orange-600" size={28} />,
      path: "/learn",
      bg: "bg-orange-100",
      status: "Available"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Digital Tools</h1>
        <p className="text-slate-500 text-sm mt-1">Everything you need to run and grow your digital business.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className={`${tool.bg} p-3 rounded-xl`}>
                {tool.icon}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                tool.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                tool.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                'bg-slate-100 text-slate-600 dark:text-slate-400'
              }`}>
                {tool.status}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">{tool.title}</h3>
            <p className="text-slate-500 text-sm mb-6 flex-1">{tool.desc}</p>
            
            <Link to={tool.path} className="flex items-center justify-between text-amber-600 font-medium group-hover:text-amber-700 w-full pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
              Open Tool <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}