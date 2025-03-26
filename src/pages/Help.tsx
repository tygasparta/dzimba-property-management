import React, { useState, useEffect } from 'react';
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  PhoneIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  BookOpenIcon,
  AcademicCapIcon,
  PaperAirplaneIcon,
  ClipboardDocumentCheckIcon,
  LinkIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

// FAQ categories 
const categories = [
  { id: 'all', name: 'All Questions' },
  { id: 'properties', name: 'Properties' },
  { id: 'tenants', name: 'Tenants' },
  { id: 'payments', name: 'Payments' },
  { id: 'leases', name: 'Leases' },
  { id: 'maintenance', name: 'Maintenance' },
  { id: 'reports', name: 'Reports' },
];

const faqs = [
  {
    question: "How do I add a new property?",
    answer: "Navigate to the Properties page and click on the 'Add Property' button. Fill in the property details such as name, address, type, and number of units, then click 'Save'.",
    category: "properties"
  },
  {
    question: "How do I register a new tenant?",
    answer: "Go to the Tenants page and click on the 'Add Tenant' button. Complete the tenant information form including contact details and associated property/unit, then click 'Save'.",
    category: "tenants"
  },
  {
    question: "How do I record a rent payment?",
    answer: "Navigate to the Payments page and click on 'Record Payment'. Select the tenant, enter the payment amount, date, and method, then click 'Save Payment'.",
    category: "payments"
  },
  {
    question: "How do I create a new lease agreement?",
    answer: "Go to the Leases page and click 'New Lease'. Select the tenant and property/unit, specify the lease terms including start and end dates, rent amount, and deposit, then click 'Create Lease'.",
    category: "leases"
  },
  {
    question: "How do I log a maintenance request?",
    answer: "Navigate to the Maintenance page and click 'New Request'. Select the property and unit, specify the issue type and description, set the priority, and click 'Submit Request'.",
    category: "maintenance"
  },
  {
    question: "Can I generate reports?",
    answer: "Yes, go to the Reports page where you can generate various reports including financial summaries, occupancy rates, tenant payment histories, and maintenance summaries. Select the desired report type and click 'Generate Report'.",
    category: "reports"
  },
  {
    question: "How do I customize my notification settings?",
    answer: "Go to Settings > Notifications where you can customize which notifications you receive and how you receive them (email, SMS, etc.).",
    category: "all"
  },
  {
    question: "How do I export data?",
    answer: "Most tables in the system have an 'Export' button that allows you to download the data in CSV or Excel format. You can also generate reports and export them.",
    category: "reports"
  },
  {
    question: "How do I update property details?",
    answer: "Navigate to the Properties page, find the property you want to edit and click the Edit (pencil) icon. Update the details in the form that appears and click 'Save Changes'.",
    category: "properties"
  },
  {
    question: "How do I terminate a lease early?",
    answer: "Go to the Leases page, find the lease you want to terminate and click the Edit icon. Change the status to 'Terminated', add a termination date and reason, then click 'Update Lease'.",
    category: "leases"
  },
  {
    question: "How do I record a partial payment?",
    answer: "On the Payments page, click 'Record Payment', select the tenant, enter the partial amount received, add a note indicating it's a partial payment, then click 'Save Payment'.",
    category: "payments"
  },
  {
    question: "How do I prioritize maintenance requests?",
    answer: "When creating or editing a maintenance request, you can set the priority to 'Low', 'Medium', or 'High' to indicate its urgency. High priority items will be highlighted in the maintenance dashboard.",
    category: "maintenance"
  },
];

