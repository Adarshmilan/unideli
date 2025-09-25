import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

interface CreateRequestProps {
  onNavigate: (page: string) => void;
}

export function CreateRequest({ onNavigate }: CreateRequestProps) {
  const { createRequest } = useApp();
  const [formData, setFormData] = useState({
    itemName: '',
    approximatePrice: '',
    deliveryFee: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      createRequest({
        itemName: formData.itemName,
        approximatePrice: parseFloat(formData.approximatePrice),
        deliveryFee: parseFloat(formData.deliveryFee),
        notes: formData.notes
      });

      // Reset form
      setFormData({
        itemName: '',
        approximatePrice: '',
        deliveryFee: '',
        notes: ''
      });

      // Navigate to my requests
      onNavigate('my-requests');
    } catch (err) {
      console.error('Failed to create request:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Request</CardTitle>
          <CardDescription>
            Post a request for an item you need and set a delivery fee for other students
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                type="text"
                value={formData.itemName}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
                placeholder="e.g., Calculus Textbook, Coffee, Lab Goggles"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="approximatePrice">Approximate Price ($)</Label>
                <Input
                  id="approximatePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.approximatePrice}
                  onChange={(e) => handleInputChange('approximatePrice', e.target.value)}
                  placeholder="25.00"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                <Input
                  id="deliveryFee"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.deliveryFee}
                  onChange={(e) => handleInputChange('deliveryFee', e.target.value)}
                  placeholder="5.00"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes/Details</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Add any specific requirements, preferences, or additional details..."
                rows={4}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate('dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Posting...' : 'Post Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}