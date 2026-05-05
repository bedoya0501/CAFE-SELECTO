import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, name: string) => {
    // Mock login
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      orders: [
        {
          id: 'ORD-PROG-001',
          date: '2024-04-15',
          status: 'delivered',
          total: 205000,
          shippingAddress: {
            street: 'Calle 100 #11-32',
            city: 'Bogotá',
            state: 'Cundinamarca',
            zipCode: '110111',
            country: 'Colombia'
          },
          items: [
            { id: '1', productId: '1', name: 'Báscula PrecisionBarista', price: 120000, quantity: 1, image: 'https://images.unsplash.com/photo-1544787210-2211d64b565a?q=80&w=800&auto=format&fit=crop' },
            { id: '2', productId: '2', name: 'Molinillo GrindMaster', price: 85000, quantity: 1, image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?q=80&w=800&auto=format&fit=crop' }
          ]
        },
        {
          id: 'ORD-PEND-002',
          date: '2024-05-01',
          status: 'pending',
          total: 65000,
          shippingAddress: {
            street: 'Carrera 7 #71-21',
            city: 'Bogotá',
            state: 'Cundinamarca',
            zipCode: '110221',
            country: 'Colombia'
          },
          items: [
            { id: '4', productId: '4', name: 'Tamper ProTamp 58mm', price: 65000, quantity: 1, image: 'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?q=80&w=800&auto=format&fit=crop' }
          ]
        }
      ]
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
