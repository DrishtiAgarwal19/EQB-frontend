import React, { useState } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

const DestinationVenueDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const venue = {
    _id: "mock-id-123",
    hall_name: "Tranquil Tides",
    location: "Udaipur, Rajasthan", // Placeholder, not explicitly in image but good to keep
    description: "Tranquil Tides offers a breathtaking beachfront setting for your dream wedding. With stunning ocean views and elegant facilities, we provide the perfect backdrop for a memorable celebration.",
    historical_background: "", // Not in image
    images: [
      { url: "https://i.imgur.com/F02Q001.png", caption: "Main Venue" },
      { url: "https://i.imgur.com/F02Q001.png", caption: "Gallery Image 1" },
      { url: "https://i.imgur.com/F02Q001.png", caption: "Gallery Image 2" },
      { url: "https://i.imgur.com/F02Q001.png", caption: "Gallery Image 3" },
      { url: "https://i.imgur.com/F02Q001.png", caption: "Gallery Image 4" },
      { url: "https://i.imgur.com/F02Q001.png", caption: "Gallery Image 5" },
    ],
    rating: 4.8, // Not explicitly in image, but good to keep
    reviews_count: 125, // Not explicitly in image, but good to keep
    starting_price_per_day: "5,00,000", // Not explicitly in image, but good to keep
    venue_type: "Beachside", // Placeholder
    min_guests: 100, // Placeholder
    max_guests: 1000, // Placeholder
    is_available: true, // Placeholder
    ideal_for: ["Destination Weddings", "Pre-wedding Shoots", "Reception"], // Not explicitly in image
    packages: [
      {
        _id: "pkg1",
        name: "Silver",
        price: "5,000",
        features: ["Basic setup", "Photography", "Catering for 50 guests"],
      },
      {
        _id: "pkg2",
        name: "Gold",
        price: "10,000",
        features: ["Enhanced setup", "Photography & Videography", "Catering for 100 guests", "DJ & Entertainment"],
      },
      {
        _id: "pkg3",
        name: "Platinum",
        price: "15,000",
        features: ["Luxury setup", "Photography & Videography", "Catering for 150 guests", "DJ & Entertainment", "Wedding Planner"],
      },
    ],
    features: [
      { _id: "f1", name: "Guest Capacity", icon: "👥", description: "Up to 200 guests" },
      { _id: "f2", name: "DJ & Entertainment", icon: "🎵", description: "Professional DJ services" },
      { _id: "f3", name: "Catering", icon: "🍽️", description: "Customizable menus" },
      { _id: "f4", name: "Decoration", icon: "🌸", description: "Elegant floral arrangements" },
      { _id: "f5", name: "Wedding Planner", icon: "🗓️", description: "Dedicated wedding coordinator" },
    ],
    location_map_url: "https://i.imgur.com/F02Q001.png", // Using a placeholder image for the map
    manager_name: "Venue Manager", // Placeholder
    contact_phone: "+1-555-123-4567",
    contact_email: "info@tranquiltides.com", // Placeholder
  };

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Assuming it's handled by App.jsx */}
      {/* 2. Hero Section / Banner */}
      <section className="relative w-full h-64 sm:h-80 md:h-[500px] bg-cover bg-center flex items-end justify-start p-4 sm:p-10"
        style={{ backgroundImage: `url("${venue.images[0]?.url}")` }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative text-white max-w-full sm:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">{venue.hall_name}</h1>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">{venue.description}</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 sm:py-3 sm:px-8 rounded-lg shadow-lg transition duration-300 text-sm sm:text-base" onClick={handleBookNowClick}>Book Now</button>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Photo Gallery Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {venue.images.slice(1).map((image, index) => ( // Slice to skip the main hero image
              <div key={index} className="overflow-hidden rounded-lg shadow-md">
                <img src={image.url} alt={image.caption} className="w-full h-24 sm:h-32 object-cover transform hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Wedding Packages Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Wedding Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {venue.packages.map((pkg) => (
              <div key={pkg._id} className="bg-white p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{pkg.name}</h3>
                  <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">${pkg.price}<span className="text-base sm:text-lg font-normal text-gray-600"> per event</span></p>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 transition duration-300 text-sm sm:text-base">Select</button>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Venue Features Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Venue Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
            {venue.features.map((feature) => (
              <div key={feature._id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl mb-2 sm:mb-3">{feature.icon}</span>
                <p className="font-semibold text-base sm:text-lg text-gray-800">{feature.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Location</h2>
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl border border-gray-200 p-4 bg-white flex items-center justify-center">
            <img src={venue.location_map_url} alt="Location Map" className="max-w-full max-h-full object-contain" />
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Contact Us</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">For inquiries and bookings, please contact us via:</p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-2xl sm:text-3xl text-green-500">💬</span>
              <p className="text-base sm:text-lg text-gray-800">WhatsApp</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <span className="text-2xl sm:text-3xl text-blue-500">📞</span>
              <p className="text-base sm:text-lg text-gray-800">Phone</p>
              <p className="text-base sm:text-lg text-gray-600 ml-2">{venue.contact_phone}</p>
            </div>
          </div>
        </section>
      </div>

      {showBookingForm && <BookingForm venueName={venue.hall_name} onClose={() => setShowBookingForm(false)} />}
    </div>
  );
};

export default DestinationVenueDetails;
