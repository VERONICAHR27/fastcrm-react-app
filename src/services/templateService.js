const API_URL = '/api/templates';

// Obtener todas las plantillas
export const getTemplates = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }
  return response.json();
};

// Obtener una plantilla por su ID
export const getTemplateById = async (templateId) => {
  const response = await fetch(`${API_URL}/${templateId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch template');
  }
  return response.json();
};

// Crear una nueva plantilla
export const createTemplate = async (templateData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(templateData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create template');
  }
  
  return response.json();
};

// Actualizar una plantilla existente
export const updateTemplate = async (templateId, templateData) => {
  const response = await fetch(`${API_URL}/${templateId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(templateData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update template');
  }
  
  return response.json();
};

// Eliminar una plantilla
export const deleteTemplate = async (templateId) => {
  const response = await fetch(`${API_URL}/${templateId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete template');
  }
  
  return true;
};

