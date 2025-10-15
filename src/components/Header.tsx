import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { Truck, LogOut, Home } from 'lucide-react';
import { toast } from 'sonner';

export function Header() {
  const navigate = useNavigate();
  const { user, role, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out successfully');
    navigate('/auth');
  };

  const handleGoHome = () => {
    if (role === 'admin') navigate('/admin');
    else if (role === 'driver') navigate('/driver');
    else if (role === 'customer') navigate('/customer');
    else navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleGoHome}>
          <div className="p-2 rounded-xl bg-blue-600">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Delivery System</h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium">{user.email}</span>
              <span className="text-xs text-gray-500 capitalize">{role}</span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleGoHome}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
