import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, QrCode, Smartphone, MessageCircle, BarChart3, Receipt, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function Onboarding() {
  const { user } = useAuth();
  const { scoreFeatures, updateFeature } = useData();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [businessDetails, setBusinessDetails] = useState({
    businessName: user?.businessName || '',
    category: '',
    phone: user?.phone || '',
    location: ''
  });

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
      }, 1500);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Digitalize My Shop</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Let's set up your digital business profile.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-600 -z-10 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= num ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30' : 'bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}>
                {step > num ? <CheckCircle2 size={20} /> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
            <span>Business Details</span>
            <span>Digital Needs</span>
            <span>Your Plan</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 dark:border-slate-800 overflow-hidden">
          {step === 1 && (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">Tell us about your business</h2>
              <form onSubmit={nextStep} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business Name *</label>
                    <input required type="text" value={businessDetails.businessName} onChange={e => setBusinessDetails({...businessDetails, businessName: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business Category *</label>
                    <select required value={businessDetails.category} onChange={e => setBusinessDetails({...businessDetails, category: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-slate-900">
                      <option value="">Select Category</option>
                      <option>Grocery Store</option>
                      <option>Bakery</option>
                      <option>Tea Stall</option>
                      <option>Restaurant</option>
                      <option>Clothing Shop</option>
                      <option>Beauty Salon</option>
                      <option>Electronics</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                    <input required type="tel" value={businessDetails.phone} onChange={e => setBusinessDetails({...businessDetails, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location *</label>
                    <input required type="text" value={businessDetails.location} onChange={e => setBusinessDetails({...businessDetails, location: e.target.value})} placeholder="City, State" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md flex items-center gap-2">
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="p-8 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">What does your business need?</h2>
              <p className="text-slate-500 mb-6">Select the tools you want to use. You can change this later.</p>
              
              <form onSubmit={nextStep}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <NeedCard id="upi" icon={<Smartphone />} title="UPI Payments" desc="Accept digital payments directly to bank" checked={scoreFeatures.upi} onChange={(c) => updateFeature('upi', c)} />
                  <NeedCard id="qr" icon={<QrCode />} title="QR Code" desc="Printable payment QR for your shop" checked={scoreFeatures.qr} onChange={(c) => updateFeature('qr', c)} />
                  <NeedCard id="whatsapp" icon={<MessageCircle />} title="WhatsApp Business" desc="Connect with customers directly" checked={scoreFeatures.whatsapp} onChange={(c) => updateFeature('whatsapp', c)} />
                  <NeedCard id="catalog" icon={<Store />} title="Digital Catalog" desc="List your products online" checked={scoreFeatures.catalog} onChange={(c) => updateFeature('catalog', c)} />
                  <NeedCard id="sales" icon={<BarChart3 />} title="Sales Tracking" desc="Monitor daily income and profit" checked={scoreFeatures.salesTracking} onChange={(c) => updateFeature('salesTracking', c)} />
                  <NeedCard id="bills" icon={<Receipt />} title="Digital Bills" desc="Generate receipts for customers" checked={scoreFeatures.digitalBills} onChange={(c) => updateFeature('digitalBills', c)} />
                </div>
                
                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-700 dark:text-slate-300 font-medium px-4 py-2">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md flex items-center gap-2 disabled:opacity-70">
                    {loading ? 'Creating Plan...' : 'Create My Digital Plan'} <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="p-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Your Digital Shop Plan is Ready!</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">We've personalized your dashboard based on {businessDetails.businessName}'s needs.</p>
              
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Your Checklist to 100% Digital</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    {scoreFeatures.qr ? <CheckCircle2 className="text-emerald-500" size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                    <span>Generate QR Code</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    {scoreFeatures.catalog ? <CheckCircle2 className="text-emerald-500" size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                    <span>Add products to Digital Catalog</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    {scoreFeatures.salesTracking ? <CheckCircle2 className="text-emerald-500" size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                    <span>Record your first sale</span>
                  </li>
                </ul>
              </div>

              <button onClick={() => navigate('/dashboard')} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-amber-600/30 flex items-center justify-center gap-2 mx-auto w-full max-w-md">
                Go To Dashboard <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NeedCard({ id, icon, title, desc, checked, onChange }: { id: string, icon: React.ReactNode, title: string, desc: string, checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <label className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm focus:outline-none transition-all ${
      checked ? 'border-amber-600 bg-amber-50/50' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-300'
    }`}>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="flex flex-1">
        <span className="flex flex-col">
          <span className="flex items-center gap-3 mb-2">
            <span className={`p-2 rounded-lg ${checked ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 dark:text-slate-400'}`}>
              {icon}
            </span>
            <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</span>
          </span>
          <span className="mt-1 flex items-center text-xs text-slate-500">{desc}</span>
        </span>
      </span>
      <CheckCircle2 className={`h-5 w-5 ${checked ? 'text-amber-600' : 'text-transparent'}`} />
    </label>
  );
}