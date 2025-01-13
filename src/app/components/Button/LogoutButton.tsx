'use client';
import React from 'react';
import { logoutUser } from '@/actions/logout-user';
import toast from 'react-hot-toast';

const LogoutButton = () => {
  const handleLogout = async () => {
  const result=  await logoutUser();
  if(result?.success) {
    toast.success(result.message)
  }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
