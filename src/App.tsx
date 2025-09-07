import React, { useState } from 'react';
import { AdminAuthForm } from './components/AdminAuthForm';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [admin, setAdmin] = useState(null);

  const handleLogin = (adminData: any) => {
    setAdmin(adminData);
  };

  const handleLogout = () => {
    setAdmin(null);
  };

  return (
    <div className="size-full">
      {admin ? (
        <AdminDashboard admin={admin} onLogout={handleLogout} />
      ) : (
        <AdminAuthForm onLogin={handleLogin} />
      )}
    </div>
  );
}