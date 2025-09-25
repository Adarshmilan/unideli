import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  fullName: string;
  email: string;
  collegeId: string;
  college: string;
}

export interface Request {
  id: string;
  itemName: string;
  approximatePrice: number;
  deliveryFee: number;
  notes: string;
  requesterId: string;
  requesterName: string;
  status: 'active' | 'accepted' | 'delivered';
  acceptedBy?: string;
  acceptedByName?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  requestId: string;
}

interface AppContextType {
  user: User | null;
  requests: Request[];
  messages: Message[];
  currentChat: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  createRequest: (requestData: Omit<Request, 'id' | 'requesterId' | 'requesterName' | 'status' | 'createdAt'>) => void;
  acceptRequest: (requestId: string) => void;
  markAsDelivered: (requestId: string) => void;
  sendMessage: (receiverId: string, content: string, requestId: string) => void;
  setCurrentChat: (chatId: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  { id: '1', fullName: 'John Doe', email: 'john@college.edu', collegeId: 'JD2024', college: 'University College' },
  { id: '2', fullName: 'Jane Smith', email: 'jane@college.edu', collegeId: 'JS2024', college: 'University College' },
  { id: '3', fullName: 'Mike Wilson', email: 'mike@college.edu', collegeId: 'MW2024', college: 'University College' },
];

const mockRequests: Request[] = [
  {
    id: '1',
    itemName: 'Calculus Textbook',
    approximatePrice: 150,
    deliveryFee: 10,
    notes: 'Need the 12th edition, used is fine',
    requesterId: '2',
    requesterName: 'Jane Smith',
    status: 'active',
    createdAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    itemName: 'Coffee from Campus Café',
    approximatePrice: 5,
    deliveryFee: 3,
    notes: 'Large iced latte with oat milk',
    requesterId: '3',
    requesterName: 'Mike Wilson',
    status: 'active',
    createdAt: new Date('2024-01-15T11:30:00Z')
  },
  {
    id: '3',
    itemName: 'Lab Goggles',
    approximatePrice: 25,
    deliveryFee: 5,
    notes: 'Chemistry lab approved safety goggles',
    requesterId: '1',
    requesterName: 'John Doe',
    status: 'accepted',
    acceptedBy: '2',
    acceptedByName: 'Jane Smith',
    createdAt: new Date('2024-01-14T09:00:00Z')
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      email: userData.email,
      collegeId: userData.collegeId,
      college: 'University College'
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentChat(null);
  };

  const createRequest = (requestData: Omit<Request, 'id' | 'requesterId' | 'requesterName' | 'status' | 'createdAt'>) => {
    if (!user) return;
    
    const newRequest: Request = {
      ...requestData,
      id: Date.now().toString(),
      requesterId: user.id,
      requesterName: user.fullName,
      status: 'active',
      createdAt: new Date()
    };
    
    setRequests(prev => [newRequest, ...prev]);
  };

  const acceptRequest = (requestId: string) => {
    if (!user) return;
    
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'accepted' as const, acceptedBy: user.id, acceptedByName: user.fullName }
        : req
    ));
  };

  const markAsDelivered = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'delivered' as const }
        : req
    ));
  };

  const sendMessage = (receiverId: string, content: string, requestId: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.fullName,
      receiverId,
      content,
      timestamp: new Date(),
      requestId
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider value={{
      user,
      requests,
      messages,
      currentChat,
      login,
      signup,
      logout,
      createRequest,
      acceptRequest,
      markAsDelivered,
      sendMessage,
      setCurrentChat
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}