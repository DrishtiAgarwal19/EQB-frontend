'use client';

import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import { useParams, Link } from 'react-router-dom';
import BookingForm from './BookingForm';
import axios from 'axios';
import { useAuth } from './AuthContext';

const VenueDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [venue, setVenue] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Get user from AuthContext

  const fetchRatings = useCallback(async () => {
    try {
      const ratingsResponse = await axios.get(`http://localhost:3000/ratings/${id}`);
      setRatings(ratingsResponse.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      // Don't set global error for ratings, just log it
    }
  }, [id]);

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

    fetchVenueDetails();
    fetchRatings();
  }, [id, fetchRatings]);

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">Error: {error.message}</div>;
  }

  if (!venue) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading venue details...</div>;
  }

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token not found. Please log in again.');
      return;
    }

    const wishlistItem = {
      venue_id: venue._id,
      image: venue.images[0]?.url || 'https://via.placeholder.com/300x200',
      venueName: venue.hall_name,
      ratings: venue.averageRating,
      location: venue.location,
    };

    try {
      await axios.post('http://localhost:3000/wishlist', wishlistItem, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      if (error.response && error.response.status === 401) {
        alert('Your session has expired. Please log in again.');
      } else {
        alert('Failed to add to wishlist.');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main content of VenueDetails */}
      <>
        {/* Hero Section */}
        <section className="relative h-48 sm:h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg flex items-end p-4 sm:p-6 mb-6 sm:mb-8"
          style={{ backgroundImage: `url("${venue.images[0]?.url || 'https://via.placeholder.com/1200x400'}")` }}>
          <div className="text-white">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{venue.hall_name}</h1>
            <p className="text-sm sm:text-base">{venue.location} - {venue.averageRating} ({Object.keys(venue.individualRatings).length} reviews)</p>
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base" onClick={handleBookNowClick}>Book Now</button>
              <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base" onClick={handleAddToWishlist}>Add to Wishlist</button>
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
                <div key={ratingItem._id} className="review-item border-b pb-3 sm:pb-4">
                  <div className="flex items-center mb-1 sm:mb-2">
                    {/* Assuming ratingItem has a user object with name and potentially an avatar */}
                    <img src={ratingItem.user?.avatar || "https://via.placeholder.com/50x50"} alt={ratingItem.user?.name || "Anonymous"} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4" />
                    <div>
                      <p className="font-semibold text-base sm:text-lg">{ratingItem.user?.name || "Anonymous"}</p>
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
              <p className="text-gray-700 text-sm sm:text-base">No reviews available yet. Be the first to rate this venue!</p>
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

        {/* Give a Rating Section */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Give a Rating</h2>
          {user ? (
            <RatingForm venueId={id} userPhone={user.phone_no} onRatingSubmitted={fetchRatings} />
          ) : (
            <p className="text-gray-700 text-sm sm:text-base">Please <Link to="/login" className="text-blue-600 font-semibold hover:underline">log in</Link> to submit a rating.</p>
          )}
        </section>
      </>

      {/* Booking Form Section */}
      {showBookingForm && (
        <div className="booking-form-overlay">
          <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Book This Venue</h2>
            <BookingForm venueName={venue.hall_name} venueId={venue._id} onClose={() => setShowBookingForm(false)} />
          </section>
        </div>
      )}
    </div>
  );
};

const RatingForm = ({ venueId, userPhone, onRatingSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (rating === 0) {
      setSubmitError("Please select a rating.");
      return;
    }

    if (!userPhone) {
      setSubmitError("User phone number not available. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/ratings`, {
        hall_id: venueId,
        user_phone: userPhone,
        rating,
        review: comment,
      });
      console.log("Rating submitted successfully:", response.data);
      setSubmitSuccess("Your rating has been submitted successfully!");
      setRating(0);
      setComment("");
      if (onRatingSubmitted) {
        onRatingSubmitted(); // Re-fetch ratings to update the list
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError("Failed to submit rating. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitError}</span>
        </div>
      )}
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitSuccess}</span>
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating:</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-semibold text-gray-700">
          Comment (Optional)
        </label>
        <textarea
          id="comment"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          placeholder="Share your experience..."
        ></textarea>
      </div>
      <button
        type="submit"
        className={`royal-blue-button text-white py-2 px-4 rounded-lg font-semibold transition-shadow shadow-md ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
};

export default VenueDetails;
