import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  UserIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../App';
import Logo from '../common/Logo';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const currentPath = location.pathname;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Updated user navigation items with role-specific profile paths
  const userNavigation = [
    { 
      name: 'Your Profile', 
      icon: UserIcon, 
      onClick: () => {
        if (userRole === 'tenant') {
          navigate('/tenant-dashboard/profile');
        } else if (userRole === 'owner') {
          navigate('/owner-dashboard/settings');
        } else {
          navigate('/dashboard/settings');
        }
      }
    },
    { 
      name: 'Settings', 
      icon: Cog6ToothIcon, 
      onClick: () => navigate(`/${userRole === 'admin' ? '' : userRole + '-'}dashboard/settings`) 
    },
    { 
      name: 'Sign out', 
      icon: ArrowRightOnRectangleIcon, 
      onClick: handleLogout 
    },
  ];
  
  // Function to get page title based on current path
  const getPageTitle = () => {
    // Handle different dashboard prefixes
    const isDashboard = 
      currentPath === '/dashboard' || 
      currentPath === '/tenant-dashboard' || 
      currentPath === '/owner-dashboard';
      
    if (isDashboard) {
      if (currentPath === '/tenant-dashboard') {
        return 'Tenant Dashboard';
      } else if (currentPath === '/owner-dashboard') {
        return 'Property Owner Dashboard';
      } else {
        return 'Admin Dashboard';
      }
    }
    
    // For sub-pages, extract the last segment
    const pathSegments = currentPath.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    if (lastSegment) {
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
    
    return 'Dashboard';
  };

  // Get user info based on role
  const getUserInfo = () => {
    if (userRole === 'admin') {
      return {
        name: 'Admin User',
        email: 'admin@dzimba.com'
      };
    } else if (userRole === 'tenant') {
      return {
        name: 'Tenant User',
        email: 'tenant@dzimba.com'
      };
    } else {
      return {
        name: 'Property Owner',
        email: 'owner@dzimba.com'
      };
    }
  };

  const userInfo = getUserInfo();

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 lg:hidden">
              <Logo size="small" withText={false} />
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center">
              <div className="text-gray-700 font-medium px-3 py-2">
                {getPageTitle()}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 bg-gray-100 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-zim-green focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Notifications */}
            <Link
              to={`/${userRole === 'admin' ? '' : userRole + '-'}dashboard/notifications`}
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Link>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-zim-green focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                    <p className="text-xs text-gray-500">{userInfo.email}</p>
                  </div>
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <button
                          onClick={item.onClick}
                          className={`${
                            active ? 'bg-gray-100' : ''
                          } flex items-center w-full text-left px-4 py-2 text-sm text-gray-700`}
                        >
                          <item.icon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                          {item.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
} 