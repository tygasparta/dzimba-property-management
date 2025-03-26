import React, { useState, Fragment } from 'react';
import {
  UserGroupIcon,
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentDuplicateIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: 'active' | 'pending' | 'past';
}

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+263 77 123 4567',
    unit: 'Apt 101',
    leaseStart: '2024-01-01',
    leaseEnd: '2024-12-31',
    rentAmount: 850,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+263 77 234 5678',
    unit: 'Apt 102',
    leaseStart: '2024-02-01',
    leaseEnd: '2025-01-31',
    rentAmount: 950,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+263 77 345 6789',
    unit: 'Apt 103',
    leaseStart: '2023-12-01',
    leaseEnd: '2024-11-30',
    rentAmount: 750,
    status: 'pending',
  },
];

export default function Tenants() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [isAddingTenant, setIsAddingTenant] = useState(false);
  const [isEditingTenant, setIsEditingTenant] = useState(false);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    unit: '',
    leaseStart: '',
    leaseEnd: '',
    rentAmount: 0,
    status: 'pending',
  });

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-zim-green text-white' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-500 text-white' },
    { value: 'past', label: 'Past', color: 'bg-red-600 text-white' },
  ];

  const unitOptions = [
    'Apt 101', 
    'Apt 102', 
    'Apt 103', 
    'Apt 104', 
    'Apt 201', 
    'Apt 202', 
    'Apt 203',
    'House 1',
    'House 2',
    'Office 1'
  ];

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone.includes(searchTerm) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      unit: '',
      leaseStart: '',
      leaseEnd: '',
      rentAmount: 0,
      status: 'pending',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'rentAmount') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddTenant = () => {
    setIsAddingTenant(true);
    setIsEditingTenant(false);
    resetForm();
  };

  const handleEditTenant = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    setFormData({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      unit: tenant.unit,
      leaseStart: tenant.leaseStart,
      leaseEnd: tenant.leaseEnd,
      rentAmount: tenant.rentAmount,
      status: tenant.status,
    });
    setIsEditingTenant(true);
    setIsAddingTenant(false);
  };

  const handleDeleteTenant = (tenantId: string) => {
    if (window.confirm('Are you sure you want to delete this tenant?')) {
      setTenants(tenants.filter(tenant => tenant.id !== tenantId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingTenant && currentTenant) {
      // Update existing tenant
      setTenants(tenants.map(tenant => 
        tenant.id === currentTenant.id 
          ? { ...tenant, ...formData }
          : tenant
      ));
    } else {
      // Add new tenant
      const newTenant: Tenant = {
        id: Date.now().toString(),
        ...formData as any,
      };
      setTenants([...tenants, newTenant]);
    }
    
    setIsAddingTenant(false);
    setIsEditingTenant(false);
    resetForm();
  };

  const getStatusIcon = (status: Tenant['status']) => {
    switch (status) {
      case 'active':
        return <CheckIcon className="h-4 w-4 text-white" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-white" />;
      case 'past':
        return <ExclamationTriangleIcon className="h-4 w-4 text-white" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Tenant['status']) => {
    switch (status) {
      case 'active':
        return 'bg-zim-green';
      case 'pending':
        return 'bg-yellow-500';
      case 'past':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getAvatarColor = (id: string) => {
    const colors = ['bg-zim-green', 'bg-yellow-500', 'bg-red-600', 'bg-purple-500', 'bg-blue-500'];
    const hash = id.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  // Calculate tenant statistics
  const getStats = () => {
    const activeCount = tenants.filter(t => t.status === 'active').length;
    const pendingCount = tenants.filter(t => t.status === 'pending').length;
    const pastCount = tenants.filter(t => t.status === 'past').length;
    
    const totalRent = tenants
      .filter(t => t.status === 'active')
      .reduce((sum, tenant) => sum + tenant.rentAmount, 0);

    // Get upcoming lease renewals (leases ending in the next 30 days)
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    
    const upcomingRenewals = tenants.filter(tenant => {
      const leaseEndDate = new Date(tenant.leaseEnd);
      return leaseEndDate >= now && leaseEndDate <= thirtyDaysFromNow;
    }).length;

    return {
      active: activeCount,
      pending: pendingCount,
      past: pastCount,
      totalRent,
      upcomingRenewals,
      occupancyRate: tenants.length > 0 
        ? Math.round((activeCount / tenants.length) * 100) 
        : 0
    };
  };

  const stats = getStats();

  // Function to handle closing the tenant details modal
  const closeDetails = () => {
    setSelectedTenant(null);
  };

  // Function to calculate lease progress
  const calculateLeaseProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    
    // If lease hasn't started yet
    if (now < start) return 0;
    
    // If lease has ended
    if (now > end) return 100;
    
    // Calculate progress
    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  // Function to calculate days remaining in lease
  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tenants</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your tenants and their information
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 ${viewMode === 'table' ? 'bg-zim-green text-white' : 'bg-white text-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 ${viewMode === 'grid' ? 'bg-zim-green text-white' : 'bg-white text-gray-700'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddTenant}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-zim-green to-zim-green-600 hover:from-zim-green-600 hover:to-zim-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Tenant
          </button>
        </div>
      </div>

      {/* Tenant Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Tenants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-green-100">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Tenants</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.active}</p>
              <p className="mt-1 text-sm text-gray-500">
                <span className={stats.active > 0 ? "text-green-600" : "text-gray-500"}>
                  {stats.occupancyRate}% occupancy
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Total Monthly Rent */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-blue-100">
              <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${stats.totalRent}</p>
              <p className="mt-1 text-sm text-gray-500">
                From {stats.active} active {stats.active === 1 ? 'tenant' : 'tenants'}
              </p>
            </div>
          </div>
        </div>

        {/* Pending Tenants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Applications</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.pending}</p>
              <p className="mt-1 text-sm text-gray-500">
                Awaiting approval
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-3 rounded-md bg-purple-100">
              <CalendarIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Upcoming Renewals</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.upcomingRenewals}</p>
              <p className="mt-1 text-sm text-gray-500">
                In the next 30 days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-lg">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-zim-green focus:border-zim-green sm:text-sm"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Total: {tenants.length}</span>
            <button 
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Tenant Form */}
      {(isAddingTenant || isEditingTenant) && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-zim-green">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {isEditingTenant ? 'Edit Tenant' : 'Add New Tenant'}
            </h2>
            <button
              onClick={() => {
                setIsAddingTenant(false);
                setIsEditingTenant(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                  Unit / Property
                </label>
                <div className="mt-1">
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="">Select a unit</option>
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="leaseStart" className="block text-sm font-medium text-gray-700">
                  Lease Start
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="leaseStart"
                    id="leaseStart"
                    required
                    value={formData.leaseStart}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="leaseEnd" className="block text-sm font-medium text-gray-700">
                  Lease End
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="leaseEnd"
                    id="leaseEnd"
                    required
                    value={formData.leaseEnd}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
                  Monthly Rent
                </label>
                <div className="mt-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="rentAmount"
                      id="rentAmount"
                      min="0"
                      required
                      value={formData.rentAmount}
                      onChange={handleInputChange}
                      className="input pl-7"
                    />
                  </div>
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
                    className="input"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingTenant(false);
                  setIsEditingTenant(false);
                }}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                {isEditingTenant ? 'Update Tenant' : 'Add Tenant'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tenants Table */}
      {viewMode === 'table' ? (
        <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tenant
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unit
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Lease Period
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rent
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
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getAvatarColor(tenant.id)} flex items-center justify-center text-white font-bold`}>
                          {tenant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {tenant.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.email}</div>
                      <div className="text-sm text-gray-500">{tenant.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(tenant.leaseStart).toLocaleDateString()} -{' '}
                        {new Date(tenant.leaseEnd).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${tenant.rentAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full ${getStatusColor(tenant.status)} flex items-center justify-center mr-2`}>
                          {getStatusIcon(tenant.status)}
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            tenant.status === 'active'
                              ? 'text-green-700'
                              : tenant.status === 'pending'
                              ? 'text-yellow-700'
                              : 'text-red-700'
                          }`}
                        >
                          {tenant.status.charAt(0).toUpperCase() +
                            tenant.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditTenant(tenant)}
                          className="text-zim-green hover:text-zim-green-dark p-1 rounded-md hover:bg-gray-100"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTenant(tenant.id)}
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
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tenants found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? 'Try adjusting your search.' : 'Add your first tenant to get started.'}
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
                        onClick={handleAddTenant}
                        className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                      >
                        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                        Add a tenant
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant) => (
              <div 
                key={tenant.id} 
                className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${getAvatarColor(tenant.id)} flex items-center justify-center text-white font-bold`}>
                        {tenant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">{tenant.name}</h3>
                        <div className="flex items-center mt-1">
                          <div className={`h-2.5 w-2.5 rounded-full mr-1.5 ${
                            tenant.status === 'active' ? 'bg-green-500' : 
                            tenant.status === 'pending' ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}></div>
                          <p className="text-xs text-gray-500 capitalize">{tenant.status}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() => handleEditTenant(tenant)}
                        className="text-zim-green hover:text-zim-green-dark p-1 rounded-md hover:bg-gray-100"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTenant(tenant.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-gray-100"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <p className="text-gray-500">Unit</p>
                      <p className="font-medium text-gray-900">{tenant.unit}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rent</p>
                      <p className="font-medium text-gray-900">${tenant.rentAmount}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{tenant.email}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-gray-600">{tenant.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">
                        {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <button 
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-zim-green bg-white hover:bg-zim-green-50 shadow-sm border-zim-green transition-colors"
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <DocumentTextIcon className="h-4 w-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 bg-white rounded-lg shadow p-8 text-center">
              <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tenants found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? 'Try adjusting your search.' : 'Add your first tenant to get started.'}
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
                  onClick={handleAddTenant}
                  className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                  Add a tenant
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tenant Detail Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeDetails}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Tenant Details
                      </h3>
                      <button
                        onClick={closeDetails}
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                      {/* Tenant Info Column */}
                      <div className="col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 flex items-center space-x-4">
                          <div className={`h-12 w-12 rounded-full ${getAvatarColor(selectedTenant.id)} flex items-center justify-center text-white font-bold text-lg`}>
                            {selectedTenant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{selectedTenant.name}</h3>
                            <div className="flex items-center mt-1">
                              <div className={`h-2.5 w-2.5 rounded-full mr-1.5 ${
                                selectedTenant.status === 'active' ? 'bg-green-500' : 
                                selectedTenant.status === 'pending' ? 'bg-yellow-500' : 
                                'bg-red-500'
                              }`}></div>
                              <p className="text-sm text-gray-500 capitalize">{selectedTenant.status}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                          <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 flex justify-between sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Email</dt>
                              <dd className="text-sm text-gray-900 flex items-center">
                                {selectedTenant.email}
                                <button className="ml-2 text-zim-green hover:text-zim-green-dark">
                                  <EnvelopeIcon className="h-4 w-4" />
                                </button>
                              </dd>
                            </div>
                            <div className="py-3 flex justify-between sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Phone</dt>
                              <dd className="text-sm text-gray-900 flex items-center">
                                {selectedTenant.phone}
                                <button className="ml-2 text-zim-green hover:text-zim-green-dark">
                                  <PhoneIcon className="h-4 w-4" />
                                </button>
                              </dd>
                            </div>
                            <div className="py-3 flex justify-between sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Unit</dt>
                              <dd className="text-sm text-gray-900">{selectedTenant.unit}</dd>
                            </div>
                            <div className="py-3 flex justify-between sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">Rent Amount</dt>
                              <dd className="text-sm text-gray-900 font-semibold">${selectedTenant.rentAmount}/month</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <div className="px-4 py-4 border-t border-gray-200 flex space-x-2">
                          <button 
                            className="flex-1 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            onClick={() => handleEditTenant(selectedTenant)}
                          >
                            <PencilIcon className="h-4 w-4 inline-block mr-1" />
                            Edit
                          </button>
                          <button 
                            className="flex-1 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            onClick={() => {
                              closeDetails();
                              handleDeleteTenant(selectedTenant.id);
                            }}
                          >
                            <TrashIcon className="h-4 w-4 inline-block mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {/* Lease Info Column */}
                      <div className="col-span-2 space-y-4">
                        {/* Lease Card */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-700">Lease Information</h3>
                            <button className="text-xs text-zim-green hover:text-zim-green-dark flex items-center">
                              <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                              View Lease Document
                            </button>
                          </div>
                          <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-gray-500">Lease Start</p>
                                <p className="text-sm font-medium">
                                  {new Date(selectedTenant.leaseStart).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Lease End</p>
                                <p className="text-sm font-medium">
                                  {new Date(selectedTenant.leaseEnd).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            
                            <div className="mb-2">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Lease Progress</span>
                                <span>{calculateLeaseProgress(selectedTenant.leaseStart, selectedTenant.leaseEnd)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-zim-green h-2 rounded-full" 
                                  style={{ width: `${calculateLeaseProgress(selectedTenant.leaseStart, selectedTenant.leaseEnd)}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 p-3 bg-blue-50 rounded-md">
                              <div>
                                <p className="text-sm font-medium text-blue-800">Days Remaining</p>
                                <p className="text-xs text-blue-600">Until lease expiration</p>
                              </div>
                              <div className="text-2xl font-bold text-blue-700">
                                {calculateDaysRemaining(selectedTenant.leaseEnd)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50">
                            <CurrencyDollarIcon className="h-6 w-6 text-green-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Payment History</span>
                          </button>
                          <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50">
                            <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600 mb-2" />
                            <span className="text-sm font-medium text-gray-700">Send Message</span>
                          </button>
                        </div>
                        
                        {/* Activity Timeline */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                            <h3 className="text-sm font-medium text-gray-700">Recent Activity</h3>
                          </div>
                          <div className="p-4">
                            <ul className="space-y-3">
                              <li className="relative pl-5 pb-3 border-l-2 border-gray-200">
                                <div className="absolute -left-1.5 mt-1.5">
                                  <div className="h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                                </div>
                                <p className="text-xs text-gray-500">Yesterday</p>
                                <p className="text-sm text-gray-700">Rent payment of ${selectedTenant.rentAmount} received</p>
                              </li>
                              <li className="relative pl-5 pb-3 border-l-2 border-gray-200">
                                <div className="absolute -left-1.5 mt-1.5">
                                  <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                                </div>
                                <p className="text-xs text-gray-500">Apr 12, 2024</p>
                                <p className="text-sm text-gray-700">Maintenance request submitted</p>
                              </li>
                              <li className="relative pl-5">
                                <div className="absolute -left-1.5 mt-1.5">
                                  <div className="h-3 w-3 rounded-full bg-purple-500 border-2 border-white"></div>
                                </div>
                                <p className="text-xs text-gray-500">Mar 1, 2024</p>
                                <p className="text-sm text-gray-700">Lease agreement signed</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 