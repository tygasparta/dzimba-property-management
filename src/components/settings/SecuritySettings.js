import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const SecuritySettings = () => {
  const { currentUser } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(prev => !prev);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update two-factor authentication settings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="security-settings">
      <h3>Security Settings</h3>
      <p>Manage your account security and authentication</p>
      
      {loading && <div className="loading-spinner">Loading...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {success && <div className="success-message">Security settings updated successfully!</div>}
      
      <div className="security-section">
        <h4>Change Password</h4>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="save-button"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
      
      <div className="security-section">
        <h4>Two-Factor Authentication</h4>
        <form onSubmit={handleTwoFactorSubmit}>
          <div className="toggle-item">
            <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
            <div 
              className={`toggle-switch ${twoFactorEnabled ? 'active' : ''}`}
              onClick={handleToggleTwoFactor}
            >
              <div className="toggle-slider"></div>
            </div>
          </div>
          
          {twoFactorEnabled && (
            <div className="two-factor-info">
              <p>Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to sign in.</p>
              <button 
                type="submit" 
                className="save-button"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
      
      <div className="security-section">
        <h4>Login Sessions</h4>
        <p>You are currently logged in from:</p>
        <div className="session-item">
          <div className="session-info">
            <span className="device-name">Chrome on Windows</span>
            <span className="ip-address">IP: 192.168.1.1</span>
            <span className="login-time">Last active: Today at 2:30 PM</span>
          </div>
          <button className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings; 