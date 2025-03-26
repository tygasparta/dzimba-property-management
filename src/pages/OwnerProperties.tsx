import React, { useState, useEffect } from 'react';
import {
  BuildingOfficeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowPathIcon,
  PhotoIcon,
  MapPinIcon,
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  DocumentIcon,
  BellIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Property owner's property interface
interface OwnerProperty {
  id: string;
  name: string;
  address: string;
  description: string;
  type: string;
  units: number;
  occupancy: number;
  status: 'active' | 'maintenance' | 'vacant';
  images: string[];
  rentAmount: number;
  amenities: string[];
  maintenanceRequests: MaintenanceRequest[];
  tenants: PropertyTenant[];
  paymentHistory: PaymentRecord[];
}

interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  unit: string;
  issue: string;
  description: string;
  status: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  dateSubmitted: string;
  dateResolved?: string;
}

interface PropertyTenant {
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

interface PaymentRecord {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  method: string;
  note?: string;
}

// Mock data for owner properties
const mockOwnerProperties: OwnerProperty[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Main St, Harare',
    description: 'A beautiful apartment complex with modern amenities and great views.',
    type: 'Apartment Complex',
    units: 12,
    occupancy: 10,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3'
    ],
    rentAmount: 850,
    amenities: ['Swimming Pool', 'Gym', 'Security', 'Parking'],
    maintenanceRequests: [
      {
        id: 'm1',
        propertyId: '1',
        tenantId: 't1',
        tenantName: 'John Doe',
        unit: 'Apt 101',
        issue: 'Leaking Faucet',
        description: 'The kitchen faucet is leaking and causing water damage.',
        status: 'pending',
        priority: 'medium',
        dateSubmitted: '2023-03-15'
      },
      {
        id: 'm2',
        propertyId: '1',
        tenantId: 't2',
        tenantName: 'Jane Smith',
        unit: 'Apt 203',
        issue: 'Broken AC',
        description: 'The air conditioner is not working properly.',
        status: 'in_progress',
        priority: 'high',
        dateSubmitted: '2023-03-10'
      }
    ],
    tenants: [
      {
        id: 't1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+263 77 123 4567',
        unit: 'Apt 101',
        leaseStart: '2023-01-01',
        leaseEnd: '2023-12-31',
        rentAmount: 850,
        status: 'active'
      },
      {
        id: 't2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+263 77 987 6543',
        unit: 'Apt 203',
        leaseStart: '2023-02-01',
        leaseEnd: '2024-01-31',
        rentAmount: 900,
        status: 'active'
      }
    ],
    paymentHistory: [
      {
        id: 'p1',
        tenantId: 't1',
        tenantName: 'John Doe',
        amount: 850,
        date: '2023-03-01',
        status: 'approved',
        method: 'EcoCash'
      },
      {
        id: 'p2',
        tenantId: 't2',
        tenantName: 'Jane Smith',
        amount: 900,
        date: '2023-03-02',
        status: 'pending',
        method: 'Bank Transfer'
      }
    ]
  },
  {
    id: '2',
    name: 'Garden Villas',
    address: '456 Park Ave, Bulawayo',
    description: 'Peaceful townhouses with garden views and spacious interiors.',
    type: 'Townhouse Complex',
    units: 8,
    occupancy: 8,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3'
    ],
    rentAmount: 750,
    amenities: ['Garden', 'Security', 'Parking'],
    maintenanceRequests: [],
    tenants: [
      {
        id: 't3',
        name: 'Robert Brown',
        email: 'robert@example.com',
        phone: '+263 77 456 7890',
        unit: 'Villa 3',
        leaseStart: '2023-01-15',
        leaseEnd: '2024-01-14',
        rentAmount: 750,
        status: 'active'
      }
    ],
    paymentHistory: [
      {
        id: 'p3',
        tenantId: 't3',
        tenantName: 'Robert Brown',
        amount: 750,
        date: '2023-03-01',
        status: 'approved',
        method: 'PayNow'
      }
    ]
  },
  {
    id: '3',
    name: 'Mountain View',
    address: '789 Hill Rd, Mutare',
    description: 'A single family home with amazing mountain views.',
    type: 'Single Family',
    units: 1,
    occupancy: 0,
    status: 'vacant',
    images: [],
    rentAmount: 1200,
    amenities: ['Large Yard', 'Garage', 'Modern Kitchen'],
    maintenanceRequests: [],
    tenants: [],
    paymentHistory: []
  },
];

