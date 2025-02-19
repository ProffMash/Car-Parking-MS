import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './landingPage';
import Dashboard from './users/userDashboard';
import AdminDashboard from './admin/adminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogin = (admin: boolean) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', admin ? 'true' : 'false');
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              isAdmin ? <Navigate to="/admin-dashboard" replace /> : <Navigate to="/dashboard" replace />
            ) : (
              <LandingPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={isLoggedIn && !isAdmin ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/admin-dashboard"
          element={isLoggedIn && isAdmin ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
