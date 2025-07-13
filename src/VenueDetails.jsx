import React, { useState, useEffect } from 'react';
import './styles.css';
import { useParams } from 'react-router-dom';
import BookingForm from './BookingForm';

const VenueDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [venue, setVenue] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const venueResponse = await fetch(`http://localhost:3000/halls/${id}`);
        if (!venueResponse.ok) {
          throw new Error(`HTTP error! status: ${venueResponse.status}`);
        }
        const venueData = await venueResponse.json();
        setVenue(venueData);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError(error);
      }
    };

    const fetchRatings = async () => {
      try {
        const ratingsResponse = await fetch(`http://localhost:3000/ratings`);
        if (!ratingsResponse.ok) {
          throw new Error(`HTTP error! status: ${ratingsResponse.status}`);
        }
        const ratingsData = await ratingsResponse.json();
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        // Don't set global error for ratings, just log it
      }
    };

    fetchVenueDetails();
    fetchRatings();
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
      <section className="relative h-48 sm:h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg flex items-end p-4 sm:p-6 mb-6 sm:mb-8"
        style={{ backgroundImage: `url("${venue.images[0]?.url || 'https://via.placeholder.com/1200x400'}")` }}>
        <div className="text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{venue.hall_name}</h1>
          <p className="text-sm sm:text-base">{venue.location} - {venue.averageRating} ({Object.keys(venue.individualRatings).length} reviews)</p>
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base" onClick={handleBookNowClick}>Book Now</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base">Add to Wishlist</button>
            <p className="text-white py-1 px-3 sm:py-2 sm:px-4 text-sm sm:text-base">Check Availability: {venue.availabilty_status ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Pricing</h2>
        <p className="text-lg sm:text-xl text-gray-800">INR {venue.priceperday} per day</p>
      </section>

      {/* Offers Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Special Offers</h2>
        {venue.offers && venue.offers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {venue.offers.map((offer) => (
              <div key={offer._id} className="offer-item p-3 sm:p-4 border rounded-lg">
                <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">{offer.title}</h3>
                <p className="text-gray-700 text-xs sm:text-sm mb-1 sm:mb-2">{offer.description}</p>
                <p className="text-green-600 font-bold text-sm sm:text-base">Discount: {offer.discount_percent}%</p>
                <p className="text-gray-500 text-xs">Valid until: {new Date(offer.valid_until).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-sm sm:text-base">No special offers available for this venue at the moment.</p>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-center">
          {venue.hall_amenities.map((amenity) => (
            <div key={amenity.ameniti_id} className="feature-item p-3 sm:p-4 border rounded-lg">
              <p className="mt-1 sm:mt-2 text-sm sm:text-base">{amenity.amenity_type}</p>
              <p className="text-xs sm:text-sm text-gray-500">{amenity.amenity_description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Hall Type</h2>
        <p className="text-gray-700 text-sm sm:text-base">{venue.hall_type}</p>
      </section>

      {/* Location Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Location Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {venue.images.map((image) => (
            <img key={image._id} src={image.url} alt={image.caption} className="w-full h-32 sm:h-40 object-cover rounded-lg" />
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Reviews</h2>
        <div className="space-y-4 sm:space-y-6">
          {ratings.length > 0 ? (
            ratings.map((ratingItem) => (
              <div key={ratingItem.id} className="review-item border-b pb-3 sm:pb-4">
                <div className="flex items-center mb-1 sm:mb-2">
                  <img src="https://via.placeholder.com/50x50" alt={ratingItem.user} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
                  <div>
                    <p className="font-semibold text-base sm:text-lg">{ratingItem.user}</p>
                  </div>
                </div>
                <div className="review-content">
                  <p className="text-yellow-500 text-sm sm:text-base">{'⭐'.repeat(Math.floor(ratingItem.rating))}</p>
                  <p className="text-gray-700 mt-1 sm:mt-2 text-sm sm:text-base">Rating: {ratingItem.rating}</p>
                  {ratingItem.comment && <p className="text-gray-600 mt-1 text-xs sm:text-sm">"{ratingItem.comment}"</p>}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-sm sm:text-base">No reviews available yet.</p>
          )}
        </div>
      </section>


      {/* Contact Us Section */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">For inquiries and bookings, please contact us via:</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <a href="#" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center text-sm sm:text-base">WhatsApp</a>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center text-sm sm:text-base">Phone</a>
        </div>
      </section>

      {showBookingForm && <BookingForm venueName={venue.hall_name} onClose={() => setShowBookingForm(false)} />}
    </div>
  );
};

export default VenueDetails;
