import { Request } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MessageCircle, Package } from 'lucide-react';

interface RequestCardProps {
  request: Request;
  showAcceptButton?: boolean;
  showChatButton?: boolean;
  showMarkDelivered?: boolean;
  onNavigate?: (page: string) => void;
}

export function RequestCard({ 
  request, 
  showAcceptButton = false, 
  showChatButton = false,
  showMarkDelivered = false,
  onNavigate 
}: RequestCardProps) {
  const { user, acceptRequest, markAsDelivered, setCurrentChat } = useApp();

  const handleAcceptRequest = () => {
    acceptRequest(request.id);
  };

  const handleMarkDelivered = () => {
    markAsDelivered(request.id);
  };

  const handleStartChat = () => {
    setCurrentChat(request.id);
    onNavigate?.('chat');
  };

  const getStatusBadge = () => {
    switch (request.status) {
      case 'active':
        return <Badge variant="secondary">Active</Badge>;
      case 'accepted':
        return <Badge variant="default">Accepted</Badge>;
      case 'delivered':
        return <Badge variant="outline">Delivered</Badge>;
      default:
        return null;
    }
  };

  const canAccept = showAcceptButton && 
    request.status === 'active' && 
    user?.id !== request.requesterId;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {request.itemName}
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Requested by:</span>
          <span>{request.requesterName}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Approximate Price:</span>
          <span>${request.approximatePrice}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Fee:</span>
          <span className="text-green-600">${request.deliveryFee}</span>
        </div>
        
        {request.acceptedByName && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Accepted by:</span>
            <span>{request.acceptedByName}</span>
          </div>
        )}
        
        {request.notes && (
          <div>
            <span className="text-muted-foreground">Notes:</span>
            <p className="mt-1 text-sm">{request.notes}</p>
          </div>
        )}
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Posted:</span>
          <span>{request.createdAt.toLocaleDateString()}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        {canAccept && (
          <Button onClick={handleAcceptRequest} className="flex-1">
            Accept Request
          </Button>
        )}
        
        {showMarkDelivered && request.status === 'accepted' && (
          <Button onClick={handleMarkDelivered} className="flex-1">
            Mark as Delivered
          </Button>
        )}
        
        {showChatButton && request.status !== 'active' && (
          <Button 
            variant="outline" 
            onClick={handleStartChat}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chat
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}