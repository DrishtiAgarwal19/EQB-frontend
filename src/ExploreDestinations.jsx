import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExploreDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/destinationWeddingPage');
        setDestinations(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching destination wedding data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return <div className="body bg-gray-50 min-h-screen w-screen flex items-center justify-center">Loading destinations...</div>;
  }

  if (error) {
    return <div className="body bg-gray-50 min-h-screen w-screen flex items-center justify-center text-red-600">Error: {error.message}</div>;
  }

  return (
    <div className="body bg-gray-50 min-h-screen w-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Destination Weddings</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">Find the perfect place to say 'I do'</p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative flex items-center bg-white rounded-full shadow-md p-2 sm:p-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by destination or venue name"
              className="flex-grow outline-none text-gray-700 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Popular Destinations */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Popular Destinations</h2>
          <div className="popular-destinations grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {(Array.isArray(destinations) ? destinations : []).map((destination) => (
              <div key={destination._id} className="destination-card bg-white rounded-lg shadow-md overflow-hidden">
                <img src={destination.image_url || "https://via.placeholder.com/300x200"} alt={destination.destination_name} className="w-full h-28 sm:h-32 object-cover" />
                <div className="p-2 sm:p-3">
                  <h3 className="text-sm sm:text-md font-medium text-gray-800">{destination.destination_name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{destination.description}</p>
                  <Link to={`/destination-venue/${destination._id}`} className="mt-2 px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Venues - Assuming this data is part of the same API or fetched separately */}
        {/* For now, I'll remove the hardcoded featured venues as the API only provides destinations */}
        {/* If the API provides featured venues, I would map them here */}
        {/* <section>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Featured Venues</h2>
          <div className="featured-venues grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Map fetched featured venues here }
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default ExploreDestinations;
