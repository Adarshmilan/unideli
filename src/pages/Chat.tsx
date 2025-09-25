import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Send, MessageCircle } from 'lucide-react';

interface ChatProps {
  onNavigate: (page: string) => void;
}

export function Chat({ onNavigate }: ChatProps) {
  const { user, requests, messages, currentChat, sendMessage, setCurrentChat } = useApp();
  const [newMessage, setNewMessage] = useState('');

  // Get all requests where user is involved (either as requester or accepter)
  const myChats = requests.filter(request => 
    (request.requesterId === user?.id || request.acceptedBy === user?.id) &&
    request.status !== 'active'
  );

  const currentRequest = currentChat ? requests.find(r => r.id === currentChat) : null;
  
  // Get messages for current chat
  const chatMessages = currentChat 
    ? messages.filter(msg => msg.requestId === currentChat)
    : [];

  // Get the other person in the conversation
  const getOtherPerson = (request: typeof currentRequest) => {
    if (!request || !user) return null;
    if (request.requesterId === user.id) {
      return { id: request.acceptedBy!, name: request.acceptedByName! };
    }
    return { id: request.requesterId, name: request.requesterName };
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat || !currentRequest) return;

    const otherPerson = getOtherPerson(currentRequest);
    if (!otherPerson) return;

    sendMessage(otherPerson.id, newMessage.trim(), currentChat);
    setNewMessage('');
  };

  useEffect(() => {
    // Auto-select first chat if none selected
    if (!currentChat && myChats.length > 0) {
      setCurrentChat(myChats[0].id);
    }
  }, [currentChat, myChats, setCurrentChat]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1>Messages</h1>
        <p className="text-muted-foreground">Chat with other students about your requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {myChats.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No active conversations yet. Accept or post requests to start chatting.
                </div>
              ) : (
                <div className="space-y-1">
                  {myChats.map(request => {
                    const otherPerson = getOtherPerson(request);
                    const isSelected = currentChat === request.id;
                    
                    return (
                      <button
                        key={request.id}
                        onClick={() => setCurrentChat(request.id)}
                        className={`w-full p-4 text-left hover:bg-muted/50 border-b transition-colors ${
                          isSelected ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {otherPerson?.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="truncate">{otherPerson?.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {request.itemName}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Messages */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {currentRequest ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {getOtherPerson(currentRequest)?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {getOtherPerson(currentRequest)?.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Request: {currentRequest.itemName}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-4 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.senderId === user?.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>

                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start chatting
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}