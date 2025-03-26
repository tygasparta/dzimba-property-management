import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  LanguageIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

// Document categories
const categories = [
  { id: 'getting-started', name: 'Getting Started' },
  { id: 'user-guide', name: 'User Guide' },
  { id: 'admin', name: 'Administration' },
  { id: 'api', name: 'API Documentation' },
  { id: 'faq', name: 'FAQs' },
];

// Document sections
const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    documents: [
      { id: 'gs-1', title: 'System Requirements', description: 'Hardware and software requirements for running Dzimba', pages: 3 },
      { id: 'gs-2', title: 'Installation Guide', description: 'Step-by-step instructions for installing Dzimba', pages: 12 },
      { id: 'gs-3', title: 'Quick Start Guide', description: 'Essential steps to get up and running quickly', pages: 8 },
      { id: 'gs-4', title: 'First-time Setup', description: 'Initial configuration of your Dzimba system', pages: 15 },
    ]
  },
  {
    id: 'user-guide',
    title: 'User Guide',
    documents: [
      { id: 'ug-1', title: 'Dashboard Overview', description: 'Understanding the main dashboard and its features', pages: 6 },
      { id: 'ug-2', title: 'Managing Properties', description: 'How to add, edit, and manage properties', pages: 18 },
      { id: 'ug-3', title: 'Tenant Management', description: 'Complete guide to managing tenants in the system', pages: 22 },
      { id: 'ug-4', title: 'Payment Processing', description: 'Recording and managing rent payments', pages: 14 },
      { id: 'ug-5', title: 'Lease Management', description: 'Creating and managing lease agreements', pages: 20 },
      { id: 'ug-6', title: 'Maintenance Requests', description: 'Handling property maintenance and repairs', pages: 16 },
      { id: 'ug-7', title: 'Reporting Features', description: 'Generating and customizing reports', pages: 25 },
    ]
  },
  {
    id: 'admin',
    title: 'Administration',
    documents: [
      { id: 'ad-1', title: 'User Management', description: 'Adding and managing system users and roles', pages: 10 },
      { id: 'ad-2', title: 'System Configuration', description: 'Advanced system settings and preferences', pages: 30 },
      { id: 'ad-3', title: 'Backup and Recovery', description: 'Data backup and disaster recovery procedures', pages: 12 },
      { id: 'ad-4', title: 'Security Settings', description: 'Securing your Dzimba system and data', pages: 18 },
      { id: 'ad-5', title: 'Integration Guide', description: 'Connecting Dzimba with other business systems', pages: 24 },
    ]
  },
  {
    id: 'api',
    title: 'API Documentation',
    documents: [
      { id: 'api-1', title: 'API Overview', description: 'Introduction to the Dzimba API', pages: 8 },
      { id: 'api-2', title: 'Authentication', description: 'API authentication and security', pages: 14 },
      { id: 'api-3', title: 'Property Endpoints', description: 'API endpoints for property management', pages: 22 },
      { id: 'api-4', title: 'Tenant Endpoints', description: 'API endpoints for tenant management', pages: 20 },
      { id: 'api-5', title: 'Payment Endpoints', description: 'API endpoints for payment processing', pages: 18 },
      { id: 'api-6', title: 'Report Endpoints', description: 'API endpoints for generating reports', pages: 16 },
      { id: 'api-7', title: 'Webhook Integration', description: 'Setting up and managing webhooks', pages: 12 },
    ]
  },
];

