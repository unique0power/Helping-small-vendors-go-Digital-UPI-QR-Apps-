import { useState } from 'react';
import { Plus, TrendingDown, Wallet } from 'lucide-react';
import { useData, type Expense } from '../context/DataContext';
import toast from 'react-hot-toast';

const CATEGORIES = ['Stock', 'Rent', 'Electricity', 'Transport', 'Marketing', 'Salary', 'Other'];

export default function Expenses() {
  const { expenses, addExpense } = useData();
  const [isAdding, setIsAdding] = useState(false);
  
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id' | 'date'>>({
    category: 'Stock',
    amount: 0,
    notes: ''
  });

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || newExpense.amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    addExpense({
      ...newExpense,
      amount: Number(newExpense.amount)
    });
    
    toast.success('Expense recorded successfully!');
    setIsAdding(false);
    setNewExpense({ category: 'Stock', amount: 0, notes: '' });
  };

  const today = new Date().toISOString().split('T')[0];
  const todayExpenses = expenses.filter(e => e.date.startsWith(today));
  const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Expense Tracker</h1>
          <p className="text-slate-500 text-sm">Monitor your business spending to calculate profit.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          {isAdding ? 'Cancel' : <><Plus size={18} /> Record Expense</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-lg"><TrendingDown size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Today's Expenses</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹{todayTotal}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-600 dark:text-slate-400 rounded-lg"><Wallet size={24} /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Expenses</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹{totalExpenses}</p>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">Record New Expense</h3>
          <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
              <select required value={newExpense.category} onChange={e => setNewExpense({...newExpense, category: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-slate-900">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Amount (₹)</label>
              <input type="number" required min="1" value={newExpense.amount || ''} onChange={e => setNewExpense({...newExpense, amount: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes (Optional)</label>
              <input type="text" value={newExpense.notes} onChange={e => setNewExpense({...newExpense, notes: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-amber-500 focus:border-amber-500" placeholder="e.g. Paid supplier" />
            </div>
            <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 rounded-lg font-medium transition-colors">
              Save Expense
            </button>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">Expense History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-3 font-medium">Date & Time</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Notes</th>
                <th className="px-6 py-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.slice().reverse().map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">
                    {new Date(expense.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{expense.category}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{expense.notes || '-'}</td>
                  <td className="px-6 py-4 font-bold text-rose-600">₹{expense.amount}</td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No expenses recorded yet.
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