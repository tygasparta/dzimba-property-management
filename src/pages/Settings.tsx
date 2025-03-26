import React, { useState, useRef } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  UserIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  SwatchIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  CameraIcon,
  KeyIcon,
  LockClosedIcon,
  DocumentTextIcon,
  CreditCardIcon,
  BanknotesIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  EyeSlashIcon,
  PaintBrushIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const tabs = [
  { name: 'General', icon: Cog6ToothIcon },
  { name: 'Profile', icon: UserIcon },
  { name: 'Notifications', icon: BellIcon },
  { name: 'Security', icon: ShieldCheckIcon },
  { name: 'Billing', icon: CurrencyDollarIcon },
  { name: 'Properties', icon: BuildingOfficeIcon },
  { name: 'Appearance', icon: SwatchIcon },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // General settings state
  const [companyName, setCompanyName] = useState('Dzimba Property Management');
  const [timezone, setTimezone] = useState('Africa/Harare');
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [language, setLanguage] = useState('en');
  
  // Profile settings state
  const [profileData, setProfileData] = useState({
    fullName: 'Admin User',
    email: 'admin@dzimba.com',
    phone: '+263 77 123 4567',
    jobTitle: 'Property Manager',
    bio: 'Experienced property manager with over 5 years in real estate management across Zimbabwe.',
    avatarUrl: 'https://placehold.co/200x200/009B4E/FFFFFF?text=AU'
  });
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [leaseReminders, setLeaseReminders] = useState(true);
  const [newTenantAlerts, setNewTenantAlerts] = useState(true);
  const [propertyUpdates, setPropertyUpdates] = useState(true);
  
  // Security settings state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  
  // Billing settings state
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [autoRenew, setAutoRenew] = useState(true);
  
  // Properties settings state
  const [defaultLeaseTerm, setDefaultLeaseTerm] = useState('12');
  const [defaultDepositAmount, setDefaultDepositAmount] = useState('1');
  const [maintenanceThreshold, setMaintenanceThreshold] = useState('100');
  const [showVacantOnly, setShowVacantOnly] = useState(false);
  
  // Appearance settings state
  const [theme, setTheme] = useState('system');
  const [colorMode, setColorMode] = useState('default');
  const [fontSize, setFontSize] = useState('medium');
  const [denseMode, setDenseMode] = useState(false);

  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Profile image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileData({
            ...profileData,
            avatarUrl: e.target.result as string
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Password validation
  const isPasswordValid = () => {
    return newPassword.length >= 8 && 
      newPassword === confirmPassword && 
      currentPassword.length > 0;
  };

  // Update profile handler
  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">General Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure your basic system preferences</p>
            </div>

            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="company-name"
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <div className="mt-1">
                <select
                  id="language"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="en">English</option>
                  <option value="sn">Shona</option>
                  <option value="nd">Ndebele</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                Timezone
              </label>
              <div className="mt-1">
                <select
                  id="timezone"
                  name="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="Africa/Harare">Africa/Harare (UTC+02:00)</option>
                  <option value="Africa/Johannesburg">Africa/Johannesburg (UTC+02:00)</option>
                  <option value="Africa/Lagos">Africa/Lagos (UTC+01:00)</option>
                  <option value="Africa/Nairobi">Africa/Nairobi (UTC+03:00)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <div className="mt-1">
                <select
                  id="currency"
                  name="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="ZWL">ZWL - Zimbabwean Dollar</option>
                  <option value="ZAR">ZAR - South African Rand</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">
                Date Format
              </label>
              <div className="mt-1">
                <select
                  id="date-format"
                  name="date-format"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-500">Update your personal information and preferences</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img 
                    src={profileData.avatarUrl} 
                    alt="Profile" 
                    className="h-32 w-32 rounded-full object-cover border-2 border-zim-green"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-zim-green h-8 w-8 rounded-full flex items-center justify-center text-white"
                  >
                    <CameraIcon className="h-5 w-5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="full-name"
                      value={profileData.fullName}
                      onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        value={profileData.email}
                        onChange={(e) => handleProfileUpdate('email', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="job-title"
                      value={profileData.jobTitle}
                      onChange={(e) => handleProfileUpdate('jobTitle', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">Configure how and when you receive notifications</p>
            </div>

            <div className="space-y-4">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="email-notifications"
                    name="email-notifications"
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="email-notifications" className="font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-gray-500">Receive notifications via email</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="sms-notifications"
                    name="sms-notifications"
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={(e) => setSmsNotifications(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                    SMS Notifications
                  </label>
                  <p className="text-gray-500">Receive notifications via SMS</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">Notification Types</h3>
                <div className="mt-4 space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="payment-reminders"
                        name="payment-reminders"
                        type="checkbox"
                        checked={paymentReminders}
                        onChange={(e) => setPaymentReminders(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="payment-reminders" className="font-medium text-gray-700">
                        Payment Reminders
                      </label>
                      <p className="text-gray-500">Notifications about upcoming and overdue payments</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="maintenance-alerts"
                        name="maintenance-alerts"
                        type="checkbox"
                        checked={maintenanceAlerts}
                        onChange={(e) => setMaintenanceAlerts(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="maintenance-alerts" className="font-medium text-gray-700">
                        Maintenance Alerts
                      </label>
                      <p className="text-gray-500">Updates about maintenance requests</p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="lease-reminders"
                        name="lease-reminders"
                        type="checkbox"
                        checked={leaseReminders}
                        onChange={(e) => setLeaseReminders(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="lease-reminders" className="font-medium text-gray-700">
                        Lease Expiration Reminders
                      </label>
                      <p className="text-gray-500">Notifications about upcoming lease expirations</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="new-tenant-alerts"
                        name="new-tenant-alerts"
                        type="checkbox"
                        checked={newTenantAlerts}
                        onChange={(e) => setNewTenantAlerts(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="new-tenant-alerts" className="font-medium text-gray-700">
                        New Tenant Alerts
                      </label>
                      <p className="text-gray-500">Notifications when new tenants are added</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="property-updates"
                        name="property-updates"
                        type="checkbox"
                        checked={propertyUpdates}
                        onChange={(e) => setPropertyUpdates(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="property-updates" className="font-medium text-gray-700">
                        Property Updates
                      </label>
                      <p className="text-gray-500">Notifications about property changes and updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your password and account security</p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-medium text-gray-900 flex items-center">
                  <KeyIcon className="h-5 w-5 text-zim-green mr-2" />
                  Password Change
                </h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="current-password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="mt-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  {newPassword && newPassword.length < 8 && (
                    <div className="rounded-md bg-yellow-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-yellow-800">
                            Password must be at least 8 characters
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <div className="rounded-md bg-red-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-red-800">
                            Passwords do not match
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={!isPasswordValid()}
                      className="inline-flex items-center rounded-md border border-transparent bg-zim-green px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-medium text-gray-900 flex items-center">
                  <LockClosedIcon className="h-5 w-5 text-zim-green mr-2" />
                  Two-Factor Authentication
                </h3>
                <div className="mt-4">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="two-factor"
                        name="two-factor"
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="two-factor" className="font-medium text-gray-700">
                        Enable Two-Factor Authentication
                      </label>
                      <p className="text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                  </div>
                  
                  {twoFactorEnabled && (
                    <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <p className="text-sm text-gray-700">
                        Two-factor authentication is enabled. You'll be prompted for a verification code when signing in from new devices.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-medium text-gray-900 flex items-center">
                  <ClockIcon className="h-5 w-5 text-zim-green mr-2" />
                  Session Timeout
                </h3>
                <div className="mt-4">
                  <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700">
                    Auto logout after inactivity (minutes)
                  </label>
                  <div className="mt-1">
                    <select
                      id="session-timeout"
                      name="session-timeout"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Your session will automatically end after the specified period of inactivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Billing':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">Billing Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your billing and payment preferences</p>
            </div>

            <div>
              <label htmlFor="billing-cycle" className="block text-sm font-medium text-gray-700">
                Billing Cycle
              </label>
              <div className="mt-1">
                <select
                  id="billing-cycle"
                  name="billing-cycle"
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <div className="mt-1">
                <select
                  id="payment-method"
                  name="payment-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="auto-renew" className="block text-sm font-medium text-gray-700">
                Auto Renew
              </label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="auto-renew"
                  name="auto-renew"
                  checked={autoRenew}
                  onChange={(e) => setAutoRenew(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                />
              </div>
            </div>
          </div>
        );
      case 'Properties':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">Properties Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your property management preferences</p>
            </div>

            <div>
              <label htmlFor="default-lease-term" className="block text-sm font-medium text-gray-700">
                Default Lease Term
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="default-lease-term"
                  name="default-lease-term"
                  value={defaultLeaseTerm}
                  onChange={(e) => setDefaultLeaseTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="default-deposit-amount" className="block text-sm font-medium text-gray-700">
                Default Deposit Amount
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="default-deposit-amount"
                  name="default-deposit-amount"
                  value={defaultDepositAmount}
                  onChange={(e) => setDefaultDepositAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="maintenance-threshold" className="block text-sm font-medium text-gray-700">
                Maintenance Threshold
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="maintenance-threshold"
                  name="maintenance-threshold"
                  value={maintenanceThreshold}
                  onChange={(e) => setMaintenanceThreshold(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="show-vacant-only" className="block text-sm font-medium text-gray-700">
                Show Vacant Only
              </label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="show-vacant-only"
                  name="show-vacant-only"
                  checked={showVacantOnly}
                  onChange={(e) => setShowVacantOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                />
              </div>
            </div>
          </div>
        );
      case 'Appearance':
        return (
          <div className="space-y-6">
            <div className="relative mb-6">
              <div className="absolute top-0 left-0 right-0 h-1 flex">
                <div className="flex-1 bg-zim-green"></div>
                <div className="flex-1 bg-yellow-500"></div>
                <div className="flex-1 bg-red-600"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 pt-3">Appearance Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your application appearance preferences</p>
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <div className="mt-1">
                <select
                  id="theme"
                  name="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="system">System Default</option>
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="color-mode" className="block text-sm font-medium text-gray-700">
                Color Mode
              </label>
              <div className="mt-1">
                <select
                  id="color-mode"
                  name="color-mode"
                  value={colorMode}
                  onChange={(e) => setColorMode(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="default">Default</option>
                  <option value="high-contrast">High Contrast</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
                Font Size
              </label>
              <div className="mt-1">
                <select
                  id="font-size"
                  name="font-size"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-zim-green focus:ring-zim-green sm:text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="dense-mode" className="block text-sm font-medium text-gray-700">
                Dense Mode
              </label>
              <div className="mt-1">
                <input
                  type="checkbox"
                  id="dense-mode"
                  name="dense-mode"
                  checked={denseMode}
                  onChange={(e) => setDenseMode(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-zim-green focus:ring-zim-green"
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-6 px-4">
            <p className="text-gray-500 text-center">
              {activeTab} settings are under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-zim-green"></div>
          <div className="flex-1 bg-yellow-500"></div>
          <div className="flex-1 bg-red-600"></div>
          <div className="flex-1 bg-black"></div>
        </div>
        <div className="pt-4">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your application preferences and configuration
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">Settings saved successfully!</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors
                  ${
                    activeTab === tab.name
                      ? 'border-zim-green text-zim-green'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="px-4 py-5 sm:p-6">{renderTabContent()}</div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex justify-center rounded-md border border-transparent bg-zim-green py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
} 