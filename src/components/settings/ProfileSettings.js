import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfileSettings = () => {
  const { currentUser } = useAuth();
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
    <div className="profile-settings">
      <h3>Profile Settings</h3>
      <p>Manage your personal information and contact details</p>
      
      {success && (
        <div className="success-message">
          Profile updated successfully!
        </div>
      )}
      
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
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
          />
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
    </div>
  );
};

export default ProfileSettings; 
export default ProfileSettings; 