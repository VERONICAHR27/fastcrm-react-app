import React from 'react';

const TemplatePreview = ({ template, contact }) => {
  if (!template || !contact) return null;

  const applyVariables = (content, contact) => {
    let processedContent = content;
    
    if (contact.name) {
      processedContent = processedContent.replace(/{name}/g, contact.name);
    }
    
    if (contact.email) {
      processedContent = processedContent.replace(/{email}/g, contact.email);
    }
    
    return processedContent;
  };

  const previewContent = applyVariables(template.content, contact);

  return (
    <div>
      <h3>Preview</h3>
      <div>
        {previewContent}
      </div>
      <div>
        <span>Template Type:</span> {template.type}
      </div>
      {template.labels && template.labels.length > 0 && (
        <div>
          <span>Labels:</span>{' '}
          {template.labels.join(', ')}
        </div>
      )}
      {template.author && (
        <div>
          <span>Author:</span> {template.author}
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;
