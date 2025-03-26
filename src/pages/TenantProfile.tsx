import React, { useState } from 'react';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  KeyIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function TenantProfile() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Mock tenant data
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'tenant@dzimba.com',
    phone: '+263 77 123 4567',
    profileImage: null as File | null,
    profileImageUrl: '',
  });
  
  // Mock security settings
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Mock notification preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailRentReminders: true,
    emailMaintenanceUpdates: true,
    emailCommunityNotices: true,
    smsRentReminders: false,
    smsMaintenanceUpdates: true,
    smsCommunityNotices: false,
  });
  
  // Mock contact preferences
  const [contactPreferences, setContactPreferences] = useState({
    preferredContactMethod: 'email',
    communicationLanguage: 'english',
    receiveMarketingEmails: false,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityData({
      ...securityData,
      [name]: value,
    });
  };
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationPreferences({
      ...notificationPreferences,
      [name]: checked,
    });
  };
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setContactPreferences({
      ...contactPreferences,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileData({
        ...profileData,
        profileImage: file,
        profileImageUrl: URL.createObjectURL(file),
      });
    }
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update profile
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Profile information updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password validation
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call to update password
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Password changed successfully!');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update notification preferences
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Notification preferences updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to update contact preferences
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Contact preferences updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your personal information, security, and communication preferences
          </p>
        </div>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('profile')}
              className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-zim-green text-zim-green'
                  : ''
              }`}
            >
              <UserCircleIcon className="h-5 w-5 inline-block mr-2 -mt-1" />
              Personal Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-zim-green text-zim-green'
                  : ''
              }`}
            >
              <KeyIcon className="h-5 w-5 inline-block mr-2 -mt-1" />
              Password & Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-zim-green text-zim-green'
                  : ''
              }`}
            >
              <BellIcon className="h-5 w-5 inline-block mr-2 -mt-1" />
              Notification Preferences
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-zim-green text-zim-green'
                  : ''
              }`}
            >
              <DevicePhoneMobileIcon className="h-5 w-5 inline-block mr-2 -mt-1" />
              Contact Preferences
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {profileData.profileImageUrl ? (
                      <img
                        src={profileData.profileImageUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-24 w-24 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="profileImage"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green cursor-pointer"
                    >
                      <ArrowPathIcon className="h-4 w-4 mr-2" />
                      Change Photo
                    </label>
                    <input
                      id="profileImage"
                      name="profileImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </div>
                </div>
                
                {/* Personal Information Fields */}
                <div className="flex-1 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          <EnvelopeIcon className="h-4 w-4" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          <PhoneIcon className="h-4 w-4" />
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="flex-1 block w-full border border-gray-300 rounded-none rounded-r-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'security' && (
            <form onSubmit={handleSecuritySubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={securityData.currentPassword}
                    onChange={handleSecurityChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                    required
                  />
                </div>
                <div className="sm:col-span-2 border-t pt-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={securityData.newPassword}
                        onChange={handleSecurityChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                        required
                        minLength={8}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters
                      </p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={securityData.confirmPassword}
                        onChange={handleSecurityChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'notifications' && (
            <form onSubmit={handleNotificationSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailRentReminders"
                        name="emailRentReminders"
                        type="checkbox"
                        checked={notificationPreferences.emailRentReminders}
                        onChange={handleNotificationChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailRentReminders" className="font-medium text-gray-700">
                        Rent and Payment Reminders
                      </label>
                      <p className="text-gray-500">Receive email notifications when rent is due or payments are processed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailMaintenanceUpdates"
                        name="emailMaintenanceUpdates"
                        type="checkbox"
                        checked={notificationPreferences.emailMaintenanceUpdates}
                        onChange={handleNotificationChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailMaintenanceUpdates" className="font-medium text-gray-700">
                        Maintenance Updates
                      </label>
                      <p className="text-gray-500">Receive email notifications about maintenance requests and updates</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="emailCommunityNotices"
                        name="emailCommunityNotices"
                        type="checkbox"
                        checked={notificationPreferences.emailCommunityNotices}
                        onChange={handleNotificationChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="emailCommunityNotices" className="font-medium text-gray-700">
                        Community Notices
                      </label>
                      <p className="text-gray-500">Receive email notifications about community events and important notices</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="smsRentReminders"
                        name="smsRentReminders"
                        type="checkbox"
                        checked={notificationPreferences.smsRentReminders}
                        onChange={handleNotificationChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="smsRentReminders" className="font-medium text-gray-700">
                        Rent and Payment Reminders
                      </label>
                      <p className="text-gray-500">Receive SMS notifications when rent is due or payments are processed</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="smsMaintenanceUpdates"
                        name="smsMaintenanceUpdates"
                        type="checkbox"
                        checked={notificationPreferences.smsMaintenanceUpdates}
                        onChange={handleNotificationChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="smsMaintenanceUpdates" className="font-medium text-gray-700">
                        Maintenance Updates
                      </label>
                      <p className="text-gray-500">Receive SMS notifications about maintenance requests and updates</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="smsCommunityNotices"
                        name="smsCommunityNotices"
                        type="checkbox"
                        checked={notificationPreferences.smsCommunityNotices}
                        onChange={handleNotificationChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="smsCommunityNotices" className="font-medium text-gray-700">
                        Community Notices
                      </label>
                      <p className="text-gray-500">Receive SMS notifications about community events and important notices</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>
          )}
          
          {activeTab === 'contact' && (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-gray-700">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferredContactMethod"
                    name="preferredContactMethod"
                    value={contactPreferences.preferredContactMethod}
                    onChange={handleContactChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm rounded-md"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="communicationLanguage" className="block text-sm font-medium text-gray-700">
                    Communication Language
                  </label>
                  <select
                    id="communicationLanguage"
                    name="communicationLanguage"
                    value={contactPreferences.communicationLanguage}
                    onChange={handleContactChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-zim-green focus:border-zim-green sm:text-sm rounded-md"
                  >
                    <option value="english">English</option>
                    <option value="shona">Shona</option>
                    <option value="ndebele">Ndebele</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="receiveMarketingEmails"
                        name="receiveMarketingEmails"
                        type="checkbox"
                        checked={contactPreferences.receiveMarketingEmails}
                        onChange={handleContactChange}
                        className="focus:ring-zim-green h-4 w-4 text-zim-green border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="receiveMarketingEmails" className="font-medium text-gray-700">
                        Marketing Communications
                      </label>
                      <p className="text-gray-500">
                        Receive emails about new properties, services, and promotions from Dzimba
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 