import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const RoleBasedRoute = ({ element, requiredRole }) => {
  const { userRole, setUserRole } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Force the role based on the route
    if (window.location.href.includes('/owner-dashboard') || 
        window.location.href.includes('/owner-')) {
      setUserRole('propertyOwner');
    }
    
    // Redirect if user doesn't have required role
    if (requiredRole && userRole !== requiredRole) {
      navigate('/access-denied');
    }
  }, [userRole, requiredRole, navigate, setUserRole]);
  
  return element;
};

export default RoleBasedRoute; 