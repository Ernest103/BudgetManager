import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import RequireAuth from './components/RequireAuth';
import { useAuth } from './components/AuthContext';
import PageHeader from './components/PageHeader';
import './App.css';

function App() {
  const { status } = useAuth();

  if (status === 'loading') {
    return <div className="page-shell"><p>Loading...</p></div>;
  }

  const isAuthed = status === 'authenticated';

  return (
    <div className={isAuthed ? 'page-shell page-shell-authed' : 'page-shell'}>
      {isAuthed ? <PageHeader /> : null}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthed ? '/dashboard' : '/login'} replace />} />
        <Route path="/login" element={isAuthed ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthed ? <Navigate to="/dashboard" replace /> : <SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;