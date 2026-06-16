import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../api/authHelper';
import { useAuth } from '../components/AuthContext';
import { showNotification } from '../utils/NotificationHelper';

// SignUpPage.js
export default function SignUpPage() {
    const navigate = useNavigate();
    const { setStatus, setUser } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (password.length < 8) {
            showNotification('Password must be at least 8 characters long.', 'error', 'toast');
            setSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            showNotification('Passwords do not match.', 'error', 'toast');
            setSubmitting(false);
            return;
        }

        try {
            const data = await signUp({ name, email, password }); // authHelper saves token
            setUser(data.user || null);
            setStatus('authenticated');
            showNotification('Account created successfully!', 'success', 'toast');
            navigate('/dashboard', { replace: true });
        } catch (err) {
            showNotification(err.message || 'Sign Up failed', 'error', 'toast');
            setStatus('unauthenticated');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <main className="message-card auth-card">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                />
                <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={submitting} className="form-submit">
                    {submitting ? 'Creating account...' : 'Sign up'}
                </button>
            </form>

            <p className="form-caption">
                Have an account? <Link to="/login" className="text-link">Log in</Link>
            </p>
        </main>
    );
}