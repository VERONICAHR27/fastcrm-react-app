import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/companies`;

function CompaniesPages() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCompanies(data);
      setFilteredCompanies(data);
    } catch (err) {
      console.error('Error fetching companies:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCompanies(
      companies.filter((company) =>
        company.name.toLowerCase().includes(query)
      )
    );
  };

  const handleDeleteCompany = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setCompanies((prev) => prev.filter((company) => company.id !== id));
      setFilteredCompanies((prev) => prev.filter((company) => company.id !== id));
    } catch (err) {
      console.error('Error deleting company:', err.message);
      setError(`Failed to delete company: ${err.message}`);
    }
  };

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Companies</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="p-2 border rounded flex-grow"
        />
        <Link
          to="/companies/form"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Add Company
        </Link>
      </div>
      <ul className="space-y-2">
        {filteredCompanies.map((company) => (
          <li key={company.id} className="p-4 border rounded bg-white shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p>RUC: {company.ruc}</p>
              {company.contacts && company.contacts.length > 0 && (
                <p>Contacts: {company.contacts.map(contact => contact.name).join(', ')}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/companies/form?id=${company.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteCompany(company.id)}
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

export default CompaniesPages;
