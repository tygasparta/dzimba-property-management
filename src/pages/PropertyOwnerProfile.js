import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProfileSettings.css';

const PropertyOwnerProfile = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'owner@dzimba.com',
    phone: '+263 77 123 4567'
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle photo change
  const handlePhotoChange = () => {
    // Implement photo upload logic
    console.log('Changing photo');
  };
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Settings</h2>
        <p>Manage your personal information, security, and property preferences</p>
      </div>
      
      {success && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
      
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <i className="icon-user"></i> Personal Information
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          <i className="icon-lock"></i> Password & Security
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <i className="icon-bell"></i> Notification Preferences
        </button>
        
        <button 
          className={`tab-button ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          <i className="icon-credit-card"></i> Payment Methods
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'personal' && (
          <form onSubmit={handleSubmit}>
            <div className="profile-photo-section">
              <div className="profile-photo">
                <img src="/placeholder-avatar.png" alt="Profile" />
              </div>
              <button 
                type="button" 
                className="change-photo-button"
                onClick={handlePhotoChange}
              >
                Change Photo
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="email-input-group">
                <span className="email-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="phone-input-group">
                <span className="phone-icon">📞</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="save-button"
                disabled={loading}
              >
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'password' && (
          <form className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-button">
                Change Password
              </button>
            </div>
          </form>
        )}
        
        {activeTab === 'notifications' && (
          <div className="notifications-settings">
            <div className="notification-option">
              <div className="notification-info">
                <h4>Email Notifications</h4>
                <p>Receive updates about your properties via email</p>
              </div>
              <div className="toggle-switch active">
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="notification-option">
              <div className="notification-info">
                <h4>SMS Notifications</h4>
                <p>Receive important alerts via text message</p>
              </div>
              <div className="toggle-switch">
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="notification-option">
              <div className="notification-info">
                <h4>Payment Reminders</h4>
                <p>Get notified when payments are due or received</p>
              </div>
              <div className="toggle-switch active">
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="notification-option">
              <div className="notification-info">
                <h4>Maintenance Alerts</h4>
                <p>Get notified about maintenance requests</p>
              </div>
              <div className="toggle-switch active">
                <div className="toggle-slider"></div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="save-button">
                Save Preferences
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'payment' && (
          <div className="payment-methods">
            <div className="payment-method-card">
              <div className="payment-card-info">
                <div className="card-icon">💳</div>
                <div className="card-details">
                  <h4>Visa ending in 4242</h4>
                  <p>Expires 12/2025</p>
                </div>
              </div>
              <div className="card-actions">
                <button className="edit-button">Edit</button>
                <button className="delete-button">Remove</button>
              </div>
            </div>
            
            <button className="add-payment-method">
              + Add Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyOwnerProfile; 