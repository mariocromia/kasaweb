import { useState } from 'react';
import Login from './Login';
import StatsDashboard from './StatsDashboard';

const SESSION_KEY = 'kasaweb_analytics_auth';

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(() => {
    // Manter sessão durante a aba
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });
  const [password, setPassword] = useState(() => sessionStorage.getItem(SESSION_KEY + '_pw') || '');
  const [error, setError] = useState(false);

  const handleLogin = (inputPassword: string) => {
    if (inputPassword === '33822912') {
      setAuthenticated(true);
      setPassword(inputPassword);
      setError(false);
      sessionStorage.setItem(SESSION_KEY, 'true');
      sessionStorage.setItem(SESSION_KEY + '_pw', inputPassword);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPassword('');
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY + '_pw');
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} error={error} />;
  }

  return <StatsDashboard password={password} onLogout={handleLogout} />;
}
