import { useApp } from '../contexts/AppContext';
import { RequestCard } from '../components/RequestCard';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface MyRequestsProps {
  onNavigate: (page: string) => void;
}

export function MyRequests({ onNavigate }: MyRequestsProps) {
  const { user, requests } = useApp();

  const myRequests = requests.filter(request => request.requesterId === user?.id);
  
  const activeRequests = myRequests.filter(request => request.status === 'active');
  const acceptedRequests = myRequests.filter(request => request.status === 'accepted');
  const deliveredRequests = myRequests.filter(request => request.status === 'delivered');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1>My Requests</h1>
          <p className="text-muted-foreground">Manage your posted requests</p>
        </div>
        
        <Button 
          onClick={() => onNavigate('create-request')}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            Active ({activeRequests.length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({acceptedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({deliveredRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {activeRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                You don't have any active requests.
              </p>
              <Button onClick={() => onNavigate('create-request')}>
                Create your first request
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="accepted" className="mt-6">
          {acceptedRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No accepted requests yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {acceptedRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showChatButton={true}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="delivered" className="mt-6">
          {deliveredRequests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No delivered requests yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {deliveredRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showChatButton={true}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}