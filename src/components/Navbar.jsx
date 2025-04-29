import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-600 text-gray-100 p-4 shadow-md">
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/contacts"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-white underline'
                : 'hover:text-white'
            }
          >
            Contactos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-white underline'
                : 'hover:text-white'
            }
          >
            Empresas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-white underline'
                : 'hover:text-white'
            }
          >
            Historial
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/templates"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-white underline'
                : 'hover:text-white'
            }
          >
            Templates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;