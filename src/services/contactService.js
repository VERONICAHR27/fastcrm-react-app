const API_URL = '/api/contacts';

export const getContactById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch contact');
  }
  return response.json();
};

export const getContacts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch contacts');
  }
  return response.json();
};
export const createContact = async (contactData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create contact');
  }
  
  return response.json();
};
export const updateContact = async (id, contactData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
  
  return response.json();
};
export const deleteContact = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete contact');
  }
  
  return response.json();
};