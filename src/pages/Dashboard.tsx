import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { RequestCard } from '../components/RequestCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Search, Plus } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { requests } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = requests.filter(request =>
    request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requesterName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeRequests = filteredRequests.filter(request => request.status === 'active');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>Browse Requests</h1>
          <p className="text-muted-foreground">Find items to deliver and earn money</p>
        </div>
        
        <Button 
          onClick={() => onNavigate('create-request')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Post a New Request
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {activeRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'No requests match your search.' : 'No active requests at the moment.'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => onNavigate('create-request')}
                className="mt-4"
                variant="outline"
              >
                Be the first to post a request
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeRequests.map(request => (
              <RequestCard
                key={request.id}
                request={request}
                showAcceptButton={true}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}