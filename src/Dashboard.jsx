import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming AuthContext provides user data

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <img src="/public/logo.png" alt="VenueFinder Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold text-gray-800">VenueFinder</span>
          </div>
          <nav className="space-y-4">
            <Link to="/dashboard" className="flex items-center p-3 rounded-lg bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Dashboard
            </Link>
            <Link to="/my-bookings" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              My Bookings
            </Link>
            <Link to="/wishlist" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
              Wishlist
            </Link>
            <Link to="/profile" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              My Profile
            </Link>
            <Link to="/customer-query" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.445L7 11.454l-1.172 1.172a1 1 0 001.414 1.414L8 12.586l1.172 1.172a1 1 0 001.414-1.414L10 11.414l1.172 1.172a1 1 0 001.414-1.414L12 10.586l1.172-1.172A1 1 0 0012 8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              Support/Queries
            </Link>
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mt-auto">
          <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414L7.586 9H4a1 1 0 000 2h3.586l1.707 1.707a1 1 0 001.414-1.414L10.414 10l.293-.293z" clipRule="evenodd"></path></svg>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
            </button>
            <img src="https://via.placeholder.com/40x40" alt="User Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </header>

        <p className="text-gray-700 mb-8">Welcome back, {user?.Name || user?.email || 'User'}! Here's an overview of your account activity.</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-600">Total Bookings</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-600">Wishlist Count</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-600">Upcoming Bookings</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-600">Notifications</h3>
            <p className="text-4xl font-bold text-gray-900 mt-2">3</p>
          </div>
        </div>

        {/* My Bookings Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <img src="/public/no-upcoming-bookings.png" alt="No Upcoming Bookings" className="w-64 h-auto mb-6" /> {/* Placeholder image */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Upcoming Bookings</h3>
            <p className="text-gray-600 text-center mb-6">You have no bookings scheduled at the moment. Explore venues and plan your next event!</p>
            <Link to="/explore-destinations" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Explore Venues
            </Link>
          </div>
        </section>

        {/* Wishlist Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wishlist Item 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <img src="/public/the-coastal-retreat.jpeg" alt="The Coastal Retreat" className="w-full h-48 object-cover" /> {/* Placeholder image */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">The Coastal Retreat</h3>
              </div>
            </div>
            {/* Wishlist Item 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <img src="/public/the-mountain-lodge.jpeg" alt="The Mountain Lodge" className="w-full h-48 object-cover" /> {/* Placeholder image */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">The Mountain Lodge</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
