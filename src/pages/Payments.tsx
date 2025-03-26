import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CurrencyDollarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  UserIcon,
  CalendarIcon,
  HomeIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ReceiptRefundIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BanknotesIcon,
  DocumentArrowDownIcon,
  ExclamationCircleIcon,
  PrinterIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../App';

interface Payment {
  id: string;
  tenant: string;
  unit: string;
  propertyName?: string;
  amount: number;
  date: string;
  dueDate?: string;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  notes?: string;
}

// Mock tenant properties for the logged-in tenant
const tenantProperties = [
  {
    id: '1',
    name: 'Sunshine Apartments',
    unit: 'Apt 101',
    rentAmount: 850,
    dueDate: '2024-03-01',
  },
  {
    id: '2', 
    name: 'Mountain View Residence',
    unit: 'Unit 10B',
    rentAmount: 750,
    dueDate: '2024-03-05',
  }
];

// Payment method options
const paymentMethods = [
  'EcoCash',
  'ZIPIT',
  'PayNow',
  'Bank Transfer',
  'Cash',
  'OneMoney',
  'Telecash',
  'Other'
];

// Tailored for tenant - showing their own payments
const mockPayments: Payment[] = [
  {
    id: '1',
    tenant: 'John Doe',
    propertyName: 'Sunshine Apartments',
    unit: 'Apt 101',
    amount: 850,
    date: '2024-03-01',
    method: 'EcoCash',
    status: 'completed',
    reference: 'EC123456',
    notes: 'March rent payment',
  },
  {
    id: '2',
    tenant: 'John Doe',
    propertyName: 'Mountain View Residence',
    unit: 'Unit 10B',
    amount: 950,
    date: '2024-03-01',
    method: 'ZIPIT',
    status: 'completed',
    reference: 'ZP789012',
    notes: 'March rent payment',
  },
  {
    id: '3',
    tenant: 'John Doe',
    propertyName: 'Sunshine Apartments',
    unit: 'Apt 101',
    amount: 750,
    date: '2024-03-02',
    method: 'PayNow',
    status: 'pending',
    reference: 'PN345678',
    notes: 'March rent payment - awaiting confirmation',
  },
];

