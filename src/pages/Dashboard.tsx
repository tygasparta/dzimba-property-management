import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  BellAlertIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  FireIcon,
  ShieldCheckIcon,
  HomeModernIcon,
  MapPinIcon,
  SunIcon,
  CloudIcon,
  MoonIcon,
  XMarkIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Statistics data with additional trend information
const stats = [
  {
    name: 'Total Properties',
    value: '12',
    icon: BuildingOfficeIcon,
    change: '+2',
    changeType: 'increase',
    changeText: 'from last month',
    trend: [35, 40, 45, 50, 55, 48, 52, 60, 65, 75, 80, 92],
    link: '/dashboard/properties',
    color: 'from-zim-green to-zim-green-dark',
    iconBg: 'bg-zim-green-100',
  },
  {
    name: 'Active Tenants',
    value: '45',
    icon: UserGroupIcon,
    change: '+5',
    changeType: 'increase',
    changeText: 'from last month',
    trend: [15, 20, 25, 30, 35, 40, 38, 42, 45, 50, 55, 65],
    link: '/dashboard/tenants',
    color: 'from-yellow-500 to-amber-600',
    iconBg: 'bg-yellow-100',
  },
  {
    name: 'Monthly Revenue',
    value: '$12,500',
    icon: CurrencyDollarIcon,
    change: '+8%',
    changeType: 'increase',
    changeText: 'from last month',
    trend: [8000, 8500, 9000, 9200, 9500, 10000, 10500, 11000, 11200, 11500, 12000, 12500],
    link: '/dashboard/payments',
    color: 'from-green-500 to-green-600',
    iconBg: 'bg-green-100',
  },
  {
    name: 'Pending Maintenance',
    value: '3',
    icon: WrenchScrewdriverIcon,
    change: '-1',
    changeType: 'decrease',
    changeText: 'from last month',
    trend: [8, 7, 5, 6, 4, 5, 3, 4, 5, 4, 3, 2],
    link: '/dashboard/maintenance',
    color: 'from-red-500 to-red-600',
    iconBg: 'bg-red-100',
  },
];

// Additional statistics for financial overview
const financialStats = [
  {
    name: 'Total Revenue YTD',
    value: '$145,800',
    change: '+12.5%',
    changeType: 'increase',
  },
  {
    name: 'Outstanding Payments',
    value: '$4,250',
    change: '-8.3%',
    changeType: 'decrease',
  },
  {
    name: 'Maintenance Costs',
    value: '$18,650',
    change: '+4.2%',
    changeType: 'increase',
  },
  {
    name: 'Average Rent',
    value: '$950',
    change: '+$50',
    changeType: 'increase',
  },
];

// Recent activities data with enhanced details
const recentActivities = [
  {
    id: '1',
    type: 'payment',
    title: 'Rent Payment Received',
    description: 'John Doe paid $850 for Apt 101',
    date: '2024-03-15T10:30:00',
    property: 'Sunset Apartments',
    icon: CurrencyDollarIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    link: '/dashboard/payments',
  },
  {
    id: '2',
    type: 'maintenance',
    title: 'New Maintenance Request',
    description: 'Plumbing issue reported in Apt 102',
    date: '2024-03-14T14:45:00',
    property: 'Garden Villas',
    icon: WrenchScrewdriverIcon,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    link: '/dashboard/maintenance',
  },
  {
    id: '3',
    type: 'lease',
    title: 'Lease Agreement Signed',
    description: 'New tenant for Garden Villas Apt 205',
    date: '2024-03-13T09:15:00',
    property: 'Garden Villas',
    icon: DocumentTextIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    link: '/dashboard/leases',
  },
  {
    id: '4',
    type: 'maintenance',
    title: 'Maintenance Complete',
    description: 'Fixed window lock in Mountain View Apt 103',
    date: '2024-03-12T16:20:00',
    property: 'Mountain View',
    icon: CheckCircleIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    link: '/dashboard/maintenance',
  },
  {
    id: '5',
    type: 'payment',
    title: 'Late Payment Notice',
    description: 'Sent reminder to Sarah Jones for Apt 304',
    date: '2024-03-11T09:10:00',
    property: 'City Heights',
    icon: BellAlertIcon,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    link: '/dashboard/payments',
  },
  {
    id: '6',
    type: 'lease',
    title: 'Lease Renewal Processed',
    description: 'David Wilson renewed for another year',
    date: '2024-03-10T13:25:00',
    property: 'Riverside Condos',
    icon: DocumentTextIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    link: '/dashboard/leases',
  },
];

