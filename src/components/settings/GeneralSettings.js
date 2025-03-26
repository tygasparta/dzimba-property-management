import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const GeneralSettings = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  
  // Force role check based on URL
  const isOwnerDashboard = window.location.href.includes('/owner-dashboard') || 
                           window.location.href.includes('/owner-');
  const effectiveRole = isOwnerDashboard ? 'propertyOwner' : userRole;
  
  useEffect(() => {
    // Redirect property owners away from this page
    if (effectiveRole === 'propertyOwner') {
      navigate('/owner-dashboard/settings/profile');
    }
  }, [effectiveRole, navigate]);

  const [settings, setSettings] = useState({
    companyName: 'Dzimba Property Management',
    language: 'English',
    timezone: 'Africa/Harare (UTC+02:00)',
    currency: 'USD - US Dollar',
    dateFormat: 'MM/DD/YYYY'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Enhanced access control - only admin can access
  if (effectiveRole !== 'admin') {
    return (
      <div className="settings-access-denied">
        <h3>Access Denied</h3>
        <p>You do not have permission to view or modify system settings.</p>
        <p>Please contact your system administrator if you need changes to these settings.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // Simulate API call to update settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setError(null);
    } catch (err) {
      setError('Failed to update system settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="general-settings">
      <h3>General Settings</h3>
      <p>Configure your basic system preferences</p>
      
      {loading && <div className="loading-spinner">Loading...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {success && <div className="success-message">Settings updated successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Shona">Shona</option>
            <option value="Ndebele">Ndebele</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="timezone">Timezone</label>
          <select
            id="timezone"
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
          >
            <option value="Africa/Harare (UTC+02:00)">Africa/Harare (UTC+02:00)</option>
            <option value="America/New_York (UTC-05:00)">America/New_York (UTC-05:00)</option>
            <option value="Europe/London (UTC+00:00)">Europe/London (UTC+00:00)</option>
            <option value="Asia/Tokyo (UTC+09:00)">Asia/Tokyo (UTC+09:00)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
          >
            <option value="USD - US Dollar">USD - US Dollar</option>
            <option value="ZWL - Zimbabwean Dollar">ZWL - Zimbabwean Dollar</option>
            <option value="EUR - Euro">EUR - Euro</option>
            <option value="GBP - British Pound">GBP - British Pound</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="dateFormat">Date Format</label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleChange}
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="save-button"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default GeneralSettings; 