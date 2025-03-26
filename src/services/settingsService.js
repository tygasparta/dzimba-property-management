export const updateSystemSettings = async (settings) => {
  // Get the current user role from localStorage or another source
  const userRole = localStorage.getItem('userRole') || 'propertyOwner';
  
  if (userRole !== 'admin') {
    throw new Error('Unauthorized: Only administrators can modify system settings');
  }
  
  // Proceed with the API call if authorized
  const response = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update settings');
  }
  
  return await response.json();
}; 