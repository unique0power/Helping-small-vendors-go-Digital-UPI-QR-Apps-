import { useState } from 'react';
import { Search, Plus, Store } from 'lucide-react';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

export default function Products() {
  const { products, addProduct } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Grocery'
  });

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please enter name and price');
      return;
    }
    
    addProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category
    });
    
    toast.success('Product added successfully!');
    setIsAdding(false);
    setNewProduct({ name: '', price: '', category: 'Grocery' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Digital Catalog</h1>
          <p className="text-slate-500 text-sm">Manage your products and pricing.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Add Product</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Product Name</label>
              <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="e.g. Ashirvaad Atta" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Price (₹)</label>
              <input type="number" required min="0" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-slate-900">
                <option>Grocery</option>
                <option>Dairy</option>
                <option>Snacks</option>
                <option>Beverages</option>
                <option>Personal Care</option>
                <option>Other</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium transition-colors">
              Save Product
            </button>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
          </div>
          <span className="text-sm text-slate-500 font-medium hidden sm:block">{filteredProducts.length} items</span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-amber-300 hover:shadow-md transition-all group bg-white dark:bg-slate-900">
                <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-300 group-hover:bg-amber-50 transition-colors">
                  <Store size={40} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-amber-600 font-bold">₹{product.price}</span>
                  <span className="text-xs font-medium bg-slate-100 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">{product.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
            <Store size={48} className="mb-4 text-slate-300" />
            <p className="text-lg font-medium text-slate-900 dark:text-slate-100">No products found</p>
            <p className="text-sm">Try adding a new product to your catalog.</p>
          </div>
        )}
      </div>
    </div>
  );
}