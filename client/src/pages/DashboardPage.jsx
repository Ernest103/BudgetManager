import { useAuth } from '../components/AuthContext';

function getTimeOfDayGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user?.name || 'there';
  const greeting = getTimeOfDayGreeting();

  return (
    <main className="message-card">
      <h1>{greeting}, {name}</h1>
      <p style={{ marginTop: '0.75rem' }}>
        TODO: Add dashboard widgets.
      </p>
    </main>
  );
}