import React, { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserGroupIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  PlusIcon,
  DocumentIcon,
  EyeIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'financial' | 'property' | 'tenant' | 'maintenance';
  lastGenerated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  isNew?: boolean;
  thumbnail?: string;
}

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Monthly Income Statement',
    description: 'Financial summary of income and expenses for the month',
    type: 'financial',
    lastGenerated: '2024-03-01',
    frequency: 'monthly',
    thumbnail: 'https://placehold.co/100x60/009B4E/FFFFFF?text=Income',
  },
  {
    id: '2',
    name: 'Property Occupancy',
    description: 'Occupancy rates across all properties',
    type: 'property',
    lastGenerated: '2024-03-05',
    frequency: 'weekly',
    thumbnail: 'https://placehold.co/100x60/FFD200/000000?text=Occupancy',
  },
  {
    id: '3',
    name: 'Tenant Payment History',
    description: 'Payment history and status for all tenants',
    type: 'tenant',
    lastGenerated: '2024-03-10',
    frequency: 'monthly',
    thumbnail: 'https://placehold.co/100x60/009B4E/FFFFFF?text=Payments',
  },
  {
    id: '4',
    name: 'Maintenance Request Summary',
    description: 'Summary of maintenance requests and their status',
    type: 'maintenance',
    lastGenerated: '2024-03-15',
    frequency: 'weekly',
    thumbnail: 'https://placehold.co/100x60/EF3340/FFFFFF?text=Maintenance',
  },
  {
    id: '5',
    name: 'Annual Financial Report',
    description: 'Comprehensive financial analysis for the year',
    type: 'financial',
    lastGenerated: '2023-12-31',
    frequency: 'yearly',
    thumbnail: 'https://placehold.co/100x60/009B4E/FFFFFF?text=Annual',
  },
  {
    id: '6',
    name: 'Lease Expiration Summary',
    description: 'Overview of upcoming lease expirations',
    type: 'tenant',
    lastGenerated: '2024-03-12',
    frequency: 'monthly',
    isNew: true,
    thumbnail: 'https://placehold.co/100x60/FFD200/000000?text=Leases',
  },
  {
    id: '7',
    name: 'Property Valuation Report',
    description: 'Current market value assessment of all properties',
    type: 'property',
    lastGenerated: '2024-02-28',
    frequency: 'quarterly',
    thumbnail: 'https://placehold.co/100x60/009B4E/FFFFFF?text=Valuation',
  },
  {
    id: '8',
    name: 'Rent Collection Analysis',
    description: 'Analysis of rent collection efficiency and late payments',
    type: 'financial',
    lastGenerated: '2024-03-08',
    frequency: 'monthly',
    isNew: true,
    thumbnail: 'https://placehold.co/100x60/FFD200/000000?text=Collection',
  },
  {
    id: '9',
    name: 'Maintenance Cost Report',
    description: 'Breakdown of maintenance expenses by property and category',
    type: 'maintenance',
    lastGenerated: '2024-02-15',
    frequency: 'monthly',
    thumbnail: 'https://placehold.co/100x60/EF3340/FFFFFF?text=Costs',
  },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState<Report['type'] | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  
  // Filter reports based on active tab and search term
  const filteredReports = mockReports
    .filter(report => activeTab === 'all' || report.type === activeTab)
    .filter(report => 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(report => !dateFilter || new Date(report.lastGenerated) >= new Date(dateFilter));

  const handleGenerateReport = (reportId: string) => {
    setIsGeneratingReport(reportId);
    setTimeout(() => {
      setIsGeneratingReport(null);
      // Show success notification or handle download
    }, 2000);
  };

  const viewReportDetails = (report: Report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const getReportIcon = (type: Report['type']) => {
    switch (type) {
      case 'financial':
        return <CurrencyDollarIcon className="h-8 w-8 text-zim-green" />;
      case 'property':
        return <HomeIcon className="h-8 w-8 text-zim-green" />;
      case 'tenant':
        return <UserGroupIcon className="h-8 w-8 text-zim-green" />;
      case 'maintenance':
        return <WrenchScrewdriverIcon className="h-8 w-8 text-zim-green" />;
      default:
        return <DocumentChartBarIcon className="h-8 w-8 text-zim-green" />;
    }
  };

  const getReportTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'financial':
        return 'bg-zim-green text-white';
      case 'property':
        return 'bg-yellow-500 text-black';
      case 'tenant':
        return 'bg-black text-white';
      case 'maintenance':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getFrequencyIcon = (frequency: Report['frequency']) => {
    switch (frequency) {
      case 'daily':
        return <ClockIcon className="h-4 w-4 text-gray-400" />;
      case 'weekly':
        return <CalendarIcon className="h-4 w-4 text-gray-400" />;
      case 'monthly':
        return <CalendarIcon className="h-4 w-4 text-gray-400" />;
      case 'quarterly':
        return <ChartBarIcon className="h-4 w-4 text-gray-400" />;
      case 'yearly':
        return <DocumentChartBarIcon className="h-4 w-4 text-gray-400" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const reportCounts = {
    all: mockReports.length,
    financial: mockReports.filter(r => r.type === 'financial').length,
    property: mockReports.filter(r => r.type === 'property').length,
    tenant: mockReports.filter(r => r.type === 'tenant').length,
    maintenance: mockReports.filter(r => r.type === 'maintenance').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Zimbabwe flag colors as a decorative bar */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-zim-green"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-black"></div>
        </div>
        <div className="pt-4">
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Generate and view reports for your property management system
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-zim-green focus:border-zim-green sm:text-sm"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
            >
              <FunnelIcon className="-ml-0.5 mr-2 h-4 w-4" />
              Filters
            </button>
            
            <button 
              onClick={() => {
                setActiveTab('all');
                setSearchTerm('');
                setDateFilter('');
              }}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500"
              title="Reset filters"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Expanded Filters */}
        {isFiltersOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700">
                  Generated After
                </label>
                <input
                  type="date"
                  id="date-filter"
                  className="mt-1 input"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`${
              activeTab === 'all'
                ? 'border-zim-green text-zim-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <DocumentChartBarIcon className="mr-2 h-5 w-5" />
            All Reports
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100 text-gray-700">
              {reportCounts.all}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('financial')}
            className={`${
              activeTab === 'financial'
                ? 'border-zim-green text-zim-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <CurrencyDollarIcon className="mr-2 h-5 w-5" />
            Financial
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100 text-gray-700">
              {reportCounts.financial}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('property')}
            className={`${
              activeTab === 'property'
                ? 'border-zim-green text-zim-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <HomeIcon className="mr-2 h-5 w-5" />
            Property
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100 text-gray-700">
              {reportCounts.property}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('tenant')}
            className={`${
              activeTab === 'tenant'
                ? 'border-zim-green text-zim-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <UserGroupIcon className="mr-2 h-5 w-5" />
            Tenant
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100 text-gray-700">
              {reportCounts.tenant}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`${
              activeTab === 'maintenance'
                ? 'border-zim-green text-zim-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <WrenchScrewdriverIcon className="mr-2 h-5 w-5" />
            Maintenance
            <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-gray-100 text-gray-700">
              {reportCounts.maintenance}
            </span>
          </button>
        </nav>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div 
              key={report.id} 
              className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 transition-all hover:shadow-md"
            >
              {/* Zimbabwe flag-inspired top border */}
              <div className="h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              
              {report.isNew && (
                <div className="absolute top-0 right-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-bl-md text-xs font-medium bg-zim-green text-white">
                    New
                  </span>
                </div>
              )}
              
              <div className="p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                    {report.thumbnail ? (
                      <img src={report.thumbnail} alt="" className="h-16 w-24 object-cover" />
                    ) : (
                      <div className="h-16 w-24 bg-gray-100 flex items-center justify-center">
                        {getReportIcon(report.type)}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        {getFrequencyIcon(report.frequency)}
                        <span className="ml-1 capitalize">{report.frequency}</span>
                      </div>
                    </div>
                    <h3 className="mt-2 text-lg font-medium text-gray-900 truncate">
                      {report.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Generated</span>
                    <span className="font-medium text-gray-900">
                      {new Date(report.lastGenerated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-5 flex space-x-2">
                  <button
                    type="button"
                    onClick={() => viewReportDetails(report)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                  >
                    <EyeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={isGeneratingReport === report.id}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-zim-green to-zim-green-600 hover:from-zim-green-600 hover:to-zim-green transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green disabled:opacity-50"
                  >
                    {isGeneratingReport === report.id ? (
                      <>
                        <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                        Generate
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 p-12 text-center bg-white rounded-lg shadow border border-gray-200">
            <DocumentIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || dateFilter || activeTab !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Create custom reports to get insights into your properties.'}
            </p>
            {(searchTerm || dateFilter || activeTab !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setDateFilter('');
                  setActiveTab('all');
                }}
                className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Report Detail Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-zim-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    {getReportIcon(selectedReport.type)}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedReport.name}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{selectedReport.description}</p>
                      
                      <div className="mt-4 space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Report Details</h4>
                          <div className="mt-2 bg-gray-50 p-3 rounded-md space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Type</span>
                              <span className="font-medium text-gray-900 capitalize">
                                {selectedReport.type}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Frequency</span>
                              <span className="font-medium text-gray-900 capitalize">
                                {selectedReport.frequency}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Last Generated</span>
                              <span className="font-medium text-gray-900">
                                {new Date(selectedReport.lastGenerated).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Available Formats</h4>
                          <div className="mt-2 flex space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              PDF
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Excel
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              CSV
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleGenerateReport(selectedReport.id)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zim-green text-base font-medium text-white hover:bg-zim-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <ArrowDownTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                  Generate Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 