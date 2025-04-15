import './index.css';
import Templates from './components/Templates';

function App() {
  return (
    <div className="App max-w-4xl mx-auto my-8 p-4 bg-gray-100 rounded shadow">
      <header className="p-4 bg-blue-500 text-white">
        <h1 className="text-2xl">FastCRM - Templates</h1>
      </header>
      <main className="p-4">
        <Templates />
      </main>
    </div>
  );
}

export default App;