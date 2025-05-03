import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TemplatesPages from './pages/TemplatesPages';
import TemplateFormPages from './pages/TemplateFormPages';
import ContactPages from './pages/ContactPages';
import ContactFormPages from './pages/ContactFormPages';
import CompaniesPages from './pages/CompaniesPages';
import CompaniesFormPages from './pages/CompaniesFormPages';
import DetailView from './components/DetailView'; // Import the DetailView component

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-gray-100">
        <Header />
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/contacts" element={<ContactPages />} />
            <Route path="/contacts/form" element={<ContactFormPages />} />
            <Route path="/contacts/details/:id" element={<DetailView />} /> {/* Add route for contact details */}
            <Route path="/companies/details/:id" element={<DetailView />} /> {/* Ruta para detalles de empresas */}
            <Route path="/history" element={<h1>Historial</h1>} />
            <Route path="/templates" element={<TemplatesPages />} />
            <Route path="/templates/form" element={<TemplateFormPages />} />
            <Route path="/companies" element={<CompaniesPages />} />
            <Route path="/companies/form" element={<CompaniesFormPages />} /> {/* Ruta para agregar/editar compañías */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;