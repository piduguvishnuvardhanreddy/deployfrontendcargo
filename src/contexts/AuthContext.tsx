import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI, removeToken } from '../lib/api';

export type UserRole = 'admin' | 'driver' | 'customer';

interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    role: UserRole;
  }) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authAPI.getCurrentUser();
        setUser(userData);
        setRole(userData.role);
      } catch (error) {
        console.error('Error fetching user:', error);
        removeToken();
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await authAPI.login({ email, password });
    setUser(data.user);
    setRole(data.user.role);
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
    role: UserRole;
  }) => {
    const data = await authAPI.register(userData);
    setUser(data.user);
    setRole(data.user.role);
  };

  const signOut = () => {
    authAPI.logout();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
