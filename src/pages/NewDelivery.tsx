import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deliveriesAPI } from '../lib/api';
import { Header } from '../components/Header';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function NewDelivery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pickup_address: '',
    delivery_address: '',
    package_details: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pickup_address || !formData.delivery_address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await deliveriesAPI.create(formData);
      toast.success('Delivery created successfully!');
      navigate('/customer');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create delivery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate('/customer')} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Address *</label>
                <Input
                  placeholder="123 Main St, City"
                  value={formData.pickup_address}
                  onChange={(e) => setFormData({...formData, pickup_address: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                <Input
                  placeholder="456 Oak Ave, City"
                  value={formData.delivery_address}
                  onChange={(e) => setFormData({...formData, delivery_address: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Package Details</label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={4}
                  placeholder="Describe your package..."
                  value={formData.package_details}
                  onChange={(e) => setFormData({...formData, package_details: e.target.value})}
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate('/customer')} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Creating...' : 'Create Delivery'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
