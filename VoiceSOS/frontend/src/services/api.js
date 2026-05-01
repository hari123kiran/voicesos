const API_URL = 'http://localhost:5000/api';

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error("Backend health check failed:", error);
    return null;
  }
};

export const getContacts = async () => {
  try {
    const response = await fetch(`${API_URL}/contacts`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return [];
  }
};

export const saveContact = async (contact) => {
  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact)
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to save contact:", error);
    return null;
  }
};

export const saveAlert = async (alertData) => {
  try {
    const response = await fetch(`${API_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alertData)
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to save alert:", error);
    return null;
  }
};

export const getAlerts = async () => {
  try {
    const response = await fetch(`${API_URL}/alerts`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return [];
  }
};

export const uploadAudio = async (audioBlob) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'emergency_audio.webm');
    
    const response = await fetch(`${API_URL}/audio`, {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to upload audio:", error);
    return null;
  }
};
