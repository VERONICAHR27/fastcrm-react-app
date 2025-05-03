import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/contacts`;

function ContactPages() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data); // Inicialmente, mostrar todos los contactos
    } catch (err) {
      console.error('Error fetching contacts:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(query)
      )
    );
  };

  const handleDeleteContact = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
      setFilteredContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      console.error('Error deleting contact:', err.message);
      setError(`Failed to delete contact: ${err.message}`);
    }
  };

  if (loading) return <p>Loading contacts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Contacts</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="p-2 border rounded flex-grow"
        />
        <Link
          to="/contacts/form"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Add Contact
        </Link>
      </div>

      {/* Lista de contactos */}
      <ul className="space-y-2">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="p-4 border rounded bg-white shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{contact.name}</h3>
              <p>WhatsApp: {contact.whatsapp}</p>
              
            </div>
            <div className="flex space-x-2">
              {/* Botón Ver Detalles */}
              <Link
                to={`/contacts/details/${contact.id}`}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800"
              >
                View Details
              </Link>
              {/* Botón Editar */}
              <Link
                to={`/contacts/form?id=${contact.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
              >
                Edit
              </Link>
              {/* Botón Eliminar */}
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this contact?')) {
                    handleDeleteContact(contact.id);
                  }
                }}
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

export default ContactPages;
