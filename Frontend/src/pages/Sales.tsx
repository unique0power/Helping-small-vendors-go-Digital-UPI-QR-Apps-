import { useState } from 'react';
import { Plus, LineChart, IndianRupee } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function Sales() {
  const { products, sales, addSale } = useData();
  const [isAdding, setIsAdding] = useState(false);
  
  const [newSale, setNewSale] = useState({
    productId: '',
    quantity: '1',
    paymentMethod: 'UPI' as 'UPI' | 'Cash' | 'Card'
  });

  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSale.productId || !newSale.quantity) {
      toast.error('Please select product and quantity');
      return;
    }

    const product = products.find(p => p.id === newSale.productId);
    if (!product) return;

    const amount = product.price * Number(newSale.quantity);

    addSale({
      productId: product.id,
      productName: product.name,
      amount: amount,
      quantity: Number(newSale.quantity),
      paymentMethod: newSale.paymentMethod
    });
    
    toast.success('Sale recorded successfully!');
    setIsAdding(false);
    setNewSale({ productId: '', quantity: '1', paymentMethod: 'UPI' });
  };

  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(s => s.date.startsWith(today));
  const todayTotal = todaySales.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Sales Tracker</h1>
          <p className="text-slate-500 text-sm">Record and analyze your daily sales.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Record Sale</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><LineChart size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Today's Total</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹{todayTotal}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><IndianRupee size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Today's Transactions</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{todaySales.length}</p>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Record New Sale</h3>
          <form onSubmit={handleAddSale} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product</label>
              <select required value={newSale.productId} onChange={e => setNewSale({...newSale, productId: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-slate-900">
                <option value="">Select a product...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
              <input type="number" required min="1" value={newSale.quantity} onChange={e => setNewSale({...newSale, quantity: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Payment Method</label>
              <select value={newSale.paymentMethod} onChange={e => setNewSale({...newSale, paymentMethod: e.target.value as 'UPI'|'Cash'|'Card'})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-slate-900">
                <option value="UPI">UPI</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-medium transition-colors">
              Save Record
            </button>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">Recent Sales</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 font-medium">Date & Time</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Qty</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.slice().reverse().map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                    {new Date(sale.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{sale.productName}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{sale.quantity}</td>
                  <td className="px-6 py-4 font-bold text-amber-600">₹{sale.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      sale.paymentMethod === 'UPI' ? 'bg-amber-100 text-amber-700' :
                      sale.paymentMethod === 'Cash' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {sale.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No sales recorded yet. Click "Record Sale" to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}