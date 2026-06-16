import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/authHelper';
import { useAuth } from '../components/AuthContext';

// SignUpPage.js
export default function SignUpPage() {
    const navigate = useNavigate();
    const { setStatus, setUser } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSubmitting(true);

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setSubmitting(false);
            return;
        }

        try {
            const data = await signUp({ name, email, password }); // authHelper saves token
            setUser(data.user || null);
            setStatus('authenticated');
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.message || 'Sign Up failed');
            setStatus('unauthenticated');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="message-card">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
                <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    minLength={8}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Creating account...' : 'Sign up'}
                </button>
            </form>

            {error ? <p style={{ color: '#b91c1c', marginTop: '0.75rem' }}>{error}</p> : null}

            <p style={{ marginTop: '1rem' }}>
                Have an account? <Link to="/login">Log in</Link>
            </p>
        </main>
    );
}