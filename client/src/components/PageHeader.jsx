import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signOut } from '../api/authHelper';

export default function PageHeader() {
  const navigate = useNavigate();
  const { user, setStatus, setUser } = useAuth();

  async function handleLogout() {
    signOut();
    setUser(null);
    setStatus('unauthenticated');
    navigate('/login', { replace: true });
  }

  return (
    <header className="app-header" role="banner">
      <div className="app-header__inner">
        <h1 className="app-header__brand">Budget Manager</h1>

        <details className="user-menu">
          <summary className="user-menu__trigger" aria-label="Open user menu">
            {user?.name || 'Account'}
          </summary>

          <div className="user-menu__panel" role="menu">
            <button
              type="button"
              onClick={handleLogout}
              className="user-menu__item"
              role="menuitem"
            >
              Log out
            </button>
          </div>
        </details>
      </div>
    </header>
  );
}
