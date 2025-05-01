import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CompaniesForm from '../components/CompaniesForm';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/companies`;

function CompaniesFormPages() {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE_URL}/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setCompany(data); // Asegurarse de que `ruc` y `contacts` estén incluidos en los datos
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching company:', err.message);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setCompany({ name: '', ruc: '' }); // Incluir solo los campos necesarios
      setLoading(false);
    }
  }, [id]);

  const handleCompanySaved = async (updatedCompany) => {
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_BASE_URL}/${id}` : API_BASE_URL;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCompany),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/companies');
    } catch (err) {
      console.error('Error saving company:', err.message);
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
        {id ? 'Edit Company' : 'Add New Company'}
      </h2>
      <CompaniesForm
        initialData={company}
        onCompanySaved={handleCompanySaved}
      />
    </div>
  );
}

export default CompaniesFormPages;
