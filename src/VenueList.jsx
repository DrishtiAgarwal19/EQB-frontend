import React from 'react';
import VenueCard from './VenueCard';

const VenueList = () => {
  // Dummy venue data
  const venues = [
    {
      id: 1,
      name: 'The Grand Ballroom',
      rating: 4.5,
      reviews: 123,
      description: 'A luxurious space for weddings and galas.',
      image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'The Urban Loft',
      rating: 4.2,
      reviews: 87,
      description: 'A modern, chic venue for corporate events.',
      image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'The Lakeside Pavilion',
      rating: 4.8,
      reviews: 210,
      description: 'A scenic outdoor venue perfect for summer parties.',
      image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
    },
  ];

  return (
    <div className="venue-list-container">
      <h1>Find the perfect venue for your event</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search by venue name or location" />
      </div>
      <div className="filter-options">
        <select>
          <option>Location</option>
        </select>
        <select>
          <option>Capacity</option>
        </select>
        <select>
          <option>Event Type</option>
        </select>
        <select>
          <option>Amenities</option>
        </select>
      </div>
      <h2>Venues</h2>
      <div className="venue-list">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenueList;
