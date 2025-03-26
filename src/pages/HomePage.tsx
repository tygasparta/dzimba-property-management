import React from 'react';
import { Link } from 'react-router-dom';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import Logo from '../components/common/Logo';

const features = [
  {
    name: 'Property Management',
    description: 'Efficiently manage all your properties, units, and amenities in one place.',
    icon: BuildingOfficeIcon,
    color: 'bg-zim-green',
  },
  {
    name: 'Tenant Portal',
    description: 'Streamline communication with tenants through a dedicated portal system.',
    icon: UserGroupIcon,
    color: 'bg-yellow-500',
  },
  {
    name: 'Financial Tracking',
    description: 'Track rent payments, expenses, and generate financial reports easily.',
    icon: CurrencyDollarIcon,
    color: 'bg-red-600',
  },
  {
    name: 'Lease Management',
    description: 'Create, store, and manage lease agreements with automated reminders.',
    icon: DocumentTextIcon,
    color: 'bg-black',
  },
  {
    name: 'Maintenance Requests',
    description: 'Efficiently handle and track all property maintenance requests.',
    icon: ShieldCheckIcon,
    color: 'bg-zim-green',
  },
  {
    name: 'Analytics Dashboard',
    description: 'Gain insights into your property performance with detailed analytics.',
    icon: ChartBarIcon,
    color: 'bg-yellow-500',
  },
];

