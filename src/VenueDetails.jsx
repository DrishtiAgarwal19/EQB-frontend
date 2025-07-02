import React, { useState, useEffect } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

const VenueDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [venue, setVenue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/halls/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVenue(data);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError(error);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error.message}</div>;
  }

  if (!venue) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading venue details...</div>;
  }

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg flex items-end p-4 mb-8"
        style={{ backgroundImage: `url("${venue.images[0]?.url || 'https://via.placeholder.com/1200x400'}")` }}>
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{venue.hall_name}</h1>
          <p className="text-lg md:text-xl">{venue.location} - {venue.averageRating} ({Object.keys(venue.individualRatings).length} reviews)</p>
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBookNowClick}>Book Now</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Add to Wishlist</button>
            <p className="text-white py-2 px-4">Check Availability: {venue.availabilty_status ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
        <p className="text-xl text-gray-800">₹{venue.priceperday} per day</p>
      </section>

      {/* Features Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
          {venue.hall_amenities.map((amenity) => (
            <div key={amenity.ameniti_id} className="feature-item p-4 border rounded-lg">
              <p className="mt-2">{amenity.amenity_type}</p>
              <p className="text-sm text-gray-500">{amenity.amenity_description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hall Type</h2>
        <p className="text-gray-700">{venue.hall_type}</p>
      </section>

      {/* Location Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Location Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {venue.images.map((image) => (
            <img key={image._id} src={image.url} alt={image.caption} className="w-full h-auto rounded-lg" />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-6">
          {Object.entries(venue.individualRatings).map(([user, rating]) => (
            <div key={user} className="review-item border-b pb-4">
              <div className="flex items-center mb-2">
                <img src="https://via.placeholder.com/50x50" alt={user} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-lg">{user}</p>
                </div>
              </div>
              <div className="review-content">
                <p className="text-yellow-500">{'⭐'.repeat(Math.floor(rating))}</p>
                <p className="text-gray-700 mt-2">Rating: {rating}</p>
              </div>
            </div>
          ))}
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
