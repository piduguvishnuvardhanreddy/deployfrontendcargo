import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deliveriesAPI, adminAPI } from '../lib/api';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';
import { Loading } from '../components/Loading';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, Package, MapPin, User } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrders() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    if (user) {
      fetchDeliveries();
      fetchDrivers();
    }
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

  const fetchDrivers = async () => {
    try {
      const data = await adminAPI.getDrivers();
      setDrivers(data);
    } catch (error: any) {
      toast.error('Failed to load drivers');
    }
  };

  const assignDriver = async (deliveryId: string, driverId: string) => {
    try {
      await deliveriesAPI.assignDriver(deliveryId, driverId);
      toast.success('Driver assigned successfully!');
      fetchDeliveries();
    } catch (error: any) {
      toast.error('Failed to assign driver');
    }
  };

  if (authLoading || loading) return <Loading />;

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Manage Orders</h1>
          <p className="text-gray-600">Assign drivers to pending deliveries</p>
        </div>

        {deliveries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600">No orders yet</p>
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
                    {delivery.customer_id && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">
                          Customer: {delivery.customer_id.full_name || delivery.customer_id.email}
                        </span>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
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

                    {delivery.status === 'pending' && (
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <label className="text-sm font-medium">Assign Driver:</label>
                        <select
                          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          onChange={(e) => assignDriver(delivery._id, e.target.value)}
                          defaultValue=""
                        >
                          <option value="" disabled>Select a driver</option>
                          {drivers.map((driver) => (
                            <option key={driver._id} value={driver._id}>
                              {driver.full_name || driver.email}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {delivery.driver_id && (
                      <div className="flex items-center gap-2 pt-4 border-t">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          Driver: {delivery.driver_id.full_name || delivery.driver_id.email}
                        </span>
                      </div>
                    )}
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
