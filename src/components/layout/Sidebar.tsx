import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
  EnvelopeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../App';
import Logo from '../common/Logo';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Base route based on user role
  const baseRoute = userRole === 'admin' 
    ? '/dashboard' 
    : userRole === 'tenant' 
      ? '/tenant-dashboard' 
      : '/owner-dashboard';

  // Navigation items for the sidebar - dynamic based on role
  let navigation = [];
  
  // Admin navigation
  if (userRole === 'admin') {
    navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
      { name: 'Properties', href: '/dashboard/properties', icon: BuildingOfficeIcon },
      { name: 'Tenants', href: '/dashboard/tenants', icon: UserGroupIcon },
      { name: 'Payments', href: '/dashboard/payments', icon: CurrencyDollarIcon },
      { name: 'Maintenance', href: '/dashboard/maintenance', icon: WrenchScrewdriverIcon },
      { name: 'Leases', href: '/dashboard/leases', icon: DocumentTextIcon },
      { name: 'Reports', href: '/dashboard/reports', icon: ChartBarIcon },
    ];
  }
  
  // Tenant navigation
  else if (userRole === 'tenant') {
    navigation = [
      { name: 'Dashboard', href: '/tenant-dashboard', icon: HomeIcon },
      { name: 'My Properties', href: '/tenant-dashboard/properties', icon: BuildingOfficeIcon },
      { name: 'Payments', href: '/tenant-dashboard/payments', icon: CurrencyDollarIcon },
      { name: 'Maintenance', href: '/tenant-dashboard/maintenance', icon: WrenchScrewdriverIcon },
      { name: 'Notifications', href: '/tenant-dashboard/notifications', icon: BellIcon },
    ];
  }
  
  // Property Owner navigation
  else if (userRole === 'owner') {
    navigation = [
      { name: 'Dashboard', href: '/owner-dashboard', icon: HomeIcon },
      { name: 'Properties', href: '/owner-dashboard/properties', icon: BuildingOfficeIcon },
      { name: 'Tenants', href: '/owner-dashboard/tenants', icon: UserGroupIcon },
      { name: 'Payments', href: '/owner-dashboard/payments', icon: CurrencyDollarIcon },
      { name: 'Maintenance', href: '/owner-dashboard/maintenance', icon: WrenchScrewdriverIcon },
    ];
  }

  // Support links in the sidebar - filtered based on user role
  let supportLinks = [
    { name: 'Help Center', href: `${baseRoute}/help`, icon: QuestionMarkCircleIcon },
    { name: 'Logout', href: '#', icon: ArrowRightOnRectangleIcon, onClick: handleLogout, button: true },
  ];

  // Add settings link appropriately based on role
  if (userRole === 'admin') {
    supportLinks.splice(1, 0, { name: 'Settings', href: `${baseRoute}/settings`, icon: CogIcon });
  } else if (userRole === 'tenant') {
    supportLinks.splice(1, 0, { name: 'Profile Settings', href: `${baseRoute}/profile`, icon: UserIcon });
  } else if (userRole === 'owner') {
    supportLinks.splice(1, 0, { name: 'Settings', href: `${baseRoute}/settings`, icon: CogIcon });
  }

  // Function to check if a navigation item is active
  const isActive = (href: string) => {
    return location.pathname === href || (href !== baseRoute && location.pathname.startsWith(href));
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Get username and email based on role
  const getUserInfo = () => {
    if (userRole === 'admin') {
      return {
        initials: 'AU',
        name: 'Admin User',
        email: 'admin@dzimba.com'
      };
    } else if (userRole === 'tenant') {
      return {
        initials: 'TU',
        name: 'Tenant User',
        email: 'tenant@dzimba.com'
      };
    } else {
      return {
        initials: 'PO',
        name: 'Property Owner',
        email: 'owner@dzimba.com'
      };
    }
  };

  const userInfo = getUserInfo();

  return (
    <div className={`flex min-h-0 h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4 relative">
        {/* Collapse toggle button */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-5 bg-white border border-gray-200 rounded-full p-1 shadow-md z-10"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
          )}
        </button>

        {!collapsed && (
          <div className="flex flex-shrink-0 items-center px-4 mb-5">
            <Logo size="medium" withText={!collapsed} />
          </div>
        )}

        <nav className="mt-5 flex-1 space-y-8 px-2" aria-label="Sidebar">
          <div className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                Main
              </h3>
            )}
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'bg-zim-green bg-opacity-10 text-zim-green'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.name : ''}
              >
                <item.icon
                  className={`${collapsed ? 'w-6 h-6' : 'mr-3 h-5 w-5'} ${
                    isActive(item.href) ? 'text-zim-green' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
          <div className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-sm font-medium text-gray-500 uppercase tracking-wider">
                Support
              </h3>
            )}
            {supportLinks.map((item) => 
              item.button ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.name : ''}
                >
                  <item.icon className={`${collapsed ? 'w-6 h-6' : 'mr-3 h-5 w-5'} text-gray-400 group-hover:text-gray-500`} aria-hidden="true" />
                  {!collapsed && <span>{item.name}</span>}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? 'bg-zim-green bg-opacity-10 text-zim-green'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.name : ''}
                >
                  <item.icon
                    className={`${collapsed ? 'w-6 h-6' : 'mr-3 h-5 w-5'} ${
                      isActive(item.href) ? 'text-zim-green' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                    aria-hidden="true"
                  />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
      {!collapsed && (
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
                {userInfo.initials}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{userInfo.name}</p>
              <p className="text-xs font-medium text-gray-500">{userInfo.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 