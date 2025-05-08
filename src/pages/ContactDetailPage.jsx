import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContactById } from '../services/contactService';
import { getContactLogsByContactId } from '../services/contactLogService';
import ContactLogsList from '../components/contactLogs/ContactLogsList';

const ContactDetailPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isContactLoading, setIsContactLoading] = useState(true);
  const [isLogsLoading, setIsLogsLoading] = useState(true);
  const [contactError, setContactError] = useState(null);
  const [logsError, setLogsError] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

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

    const fetchLogs = async () => {
      try {
        setIsLogsLoading(true);
        const data = await getContactLogsByContactId(id);
        setLogs(data);
      } catch (err) {
        console.error('Error fetching logs:', err);
        setLogsError(err);
      } finally {
        setIsLogsLoading(false);
      }
    };

    fetchContact();
    fetchLogs();
  }, [id]);

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
      {/* Cabecera con información básica y acciones */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{contact?.name || 'Detalles del contacto'}</h1>
              <p className="text-gray-600 mt-1">{contact?.whatsapp}</p>
              {contact?.company && (
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  {contact.company.name}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <Link 
                to={`/contacts/form?id=${id}`} 
                className="flex items-center px-4 py-2 border border-yellow-500 text-yellow-600 rounded-md hover:bg-yellow-50 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-1.414.586H4a1 1 0 01-1-1v-1a2 2 0 01.586-1.414l10-10z" />
                </svg>
                Editar
              </Link>
              <Link 
                to={`/contacts/${id}/send-message`} 
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Enviar mensaje
              </Link>
            </div>
          </div>
        </div>
        
        {/* Pestañas de navegación */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'info'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Información
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'history'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Historial de comunicación
            </button>
          </nav>
        </div>
        
        {/* Contenido de las pestañas */}
        <div className="p-6">
          {activeTab === 'info' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Información de contacto</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium">{contact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <p className="font-medium">{contact.whatsapp}</p>
                    </div>
                    {contact.email && (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{contact.email}</p>
                      </div>
                    )}
                    {contact.position && (
                      <div>
                        <p className="text-sm text-gray-500">Cargo</p>
                        <p className="font-medium">{contact.position}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {contact.company && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Empresa asociada</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Nombre de la empresa</p>
                        <p className="font-medium">{contact.company.name}</p>
                        {contact.company.ruc && (
                          <>
                            <p className="text-sm text-gray-500 mt-3">RUC</p>
                            <p className="font-medium">{contact.company.ruc}</p>
                          </>
                        )}
                      </div>
                      <Link 
                        to={`/companies/details/${contact.company.id}`}
                        className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
                      >
                        Ver detalles de la empresa →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Historial de comunicación</h3>
              <ContactLogsList logs={logs} isLoading={isLogsLoading} error={logsError} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
