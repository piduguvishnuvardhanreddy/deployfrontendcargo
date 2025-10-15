import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { deliveriesAPI, trackingAPI } from '../lib/api';
import { Header } from '../components/Header';
import { StatusBadge } from '../components/StatusBadge';
import { Loading } from '../components/Loading';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft, MapPin, Package, User, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function TrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [delivery, setDelivery] = useState<any>(null);
  const [tracking, setTracking] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    if (user && id) {
      fetchDelivery();
      fetchTracking();
    }
  }, [user, authLoading, id, navigate]);

  const fetchDelivery = async () => {
    try {
      const data = await deliveriesAPI.getById(id!);
      setDelivery(data);
    } catch (error: any) {
      toast.error('Failed to load delivery');
    } finally {
      setLoading(false);
    }
  };

  const fetchTracking = async () => {
    try {
      const data = await trackingAPI.getByDeliveryId(id!);
      setTracking(data);
    } catch (error: any) {
      console.error('Failed to load tracking');
    }
  };

  if (authLoading || loading) return <Loading />;
  if (!delivery) return <div>Delivery not found</div>;

  const timeline = [
    { status: 'pending', label: 'Order Created', completed: true },
    { status: 'assigned', label: 'Driver Assigned', completed: ['assigned', 'on_route', 'delivered'].includes(delivery.status) },
    { status: 'on_route', label: 'On Route', completed: ['on_route', 'delivered'].includes(delivery.status) },
    { status: 'delivered', label: 'Delivered', completed: delivery.status === 'delivered' },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order #{delivery._id.slice(0, 8)}</CardTitle>
              <StatusBadge status={delivery.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Pickup Address</p>
                    <p className="text-sm text-gray-600">{delivery.pickup_address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Delivery Address</p>
                    <p className="text-sm text-gray-600">{delivery.delivery_address}</p>
                  </div>
                </div>
              </div>

              {delivery.package_details && (
                <div className="flex items-start gap-2">
                  <Package className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-medium">Package Details</p>
                    <p className="text-sm text-gray-600">{delivery.package_details}</p>
                  </div>
                </div>
              )}

              {delivery.driver_id && (
                <div className="flex items-start gap-2">
                  <User className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-medium">Driver</p>
                    <p className="text-sm text-gray-600">
                      {delivery.driver_id.full_name || delivery.driver_id.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-gray-600 mt-1" />
                <div>
                  <p className="font-medium">Created</p>
                  <p className="text-sm text-gray-600">
                    {new Date(delivery.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={item.status} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.completed ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {item.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${item.completed ? 'text-green-600' : 'text-gray-600'}`}>
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {tracking.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <p className="font-medium mb-2">Location Updates</p>
                <p className="text-sm text-gray-600">
                  Last updated: {new Date(tracking[0].timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
