import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const ExploreDestinations = () => {
  return (
    <div className="body bg-gray-50 min-h-screen w-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold mb-2">Destination Weddings</h1>
        <p className="text-lg text-gray-600 mb-8">Find the perfect place to say 'I do'</p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative flex items-center bg-white rounded-full shadow-md p-3">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by destination or venue name"
              className="flex-grow outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Popular Destinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {/* Example Destination Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/300x200" alt="Paris" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-md font-medium text-gray-800">Paris, France</p>
              </div>
            </div>
            {/* End Example Destination Card */}
            {/* Example Destination Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/300x200" alt="Tuscany" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-md font-medium text-gray-800">Tuscany, Italy</p>
              </div>
            </div>
            {/* End Example Destination Card */}
            {/* Example Destination Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/300x200" alt="Bali" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-md font-medium text-gray-800">Bali, Indonesia</p>
              </div>
            </div>
            {/* End Example Destination Card */}
            {/* Example Destination Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/300x200" alt="Santorini" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-md font-medium text-gray-800">Santorini, Greece</p>
              </div>
            </div>
            {/* End Example Destination Card */}
            {/* Example Destination Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/300x200" alt="Cancun" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-md font-medium text-gray-800">Cancun, Mexico</p>
              </div>
            </div>
            {/* End Example Destination Card */}
            {/* Example Destination Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/300x200" alt="Maui" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-md font-medium text-gray-800">Maui, Hawaii</p>
              </div>
            </div>
            {/* End Example Destination Card */}
          </div>
        </section>

        {/* Featured Venues */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Venues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Venue Card */}
            <Link to="/venue/1" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="Villa Serenity" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Villa Serenity, Tuscany</h3>
                <p className="text-gray-600 text-sm">A stunning villa in the heart of Tuscany</p>
              </div>
            </Link>
            {/* End Example Venue Card */}
            {/* Example Venue Card */}
            <Link to="/venue/2" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="Ocean's Edge Resort" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Ocean's Edge Resort, Cancun</h3>
                <p className="text-gray-600 text-sm">A luxurious beachfront resort with breathtaking views</p>
              </div>
            </Link>
            {/* End Example Venue Card */}
            {/* Example Venue Card */}
            <Link to="/venue/3" className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://via.placeholder.com/400x250" alt="Dunrobin Castle" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">Dunrobin Castle, Scotland</h3>
                <p className="text-gray-600 text-sm">A historic castle offering a fairytale wedding experience</p>
              </div>
            </Link>
            {/* End Example Venue Card */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExploreDestinations;
