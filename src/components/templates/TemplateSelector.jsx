import React from 'react';

const TemplateSelector = ({ templates, selectedTemplateId, onSelectTemplate, isLoading, error }) => {
  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  if (error) {
    return <div>Error loading templates: {error.message}</div>;
  }

  if (!templates || templates.length === 0) {
    return <div>No templates available.</div>;
  }

  return (
    <div>
      <label>
        Select Template
      </label>
      <select
        value={selectedTemplateId || ''}
        onChange={(e) => onSelectTemplate(e.target.value)}
      >
        <option value="">-- Select a template --</option>
        {templates.map((template) => (
          <option key={template._id || template.id} value={template._id || template.id}>
            {template.type} - {template.content.substring(0, 30)}...
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
