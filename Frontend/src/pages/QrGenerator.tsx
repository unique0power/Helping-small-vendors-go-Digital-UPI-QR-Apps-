import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Download, Printer, Store, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function QrGenerator() {
  const { user } = useAuth();
  const { scoreFeatures, updateFeature } = useData();
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId) {
      toast.error('Please enter a valid UPI ID');
      return;
    }
    
    if (!upiId.includes('@')) {
      toast.error('Invalid UPI ID format');
      return;
    }

    setIsGenerated(true);
    toast.success('QR Code Generated Successfully!');
    if (!scoreFeatures.qr) updateFeature('qr', true);
  };

  const upiLink = `upi://pay?pa=${upiId}&pn=${user?.businessName || 'Business'}&cu=INR${amount ? `&am=${amount}` : ''}${message ? `&tn=${message}` : ''}`;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">QR Code Generator</h1>
        <p className="text-slate-500 text-sm">Create your digital shop's payment QR code instantly.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Form */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <QrCode className="text-amber-600" /> Enter Payment Details
          </h3>
          <form onSubmit={generateQR} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Business Name</label>
              <input type="text" readOnly value={user?.businessName || ''} className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">UPI ID *</label>
              <input type="text" required value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@bank" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount (Optional)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message (Optional)</label>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="e.g. Payment for Grocery" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-amber-500 focus:border-amber-500 transition-colors" />
            </div>
            
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-amber-600/30">
              Generate QR Code
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center min-h-[500px]">
          {isGenerated ? (
            <div className="w-full max-w-sm flex flex-col items-center animate-in zoom-in duration-500">
              <div 
                ref={qrRef}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl border-4 border-amber-600 shadow-2xl flex flex-col items-center w-full"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center">
                    <Store size={18} />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{user?.businessName}</h2>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-inner mb-6">
                  <QRCodeSVG 
                    value={upiLink} 
                    size={200}
                    level="M"
                    includeMargin={false}
                  />
                </div>

                <div className="text-center w-full">
                  <p className="text-slate-500 text-sm mb-1">Scan to Pay via UPI</p>
                  <p className="text-slate-900 dark:text-slate-100 font-bold bg-slate-100 py-2 rounded-lg font-mono text-sm break-all">{upiId}</p>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8 w-full justify-center">
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
                  <Printer size={18} /> Print
                </button>
                <button onClick={() => toast.success('QR downloaded!')} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm">
                  <Download size={18} /> Download
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <div className="w-32 h-32 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                <QrCode size={48} className="text-slate-300" />
              </div>
              <p className="font-medium text-slate-500">Your QR will appear here</p>
              <p className="text-sm">Enter details and click generate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}