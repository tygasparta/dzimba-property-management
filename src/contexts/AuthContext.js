import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate authentication on component mount
  useEffect(() => {
    // This would normally connect to your authentication service
    const fetchUser = async () => {
      try {
        // Get the current URL to determine if we're in the owner dashboard
        const isOwnerDashboard = window.location.href.includes('/owner-dashboard') || 
                                 window.location.href.includes('/owner-');
        
        // Set the appropriate role based on the URL
        const role = isOwnerDashboard ? 'propertyOwner' : 'admin';
        
        const user = {
          id: 'user123',
          name: 'John Doe',
          email: 'john@example.com',
          role: role // Dynamically set based on URL
        };
        
        setCurrentUser(user);
        setUserRole(role);
        console.log('Current user role:', role); // Debug log
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  // Login function
  const login = async (email, password) => {
    // This would normally authenticate with your backend
    // Simulating successful login
    const user = {
      id: 'user123',
      name: 'John Doe',
      email,
      role: 'propertyOwner'
    };
    
    setCurrentUser(user);
    setUserRole(user.role);
    return user;
  };

  // Context value
  const value = {
    currentUser,
    userRole,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 