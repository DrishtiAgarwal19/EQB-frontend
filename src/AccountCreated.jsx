import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const AccountCreated = () => {
  const location = useLocation();
  const { name } = location.state;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Account Created!</h2>
          <p className="text-gray-700">Welcome, {name}!</p>
        </div>
      </div>
    </>
  );
};

export default AccountCreated;
