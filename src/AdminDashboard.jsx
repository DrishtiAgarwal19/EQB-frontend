import React from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Placeholder data for the dashboard
  const totalBookings = 120;
  const upcomingEvents = 30;
  const revenue = "$50,000";

  const recentBookings = [
    { id: 'BK123', venue: 'The Grand Ballroom', date: '2024-07-15', status: 'Confirmed' },
    { id: 'BK124', venue: 'The Lakeside Pavilion', date: '2024-07-20', status: 'Pending' },
    { id: 'BK125', venue: 'The City View Terrace', date: '2024-07-25', status: 'Confirmed' },
    { id: 'BK126', venue: 'The Rustic Barn', date: '2024-08-01', status: 'Confirmed' },
    { id: 'BK127', venue: 'The Modern Loft', date: '2024-08-05', status: 'Cancelled' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Venue Admin</h2>
        <nav className="space-y-4">
          <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            Dashboard
          </Link>
          <Link to="/admin/venues" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 012 14v2a1 1 0 001 1h14a1 1 0 001-1v-2a1 1 0 01-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z"></path></svg>
            Venues
          </Link>
          <Link to="/admin/bookings" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            Bookings
          </Link>
          <Link to="/admin/users" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            Users
          </Link>
          <Link to="/admin/reports" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm10 2a2 2 0 11-4 0 2 2 0 014 0zm-4 4a2 2 0 100 4h4a2 2 0 100-4h-4z" clipRule="evenodd"></path></svg>
            Reports
          </Link>
        </nav>
        <div className="mt-auto">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add Venue
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-500">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-900">{totalBookings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-500">Upcoming Events</h3>
            <p className="text-3xl font-bold text-gray-900">{upcomingEvents}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-500">Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">{revenue}</p>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.venue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Venue Performance (Placeholder for charts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bookings by Venue</h2>
            <div className="h-48 flex items-center justify-center text-gray-400">
              {/* Placeholder for chart */}
              [Chart Placeholder]
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Revenue by Venue</h2>
            <div className="h-48 flex items-center justify-center text-gray-400">
              {/* Placeholder for chart */}
              [Chart Placeholder]
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
