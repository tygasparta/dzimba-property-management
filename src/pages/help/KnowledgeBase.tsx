import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  BookmarkIcon,
  TagIcon,
  InformationCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  PlusIcon,
  MinusIcon,
  HomeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

// Define article categories
const categories = [
  { id: 'properties', name: 'Properties', icon: HomeIcon },
  { id: 'tenants', name: 'Tenants', icon: UserGroupIcon },
  { id: 'payments', name: 'Payments', icon: CurrencyDollarIcon },
  { id: 'leases', name: 'Leases', icon: DocumentTextIcon },
  { id: 'maintenance', name: 'Maintenance', icon: WrenchScrewdriverIcon },
  { id: 'reports', name: 'Reports', icon: ChartBarIcon },
];

// Knowledge base articles
const articles = [
  {
    id: '1',
    title: 'Understanding Property Types',
    category: 'properties',
    excerpt: 'Learn about the different property types in Dzimba and how to properly categorize them.',
    lastUpdated: '2024-03-01',
    readTime: '5 min',
    tags: ['properties', 'setup', 'categories'],
    featured: true,
  },
  {
    id: '2',
    title: 'Managing Tenant Information',
    category: 'tenants',
    excerpt: 'Best practices for storing and managing tenant information in compliance with data protection regulations.',
    lastUpdated: '2024-02-20',
    readTime: '7 min',
    tags: ['tenants', 'data', 'privacy'],
    featured: true,
  },
  {
    id: '3',
    title: 'Payment Processing Options',
    category: 'payments',
    excerpt: 'A comprehensive guide to all payment processing options available in Dzimba Property Management.',
    lastUpdated: '2024-03-05',
    readTime: '6 min',
    tags: ['payments', 'setup', 'configuration'],
    featured: true,
  },
  {
    id: '4',
    title: 'Setting Up Lease Agreements',
    category: 'leases',
    excerpt: 'How to create, customize, and manage lease agreements for different property types.',
    lastUpdated: '2024-02-28',
    readTime: '8 min',
    tags: ['leases', 'templates', 'legal'],
    featured: false,
  },
  {
    id: '5',
    title: 'Maintenance Request Workflow',
    category: 'maintenance',
    excerpt: 'Learn the complete workflow for handling maintenance requests from submission to completion.',
    lastUpdated: '2024-02-15',
    readTime: '10 min',
    tags: ['maintenance', 'workflow', 'requests'],
    featured: true,
  },
  {
    id: '6',
    title: 'Generating Custom Reports',
    category: 'reports',
    excerpt: 'Step-by-step guide to creating and customizing reports for your specific business needs.',
    lastUpdated: '2024-03-10',
    readTime: '6 min',
    tags: ['reports', 'custom', 'analytics'],
    featured: false,
  },
  {
    id: '7',
    title: 'Managing Multiple Properties',
    category: 'properties',
    excerpt: 'Advanced strategies for managing multiple properties efficiently in Dzimba.',
    lastUpdated: '2024-02-22',
    readTime: '8 min',
    tags: ['properties', 'management', 'advanced'],
    featured: false,
  },
  {
    id: '8',
    title: 'Tenant Onboarding Process',
    category: 'tenants',
    excerpt: 'Streamline your tenant onboarding with this comprehensive process guide.',
    lastUpdated: '2024-02-18',
    readTime: '7 min',
    tags: ['tenants', 'onboarding', 'process'],
    featured: false,
  },
  {
    id: '9',
    title: 'Handling Late Payments',
    category: 'payments',
    excerpt: 'Best practices and automated workflows for managing late rent payments.',
    lastUpdated: '2024-03-03',
    readTime: '5 min',
    tags: ['payments', 'late', 'reminders'],
    featured: false,
  },
  {
    id: '10',
    title: 'Lease Renewal Procedures',
    category: 'leases',
    excerpt: 'A guide to the lease renewal process, including notifications and document management.',
    lastUpdated: '2024-02-25',
    readTime: '6 min',
    tags: ['leases', 'renewal', 'procedures'],
    featured: false,
  },
];

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedSections, setExpandedSections] = useState<string[]>(['featured']);

  // Filter articles based on search and active category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return <DocumentTextIcon className="h-5 w-5" />;
    
    const Icon = category.icon;
    return <Icon className="h-5 w-5" />;
  };

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
              <BookOpenIcon className="h-8 w-8 text-zim-green mr-3" />
              <h1 className="text-2xl font-semibold text-gray-900">Knowledge Base</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Find detailed articles and guides for Dzimba Property Management
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

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="mb-4">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-3 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-zim-green sm:text-sm sm:leading-6"
              placeholder="Search the knowledge base..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              activeCategory === 'all'
                ? 'bg-zim-green text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-zim-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="mr-1.5 h-4 w-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div 
          className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('featured')}
        >
          <div className="flex items-center">
            <BookmarkIcon className="h-5 w-5 text-zim-green mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Featured Articles</h2>
          </div>
          <button>
            {expandedSections.includes('featured') ? (
              <MinusIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <PlusIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        
        {expandedSections.includes('featured') && (
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <Link
                  to={`/dashboard/help/kb/${article.id}`}
                  key={article.id}
                  className="relative rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col hover:border-zim-green"
                >
                  {/* Zimbabwe flag-inspired top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex-1 bg-zim-green"></div>
                    <div className="flex-1 bg-yellow-500"></div>
                    <div className="flex-1 bg-red-600"></div>
                    <div className="flex-1 bg-black"></div>
                  </div>

                  <div className="flex items-center mb-2">
                    {getCategoryIcon(article.category)}
                    <span className="ml-2 text-xs font-medium text-gray-500 uppercase">
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-zim-green transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">{article.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-400 mt-auto">
                    <ClockIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{article.readTime} read</span>
                    <span className="mx-2">•</span>
                    <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All Articles Section */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div 
          className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('all-articles')}
        >
          <div className="flex items-center">
            <DocumentTextIcon className="h-5 w-5 text-zim-green mr-2" />
            <h2 className="text-lg font-medium text-gray-900">All Articles</h2>
          </div>
          <button>
            {expandedSections.includes('all-articles') ? (
              <MinusIcon className="h-5 w-5 text-gray-400" />
            ) : (
              <PlusIcon className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        
        {expandedSections.includes('all-articles') && (
          <div className="p-4 sm:p-6">
            {filteredArticles.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <li key={article.id} className="py-4">
                    <Link 
                      to={`/dashboard/help/kb/${article.id}`}
                      className="flex items-start hover:bg-gray-50 p-2 rounded-md -m-2"
                    >
                      <div className="flex-shrink-0 pt-0.5">
                        {getCategoryIcon(article.category)}
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-base font-medium text-gray-900 hover:text-zim-green transition-colors">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{article.excerpt}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                            >
                              <TagIcon className="mr-1 h-3 w-3 text-gray-500" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center text-xs text-gray-400">
                          <ClockIcon className="h-3.5 w-3.5 mr-1" />
                          <span>{article.readTime} read</span>
                          <span className="mx-2">•</span>
                          <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <InformationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">No articles found</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      We couldn't find any articles matching your search criteria. Try adjusting your search terms or selecting a different category.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Help Section */}
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
            <InformationCircleIcon className="h-5 w-5 text-zim-green mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Need More Help?</h2>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-4 hover:border-zim-green hover:shadow-sm transition-all">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zim-green-50 text-zim-green">
                  <ChatBubbleLeftRightIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">Contact Support</h3>
                  <p className="mt-1 text-sm text-gray-500">Reach out to our support team for personalized assistance</p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/dashboard/help/contact"
                  className="inline-flex items-center text-sm font-medium text-zim-green hover:text-zim-green-dark"
                >
                  Contact us
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 p-4 hover:border-zim-green hover:shadow-sm transition-all">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zim-green-50 text-zim-green">
                  <AcademicCapIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">Training Resources</h3>
                  <p className="mt-1 text-sm text-gray-500">Access our comprehensive training materials and videos</p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to="/dashboard/help/training"
                  className="inline-flex items-center text-sm font-medium text-zim-green hover:text-zim-green-dark"
                >
                  View training
                  <ChevronRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase; 