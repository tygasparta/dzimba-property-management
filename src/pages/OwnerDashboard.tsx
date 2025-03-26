import React, { useState, useEffect } from 'react';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  BellIcon,
  ClockIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function OwnerDashboard() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Mock data for property owner dashboard
  const ownerStats = {
    totalProperties: 5,
    totalUnits: 12,
    occupancyRate: 83,
    totalTenants: 10,
    monthlyRevenue: 8500,
    maintenanceRequests: 3,
    upcomingLeaseRenewals: 2,
  };

  const properties = [
    {
      id: '1',
      name: 'Sunshine Apartments',
      address: '123 Samora Machel Ave, Harare',
      type: 'Apartment Building',
      units: 6,
      occupied: 5,
      revenue: 4250,
      maintenanceRequests: 1,
    },
    {
      id: '2',
      name: 'Green Acres Home',
      address: '45 Leopold Takawira St, Harare',
      type: 'Single Family',
      units: 1,
      occupied: 1,
      revenue: 950,
      maintenanceRequests: 0,
    },
    {
      id: '3',
      name: 'Mountain View Complex',
      address: '78 Jason Moyo Ave, Bulawayo',
      type: 'Commercial',
      units: 3,
      occupied: 2,
      revenue: 2300,
      maintenanceRequests: 1,
    },
  ];

  const financialSummary = {
    revenue: {
      current: 8500,
      previous: 8200,
      change: 3.7,
    },
    expenses: {
      current: 2100,
      previous: 2300,
      change: -8.7,
    },
    netIncome: {
      current: 6400,
      previous: 5900,
      change: 8.5,
    },
  };

  // Financial chart data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenueData = [7200, 7400, 7900, 8100, 8200, 8500];
  const expensesData = [2400, 2300, 2500, 2200, 2300, 2100];
  const netIncomeData = revenueData.map((rev, index) => rev - expensesData[index]);

  // Generate chart data
  const generateChartData = () => {
    return {
      labels: months,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.3,
          fill: false,
        },
        {
          label: 'Expenses',
          data: expensesData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.3,
          fill: false,
        },
        {
          label: 'Net Income',
          data: netIncomeData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    };
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function (value) {
            return '$' + value;
          },
        },
      },
    },
  };

  useEffect(() => {
    setChartData(generateChartData());
  }, []);

  // Function to simulate data refresh
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Owner Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your properties, tenants, and finances in one place
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={refreshData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500" />
                Refreshing...
              </>
            ) : (
              <>
                <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
                Refresh
              </>
            )}
          </button>
          <Link
            to="/owner-dashboard/properties"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zim-green hover:bg-zim-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zim-green"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Property
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Properties */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingOfficeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Properties</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{ownerStats.totalProperties}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/owner-dashboard/properties" className="font-medium text-zim-green hover:text-zim-green-dark">
                View all properties
              </Link>
            </div>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Occupancy Rate</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{ownerStats.occupancyRate}%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-gray-500">
                {ownerStats.totalUnits} total units, {ownerStats.totalTenants} occupied
              </span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">${ownerStats.monthlyRevenue}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/owner-dashboard/payments" className="font-medium text-zim-green hover:text-zim-green-dark">
                View payment history
              </Link>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <WrenchScrewdriverIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Maintenance Requests</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{ownerStats.maintenanceRequests}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/owner-dashboard/maintenance" className="font-medium text-zim-green hover:text-zim-green-dark">
                View all requests
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Financial Summary</h3>
          <ChartBarIcon className="h-5 w-5 text-gray-500" />
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">${financialSummary.revenue.current}</dd>
              <dd className="mt-2 flex items-center text-sm text-gray-500">
                {financialSummary.revenue.change > 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span className={financialSummary.revenue.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {financialSummary.revenue.change > 0 ? '+' : ''}{financialSummary.revenue.change}%
                </span>
                <span className="ml-2">from last month</span>
              </dd>
            </div>

            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Expenses</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">${financialSummary.expenses.current}</dd>
              <dd className="mt-2 flex items-center text-sm text-gray-500">
                {financialSummary.expenses.change < 0 ? (
                  <ArrowTrendingDownIcon className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <ArrowTrendingUpIcon className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span className={financialSummary.expenses.change < 0 ? 'text-green-500' : 'text-red-500'}>
                  {financialSummary.expenses.change > 0 ? '+' : ''}{financialSummary.expenses.change}%
                </span>
                <span className="ml-2">from last month</span>
              </dd>
            </div>

            <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Net Income</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">${financialSummary.netIncome.current}</dd>
              <dd className="mt-2 flex items-center text-sm text-gray-500">
                {financialSummary.netIncome.change > 0 ? (
                  <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <ArrowTrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
                )}
                <span className={financialSummary.netIncome.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {financialSummary.netIncome.change > 0 ? '+' : ''}{financialSummary.netIncome.change}%
                </span>
                <span className="ml-2">from last month</span>
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            {/* Replace placeholder with actual chart */}
            <div className="h-64 rounded-lg">
              {chartData && <Line data={chartData} options={chartOptions} />}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Overview */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Properties Overview</h3>
          <Link to="/owner-dashboard/properties" className="text-sm font-medium text-zim-green hover:text-zim-green-dark">
            View all
          </Link>
        </div>
        <div className="border-t border-gray-200">
          {/* Quick Access */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 bg-gray-50 px-6 py-4">
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
              <BuildingOfficeIcon className="h-6 w-6 text-zim-green mb-1" />
              <span className="text-xs text-gray-600">Add Property</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
              <UserGroupIcon className="h-6 w-6 text-blue-500 mb-1" />
              <span className="text-xs text-gray-600">Add Tenant</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
              <CurrencyDollarIcon className="h-6 w-6 text-green-500 mb-1" />
              <span className="text-xs text-gray-600">Record Payment</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
              <WrenchScrewdriverIcon className="h-6 w-6 text-yellow-500 mb-1" />
              <span className="text-xs text-gray-600">Maintenance</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
              <CalendarIcon className="h-6 w-6 text-purple-500 mb-1" />
              <span className="text-xs text-gray-600">Schedule</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all">
              <ChartBarIcon className="h-6 w-6 text-gray-500 mb-1" />
              <span className="text-xs text-gray-600">Reports</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occupancy
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map((property) => {
                  const occupancyPercentage = Math.round((property.occupied / property.units) * 100);
                  
                  return (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-zim-green-50 to-zim-green-100 rounded-md flex items-center justify-center">
                            <BuildingOfficeIcon className="h-6 w-6 text-zim-green" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.name}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <svg className="h-3 w-3 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {property.address}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <span className="font-medium">{property.occupied}/{property.units}</span>
                          <span className="text-xs text-gray-500 ml-1">units</span>
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-800">
                            {occupancyPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div 
                            className={`h-1.5 rounded-full ${
                              occupancyPercentage >= 80 ? 'bg-green-500' : 
                              occupancyPercentage >= 60 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${occupancyPercentage}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${property.revenue}</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.maintenanceRequests > 0 ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {property.maintenanceRequests} {property.maintenanceRequests === 1 ? 'issue' : 'issues'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            No issues
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="p-1 text-gray-400 hover:text-zim-green rounded-full hover:bg-gray-100">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-1 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Payments & Lease Renewals */}
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Events</h3>
            <CalendarIcon className="h-5 w-5 text-gray-500" />
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <ClockIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Rent Payment Due</p>
                    <p className="text-sm text-gray-500">Sunshine Apartments, Unit 3</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-yellow-50 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Tomorrow
                  </span>
                </div>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <ClockIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lease Renewal</p>
                    <p className="text-sm text-gray-500">Green Acres Home</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    In 7 days
                  </span>
                </div>
              </li>
              <li className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <ClockIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Property Inspection</p>
                    <p className="text-sm text-gray-500">Mountain View Complex</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    In 14 days
                  </span>
                </div>
              </li>
            </ul>
            <div className="mt-4 text-center">
              <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-zim-green hover:text-zim-green-dark">
                View all events
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Notifications</h3>
            <div className="relative">
              <BellIcon className="h-5 w-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-3 mt-0.5">
                  <WrenchScrewdriverIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Urgent Maintenance Request</p>
                  <p className="text-sm text-gray-500">
                    Water leak reported in Sunshine Apartments, Unit 2.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                </div>
              </li>
              <li className="py-3 flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3 mt-0.5">
                  <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Payment Received</p>
                  <p className="text-sm text-gray-500">
                    $950 rent payment received from John Doe for Green Acres Home.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">Yesterday</p>
                </div>
              </li>
              <li className="py-3 flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3 mt-0.5">
                  <UserGroupIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New Tenant Application</p>
                  <p className="text-sm text-gray-500">
                    New application submitted for Mountain View Complex, Unit 3.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">2 days ago</p>
                </div>
              </li>
            </ul>
            <div className="mt-4 text-center">
              <button className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-zim-green hover:text-zim-green-dark">
                View all notifications
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 