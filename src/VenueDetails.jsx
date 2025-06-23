import React, { useState } from 'react';
import './styles.css';
import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';

const VenueDetails = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const venueName = "Venue Name"; // Replace with actual venue name

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  return (
    <div>
      <Navbar />

      <section className="venue-details">
        <div className="venue-photos">
          <div className="large-photo">
            <img src="https://via.placeholder.com/600x400" alt="Large Venue Photo" />
          </div>
          <div className="small-photos">
            <img src="https://via.placeholder.com/200x150" alt="Small Venue Photo 1" />
            <img src="https://via.placeholder.com/200x150" alt="Small Venue Photo 2" />
            <img src="https://via.placeholder.com/200x150" alt="Small Venue Photo 3" />
          </div>
        </div>

        <div className="venue-info">
          <div className="name-and-button">
            <h2>Venue Info</h2>
            <button onClick={handleBookNowClick}>Book Now</button>
          </div>
          <p><strong>Name:</strong> {venueName}</p>
          <p><strong>Type:</strong> Banquet Hall</p>
          <p><strong>Availability:</strong> Available</p>
          <p><strong>Location:</strong> City, State</p>
          <p><strong>Price per day:</strong> $1000</p>
          <p><strong>Capacity:</strong> 200</p>
          <p><strong>Amenities:</strong> WiFi, AC, Parking</p>
          <p><strong>Booking Calendar:</strong> [Calendar]</p>
        </div>

        <div className="user-reviews">
          <h2>User Reviews</h2>
          {/* Reviews go here */}
        </div>
      </section>

      {showBookingForm && (
        <div className="booking-form-overlay">
          <BookingForm venueName={venueName} />
        </div>
      )}
    </div>
  );
};

export default VenueDetails;
