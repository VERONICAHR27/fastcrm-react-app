import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function TemplateForm({ onTemplateAdded }) {
  const [type, setType] = useState('Welcome');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTemplate = {
      type,
      content,
      author,
    };

    fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTemplate),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        onTemplateAdded(data); // Notifica al componente padre que se agregó una nueva plantilla
        setType('Welcome');
        setContent('');
        setAuthor('');
        setError(null);
      })
      .catch((err) => {
        console.error('Error adding template:', err.message);
        setError(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">Error: {error}</p>}
      <div>
        <label htmlFor="type" className="block text-sm font-medium">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="Welcome">Welcome</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Farewell">Farewell</option>
        </select>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium">Author</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Add Template
      </button>
    </form>
  );
}

export default TemplateForm;