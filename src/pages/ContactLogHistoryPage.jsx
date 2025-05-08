import React, { useEffect, useState } from 'react';
import { getContactLogs } from '../services/contactLogService';
import { getContacts } from '../services/contactService';
import { Link } from 'react-router-dom';

const ContactLogHistoryPage = () => {
  const [logs, setLogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactFilter, setContactFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [logsData, contactsData] = await Promise.all([
          getContactLogs(),
          getContacts()
        ]);
        setLogs(logsData);
        // Inicialmente mostrar todos los mensajes
        setFilteredLogs(logsData);
        setContacts(contactsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filtrar logs basado en los criterios seleccionados
    let result = [...logs];
    
    // Si hay un contacto seleccionado, filtrar por ese contacto
    if (contactFilter) {
      result = result.filter(log => log.contactId === contactFilter);
    }
    
    if (typeFilter) {
      result = result.filter(log => {
        try {
          const template = JSON.parse(log.template);
          return template.type === typeFilter;
        } catch {
          return false;
        }
      });
    }
    
    if (dateRange !== 'all') {
      const now = new Date();
      let compareDate;
      
      switch (dateRange) {
        case 'today':
          compareDate = new Date(now.setHours(0,0,0,0));
          break;
        case 'week':
          compareDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case 'month':
          compareDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          compareDate = null;
      }
      
      if (compareDate) {
        result = result.filter(log => new Date(log.createdAt) >= compareDate);
      }
    }
    
    setFilteredLogs(result);
  }, [logs, contactFilter, typeFilter, dateRange]);

  const handleReset = () => {
    setContactFilter('');
    setTypeFilter('');
    setDateRange('all');
  };

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact ? contact.name : 'Contacto no identificado';
  };

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }) + ' - ' + date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para obtener el icono y color según el tipo de mensaje
  const getMessageStyle = (type) => {
    switch(type) {
      case 'Welcome':
        return { icon: '👋', color: 'bg-green-50 border-green-200', label: 'Bienvenida' };
      case 'Follow-up':
        return { icon: '🔄', color: 'bg-blue-50 border-blue-200', label: 'Seguimiento' };
      case 'Farewell':
        return { icon: '👋', color: 'bg-yellow-50 border-yellow-200', label: 'Despedida' };
      default:
        return { icon: '✉️', color: 'bg-gray-50 border-gray-200', label: 'Mensaje' };
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3 md:mb-0">
          <span className="text-blue-600">✉️</span> Historial de comunicación
        </h1>
        <Link 
          to="/contacts" 
          className="inline-flex items-center px-4 py-2 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a contactos
        </Link>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 border border-gray-200">
        <div className="p-4 md:p-5 border-b bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Filtros de búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="contactFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por contacto
              </label>
              <select
                id="contactFilter"
                value={contactFilter}
                onChange={(e) => setContactFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              >
                <option value="">Todos los contactos</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de mensaje
              </label>
              <select
                id="typeFilter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              >
                <option value="">Todos los tipos</option>
                <option value="Welcome">👋 Bienvenida</option>
                <option value="Follow-up">🔄 Seguimiento</option>
                <option value="Farewell">👋 Despedida</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
                Período de tiempo
              </label>
              <select
                id="dateRange"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              >
                <option value="all">Todo el tiempo</option>
                <option value="today">Hoy</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Limpiar filtros
            </button>
          </div>
        </div>
        
        <div className="p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Error al cargar los mensajes. Por favor, intente nuevamente.
                  </p>
                </div>
              </div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No hay mensajes</h3>
              <p className="text-gray-500">
                No se encontraron mensajes con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6 pb-2 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  {contactFilter ? 
                    `Comunicación con: ${getContactName(contactFilter)}` : 
                    "Historial completo de comunicación"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Mostrando {filteredLogs.length} mensaje(s) 
                  {contactFilter ? ` para ${getContactName(contactFilter)}` : ' para todos los contactos'}
                </p>
              </div>

              <div className="space-y-6">
                {filteredLogs.map(log => {
                  let template;
                  let messageContent = 'Sin contenido disponible';
                  let messageType = 'Unknown';
                  
                  try {
                    // Intentamos parsear el template
                    template = JSON.parse(log.template);
                    messageType = template.type || 'Unknown';
                    
                    // Extraemos el contenido del mensaje
                    if (template.content) {
                      messageContent = template.content;
                    } else if (typeof template === 'object') {
                      // Si es un objeto pero no tiene propiedad content, lo convertimos a string
                      messageContent = JSON.stringify(template, null, 2);
                    }
                  } catch (error) {
                    console.error('Error al procesar la plantilla:', error);
                    
                    // Si no se puede parsear como JSON, mostramos el template en crudo
                    if (typeof log.template === 'string') {
                      messageContent = log.template;
                    }
                  }
                  
                  const { icon, color, label } = getMessageStyle(messageType);
                  
                  return (
                    <div 
                      key={log.id} 
                      className={`${color} border rounded-lg p-5 shadow-sm hover:shadow-md transition-all`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 text-2xl mr-4">{icon}</div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {label}
                            </h3>
                            <div className="text-sm text-gray-600 mt-1 sm:mt-0 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {formatDate(log.createdAt)}
                            </div>
                          </div>
                          
                          <div className="bg-white bg-opacity-80 rounded-lg p-4 mb-3 border border-gray-200 shadow-sm">
                            {/* Información de la plantilla */}
                            <div className="mb-2 pb-2 border-b border-gray-100">
                              <span className="text-xs text-gray-500">Plantilla: {log.templateId || 'No especificada'}</span>
                            </div>
                            
                            {/* Contenido del mensaje con formato */}
                            <div className="whitespace-pre-wrap text-gray-700">
                              {messageContent}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {log.status === "sent" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">
                                <svg className="h-2 w-2 mr-1 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                Enviado
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                                <svg className="h-2 w-2 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 8 8">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                                Pendiente
                              </span>
                            )}
                            
                            {log.channel && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs">
                                {log.channel === "email" ? "📧" : log.channel === "sms" ? "📱" : "💬"} 
                                {log.channel.charAt(0).toUpperCase() + log.channel.slice(1)}
                              </span>
                            )}
                            
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {getContactName(log.contactId)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-between items-center text-sm text-gray-600 border-t border-gray-200 pt-4">
                <div>
                  Total: <span className="font-medium">{filteredLogs.length} mensaje(s)</span>
                </div>
                {contactFilter && (
                  <div>
                    Contacto: <span className="font-medium">{getContactName(contactFilter)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactLogHistoryPage;
