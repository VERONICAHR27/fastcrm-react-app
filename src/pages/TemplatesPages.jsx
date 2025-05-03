import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TemplatesPages() {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/templates`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTemplates(data);
        setFilteredTemplates(data); // Inicialmente, mostrar todas las plantillas
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    filterTemplates(type, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterTemplates(filterType, query);
  };

  const filterTemplates = (type, query) => {
    let filtered = templates;

    if (type) {
      filtered = filtered.filter((template) => template.type === type);
    }

    if (query) {
      filtered = filtered.filter((template) =>
        template.content.toLowerCase().includes(query)
      );
    }

    setFilteredTemplates(filtered);
  };

  const handleTemplateDeleted = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this template?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Actualizar el estado local eliminando la plantilla
      setTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template._id !== id)
      );
      setFilteredTemplates((prevTemplates) =>
        prevTemplates.filter((template) => template._id !== id)
      );
    } catch (err) {
      console.error('Error deleting template:', err.message);
      setError(`Failed to delete template: ${err.message}`);
    }
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

      {/* Filtro, buscador y botón para agregar plantilla */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Filtro */}
        <div className="flex items-center">
          <label htmlFor="filterType" className="block text-sm font-medium mr-2">
            Filter by Type:
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Welcome">Welcome</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Farewell">Farewell</option>
          </select>
        </div>

        {/* Buscador */}
        <div className="flex items-center">
          <label htmlFor="searchQuery" className="block text-sm font-medium mr-2">
            Search:
          </label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by content"
            className="p-2 border rounded"
          />
        </div>

        {/* Botón para agregar plantilla */}
        <div className="ml-auto">
          <Link
            to="/templates/form"
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Add Template
          </Link>
        </div>
      </div>

      {/* Lista de plantillas */}
      <ul className="space-y-2 mt-4">
        {filteredTemplates.map((template) => (
          <li
            key={template._id}
            className="p-4 border rounded bg-white shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{template.type}</h3>
              <p>{template.content}</p>
              <p className="text-sm text-gray-500">Author: {template.author}</p>
            </div>
            <div className="flex space-x-2">
              {/* Botón Editar */}
              <Link
                to={`/templates/form?id=${template._id}`}
                onClick={(e) => {
                  const confirmEdit = window.confirm('Are you sure you want to edit this template?');
                  if (!confirmEdit) e.preventDefault();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
              >
                Edit
              </Link>
              {/* Botón Eliminar */}
              <button
                onClick={() => handleTemplateDeleted(template._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TemplatesPages;