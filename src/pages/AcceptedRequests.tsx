import { useApp } from '../contexts/AppContext';
import { RequestCard } from '../components/RequestCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface AcceptedRequestsProps {
  onNavigate: (page: string) => void;
}

export function AcceptedRequests({ onNavigate }: AcceptedRequestsProps) {
  const { user, requests } = useApp();

  const acceptedByMe = requests.filter(request => request.acceptedBy === user?.id);
  
  const inProgress = acceptedByMe.filter(request => request.status === 'accepted');
  const completed = acceptedByMe.filter(request => request.status === 'delivered');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1>Accepted Requests</h1>
        <p className="text-muted-foreground">Manage requests you've accepted to deliver</p>
      </div>

      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="in-progress">
            In Progress ({inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-6">
          {inProgress.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                You haven't accepted any requests yet. Browse the dashboard to find requests to accept.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inProgress.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  showMarkDelivered={true}
                  showChatButton={true}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completed.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No completed deliveries yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completed.map(request => (
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