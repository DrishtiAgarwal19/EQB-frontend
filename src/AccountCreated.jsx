import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AccountCreated = () => {
  const location = useLocation();
  const { name } = location.state || { name: 'User' }; // Provide a default name in case state is undefined
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home page after 3 seconds
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigate]);

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
