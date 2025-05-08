import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContactById } from '../services/contactService';
import { getTemplates } from '../services/templateService';
import { sendTemplateToContact } from '../services/contactLogService';
import TemplateSelector from '../components/templates/TemplateSelector';
import TemplatePreview from '../components/templates/TemplatePreview';

const SendMessagePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [isTemplatesLoading, setIsTemplatesLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactError, setContactError] = useState(null);
  const [templatesError, setTemplatesError] = useState(null);
  const [sendError, setSendError] = useState(null);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsContactLoading(true);
        const data = await getContactById(id);
        setContact(data);
      } catch (err) {
        console.error('Error fetching contact:', err);
        setContactError(err);
      } finally {
        setIsContactLoading(false);
      }
    };

    const fetchTemplates = async () => {
      try {
        setIsTemplatesLoading(true);
        const data = await getTemplates();
        setTemplates(data);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setTemplatesError(err);
      } finally {
        setIsTemplatesLoading(false);
      }
    };

    fetchContact();
    fetchTemplates();
  }, [id]);

  useEffect(() => {
    if (selectedTemplateId && templates.length > 0) {
      const template = templates.find(t => 
        (t._id === selectedTemplateId) || (t.id === selectedTemplateId)
      );
      setSelectedTemplate(template);
    } else {
      setSelectedTemplate(null);
    }
  }, [selectedTemplateId, templates]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId);
  };

  const filteredTemplates = filterType 
    ? templates.filter(template => template.type === filterType)
    : templates;

  const handleSendMessage = async () => {
    if (!selectedTemplateId || !contact) {
      return;
    }

    try {
      setIsSending(true);
      setSendError(null);
      
      await sendTemplateToContact({
        templateId: selectedTemplateId,
        contactId: id,
      });
      
      setIsSuccess(true);
      
      // Después de 2 segundos, redireccionar
      setTimeout(() => {
        navigate(`/contacts/${id}`);
      }, 2000);
    } catch (err) {
      console.error('Error sending message:', err);
      setSendError(err);
      setIsSending(false);
    }
  };

  if (isContactLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (contactError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium">Error</h3>
        <p>{contactError.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Enviar mensaje a {contact?.name}</h1>
        
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">¡Mensaje enviado correctamente!</h3>
            <p className="text-sm">Redirigiendo al perfil del contacto...</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Información del contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-md border">
                  <p className="text-sm text-gray-500 mb-1">Nombre</p>
                  <p className="font-medium">{contact?.name}</p>
                </div>
                <div className="bg-white p-4 rounded-md border">
                  <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                  <p className="font-medium">{contact?.whatsapp}</p>
                </div>
                {contact?.email && (
                  <div className="bg-white p-4 rounded-md border">
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium">{contact?.email}</p>
                  </div>
                )}
                {contact?.company && (
                  <div className="bg-white p-4 rounded-md border">
                    <p className="text-sm text-gray-500 mb-1">Empresa</p>
                    <p className="font-medium">{contact?.company.name}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Seleccionar plantilla</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por tipo
                </label>
                <div className="flex space-x-2">
                  <TypeFilterButton 
                    type="" 
                    label="Todos" 
                    active={filterType === ""} 
                    onClick={() => setFilterType("")} 
                  />
                  <TypeFilterButton 
                    type="Welcome" 
                    label="Bienvenida" 
                    active={filterType === "Welcome"} 
                    onClick={() => setFilterType("Welcome")} 
                  />
                  <TypeFilterButton 
                    type="Follow-up" 
                    label="Seguimiento" 
                    active={filterType === "Follow-up"} 
                    onClick={() => setFilterType("Follow-up")} 
                  />
                  <TypeFilterButton 
                    type="Farewell" 
                    label="Despedida" 
                    active={filterType === "Farewell"} 
                    onClick={() => setFilterType("Farewell")} 
                  />
                </div>
              </div>
              
              <TemplateSelector
                templates={filteredTemplates}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={handleTemplateSelect}
                isLoading={isTemplatesLoading}
                error={templatesError}
              />
              
              <TemplatePreview 
                template={selectedTemplate}
                contact={contact} 
              />
              
              {sendError && (
                <div className="mt-6 bg-red-50 border border-red-300 text-red-700 p-4 rounded-md">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Error al enviar el mensaje: {sendError.message}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => navigate(`/contacts/${id}`)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition duration-200"
                  disabled={isSending}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendMessage}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md transition duration-200 
                    ${!selectedTemplateId ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  disabled={!selectedTemplateId || isSending}
                >
                  {isSending ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : 'Enviar Mensaje'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente para botón de filtro de tipo
const TypeFilterButton = ({ type, label, active, onClick }) => {
  let baseClasses = "px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses = "bg-gray-100 text-gray-700 hover:bg-gray-200";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {label}
    </button>
  );
};

export default SendMessagePage;
