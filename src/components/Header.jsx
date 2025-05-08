function Header() {
  // Usar estilos inline en lugar de clases de Tailwind
  const headerStyle = {
    backgroundColor: '#111827', // equivalente a bg-gray-900
    color: 'white',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  const titleStyle = {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontWeight: 'bold'
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>FastCRM</h1>
    </header>
  );
}

export default Header;