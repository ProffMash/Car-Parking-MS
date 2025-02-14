import { useState } from 'react';
import LandingPage from './landingPage';
import Dashboard from './users/userDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? <Dashboard /> : <LandingPage onLogin={() => setIsLoggedIn(true)} />;
}

export default App;