// Upcoming events data with enhanced details
const upcomingEvents = [
  {
    id: '1',
    title: 'Lease Expiration',
    description: 'Mike Johnson\'s lease at Apt 103 expires',
    date: '2024-04-01',
    daysAway: 7,
    type: 'lease',
    property: 'Sunset Apartments',
    icon: CalendarIcon,
    color: 'border-yellow-500',
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Property Inspection',
    description: 'Annual inspection for Sunset Apartments',
    date: '2024-03-22',
    daysAway: 2,
    type: 'inspection',
    property: 'Sunset Apartments',
    icon: BuildingOfficeIcon,
    color: 'border-blue-500',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Maintenance Scheduled',
    description: 'HVAC service for Garden Villas',
    date: '2024-03-25',
    daysAway: 5,
    type: 'maintenance',
    property: 'Garden Villas',
    icon: WrenchScrewdriverIcon,
    color: 'border-green-500',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Rent Collection Due',
    description: 'Monthly rent collection deadline',
    date: '2024-04-01',
    daysAway: 7,
    type: 'payment',
    property: 'All Properties',
    icon: BanknotesIcon,
    color: 'border-zim-green',
    priority: 'high',
  },
  {
    id: '5',
    title: 'Insurance Renewal',
    description: 'Property insurance policy renewal',
    date: '2024-04-15',
    daysAway: 21,
    type: 'admin',
    property: 'All Properties',
    icon: ShieldCheckIcon,
    color: 'border-purple-500',
    priority: 'medium',
  },
];

// Occupancy data with enhanced property details
const occupancyData = [
  { 
    name: 'Sunset Apartments', 
    occupied: 10, 
    total: 12,
    revenue: 8500,
    type: 'Apartment',
    location: 'Downtown',
    maintenanceRequests: 2
  },
  { 
    name: 'Garden Villas', 
    occupied: 8, 
    total: 8,
    revenue: 9600,
    type: 'Villa',
    location: 'North End',
    maintenanceRequests: 1
  },
  { 
    name: 'Mountain View', 
    occupied: 0, 
    total: 1,
    revenue: 0,
    type: 'House',
    location: 'East Side',
    maintenanceRequests: 0
  },
  { 
    name: 'City Heights', 
    occupied: 15, 
    total: 20,
    revenue: 12750,
    type: 'Apartment',
    location: 'Central',
    maintenanceRequests: 3
  },
  { 
    name: 'Riverside Condos', 
    occupied: 12, 
    total: 14,
    revenue: 14400,
    type: 'Condo',
    location: 'Riverside',
    maintenanceRequests: 1
  },
];

// Monthly revenue data for chart
const monthlyRevenueData = [
  { month: 'Jan', revenue: 35000 },
  { month: 'Feb', revenue: 32000 },
  { month: 'Mar', revenue: 30000 },
  { month: 'Apr', revenue: 34000 },
  { month: 'May', revenue: 32000 },
  { month: 'Jun', revenue: 35000 },
  { month: 'Jul', revenue: 37000 },
  { month: 'Aug', revenue: 36000 },
  { month: 'Sep', revenue: 38000 },
  { month: 'Oct', revenue: 33000 },
  { month: 'Nov', revenue: 35000 },
  { month: 'Dec', revenue: 38000 },
];

// Lease expiry data for the next 6 months
const leaseExpiryData = [
  { month: 'Apr', count: 3 },
  { month: 'May', count: 5 },
  { month: 'Jun', count: 2 },
  { month: 'Jul', count: 4 },
  { month: 'Aug', count: 6 },
  { month: 'Sep', count: 3 },
];

// Quick action links
const quickActions = [
  { name: 'Add Property', icon: HomeModernIcon, link: '/dashboard/properties' },
  { name: 'Add Tenant', icon: UserGroupIcon, link: '/dashboard/tenants' },
  { name: 'Record Payment', icon: BanknotesIcon, link: '/dashboard/payments' },
  { name: 'Create Lease', icon: DocumentTextIcon, link: '/dashboard/leases' },
];

// Type for the activity filters
type ActivityFilterType = 'all' | 'payments' | 'maintenance' | 'leases';

