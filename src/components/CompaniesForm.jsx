import { useState, useEffect } from 'react';

function CompaniesForm({ initialData = {}, onCompanySaved }) {
  const [name, setName] = useState(initialData.name || '');
  const [ruc, setRuc] = useState(initialData.ruc || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setRuc(initialData.ruc || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCompany = { name, ruc };
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
      <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
        {initialData && initialData.id ? 'Save Changes' : 'Add Company'}
      </button>
    </form>
  );
}

export default CompaniesForm;
