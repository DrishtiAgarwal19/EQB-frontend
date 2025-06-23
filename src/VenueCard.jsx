import React from 'react';

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <img src={venue.image} alt={venue.name} />
      <div className="venue-details">
        <h3>{venue.name}</h3>
        <div className="venue-rating">
          {venue.rating} ({venue.reviews} reviews)
        </div>
        <p>{venue.description}</p>
        <button>View Details</button>
      </div>
    </div>
  );
};

export default VenueCard;
