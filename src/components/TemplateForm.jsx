import { useState, useEffect } from 'react';

function TemplateForm({ initialData = {}, onTemplateSaved }) {
  const [type, setType] = useState(initialData.type || 'Welcome');
  const [content, setContent] = useState(initialData.content || '');
  const [author, setAuthor] = useState(initialData.author || '');

  useEffect(() => {
    if (initialData) {
      setType(initialData.type || 'Welcome');
      setContent(initialData.content || '');
      setAuthor(initialData.author || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTemplate = { type, content, author };
    onTemplateSaved(updatedTemplate);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium">
          Type
        </label>
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
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium">
          Author
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-gray-700 text-white rounded  hover:bg-gray-800">
        {initialData && initialData._id ? 'Save Changes' : 'Add Template'}
      </button>
    </form>
  );
}

export default TemplateForm;