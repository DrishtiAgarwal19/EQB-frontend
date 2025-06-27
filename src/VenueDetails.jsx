import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';

const VenueDetails = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const venueName = 'The Royal Garden, Jaipur'; // Replace with actual venue name
  const venueLocation = 'Jaipur, Rajasthan';
  const venueRating = 4.5;
  const venueReviewCount = 120;
  const venuePrice = '₹50,000';

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg flex items-end p-4 mb-8"
        style={{ backgroundImage: `url("https://via.placeholder.com/1200x400")` }}>
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{venueName}</h1>
          <p className="text-lg md:text-xl">{venueLocation} - {venueRating} ({venueReviewCount} reviews)</p>
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBookNowClick}>Book Now</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Add to Wishlist</button>
            <p className="text-white py-2 px-4">Check Availability</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
        <p className="text-xl text-gray-800">{venuePrice} per day</p>
      </section>

      {/* Features Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          <div className="feature-item p-4 border rounded-lg">
            <span className="text-3xl">🅿️</span>
            <p className="mt-2">Parking</p>
          </div>
          <div className="feature-item p-4 border rounded-lg">
            <span className="text-3xl">❄️</span>
            <p className="mt-2">AC/Non-AC</p>
          </div>
          <div className="feature-item p-4 border rounded-lg">
            <span className="text-3xl">🐾</span>
            <p className="mt-2">Pet Friendly</p>
          </div>
          <div className="feature-item p-4 border rounded-lg">
            <span className="text-3xl">🍽️</span>
            <p className="mt-2">Catering</p>
          </div>
          <div className="feature-item p-4 border rounded-lg">
            <span className="text-3xl">🌳</span>
            <p className="mt-2">Open Area</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-700">The Royal Garden is a premier event venue in Jaipur, offering a blend of elegance and functionality. With spacious banquet halls and lush outdoor lawns, it's perfect for weddings, corporate events, and social gatherings. Our dedicated team ensures every event is a memorable success.</p>
      </section>

      {/* Capacity Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Capacity</h2>
        <p className="text-gray-700">Up to 500 guests, 8000 sq. ft</p>
      </section>

      {/* Location Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src="https://via.placeholder.com/400x200" alt="Location Map 1" className="w-full h-auto rounded-lg" />
          <img src="https://via.placeholder.com/400x200" alt="Location Map 2" className="w-full h-auto rounded-lg" />
          <img src="https://via.placeholder.com/400x200" alt="Location Map 3" className="w-full h-auto rounded-lg" />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-6">
          <div className="review-item border-b pb-4">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/50x50" alt="Reviewer 1" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-lg">Emily Harper</p>
                <p className="text-sm text-gray-500">1 month ago</p>
              </div>
            </div>
            <div className="review-content">
              <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">The Royal Garden exceeded our expectations! The venue was stunning, and the staff was incredibly helpful. Our wedding was perfect thanks to them.</p>
            </div>
          </div>
          <div className="review-item border-b pb-4">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/50x50" alt="Reviewer 2" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-lg">Liam Foster</p>
                <p className="text-sm text-gray-500">2 months ago</p>
              </div>
            </div>
            <div className="review-content">
              <p className="text-yellow-500">⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">Great venue for corporate events. The facilities were top-notch, and the location was convenient for our attendees.</p>
            </div>
          </div>
          <div className="review-item">
            <div className="flex items-center mb-2">
              <img src="https://via.placeholder.com/50x50" alt="Reviewer 3" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-semibold text-lg">Chloe Reed</p>
                <p className="text-sm text-gray-500">3 months ago</p>
              </div>
            </div>
            <div className="review-content">
              <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
              <p className="text-gray-700 mt-2">We had a fantastic time at our social gathering. The ambiance was beautiful, and the service was excellent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          <div className="faq-item p-4 border rounded-lg">
            <p className="font-semibold text-lg mb-2">What is the booking process?</p>
            <p className="text-gray-700">To book The Royal Garden, please contact our sales team to discuss your event requirements and check availability. Once confirmed, we'll provide a booking agreement and payment schedule.</p>
          </div>
          <div className="faq-item p-4 border rounded-lg">
            <p className="font-semibold text-lg mb-2">What are the payment terms?</p>
            <p className="text-gray-700">Our payment terms involve an initial deposit to secure your date, followed by subsequent payments leading up to the event. Specific details will be outlined in your booking agreement.</p>
          </div>
          <div className="faq-item p-4 border rounded-lg">
            <p className="font-semibold text-lg mb-2">Is catering included in the package?</p>
            <p className="text-gray-700">Catering can be included in your package, and we offer a range of customizable menus to suit your preferences. Alternatively, you may choose from our list of preferred caterers.</p>
          </div>
        </div>
      </section>

      {/* Similar Venues Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Venues</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="similar-venue-item p-4 border rounded-lg text-center">
            <img src="https://via.placeholder.com/100x100" alt="Similar Venue 1" className="w-24 h-24 mx-auto rounded-full mb-2" />
            <p className="font-semibold">The Grand Palace</p>
            <p className="text-gray-600">Jaipur</p>
          </div>
          <div className="similar-venue-item p-4 border rounded-lg text-center">
            <img src="https://via.placeholder.com/100x100" alt="Similar Venue 2" className="w-24 h-24 mx-auto rounded-full mb-2" />
            <p className="font-semibold">The Emerald Gardens</p>
            <p className="text-gray-600">Jaipur</p>
          </div>
          <div className="similar-venue-item p-4 border rounded-lg text-center">
            <img src="https://via.placeholder.com/100x100" alt="Similar Venue 3" className="w-24 h-24 mx-auto rounded-full mb-2" />
            <p className="font-semibold">The Majestic Hall</p>
            <p className="text-gray-600">Jaipur</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">For inquiries and bookings, please contact us via:</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <a href="#" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center">WhatsApp</a>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">Phone</a>
        </div>
      </section>

      {showBookingForm && <BookingForm onClose={() => setShowBookingForm(false)} />}
    </div>
  );
};

export default VenueDetails;
