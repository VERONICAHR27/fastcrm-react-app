import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TemplateForm from '../components/TemplateForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TemplateFormPages() {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id'); // Obtener el ID de la plantilla desde la URL

  useEffect(() => {
    if (id) {
      // Cargar los datos de la plantilla para edición
      fetch(`${API_BASE_URL}/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTemplate(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching template:', err.message);
          setError(err.message);
          setLoading(false);
        });
    } else {
      // Si no hay ID, es un formulario de creación
      setTemplate({ type: 'Welcome', content: '', author: '' }); // Valores iniciales para agregar
      setLoading(false);
    }
  }, [id]);

  const handleTemplateSaved = async (updatedTemplate) => {
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_BASE_URL}/${id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTemplate),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/templates'); // Redirigir a la lista de plantillas
    } catch (err) {
      console.error('Error saving template:', err.message);
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
        {id ? 'Edit Template' : 'Add New Template'}
      </h2>
      <TemplateForm
        initialData={template}
        onTemplateSaved={handleTemplateSaved}
      />
    </div>
  );
}

export default TemplateFormPages;