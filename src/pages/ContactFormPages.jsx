import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/templates', '/contacts');

function ContactFormPages() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id'); // Obtener el ID del contacto desde la URL

  useEffect(() => {
    if (id) {
      // Cargar los datos del contacto para edición
      fetch(`${API_BASE_URL}/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setContact(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching contact:', err.message);
          setError(err.message);
          setLoading(false);
        });
    } else {
      // Si no hay ID, es un formulario de creación
      setContact({ name: '', whatsapp: '', company: '' }); // Valores iniciales para agregar
      setLoading(false);
    }
  }, [id]);

  const handleContactSaved = async (updatedContact) => {
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_BASE_URL}/${id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/contacts'); // Redirigir a la lista de contactos
    } catch (err) {
      console.error('Error saving contact:', err.message);
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Edit Contact' : 'Add New Contact'}
      </h2>
      <ContactForm
        initialData={contact}
        onContactSaved={handleContactSaved}
      />
    </div>
  );
}

export default ContactFormPages;
