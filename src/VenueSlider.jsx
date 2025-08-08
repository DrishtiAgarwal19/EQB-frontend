import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:3000";

const VenueSlider = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(`${API_URL}/venues/popular`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVenues(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading popular venues...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  if (venues.length === 0) {
    return <div className="text-center py-8 text-gray-600">No popular venues found.</div>;
  }

  return (
    <div className="mb-8">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {venues.map((venue) => (
          <Link to={`/venue/${venue._id}`} key={venue._id} className="bg-white rounded-xl p-4 w-64 h-64 flex-shrink-0">
            <img src={venue.images[0].url || "https://placehold.co/300x200"} alt={venue.name} className="rounded-md mb-2 object-cover h-32 w-full" style={{ aspectRatio: '1/1' }} />
            <h3 className="text-md font-semibold">{venue.hall_name}</h3>
            <p className="text-gray-600 truncate whitespace-nowrap overflow-hidden">{venue.location}</p>
            <p className="text-gray-700">₹{venue.priceperday.toLocaleString('en-IN')}</p>
            <div className="flex items-center mt-2">
              {Array(Math.round(venue.averageRating)).fill().map((_, i) => (
                <svg key={i} className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 1l2.939 4.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
              {Array(5 - Math.round(venue.averageRating)).fill().map((_, i) => (
                <svg key={`empty-${i}`} className="w-4 h-4 mr-1 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 1l2.939 4.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
              <span className="ml-1">{venue.averageRating || 'N/A'}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VenueSlider;
