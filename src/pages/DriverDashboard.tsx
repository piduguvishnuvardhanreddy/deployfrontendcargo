import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deliveriesAPI, trackingAPI } from '../lib/api';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';
import { Loading } from '../components/Loading';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Package, MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

export default function DriverDashboard() {
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

  const updateStatus = async (id: string, status: string) => {
    try {
      await deliveriesAPI.update(id, { status });
      toast.success('Status updated successfully!');
      fetchDeliveries();
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  const shareLocation = async (deliveryId: string) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            await trackingAPI.create({
              delivery_id: deliveryId,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            toast.success('Location shared!');
          } catch (error) {
            toast.error('Failed to share location');
          }
        },
        () => toast.error('Please enable location access')
      );
    }
  };

  if (authLoading || loading) return <Loading />;

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Driver Dashboard</h1>
          <p className="text-gray-600">Manage your assigned deliveries</p>
        </div>

        {deliveries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600">No assigned deliveries</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {deliveries.map((delivery) => (
              <Card key={delivery._id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Order #{delivery._id.slice(0, 8)}</CardTitle>
                    <StatusBadge status={delivery.status} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    </div>

                    <div className="flex gap-2">
                      {delivery.status === 'assigned' && (
                        <Button size="sm" onClick={() => updateStatus(delivery._id, 'on_route')}>
                          Start Delivery
                        </Button>
                      )}
                      {delivery.status === 'on_route' && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => shareLocation(delivery._id)}>
                            <Navigation className="w-4 h-4 mr-2" />
                            Share Location
                          </Button>
                          <Button size="sm" onClick={() => updateStatus(delivery._id, 'delivered')}>
                            Mark Delivered
                          </Button>
                        </>
                      )}
                    </div>
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
