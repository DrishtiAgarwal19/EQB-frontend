import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-2xl font-semibold mb-4">VenueFinder</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className="flex items-center py-2 px-4 bg-gray-300 rounded">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m11-19l-2 2m0 0l-7 7-7-7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0a1 1 0 01-1-1v-4a1 1 0 001-1h2a1 1 0 001 1v4a1 1 0 01-1 1"></path></svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="flex items-center py-2 px-4 hover:bg-gray-300 rounded">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="flex items-center py-2 px-4 hover:bg-gray-300 rounded">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/my-profile" className="flex items-center py-2 px-4 hover:bg-gray-300 rounded">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/support" className="flex items-center py-2 px-4 hover:bg-gray-300 rounded">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.169 1.165-2.169 1.859-2.929m0 0V6a2 2 0 112 0v.071m0 0a2 2 0 102.828 2.828M3 12l2.293 2.293m11.414 0l4.293 4.293m0-14.828L5.293 5.293m14.828 0L9.707 18.707M9.707 6.707l4.242 4.243M5.293 18.707l4.242-4.243m7.414 2.586a2 2 0 002.828-2.828"></path></svg>
                Support/Queries
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/logout" className="flex items-center py-2 px-4 hover:bg-gray-300 rounded mt-auto">
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Logout
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <p>Welcome back, Sarah! Here's an overview of your account activity.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-md shadow-lg p-4">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-3xl">12</p>
          </div>
          <div className="bg-white rounded-md shadow-lg p-4">
            <h3 className="text-lg font-semibold">Wishlist Count</h3>
            <p className="text-3xl">5</p>
          </div>
          <div className="bg-white rounded-md shadow-lg p-4">
            <h3 className="text-lg font-semibold">Upcoming Bookings</h3>
            <p className="text-3xl">0</p>
          </div>
          <div className="bg-white rounded-md shadow-lg p-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <p className="text-3xl">3</p>
          </div>
        </div>

        {/* My Bookings Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
          <div className="bg-white rounded-md shadow-lg p-4 text-center">
            <img src="https://via.placeholder.com/300x200" alt="No Bookings" className="mx-auto mb-4" />
            <p>No Upcoming Bookings</p>
            <Link to="/explore-venues" className="text-blue-500 hover:text-blue-700">Explore Venues</Link>
          </div>
        </div>

        {/* Wishlist Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-md shadow-lg p-4">
              <img src="https://via.placeholder.com/300x150" alt="Wishlist Item" className="mb-2" />
              <p>The Coastal Retreat</p>
            </div>
            <div className="bg-white rounded-md shadow-lg p-4">
              <img src="https://via.placeholder.com/300x150" alt="Wishlist Item" className="mb-2" />
              <p>The Mountain Lodge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
