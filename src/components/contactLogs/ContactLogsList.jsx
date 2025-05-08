import React from 'react';
import ContactLogItem from './ContactLogItem';

const ContactLogsList = ({ logs, isLoading, error }) => {
  if (isLoading) {
    return <div>Loading logs...</div>;
  }

  if (error) {
    return <div>Error loading logs: {error.message}</div>;
  }

  if (!logs || logs.length === 0) {
    return <div>No communication logs found.</div>;
  }

  return (
    <div>
      {logs.map((log) => (
        <ContactLogItem key={log.id} log={log} />
      ))}
    </div>
  );
};

export default ContactLogsList;
