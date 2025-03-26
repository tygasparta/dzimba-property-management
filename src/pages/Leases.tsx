import React, { useState } from 'react';
import {
  DocumentTextIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ArrowPathIcon,
  UserIcon,
  HomeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface Lease {
  id: string;
  tenant: string;
  unit: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  deposit: number;
  status: 'active' | 'expired' | 'terminated';
  type: 'monthly' | 'quarterly' | 'yearly';
  notes?: string;
}

const mockLeases: Lease[] = [
  {
    id: '1',
    tenant: 'John Doe',
    unit: 'Apt 101',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rentAmount: 850,
    deposit: 850,
    status: 'active',
    type: 'monthly',
    notes: 'Tenant maintains good payment history',
  },
  {
    id: '2',
    tenant: 'Jane Smith',
    unit: 'Apt 102',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    rentAmount: 950,
    deposit: 950,
    status: 'active',
    type: 'monthly',
    notes: 'Includes parking space #12',
  },
  {
    id: '3',
    tenant: 'Mike Johnson',
    unit: 'Apt 103',
    startDate: '2023-12-01',
    endDate: '2024-11-30',
    rentAmount: 750,
    deposit: 750,
    status: 'expired',
    type: 'monthly',
    notes: 'Renewal notice sent on 2024-10-15',
  },
];

const tenantOptions = [
  {name: 'John Doe', unit: 'Apt 101', rentAmount: 850},
  {name: 'Jane Smith', unit: 'Apt 102', rentAmount: 950},
  {name: 'Mike Johnson', unit: 'Apt 103', rentAmount: 750},
  {name: 'Sarah Williams', unit: 'Apt 104', rentAmount: 800},
  {name: 'Robert Brown', unit: 'House 1', rentAmount: 1200},
  {name: 'Emily Davis', unit: 'Villa 201', rentAmount: 1100},
  {name: 'David Wilson', unit: 'Villa 202', rentAmount: 1150},
];

const leaseTypeOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

export default function Leases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leases, setLeases] = useState<Lease[]>(mockLeases);
  const [isAddingLease, setIsAddingLease] = useState(false);
  const [isEditingLease, setIsEditingLease] = useState(false);
  const [currentLease, setCurrentLease] = useState<Lease | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    tenant: '',
    unit: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    rentAmount: 0,
    deposit: 0,
    status: 'active',
    type: 'monthly',
    notes: '',
  });

  const filteredLeases = leases.filter(
    (lease) =>
      lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      tenant: '',
      unit: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      rentAmount: 0,
      deposit: 0,
      status: 'active',
      type: 'monthly',
      notes: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'tenant') {
      // Auto-fill unit and rent amount based on selected tenant
      const selectedTenant = tenantOptions.find(t => t.name === value);
      if (selectedTenant) {
        setFormData({
          ...formData,
          tenant: value,
          unit: selectedTenant.unit,
          rentAmount: selectedTenant.rentAmount,
          deposit: selectedTenant.rentAmount, // Default deposit to rent amount
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === 'rentAmount') {
      const rentAmount = parseInt(value) || 0;
      setFormData({
        ...formData,
        rentAmount: rentAmount,
        deposit: rentAmount, // Default deposit to rent amount
      });
    } else if (name === 'startDate') {
      // Calculate end date based on lease type
      let endDate = new Date(value);
      if (formData.type === 'monthly') {
        endDate.setFullYear(endDate.getFullYear() + 1); // Default to 12 months
      } else if (formData.type === 'quarterly') {
        endDate.setMonth(endDate.getMonth() + 3);
      } else if (formData.type === 'yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }
      
      setFormData({
        ...formData,
        startDate: value,
        endDate: endDate.toISOString().split('T')[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: ['rentAmount', 'deposit'].includes(name) ? (parseInt(value) || 0) : value,
      });
    }
  };

  const handleAddLease = () => {
    setIsAddingLease(true);
    setIsEditingLease(false);
    resetForm();
  };

  const handleEditLease = (lease: Lease) => {
    setCurrentLease(lease);
    setFormData({
      tenant: lease.tenant,
      unit: lease.unit,
      startDate: lease.startDate,
      endDate: lease.endDate,
      rentAmount: lease.rentAmount,
      deposit: lease.deposit,
      status: lease.status,
      type: lease.type,
      notes: lease.notes || '',
    });
    setIsEditingLease(true);
    setIsAddingLease(false);
  };

  const handleDeleteLease = (leaseId: string) => {
    if (window.confirm('Are you sure you want to delete this lease?')) {
      setLeases(leases.filter(lease => lease.id !== leaseId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingLease && currentLease) {
      // Update existing lease
      setLeases(leases.map(lease => 
        lease.id === currentLease.id 
          ? { ...lease, ...formData }
          : lease
      ));
    } else {
      // Add new lease
      const newLease: Lease = {
        id: Date.now().toString(),
        ...formData as any,
      };
      setLeases([...leases, newLease]);
    }
    
    setIsAddingLease(false);
    setIsEditingLease(false);
    resetForm();
  };

  const getStatusIcon = (status: Lease['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-white" />;
      case 'expired':
        return <ClockIcon className="h-5 w-5 text-white" />;
      case 'terminated':
        return <XCircleIcon className="h-5 w-5 text-white" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Lease['status']) => {
    switch (status) {
      case 'active':
        return 'bg-zim-green';
      case 'expired':
        return 'bg-yellow-500';
      case 'terminated':
        return 'bg-red-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getLeasePeriod = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (monthsDiff === 12) {
      return '1 year';
    } else if (monthsDiff < 12) {
      return `${monthsDiff} months`;
    } else {
      const years = Math.floor(monthsDiff / 12);
      const months = monthsDiff % 12;
      return months > 0 ? `${years} year${years > 1 ? 's' : ''}, ${months} month${months > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leases</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage lease agreements and terms
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddLease}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-zim-green to-zim-green-600 hover:from-zim-green-600 hover:to-zim-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New Lease
        </button>
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
                placeholder="Search leases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Total: {leases.length}</span>
            <button 
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Lease Form */}
      {(isAddingLease || isEditingLease) && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-zim-green">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {isEditingLease ? 'Edit Lease Agreement' : 'New Lease Agreement'}
            </h2>
            <button
              onClick={() => {
                setIsAddingLease(false);
                setIsEditingLease(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="tenant" className="block text-sm font-medium text-gray-700">
                  Tenant
                </label>
                <div className="mt-1">
                  <select
                    id="tenant"
                    name="tenant"
                    value={formData.tenant}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    <option value="">Select a tenant</option>
                    {tenantOptions.map(tenant => (
                      <option key={tenant.name} value={tenant.name}>{tenant.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                  Unit
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    required
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="input"
                    readOnly={!!formData.tenant}
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Lease Type
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    {leaseTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
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
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                    <option value="terminated">Terminated</option>
                  </select>
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
              
              <div className="sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
                  Security Deposit
                </label>
                <div className="mt-1">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="deposit"
                      id="deposit"
                      min="0"
                      required
                      value={formData.deposit}
                      onChange={handleInputChange}
                      className="input pl-7"
                    />
                  </div>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Add any additional notes about this lease agreement"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsAddingLease(false);
                  setIsEditingLease(false);
                }}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                {isEditingLease ? 'Update Lease' : 'Create Lease'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Leases Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
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
                Lease Details
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Period
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
                Type
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
            {filteredLeases.length > 0 ? (
              filteredLeases.map((lease) => (
                <tr key={lease.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-zim-green-50 p-2 rounded-full">
                        <DocumentTextIcon className="h-8 w-8 text-zim-green" />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {lease.tenant}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <HomeIcon className="h-4 w-4 text-gray-400 mr-1" />
                          {lease.unit}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <div>
                        <div>
                          {new Date(lease.startDate).toLocaleDateString()} -{' '}
                          {new Date(lease.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Duration: {getLeasePeriod(lease.startDate, lease.endDate)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-zim-green-50 rounded-full p-1 mr-2">
                        <CurrencyDollarIcon className="h-5 w-5 text-zim-green" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          ${lease.rentAmount}
                        </div>
                        <div className="text-xs text-gray-500">
                          Deposit: ${lease.deposit}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                      {lease.type.charAt(0).toUpperCase() + lease.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full ${getStatusColor(lease.status)} flex items-center justify-center mr-2`}>
                        {getStatusIcon(lease.status)}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          lease.status === 'active'
                            ? 'text-green-700'
                            : lease.status === 'expired'
                            ? 'text-yellow-700'
                            : 'text-red-700'
                        }`}
                      >
                        {lease.status.charAt(0).toUpperCase() +
                          lease.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEditLease(lease)}
                        className="text-zim-green hover:text-zim-green-dark p-1 rounded-md hover:bg-gray-100"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLease(lease.id)}
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
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No leases found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm ? 'Try adjusting your search.' : 'Create your first lease to get started.'}
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
                      onClick={handleAddLease}
                      className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                    >
                      <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                      Create a lease
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 