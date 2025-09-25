import { useApp } from '../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { User, Package, CheckCircle, DollarSign } from 'lucide-react';

export function UserProfile() {
  const { user, requests } = useApp();

  if (!user) return null;

  const myRequests = requests.filter(request => request.requesterId === user.id);
  const myDeliveries = requests.filter(request => request.acceptedBy === user.id);

  const completedRequests = myRequests.filter(request => request.status === 'delivered');
  const completedDeliveries = myDeliveries.filter(request => request.status === 'delivered');

  const totalEarned = completedDeliveries.reduce((sum, request) => sum + request.deliveryFee, 0);
  const totalSpent = completedRequests.reduce((sum, request) => sum + request.approximatePrice + request.deliveryFee, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1>User Profile</h1>
        <p className="text-muted-foreground">Your account information and activity summary</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl">
                  {user.fullName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3>{user.fullName}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">College ID:</span>
                <p>{user.collegeId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">College:</span>
                <p>{user.college}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Activity Summary
            </CardTitle>
            <CardDescription>Your activity on College Market</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-primary/10">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <p className="text-2xl">{myRequests.length}</p>
                <p className="text-sm text-muted-foreground">Requests Posted</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl">{myDeliveries.length}</p>
                <p className="text-sm text-muted-foreground">Requests Accepted</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed Requests:</span>
                <Badge variant="outline">{completedRequests.length}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed Deliveries:</span>
                <Badge variant="outline">{completedDeliveries.length}</Badge>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Earned:</span>
                <span className="text-green-600 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {totalEarned.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Spent:</span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {totalSpent.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request History */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests Posted</CardTitle>
          </CardHeader>
          <CardContent>
            {myRequests.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No requests posted yet
              </p>
            ) : (
              <div className="space-y-3">
                {myRequests.slice(0, 3).map(request => (
                  <div key={request.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p>{request.itemName}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={
                      request.status === 'delivered' ? 'default' :
                      request.status === 'accepted' ? 'secondary' : 'outline'
                    }>
                      {request.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            {myDeliveries.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No deliveries accepted yet
              </p>
            ) : (
              <div className="space-y-3">
                {myDeliveries.slice(0, 3).map(request => (
                  <div key={request.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <div>
                      <p>{request.itemName}</p>
                      <p className="text-sm text-muted-foreground">
                        for {request.requesterName}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        request.status === 'delivered' ? 'default' : 'secondary'
                      }>
                        {request.status}
                      </Badge>
                      <p className="text-sm text-green-600 mt-1">
                        +${request.deliveryFee}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}