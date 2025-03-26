import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/ProfileSettings.css';

const TenantProfile = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'tenant@dzimba.com',
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
        <p>Manage your personal information, security, and communication preferences</p>
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
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <i className="icon-phone"></i> Contact Preferences
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
        
        {/* Other tabs content would go here */}
      </div>
    </div>
  );
};

export default TenantProfile; 