const supportOptions = [
  {
    name: "Documentation",
    description: "Browse our comprehensive documentation",
    icon: DocumentTextIcon,
    href: "/dashboard/help/documentation",
    color: "bg-zim-green-50 text-zim-green"
  },
  {
    name: "Video Tutorials",
    description: "Watch step-by-step tutorial videos",
    icon: VideoCameraIcon,
    href: "/dashboard/help/training",
    color: "bg-yellow-50 text-yellow-600"
  },
  {
    name: "Live Chat",
    description: "Chat with our support team",
    icon: ChatBubbleLeftRightIcon,
    href: "/dashboard/help/chat",
    color: "bg-black bg-opacity-5 text-black"
  },
  {
    name: "Contact Support",
    description: "Get help via email or phone",
    icon: PhoneIcon,
    href: "/dashboard/help/contact",
    color: "bg-red-50 text-red-600"
  },
  {
    name: "Knowledge Base",
    description: "Explore our detailed knowledge base",
    icon: BookOpenIcon,
    href: "/dashboard/help/knowledge-base",
    color: "bg-zim-green-50 text-zim-green"
  },
  {
    name: "Training Resources",
    description: "Access our training resources",
    icon: AcademicCapIcon,
    href: "/dashboard/help/training",
    color: "bg-yellow-50 text-yellow-600"
  },
];

