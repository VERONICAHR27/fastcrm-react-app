import { useState, useEffect } from 'react';
import TemplateForm from './TemplateForm';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleTemplateAdded = (newTemplate) => {
    setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
  };
  
  if (loading) {
    return <p>Loading templates...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Templates</h2>
      <TemplateForm onTemplateAdded={handleTemplateAdded} />
      <ul className="space-y-2 mt-4">
        {templates.map((template) => (
          <li
            key={template.id}
            className="p-4 border rounded bg-white shadow-sm"
          >
            <h3 className="text-lg font-semibold">{template.type}</h3>
            <p>{template.content}</p>
            <p className="text-sm text-gray-500">Author: {template.author}</p>
    
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Templates;