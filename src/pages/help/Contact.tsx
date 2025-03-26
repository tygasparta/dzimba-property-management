import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

const ContactSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would submit the form data to your backend here
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
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
              <PhoneIcon className="h-8 w-8 text-zim-green mr-3" />
              <h1 className="text-2xl font-semibold text-gray-900">Contact Support</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Get in touch with our support team for assistance
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
              {/* Zimbabwe flag-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-zim-green-50 p-2 rounded-full border border-zim-green-100">
                  <EnvelopeIcon className="h-6 w-6 text-zim-green" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-500">support@dzimba.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-50 p-2 rounded-full border border-yellow-100">
                  <PhoneIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-500">+263 77 123 4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-50 p-2 rounded-full border border-red-100">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Live Chat</h3>
                  <p className="text-sm text-gray-500">Available during business hours</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gray-100 p-2 rounded-full border border-gray-200">
                  <MapPinIcon className="h-6 w-6 text-gray-700" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Visit Us</h3>
                  <p className="text-sm text-gray-500">Harare Office: 123 Main Street</p>
                </div>
              </div>
            </div>
            
            {/* Support Hours */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <ClockIcon className="h-5 w-5 text-zim-green mr-2" />
                <h3 className="text-sm font-medium text-gray-900">Support Hours</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="h-2 w-2 rounded-full bg-zim-green mr-2"></span>
                  <span className="text-gray-500">Monday to Friday: 8:00 AM - 6:00 PM (CAT)</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-gray-500">Saturday: 9:00 AM - 1:00 PM (CAT)</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-600 mr-2"></span>
                  <span className="text-gray-500">Sunday: Closed</span>
                </div>
              </div>
            </div>
            
            {/* Offices */}
            <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <BuildingOfficeIcon className="h-5 w-5 text-zim-green mr-2" />
                <h3 className="text-sm font-medium text-gray-900">Our Offices</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Harare (Headquarters)</h4>
                  <p className="text-sm text-gray-500 mt-1">123 Main Street, Harare</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Bulawayo</h4>
                  <p className="text-sm text-gray-500 mt-1">456 Oak Avenue, Bulawayo</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Mutare</h4>
                  <p className="text-sm text-gray-500 mt-1">789 Cedar Road, Mutare</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
              {/* Zimbabwe flag-inspired top border */}
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Send us a message</h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>
            <div className="p-4 sm:p-6">
              {formSubmitted ? (
                <div className="rounded-md bg-zim-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-zim-green" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-zim-green-800">Message sent successfully</h3>
                      <div className="mt-2 text-sm text-zim-green-700">
                        <p>Thank you for contacting us. We'll respond to your inquiry as soon as possible.</p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            type="button"
                            onClick={() => setFormSubmitted(false)}
                            className="rounded-md bg-zim-green-50 px-2 py-1.5 text-sm font-medium text-zim-green-800 hover:bg-zim-green-100 focus:outline-none focus:ring-2 focus:ring-zim-green-600 focus:ring-offset-2 focus:ring-offset-zim-green-50"
                          >
                            Send another message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone number
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <div className="mt-1">
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Please provide as much detail as possible to help us assist you better.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-zim-green py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2"
                    >
                      Send message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 relative">
          {/* Zimbabwe flag-inspired top border */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-zim-green"></div>
            <div className="flex-1 bg-yellow-500"></div>
            <div className="flex-1 bg-red-600"></div>
            <div className="flex-1 bg-black"></div>
          </div>
          <h2 className="text-lg font-medium text-gray-900">Frequently Asked Support Questions</h2>
        </div>
        <div className="p-4 sm:p-6">
          <dl className="space-y-6 divide-y divide-gray-200">
            <div className="pt-6 md:grid md:grid-cols-12 md:gap-8">
              <dt className="text-base font-medium text-gray-900 md:col-span-5">
                What is the typical response time for support inquiries?
              </dt>
              <dd className="mt-2 md:mt-0 md:col-span-7">
                <p className="text-base text-gray-500">
                  We typically respond to inquiries within 24 hours during business days. For urgent matters, we strive to respond within 4 hours during business hours.
                </p>
              </dd>
            </div>
            <div className="pt-6 md:grid md:grid-cols-12 md:gap-8">
              <dt className="text-base font-medium text-gray-900 md:col-span-5">
                How do I report a technical issue with the system?
              </dt>
              <dd className="mt-2 md:mt-0 md:col-span-7">
                <p className="text-base text-gray-500">
                  You can report technical issues through this contact form, by email to support@dzimba.com, or by calling our technical support line at +263 77 123 4567. Please provide as much detail as possible, including screenshots if available.
                </p>
              </dd>
            </div>
            <div className="pt-6 md:grid md:grid-cols-12 md:gap-8">
              <dt className="text-base font-medium text-gray-900 md:col-span-5">
                Do you offer on-site support for complex issues?
              </dt>
              <dd className="mt-2 md:mt-0 md:col-span-7">
                <p className="text-base text-gray-500">
                  Yes, we offer on-site support for complex issues that cannot be resolved remotely. On-site support is available in Harare, Bulawayo, and Mutare, and can be arranged for other locations by contacting our support team.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport; 