import { useState } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiBaseUrl = import.meta.env.VITE_API_URL || '/api';

  async function checkApiHealth() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiBaseUrl}/health`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API health check failed');
      }

      setHealth(data);
    } catch (requestError) {
      setHealth(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">StackPilot</div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#status">Status</a>
          <a href="#launch">Launch</a>
        </nav>
      </header>

      <main className="hero" id="launch">
        <p className="eyebrow">Express + React + Postgres</p>
        <h1>Ship your full-stack API platform faster.</h1>
        <p className="subtitle">
          A clean starter with Dockerized services, environment-driven config, and a live backend health probe.
        </p>

        <div className="actions">
          <button type="button" onClick={checkApiHealth} disabled={loading}>
            {loading ? 'Checking API...' : 'Check API Health'}
          </button>
          <span className="hint">Endpoint: {apiBaseUrl}/health</span>
        </div>

        <section className="status-card" id="status">
          {!health && !error && <p>Run the API and click the button to load live status.</p>}
          {error && <p className="error">Error: {error}</p>}
          {health && (
            <ul>
              <li>status: {health.status}</li>
              <li>database: {health.database}</li>
              <li>timestamp: {health.timestamp}</li>
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