// Weather data for Zimbabwe cities (simulated)
const weatherData = [
  {
    city: 'Harare',
    temperature: 24,
    condition: 'Sunny',
    icon: SunIcon,
    humidity: 45,
    wind: 8,
    high: 27,
    low: 19,
  },
  {
    city: 'Bulawayo',
    temperature: 26,
    condition: 'Partly Cloudy',
    icon: CloudIcon,
    humidity: 40,
    wind: 10,
    high: 29,
    low: 22,
  },
  {
    city: 'Mutare',
    temperature: 22,
    condition: 'Cloudy',
    icon: CloudIcon,
    humidity: 55,
    wind: 12,
    high: 25,
    low: 18,
  }
];

// Property alerts data
const propertyAlerts = [
  {
    id: 'alert1',
    title: 'Maintenance Urgent',
    message: 'Water leak reported at Sunset Apartments, Unit 204. Requires immediate attention.',
    type: 'urgent',
    date: '2024-03-16T08:30:00',
    isRead: false,
  },
  {
    id: 'alert2',
    title: 'Lease Expiration Soon',
    message: '5 leases will expire in the next 30 days. Review and prepare renewal documents.',
    type: 'warning',
    date: '2024-03-15T14:20:00',
    isRead: true,
  },
  {
    id: 'alert3',
    title: 'Payment Overdue',
    message: '3 tenants have overdue payments of more than 5 days. Consider sending reminders.',
    type: 'urgent',
    date: '2024-03-15T09:45:00',
    isRead: false,
  },
  {
    id: 'alert4',
    title: 'Inspection Due',
    message: 'Quarterly inspection for Garden Villas is due next week. Schedule with tenants.',
    type: 'info',
    date: '2024-03-14T11:15:00',
    isRead: true,
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<ActivityFilterType>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedWeatherCity, setSelectedWeatherCity] = useState('Harare');
  const [alerts, setAlerts] = useState(propertyAlerts);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailFormData, setEmailFormData] = useState({
    recipient: '',
    subject: '',
    message: '',
  });
  
  // Refs for scrolling to specific sections
  const occupancyRef = useRef<HTMLDivElement>(null);
  const financialRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

  // Filter activities based on active tab
  const filteredActivities = activeTab === 'all' 
    ? recentActivities 
    : recentActivities.filter(activity => activity.type === activeTab);

  // Get the current weather data based on the selected city
  const currentWeather = weatherData.find(weather => weather.city === selectedWeatherCity) || weatherData[0];

  // Simulate initial data loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setDataLoaded(true);
    }, 1500);
  }, []);

  // Simulate data refresh
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Scroll to specific section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format date for activity timeline
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate days remaining for upcoming events
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateString);
    eventDate.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Get the appropriate label for days remaining
  const getDaysLabel = (days: number) => {
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return `${Math.abs(days)} days ago`;
    return `${days} days away`;
  };

  // Get color class based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-blue-600';
    }
  };

  // Get class for stats change
  const getChangeClass = (changeType: string) => {
    return changeType === 'increase' 
      ? 'text-green-600 bg-green-50' 
      : 'text-red-600 bg-red-50';
  };

  // Chart data and options for Monthly Revenue
  const revenueChartData = {
    labels: monthlyRevenueData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: monthlyRevenueData.map(item => item.revenue),
        backgroundColor: 'rgba(46, 164, 79, 0.2)',
        borderColor: '#2ea44f',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return `$${value / 1000}k`;
          }
        }
      }
    }
  };

  // Chart data and options for Lease Expirations
  const leaseChartData = {
    labels: leaseExpiryData.map(item => item.month),
    datasets: [
      {
        label: 'Lease Expirations',
        data: leaseExpiryData.map(item => item.count),
        backgroundColor: '#f59e0b',
        borderColor: '#d97706',
        borderWidth: 1,
      }
    ],
  };

  const leaseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };

  // Doughnut chart for property types
  const propertyTypeData = {
    labels: ['Apartments', 'Villas', 'Houses', 'Condos'],
    datasets: [
      {
        data: [42, 8, 1, 14],
        backgroundColor: [
          '#2ea44f', // zim-green
          '#f59e0b', // yellow-500
          '#ef4444', // red-500
          '#3b82f6', // blue-500
        ],
        borderWidth: 1,
      },
    ],
  };

  const propertyTypeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  };

  // Mark alert as read
  const markAlertAsRead = (alertId: string) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  // Dismiss alert
  const dismissAlert = (alertId: string) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== alertId));
  };
  
  // Handle email form input change
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Send email notification (simulated)
  const sendEmailNotification = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate sending email
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
      setShowEmailForm(false);
      
      // Reset form
      setEmailFormData({
        recipient: '',
        subject: '',
        message: '',
      });
      
      // Show success message (this would be handled by a toast notification in a real app)
      alert('Email notification sent successfully');
    }, 1500);
  };
  
  // Get alert style based on type
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-400 text-yellow-700';
      default:
        return 'bg-blue-50 border-blue-400 text-blue-700';
    }
  };
  
  // Get alert icon based on type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return FireIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      default:
        return InformationCircleIcon;
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <ArrowPathIcon className="h-12 w-12 text-zim-green animate-spin" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">Loading dashboard data...</h2>
            <p className="mt-1 text-sm text-gray-500">Please wait while we fetch your data</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header with Zimbabwe flag styling */}
          <div className="relative pb-4">
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
              <div className="flex-1 bg-zim-green"></div>
              <div className="flex-1 bg-yellow-500"></div>
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-black"></div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Welcome back! Here's an overview of your property management system.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => scrollToSection(occupancyRef)}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Property Occupancy
                  </button>
                  <button
                    onClick={() => scrollToSection(financialRef)}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Financial Overview
                  </button>
                  <button
                    onClick={() => scrollToSection(activityRef)}
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Recent Activity
                  </button>
                </div>
                <button
                  onClick={refreshData}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <ArrowPathIcon 
                    className={`-ml-0.5 mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} 
                    aria-hidden="true" 
                  />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions and Weather */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {/* Quick Actions */}
            <div className="md:col-span-3 bg-white shadow-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    to={action.link}
                    className="flex flex-col items-center p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-zim-green-50 mb-2">
                      <action.icon className="h-5 w-5 text-zim-green" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Weather Widget */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm overflow-hidden text-white">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">Weather</h3>
                    <select 
                      value={selectedWeatherCity}
                      onChange={(e) => setSelectedWeatherCity(e.target.value)}
                      className="mt-1 bg-blue-600/50 text-white border border-blue-400 rounded px-2 py-1 text-sm"
                    >
                      {weatherData.map(weather => (
                        <option key={weather.city} value={weather.city}>{weather.city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <currentWeather.icon className="h-10 w-10 text-yellow-300" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-bold">{currentWeather.temperature}°</span>
                    <p className="text-blue-100">{currentWeather.condition}</p>
                  </div>
                  <div className="text-right text-blue-100 text-sm">
                    <div>H: {currentWeather.high}° L: {currentWeather.low}°</div>
                    <div>Humidity: {currentWeather.humidity}%</div>
                    <div>Wind: {currentWeather.wind} km/h</div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-blue-400 px-4 py-2 bg-blue-600/30 text-xs text-blue-100">
                <p>Forecast data helps plan property maintenance</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Link 
                to={stat.link} 
                key={stat.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
              >
                {/* Top border with Zimbabwe flag colors */}
                <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex-1 bg-zim-green"></div>
                  <div className="flex-1 bg-yellow-500"></div>
                  <div className="flex-1 bg-red-600"></div>
                  <div className="flex-1 bg-black"></div>
                </div>
                
                <dt>
                  <div className={`absolute rounded-md ${stat.iconBg} p-3`}>
                    <stat.icon className="h-6 w-6 text-zim-green" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                </dt>
                <dd className="ml-16 flex flex-col items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <div className="flex items-baseline text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      getChangeClass(stat.changeType)
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <ArrowTrendingUpIcon className="h-3 w-3 flex-shrink-0 self-center mr-1" />
                      ) : (
                        <ArrowTrendingDownIcon className="h-3 w-3 flex-shrink-0 self-center mr-1" />
                      )}
                      {stat.change}
                    </span>
                    <span className="ml-2 text-gray-500">{stat.changeText}</span>
                  </div>
                  
                  {/* Simple sparkline visualization */}
                  <div className="mt-3 w-full h-6">
                    <div className="flex items-end justify-between w-full h-full">
                      {stat.trend.map((value, i) => {
                        const maxValue = Math.max(...stat.trend);
                        const height = (value / maxValue) * 100;
                        return (
                          <div 
                            key={i} 
                            className={`w-1 bg-gradient-to-t ${stat.color} rounded-t`}
                            style={{ height: `${height}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </dd>
              </Link>
            ))}
          </div>

          {/* Property Alerts and Email Notification */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Property Alerts */}
            <div className="md:col-span-2 bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <BellAlertIcon className="h-5 w-5 text-zim-green mr-2" />
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Property Alerts</h3>
                </div>
                
                <div className="flex items-center">
                  <span className="inline-flex items-center rounded-full bg-zim-green-100 px-2.5 py-0.5 text-xs font-medium text-zim-green mr-2">
                    {alerts.filter(alert => !alert.isRead).length} unread
                  </span>
                  <button 
                    onClick={() => setAlerts([])} 
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {alerts.length > 0 ? (
                  <div className="space-y-3">
                    {alerts.map((alert) => {
                      const AlertIcon = getAlertIcon(alert.type);
                      return (
                        <div 
                          key={alert.id} 
                          className={`relative rounded-md border p-3 ${getAlertStyle(alert.type)} ${!alert.isRead ? 'border-l-4' : ''}`}
                        >
                          <div className="flex justify-between">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <AlertIcon className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium">{alert.title}</h3>
                                <div className="mt-1 text-sm">
                                  <p>{alert.message}</p>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  {new Date(alert.date).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0 self-start ml-4">
                              {!alert.isRead && (
                                <button
                                  onClick={() => markAlertAsRead(alert.id)}
                                  className="inline-flex text-xs text-blue-600 hover:text-blue-800 mr-2"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => dismissAlert(alert.id)}
                                className="inline-flex text-gray-400 hover:text-gray-500"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BellAlertIcon className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2">No alerts at this time</p>
                    <p className="text-sm">You'll be notified when there are important updates</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quick Email Notification */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-zim-green mr-2" />
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Quick Notification
                  </h3>
                </div>
              </div>
              
              {showEmailForm ? (
                <div className="p-4">
                  <form onSubmit={sendEmailNotification}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
                          Recipient
                        </label>
                        <select
                          id="recipient"
                          name="recipient"
                          value={emailFormData.recipient}
                          onChange={handleEmailInputChange as any}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        >
                          <option value="">Select recipient</option>
                          <option value="all_tenants">All Tenants</option>
                          <option value="sunset_apartments">Sunset Apartments Tenants</option>
                          <option value="garden_villas">Garden Villas Tenants</option>
                          <option value="city_heights">City Heights Tenants</option>
                          <option value="maintenance_staff">Maintenance Staff</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          value={emailFormData.subject}
                          onChange={handleEmailInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                          placeholder="Notification subject"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={emailFormData.message}
                          onChange={handleEmailInputChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                          placeholder="Enter your message here"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowEmailForm(false)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={refreshing}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none disabled:opacity-50"
                        >
                          {refreshing ? (
                            <>
                              <ArrowPathIcon className="animate-spin -ml-0.5 mr-2 h-4 w-4" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <PaperAirplaneIcon className="-ml-0.5 mr-2 h-4 w-4" />
                              Send Notification
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-4">
                  <div className="text-center py-6">
                    <EnvelopeIcon className="h-10 w-10 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Send notifications to tenants or staff</p>
                    <div className="mt-4">
                      <button
                        onClick={() => setShowEmailForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none"
                      >
                        Compose Notification
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Templates</h4>
                    <div className="space-y-2">
                      {['Maintenance Notice', 'Rent Reminder', 'Inspection Scheduled', 'Water Shutdown Notice'].map((template) => (
                        <button
                          key={template}
                          onClick={() => {
                            setEmailFormData({
                              recipient: 'all_tenants',
                              subject: template,
                              message: `This is a template for ${template.toLowerCase()}. Please customize this message before sending.`,
                            });
                            setShowEmailForm(true);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main content grid */}
          <div ref={occupancyRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Property Occupancy */}
            <div className="lg:col-span-2 bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Property Occupancy</h3>
                <Link 
                  to="/dashboard/properties" 
                  className="text-sm text-zim-green hover:text-zim-green-dark flex items-center"
                >
                  View All
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-5">
                {occupancyData.map((property) => (
                  <div key={property.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{property.name}</span>
                        <div className="flex items-center text-xs text-gray-500 mt-0.5">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {property.location}
                          <span className="mx-1.5">•</span>
                          {property.type}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-700 font-medium">
                          {property.occupied}/{property.total} units
                        </span>
                        <div className="text-xs text-gray-500">
                          {Math.round((property.occupied / property.total) * 100)}% occupied
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`bg-gradient-to-r from-zim-green to-zim-green-dark rounded-full h-2.5`} 
                        style={{ width: `${(property.occupied / property.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center text-gray-500">
                        <WrenchScrewdriverIcon className="h-3 w-3 mr-1 text-gray-400" />
                        {property.maintenanceRequests} maintenance requests
                      </div>
                      
                      {property.revenue > 0 && (
                        <div className="flex items-center text-gray-500">
                          <CurrencyDollarIcon className="h-3 w-3 mr-1 text-gray-400" />
                          ${property.revenue.toLocaleString()} revenue
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Property Type Distribution Chart */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Property Type Distribution</h4>
                <div className="h-60">
                  <Doughnut data={propertyTypeData} options={propertyTypeOptions} />
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Events</h3>
                <Link 
                  to="/dashboard" 
                  className="text-sm text-zim-green hover:text-zim-green-dark flex items-center"
                >
                  View Calendar
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => {
                  const daysRemaining = getDaysRemaining(event.date);
                  return (
                    <div 
                      key={event.id} 
                      className={`flex p-3 rounded-lg border-l-4 ${event.color} bg-gray-50`}
                    >
                      <div className="flex-shrink-0 self-center mr-3">
                        <div className={`p-2 rounded-full bg-white`}>
                          <event.icon className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {event.title}
                          </p>
                          <p className={`text-xs font-medium ${getPriorityColor(event.priority)}`}>
                            {event.priority}
                          </p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{event.description}</p>
                        <div className="mt-1 flex items-center">
                          <span className="text-xs text-gray-500 flex items-center">
                            <ClockIcon className="mr-1 h-3 w-3 text-gray-400" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="ml-2 text-xs font-medium inline-flex items-center rounded-full px-2 py-0.5 bg-gray-100">
                            {getDaysLabel(daysRemaining)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Financial Overview */}
          <div ref={financialRef} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Financial Overview</h3>
              <Link 
                to="/dashboard/reports" 
                className="text-sm font-medium text-zim-green hover:text-zim-green-dark flex items-center"
              >
                View Reports
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {financialStats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="mt-1 text-xl font-semibold text-gray-900">{stat.value}</dd>
                    <div className="mt-2">
                      <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                        getChangeClass(stat.changeType)
                      }`}>
                        {stat.changeType === 'increase' ? (
                          <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-3 w-3 mr-1" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Revenue & Lease charts */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg h-60">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Monthly Revenue</h4>
                  <Line data={revenueChartData} options={revenueChartOptions} />
                </div>
                <div className="bg-gray-50 p-4 rounded-lg h-60">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Lease Expirations (Next 6 Months)</h4>
                  <Bar data={leaseChartData} options={leaseChartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div ref={activityRef} className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between -mt-2 -ml-4 sm:flex-nowrap">
                <div className="mt-2 ml-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Recent Activity
                  </h3>
                </div>
                <div className="mt-2 ml-4 flex-shrink-0">
                  <div className="flex flex-wrap gap-2">
                    {['all', 'payments', 'maintenance', 'leases'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as ActivityFilterType)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                          activeTab === tab
                            ? 'bg-zim-green text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              {filteredActivities.length > 0 ? (
                <ul className="space-y-6">
                  {filteredActivities.map((activity, index) => (
                    <li key={activity.id} className="relative flex gap-x-4">
                      {index < filteredActivities.length - 1 && (
                        <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                          <div className="w-px bg-gray-200"></div>
                        </div>
                      )}
                      <div className={`relative flex h-6 w-6 flex-none items-center justify-center ${activity.iconBg} rounded-full`}>
                        <activity.icon className={`h-3.5 w-3.5 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-auto py-0.5 text-sm leading-5">
                        <div className="flex justify-between items-start gap-x-2">
                          <div>
                            <Link to={activity.link} className="font-medium text-gray-900 hover:text-zim-green">
                              {activity.title}
                            </Link>
                            <p className="text-gray-500 mt-0.5">{activity.description}</p>
                          </div>
                          <div className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                            <span className="font-medium text-gray-900">{formatDate(activity.date)}</span>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center gap-x-1.5">
                          <div className="flex-none rounded-full bg-gray-100 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                          </div>
                          <p className="text-xs leading-5 text-gray-500">
                            {activity.property} • {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No activities to display for this filter.</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Link 
                  to="/dashboard/notifications" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  View All Activity
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 