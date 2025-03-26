import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  FaceSmileIcon,
  PaperClipIcon,
  PhoneIcon,
  PhotoIcon,
  LifebuoyIcon,
} from '@heroicons/react/24/outline';

// Message interface
interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

// Mock agent data
const agent = {
  name: 'Sarah Moyo',
  role: 'Customer Support Agent',
  avatar: 'https://placehold.co/100x100/009B4E/FFFFFF?text=SM',
  status: 'online'
};

// Initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'agent',
    text: 'Hello! I\'m Sarah from Dzimba Property Management. How can I assist you today?',
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    status: 'read'
  }
];

// Quick replies
const quickReplies = [
  { id: '1', text: 'How do I add a new property?' },
  { id: '2', text: 'I need help with payment processing' },
  { id: '3', text: 'How do I create a lease agreement?' },
  { id: '4', text: 'I\'m having trouble generating reports' }
];

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Send a new message
  const sendMessage = (text: string = newMessage) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response after a delay
    setTimeout(() => {
      setIsTyping(false);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: getAgentResponse(text.trim()),
        timestamp: new Date(),
        status: 'read'
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 2000 + Math.random() * 1000);
  };
  
  // Simple response generation based on message content
  const getAgentResponse = (message: string): string => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
      return "Hello! How can I help you with Dzimba Property Management today?";
    } else if (lowercaseMsg.includes('property') && (lowercaseMsg.includes('add') || lowercaseMsg.includes('new'))) {
      return "To add a new property, go to the Properties page and click on the 'Add Property' button in the top right. You'll need to fill in details like address, type, units, and other property specifications.";
    } else if (lowercaseMsg.includes('payment')) {
      return "For payment processing, navigate to the Payments section from the dashboard. You can record new payments, view payment history, and generate payment reports there.";
    } else if (lowercaseMsg.includes('lease')) {
      return "To create a lease agreement, go to the Leases section, click 'New Lease', select the tenant and property, then enter the lease terms including start date, end date, rent amount, and security deposit.";
    } else if (lowercaseMsg.includes('report')) {
      return "For reports, visit the Reports section where you can generate various reports including financial summaries, occupancy rates, and maintenance histories. You can customize reports by date range and export them in different formats.";
    } else if (lowercaseMsg.includes('maintenance') || lowercaseMsg.includes('repair')) {
      return "Maintenance requests can be logged in the Maintenance section. Click 'New Request', select the property and unit, specify the issue and priority, and submit the request.";
    } else if (lowercaseMsg.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with today?";
    } else {
      return "I'll help you with that. Could you provide a bit more information so I can assist you better?";
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };
  
  return (
    <div className="space-y-6">
      {/* Header with Zimbabwe flag colors as a decorative bar */}
      <div className="relative mb-6">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-zim-green"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-black"></div>
        </div>
        <div className="pt-4 flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-zim-green mr-3" />
              <h1 className="text-2xl font-semibold text-gray-900">Live Chat Support</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Chat with our support team for real-time assistance
            </p>
          </div>
          <Link
            to="/dashboard/help"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Chat container */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden flex flex-col h-[600px]">
            {/* Chat header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  <img 
                    src={agent.avatar} 
                    alt={agent.name} 
                    className="h-10 w-10 rounded-full object-cover border border-gray-300"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border border-white"></span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{agent.name}</h3>
                  <p className="text-xs text-gray-500">{agent.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <PhoneIcon className="h-5 w-5" />
                </button>
                <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'agent' && (
                      <div className="mr-2 flex-shrink-0">
                        <img 
                          src={agent.avatar} 
                          alt={agent.name} 
                          className="h-8 w-8 rounded-full object-cover border border-gray-300"
                        />
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        message.sender === 'user' 
                          ? 'bg-zim-green text-white rounded-tr-none' 
                          : 'bg-white border border-gray-200 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div 
                        className={`mt-1 text-xs flex items-center ${
                          message.sender === 'user' ? 'text-zim-green-100 justify-end' : 'text-gray-400'
                        }`}
                      >
                        {new Intl.DateTimeFormat('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        }).format(message.timestamp)}
                        
                        {message.sender === 'user' && (
                          <span className="ml-1">
                            {message.status === 'read' && <CheckCircleIcon className="h-3 w-3 text-zim-green-100" />}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="ml-2 flex-shrink-0">
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="mr-2 flex-shrink-0">
                      <img 
                        src={agent.avatar} 
                        alt={agent.name} 
                        className="h-8 w-8 rounded-full object-cover border border-gray-300"
                      />
                    </div>
                    <div className="max-w-[75%] rounded-lg px-4 py-2 bg-white border border-gray-200 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input area */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white">
              <form onSubmit={handleSubmit}>
                <div className="flex items-end space-x-2">
                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="block w-full rounded-md border-0 py-2.5 pl-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zim-green sm:text-sm"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                        <button 
                          type="button" 
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <FaceSmileIcon className="h-5 w-5" />
                        </button>
                        <button 
                          type="button" 
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <PaperClipIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-zim-green p-2.5 text-white shadow-sm hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                  </button>
                </div>
              </form>
              
              {/* Quick replies */}
              <div className="mt-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.id}
                    type="button"
                    onClick={() => sendMessage(reply.text)}
                    className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {reply.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
              {/* Zimbabwe flag-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Support Options</h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="rounded-md bg-zim-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <LifebuoyIcon className="h-5 w-5 text-zim-green" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-zim-green-800">Support Hours</h3>
                    <div className="mt-2 text-sm text-zim-green-700">
                      <p>Monday to Friday: 8:00 AM - 6:00 PM (CAT)</p>
                      <p>Saturday: 9:00 AM - 1:00 PM (CAT)</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Other ways to get help</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      to="/dashboard/help/documentation"
                      className="flex items-center text-sm text-gray-700 hover:text-zim-green"
                    >
                      <DocumentTextIcon className="h-4 w-4 mr-2" />
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/help/contact"
                      className="flex items-center text-sm text-gray-700 hover:text-zim-green"
                    >
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Contact Support
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/dashboard/help/knowledge-base"
                      className="flex items-center text-sm text-gray-700 hover:text-zim-green"
                    >
                      <BookIcon className="h-4 w-4 mr-2" />
                      Knowledge Base
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Attachments</h3>
                <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-zim-green hover:bg-gray-50 transition-colors">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-1 text-xs text-gray-500">
                      Drag and drop or click to upload
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;

// Manually defined BookIcon since it's not included in the imported icons
const BookIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}; 