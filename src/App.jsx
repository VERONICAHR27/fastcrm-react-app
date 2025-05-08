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
import DetailView from './components/DetailView';
import ContactLogHistoryPage from './pages/ContactLogHistoryPage';
import ContactDetailPage from './pages/ContactDetailPage';
import SendMessagePage from './pages/SendMessagePage';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navbar />
        <main>
          <Routes>
            <Route path="/contacts" element={<ContactPages />} />
            <Route path="/contacts/form" element={<ContactFormPages />} />
            <Route path="/contacts/details/:id" element={<DetailView />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
            <Route path="/contacts/:id/send-message" element={<SendMessagePage />} />
            <Route path="/companies/details/:id" element={<DetailView />} />
            <Route path="/templates" element={<TemplatesPages />} />
            <Route path="/templates/form" element={<TemplateFormPages />} />
            <Route path="/companies" element={<CompaniesPages />} />
            <Route path="/companies/form" element={<CompaniesFormPages />} />
            <Route path="/history" element={<ContactLogHistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;