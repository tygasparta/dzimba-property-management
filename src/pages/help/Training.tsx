import React from 'react';
import {
  AcademicCapIcon,
  VideoCameraIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const trainingCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Learn the basics of Dzimba Property Management',
    icon: AcademicCapIcon,
    color: 'bg-zim-green-50 text-zim-green border-zim-green',
  },
  {
    id: 'admin-training',
    name: 'Administrator Training',
    description: 'Advanced training for system administrators',
    icon: BookOpenIcon,
    color: 'bg-yellow-50 text-yellow-600 border-yellow-500',
  },
  {
    id: 'user-guides',
    name: 'User Guides',
    description: 'Detailed guides for everyday users',
    icon: DocumentTextIcon,
    color: 'bg-red-50 text-red-600 border-red-500',
  },
  {
    id: 'video-tutorials',
    name: 'Video Tutorials',
    description: 'Step-by-step video tutorials',
    icon: VideoCameraIcon,
    color: 'bg-black bg-opacity-5 text-black border-gray-800',
  },
];

const trainingResources = [
  {
    id: '1',
    title: 'Property Management Basics',
    category: 'getting-started',
    type: 'video',
    duration: '15 min',
    description: 'Learn the basics of managing properties in Dzimba',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/009B4E/FFFFFF?text=Property+Basics',
  },
  {
    id: '2',
    title: 'Tenant Management',
    category: 'getting-started',
    type: 'guide',
    pages: 12,
    description: 'Comprehensive guide to managing tenants',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/FFD200/000000?text=Tenant+Management',
  },
  {
    id: '3',
    title: 'Lease Agreement Setup',
    category: 'admin-training',
    type: 'video',
    duration: '20 min',
    description: 'How to set up and manage lease agreements',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/EF3340/FFFFFF?text=Lease+Setup',
  },
  {
    id: '4',
    title: 'Financial Management',
    category: 'admin-training',
    type: 'guide',
    pages: 25,
    description: 'Advanced guide for financial tracking and reporting',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/000000/FFFFFF?text=Financial+Management',
  },
  {
    id: '5',
    title: 'Payment Processing',
    category: 'user-guides',
    type: 'guide',
    pages: 10,
    description: 'Step-by-step guide to processing payments',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/009B4E/FFFFFF?text=Payment+Processing',
  },
  {
    id: '6',
    title: 'Maintenance Request Handling',
    category: 'user-guides',
    type: 'video',
    duration: '18 min',
    description: 'Learn how to handle maintenance requests efficiently',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/FFD200/000000?text=Maintenance+Requests',
  },
  {
    id: '7',
    title: 'Reporting Features Tour',
    category: 'video-tutorials',
    type: 'video',
    duration: '25 min',
    description: 'Comprehensive tour of all reporting features',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/EF3340/FFFFFF?text=Reporting+Features',
  },
  {
    id: '8',
    title: 'System Configuration',
    category: 'video-tutorials',
    type: 'video',
    duration: '30 min',
    description: 'Advanced configuration options for administrators',
    url: '#',
    thumbnail: 'https://placehold.co/300x200/000000/FFFFFF?text=System+Configuration',
  },
];

const TrainingResources: React.FC = () => {
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
              <AcademicCapIcon className="h-8 w-8 text-zim-green mr-3" />
              <h1 className="text-2xl font-semibold text-gray-900">Training Resources</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Access comprehensive training materials for Dzimba Property Management
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

      {/* Training Categories */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trainingCategories.map((category) => (
          <div
            key={category.id}
            className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center hover:border-zim-green group"
          >
            {/* Zimbabwe flag-inspired top border */}
            <div className="absolute top-0 left-0 right-0 h-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex-1 bg-zim-green"></div>
              <div className="flex-1 bg-yellow-500"></div>
              <div className="flex-1 bg-red-600"></div>
              <div className="flex-1 bg-black"></div>
            </div>
            
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${category.color.split(' ').slice(0, 2).join(' ')} mb-4 transition-transform group-hover:scale-110`}>
              <category.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Featured Resources */}
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
            <BookOpenIcon className="h-6 w-6 text-zim-green mr-2" />
            <div>
              <h2 className="text-lg font-medium text-gray-900">Featured Resources</h2>
              <p className="mt-1 text-sm text-gray-500">
                Most popular training materials to get you started
              </p>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trainingResources.slice(0, 4).map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="aspect-h-2 aspect-w-3 bg-gray-200 relative">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="h-48 w-full object-cover"
                  />
                  {resource.type === 'video' && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {resource.duration}
                    </div>
                  )}
                  {resource.type === 'guide' && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {resource.pages} pages
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-zim-green transition-colors">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{resource.description}</p>
                  <div className="mt-auto pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.type === 'video' ? 'Video' : 'Guide'}
                    </span>
                    <span className="text-xs text-zim-green font-medium group-hover:underline">
                      View resource
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">All Training Resources</h3>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Duration/Pages</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {trainingResources.map((resource) => {
                    const category = trainingCategories.find(c => c.id === resource.category);
                    return (
                      <tr key={resource.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {resource.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category?.color}`}>
                            {trainingCategories.find(c => c.id === resource.category)?.name}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                          {resource.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {resource.type === 'video' ? resource.duration : `${resource.pages} pages`}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href={resource.url} className="text-zim-green hover:text-zim-green-600">
                            View<span className="sr-only">, {resource.title}</span>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Certification Paths</h3>
            <div className="bg-zim-green-50 border border-zim-green-100 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-zim-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-zim-green-800">Become a Certified Dzimba Administrator</h3>
                  <div className="mt-2 text-sm text-zim-green-700">
                    <p>Complete our administrator training path to become certified in Dzimba Property Management. The certification includes hands-on exercises and a final exam.</p>
                  </div>
                  <div className="mt-4">
                    <div className="-mx-2 -my-1.5 flex">
                      <button type="button" className="bg-zim-green-50 px-3 py-2 rounded-md text-sm font-medium text-zim-green-800 hover:bg-zim-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zim-green-50 focus:ring-zim-green-600">
                        View Certification Path
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingResources; 