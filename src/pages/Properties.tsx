import React, { useState } from 'react';
import {
  BuildingOfficeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  occupancy: number;
  status: 'active' | 'maintenance' | 'vacant';
}

const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Main St, Harare',
    type: 'Apartment Complex',
    units: 12,
    occupancy: 10,
    status: 'active',
  },
  {
    id: '2',
    name: 'Garden Villas',
    address: '456 Park Ave, Bulawayo',
    type: 'Townhouse Complex',
    units: 8,
    occupancy: 8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mountain View',
    address: '789 Hill Rd, Mutare',
    type: 'Single Family',
    units: 1,
    occupancy: 0,
    status: 'vacant',
  },
];

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [isEditingProperty, setIsEditingProperty] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'Apartment Complex',
    units: 1,
    occupancy: 0,
    status: 'vacant',
  });

  const propertyTypes = [
    'Apartment Complex', 
    'Townhouse Complex', 
    'Single Family', 
    'Commercial Building',
    'Office Space',
    'Industrial Property'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', color: 'bg-zim-green text-white' },
    { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-500 text-white' },
    { value: 'vacant', label: 'Vacant', color: 'bg-red-600 text-white' },
  ];

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      type: 'Apartment Complex',
      units: 1,
      occupancy: 0,
      status: 'vacant',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'units' || name === 'occupancy') {
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

  const handleAddProperty = () => {
    setIsAddingProperty(true);
    setIsEditingProperty(false);
    resetForm();
  };

  const handleEditProperty = (property: Property) => {
    setCurrentProperty(property);
    setFormData({
      name: property.name,
      address: property.address,
      type: property.type,
      units: property.units,
      occupancy: property.occupancy,
      status: property.status,
    });
    setIsEditingProperty(true);
    setIsAddingProperty(false);
  };

  const handleDeleteProperty = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(property => property.id !== propertyId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingProperty && currentProperty) {
      // Update existing property
      setProperties(properties.map(property => 
        property.id === currentProperty.id 
          ? { ...property, ...formData }
          : property
      ));
    } else {
      // Add new property
      const newProperty: Property = {
        id: Date.now().toString(),
        ...formData as any,
      };
      setProperties([...properties, newProperty]);
    }
    
    setIsAddingProperty(false);
    setIsEditingProperty(false);
    resetForm();
  };

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'active':
        return 'bg-zim-green text-white';
      case 'maintenance':
        return 'bg-yellow-500 text-white';
      case 'vacant':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your properties and units
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddProperty}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-zim-green to-zim-green-600 hover:from-zim-green-600 hover:to-zim-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Property
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
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Total: {properties.length}</span>
            <button 
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Add/Edit Property Form */}
      {(isAddingProperty || isEditingProperty) && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-zim-green">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {isEditingProperty ? 'Edit Property' : 'Add New Property'}
            </h2>
            <button
              onClick={() => {
                setIsAddingProperty(false);
                setIsEditingProperty(false);
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
                  Property Name
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
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="units" className="block text-sm font-medium text-gray-700">
                  Total Units
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="units"
                    id="units"
                    min="1"
                    required
                    value={formData.units}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="occupancy" className="block text-sm font-medium text-gray-700">
                  Occupied Units
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="occupancy"
                    id="occupancy"
                    min="0"
                    max={formData.units}
                    value={formData.occupancy}
                    onChange={handleInputChange}
                    className="input"
                  />
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
                  setIsAddingProperty(false);
                  setIsEditingProperty(false);
                }}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
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

      {/* Property Card Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="relative bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-200 group"
          >
            {/* Color accent based on status */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600"></div>
            
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-10 w-10 rounded-md ${getStatusColor(property.status)} flex items-center justify-center`}>
                  <BuildingOfficeIcon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {property.name}
                  </h3>
                  <p className="text-sm text-gray-500">{property.address}</p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Type</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {property.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Units</p>
                    <div className="mt-1 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-zim-green h-2.5 rounded-full" 
                          style={{ 
                            width: `${property.units > 0 ? (property.occupancy / property.units) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {property.occupancy}/{property.units}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 uppercase">Status</p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        property.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'maintenance'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {property.status === 'active' && <CheckIcon className="mr-1 h-3 w-3" />}
                      {property.status.charAt(0).toUpperCase() +
                        property.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleEditProperty(property)}
                  className="inline-flex items-center p-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  <PencilIcon className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteProperty(property.id)}
                  className="inline-flex items-center p-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-gray-200 shadow-sm">
            <BuildingOfficeIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search.' : 'Add your first property to get started.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Clear search
              </button>
            )}
            {!searchTerm && (
              <button
                onClick={handleAddProperty}
                className="mt-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-zim-green hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                Add a property
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 