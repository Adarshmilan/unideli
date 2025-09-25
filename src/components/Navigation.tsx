import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { User, Plus, MessageCircle, Package, LogOut } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, logout } = useApp();

  if (!user) return null;

  return (
    <header className="border-b bg-card px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-6">
          <h1 
            className="cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            College Market
          </h1>
          
          <nav className="flex items-center gap-4">
            <Button
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Browse
            </Button>
            
            <Button
              variant={currentPage === 'create-request' ? 'default' : 'ghost'}
              onClick={() => onNavigate('create-request')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Request
            </Button>
            
            <Button
              variant={currentPage === 'my-requests' ? 'default' : 'ghost'}
              onClick={() => onNavigate('my-requests')}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              My Requests
            </Button>
            
            <Button
              variant={currentPage === 'accepted-requests' ? 'default' : 'ghost'}
              onClick={() => onNavigate('accepted-requests')}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Accepted
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant={currentPage === 'chat' ? 'default' : 'ghost'}
            onClick={() => onNavigate('chat')}
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chat
          </Button>
          
          <Button
            variant={currentPage === 'profile' ? 'default' : 'ghost'}
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
          
          <Button
            variant="ghost"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}