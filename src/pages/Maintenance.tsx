import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  WrenchScrewdriverIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  UserIcon,
  UserCircleIcon,
  CalendarIcon,
  XCircleIcon,
  FunnelIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../App';

interface MaintenanceRequest {
  id: string;
  property: string;
  unit: string;
  tenant: string;
  issue: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  assignedTo: string;
  notes?: string;
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    property: 'Sunset Apartments',
    unit: 'Apt 101',
    tenant: 'John Doe',
    issue: 'Plumbing',
    description: 'Leaking faucet in kitchen',
    priority: 'medium',
    status: 'in_progress',
    date: '2024-03-01',
    assignedTo: 'Mike Johnson',
    notes: 'Tenant reported water damage under sink. Service scheduled for tomorrow morning.'
  },
  {
    id: '2',
    property: 'Garden Villas',
    unit: 'Apt 102',
    tenant: 'Jane Smith',
    issue: 'Electrical',
    description: 'Flickering lights in living room',
    priority: 'high',
    status: 'pending',
    date: '2024-03-02',
    assignedTo: 'Not Assigned',
  },
  {
    id: '3',
    property: 'Mountain View',
    unit: 'Apt 103',
    tenant: 'Mike Johnson',
    issue: 'General',
    description: 'Broken window lock',
    priority: 'low',
    status: 'completed',
    date: '2024-02-28',
    assignedTo: 'John Smith',
  },
];

const propertyOptions = [
  'Sunset Apartments',
  'Garden Villas',
  'Mountain View',
  'Riverside Condos',
  'City Heights'
];

const unitOptions = {
  'Sunset Apartments': ['Apt 101', 'Apt 102', 'Apt 103', 'Apt 104'],
  'Garden Villas': ['Villa 201', 'Villa 202', 'Villa 203'],
  'Mountain View': ['Unit A1', 'Unit A2', 'Unit B1', 'Unit B2'],
  'Riverside Condos': ['Condo 301', 'Condo 302', 'Condo 303'],
  'City Heights': ['PH1', 'PH2', 'Apt 401', 'Apt 402']
};

const tenantOptions = {
  'Apt 101': 'John Doe',
  'Apt 102': 'Jane Smith',
  'Apt 103': 'Mike Johnson',
  'Apt 104': 'Sarah Williams',
  'Villa 201': 'Robert Brown',
  'Villa 202': 'Emily Davis',
  'Villa 203': 'David Wilson',
  'Unit A1': 'Jennifer Taylor',
  'Unit A2': 'Michael Anderson',
  'Unit B1': 'Lisa Martinez',
  'Unit B2': 'James Thompson',
  'Condo 301': 'Daniel Harris',
  'Condo 302': 'Michelle Clark',
  'Condo 303': 'Christopher Lewis',
  'PH1': 'Amanda Walker',
  'PH2': 'Matthew Hall',
  'Apt 401': 'Jessica Young',
  'Apt 402': 'Andrew Allen'
};

const issueTypes = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Appliance',
  'Structural',
  'Pest Control',
  'Landscaping',
  'Cleaning',
  'Security',
  'General'
];

const staffMembers = [
  'Mike Johnson',
  'John Smith',
  'Sarah Williams',
  'Robert Brown',
  'Not Assigned'
];

