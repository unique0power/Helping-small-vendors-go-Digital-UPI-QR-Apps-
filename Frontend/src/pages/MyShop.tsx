import { useParams, Link } from 'react-router-dom';
import { Store, Phone, MessageCircle, MapPin, Share2, Clock, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function MyShop() {
  const { id } = useParams();
  const { products } = useData();
  const { user } = useAuth();
  
  // In a real app we'd fetch this from API by ID
  // Using context data for now
  const businessName = user?.businessName || "Sharma General Store";
  const category = "Grocery Store";
  const location = "Mumbai, Maharashtra";
  const phone = user?.phone || "9876543210";

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Shop link copied to clipboard!');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-800 min-h-screen pb-20">
      {/* Header Cover */}
      <div className="bg-slate-900 text-white pt-12 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-600 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="w-24 h-24 bg-white dark:bg-slate-900 text-amber-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <Store size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">{businessName}</h1>
          <p className="text-amber-200 font-medium mb-6 flex items-center justify-center gap-2">
            <span className="bg-amber-600/30 px-3 py-1 rounded-full text-sm border border-amber-500/30">{category}</span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-300">
            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-amber-400" /> {location}</span>
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-emerald-400" /> Open until 10 PM</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-20 mb-12">
        {/* Action Buttons */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl shadow-slate-200/50 border border-slate-100 dark:border-slate-800 flex flex-wrap justify-center sm:justify-between gap-4">
          <a href={`tel:${phone}`} className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Phone size={20} /></div>
            Call
          </a>
          <a href={`https://wa.me/91${phone}`} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><MessageCircle size={20} /></div>
            WhatsApp
          </a>
          <button className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><MapPin size={20} /></div>
            Directions
          </button>
          <button onClick={handleShare} className="flex-1 min-w-[120px] flex flex-col items-center justify-center gap-2 p-3 rounded-xl hover:bg-slate-50 dark:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 font-medium">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center"><Share2 size={20} /></div>
            Share Shop
          </button>
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Digital Catalog</h2>
          <span className="text-sm text-slate-500 font-medium">{products.length} items available</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl mb-4 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                <Store size={40} className="text-slate-300" />
              </div>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate text-sm sm:text-base">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{product.category}</p>
                </div>
                <div className="bg-amber-50 px-2 py-1 rounded-md">
                  <span className="font-bold text-amber-700 text-sm">₹{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 shadow-sm">
            <Store size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">No products listed yet.</p>
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
        <p className="text-sm font-medium text-slate-500 flex items-center justify-center gap-1.5">
          <CheckCircle2 size={16} className="text-emerald-500" /> 
          Verified Business on <span className="font-bold text-slate-900 dark:text-slate-100">DigitalDukaan</span>
        </p>
      </div>
    </div>
  );
}