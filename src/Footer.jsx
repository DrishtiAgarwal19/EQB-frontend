import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-4">QualityBook</h3>
          <p className="text-gray-400 text-sm sm:text-base">Your ultimate destination for booking the perfect venue for any event.</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white text-lg"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-lg"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-lg"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-400 hover:text-white text-lg"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link to="/explore-destinations" className="text-gray-400 hover:text-white">Explore Venues</Link></li>
            <li><Link to="/special-offers" className="text-gray-400 hover:text-white">Special Offers</Link></li>
            <li><Link to="/customer-query" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            <li><Link to="/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-span-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li><Link to="/services/wedding-venue-booking" className="text-gray-400 hover:text-white">Wedding Venues</Link></li>
            <li><Link to="/services/corporate-event-spaces" className="text-gray-400 hover:text-white">Corporate Events</Link></li>
            <li><Link to="/services/birthday-party-venues" className="text-gray-400 hover:text-white">Birthday Parties</Link></li>
            <li><Link to="/services/banquet-halls" className="text-gray-400 hover:text-white">Banquet Halls</Link></li>
            <li><Link to="/services/event-planner-recommendations" className="text-gray-400 hover:text-white">Event Planning</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="col-span-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Contact Info</h3>
          <p className="text-gray-400 text-sm sm:text-base">123 Venue Lane, Event City, State, 12345</p>
          <p className="text-gray-400 text-sm sm:text-base">Email: info@qualitybook.com</p>
          <p className="text-gray-400 text-sm sm:text-base">Phone: +1 (123) 456-7890</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
        &copy; {new Date().getFullYear()} QualityBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
