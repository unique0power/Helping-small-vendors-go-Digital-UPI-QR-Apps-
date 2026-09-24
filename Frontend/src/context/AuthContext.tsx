import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  role: 'Vendor' | 'Admin';
};

type AuthContextType = {
  user: User | null;
  login: (phone: string, name?: string, businessName?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock user session
    const storedUser = localStorage.getItem('digitaldukaan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (phone: string, name: string = 'Test Vendor', businessName: string = 'My Shop') => {
    // Mock admin login if phone is "9999999999"
    const role = phone === '9999999999' ? 'Admin' : 'Vendor';
    const newUser: User = { id: '1', name: role === 'Admin' ? 'Super Admin' : name, businessName: role === 'Admin' ? 'Platform Admin' : businessName, phone, role };
    setUser(newUser);
    localStorage.setItem('digitaldukaan_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('digitaldukaan_user');
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
