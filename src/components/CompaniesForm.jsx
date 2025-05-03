import { useState, useEffect } from 'react';

function CompaniesForm({ initialData = {}, onCompanySaved }) {
  const [name, setName] = useState(initialData.name || '');
  const [ruc, setRuc] = useState(initialData.ruc || '');
  const [contact, setContact] = useState(initialData.contacts?.[0]?.id || ''); // Asegurar que sea un string vacío si no hay contacto
  const [allContacts, setAllContacts] = useState([]); // Lista de contactos disponibles

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setRuc(initialData.ruc || '');
      setContact(initialData.contacts?.id || ''); // Asegurar que sea un string vacío si no hay contacto
    }
  }, [initialData]);

  useEffect(() => {
    // Cargar la lista de contactos
    fetch(`${import.meta.env.VITE_API_BASE_URL}/contacts`)
      .then((response) => response.json())
      .then((data) => setAllContacts(data))
      .catch((err) => console.error('Error fetching contacts:', err.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmSave = window.confirm('Are you sure you want to save the changes?');
    if (!confirmSave) return;

    const updatedCompany = {
      name,
      ruc,
      contactId: contact || null, // Enviar el ID del contacto como un string o null
    };
    console.log('Company to save:', updatedCompany); // Log para verificar los datos enviados
    onCompanySaved(updatedCompany);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="ruc" className="block text-sm font-medium">
          RUC
        </label>
        <input
          type="text"
          id="ruc"
          value={ruc}
          onChange={(e) => setRuc(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-sm font-medium">
          Contact
        </label>
        <select
          id="contact"
          value={contact} // Asegurar que el valor inicial sea un string vacío
          onChange={(e) => setContact(e.target.value)} // Guardar el valor como string
          className="w-full p-2 border rounded"
        >
          <option value="">Select a contact</option>
          {allContacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
        {initialData && initialData.id ? 'Save Changes' : 'Add Company'}
      </button>
    </form>
  );
}

export default CompaniesForm;