const propertyTypes = [
  'Apartment Complex', 
  'Townhouse Complex', 
  'Single Family', 
  'Commercial Building',
  'Office Space',
  'Industrial Property'
];

const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-500 text-white' },
  { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500 text-white' },
  { value: 'vacant', label: 'Vacant', color: 'bg-red-600 text-white' },
];

const amenityOptions = [
  'Swimming Pool',
  'Gym',
  'Security',
  'Parking',
  'Garden',
  'Balcony',
  'Elevator',
  'Air Conditioning',
  'Internet',
  'Furnished',
  'Garage',
  'Modern Kitchen',
  'Large Yard',
  '24/7 Power Backup'
];

export default function OwnerProperties() {
  // State variables
  const [properties, setProperties] = useState<OwnerProperty[]>(mockOwnerProperties);
  const [selectedProperty, setSelectedProperty] = useState<OwnerProperty | null>(null);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [isEditingProperty, setIsEditingProperty] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'tenants' | 'maintenance' | 'payments'>('details');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    type: 'Apartment Complex',
    units: 1,
    occupancy: 0,
    status: 'vacant' as 'active' | 'maintenance' | 'vacant',
    images: [] as string[],
    rentAmount: 0,
    amenities: [] as string[],
  });

  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper functions
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
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

  // Handle checkbox changes (for amenities)
  const handleCheckboxChange = (amenity: string) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(item => item !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  // Simulated file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload the file to a server and get back a URL
      // For this demo, we'll create a fake URL
      const newImageUrl = URL.createObjectURL(files[0]);
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl],
      });
    }
  };

  // Remove an image from the form
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Handle form submission for adding/editing a property
  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingProperty && selectedProperty) {
      // Update existing property
      setProperties(properties.map(property => 
        property.id === selectedProperty.id 
          ? { 
              ...property, 
              ...formData,
              maintenanceRequests: property.maintenanceRequests,
              tenants: property.tenants,
              paymentHistory: property.paymentHistory
            }
          : property
      ));
    } else {
      // Add new property
      const newProperty: OwnerProperty = {
        id: Date.now().toString(),
        ...formData,
        maintenanceRequests: [],
        tenants: [],
        paymentHistory: []
      };
      setProperties([...properties, newProperty]);
    }
    
    // Reset form and state
    setIsAddingProperty(false);
    setIsEditingProperty(false);
    setSelectedProperty(null);
    setFormData({
      name: '',
      address: '',
      description: '',
      type: 'Apartment Complex',
      units: 1,
      occupancy: 0,
      status: 'vacant',
      images: [],
      rentAmount: 0,
      amenities: [],
    });
  };

  // Handle approval of maintenance request
  const handleMaintenanceAction = (propertyId: string, requestId: string, newStatus: MaintenanceRequest['status']) => {
    setProperties(properties.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          maintenanceRequests: property.maintenanceRequests.map(request => {
            if (request.id === requestId) {
              return {
                ...request,
                status: newStatus,
                dateResolved: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : request.dateResolved
              };
            }
            return request;
          })
        };
      }
      return property;
    }));
  };

  // Handle approval/rejection of payment
  const handlePaymentAction = (propertyId: string, paymentId: string, approved: boolean) => {
    setProperties(properties.map(property => {
      if (property.id === propertyId) {
        return {
          ...property,
          paymentHistory: property.paymentHistory.map(payment => {
            if (payment.id === paymentId) {
              return {
                ...payment,
                status: approved ? 'approved' : 'rejected'
              };
            }
            return payment;
          })
        };
      }
      return property;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Properties</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your properties, tenants, and maintenance requests
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={refreshData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <ArrowPathIcon className={`-ml-1 mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAddingProperty(true);
              setIsEditingProperty(false);
              setSelectedProperty(null);
              setFormData({
                name: '',
                address: '',
                description: '',
                type: 'Apartment Complex',
                units: 1,
                occupancy: 0,
                status: 'vacant',
                images: [],
                rentAmount: 0,
                amenities: [],
              });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-zim-green to-zim-green-600 hover:from-zim-green-600 hover:to-zim-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Property
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="relative rounded-md shadow-sm max-w-lg w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-zim-green focus:border-zim-green sm:text-sm"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      {/* Property Grid */}
      {!selectedProperty && !isAddingProperty && !isEditingProperty && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              {/* Property Image */}
              <div className="relative h-48 bg-gray-200">
                {property.images.length > 0 ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <PhotoIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${
                    property.status === 'active' ? 'bg-green-500' 
                    : property.status === 'maintenance' ? 'bg-yellow-500' 
                    : 'bg-red-500'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Property Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{property.name}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{property.address}</span>
                </p>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium">{property.type}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Units</p>
                    <p className="text-sm font-medium">{property.occupancy}/{property.units}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Rent</p>
                    <p className="text-sm font-medium">${property.rentAmount}/month</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">Requests</p>
                    <p className="text-sm font-medium">{property.maintenanceRequests.filter(req => req.status === 'pending').length} pending</p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zim-green-50 text-zim-green"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      +{property.amenities.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => setSelectedProperty(property)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-zim-green bg-zim-green-50 hover:bg-zim-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                  >
                    View Details
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setIsEditingProperty(true);
                        setIsAddingProperty(false);
                        setSelectedProperty(property);
                        setFormData({
                          name: property.name,
                          address: property.address,
                          description: property.description,
                          type: property.type,
                          units: property.units,
                          occupancy: property.occupancy,
                          status: property.status,
                          images: property.images,
                          rentAmount: property.rentAmount,
                          amenities: property.amenities,
                        });
                      }}
                      className="p-1.5 text-gray-500 hover:text-zim-green focus:outline-none"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this property?')) {
                          setProperties(properties.filter(p => p.id !== property.id));
                        }
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-600 focus:outline-none"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {filteredProperties.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
              <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm 
                  ? 'Try adjusting your search terms.' 
                  : 'Get started by creating a new property.'}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear search
                </button>
              ) : (
                <button
                  onClick={() => setIsAddingProperty(true)}
                  className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-dark"
                >
                  <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                  Add Property
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Property Form */}
      {(isAddingProperty || isEditingProperty) && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {isEditingProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <button
              onClick={() => {
                setIsAddingProperty(false);
                setIsEditingProperty(false);
                setSelectedProperty(null);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handlePropertySubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Basic Information</h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Property Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Property Details</h3>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-gray-700">
                    Total Units <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="units"
                    name="units"
                    min="1"
                    value={formData.units}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="occupancy" className="block text-sm font-medium text-gray-700">
                    Occupied Units
                  </label>
                  <input
                    type="number"
                    id="occupancy"
                    name="occupancy"
                    min="0"
                    max={formData.units}
                    value={formData.occupancy}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Pricing & Images */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Pricing & Images</h3>
                
                <div>
                  <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">
                    Monthly Rent (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="rentAmount"
                      name="rentAmount"
                      min="0"
                      value={formData.rentAmount}
                      onChange={handleInputChange}
                      required
                      className="block w-full pl-7 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Images</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-zim-green hover:text-zim-green-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-zim-green"
                        >
                          <span>Upload images</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            accept="image/*"
                            className="sr-only" 
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Image Preview</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Property image ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 focus:outline-none"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Amenities */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Amenities</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {amenityOptions.map(amenity => (
                    <div key={amenity} className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={`amenity-${amenity}`}
                          name={`amenity-${amenity}`}
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleCheckboxChange(amenity)}
                          className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={`amenity-${amenity}`} className="font-medium text-gray-700">
                          {amenity}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-5">
              <button
                type="button"
                onClick={() => {
                  setIsAddingProperty(false);
                  setIsEditingProperty(false);
                  setSelectedProperty(null);
                }}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                {isEditingProperty ? 'Update Property' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Property Details View */}
      {selectedProperty && !isAddingProperty && !isEditingProperty && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Property Header */}
          <div className="relative h-56 bg-gray-200">
            {selectedProperty.images.length > 0 ? (
              <img 
                src={selectedProperty.images[0]} 
                alt={selectedProperty.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <BuildingOfficeIcon className="h-24 w-24 text-gray-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl font-bold">{selectedProperty.name}</h2>
              <div className="flex items-center text-sm mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {selectedProperty.address}
              </div>
              <div className="mt-2 flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full text-white ${
                  selectedProperty.status === 'active' ? 'bg-green-500' 
                  : selectedProperty.status === 'maintenance' ? 'bg-yellow-500' 
                  : 'bg-red-500'
                }`}>
                  {selectedProperty.status.charAt(0).toUpperCase() + selectedProperty.status.slice(1)}
                </span>
                <span className="text-sm">{selectedProperty.type}</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => {
                  setIsEditingProperty(true);
                  setFormData({
                    name: selectedProperty.name,
                    address: selectedProperty.address,
                    description: selectedProperty.description,
                    type: selectedProperty.type,
                    units: selectedProperty.units,
                    occupancy: selectedProperty.occupancy,
                    status: selectedProperty.status,
                    images: selectedProperty.images,
                    rentAmount: selectedProperty.rentAmount,
                    amenities: selectedProperty.amenities,
                  });
                }}
                className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-zim-green focus:outline-none"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'details'
                    ? 'border-b-2 border-zim-green text-zim-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('tenants')}
                className={`py-4 px-6 text-sm font-medium flex items-center ${
                  activeTab === 'tenants'
                    ? 'border-b-2 border-zim-green text-zim-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tenants
                {selectedProperty.tenants.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {selectedProperty.tenants.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('maintenance')}
                className={`py-4 px-6 text-sm font-medium flex items-center ${
                  activeTab === 'maintenance'
                    ? 'border-b-2 border-zim-green text-zim-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Maintenance
                {selectedProperty.maintenanceRequests.filter(req => req.status === 'pending').length > 0 && (
                  <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">
                    {selectedProperty.maintenanceRequests.filter(req => req.status === 'pending').length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-4 px-6 text-sm font-medium flex items-center ${
                  activeTab === 'payments'
                    ? 'border-b-2 border-zim-green text-zim-green'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payments
                {selectedProperty.paymentHistory.filter(payment => payment.status === 'pending').length > 0 && (
                  <span className="ml-2 bg-yellow-100 text-yellow-600 py-0.5 px-2 rounded-full text-xs">
                    {selectedProperty.paymentHistory.filter(payment => payment.status === 'pending').length}
                  </span>
                )}
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Property Details</h3>
                  <p className="mt-2 text-gray-600">{selectedProperty.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Units</h4>
                    <div className="mt-2 flex items-end">
                      <span className="text-3xl font-bold text-gray-900">{selectedProperty.occupancy}/{selectedProperty.units}</span>
                      <span className="ml-2 text-sm text-gray-500">occupied</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          (selectedProperty.occupancy / selectedProperty.units) >= 0.8 ? 'bg-green-500' 
                          : (selectedProperty.occupancy / selectedProperty.units) >= 0.5 ? 'bg-yellow-500' 
                          : 'bg-red-500'
                        }`}
                        style={{ width: `${(selectedProperty.occupancy / selectedProperty.units) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Monthly Revenue</h4>
                    <div className="mt-2 flex items-end">
                      <span className="text-3xl font-bold text-gray-900">${selectedProperty.rentAmount * selectedProperty.occupancy}</span>
                      <span className="ml-2 text-sm text-gray-500">USD</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Based on current occupancy
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Maintenance</h4>
                    <div className="mt-2 flex items-end">
                      <span className="text-3xl font-bold text-gray-900">{selectedProperty.maintenanceRequests.length}</span>
                      <span className="ml-2 text-sm text-gray-500">requests</span>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      {selectedProperty.maintenanceRequests.filter(req => req.status === 'pending').length > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          {selectedProperty.maintenanceRequests.filter(req => req.status === 'pending').length} pending
                        </span>
                      )}
                      {selectedProperty.maintenanceRequests.filter(req => req.status === 'in_progress').length > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          {selectedProperty.maintenanceRequests.filter(req => req.status === 'in_progress').length} in progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Property Images</h3>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProperty.images.length > 0 ? (
                      selectedProperty.images.map((image, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={`Property image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">No images available</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {selectedProperty.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-zim-green mr-2" />
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                    {selectedProperty.amenities.length === 0 && (
                      <p className="col-span-full text-sm text-gray-500">No amenities listed</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Tenants Tab */}
            {activeTab === 'tenants' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Tenants</h3>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                  >
                    <PlusIcon className="-ml-1 mr-1 h-4 w-4" />
                    Add Tenant
                  </button>
                </div>
                
                {selectedProperty.tenants.length > 0 ? (
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Tenant</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Lease Period</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rent Amount</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {selectedProperty.tenants.map((tenant) => (
                          <tr key={tenant.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                                  <UserIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{tenant.name}</div>
                                  <div className="text-gray-500">{tenant.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{tenant.unit}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${tenant.rentAmount}/month</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                tenant.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : tenant.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button className="text-zim-green hover:text-zim-green-dark">
                                Edit<span className="sr-only">, {tenant.name}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tenants yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by adding a new tenant to this property.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add Tenant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Maintenance Tab */}
            {activeTab === 'maintenance' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Maintenance Requests</h3>
                  <Link
                    to={`/owner-dashboard/maintenance?propertyId=${selectedProperty.name}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                  >
                    <ArrowTopRightOnSquareIcon className="mr-2 h-4 w-4" />
                    View All Maintenance
                  </Link>
                </div>
                
                {selectedProperty.maintenanceRequests.length > 0 ? (
                  <div className="space-y-4">
                    {selectedProperty.maintenanceRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className={`bg-white rounded-lg shadow-sm border p-4 ${
                          request.status === 'pending' ? 'border-l-4 border-l-red-500' : 
                          request.status === 'in_progress' ? 'border-l-4 border-l-yellow-500' : 
                          request.status === 'completed' ? 'border-l-4 border-l-green-500' : 
                          'border-gray-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div>
                            <h4 className="text-md font-medium text-gray-900">{request.issue}</h4>
                            <p className="mt-1 text-sm text-gray-500">{request.description}</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Unit: {request.unit}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Tenant: {request.tenantName}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                request.priority === 'high' 
                                  ? 'bg-red-100 text-red-800'
                                  : request.priority === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                request.status === 'pending' 
                                  ? 'bg-red-100 text-red-800'
                                  : request.status === 'in_progress'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : request.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {request.status === 'in_progress' ? 'In Progress' : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                              Submitted on {new Date(request.dateSubmitted).toLocaleDateString()}
                              {request.dateResolved && ` • Resolved on ${new Date(request.dateResolved).toLocaleDateString()}`}
                            </p>
                          </div>
                          
                          {/* Action buttons */}
                          <div className="mt-4 sm:mt-0 flex flex-col space-y-2">
                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleMaintenanceAction(selectedProperty.id, request.id, 'approved')}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                                >
                                  Approve Request
                                </button>
                                <button
                                  onClick={() => handleMaintenanceAction(selectedProperty.id, request.id, 'rejected')}
                                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {request.status === 'approved' && (
                              <button
                                onClick={() => handleMaintenanceAction(selectedProperty.id, request.id, 'in_progress')}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                              >
                                Mark In Progress
                              </button>
                            )}
                            {request.status === 'in_progress' && (
                              <button
                                onClick={() => handleMaintenanceAction(selectedProperty.id, request.id, 'completed')}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              >
                                Mark Completed
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance requests</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no maintenance requests for this property.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
                
                {selectedProperty.paymentHistory.length > 0 ? (
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Tenant</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Method</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {selectedProperty.paymentHistory.map((payment) => (
                          <tr key={payment.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {payment.tenantName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${payment.amount}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {payment.method}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                payment.status === 'approved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : payment.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              {payment.status === 'pending' && (
                                <div className="flex space-x-2 justify-end">
                                  <button
                                    onClick={() => handlePaymentAction(selectedProperty.id, payment.id, true)}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handlePaymentAction(selectedProperty.id, payment.id, false)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No payment history</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no payment records for this property yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 