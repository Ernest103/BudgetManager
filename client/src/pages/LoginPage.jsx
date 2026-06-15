import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../api/authHelper';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setStatus, setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = await signIn({ email, password }); // authHelper saves token
      setUser(data.user || null);
      setStatus('authenticated');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
      setStatus('unauthenticated');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="message-card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      {error ? <p style={{ color: '#b91c1c', marginTop: '0.75rem' }}>{error}</p> : null}

      <p style={{ marginTop: '1rem' }}>
        No account? <Link to="/signup">Sign up</Link>
      </p>
    </main>
  );
}