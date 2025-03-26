import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import GeneralSettings from './GeneralSettings';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import './Settings.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { userRole } = useAuth();
  
  // Force role check based on URL
  const isOwnerDashboard = window.location.href.includes('/owner-dashboard') || 
                           window.location.href.includes('/owner-');
  const isTenantDashboard = window.location.href.includes('/tenant-dashboard') || 
                           window.location.href.includes('/tenant-');
  
  // Set effective role based on URL
  let effectiveRole = userRole;
  if (isOwnerDashboard) effectiveRole = 'propertyOwner';
  if (isTenantDashboard) effectiveRole = 'tenant';
  
  const [allowedSettings, setAllowedSettings] = useState([]);

  useEffect(() => {
    // Define which settings are available based on user role
    const settingsPermissions = {
      admin: ['general', 'profile', 'notifications', 'security', 'billing', 'properties', 'appearance'],
      propertyOwner: ['profile', 'notifications', 'security'], // No general tab for property owners
      tenant: ['profile', 'notifications', 'security'],
    };
    
    setAllowedSettings(settingsPermissions[effectiveRole] || []);
    
    // Set first allowed tab as active if current tab is not allowed
    if (!settingsPermissions[effectiveRole]?.includes(activeTab)) {
      setActiveTab(settingsPermissions[effectiveRole]?.[0] || 'profile');
    }
    
    // Set body attribute for CSS targeting
    document.body.setAttribute('data-user-role', effectiveRole);
    
    return () => {
      document.body.removeAttribute('data-user-role');
    };
  }, [effectiveRole, activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Settings</h2>
        <p>Manage your {effectiveRole === 'admin' ? 'application' : effectiveRole === 'propertyOwner' ? 'property' : 'account'} preferences and configuration</p>
      </div>
      
      <div className="profile-tabs">
        {allowedSettings.includes('general') && (
          <button 
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
            data-tab="general"
          >
            <i className="fas fa-cog"></i> General
          </button>
        )}
        
        {allowedSettings.includes('profile') && (
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> Profile
          </button>
        )}
        
        {allowedSettings.includes('notifications') && (
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i> Notifications
          </button>
        )}
        
        {allowedSettings.includes('security') && (
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <i className="fas fa-shield-alt"></i> Security
          </button>
        )}
      </div>
      
      <div className="profile-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage; 