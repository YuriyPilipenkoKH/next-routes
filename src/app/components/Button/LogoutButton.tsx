import React from 'react';
import { logoutUser } from '@/actions/logout-user';

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