export default function Payments() {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const amount = searchParams.get('amount');
  
  const { userRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalPayments, setTotalPayments] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    property: 'all',
    method: 'all',
    dateRange: 'all',
    startDate: '',
    endDate: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    propertyId: '',
    propertyName: '',
    unit: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    method: '',
    status: 'pending',
    reference: '',
    notes: '',
  });

  // Form validation
  const [formErrors, setFormErrors] = useState<{
    propertyId?: string;
    amount?: string;
    date?: string;
    method?: string;
    reference?: string;
  }>({});

  // Check if we should show the payment form based on URL parameters
  useEffect(() => {
    if (propertyId) {
      setIsAddingPayment(true);
      
      // Try to find the property in tenantProperties
      const selectedProperty = tenantProperties.find(p => p.id === propertyId);
      
      if (selectedProperty) {
        setFormData(prev => ({
          ...prev,
          propertyId: propertyId,
          propertyName: selectedProperty.name,
          unit: selectedProperty.unit,
          amount: amount ? parseFloat(amount) : selectedProperty.rentAmount,
          notes: 'Rent payment'
        }));
      } else if (amount) {
        // If property not found but amount is specified
        setFormData(prev => ({
          ...prev,
          amount: parseFloat(amount),
          notes: 'Rent payment'
        }));
      }
    }
  }, [propertyId, amount]);

  useEffect(() => {
    // Calculate total count when component mounts
    setTotalPayments(payments.length);
  }, []);

  // Filter the payments based on search term and filters
  const filteredPayments = payments.filter(payment => {
    // First apply search term filter
    const matchesSearchTerm = 
      (payment.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.toString().includes(searchTerm));

    if (!matchesSearchTerm) return false;
    
    // Then apply status filter
    if (filters.status !== 'all' && payment.status !== filters.status) {
      return false;
    }

    // Apply property filter
    if (filters.property !== 'all') {
      // This assumes that the property filter stores the property ID
      const property = tenantProperties.find(p => p.id === filters.property);
      if (!property || payment.propertyName !== property.name) {
        return false;
      }
    }

    // Apply payment method filter
    if (filters.method !== 'all' && payment.method !== filters.method) {
      return false;
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      
      if (filters.dateRange === 'custom' && filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // Set to end of day
        
        return paymentDate >= startDate && paymentDate <= endDate;
      } else if (filters.dateRange === 'today') {
        return (
          paymentDate.getDate() === today.getDate() &&
          paymentDate.getMonth() === today.getMonth() &&
          paymentDate.getFullYear() === today.getFullYear()
        );
      } else if (filters.dateRange === 'thisWeek') {
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Set to beginning of week (Sunday)
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // Set to end of week (Saturday)
        endOfWeek.setHours(23, 59, 59, 999);
        
        return paymentDate >= startOfWeek && paymentDate <= endOfWeek;
      } else if (filters.dateRange === 'thisMonth') {
        return (
          paymentDate.getMonth() === today.getMonth() &&
          paymentDate.getFullYear() === today.getFullYear()
        );
      } else if (filters.dateRange === 'last3Months') {
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        
        return paymentDate >= threeMonthsAgo;
      }
    }
    
    return true;
  });

  // Get all unique properties from payments
  const getUniqueProperties = () => {
    const uniqueProperties = new Set(payments.map(payment => payment.propertyName));
    return Array.from(uniqueProperties);
  };

  // Get all unique payment methods from payments
  const getUniquePaymentMethods = () => {
    const uniqueMethods = new Set(payments.map(payment => payment.method));
    return Array.from(uniqueMethods);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: 'all',
      property: 'all',
      method: 'all',
      dateRange: 'all',
      startDate: '',
      endDate: '',
    });
    setSearchTerm('');
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors: {
      propertyId?: string;
      amount?: string;
      date?: string;
      method?: string;
      reference?: string;
    } = {};
    
    if (!formData.propertyId) {
      errors.propertyId = 'Please select a property';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      errors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.date) {
      errors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const currentDate = new Date();
      if (selectedDate > currentDate) {
        errors.date = 'Date cannot be in the future';
      }
    }
    
    if (!formData.method) {
      errors.method = 'Please select a payment method';
    }
    
    if (!formData.reference && formData.status === 'completed') {
      errors.reference = 'Reference number is required for completed payments';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      propertyId: '',
      propertyName: '',
      unit: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      method: '',
      status: 'pending',
      reference: '',
      notes: '',
    });
    setFormErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear the error for this field when user starts typing
    setFormErrors({
      ...formErrors,
      [name]: undefined
    });
    
    if (name === 'amount') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else if (name === 'propertyId') {
      // Auto-fill property details based on selected property
      const selectedProperty = tenantProperties.find(p => p.id === value);
      if (selectedProperty) {
        setFormData({
          ...formData,
          propertyId: value,
          propertyName: selectedProperty.name,
          unit: selectedProperty.unit,
          amount: selectedProperty.rentAmount,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === 'status' && value === 'completed' && !formData.reference) {
      // Automatically generate a reference number when marking a payment as completed
      const newReference = generateReference();
      setFormData({
        ...formData,
        [name]: value,
        reference: newReference
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddPayment = () => {
    setIsAddingPayment(true);
    setIsEditingPayment(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate the form before submission
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing (in real app, this would call an API)
    setTimeout(() => {
      if (isEditingPayment && currentPayment) {
        // Update existing payment
        setPayments(payments.map(payment => 
          payment.id === currentPayment.id 
            ? { 
                ...payment, 
                amount: formData.amount,
                method: formData.method,
                status: formData.status as 'completed' | 'pending' | 'failed',
                reference: formData.reference,
                notes: formData.notes
              }
            : payment
        ));
      } else {
        // Add new payment
        const newPayment: Payment = {
          id: Date.now().toString(),
          tenant: 'John Doe', // In real app, this would be the logged-in user
          propertyName: formData.propertyName,
          unit: formData.unit,
          amount: formData.amount,
          date: formData.date,
          method: formData.method,
          status: formData.status as 'completed' | 'pending' | 'failed',
          reference: formData.reference || `REF-${Date.now().toString().slice(-6)}`,
          notes: formData.notes,
        };
        setPayments([newPayment, ...payments]);
        setTotalPayments(prev => prev + 1);
        
        // Show success message
        alert(`Payment of $${formData.amount} for ${formData.propertyName} recorded successfully`);
      }
      
      setIsAddingPayment(false);
      setIsEditingPayment(false);
      resetForm();
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-white" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-white" />;
      case 'failed':
        return <XCircleIcon className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-zim-green';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const generateReference = () => {
    const prefix = formData.method ? formData.method.substring(0, 2).toUpperCase() : 'PY';
    const randomNum = Math.floor(100000 + Math.random() * 900000).toString();
    const newReference = `${prefix}${randomNum}`;
    
    // Update the form data with the new reference
    setFormData({
      ...formData,
      reference: newReference,
    });
    
    return newReference;
  };

  const refreshData = () => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const downloadReceipt = (payment: Payment) => {
    // In a real app, this would generate a PDF for download
    alert(`Downloading receipt for payment ${payment.reference}`);
  };

  // Function to print receipt
  const printReceipt = () => {
    // Create a separate window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    // Get the receipt content
    const receiptContent = document.getElementById('receipt-content');
    if (!receiptContent) return;
    
    // Create the print document
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .receipt { max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .receipt-title { font-size: 18px; text-transform: uppercase; }
            .receipt-id { color: #666; margin-top: 5px; }
            .company-details { margin: 20px 0; }
            .section { margin: 15px 0; }
            .divider { border-top: 1px solid #eee; margin: 15px 0; }
            .flex { display: flex; justify-content: space-between; }
            .total { font-weight: bold; font-size: 16px; margin-top: 10px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #eee; }
            th { background-color: #f9fafb; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          ${receiptContent.innerHTML}
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  // Calculate payment statistics
  const getPaymentStats = () => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const completedPayments = payments.filter(p => p.status === 'completed');
    const pendingPayments = payments.filter(p => p.status === 'pending');
    const completedAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Calculate current month payments
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === currentMonth && 
             paymentDate.getFullYear() === currentYear && 
             payment.status === 'completed';
    });
    
    const currentMonthTotal = currentMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Get previous month for comparison
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const previousMonthPayments = payments.filter(payment => {
      const paymentDate = new Date(payment.date);
      return paymentDate.getMonth() === previousMonth && 
             paymentDate.getFullYear() === previousMonthYear && 
             payment.status === 'completed';
    });
    
    const previousMonthTotal = previousMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
    
    // Calculate percentage change
    const percentageChange = previousMonthTotal === 0 
      ? 100 
      : Math.round(((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100);
    
    return {
      totalAmount,
      completedAmount,
      pendingAmount,
      completedCount: completedPayments.length,
      pendingCount: pendingPayments.length,
      currentMonthTotal,
      previousMonthTotal,
      percentageChange
    };
  };

  const stats = getPaymentStats();

  // Function to view payment receipt 
  const viewReceipt = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  // New function to export payments
  const exportPayments = (format: 'csv' | 'pdf') => {
    setLoading(true);
    
    // In a real application, this would connect to a backend service
    // Here we'll simulate the export process
    
    setTimeout(() => {
      if (format === 'csv') {
        // Create CSV content
        const headers = 'ID,Property,Unit,Amount,Date,Method,Reference,Status\n';
        const rows = filteredPayments.map(payment => 
          `${payment.id},${payment.propertyName},${payment.unit},${payment.amount},${payment.date},${payment.method},${payment.reference},${payment.status}`
        ).join('\n');
        
        const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
        const encodedUri = encodeURI(csvContent);
        
        // Create a link and trigger download
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `payment_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // In a real app, this would generate a PDF
        alert('PDF export would be initiated here in the real application');
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage rent payments
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddPayment}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Record Payment
        </button>
      </div>

      {/* Payment Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Payments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Payments</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${stats.totalAmount}</p>
              <p className="mt-1 text-sm text-gray-500">
                From {payments.length} transactions
              </p>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
              <BanknotesIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">This Month</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${stats.currentMonthTotal}</p>
              <div className="mt-1 flex items-center text-sm">
                {stats.percentageChange > 0 ? (
                  <>
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">+{stats.percentageChange}%</span>
                  </>
                ) : stats.percentageChange < 0 ? (
                  <>
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500">{stats.percentageChange}%</span>
                  </>
                ) : (
                  <span className="text-gray-500">No change</span>
                )}
                <span className="ml-1 text-gray-500">vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${stats.pendingAmount}</p>
              <p className="mt-1 text-sm text-gray-500">
                {stats.pendingCount} pending payment{stats.pendingCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Successful */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Completed</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${stats.completedAmount}</p>
              <p className="mt-1 text-sm text-gray-500">
                {stats.completedCount} successful payment{stats.completedCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 max-w-lg">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-zim-green focus:border-zim-green sm:text-sm"
                placeholder="Search by property, reference, amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <span className="text-sm text-gray-500">Found: {filteredPayments.length}</span>
            <button 
              onClick={refreshData}
              className={`p-1 rounded-full text-gray-400 hover:text-gray-500 ${loading ? 'animate-spin' : ''}`}
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="property" className="block text-xs font-medium text-gray-700 mb-1">
                  Property
                </label>
                <select
                  id="property"
                  name="property"
                  value={filters.property}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                >
                  <option value="all">All Properties</option>
                  {tenantProperties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} - {property.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="method" className="block text-xs font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  id="method"
                  name="method"
                  value={filters.method}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                >
                  <option value="all">All Methods</option>
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="dateRange" className="block text-xs font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  id="dateRange"
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="thisWeek">This Week</option>
                  <option value="thisMonth">This Month</option>
                  <option value="last3Months">Last 3 Months</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {filters.dateRange === 'custom' && (
                <>
                  <div>
                    <label htmlFor="startDate" className="block text-xs font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-xs font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                      className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                    />
                  </div>
                </>
              )}
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-4 sm:px-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Payment Records
            </h3>
            <div className="flex mt-2 sm:mt-0 space-x-2">
              <button
                type="button"
                onClick={() => exportPayments('csv')}
                disabled={loading || filteredPayments.length === 0}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green disabled:opacity-50"
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => exportPayments('pdf')}
                disabled={loading || filteredPayments.length === 0}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green disabled:opacity-50"
              >
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                Export PDF
              </button>
              {userRole === 'tenant' && (
                <button
                  type="button"
                  onClick={() => setIsAddingPayment(true)}
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Record Payment
                </button>
              )}
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zim-green"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <ExclamationCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filters.status !== 'all' || filters.property !== 'all' || filters.method !== 'all' || filters.dateRange !== 'all' 
                ? 'Try adjusting your search or filters to find what you are looking for.'
                : 'Get started by recording your first payment.'}
            </p>
            <div className="mt-6">
              {searchTerm || filters.status !== 'all' || filters.property !== 'all' || filters.method !== 'all' || filters.dateRange !== 'all' ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  Clear Filters
                </button>
              ) : userRole === 'tenant' ? (
                <button
                  type="button"
                  onClick={() => setIsAddingPayment(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Record First Payment
                </button>
              ) : (
                <p className="text-sm text-gray-500">No payment records available at this time.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Property
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reference
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr 
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{payment.propertyName}</div>
                          <div className="text-sm text-gray-500">{payment.unit}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(payment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(payment.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.reference}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.status === 'completed' ? (
                          <CheckCircleIcon className="mr-1 h-3 w-3 text-green-600" />
                        ) : payment.status === 'pending' ? (
                          <ClockIcon className="mr-1 h-3 w-3 text-yellow-600" />
                        ) : (
                          <XCircleIcon className="mr-1 h-3 w-3 text-red-600" />
                        )}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => viewReceipt(payment)}
                          disabled={payment.status !== 'completed'}
                          className={`text-zim-green hover:text-zim-green-dark focus:outline-none focus:underline ${
                            payment.status !== 'completed' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          View
                        </button>
                        {userRole === 'admin' && payment.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approvePayment(payment.id)}
                              className="text-green-600 hover:text-green-800 focus:outline-none focus:underline"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectPayment(payment.id)}
                              className="text-red-600 hover:text-red-800 focus:outline-none focus:underline"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {userRole === 'tenant' && payment.status === 'pending' && (
                          <button
                            onClick={() => {
                              setCurrentPayment(payment);
                              setIsEditingPayment(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-800 focus:outline-none focus:underline"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Payment Form - Redesigned to match screenshot */}
      {isAddingPayment && (
        <div className="bg-white rounded-lg shadow-md border-l-4 border-zim-green">
          <div className="px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Record New Payment
            </h2>
            <button
              onClick={() => {
                setIsAddingPayment(false);
                setIsEditingPayment(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1">
                  Property <span className="text-red-500">*</span>
                </label>
                <select
                  id="propertyId"
                  name="propertyId"
                  value={formData.propertyId}
                  onChange={handleInputChange}
                  required
                  className={`w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm ${
                    formErrors.propertyId ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a property</option>
                  {tenantProperties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} - {property.unit}
                    </option>
                  ))}
                </select>
                {formErrors.propertyId && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.propertyId}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  name="unit"
                  id="unit"
                  required
                  value={formData.unit}
                  readOnly
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 bg-gray-50 text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    min="0"
                    required
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={`w-full rounded-md pl-7 py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm ${
                      formErrors.amount ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {formErrors.amount && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.amount}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm ${
                    formErrors.date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  max={new Date().toISOString().split('T')[0]}
                />
                {formErrors.date && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <select
                  id="method"
                  name="method"
                  value={formData.method}
                  onChange={handleInputChange}
                  required
                  className={`w-full rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm ${
                    formErrors.method ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select method</option>
                  {paymentMethods.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
                {formErrors.method && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.method}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      checked={formData.status === 'pending'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-zim-green focus:ring-zim-green border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Pending</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      checked={formData.status === 'completed'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-zim-green focus:ring-zim-green border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Completed</span>
                  </label>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Number {formData.status === 'completed' && <span className="text-red-500">*</span>}
                </label>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="reference"
                    id="reference"
                    value={formData.reference}
                    onChange={handleInputChange}
                    placeholder="Transaction reference"
                    className={`w-full rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm ${
                      formErrors.reference ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={generateReference}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                  >
                    Generate
                  </button>
                </div>
                {formErrors.reference && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.reference}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any additional notes about this payment"
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-5">
              <button
                type="button"
                onClick={() => {
                  setIsAddingPayment(false);
                  setIsEditingPayment(false);
                }}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  'Record Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Payment Receipt Modal - Redesigned for a more professional look */}
      {showReceiptModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center z-10">
              <h3 className="text-lg font-medium text-gray-900">Payment Receipt</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={printReceipt}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <PrinterIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  Print
                </button>
                <button
                  onClick={() => downloadReceipt(selectedPayment)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <DocumentArrowDownIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                  Download PDF
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowReceiptModal(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            
            <div className="px-6 py-6" id="receipt-content">
              <div className="receipt">
                <div className="header">
                  <div className="logo">Dzimba Property System</div>
                  <div className="receipt-title">Official Payment Receipt</div>
                  <div className="receipt-id">Receipt #: {selectedPayment.reference}</div>
                </div>
                
                <div className="flex company-details">
                  <div className="w-1/2">
                    <h4 className="font-medium text-gray-900">From:</h4>
                    <p className="text-gray-600">Dzimba Property Management</p>
                    <p className="text-gray-600">123 Business Avenue</p>
                    <p className="text-gray-600">Harare, Zimbabwe</p>
                    <p className="text-gray-600">info@dzimba.com</p>
                  </div>
                  <div className="w-1/2">
                    <h4 className="font-medium text-gray-900">To:</h4>
                    <p className="text-gray-600">John Tenant</p>
                    <p className="text-gray-600">{selectedPayment.propertyName}</p>
                    <p className="text-gray-600">Unit: {selectedPayment.unit}</p>
                  </div>
                </div>
                
                <div className="section">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Payment Date</p>
                      <p className="font-medium">
                        {new Date(selectedPayment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">{selectedPayment.method}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Reference</p>
                      <p className="font-medium">{selectedPayment.reference}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedPayment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : selectedPayment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedPayment.status === 'completed' ? (
                          <CheckCircleIcon className="mr-1 h-3 w-3 text-green-600" />
                        ) : selectedPayment.status === 'pending' ? (
                          <ClockIcon className="mr-1 h-3 w-3 text-yellow-600" />
                        ) : (
                          <XCircleIcon className="mr-1 h-3 w-3 text-red-600" />
                        )}
                        {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div className="section">
                  <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th className="text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Rent Payment - {selectedPayment.propertyName} ({selectedPayment.unit})</td>
                        <td className="text-right">${selectedPayment.amount.toFixed(2)}</td>
                      </tr>
                      {selectedPayment.method === 'Card' && (
                        <tr>
                          <td>Processing Fee</td>
                          <td className="text-right">$0.00</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="font-medium">Total</td>
                        <td className="text-right font-medium">${selectedPayment.amount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="divider"></div>
                
                {selectedPayment.notes && (
                  <div className="section">
                    <h4 className="font-medium text-gray-900 mb-1">Notes</h4>
                    <p className="text-gray-600">{selectedPayment.notes}</p>
                  </div>
                )}
                
                <div className="footer">
                  <p>Thank you for your payment!</p>
                  <p>For questions regarding this receipt, please contact our support team.</p>
                  <p>&copy; {new Date().getFullYear()} Dzimba Property Management. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 