const benefits = [
  'Reduce administrative workload by up to 80%',
  'Increase rent collection efficiency by 95%',
  'Organize all property documentation in one secure place',
  'Generate comprehensive financial reports instantly',
  'Provide tenants with a modern self-service portal',
  'Track maintenance requests from submission to completion',
];

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo size="medium" />
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-600 hover:text-zim-green font-medium">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-zim-green font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-zim-green font-medium">Pricing</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-zim-green hover:text-zim-green-dark font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section with modern 3D effect and Zimbabwe colors */}
      <div className="relative overflow-hidden">
        {/* Background elements with Zimbabwe colors */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diagonal flag stripes */}
          <div className="absolute -top-10 -left-24 w-2/3 h-96 bg-zim-green opacity-15 transform rotate-12 rounded-3xl"></div>
          <div className="absolute top-32 -right-24 w-1/2 h-96 bg-yellow-500 opacity-10 transform -rotate-12 rounded-3xl"></div>
          <div className="absolute -bottom-10 left-1/4 w-1/2 h-64 bg-red-600 opacity-10 transform rotate-6 rounded-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-black opacity-5 transform rotate-45 rounded-3xl"></div>
          
          {/* Blurred circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-zim-green opacity-10 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-yellow-500 opacity-15 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-red-600 opacity-10 blur-3xl"></div>
          
          {/* Flag color strip at top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600"></div>
        </div>

        <div className="relative max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-zim-green to-zim-green-dark text-white mb-5 shadow-sm">
                #1 Property Management Solution in Zimbabwe
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Manage Properties</span>
                <span className="block bg-gradient-to-r from-zim-green via-yellow-600 to-red-600 text-transparent bg-clip-text mt-1">With Confidence</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                The all-in-one property management platform designed specifically for Zimbabwe's unique real estate market.
              </p>
              
              <div className="mt-6 space-y-3 max-w-lg mx-auto lg:mx-0">
                {benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full ${
                      ['bg-zim-green', 'bg-yellow-500', 'bg-red-600'][index % 3]
                    } flex items-center justify-center shadow-sm`}>
                      <CheckCircleIcon className="h-4 w-4 text-white flex-shrink-0" />
                    </div>
                    <p className="ml-3 text-base text-gray-500">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/login"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-lg transform transition duration-200 hover:-translate-y-1 bg-gradient-to-r from-zim-green to-zim-green-dark hover:from-zim-green-dark hover:to-zim-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-3 border-2 border-zim-green text-base font-medium rounded-md text-zim-green bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green transition-all duration-200 hover:shadow-md"
                >
                  Free Demo
                </Link>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                <div className="flex -space-x-1 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`inline-block h-8 w-8 rounded-full ring-2 ring-white ${
                      ['bg-zim-green', 'bg-yellow-500', 'bg-red-600', 'bg-black', 'bg-zim-green'][i]
                    }`}></div>
                  ))}
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                    ))}
                  </div>
                  <span>Trusted by 500+ property managers across Zimbabwe</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-4/5 bg-gradient-to-br from-zim-green/10 via-yellow-500/10 to-red-600/10 rounded-3xl transform rotate-6"></div>
              </div>
              
              {/* Card with Zimbabwe flag corner accent */}
              <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-0 right-0 w-0 h-0 
                       border-t-[80px] border-r-[80px] 
                       border-t-zim-green border-r-transparent"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 
                       border-t-[60px] border-r-[60px] 
                       border-t-yellow-500 border-r-transparent"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 
                       border-t-[40px] border-r-[40px] 
                       border-t-red-600 border-r-transparent"></div>
                  <div className="absolute top-0 right-0 w-0 h-0 
                       border-t-[20px] border-r-[20px] 
                       border-t-black border-r-transparent"></div>
                </div>
                
                <div className="p-6 lg:p-8">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                    <div className="p-8 grid grid-cols-2 gap-4">
                      {/* App interface mockup with Zimbabwe colors */}
                      <div className="bg-white rounded-lg shadow-lg p-4 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 rounded-md bg-zim-green flex items-center justify-center">
                            <BuildingOfficeIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3">
                            <div className="h-2.5 w-20 bg-gray-200 rounded"></div>
                            <div className="h-2 w-12 bg-gray-100 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-4 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 rounded-md bg-yellow-500 flex items-center justify-center">
                            <UserGroupIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3">
                            <div className="h-2.5 w-20 bg-gray-200 rounded"></div>
                            <div className="h-2 w-12 bg-gray-100 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-4 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 rounded-md bg-red-600 flex items-center justify-center">
                            <CurrencyDollarIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3">
                            <div className="h-2.5 w-20 bg-gray-200 rounded"></div>
                            <div className="h-2 w-12 bg-gray-100 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-4 transform hover:-translate-y-1 transition duration-300">
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 rounded-md bg-black flex items-center justify-center">
                            <DocumentTextIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-3">
                            <div className="h-2.5 w-20 bg-gray-200 rounded"></div>
                            <div className="h-2 w-12 bg-gray-100 rounded mt-1"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded"></div>
                          <div className="h-2 bg-gray-200 rounded w-4/5"></div>
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

      {/* Features section with glass-morphism effect */}
      <div id="features" className="py-24 bg-white relative overflow-hidden">
        {/* Flag color decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Diagonal stripes */}
          <div className="absolute top-0 -right-60 w-full h-96 bg-zim-green opacity-5 transform -rotate-45"></div>
          <div className="absolute top-20 -left-60 w-full h-64 bg-yellow-500 opacity-5 transform rotate-45"></div>
          <div className="absolute bottom-20 -right-60 w-full h-64 bg-red-600 opacity-5 transform -rotate-45"></div>
          
          {/* Blurred dots */}
          <div className="absolute top-1/4 right-10 w-32 h-32 rounded-full bg-zim-green opacity-10 blur-xl"></div>
          <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-yellow-500 opacity-10 blur-xl"></div>
          <div className="absolute top-3/4 right-1/3 w-24 h-24 rounded-full bg-red-600 opacity-10 blur-xl"></div>
          <div className="absolute top-10 left-1/3 w-16 h-16 rounded-full bg-black opacity-5 blur-xl"></div>
        </div>
        
        {/* Flag color strip at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide bg-gradient-to-r from-zim-green via-yellow-600 to-red-600 text-transparent bg-clip-text inline-block">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              Everything you need to manage properties
            </p>
            <p className="mt-6 max-w-2xl text-xl text-gray-500 mx-auto">
              Our comprehensive platform provides all the tools property managers in Zimbabwe need to streamline operations.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={feature.name} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600 rounded-2xl opacity-75 blur group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-gradient-xy"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className={`${feature.color} rounded-xl h-12 w-12 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-zim-green transition-colors duration-300">
                        {feature.name}
                      </h3>
                      <p className="mt-4 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                    <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to="/login" className="text-sm font-medium text-zim-green flex items-center">
                        Learn more
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials with Zimbabwe flag colors */}
      <div id="testimonials" className="bg-gradient-to-br from-gray-50 to-white py-24 relative overflow-hidden">
        {/* Flag color decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative stripes */}
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zim-green opacity-5 transform rotate-45 rounded-3xl"></div>
          <div className="absolute top-10 -right-20 w-64 h-96 bg-yellow-500 opacity-5 transform -rotate-12 rounded-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-red-600 opacity-5 transform rotate-12 rounded-3xl"></div>
          
          {/* Blurred elements */}
          <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-zim-green opacity-10 blur-2xl"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-yellow-500 opacity-10 blur-2xl"></div>
          <div className="absolute top-10 right-1/3 w-32 h-32 rounded-full bg-red-600 opacity-10 blur-2xl"></div>
        </div>
        
        {/* Flag color accents */}
        <div className="absolute top-0 left-0 right-0">
          <div className="flex">
            <div className="h-2 flex-1 bg-zim-green"></div>
            <div className="h-2 flex-1 bg-yellow-500"></div>
            <div className="h-2 flex-1 bg-red-600"></div>
            <div className="h-2 flex-1 bg-black"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by property professionals across Zimbabwe
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Hear what our clients have to say about Dzimba Property Management System
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Moyo",
                role: "Property Manager, Harare",
                image: "bg-zim-green",
                initials: "JM",
                quote: "Dzimba has transformed how we manage our properties. The intuitive interface and comprehensive features have reduced our administrative workload significantly."
              },
              {
                name: "Tendai Nyoni",
                role: "Real Estate Investor",
                image: "bg-yellow-500",
                initials: "TN",
                quote: "The financial tracking is exceptional. I can easily monitor rent collections, expenses, and generate detailed reports for all my investment properties."
              },
              {
                name: "Ruth Zimuto",
                role: "Landlord, Bulawayo",
                image: "bg-red-600",
                initials: "RZ",
                quote: "My tenants love the portal where they can submit maintenance requests and pay rent online. It's made communication so much easier and more efficient."
              }
            ].map((testimonial, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600 rounded-xl opacity-75 blur group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600"></div>
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className={`h-12 w-12 rounded-full ${testimonial.image} flex items-center justify-center text-white font-bold shadow-md`}>
                        {testimonial.initials}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="relative">
                      <div className="absolute -top-2 -left-2 text-zim-green opacity-20 text-4xl">"</div>
                      <p className="text-gray-700 italic relative z-10 pl-2">{testimonial.quote}</p>
                      <div className="absolute -bottom-6 -right-2 text-zim-green opacity-20 text-4xl transform rotate-180">"</div>
                    </blockquote>
                    <div className="mt-6 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section with Zimbabwe flag colors */}
      <div id="pricing" className="relative py-16 sm:py-24 overflow-hidden">
        {/* Zimbabwe flag-inspired background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600 opacity-70"></div>
          <div className="absolute -bottom-10 -left-24 w-96 h-96 rounded-full bg-zim-green opacity-15 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-zim-green opacity-10"></div>
          <div className="absolute -top-10 right-10 w-72 h-72 rounded-full bg-yellow-500 opacity-15 blur-3xl"></div>
          <div className="absolute top-20 left-1/3 w-64 h-64 rounded-full bg-red-600 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-1/3 w-64 h-64 rounded-full bg-black opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:px-20 xl:py-20 xl:px-24 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zim-green via-yellow-500 to-red-600"></div>
              
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="block">Ready to simplify your</span>
                    <span className="block text-zim-green">property management?</span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-500 max-w-3xl">
                    Join hundreds of property managers across Zimbabwe who have already transformed their business with Dzimba.
                  </p>
                  <div className="mt-8 space-y-4">
                    {benefits.slice(3).map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full ${
                          ['bg-zim-green', 'bg-yellow-500', 'bg-red-600', 'bg-black'][index % 4]
                        } flex items-center justify-center`}>
                          <CheckCircleIcon className="h-4 w-4 text-white flex-shrink-0" />
                        </div>
                        <p className="ml-3 text-base text-gray-500">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-12 lg:mt-0 flex flex-col justify-center relative">
                  <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-xl bg-yellow-500 opacity-10 rotate-12"></div>
                    <div className="absolute -right-2 -bottom-2 h-16 w-16 rounded-xl bg-red-600 opacity-10 rotate-45"></div>
                    <div className="absolute -left-2 -bottom-2 h-20 w-20 rounded-xl bg-black opacity-5 -rotate-12"></div>
                    
                    <div className="bg-gradient-to-br from-zim-green-50 to-white py-10 px-6 rounded-xl sm:px-10 lg:py-12 border border-gray-100 shadow-lg relative z-10">
                      <div className="absolute top-0 right-0 h-16 w-16">
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-16 border-r-16 border-t-yellow-500 border-r-transparent opacity-30"></div>
                      </div>
                      
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zim-green text-white mb-6 shadow-lg">
                        <BuildingOfficeIcon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Start managing properties today</h3>
                      <p className="mt-2 text-gray-600">
                        No credit card required. Get full access to all features for 14 days.
                      </p>
                      <div className="mt-8 flex flex-col space-y-3">
                        <Link
                          to="/register"
                          className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-lg transform transition duration-200 hover:-translate-y-1 bg-gradient-to-r from-zim-green to-zim-green-dark hover:from-zim-green-dark hover:to-zim-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green-dark"
                        >
                          Create free account
                        </Link>
                        <Link
                          to="/login"
                          className="flex items-center justify-center px-5 py-3 border-2 border-zim-green text-base font-medium rounded-md text-zim-green bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green transition-all duration-200 hover:shadow-md"
                        >
                          Sign in
                        </Link>
                        
                        <div className="pt-5 mt-5 border-t border-gray-200">
                          <div className="flex items-center">
                            <div className="flex -space-x-1 overflow-hidden">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className={`inline-block h-6 w-6 rounded-full ring-2 ring-white ${
                                  ['bg-zim-green', 'bg-yellow-500', 'bg-red-600', 'bg-black'][i]
                                }`}></div>
                              ))}
                            </div>
                            <p className="ml-3 text-xs text-gray-500">Join property managers across Zimbabwe</p>
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
      </div>

      {/* Footer with Zimbabwe flag colors */}
      <footer className="bg-zim-green pt-12 pb-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between pb-8 border-b border-white border-opacity-20">
            <div className="mb-8 md:mb-0">
              <Logo size="large" variant="light" />
              <p className="mt-4 max-w-xs text-zim-green-100">
                The complete property management solution for Zimbabwean property professionals.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">Features</h3>
                <ul className="mt-4 space-y-2">
                  {features.slice(0, 3).map(feature => (
                    <li key={feature.name}>
                      <Link to="/login" className="text-base text-zim-green-100 hover:text-white">
                        {feature.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="#" className="text-base text-zim-green-100 hover:text-white">Documentation</Link></li>
                  <li><Link to="#" className="text-base text-zim-green-100 hover:text-white">Guides</Link></li>
                  <li><Link to="#" className="text-base text-zim-green-100 hover:text-white">API Reference</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="#" className="text-base text-zim-green-100 hover:text-white">About</Link></li>
                  <li><Link to="#" className="text-base text-zim-green-100 hover:text-white">Contact</Link></li>
                  <li><Link to="#" className="text-base text-zim-green-100 hover:text-white">Careers</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zim-green-100">&copy; {new Date().getFullYear()} Dzimba Property Management. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="flex space-x-1">
                <div className="h-2 w-10 bg-zim-green-dark rounded-l-full"></div>
                <div className="h-2 w-10 bg-yellow-500"></div>
                <div className="h-2 w-10 bg-red-600"></div>
                <div className="h-2 w-10 bg-black rounded-r-full"></div>
              </div>
              <p className="ml-4 text-sm text-zim-green-100">Proudly made in Zimbabwe</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 