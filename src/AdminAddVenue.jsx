import React from 'react';
import { Link } from 'react-router-dom';

const AdminAddVenue = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800">VenueBooker Admin</h2>
        <nav className="space-y-4">
          <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            Dashboard
          </Link>
          <Link to="/admin/bookings" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            Bookings
          </Link>
          <Link to="/admin/venues" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 012 14v2a1 1 0 001 1h14a1 1 0 001-1v-2a1 1 0 01-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z"></path></svg>
            Venues
          </Link>
          <Link to="/admin/users" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
            Clients
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Venue</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label htmlFor="venueName" className="block text-gray-700 text-sm font-bold mb-2">Venue Name</label>
            <input
              type="text"
              id="venueName"
              placeholder="Enter venue name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              id="location"
              placeholder="Enter address or search"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              [Map Placeholder - San Francisco]
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="hallType" className="block text-gray-700 text-sm font-bold mb-2">Hall Type</label>
            <select
              id="hallType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Select hall type</option>
              <option>Ballroom</option>
              <option>Pavilion</option>
              <option>Terrace</option>
              <option>Barn</option>
              <option>Loft</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="pricePerDay" className="block text-gray-700 text-sm font-bold mb-2">Price Per Day</label>
            <input
              type="text"
              id="pricePerDay"
              placeholder="Enter price per day"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity</label>
            <input
              type="text"
              id="capacity"
              placeholder="Enter maximum capacity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactPhone" className="block text-gray-700 text-sm font-bold mb-2">Contact Phone</label>
            <input
              type="text"
              id="contactPhone"
              placeholder="Enter phone number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contactEmail" className="block text-gray-700 text-sm font-bold mb-2">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              placeholder="Enter email address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="description"
              placeholder="Enter venue description"
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Hall Amenities</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span>Type: Projector, Description: High-resolution projector, Quantity: 2</span>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                <span>Type: Sound System, Description: Professional sound system, Quantity: 1</span>
                <div>
                  <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Delete</button>
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Add Amenity
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Venue Photos</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
              Drag and drop or click to upload photos of the venue with captions
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Venue Status</h3>
            <div className="flex items-center mb-2">
              <input type="radio" id="activeStatus" name="venueStatus" value="active" className="mr-2" defaultChecked />
              <label htmlFor="activeStatus" className="text-gray-700">Active</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="inactiveStatus" name="venueStatus" value="inactive" className="mr-2" />
              <label htmlFor="inactiveStatus" className="text-gray-700">Inactive</label>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAddVenue;
