import React, { useState, useEffect, useRef } from 'react';
import {
  HomeIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  BellIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  PaperClipIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlusIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentDuplicateIcon,
  MapPinIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
  KeyIcon,
  BuildingOfficeIcon,
  StarIcon,
  FireIcon,
  GiftIcon,
  SunIcon,
  CloudIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Types for our data structures
interface Payment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'upcoming' | 'paid' | 'overdue';
  paymentDate?: string;
  method?: string;
  reference?: string;
}

interface MaintenanceRequest {
  id: string;
  issue: string;
  description?: string;
  dateSubmitted: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  completedDate?: string;
  attachments?: string[];
  propertyId: string;
  propertyName: string;
  propertyUnit: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'important' | 'notice' | 'event' | 'payment';
}

interface TenantInfo {
  name: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  nextPaymentDue: string;
  securityDeposit: number;
  landlordName: string;
  landlordEmail: string;
  landlordPhone: string;
}

// Add a property interface to represent properties tenant occupies
interface TenantProperty {
  id: string;
  name: string;
  address: string;
  unit: string;
  rentAmount: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'pending' | 'expired';
  landlordName: string;
  landlordContact: string;
}

export default function TenantDashboard() {
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [expandedLandlord, setExpandedLandlord] = useState<string | null>(null);

  // Updated tenant info with multiple properties
  const [tenantInfo, setTenantInfo] = useState<TenantInfo>({
    name: 'John Doe',
    property: 'Sunshine Apartments',
    unit: 'Apt 201',
    leaseStart: '2023-04-15',
    leaseEnd: '2024-04-14',
    rentAmount: 850,
    nextPaymentDue: '2023-11-01',
    securityDeposit: 1000,
    landlordName: 'Zimbabwe Properties Ltd.',
    landlordEmail: 'contact@zimproperties.com',
    landlordPhone: '+263 242 123 4567',
  });

  // Add properties that tenant occupies
  const [tenantProperties, setTenantProperties] = useState<TenantProperty[]>([
    {
      id: '1',
      name: 'Sunshine Apartments',
      address: '123 Samora Machel Ave, Harare',
      unit: 'Apt 201',
      rentAmount: 850,
      leaseStart: '2023-04-15',
      leaseEnd: '2024-04-14',
      status: 'active',
      landlordName: 'Zimbabwe Properties Ltd.',
      landlordContact: 'contact@zimproperties.com',
    },
    {
      id: '2',
      name: 'Mountain View Residence',
      address: '45 Cecil Ave, Bulawayo',
      unit: 'Unit 10B',
      rentAmount: 750,
      leaseStart: '2023-02-01',
      leaseEnd: '2024-01-31',
      status: 'active',
      landlordName: 'Zimbabwe Properties Ltd.',
      landlordContact: 'contact@zimproperties.com',
    }
  ]);

  // New state variables for enhanced dashboard
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: 'Sunny',
    city: 'Harare',
    icon: SunIcon
  });
  
  const [paymentAnalytics, setPaymentAnalytics] = useState({
    totalPaid: 1650,
    pending: 850,
    overdue: 0,
    nextDueDate: '2023-11-01'
  });
  
  const [displayMode, setDisplayMode] = useState('grid');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [activeCardHover, setActiveCardHover] = useState<string | null>(null);
  
  // Mock data for payment history chart
  const paymentHistoryData = {
    labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Rent Payments',
        data: [850, 850, 850, 850, 850, 0],
        borderColor: '#2ea44f',
        backgroundColor: 'rgba(46, 164, 79, 0.2)',
        borderWidth: 2,
        fill: true,
      }
    ]
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      }
    }
  };
  
  // Property satisfaction data
  const satisfactionData = {
    labels: ['Excellent', 'Very Good', 'Good', 'Average', 'Needs Improvement'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#2ea44f', // green
          '#77dd77', // light green
          '#fdfd96', // yellow
          '#ffb347', // orange
          '#ff6961', // red
        ],
        borderWidth: 0,
      }
    ]
  };
  
  const donutOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      description: 'November Rent',
      amount: 850,
      dueDate: '2023-11-01',
      status: 'upcoming',
    },
    {
      id: '2',
      description: 'October Rent',
      amount: 850,
      dueDate: '2023-10-01',
      status: 'paid',
      paymentDate: '2023-10-01',
      method: 'Bank Transfer',
      reference: 'PAY-OCT2023',
    },
  ]);

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      issue: 'Leaking bathroom faucet',
      description: 'The bathroom sink faucet is dripping continuously',
      dateSubmitted: '2023-10-20',
      status: 'in-progress',
      priority: 'medium',
      notes: 'Plumber scheduled for 2023-10-30',
      propertyId: '1',
      propertyName: 'Sunshine Apartments',
      propertyUnit: 'Apt 201',
    },
    {
      id: '2',
      issue: 'Light fixture not working in kitchen',
      description: 'The main ceiling light in the kitchen is not working',
      dateSubmitted: '2023-10-15',
      status: 'completed',
      priority: 'low',
      completedDate: '2023-10-18',
      notes: 'Replaced light fixture and bulb',
      propertyId: '1',
      propertyName: 'Sunshine Apartments',
      propertyUnit: 'Apt 201',
    },
  ]);

  // Load initial data
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Add welcome message timeout and weather data simulation
  useEffect(() => {
    // Auto-hide welcome message after 15 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 15000);
    
    // Simulate weather data updates based on property location
    const getWeatherData = () => {
      const conditions = [
        { temp: 28, condition: 'Sunny', icon: SunIcon },
        { temp: 24, condition: 'Partly Cloudy', icon: CloudIcon },
        { temp: 19, condition: 'Cloudy', icon: CloudIcon }
      ];
      
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setWeatherData({
        temperature: randomCondition.temp,
        condition: randomCondition.condition,
        city: tenantProperties[0].address.split(',').pop()?.trim() || 'Harare',
        icon: randomCondition.icon
      });
    };
    
    getWeatherData();
    
    return () => {
      clearTimeout(welcomeTimer);
    };
  }, [tenantProperties]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls
      await Promise.all([
        loadPayments(),
        loadMaintenanceRequests(),
        loadNotifications(),
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load payments from API
  const loadPayments = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add current date for any overdue payments
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    
    // Check if next payment is coming up soon (in next 5 days)
    const nextPaymentDate = new Date(tenantInfo.nextPaymentDue);
    const differenceInDays = Math.ceil((nextPaymentDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (differenceInDays <= 5 && differenceInDays >= 0) {
      // Add a reminder notification
      addNotification({
        id: Math.random().toString(36).substr(2, 9),
        title: 'Upcoming Rent Payment',
        message: `Your rent payment of $${tenantInfo.rentAmount} is due in ${differenceInDays} days.`,
        date: formattedToday,
        isRead: false,
        type: 'payment',
      });
    }
    
    // Check for overdue payments
    const overdue = payments.find(payment => 
      payment.status === 'upcoming' && new Date(payment.dueDate) < today
    );
    
    if (overdue) {
      // Update payment status to overdue
      const updatedPayments = payments.map(payment => 
        payment.id === overdue.id ? { ...payment, status: 'overdue' as const } : payment
      );
      setPayments(updatedPayments);
      
      // Add overdue notification if not already present
      if (!notifications.some(n => n.title.includes('Overdue'))) {
        addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Overdue Rent Payment',
          message: `Your rent payment of $${overdue.amount} was due on ${formatDate(overdue.dueDate)}. Please make your payment as soon as possible.`,
          date: formattedToday,
          isRead: false,
          type: 'payment',
        });
      }
    }
    
    return true;
  };
  
  // Function to load maintenance requests from API
  const loadMaintenanceRequests = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Check for status updates (simulate receiving updates)
    const hasUpdates = Math.random() > 0.5;
    
    if (hasUpdates && maintenanceRequests.length > 0) {
      // Pick a random request to update
      const requestToUpdate = maintenanceRequests[Math.floor(Math.random() * maintenanceRequests.length)];
      
      if (requestToUpdate.status === 'pending') {
        // Update to in-progress
        const updatedRequests = maintenanceRequests.map(request => 
          request.id === requestToUpdate.id 
            ? { ...request, status: 'in-progress' as const, notes: 'Maintenance staff assigned' } 
            : request
        );
        setMaintenanceRequests(updatedRequests);
        
        // Add notification
        addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Maintenance Request Update',
          message: `Your request for "${requestToUpdate.issue}" is now in progress. Maintenance staff has been assigned.`,
          date: new Date().toISOString(),
          isRead: false,
          type: 'notice',
        });
      }
    }
    
    return true;
  };
  
  // Function to load notifications from API
  const loadNotifications = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Add initial notifications if empty
    if (notifications.length === 0) {
      setNotifications([
        {
          id: '1',
          title: 'Scheduled Water Maintenance',
          message: 'There will be scheduled water maintenance on November 5th from 9am to 12pm. Please plan accordingly.',
          date: '2023-10-25',
          isRead: false,
          type: 'notice',
        },
        {
          id: '2',
          title: 'Rent Increase Notice',
          message: 'Please be advised that there will be a 3% rent increase effective from your next lease renewal.',
          date: '2023-10-20',
          isRead: true,
          type: 'important',
        },
        {
          id: '3',
          title: 'Community Event: Year-End Gathering',
          message: 'Join us for the year-end community gathering on December 15th at 6pm in the common area.',
          date: '2023-10-18',
          isRead: true,
          type: 'event',
        },
      ]);
    }
    
    return true;
  };

  // Function to handle rent payment
  const handlePayment = async (payment: Payment) => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update payment status
      const updatedPayments = payments.map(p => 
        p.id === payment.id 
          ? {
              ...p,
              status: 'paid' as const,
              paymentDate: new Date().toISOString().split('T')[0],
              method: 'Bank Transfer',
              reference: `PAY-${Math.random().toString(36).substr(2, 9)}`,
            }
          : p
      );
      
      setPayments(updatedPayments);
      
      // Add payment confirmation notification
      addNotification({
        id: Math.random().toString(36).substr(2, 9),
        title: 'Payment Successful',
        message: `Your payment of $${payment.amount} for ${payment.description} has been processed successfully.`,
        date: new Date().toISOString(),
        isRead: false,
        type: 'payment',
      });
      
      setShowPaymentModal(false);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle Profile Modal
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  // Modified function to handle property selection for maintenance
  const openMaintenanceModal = (propertyId: string = '') => {
    setSelectedProperty(propertyId);
    setShowMaintenanceModal(true);
  };

  // Modified handleMaintenanceRequest to include property information
  const handleMaintenanceRequest = async (request: Partial<MaintenanceRequest>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const property = tenantProperties.find(p => p.id === selectedProperty) || tenantProperties[0];
      
      const newRequest: MaintenanceRequest = {
        id: Math.random().toString(36).substr(2, 9),
        issue: request.issue || '',
        description: request.description,
        dateSubmitted: new Date().toISOString().split('T')[0],
        status: 'pending',
        priority: request.priority || 'medium',
        notes: request.notes,
        propertyId: property.id,
        propertyName: property.name,
        propertyUnit: property.unit,
      };
      
      setMaintenanceRequests([newRequest, ...maintenanceRequests]);
      
      // Add confirmation notification
      addNotification({
        id: Math.random().toString(36).substr(2, 9),
        title: 'Maintenance Request Submitted',
        message: `Your maintenance request for "${request.issue}" at ${property.name} (${property.unit}) has been submitted successfully.`,
        date: new Date().toISOString(),
        isRead: false,
        type: 'notice',
      });
      
      setShowMaintenanceModal(false);
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to mark notification as read
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  // Helper function to add a new notification
  const addNotification = (notification: Notification) => {
    setNotifications([notification, ...notifications]);
  };

  // Function to calculate days remaining until date
  const getDaysRemaining = (dateString: string) => {
    const targetDate = new Date(dateString);
    const today = new Date();
    
    // Reset time component for accurate day calculation
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to simulate data refresh
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Function to get status badge for maintenance requests
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'in-progress':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  // Function to get priority badge for maintenance requests
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>;
      case 'medium':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>;
      case 'low':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Low</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{priority}</span>;
    }
  };

  // Function to get notification type icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'important':
        return <BellIcon className="h-5 w-5 text-red-500" />;
      case 'notice':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'event':
        return <CalendarIcon className="h-5 w-5 text-green-500" />;
      default:
        return <EnvelopeIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  // Calculate days until next payment
  const daysUntilNextPayment = getDaysRemaining(tenantInfo.nextPaymentDue);
  
  // New helper functions for enhanced dashboard
  
  // Calculate the overall payment completion rate
  const getPaymentCompletionRate = () => {
    const totalPayments = payments.length;
    const completedPayments = payments.filter(p => p.status === 'paid').length;
    return totalPayments > 0 ? Math.round((completedPayments / totalPayments) * 100) : 0;
  };
  
  // Get greeting based on time of day
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  // Calculate total rent across all properties
  const calculateTotalRent = () => {
    return tenantProperties.reduce((total, property) => total + property.rentAmount, 0);
  };
  
  // Calculate average rating
  const getAverageRating = () => {
    return 4.2; // Mock data - would be calculated from actual ratings
  };
  
  // Format currency with dollar sign
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };
  
  // Calculate the percentage of lease complete
  const calculateLeaseCompletion = (property: TenantProperty) => {
    const startDate = new Date(property.leaseStart).getTime();
    const endDate = new Date(property.leaseEnd).getTime();
    const today = new Date().getTime();
    
    const totalDuration = endDate - startDate;
    const elapsed = today - startDate;
    
    return Math.max(0, Math.min(100, Math.round((elapsed / totalDuration) * 100)));
  };
  
  // Toggle display mode between grid and list
  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'grid' ? 'list' : 'grid');
  };
  
  // Create a schedule display string
  const createScheduleDisplay = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    
    // Reset time components for proper comparison
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    
    if (eventDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (eventDate.getTime() === today.getTime() + 86400000) {
      return 'Tomorrow';
    } else {
      return formatDate(date);
    }
  };

  // Payment Modal Component
  const PaymentModal: React.FC<{
    payment: Payment;
    onClose: () => void;
    onSubmit: (payment: Payment) => void;
    loading: boolean;
  }> = ({ payment, onClose, onSubmit, loading }) => {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Process Payment</h3>
            <p className="mt-1 text-sm text-gray-500">
              Please confirm your payment details below.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-900">{payment.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <p className="mt-1 text-sm text-gray-900">${payment.amount}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <p className="mt-1 text-sm text-gray-900">{formatDate(payment.dueDate)}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => onSubmit(payment)}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Payment'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Profile Modal Component
  const ProfileModal: React.FC<{
    onClose: () => void;
  }> = ({ onClose }) => {
    const [profileData, setProfileData] = useState({
      name: tenantInfo.name,
      email: 'tenant@dzimba.com',
      phone: '+263 77 123 4567',
      preferredContact: 'email',
      notifications: true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setProfileData({
        ...profileData,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call to update profile
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setTenantInfo({
          ...tenantInfo,
          name: profileData.name,
        });
        onClose();
        // Add success notification
        addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Profile Updated',
          message: 'Your profile has been updated successfully.',
          date: new Date().toISOString(),
          isRead: false,
          type: 'notice',
        });
      }, 1000);
    };

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="h-24 w-24 rounded-full bg-zim-green flex items-center justify-center text-xl font-medium text-white">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700">
                Preferred Contact Method
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={profileData.preferredContact}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="sms">SMS</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={profileData.notifications}
                onChange={handleChange}
                className="h-4 w-4 text-zim-green focus:ring-zim-green border-gray-300 rounded"
              />
              <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                Receive email notifications
              </label>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Enhanced Maintenance Request Modal to include property selection
  const MaintenanceRequestModal: React.FC<{
    onClose: () => void;
    onSubmit: (request: Partial<MaintenanceRequest>) => void;
    loading: boolean;
  }> = ({ onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
      issue: '',
      description: '',
      priority: 'medium' as MaintenanceRequest['priority'],
      propertyId: selectedProperty || tenantProperties[0]?.id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Submit Maintenance Request</h3>
            <p className="mt-1 text-sm text-gray-500">
              Please provide details about the maintenance issue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
                Property
              </label>
              <select
                id="propertyId"
                value={formData.propertyId}
                onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                required
              >
                {tenantProperties.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.name} - {property.unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                Issue Title
              </label>
              <input
                type="text"
                id="issue"
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as MaintenanceRequest['priority'] })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced welcome hero section */}
      <div className={`bg-gradient-to-r from-zim-green to-emerald-600 rounded-xl shadow-lg transition-all duration-500 overflow-hidden ${showWelcomeMessage ? 'max-h-80' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="px-6 py-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{getTimeBasedGreeting()}, {tenantInfo.name}!</h1>
              <p className="mt-2 text-emerald-100">Welcome to your personal tenant dashboard. Here's a summary of your current status.</p>
            </div>
            <button 
              onClick={() => setShowWelcomeMessage(false)}
              className="mt-4 md:mt-0 text-emerald-100 hover:text-white transition-colors"
              aria-label="Dismiss welcome message"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <HomeIcon className="h-8 w-8 text-white" />
                <div className="ml-3">
                  <p className="text-sm text-emerald-100">Properties</p>
                  <p className="text-2xl font-bold">{tenantProperties.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-white" />
                <div className="ml-3">
                  <p className="text-sm text-emerald-100">Monthly Rent</p>
                  <p className="text-2xl font-bold">${calculateTotalRent()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <CheckBadgeIcon className="h-8 w-8 text-white" />
                <div className="ml-3">
                  <p className="text-sm text-emerald-100">Payments Complete</p>
                  <p className="text-2xl font-bold">{getPaymentCompletionRate()}%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <WrenchScrewdriverIcon className="h-8 w-8 text-white" />
                <div className="ml-3">
                  <p className="text-sm text-emerald-100">Maintenance</p>
                  <p className="text-2xl font-bold">{maintenanceRequests.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Page header with profile and action buttons */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tenant Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {tenantInfo.name}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
            onClick={() => setShowMaintenanceModal(true)}
          >
            <WrenchScrewdriverIcon className="h-4 w-4 mr-1" />
            New Request
          </button>
          <Link
            to="/tenant-dashboard/help"
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-1" />
            Contact Support
          </Link>
          <Link
            to="/tenant-dashboard/profile"
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <UserCircleIcon className="h-4 w-4 mr-1" />
            Profile
          </Link>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
            onClick={refreshData}
            disabled={loading}
          >
            <ArrowPathIcon className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Properties You Occupy Section */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <HomeIcon className="h-5 w-5 text-zim-green" />
              <h2 className="text-lg font-medium text-gray-900">Properties You Occupy</h2>
            </div>
            <span className="bg-zim-green-50 text-zim-green px-3 py-1 rounded-full text-sm font-medium">
              {tenantProperties.length} {tenantProperties.length === 1 ? 'Property' : 'Properties'}
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {tenantProperties.map((property) => (
              <div key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 bg-zim-green-50 rounded-md p-3">
                        <HomeIcon className="h-6 w-6 text-zim-green" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            property.status === 'active' ? 'bg-green-100 text-green-800' : 
                            property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {property.status === 'active' && (
                              <span className="h-1.5 w-1.5 mr-1 rounded-full bg-green-400"></span>
                            )}
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{property.address}</p>
                        
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500">Unit</span>
                            <span className="text-sm font-medium text-gray-900">{property.unit}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500">Rent</span>
                            <span className="text-sm font-medium text-gray-900">${property.rentAmount}/month</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-medium text-gray-500">Lease Period</span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatDate(property.leaseStart)} - {formatDate(property.leaseEnd)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Lease Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-500">Lease Progress</span>
                            <span className="text-xs text-gray-500">
                              {getDaysRemaining(property.leaseEnd) > 0 ? 
                                `${getDaysRemaining(property.leaseEnd)} days remaining` : 
                                'Lease expired'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-zim-green h-2 rounded-full" 
                              style={{ 
                                width: `${Math.min(
                                  100, 
                                  Math.max(
                                    0, 
                                    100 - (getDaysRemaining(property.leaseEnd) / 
                                      ((new Date(property.leaseEnd).getTime() - new Date(property.leaseStart).getTime()) / 
                                        (1000 * 60 * 60 * 24)) * 100)
                                  )
                                )}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Landlord Details - Collapsible */}
                    <div className="mt-4 ml-16">
                      <button 
                        onClick={() => setExpandedLandlord(expandedLandlord === property.id ? null : property.id)}
                        className="flex items-center text-sm text-gray-600 hover:text-zim-green focus:outline-none transition-colors"
                      >
                        <span>Landlord Details</span>
                        <ChevronRightIcon 
                          className={`ml-1 h-4 w-4 transition-transform ${expandedLandlord === property.id ? 'transform rotate-90' : ''}`} 
                        />
                      </button>
                      
                      {expandedLandlord === property.id && (
                        <div className="mt-2 bg-gray-50 rounded-md p-3 text-sm animate-fadeIn">
                          <p className="font-medium text-gray-900">{property.landlordName}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center">
                              <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                              <a href={`mailto:${property.landlordContact}`} className="text-zim-green hover:underline">
                                {property.landlordContact}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end space-y-3">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => openMaintenanceModal(property.id)}
                        className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                      >
                        <WrenchScrewdriverIcon className="h-4 w-4 mr-1.5" />
                        Maintenance
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                        onClick={() => {
                          const existingPayment = payments.find(p => 
                            p.status === 'upcoming' && p.description.includes(property.name)
                          );
                          
                          if (existingPayment) {
                            setSelectedPayment(existingPayment);
                            setShowPaymentModal(true);
                          } else {
                            // Create a new upcoming payment
                            const newPayment: Payment = {
                              id: `payment-${Date.now()}`,
                              description: `Rent for ${property.name} - ${property.unit}`,
                              amount: property.rentAmount,
                              dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
                              status: 'upcoming'
                            };
                            setSelectedPayment(newPayment);
                            setShowPaymentModal(true);
                          }
                        }}
                      >
                        <CurrencyDollarIcon className="h-4 w-4 mr-1.5" />
                        Pay Rent
                      </button>
                    </div>
                    
                    <Link
                      to="/tenant-dashboard/properties"
                      className="inline-flex items-center text-sm font-medium text-zim-green hover:text-zim-green-dark"
                    >
                      View property details
                      <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {tenantProperties.length === 0 && (
            <div className="p-6 text-center">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <HomeIcon className="h-full w-full" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No properties</h3>
              <p className="mt-1 text-sm text-gray-500">You don't have any properties assigned to you yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left column - Payment stats and next payment due */}
        <div className="md:col-span-4 space-y-6">
          {/* Next Payment Due - Enhanced with analytics */}
          <div className="bg-white shadow rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-zim-green to-green-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Next Payment Due</h2>
                <p className="text-2xl font-bold">${tenantInfo.rentAmount}</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <CurrencyDollarIcon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="px-6 py-4">
              {daysUntilNextPayment < 0 ? (
                <div className="flex items-center text-red-500 font-medium">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                  <span>Overdue by {Math.abs(daysUntilNextPayment)} days ({formatDate(tenantInfo.nextPaymentDue)})</span>
                </div>
              ) : (
                <div className={`flex items-center ${daysUntilNextPayment <= 5 ? 'text-yellow-500' : 'text-gray-500'} font-medium`}>
                  <span className={daysUntilNextPayment <= 5 ? 'text-yellow-500' : 'text-gray-500'}>
                    Due in {daysUntilNextPayment} days ({formatDate(tenantInfo.nextPaymentDue)})
                  </span>
                </div>
              )}
              
              {/* Payment summary */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="text-gray-500">Payment Completion</div>
                <div className="text-zim-green font-medium">{getPaymentCompletionRate()}%</div>
              </div>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-zim-green h-2 rounded-full" style={{ width: `${getPaymentCompletionRate()}%` }}></div>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  const payment = payments.find(p => p.status === 'upcoming' || p.status === 'overdue');
                  if (payment) {
                    setSelectedPayment(payment);
                    setShowPaymentModal(true);
                  }
                }}
                className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green transition-colors"
              >
                Make Payment
              </button>
            </div>
          </div>
          
          {/* Weather widget for property location */}
          <div className="bg-white shadow rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Local Weather</h2>
                <p className="text-sm text-blue-100">{weatherData.city}</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <weatherData.icon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</span>
                <span className="ml-2 text-gray-500">{weatherData.condition}</span>
              </div>
              <MapPinIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Center column - Payment history chart */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white shadow rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-lg h-full">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Payment History</h2>
                <p className="text-sm text-purple-100">Last 6 months</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <DocumentDuplicateIcon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="px-6 py-4">
              {/* Payment history chart */}
              <div className="h-48">
                <Line data={paymentHistoryData} options={chartOptions} />
              </div>
              
              <div className="mt-4 text-center">
                <Link
                  to="/tenant-dashboard/payments"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  View Payment History
                  <ChevronRightIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Maintenance and notifications */}
        <div className="md:col-span-4 space-y-6">
          {/* Maintenance Requests */}
          <div className="bg-white shadow rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">Maintenance Requests</h2>
                <p className="text-2xl font-bold">{maintenanceRequests.length}</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <WrenchScrewdriverIcon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {maintenanceRequests.length > 0 ? (
                  maintenanceRequests.slice(0, 2).map((request) => (
                    <div 
                      key={request.id} 
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100 transition-all hover:shadow-md"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{request.issue}</p>
                          <p className="text-xs text-gray-500">
                            {request.propertyName} - {request.propertyUnit}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Submitted on {formatDate(request.dateSubmitted)}</p>
                      {request.notes && <p className="text-xs text-gray-700 mt-1">{request.notes}</p>}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No maintenance requests</p>
                    <p className="text-xs text-gray-400">Your properties are in perfect condition</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowMaintenanceModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                >
                  <PlusIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  New Request
                </button>
              </div>
            </div>
          </div>

          {/* New Notifications - Enhanced with animations */}
          <div className="bg-white shadow rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium">New Notifications</h2>
                <p className="text-2xl font-bold">{notifications.filter(n => !n.isRead).length}</p>
              </div>
              <div className="h-12 w-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
                <BellIcon className="h-7 w-7 text-white" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-ping"></span>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {notifications.filter(n => !n.isRead).length > 0 ? (
                  notifications
                    .filter(n => !n.isRead)
                    .slice(0, 2)
                    .map((notification) => (
                      <div 
                        key={notification.id} 
                        className="p-3 bg-gray-50 rounded-lg border border-gray-100 cursor-pointer transform transition-all hover:shadow-md hover:scale-[1.02]"
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5 mr-2">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <BellIcon className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-500">No new notifications</p>
                    <p className="text-xs text-gray-400">You're all caught up!</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/tenant-dashboard/notifications"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  View All Notifications
                  <ChevronRightIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Satisfaction Chart */}
      <div className="bg-white shadow rounded-xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Property Satisfaction</h2>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Average Rating: {getAverageRating()}/5
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="order-2 md:order-1 w-full md:w-1/2 space-y-4">
            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <StarIconSolid key={rating} className={`h-5 w-5 ${rating <= Math.floor(getAverageRating()) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">Based on tenant feedback</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Cleanliness</span>
                  <span className="font-medium">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-zim-green h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Maintenance Response</span>
                  <span className="font-medium">Very Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-zim-green h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Value for Money</span>
                  <span className="font-medium">Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-zim-green h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 w-full md:w-1/2 h-60">
            <Doughnut data={satisfactionData} options={donutOptions} />
          </div>
        </div>
      </div>

      {/* Payment and maintenance history */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment history */}
        <div className="col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
            <Link
              to="/tenant-dashboard/payments"
              className="text-sm font-medium text-zim-green hover:text-zim-green-dark"
            >
              View all payments
            </Link>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Upcoming Payments</h4>
              <ul className="mt-3 divide-y divide-gray-200">
                {payments.filter(p => p.status === 'upcoming' || p.status === 'overdue').map((payment) => {
                  const daysRemaining = getDaysRemaining(payment.dueDate);
                  return (
                    <li key={payment.id} className="py-3 flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                        <p className="text-sm text-gray-500">Due on {formatDate(payment.dueDate)}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-4 text-sm font-medium ${daysRemaining < 0 ? 'text-red-600' : daysRemaining <= 5 ? 'text-yellow-500' : 'text-gray-500'}`}>
                          ${payment.amount}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowPaymentModal(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                        >
                          Pay Now
                        </button>
                      </div>
                    </li>
                  );
                })}
                {payments.filter(p => p.status === 'upcoming' || p.status === 'overdue').length === 0 && (
                  <li className="py-3 text-sm text-gray-500">No upcoming payments</li>
                )}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Recent Payments</h4>
              <ul className="mt-3 divide-y divide-gray-200">
                {payments.filter(p => p.status === 'paid').map((payment) => (
                  <li key={payment.id} className="py-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                      <p className="text-sm text-gray-500">Paid on {formatDate(payment.paymentDate || '')}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-4 text-sm font-medium text-gray-900">${payment.amount}</span>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Paid
                      </span>
                    </div>
                  </li>
                ))}
                {payments.filter(p => p.status === 'paid').length === 0 && (
                  <li className="py-3 text-sm text-gray-500">No recent payments</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Help Center Quick Access */}
        <div className="col-span-1 bg-white shadow rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Help & Support</h2>
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-white opacity-80" />
            </div>
            <p className="text-sm text-blue-100 mt-1">Get assistance with your questions</p>
          </div>
          
          <div className="p-6 space-y-4">
            <Link
              to="/tenant-dashboard/help/contact"
              className="block p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
            >
              <div className="flex-shrink-0 bg-blue-200 rounded-full p-2">
                <EnvelopeIcon className="h-5 w-5 text-blue-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Contact Property Owner</p>
                <p className="mt-1 text-xs text-gray-500">
                  Reach out to your property owner with questions or concerns
                </p>
              </div>
            </Link>
            
            <Link
              to="/tenant-dashboard/help/chat"
              className="block p-4 bg-indigo-50 border border-indigo-100 rounded-lg hover:bg-indigo-100 transition-colors flex items-center"
            >
              <div className="flex-shrink-0 bg-indigo-200 rounded-full p-2">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-indigo-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Live Chat Support</p>
                <p className="mt-1 text-xs text-gray-500">
                  Chat with a customer support representative for immediate help
                </p>
              </div>
              <div className="ml-auto rounded-full bg-green-500 w-2 h-2"></div>
            </Link>
            
            <Link
              to="/tenant-dashboard/help/knowledge-base"
              className="block p-4 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 transition-colors flex items-center"
            >
              <div className="flex-shrink-0 bg-purple-200 rounded-full p-2">
                <DocumentTextIcon className="h-5 w-5 text-purple-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Knowledge Base</p>
                <p className="mt-1 text-xs text-gray-500">
                  Find answers to common questions and learn how to use the system
                </p>
              </div>
            </Link>
            
            <div className="mt-3 text-center pt-3 border-t border-gray-200">
              <Link
                to="/tenant-dashboard/help"
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
              >
                Visit Help Center
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePayment}
          loading={loading}
        />
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          onClose={toggleProfileModal}
        />
      )}

      {/* Maintenance Request Modal */}
      {showMaintenanceModal && (
        <MaintenanceRequestModal
          onClose={() => setShowMaintenanceModal(false)}
          onSubmit={handleMaintenanceRequest}
          loading={loading}
        />
      )}
    </div>
  );
} 