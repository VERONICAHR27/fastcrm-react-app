const API_URL = '/api/contact-logs';

export const getContactLogs = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch contact logs');
  }
  return response.json();
};

export const getContactLogsByContactId = async (contactId) => {
  const response = await fetch(`${API_URL}?contactId=${contactId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact logs for this contact');
  }
  return response.json();
};

export const sendTemplateToContact = async (data) => {
  const response = await fetch(`${API_URL}/send-template`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send template message');
  }
  
  return response.json();
};
