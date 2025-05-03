import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

function DetailView() {
  const { id } = useParams(); // Obtener el ID desde la URL
  const location = useLocation(); // Obtener la ruta actual
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  const fetchDetails = async (id) => {
    try {
      const isContact = location.pathname.includes('/contacts');
      const endpoint = isContact ? `${API_BASE_URL}/contacts/${id}` : `${API_BASE_URL}/companies/${id}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error('Error fetching details:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No details available.</p>;

  return (
    <div className="p-4 border rounded bg-white shadow-sm">
      {location.pathname.includes('/companies') && (
        <>
          <h3 className="text-xl font-semibold mt-4">COMPANY DETAILS</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>RUC:</strong> {data.ruc}</p>
          {data.contacts && data.contacts.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mt-4">Contacts</h3>
              <ul>
                {data.contacts.map((contact) => (
                  <li key={contact.id}>
                    <p><strong>Name:</strong> {contact.name}</p>
                    <p><strong>WhatsApp:</strong> {contact.whatsapp}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
      {location.pathname.includes('/contacts') && (
        <>
          <h3 className="text-xl font-semibold mt-4">CONTACT DETAILS</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>WhatsApp:</strong> {data.whatsapp}</p>
          {data.company && (
            <>
              <h3 className="text-xl font-semibold mt-4">Associated Company</h3>
              <p><strong>Company Name:</strong> {data.company.name}</p>
              <p><strong>RUC:</strong> {data.company.ruc}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default DetailView;
