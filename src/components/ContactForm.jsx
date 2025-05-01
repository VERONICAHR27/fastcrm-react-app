import { useState, useEffect } from 'react';

function ContactForm({ initialData = {}, onContactSaved }) {
  const [name, setName] = useState(initialData.name || '');
  const [whatsapp, setWhatsapp] = useState(initialData.whatsapp || '');
  const [company, setCompany] = useState(initialData.company || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setWhatsapp(initialData.whatsapp || '');
      setCompany(initialData.company || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = { name, whatsapp, company };
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
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
        {initialData && initialData.id ? 'Save Changes' : 'Add Contact'}
      </button>
    </form>
  );
}

export default ContactForm;
