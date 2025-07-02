import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VenueList = () => {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:3000/venues"); // Assuming a /venues endpoint
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
    return <div className="text-center py-8">Loading venues...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  if (venues.length === 0) {
    return <div className="text-center py-8 text-gray-600">No venues found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Find Your Perfect Venue
        </h2>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-start items-center gap-4">
          <div className="relative inline-block text-left">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Location</option>
              <option>Downtown</option>
              <option>Uptown</option>
              <option>Suburbs</option>
            </select>
          </div>
          <div className="relative inline-block text-left">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Capacity</option>
              <option>50-100</option>
              <option>100-200</option>
              <option>200+</option>
            </select>
          </div>
          <div className="relative inline-block text-left">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Event Type</option>
              <option>Wedding</option>
              <option>Corporate</option>
              <option>Party</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex overflow-x-auto space-x-6 pb-4">
          {venues.map((venue) => (
            <div
              key={venue._id}
              className="flex-none w-96 bg-white rounded-lg shadow-md overflow-hidden flex flex-row cursor-pointer"
              onClick={() => navigate(`/venue/${venue._id}`)}
            >
              <div className="flex-shrink-0 w-1/3">
                <img
                  className="h-full w-full object-cover"
                  src={venue.images?.[0]?.url || "https://via.placeholder.com/300x200"}
                  alt={venue.hall_name ?? 'Venue Image'}
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-gray-900 font-semibold text-xl">
                  {venue.hall_name}
                </h3>
                <p className="text-gray-500 mt-1 text-sm">{venue.location}</p>
                <p className="text-gray-500 mt-1 text-sm">{venue.averageRating} stars</p>
                <p className="text-gray-700 mt-2">₹{venue.priceperday?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueList;
