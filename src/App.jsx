import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import TemplatesPages from './pages/TemplatesPages';
import TemplateFormPages from './pages/TemplateFormPages';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col bg-gray-100">
        <Header />
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/contacts" element={<h1>Contactos</h1>} />
            <Route path="/companies" element={<h1>Empresas</h1>} />
            <Route path="/history" element={<h1>Historial</h1>} />
            <Route path="/templates" element={<TemplatesPages />} />
            <Route path="/templates/form" element={<TemplateFormPages />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;