import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Leases from './pages/Leases';
import Properties from './pages/Properties';
import Maintenance from './pages/Maintenance';
import Notifications from './pages/Notifications';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Help from './pages/Help';
import HelpRoutes from './pages/help';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import HomePage from './pages/HomePage';
import TenantDashboard from './pages/TenantDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import TenantProfile from './pages/TenantProfile';
import MyProperties from './pages/MyProperties';
import OwnerProperties from './pages/OwnerProperties';

// Define user roles
export type UserRole = 'admin' | 'tenant' | 'owner';

// Simple AuthProvider setup
type AuthContextType = {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Set to true for development
  const [userRole, setUserRole] = useState<UserRole>('admin'); // Default to admin for development

  useEffect(() => {
    // Check for existing auth token in localStorage
    const token = localStorage.getItem('dzimba_auth_token');
    const savedRole = localStorage.getItem('dzimba_user_role') as UserRole;
    
    if (token) {
      setIsAuthenticated(true);
      if (savedRole) {
        setUserRole(savedRole);
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set auth token and role
    localStorage.setItem('dzimba_auth_token', 'fake-token-for-development');
    localStorage.setItem('dzimba_user_role', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('dzimba_auth_token');
    localStorage.removeItem('dzimba_user_role');
    setIsAuthenticated(false);
    setUserRole('admin'); // Reset to default
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component with role-based access
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}> = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If allowedRoles is provided, check if user has the required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard based on role
    if (userRole === 'tenant') {
      return <Navigate to="/tenant-dashboard" replace />;
    } else if (userRole === 'owner') {
      return <Navigate to="/owner-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

// Function to determine the appropriate dashboard based on user role
const RoleDashboardRedirect: React.FC = () => {
  const { userRole } = useAuth();
  
  if (userRole === 'tenant') {
    return <Navigate to="/tenant-dashboard" replace />;
  } else if (userRole === 'owner') {
    return <Navigate to="/owner-dashboard" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

function App() {
  return (
    <AuthProvider>
    <Router>
        <Routes>
          {/* Public Homepage */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Role-based redirect */}
          <Route 
            path="/role-dashboard" 
            element={
              <ProtectedRoute>
                <RoleDashboardRedirect />
              </ProtectedRoute>
            } 
          />

          {/* Admin Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="properties" element={<Properties />} />
            <Route path="payments" element={<Payments />} />
            <Route path="leases" element={<Leases />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help">
              <Route index element={<Help />} />
              <Route path="*" element={<HelpRoutes />} />
            </Route>
          </Route>
          
          {/* Tenant Dashboard Routes */}
          <Route
            path="/tenant-dashboard"
            element={
              <ProtectedRoute allowedRoles={['tenant']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TenantDashboard />} />
            <Route path="properties" element={<MyProperties />} />
            <Route path="payments" element={<Payments />} />
            <Route path="payments/new" element={<Payments />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="maintenance/new" element={<Maintenance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<TenantProfile />} />
            <Route path="help">
              <Route index element={<Help />} />
              <Route path="*" element={<HelpRoutes />} />
            </Route>
          </Route>

          {/* Property Owner Dashboard Routes */}
          <Route
            path="/owner-dashboard"
            element={
              <ProtectedRoute allowedRoles={['owner']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<OwnerDashboard />} />
            <Route path="properties" element={<OwnerProperties />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="payments" element={<Payments />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help">
              <Route index element={<Help />} />
              <Route path="*" element={<HelpRoutes />} />
            </Route>
          </Route>
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;