export default function Maintenance() {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('propertyId');
  const { userRole } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [isAddingRequest, setIsAddingRequest] = useState(false);
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  const [currentRequest, setCurrentRequest] = useState<MaintenanceRequest | null>(null);
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    property: 'all',
  });
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    property: '',
    unit: '',
    tenant: '',
    issue: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    assignedTo: 'Not Assigned',
  });

  // Check if we should show the form based on URL parameters
  useEffect(() => {
    if (propertyId) {
      setIsAddingRequest(true);
      
      // If propertyId is not 'all', try to pre-select the property
      if (propertyId !== 'all' && propertyOptions.includes(propertyId)) {
        setFormData(prev => ({
          ...prev,
          property: propertyId,
        }));
        
        // Update available units for this property
        const units = unitOptions[propertyId as keyof typeof unitOptions] || [];
        setAvailableUnits(units);
      }
    }
  }, [propertyId]);

  // Enhanced filtering for maintenance requests
  const filteredRequests = requests.filter(request => {
    // First apply search term filter
    const matchesSearchTerm = 
      request.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearchTerm) return false;
    
    // Then apply status filter
    if (filters.status !== 'all' && request.status !== filters.status) {
      return false;
    }
    
    // Apply priority filter
    if (filters.priority !== 'all' && request.priority !== filters.priority) {
      return false;
    }
    
    // Apply property filter
    if (filters.property !== 'all' && request.property !== filters.property) {
      return false;
    }
    
    return true;
  });

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      property: 'all',
    });
    setSearchTerm('');
  };

  // Function to refresh data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      property: '',
      unit: '',
      tenant: '',
      issue: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      assignedTo: 'Not Assigned',
    });
    setAvailableUnits([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'property') {
      // Update available units when property changes
      const units = unitOptions[value as keyof typeof unitOptions] || [];
      setAvailableUnits(units);
      setFormData({
        ...formData,
        [name]: value,
        unit: '', // Reset unit
        tenant: '', // Reset tenant
      });
    } else if (name === 'unit') {
      // Auto-fill tenant when unit is selected
      const tenant = tenantOptions[value as keyof typeof tenantOptions] || '';
      setFormData({
        ...formData,
        [name]: value,
        tenant: tenant,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddRequest = () => {
    setIsAddingRequest(true);
    setIsEditingRequest(false);
    resetForm();
  };

  const handleEditRequest = (request: MaintenanceRequest) => {
    setCurrentRequest(request);
    setFormData({
      property: request.property,
      unit: request.unit,
      tenant: request.tenant,
      issue: request.issue,
      description: request.description,
      priority: request.priority,
      status: request.status,
      date: request.date,
      assignedTo: request.assignedTo,
    });
    
    // Set available units for the selected property
    const units = unitOptions[request.property as keyof typeof unitOptions] || [];
    setAvailableUnits(units);
    
    setIsEditingRequest(true);
    setIsAddingRequest(false);
  };

  const handleDeleteRequest = (requestId: string) => {
    if (window.confirm('Are you sure you want to delete this maintenance request?')) {
      setRequests(requests.filter(request => request.id !== requestId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingRequest && currentRequest) {
      // Update existing request
      setRequests(requests.map(request => 
        request.id === currentRequest.id 
          ? { ...request, ...formData }
          : request
      ));
    } else {
      // Add new request
      const newRequest: MaintenanceRequest = {
        id: Date.now().toString(),
        ...formData as any,
      };
      setRequests([...requests, newRequest]);
    }
    
    setIsAddingRequest(false);
    setIsEditingRequest(false);
    resetForm();
  };

  const getStatusIcon = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-white" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-white" />;
      case 'pending':
        return <ExclamationTriangleIcon className="h-5 w-5 text-white" />;
      case 'cancelled':
        return <XCircleIcon className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: MaintenanceRequest['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-zim-green';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-red-600';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: MaintenanceRequest['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: MaintenanceRequest['status']) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle request approval (for property owners)
  const handleApproveRequest = (requestId: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'in_progress', assignedTo: 'Mike Johnson' } // Auto-assign to a maintenance staff
        : request
    ));
  };

  // Handle request rejection (for property owners)
  const handleRejectRequest = (requestId: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'cancelled' }
        : request
    ));
  };

  // Handle request completion (for property owners and staff)
  const handleCompleteRequest = (requestId: string) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'completed' }
        : request
    ));
  };

  // Function to view request details
  const viewRequestDetails = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
    setResolutionNote('');
  };

  // Function to close the detail modal
  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
    setResolutionNote('');
  };

  // Handle request approval with notes
  const handleApproveRequestWithNotes = () => {
    if (selectedRequest) {
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              status: 'in_progress', 
              assignedTo: 'Mike Johnson', // Auto-assign to a maintenance staff 
              notes: resolutionNote ? `[${new Date().toLocaleDateString()}] Approved with note: ${resolutionNote}` : undefined
            } 
          : request
      ));
      closeDetailModal();
    }
  };

  // Handle request completion with notes
  const handleCompleteRequestWithNotes = () => {
    if (selectedRequest) {
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              status: 'completed',
              notes: resolutionNote ? `[${new Date().toLocaleDateString()}] Completed with note: ${resolutionNote}` : undefined
            } 
          : request
      ));
      closeDetailModal();
    }
  };

  // Handle request rejection with notes
  const handleRejectRequestWithNotes = () => {
    if (selectedRequest) {
      setRequests(requests.map(request => 
        request.id === selectedRequest.id 
          ? { 
              ...request, 
              status: 'cancelled',
              notes: resolutionNote ? `[${new Date().toLocaleDateString()}] Rejected with reason: ${resolutionNote}` : undefined
            } 
          : request
      ));
      closeDetailModal();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Maintenance</h1>
          <p className="mt-1 text-sm text-gray-500">
            {userRole === 'owner' 
              ? 'Manage maintenance requests from your tenants'
              : userRole === 'tenant'
              ? 'Submit and track maintenance requests for your properties'
              : 'Track and manage all maintenance requests'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddRequest}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-zim-green to-zim-green-600 hover:from-zim-green-600 hover:to-zim-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Request
        </button>
      </div>

      {/* Maintenance Stats Dashboard - Only for Property Owners */}
      {userRole === 'owner' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Requests */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{requests.length}</p>
                    <p className="ml-2 text-sm text-gray-500">
                      across all properties
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-zim-green-50 rounded-full">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-zim-green" />
                </div>
              </div>
            </div>

            {/* Pending Requests */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-500">Pending Approval</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-red-700">
                      {requests.filter(r => r.status === 'pending').length}
                    </p>
                    <p className="ml-2 text-sm text-red-500">
                      {Math.round((requests.filter(r => r.status === 'pending').length / requests.length) * 100) || 0}% of total
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-yellow-600">In Progress</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-yellow-700">
                      {requests.filter(r => r.status === 'in_progress').length}
                    </p>
                    <p className="ml-2 text-sm text-yellow-600">
                      {Math.round((requests.filter(r => r.status === 'in_progress').length / requests.length) * 100) || 0}% of total
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-green-600">Completed</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-green-700">
                      {requests.filter(r => r.status === 'completed').length}
                    </p>
                    <p className="ml-2 text-sm text-green-600">
                      {Math.round((requests.filter(r => r.status === 'completed').length / requests.length) * 100) || 0}% of total
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* High Priority Alerts */}
          {requests.filter(r => r.priority === 'high' && r.status !== 'completed' && r.status !== 'cancelled').length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Attention Needed</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      You have {requests.filter(r => r.priority === 'high' && r.status !== 'completed' && r.status !== 'cancelled').length} high priority {requests.filter(r => r.priority === 'high' && r.status !== 'completed' && r.status !== 'cancelled').length === 1 ? 'request' : 'requests'} that {requests.filter(r => r.priority === 'high' && r.status !== 'completed' && r.status !== 'cancelled').length === 1 ? 'requires' : 'require'} your immediate attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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
                placeholder="Search maintenance requests..."
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
              <FunnelIcon className="h-4 w-4 mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <span className="text-sm text-gray-500">Found: {filteredRequests.length}</span>
            <button 
              onClick={refreshData}
              className={`p-1 rounded-full text-gray-400 hover:text-gray-500 ${loading ? 'animate-spin' : ''}`}
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-xs font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={filters.priority}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green text-sm"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
                  {propertyOptions.map(property => (
                    <option key={property} value={property}>{property}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-3 flex justify-end">
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

      {/* Add/Edit Request Form */}
      {(isAddingRequest || isEditingRequest) && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-zim-green">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {isEditingRequest ? 'Edit Maintenance Request' : 'New Maintenance Request'}
            </h2>
            <button
              onClick={() => {
                setIsAddingRequest(false);
                setIsEditingRequest(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="property" className="block text-sm font-medium text-gray-700">
                  Property
                </label>
                <div className="mt-1">
                  <select
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    <option value="">Select property</option>
                    {propertyOptions.map(property => (
                      <option key={property} value={property}>{property}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                  Unit
                </label>
                <div className="mt-1">
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.property}
                    className="input disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select unit</option>
                    {availableUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="tenant" className="block text-sm font-medium text-gray-700">
                  Tenant
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="tenant"
                    id="tenant"
                    required
                    value={formData.tenant}
                    onChange={handleInputChange}
                    className="input"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700">
                  Issue Type
                </label>
                <div className="mt-1">
                  <select
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    <option value="">Select issue type</option>
                    {issueTypes.map(issue => (
                      <option key={issue} value={issue}>{issue}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <div className="mt-1">
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="Describe the maintenance issue..."
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date Reported
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                  Assigned To
                </label>
                <div className="mt-1">
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    {staffMembers.map(staff => (
                      <option key={staff} value={staff}>{staff}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="mt-1">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingRequest(false);
                  setIsEditingRequest(false);
                }}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                {isEditingRequest ? 'Update Request' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Role-Specific Maintenance Requests Display */}
      {!isAddingRequest && !isEditingRequest && (
        <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
          {userRole === 'owner' ? (
            <div className="divide-y divide-gray-200">
              {/* Header with Zimbabwe flag colors */}
              <div className="h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              
              {/* Owner-specific request list */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zim-green"></div>
                </div>
              ) : filteredRequests.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-zim-green-50 p-2 rounded-full">
                              <WrenchScrewdriverIcon className="h-8 w-8 text-zim-green" />
                            </div>
                            <div className="ml-4">
                              <h3 className="text-lg font-medium text-gray-900">{request.issue}</h3>
                              <p className="mt-1 text-sm text-gray-500">{request.description}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500">PROPERTY & UNIT</h4>
                              <div className="mt-1 flex items-center">
                                <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm font-medium text-gray-900">
                                  {request.property} - {request.unit}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-medium text-gray-500">TENANT</h4>
                              <div className="mt-1 flex items-center">
                                <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm font-medium text-gray-900">
                                  {request.tenant}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-medium text-gray-500">REPORTED ON</h4>
                              <div className="mt-1 flex items-center">
                                <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                                <span className="text-sm font-medium text-gray-900">
                                  {new Date(request.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                            </span>
                            
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              request.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : request.status === 'in_progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : request.status === 'pending'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              <span className="mr-1">
                                {request.status === 'completed' ? (
                                  <CheckCircleIcon className="h-3 w-3 text-green-600" />
                                ) : request.status === 'in_progress' ? (
                                  <ClockIcon className="h-3 w-3 text-yellow-600" />
                                ) : request.status === 'pending' ? (
                                  <ExclamationTriangleIcon className="h-3 w-3 text-red-600" />
                                ) : (
                                  <XCircleIcon className="h-3 w-3 text-gray-600" />
                                )}
                              </span>
                              {getStatusText(request.status)}
                            </span>
                            
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <UserCircleIcon className="h-3 w-3 text-gray-600 mr-1" />
                              {request.assignedTo}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action buttons for property owners */}
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => viewRequestDetails(request)}
                            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                          >
                            <EyeIcon className="h-4 w-4 mr-1" />
                            View Details
                          </button>
                          
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApproveRequest(request.id)}
                                className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                              >
                                <CheckCircleIcon className="h-4 w-4 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectRequest(request.id)}
                                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <XMarkIcon className="h-4 w-4 mr-1" />
                                Reject
                              </button>
                            </>
                          )}
                          
                          {request.status === 'in_progress' && (
                            <button
                              onClick={() => handleCompleteRequest(request.id)}
                              className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || filters.status !== 'all' || filters.property !== 'all' || filters.priority !== 'all' 
                      ? 'Try adjusting your search or filters to find what you are looking for.'
                      : 'Your tenants haven\'t submitted any maintenance requests yet.'}
                  </p>
                  <div className="mt-6">
                    {searchTerm || filters.status !== 'all' || filters.property !== 'all' || filters.priority !== 'all' ? (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                      >
                        Clear Filters
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // For tenant and admin roles, keep the existing table view
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* Zimbabwe flag colors as thin stripes on top of the header */}
                  <th colSpan={6} className="h-1 p-0">
                    <div className="flex h-1">
                      <div className="flex-1 bg-zim-green"></div>
                      <div className="flex-1 bg-yellow-500"></div>
                      <div className="flex-1 bg-red-600"></div>
                      <div className="flex-1 bg-black"></div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Request Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Issue
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Assigned To
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
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-zim-green-50 p-2 rounded-full">
                            <WrenchScrewdriverIcon className="h-8 w-8 text-zim-green" />
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {request.property}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                              {request.unit} - {request.tenant}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                              {new Date(request.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{request.issue}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {request.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getPriorityColor(
                            request.priority
                          )}`}
                        >
                          {request.priority.charAt(0).toUpperCase() +
                            request.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-6 w-6 rounded-full ${getStatusColor(request.status)} flex items-center justify-center mr-2`}>
                            {getStatusIcon(request.status)}
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              request.status === 'completed'
                                ? 'text-green-700'
                                : request.status === 'in_progress'
                                ? 'text-yellow-700'
                                : request.status === 'pending'
                                ? 'text-red-700'
                                : 'text-gray-700'
                            }`}
                          >
                            {getStatusText(request.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full p-1 mr-2">
                            <UserCircleIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <span className="text-sm text-gray-900">
                            {request.assignedTo}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => handleEditRequest(request)}
                            className="text-zim-green hover:text-zim-green-dark p-1 rounded-md hover:bg-gray-100"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRequest(request.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-gray-100"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search.' : 'Create your first maintenance request to get started.'}
                      </p>
                      {searchTerm ? (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                        >
                          Clear search
                        </button>
                      ) : (
                        <button
                          onClick={handleAddRequest}
                          className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                        >
                          <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                          Create a request
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Maintenance Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeDetailModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={closeDetailModal}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                    selectedRequest.priority === 'high' 
                      ? 'bg-red-100' 
                      : selectedRequest.priority === 'medium'
                      ? 'bg-yellow-100'
                      : 'bg-green-100'
                  }`}>
                    <WrenchScrewdriverIcon 
                      className={`h-6 w-6 ${
                        selectedRequest.priority === 'high' 
                          ? 'text-red-600' 
                          : selectedRequest.priority === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`} 
                      aria-hidden="true" 
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Maintenance Request Details
                    </h3>
                    
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Issue Type</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedRequest.issue}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Description</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedRequest.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Property</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedRequest.property}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Unit</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedRequest.unit}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Tenant</h4>
                          <p className="mt-1 text-sm text-gray-900">{selectedRequest.tenant}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                          <p className="mt-1 text-sm text-gray-900">{new Date(selectedRequest.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                          <p className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                              {selectedRequest.priority.charAt(0).toUpperCase() + selectedRequest.priority.slice(1)}
                            </span>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Status</h4>
                          <p className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              selectedRequest.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : selectedRequest.status === 'in_progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : selectedRequest.status === 'pending'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {getStatusText(selectedRequest.status)}
                            </span>
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
                        <p className="mt-1 text-sm text-gray-900">{selectedRequest.assignedTo}</p>
                      </div>
                      
                      {userRole === 'owner' && ['pending', 'in_progress'].includes(selectedRequest.status) && (
                        <div>
                          <label htmlFor="resolution-note" className="block text-sm font-medium text-gray-700">
                            {selectedRequest.status === 'pending' ? 'Approval/Rejection Note' : 'Resolution Note'}
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="resolution-note"
                              name="resolution-note"
                              rows={3}
                              className="shadow-sm block w-full focus:ring-zim-green focus:border-zim-green sm:text-sm border border-gray-300 rounded-md"
                              placeholder={selectedRequest.status === 'pending' 
                                ? "Add notes for the maintenance team..." 
                                : "Add resolution details..."}
                              value={resolutionNote}
                              onChange={(e) => setResolutionNote(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zim-green text-base font-medium text-white hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleApproveRequestWithNotes}
                    >
                      Approve Request
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleRejectRequestWithNotes}
                    >
                      Reject Request
                    </button>
                  </>
                )}
                
                {selectedRequest.status === 'in_progress' && (
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleCompleteRequestWithNotes}
                  >
                    Mark as Completed
                  </button>
                )}
                
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeDetailModal}
                >
                  {['completed', 'cancelled'].includes(selectedRequest.status) ? 'Close' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 