const Documentation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'getting-started': true,
    'user-guide': false,
    'admin': false,
    'api': false,
  });

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Filter documents based on search term
  const filteredSections = sections.map(section => {
    const filteredDocs = section.documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return {
      ...section,
      documents: filteredDocs,
      visible: filteredDocs.length > 0
    };
  }).filter(section => section.visible || section.id === activeCategory);

  return (
    <div className="space-y-6">
      {/* Header with Zimbabwe flag colors as a decorative bar */}
      <div className="relative mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-zim-green"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-black"></div>
        </div>
        <div className="pt-4 flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-zim-green mr-3" />
              <h1 className="text-2xl font-semibold text-gray-900">Documentation</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Comprehensive documentation for Dzimba Property Management
            </p>
          </div>
          <Link
            to="/dashboard/help"
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <ArrowLeftIcon className="-ml-0.5 mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </div>
      </div>

      {/* Search and category selection */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zim-green sm:text-sm sm:leading-6"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200">
          <div className="px-4 sm:px-6 py-3 bg-gray-50">
            <div className="flex overflow-x-auto py-2 space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-zim-green text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent documents */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
          {/* Zimbabwe flag-inspired top border */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-zim-green"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
            <div className="flex-1 bg-black"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LightBulbIcon className="h-5 w-5 text-zim-green mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Recently Updated</h2>
            </div>
            <Link
              to="#"
              className="text-sm font-medium text-zim-green hover:text-zim-green-dark"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow hover:border-zim-green">
              {/* Zimbabwe flag-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <DocumentTextIcon className="h-6 w-6 text-zim-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium text-gray-900">Getting Started with Dzimba v2.0</h3>
                  <p className="mt-1 text-sm text-gray-500">Updated documentation for the latest version with new features.</p>
                  <div className="mt-3 flex items-center">
                    <span className="inline-flex items-center rounded-full bg-zim-green-100 px-2.5 py-0.5 text-xs font-medium text-zim-green-800">
                      New
                    </span>
                    <span className="ml-2 text-xs text-gray-500">Updated 3 days ago</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button className="inline-flex items-center text-xs font-medium text-zim-green hover:text-zim-green-dark">
                  <BookmarkIcon className="mr-1 h-3.5 w-3.5" />
                  Bookmark
                </button>
                <button className="inline-flex items-center text-xs font-medium text-zim-green hover:text-zim-green-dark">
                  <ArrowDownTrayIcon className="mr-1 h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow hover:border-zim-green">
              {/* Zimbabwe flag-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <DocumentTextIcon className="h-6 w-6 text-zim-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium text-gray-900">API Documentation</h3>
                  <p className="mt-1 text-sm text-gray-500">Comprehensive guide to the Dzimba REST API endpoints.</p>
                  <div className="mt-3 flex items-center">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Updated
                    </span>
                    <span className="ml-2 text-xs text-gray-500">Updated 1 week ago</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button className="inline-flex items-center text-xs font-medium text-zim-green hover:text-zim-green-dark">
                  <BookmarkIcon className="mr-1 h-3.5 w-3.5" />
                  Bookmark
                </button>
                <button className="inline-flex items-center text-xs font-medium text-zim-green hover:text-zim-green-dark">
                  <ArrowDownTrayIcon className="mr-1 h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>
            
            <div className="relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow hover:border-zim-green">
              {/* Zimbabwe flag-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <DocumentTextIcon className="h-6 w-6 text-zim-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-medium text-gray-900">Mobile App User Guide</h3>
                  <p className="mt-1 text-sm text-gray-500">Guide to using the Dzimba mobile app for property management on the go.</p>
                  <div className="mt-3 flex items-center">
                    <span className="inline-flex items-center rounded-full bg-zim-green-100 px-2.5 py-0.5 text-xs font-medium text-zim-green-800">
                      New
                    </span>
                    <span className="ml-2 text-xs text-gray-500">Added 2 weeks ago</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end space-x-2">
                <button className="inline-flex items-center text-xs font-medium text-zim-green hover:text-zim-green-dark">
                  <BookmarkIcon className="mr-1 h-3.5 w-3.5" />
                  Bookmark
                </button>
                <button className="inline-flex items-center text-xs font-medium text-zim-green hover:text-zim-green-dark">
                  <ArrowDownTrayIcon className="mr-1 h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document sections */}
      {filteredSections.map((section) => (
        <div key={section.id} className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
          <div 
            className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center">
              <ClipboardDocumentListIcon className="h-5 w-5 text-zim-green mr-2" />
              <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
              <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                {section.documents.length} documents
              </span>
            </div>
            <button>
              {expandedSections[section.id] ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          
          {expandedSections[section.id] && section.documents.length > 0 && (
            <div className="p-4 sm:p-6">
              <ul className="divide-y divide-gray-200">
                {section.documents.map((doc) => (
                  <li key={doc.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <DocumentDuplicateIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium text-gray-900">{doc.title}</h3>
                          <span className="text-xs text-gray-500">{doc.pages} pages</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/dashboard/help/docs/${doc.id}`}
                              className="text-sm font-medium text-zim-green hover:text-zim-green-dark"
                            >
                              Read online
                            </Link>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                              <BookmarkIcon className="mr-1.5 h-4 w-4" />
                              <span className="hidden sm:inline">Bookmark</span>
                            </button>
                            <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                              <ArrowDownTrayIcon className="mr-1.5 h-4 w-4" />
                              <span className="hidden sm:inline">Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {expandedSections[section.id] && section.documents.length === 0 && (
            <div className="p-8 text-center">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No documents matching your search criteria were found in this section.
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Document formats and translations */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
          {/* Zimbabwe flag-inspired top border */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-zim-green"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
            <div className="flex-1 bg-black"></div>
          </div>
          <h2 className="text-lg font-medium text-gray-900">Additional Resources</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="flex items-center mb-4">
                <ArrowDownTrayIcon className="h-6 w-6 text-zim-green mr-2" />
                <h3 className="text-base font-medium text-gray-900">Document Formats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">PDF Format</span>
                  </div>
                  <button className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
                    Download
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">HTML Format</span>
                  </div>
                  <button className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
                    View
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700">EPUB Format</span>
                  </div>
                  <button className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
                    Download
                  </button>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="flex items-center mb-4">
                <LanguageIcon className="h-6 w-6 text-zim-green mr-2" />
                <h3 className="text-base font-medium text-gray-900">Available Languages</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">English</span>
                    <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      Default
                    </span>
                  </div>
                  <button className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
                    Select
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Shona</span>
                  </div>
                  <button className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
                    Select
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700">Ndebele</span>
                  </div>
                  <button className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation; 