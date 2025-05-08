import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const ContactLogItem = ({ log }) => {
  const formattedDate = format(new Date(log.createdAt), "d 'de' MMMM, yyyy - HH:mm", { locale: es });
  
  // Intentar extraer el tipo de mensaje
  let messageType = "Mensaje";
  let messageContent = log.template;
  try {
    const templateData = JSON.parse(log.template);
    if (templateData.type) {
      messageType = templateData.type;
    }
    if (templateData.content) {
      messageContent = templateData.content;
    }
  } catch (e) {
    // Si no es JSON válido, usar el contenido tal cual
  }
  
  return (
    <div>
      <div>
        <h3>Plantilla: {log.templateId}</h3>
        <p>{formattedDate}</p>
        <p>Tipo: {messageType}</p>
      </div>
      <div>
        <p>{messageContent}</p>
        {log.contact && (
          <div>
            <Link to={`/contacts/${log.contactId}`}>
              Enviado a: {log.contact.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactLogItem;
