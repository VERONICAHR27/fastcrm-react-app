import { useState, useEffect } from 'react';

function ContactForm({ initialData = {}, onContactSaved }) {
  const [name, setName] = useState(initialData.name || '');
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp || '');
  const [company, setCompany] = useState(initialData.company?.id || ''); // Guardar solo el ID de la empresa
  const [companies, setCompanies] = useState([]); // Lista de empresas disponibles

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setWhatsapp(initialData.whatsapp || '');
      setCompany(initialData.company?.id || '');
    }
  }, [initialData]);

  useEffect(() => {
    // Cargar la lista de empresas
    fetch(`${import.meta.env.VITE_API_BASE_URL}/companies`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error('Error fetching companies:', err.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmSave = window.confirm('Are you sure you want to save the changes?');
    if (!confirmSave) return; // Si el usuario cancela, no se guarda

    const updatedContact = {
      name,
      whatsapp,
      companyId: company || null, // Enviar el ID de la empresa como companyId
    };
    console.log('Contact to save:', updatedContact); // Log para verificar los datos enviados
    onContactSaved(updatedContact);
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
        <label htmlFor="whatsapp" className="block text-sm font-medium">
          WhatsApp
        </label>
        <input
          type="text"
          id="whatsapp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium">
          Company
        </label>
        <select
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a company</option>
          {companies.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
        {initialData && initialData.id ? 'Save Changes' : 'Add Contact'}
      </button>
    </form>
  );
}

export default ContactForm;
