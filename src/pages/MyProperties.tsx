import React, { useState, useEffect } from 'react';
import {
  HomeIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  CalendarIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  DocumentTextIcon,
  PhotoIcon,
  ArrowPathIcon,
  KeyIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

// Types
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
  landlordPhone?: string;
  amenities?: string[];
  image?: string;
  utilityInfo?: {
    water: boolean;
    electricity: boolean;
    internet: boolean;
    heating: boolean;
  };
  nextPaymentDue?: string;
  leaseDocuments?: {
    name: string;
    url: string;
  }[];
}

interface MaintenanceRequest {
  id: string;
  propertyId: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  dateSubmitted: string;
}

export default function MyProperties() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
      landlordPhone: '+263 242 123 4567',
      amenities: ['Swimming Pool', 'Gym', 'Security', '24/7 Power Backup'],
      image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3',
      utilityInfo: {
        water: true,
        electricity: false,
        internet: false,
        heating: true
      },
      nextPaymentDue: '2023-11-01',
      leaseDocuments: [
        { name: 'Lease Agreement', url: '#' },
        { name: 'House Rules', url: '#' }
      ]
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
      landlordPhone: '+263 242 987 6543',
      amenities: ['Parking', 'Garden', 'Security'],
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3',
      utilityInfo: {
        water: true,
        electricity: true,
        internet: true,
        heating: false
      },
      nextPaymentDue: '2023-11-01',
      leaseDocuments: [
        { name: 'Lease Agreement', url: '#' }
      ]
    }
  ]);

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '1',
      propertyId: '1',
      issue: 'Leaking bathroom faucet',
      status: 'in-progress',
      dateSubmitted: '2023-10-20',
    },
    {
      id: '2',
      propertyId: '1',
      issue: 'Light fixture not working in kitchen',
      status: 'completed',
      dateSubmitted: '2023-10-15',
    }
  ]);

  // New state variables for UI functionality
  const [expandedLandlords, setExpandedLandlords] = useState<string[]>([]);
  const [expandedDocuments, setExpandedDocuments] = useState<string[]>([]);
  const [expandedMaintenanceRequests, setExpandedMaintenanceRequests] = useState<string[]>([]);
  const [showUtilityInfo, setShowUtilityInfo] = useState(true);

  // Get maintenance requests count for a property
  const getMaintenanceRequestsCount = (propertyId: string) => {
    return maintenanceRequests.filter(request => request.propertyId === propertyId).length;
  };

  // Calculate days remaining on lease
  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle refresh data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // Calculate lease progress percentage
  const calculateLeaseProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const totalDuration = end - start;
    const elapsed = now - start;
    
    return Math.round((elapsed / totalDuration) * 100);
  };

  // Toggle utility status
  const toggleUtility = (propertyId: string, utilityType: keyof TenantProperty['utilityInfo']) => {
    setTenantProperties(prevProperties => 
      prevProperties.map(property => {
        if (property.id === propertyId && property.utilityInfo) {
          return {
            ...property,
            utilityInfo: {
              ...property.utilityInfo,
              [utilityType]: !property.utilityInfo[utilityType]
            }
          };
        }
        return property;
      })
    );
  };

  // Toggle expanded sections
  const toggleLandlordDetails = (propertyId: string) => {
    setExpandedLandlords(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  };

  const toggleDocuments = (propertyId: string) => {
    setExpandedDocuments(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  };

  const toggleMaintenanceRequests = (propertyId: string) => {
    setExpandedMaintenanceRequests(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  };

  // Function to download document
  const downloadDocument = (document: { name: string, url: string }) => {
    alert(`Downloading ${document.name}... (This would be a real download in production)`);
  };

  // Helper functions for maintenance requests and payments
  const handleMaintenanceRequest = (propertyId: string) => {
    navigate(`/tenant-dashboard/maintenance/new?propertyId=${propertyId}`);
  };

  const handleRentPayment = (property: TenantProperty) => {
    navigate(`/tenant-dashboard/payments/new?propertyId=${property.id}&amount=${property.rentAmount}`);
  };

  // Utility icons
  const getUtilityIcon = (type: keyof TenantProperty['utilityInfo']) => {
    switch (type) {
      case 'water':
        return <span className="text-blue-500">💧</span>;
      case 'electricity':
        return <span className="text-yellow-500">⚡</span>;
      case 'internet':
        return <span className="text-blue-600">🌐</span>;
      case 'heating':
        return <span className="text-red-500">🔥</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Properties</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your rental properties
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          onClick={refreshData}
        >
          <ArrowPathIcon className={`-ml-1 mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* Properties List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tenantProperties.map(property => (
          <div key={property.id} className="bg-white shadow rounded-lg overflow-hidden">
            {/* Property Header with Image */}
            <div className="relative h-48 bg-gray-200">
              {property.image ? (
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <PhotoIcon className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-xl font-bold">{property.name}</h2>
                <div className="flex items-center text-sm mt-1">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {property.address}
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  property.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : property.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {property.status === 'active' && (
                    <span className="h-2 w-2 mr-1 rounded-full bg-green-400"></span>
                  )}
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </span>
              </div>
            </div>
            
            {/* Property Details */}
            <div className="p-4">
              {/* Unit & Rent */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex-1 min-w-[120px] bg-gray-50 rounded-md p-3">
                  <p className="text-sm font-medium text-gray-500">Unit</p>
                  <div className="flex items-center mt-1">
                    <KeyIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-base font-semibold text-gray-900">{property.unit}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-[120px] bg-gray-50 rounded-md p-3">
                  <p className="text-sm font-medium text-gray-500">Rent</p>
                  <div className="flex items-center mt-1">
                    <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-base font-semibold text-gray-900">${property.rentAmount}/month</p>
                  </div>
                </div>
              </div>
              
              {/* Lease Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-gray-500">Lease Progress</p>
                  <span className="text-xs text-gray-500">
                    {formatDate(property.leaseStart)} - {formatDate(property.leaseEnd)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-zim-green h-2.5 rounded-full" 
                    style={{ width: `${calculateLeaseProgress(property.leaseStart, property.leaseEnd)}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-xs text-gray-500 flex justify-end">
                  {getDaysRemaining(property.leaseEnd) > 0 ? (
                    <span>{getDaysRemaining(property.leaseEnd)} days remaining</span>
                  ) : (
                    <span className="text-red-500">Lease expired</span>
                  )}
                </div>
              </div>
              
              {/* Utilities Included */}
              {property.utilityInfo && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Utilities</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(property.utilityInfo).map(([key, included]) => (
                      <button 
                        key={key}
                        onClick={() => toggleUtility(property.id, key as keyof TenantProperty['utilityInfo'])}
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center transition-colors ${
                          included ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500 line-through'
                        }`}
                      >
                        {getUtilityIcon(key as keyof TenantProperty['utilityInfo'])}
                        <span className="ml-1">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        {included ? (
                          <CheckIcon className="ml-1 h-3 w-3 text-green-500" />
                        ) : (
                          <XMarkIcon className="ml-1 h-3 w-3 text-gray-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Landlord Details */}
              <div className="mt-4 mb-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => toggleLandlordDetails(property.id)}
                  className="w-full flex items-center justify-between cursor-pointer py-2 text-left focus:outline-none"
                >
                  <span className="text-sm font-medium text-gray-700 hover:text-zim-green">Landlord Details</span>
                  <ChevronRightIcon 
                    className={`h-4 w-4 text-gray-400 transition-transform ${expandedLandlords.includes(property.id) ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                {expandedLandlords.includes(property.id) && (
                  <div className="mt-3 bg-gray-50 rounded-md p-3 text-sm animate-fadeIn">
                    <p className="font-medium text-gray-900">{property.landlordName}</p>
                    
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <a href={`mailto:${property.landlordContact}`} className="text-zim-green hover:underline">
                          {property.landlordContact}
                        </a>
                      </div>
                      
                      {property.landlordPhone && (
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`tel:${property.landlordPhone}`} className="text-zim-green hover:underline">
                            {property.landlordPhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Documents */}
              {property.leaseDocuments && property.leaseDocuments.length > 0 && (
                <div className="mb-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => toggleDocuments(property.id)}
                    className="w-full flex items-center justify-between cursor-pointer py-2 text-left focus:outline-none"
                  >
                    <span className="text-sm font-medium text-gray-700 hover:text-zim-green">Documents</span>
                    <ChevronRightIcon 
                      className={`h-4 w-4 text-gray-400 transition-transform ${expandedDocuments.includes(property.id) ? 'rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {expandedDocuments.includes(property.id) && (
                    <div className="mt-2 space-y-2 animate-fadeIn">
                      {property.leaseDocuments.map((doc, index) => (
                        <button
                          key={index}
                          onClick={() => downloadDocument(doc)}
                          className="w-full flex items-center p-2 hover:bg-gray-50 rounded-md text-sm text-gray-700 hover:text-zim-green transition-colors"
                        >
                          <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                          {doc.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Maintenance History */}
              <div className="mb-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => toggleMaintenanceRequests(property.id)}
                  className="w-full flex items-center justify-between cursor-pointer py-2 text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 hover:text-zim-green">Maintenance Requests</span>
                    <div className="ml-2 bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
                      {getMaintenanceRequestsCount(property.id)}
                    </div>
                  </div>
                  <ChevronRightIcon 
                    className={`h-4 w-4 text-gray-400 transition-transform ${expandedMaintenanceRequests.includes(property.id) ? 'rotate-90' : ''}`} 
                  />
                </button>
                
                {expandedMaintenanceRequests.includes(property.id) && (
                  <div className="mt-2 space-y-2 animate-fadeIn">
                    {maintenanceRequests
                      .filter(request => request.propertyId === property.id)
                      .map(request => (
                        <div 
                          key={request.id}
                          className="border border-gray-100 rounded-md p-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">{request.issue}</p>
                              <p className="text-xs text-gray-500">Submitted on {new Date(request.dateSubmitted).toLocaleDateString()}</p>
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              request.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : request.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-800'
                                : request.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {request.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                    <button
                      type="button"
                      onClick={() => handleMaintenanceRequest(property.id)}
                      className="w-full mt-2 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      New Request
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => handleMaintenanceRequest(property.id)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green transition-colors"
              >
                <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                Maintenance
              </button>
              
              <button
                type="button"
                onClick={() => handleRentPayment(property)}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green transition-colors"
              >
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Pay Rent
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zim-green-100 text-zim-green">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">Report an Issue</h3>
              <p className="mt-1 text-sm text-gray-500">
                Having problems with your property? Create a maintenance request.
              </p>
              <button 
                onClick={() => handleMaintenanceRequest('all')}
                className="mt-2 inline-block text-sm text-zim-green hover:text-zim-green-dark focus:outline-none"
              >
                Submit a request →
              </button>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zim-green-100 text-zim-green">
                <DocumentTextIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">Lease Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Need to review your lease agreement or have questions?
              </p>
              <Link 
                to="/tenant-dashboard/help/documents" 
                className="mt-2 inline-block text-sm text-zim-green hover:text-zim-green-dark"
              >
                View your documents →
              </Link>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-zim-green-100 text-zim-green">
                <EnvelopeIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">Contact Management</h3>
              <p className="mt-1 text-sm text-gray-500">
                Need to speak with your property management team?
              </p>
              <Link 
                to="/tenant-dashboard/help/contact" 
                className="mt-2 inline-block text-sm text-zim-green hover:text-zim-green-dark"
              >
                Contact support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 