export default function Help() {
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandAll, setExpandAll] = useState(false);

  // Filter FAQs based on search term and category
  const filteredFaqs = faqs.filter(faq => 
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeCategory === 'all' || faq.category === activeCategory)
  );

  // Toggle an individual FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Toggle all FAQs
  const toggleAllFaqs = () => {
    setExpandAll(!expandAll);
    const newState: Record<number, boolean> = {};
    filteredFaqs.forEach((_, index) => {
      newState[index] = !expandAll;
    });
    setOpenFaqs(newState);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  // Update openFaqs when expandAll changes
  useEffect(() => {
    const newState: Record<number, boolean> = {};
    filteredFaqs.forEach((_, index) => {
      newState[index] = expandAll;
    });
    setOpenFaqs(newState);
  }, [expandAll, filteredFaqs.length]);

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
          <h1 className="text-2xl font-semibold text-gray-900">Help Center</h1>
          <p className="mt-1 text-sm text-gray-500">
            Find answers to common questions and get support
          </p>
        </div>
      </div>

      {/* Search Bar */}
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
                placeholder="Search help topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleAllFaqs}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
            >
              {expandAll ? 'Collapse All' : 'Expand All'}
            </button>
            
            <button 
              onClick={resetFilters}
              className="p-2 rounded-full text-gray-400 hover:text-gray-500"
              title="Reset filters"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'border-zim-green text-zim-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              {category.name}
              {activeCategory === category.id && (
                <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-zim-green bg-opacity-10 text-zim-green">
                  {filteredFaqs.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {supportOptions.map((option) => (
          <a
            key={option.name}
            href={option.href}
            className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center hover:border-zim-green group"
          >
            {/* Zimbabwe flag-inspired top border */}
            <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex-1 bg-zim-green"></div>
              <div className="flex-1 bg-yellow-500"></div>
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-black"></div>
            </div>
            
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${option.color} mb-4 transition-transform group-hover:scale-110`}>
              <option.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{option.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{option.description}</p>
          </a>
        ))}
      </div>

      {/* Quick Start Guide */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
          {/* Zimbabwe flag-inspired top border */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-zim-green"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
            <div className="flex-1 bg-black"></div>
          </div>
          <div className="flex items-center">
            <ClipboardDocumentCheckIcon className="h-6 w-6 text-zim-green mr-2" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Quick Start Guide</h2>
              <p className="mt-1 text-sm text-gray-500">
                Get up and running with Dzimba Property Management
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="space-y-4">
            <div className="relative rounded-md border border-gray-200 p-4 bg-gradient-to-r from-zim-green-50 to-white">
              <div className="absolute -top-3 left-4 bg-white px-2 rounded-full border border-zim-green">
                <span className="text-sm font-medium text-zim-green">Step 1</span>
              </div>
              <p className="text-sm text-gray-700">Add your properties and units</p>
            </div>
            
            <div className="relative rounded-md border border-gray-200 p-4 bg-gradient-to-r from-yellow-50 to-white">
              <div className="absolute -top-3 left-4 bg-white px-2 rounded-full border border-yellow-500">
                <span className="text-sm font-medium text-yellow-600">Step 2</span>
              </div>
              <p className="text-sm text-gray-700">Add tenants with their contact information</p>
            </div>
            
            <div className="relative rounded-md border border-gray-200 p-4 bg-gradient-to-r from-red-50 to-white">
              <div className="absolute -top-3 left-4 bg-white px-2 rounded-full border border-red-500">
                <span className="text-sm font-medium text-red-600">Step 3</span>
              </div>
              <p className="text-sm text-gray-700">Create lease agreements linking tenants to properties</p>
            </div>
            
            <div className="relative rounded-md border border-gray-200 p-4 bg-gradient-to-r from-gray-100 to-white">
              <div className="absolute -top-3 left-4 bg-white px-2 rounded-full border border-gray-600">
                <span className="text-sm font-medium text-gray-800">Step 4</span>
              </div>
              <p className="text-sm text-gray-700">Start recording payments and maintenance requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
          {/* Zimbabwe flag-inspired top border */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-zim-green"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
            <div className="flex-1 bg-black"></div>
          </div>
          <div className="flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-zim-green mr-2" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h2>
              <p className="mt-1 text-sm text-gray-500">
                Find answers to common questions about the system
              </p>
            </div>
          </div>
        </div>
        <div>
          {filteredFaqs.length > 0 ? (
            <dl>
              {filteredFaqs.map((faq, index) => (
                <div key={index} className={`border-b border-gray-200 ${index === 0 ? '' : 'border-t-0'}`}>
                  <dt className="text-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-start justify-between px-4 py-4 text-left text-gray-400 hover:text-gray-500 hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className={`h-6 w-6 transform transition-transform ${openFaqs[index] ? '-rotate-180' : 'rotate-0'}`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`px-4 pb-4 transition-all duration-200 ${openFaqs[index] ? 'block' : 'hidden'}`}
                  >
                    <div className="text-base text-gray-500 bg-gray-50 p-4 rounded-md">{faq.answer}</div>
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="py-8 px-4 text-center">
              <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No FAQs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or select a different category.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contact Us */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
          {/* Zimbabwe flag-inspired top border */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-zim-green"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
            <div className="flex-1 bg-black"></div>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="h-6 w-6 text-zim-green mr-2" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Contact Support</h2>
              <p className="mt-1 text-sm text-gray-500">
                Get in touch with our support team
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="flex items-center p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-zim-green-50 to-white">
              <div className="flex-shrink-0 bg-white p-2 rounded-full border border-zim-green">
                <EnvelopeIcon className="h-6 w-6 text-zim-green" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-500">support@dzimba.com</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-yellow-50 to-white">
              <div className="flex-shrink-0 bg-white p-2 rounded-full border border-yellow-500">
                <PhoneIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                <p className="text-sm text-gray-500">+263 77 123 4567</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="flex items-center p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-red-50 to-white">
              <div className="flex-shrink-0 bg-white p-2 rounded-full border border-red-500">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-500">Available during business hours</p>
              </div>
            </div>
            <div className="flex items-center p-4 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-100 to-white">
              <div className="flex-shrink-0 bg-white p-2 rounded-full border border-gray-600">
                <GlobeAltIcon className="h-6 w-6 text-gray-700" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">Visit Us</h3>
                <p className="text-sm text-gray-500">Harare Office: 123 Main Street</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <QuestionMarkCircleIcon className="h-5 w-5 text-zim-green" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-800">Support hours</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <span className="h-2 w-2 rounded-full bg-zim-green mr-2"></span>
                      Monday to Friday: 8:00 AM - 6:00 PM (CAT)
                    </span><br />
                    <span className="inline-flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      Saturday: 9:00 AM - 1:00 PM (CAT)
                    </span><br />
                    <span className="inline-flex items-center">
                      <span className="h-2 w-2 rounded-full bg-red-600 mr-2"></span>
                      Sunday: Closed
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 