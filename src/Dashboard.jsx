import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64 min-h-screen py-8 px-4 fixed top-0 left-0">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Dashboard</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">My Bookings</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Upcoming Events</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Past Events</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Saved Events</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Profile & Settings</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Payment History</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Notifications</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Help/Support</a></li>
            <li><a href="#" className="block hover:bg-gray-700 py-2 px-4 rounded">Logout</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 py-8 px-8">
        <header className="mb-6">
          <h2 className="text-3xl font-semibold">Welcome back, Drishti!</h2>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">Total Events Booked</h3>
            <p className="text-3xl">5</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">Next Event</h3>
            <p className="text-3xl">May 25, 2024</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <ul className="list-disc pl-5">
              <li>Booking confirmed for Tech Conference</li>
              <li>Event canceled Food Festival</li>
              <li>Booking confirmed Art Exhibition</li>
            </ul>
          </div>
        </div>

        {/* My Bookings */}
        <section className="mb-8">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">My Bookings</h2>
            <a href="#" className="text-blue-500 hover:text-blue-700">View All</a>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Booking Card 1 */}
            <div className="bg-white shadow rounded p-4">
              <img src="https://via.placeholder.com/300x150?text=Music+Concert" alt="Music Concert" className="rounded mb-2" />
              <h3 className="text-lg font-semibold">Music Concert</h3>
              <p className="text-gray-600">May 6, 2024 - 7:00 PM</p>
              <p className="text-gray-600">Madison Square Garden</p>
              <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">View Ticket</a>
                <a href="#" className="text-red-500 hover:text-red-700">Cancel</a>
              </div>
            </div>
            {/* Booking Card 2 */}
            <div className="bg-white shadow rounded p-4">
              <img src="https://via.placeholder.com/300x150?text=Art+Exhibition" alt="Art Exhibition" className="rounded mb-2" />
              <h3 className="text-lg font-semibold">Art Exhibition</h3>
              <p className="text-gray-600">May 20, 2024, 10:00 AM</p>
              <p className="text-gray-600">Modern Art Gallery</p>
              <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">View Ticket</a>
                <a href="#" className="text-red-500 hover:text-red-700">Cancel</a>
              </div>
            </div>
            {/* Booking Card 3 */}
            <div className="bg-white shadow rounded p-4">
              <img src="https://via.placeholder.com/300x150?text=Tech+Conference" alt="Tech Conference" className="rounded mb-2" />
              <h3 className="text-lg font-semibold">Tech Conference</h3>
              <p className="text-gray-600">May 25, 2024 - 9:00 AM</p>
              <p className="text-gray-600">Convention Center</p>
              <div className="flex justify-between mt-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">View Ticket</a>
                <a href="#" className="text-red-500 hover:text-red-700">Cancel</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
