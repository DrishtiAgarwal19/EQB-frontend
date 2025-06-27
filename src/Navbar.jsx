import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex flex-wrap justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center">
        <img src="/src/assets/WhatsApp Image 2025-06-23 at 17.58.19_dcbbe03b.jpg" alt="EventQuickBook Logo" className="h-8" />
        <span className="text-xl font-bold ml-2" style={{ color: 'black' }}>QualityBook</span>
      </div>

      {/* Hamburger menu icon for mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-4 items-center">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <div
          className="relative"
          onMouseEnter={() => setIsServicesHovered(true)}
          onMouseLeave={() => setIsServicesHovered(false)}
        >
          <Link to="/services" className="hover:text-blue-600 cursor-pointer">Our Services</Link>
          {isServicesHovered && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <p className="block px-4 py-2 text-gray-800 font-bold">Venue Booking Services</p>
                <Link to="/services/wedding-venue-booking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wedding Venue Booking</Link>
                <Link to="/services/engagement-reception-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Engagement & Reception Halls</Link>
                <Link to="/services/birthday-party-venues" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Birthday Party Venues (Adults & Kids)</Link>
                <Link to="/services/corporate-event-spaces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Corporate Event Spaces</Link>
                <Link to="/services/banquet-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Banquet Halls & Marriage Halls</Link>
                <Link to="/services/conference-rooms" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Conference Rooms / Meeting Spaces</Link>
                <Link to="/services/party-lawns" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Party Lawns & Farmhouses</Link>
                <Link to="/services/restaurants-lounges" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Restaurants & Lounges for Private Parties</Link>
                <Link to="/services/hotels-event-packages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hotels for Stay + Event Packages</Link>
                <p className="block px-4 py-2 text-gray-800 font-bold mt-2">🎯 Event Planning Assistance</p>
                <Link to="/services/event-planner-recommendations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Event Planner Recommendations</Link>
                <Link to="/services/theme-decor-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Theme & Decor Services</Link>
                <Link to="/services/catering-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Catering Services</Link>
                <Link to="/services/photography-videography" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Photography & Videography</Link>
                <Link to="/services/entertainment-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Entertainment Services (DJ, Live Music, Anchors)</Link>
                <Link to="/services/lighting-sound-setup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lighting & Sound Setup</Link>
              </div>
            </div>
          )}
        </div>
        {user ? (
          <Link to="/dashboard" className="hover:text-blue-600">Profile</Link>
        ) : (
          <Link to="/login" className="hover:text-blue-600">Login/Signup</Link>
        )}
        <Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link>
        <Link to="/customer-query" className="hover:text-blue-600">Customer Query</Link>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden w-full mt-2 flex flex-col space-y-2 items-center">
          <Link to="/" className="block w-full text-center py-2 hover:bg-gray-100">Home</Link>
          <div className="relative w-full text-center">
            <Link to="/services" className="block w-full py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsServicesHovered(!isServicesHovered)}>Our Services</Link>
            {isServicesHovered && (
              <div className="w-full bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <p className="block px-4 py-2 text-gray-800 font-bold">Venue Booking Services</p>
                  <Link to="/services/wedding-venue-booking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wedding Venue Booking</Link>
                  <Link to="/services/engagement-reception-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Engagement & Reception Halls</Link>
                  <Link to="/services/birthday-party-venues" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Birthday Party Venues (Adults & Kids)</Link>
                  <Link to="/services/corporate-event-spaces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Corporate Event Spaces</Link>
                  <Link to="/services/banquet-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Banquet Halls & Marriage Halls</Link>
                  <Link to="/services/conference-rooms" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Conference Rooms / Meeting Spaces</Link>
                  <Link to="/services/party-lawns" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Party Lawns & Farmhouses</Link>
                  <Link to="/services/restaurants-lounges" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Restaurants & Lounges for Private Parties</Link>
                  <Link to="/services/hotels-event-packages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hotels for Stay + Event Packages</Link>
                  <p className="block px-4 py-2 text-gray-800 font-bold mt-2">🎯 Event Planning Assistance</p>
                  <Link to="/services/event-planner-recommendations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Event Planner Recommendations</Link>
                  <Link to="/services/theme-decor-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Theme & Decor Services</Link>
                  <Link to="/services/catering-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Catering Services</Link>
                  <Link to="/services/photography-videography" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Photography & Videography</Link>
                  <Link to="/services/entertainment-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Entertainment Services (DJ, Live Music, Anchors)</Link>
                  <Link to="/services/lighting-sound-setup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lighting & Sound Setup</Link>
                </div>
              </div>
            )}
          </div>
          {user ? (
            <Link to="/dashboard" className="block w-full text-center py-2 hover:bg-gray-100">Profile</Link>
          ) : (
            <Link to="/login" className="block w-full text-center py-2 hover:bg-gray-100">Login/Signup</Link>
          )}
          <Link to="/wishlist" className="block w-full text-center py-2 hover:bg-gray-100">Wishlist</Link>
          <Link to="/customer-query" className="block w-full text-center py-2 hover:bg-gray-100">Customer Query</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
