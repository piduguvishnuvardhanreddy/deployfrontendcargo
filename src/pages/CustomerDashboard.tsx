import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deliveriesAPI } from '../lib/api';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';
import { Loading } from '../components/Loading';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Plus, Package, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function CustomerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    if (user) fetchDeliveries();
  }, [user, authLoading, navigate]);

  const fetchDeliveries = async () => {
    try {
      const data = await deliveriesAPI.getAll();
      setDeliveries(data);
    } catch (error: any) {
      toast.error('Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) return <Loading />;

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">My Deliveries</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>
          <Button onClick={() => navigate('/new-delivery')}>
            <Plus className="w-4 h-4 mr-2" />
            New Delivery
          </Button>
        </div>

        {deliveries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">No deliveries yet</p>
              <Button onClick={() => navigate('/new-delivery')}>
                Create Your First Delivery
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {deliveries.map((delivery) => (
              <Card key={delivery._id} className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/tracking/${delivery._id}`)}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Order #{delivery._id.slice(0, 8)}</CardTitle>
                    <StatusBadge status={delivery.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Pickup</p>
                        <p className="text-sm text-gray-600">{delivery.pickup_address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-green-600 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Delivery</p>
                        <p className="text-sm text-gray-600">{delivery.delivery_address}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Created {new Date(delivery.created_at).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
