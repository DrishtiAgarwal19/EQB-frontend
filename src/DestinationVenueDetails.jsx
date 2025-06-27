import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import BookingForm from './BookingForm';

const DestinationVenueDetails = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const venueName = "Venue Name"; // Replace with actual venue name

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  return (
    <div className="venue-details-container">
      <section className="hero-section" style={{ position: 'relative' }}>
        <img src="https://via.placeholder.com/1200x400" alt="Venue Hero" className="hero-image" />
        <div className="hero-content">
          <h1 className="venue-name">Tranquil Tides</h1>
          <p className="venue-description">Your dream wedding destination</p>
        </div>
        <button className="book-now-button" onClick={handleBookNowClick}>Book Now</button>
      </section>

      <section className="photo-gallery">
        <h2>Photo Gallery</h2>
        <div className="photo-list">
          <img src="https://via.placeholder.com/200x150" alt="Venue Photo 1" />
          <img src="https://via.placeholder.com/200x150" alt="Venue Photo 2" />
          <img src="https://via.placeholder.com/200x150" alt="Venue Photo 3" />
          <img src="https://via.placeholder.com/200x150" alt="Venue Photo 4" />
          <img src="https://via.placeholder.com/200x150" alt="Venue Photo 5" />
        </div>
      </section>

      <section className="wedding-packages">
        <h2>Wedding Packages</h2>
        <div className="package-list">
          <div className="package">
            <h3>Silver</h3>
            <p className="price">$5,000 per event</p>
            <button>Select</button>
            <ul>
              <li>Basic setup</li>
              <li>Photography</li>
              <li>Catering</li>
            </ul>
          </div>
          <div className="package">
            <h3>Gold</h3>
            <p className="price">$10,000 per event</p>
            <button>Select</button>
            <ul>
              <li>Enhanced setup</li>
              <li>Photography & Videography</li>
              <li>Premium Catering</li>
              <li>DJ</li>
            </ul>
          </div>
          <div className="package">
            <h3>Platinum</h3>
            <p className="price">$15,000 per event</p>
            <button>Select</button>
            <ul>
              <li>Luxury setup</li>
              <li>Photography & Videography</li>
              <li>Gourmet Catering</li>
              <li>DJ & Live Band</li>
              <li>Wedding Planner</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="venue-features">
        <h2>Venue Features</h2>
        <div className="feature-list">
          <div className="feature">
            <span className="icon">👥</span>
            <p>Guest Capacity</p>
            <p>Up to 200 guests</p>
          </div>
          <div className="feature">
            <span className="icon">🎵</span>
            <p>DJ & Entertainment</p>
            <p>Professional DJ services</p>
          </div>
          <div className="feature">
            <span className="icon">🍽️</span>
            <p>Catering</p>
            <p>Customizable menus</p>
          </div>
          <div className="feature">
            <span className="icon">🌸</span>
            <p>Decoration</p>
            <p>Elegant floral arrangements</p>
          </div>
          <div className="feature">
            <span className="icon">📅</span>
            <p>Wedding Planner</p>
            <p>Dedicated wedding planner</p>
          </div>
        </div>
      </section>

      <section className="location">
        <h2>Location</h2>
        <img src="https://via.placeholder.com/600x200" alt="Location Map" />
      </section>

      <section className="contact-us">
        <h2>Contact Us</h2>
        <p>For inquiries and bookings, please contact us via:</p>
        <a href="#">WhatsApp</a>
        <a href="#">Phone</a>
      </section>
    </div>
  );
};

export default DestinationVenueDetails;
