import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VenueList = () => {
  const navigate = useNavigate();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState(""); // 'asc' for low to high, 'desc' for high to low
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "http://localhost:3000/venues";
        if (searchQuery) {
          url = `http://localhost:3000/venues/search?query=${encodeURIComponent(searchQuery)}`;
        } else if (sortOrder) {
          url = `http://localhost:3000/venues/sortByPrice?sortOrder=${sortOrder}`;
        }
        const response = await fetch(url);
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
  }, [sortOrder, searchQuery]);

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
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Find Your Perfect Venue
        </h2>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-start items-center gap-4 flex-wrap">
          <div className="relative inline-block text-left w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full"
            />
          </div>
          <div className="relative inline-block text-left w-full sm:w-auto">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full">
              <option>Capacity</option>
              <option>50-100</option>
              <option>100-200</option>
              <option>200+</option>
            </select>
          </div>
          <div className="relative inline-block text-left w-full sm:w-auto">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full">
              <option>Event Type</option>
              <option>Wedding</option>
              <option>Corporate</option>
              <option>Party</option>
            </select>
          </div>
          <div className="relative inline-block text-left w-full sm:w-auto">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div
              key={venue._id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105"
              onClick={() => navigate(`/venue/${venue._id}`)}
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={venue.images?.[0]?.url || "https://via.placeholder.com/400x300"}
                  alt={venue.hall_name ?? 'Venue Image'}
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-lg sm:text-xl truncate">
                  {venue.hall_name}
                </h3>
                <p className="text-gray-500 mt-1 text-xs sm:text-sm truncate">{venue.location}</p>
                <p className="text-gray-500 mt-1 text-xs sm:text-sm">{venue.averageRating} stars</p>
                <p className="text-gray-700 mt-2 text-base sm:text-lg font-bold">₹{venue.priceperday?.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueList;
