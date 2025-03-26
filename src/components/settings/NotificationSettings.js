import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const NotificationSettings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    paymentReminders: true,
    maintenanceUpdates: true,
    propertyAlerts: true,
    marketingEmails: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Simulate fetching notification settings
    const fetchSettings = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data - in a real app, this would come from your API
        setLoading(false);
      } catch (err) {
        setError('Failed to load notification settings');
        console.error(err);
        setLoading(false);
      }
    };

    fetchSettings();
  }, [currentUser]);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setError(null);
    } catch (err) {
      setError('Failed to update notification settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="notification-settings">
      <h3>Notification Settings</h3>
      <p>Manage how you receive notifications and alerts</p>
      
      {loading && <div className="loading-spinner">Loading...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {success && <div className="success-message">Notification settings updated successfully!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="notification-channels">
          <h4>Notification Channels</h4>
          
          <div className="toggle-group">
            <div className="toggle-item">
              <label htmlFor="emailNotifications">Email Notifications</label>
              <div 
                className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`}
                onClick={() => handleToggle('emailNotifications')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="toggle-item">
              <label htmlFor="smsNotifications">SMS Notifications</label>
              <div 
                className={`toggle-switch ${settings.smsNotifications ? 'active' : ''}`}
                onClick={() => handleToggle('smsNotifications')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="toggle-item">
              <label htmlFor="pushNotifications">Push Notifications</label>
              <div 
                className={`toggle-switch ${settings.pushNotifications ? 'active' : ''}`}
                onClick={() => handleToggle('pushNotifications')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="notification-types">
          <h4>Notification Types</h4>
          
          <div className="toggle-group">
            <div className="toggle-item">
              <label htmlFor="paymentReminders">Payment Reminders</label>
              <div 
                className={`toggle-switch ${settings.paymentReminders ? 'active' : ''}`}
                onClick={() => handleToggle('paymentReminders')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="toggle-item">
              <label htmlFor="maintenanceUpdates">Maintenance Updates</label>
              <div 
                className={`toggle-switch ${settings.maintenanceUpdates ? 'active' : ''}`}
                onClick={() => handleToggle('maintenanceUpdates')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="toggle-item">
              <label htmlFor="propertyAlerts">Property Alerts</label>
              <div 
                className={`toggle-switch ${settings.propertyAlerts ? 'active' : ''}`}
                onClick={() => handleToggle('propertyAlerts')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="toggle-item">
              <label htmlFor="marketingEmails">Marketing Emails</label>
              <div 
                className={`toggle-switch ${settings.marketingEmails ? 'active' : ''}`}
                onClick={() => handleToggle('marketingEmails')}
              >
                <div className="toggle-slider"></div>
              </div>
            </div>
          </div>
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

export default NotificationSettings; 