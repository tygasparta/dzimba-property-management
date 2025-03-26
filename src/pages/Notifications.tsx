import React, { useState } from 'react';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Rent Payment Received',
    message: 'Rent payment of $850 received from John Doe for Apt 101',
    type: 'success',
    date: '2024-03-15',
    read: true,
  },
  {
    id: '2',
    title: 'Maintenance Request',
    message: 'New maintenance request submitted for Garden Villas, Apt 102',
    type: 'info',
    date: '2024-03-14',
    read: false,
  },
  {
    id: '3',
    title: 'Lease Expiring Soon',
    message: 'Lease for Mike Johnson at Apt 103 expires in 30 days',
    type: 'warning',
    date: '2024-03-10',
    read: false,
  },
  {
    id: '4',
    title: 'Late Rent Payment',
    message: 'Rent payment for Mountain View is overdue by 5 days',
    type: 'error',
    date: '2024-03-05',
    read: true,
  },
];

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications] = useState<Notification[]>(mockNotifications);

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />;
      case 'info':
      default:
        return <InformationCircleIcon className="h-6 w-6 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your system notifications and alerts
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Create Alert
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-lg">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-zim-green focus:border-zim-green sm:text-sm"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-lg shadow-sm p-4 ${getNotificationColor(
              notification.type
            )} ${notification.read ? 'opacity-70' : ''}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {notification.message}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 