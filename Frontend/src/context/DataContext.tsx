import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
};

export type Sale = {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  quantity: number;
  paymentMethod: 'UPI' | 'Cash' | 'Card';
  date: string;
};

export type Expense = {
  id: string;
  category: string;
  amount: number;
  date: string;
  notes: string;
};

type DigitalScoreFeatures = {
  upi: boolean;
  qr: boolean;
  whatsapp: boolean;
  onlineProfile: boolean;
  catalog: boolean;
  salesTracking: boolean;
  digitalBills: boolean;
};

type DataContextType = {
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  scoreFeatures: DigitalScoreFeatures;
  addProduct: (product: Omit<Product, 'id'>) => void;
  addSale: (sale: Omit<Sale, 'id' | 'date'>) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  updateFeature: (feature: keyof DigitalScoreFeatures, value: boolean) => void;
  getDigitalScore: () => number;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Demo Data
const demoProducts: Product[] = [
  { id: '1', name: 'Rice', price: 60, category: 'Grocery' },
  { id: '2', name: 'Wheat', price: 45, category: 'Grocery' },
  { id: '3', name: 'Milk', price: 35, category: 'Dairy' },
  { id: '4', name: 'Biscuits', price: 20, category: 'Snacks' },
  { id: '5', name: 'Cooking Oil', price: 140, category: 'Grocery' },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [scoreFeatures, setScoreFeatures] = useState<DigitalScoreFeatures>({
    upi: false, qr: false, whatsapp: false, onlineProfile: false, catalog: false, salesTracking: false, digitalBills: false
  });

  useEffect(() => {
    // Load from local storage or set demo data
    const savedProducts = localStorage.getItem('dd_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    else setProducts(demoProducts);

    const savedSales = localStorage.getItem('dd_sales');
    if (savedSales) setSales(JSON.parse(savedSales));
    else {
        // Add some demo sales for today
        setSales([
            { id: 's1', productId: '1', productName: 'Rice', amount: 120, quantity: 2, paymentMethod: 'UPI', date: new Date().toISOString() },
            { id: 's2', productId: '5', productName: 'Cooking Oil', amount: 140, quantity: 1, paymentMethod: 'Cash', date: new Date().toISOString() }
        ]);
    }

    const savedExpenses = localStorage.getItem('dd_expenses');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));

    const savedScore = localStorage.getItem('dd_score');
    if (savedScore) setScoreFeatures(JSON.parse(savedScore));
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Math.random().toString(36).substr(2, 9) };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveToStorage('dd_products', updated);
    if (!scoreFeatures.catalog) updateFeature('catalog', true);
  };

  const addSale = (sale: Omit<Sale, 'id' | 'date'>) => {
    const newSale = { ...sale, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() };
    const updated = [...sales, newSale];
    setSales(updated);
    saveToStorage('dd_sales', updated);
    if (!scoreFeatures.salesTracking) updateFeature('salesTracking', true);
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense = { ...expense, id: Math.random().toString(36).substr(2, 9), date: new Date().toISOString() };
    const updated = [...expenses, newExpense];
    setExpenses(updated);
    saveToStorage('dd_expenses', updated);
  };

  const updateFeature = (feature: keyof DigitalScoreFeatures, value: boolean) => {
    const updated = { ...scoreFeatures, [feature]: value };
    setScoreFeatures(updated);
    saveToStorage('dd_score', updated);
  };

  const getDigitalScore = () => {
    let score = 0;
    if (scoreFeatures.upi) score += 20;
    if (scoreFeatures.qr) score += 15;
    if (scoreFeatures.whatsapp) score += 15;
    if (scoreFeatures.onlineProfile) score += 15;
    if (scoreFeatures.catalog) score += 15;
    if (scoreFeatures.salesTracking) score += 10;
    if (scoreFeatures.digitalBills) score += 10;
    return score;
  };

  return (
    <DataContext.Provider value={{
      products, sales, expenses, scoreFeatures,
      addProduct, addSale, addExpense, updateFeature, getDigitalScore
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};
