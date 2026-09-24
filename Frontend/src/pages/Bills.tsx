import { useState } from 'react';
import { Plus, Receipt, Printer, Download, Store, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function Bills() {
  const { user } = useAuth();
  const { products, scoreFeatures, updateFeature } = useData();
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<{ productId: string, name: string, price: number, qty: number }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const existingItem = items.find(i => i.productId === product.id);
    if (existingItem) {
      setItems(items.map(i => i.productId === product.id ? { ...i, qty: i.qty + Number(quantity) } : i));
    } else {
      setItems([...items, { productId: product.id, name: product.name, price: product.price, qty: Number(quantity) }]);
    }
    
    setSelectedProduct('');
    setQuantity('1');
  };

  const removeItem = (productId: string) => {
    setItems(items.filter(i => i.productId !== productId));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const generateBill = () => {
    if (items.length === 0) {
      toast.error('Please add at least one item');
      return;
    }
    setIsGenerated(true);
    toast.success('Bill generated successfully!');
    if (!scoreFeatures.digitalBills) updateFeature('digitalBills', true);
  };

  const resetBill = () => {
    setIsGenerated(false);
    setItems([]);
    setCustomerName('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Digital Bills</h1>
        <p className="text-slate-500 text-sm">Create professional digital receipts for your customers.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Bill Builder */}
        <div className={`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all ${isGenerated ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2">
            <Plus className="text-amber-600" /> Create New Bill
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Customer Name (Optional)</label>
              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. Rahul" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" />
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <form onSubmit={handleAddItem} className="flex gap-2 items-end mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product</label>
                  <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-900 focus:ring-amber-500">
                    <option value="">Select product...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - ₹{p.price}</option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Qty</label>
                  <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500" />
                </div>
                <button type="submit" disabled={!selectedProduct} className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white p-2.5 rounded-lg transition-colors">
                  <Plus size={20} />
                </button>
              </form>

              {/* Items List */}
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 min-h-[150px] mb-6">
                {items.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">No items added yet</div>
                ) : (
                  <ul className="divide-y divide-slate-200">
                    {items.map(item => (
                      <li key={item.productId} className="flex justify-between items-center p-2 text-sm">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{item.name}</p>
                          <p className="text-slate-500">{item.qty} × ₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900 dark:text-slate-100">₹{item.qty * item.price}</span>
                          <button onClick={() => removeItem(item.productId)} className="text-red-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 px-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-lg">Total Amount:</span>
                <span className="font-bold text-amber-600 text-2xl">₹{total}</span>
              </div>

              <button onClick={generateBill} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2">
                <Receipt size={20} /> Generate Bill
              </button>
            </div>
          </div>
        </div>

        {/* Bill Preview */}
        <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner flex flex-col items-center min-h-[600px]">
          {isGenerated ? (
            <div className="w-full max-w-sm flex flex-col items-center animate-in zoom-in duration-500">
              {/* Receipt Paper */}
              <div className="bg-white dark:bg-slate-900 w-full rounded-b-sm border border-slate-200 dark:border-slate-700 shadow-xl relative pb-8">
                {/* Receipt Zig Zag Top */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-slate-100" style={{ backgroundImage: 'linear-gradient(135deg, white 25%, transparent 25%), linear-gradient(225deg, white 25%, transparent 25%)', backgroundSize: '12px 12px', backgroundPosition: '0 0, 6px 0' }}></div>
                
                <div className="px-6 pt-10 pb-6 text-center border-b-2 border-dashed border-slate-200 dark:border-slate-700">
                  <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight uppercase mb-1">DIGITALDUKAAN</h2>
                  <h3 className="font-bold text-slate-700 dark:text-slate-300">{user?.businessName}</h3>
                  <p className="text-xs text-slate-500 mt-2">{new Date().toLocaleString('en-IN')}</p>
                </div>
                
                <div className="px-6 py-6">
                  {customerName && (
                    <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-500 uppercase">Customer</p>
                      <p className="font-medium text-slate-900 dark:text-slate-100">{customerName}</p>
                    </div>
                  )}

                  <table className="w-full text-sm mb-6">
                    <thead>
                      <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-slate-700">
                        <th className="pb-2 font-medium">Item</th>
                        <th className="pb-2 font-medium text-right">Amt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map(item => (
                        <tr key={item.productId}>
                          <td className="py-3">
                            <p className="font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.qty} × ₹{item.price}</p>
                          </td>
                          <td className="py-3 text-right font-medium text-slate-900 dark:text-slate-100">₹{item.qty * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-lg">TOTAL</span>
                    <span className="font-black text-slate-900 dark:text-slate-100 text-xl">₹{total}</span>
                  </div>
                </div>

                <div className="px-6 pb-2 text-center">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Thank You!</p>
                  <p className="text-xs text-slate-400">Visit Again</p>
                </div>
              </div>

              <div className="flex gap-4 mt-8 w-full justify-center">
                <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-medium transition-colors text-sm">
                  <Printer size={16} /> Print
                </button>
                <button onClick={() => toast.success('Bill downloaded!')} className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl font-medium transition-colors text-sm">
                  <Download size={16} /> Download
                </button>
                <button onClick={resetBill} className="text-sm font-medium text-amber-600 hover:text-amber-800 ml-4">
                  New Bill
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 h-full flex flex-col justify-center">
              <div className="w-32 h-32 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm">
                <Receipt size={48} className="text-slate-300" />
              </div>
              <p className="font-medium text-slate-500">Bill Preview</p>
              <p className="text-sm">Add items to see the digital receipt.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}