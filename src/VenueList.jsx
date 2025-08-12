import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const VenueList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query.get('query') || '');

  // Function to fetch all venues (for initial load or when no search query)
  const fetchAllVenues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/venues"); // Assuming this endpoint fetches all venues
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

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = "http://localhost:3000/venues/search";
      const params = new URLSearchParams();
      if (searchQuery) {
        params.append('query', searchQuery);
        params.append('location', searchQuery); // Send searchQuery as location as well
      }
      
      if (params.toString()) {
          url = `${url}?${params.toString()}`;
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

  useEffect(() => {
    if (location.state && location.state.venues) {
      setVenues(location.state.venues);
      setLoading(false);
    } else {
      fetchAllVenues(); // Fetch all venues on initial load if no specific venues are passed
    }
  }, [location.state]); // Only re-run if location.state changes (e.g., navigation with state)

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
          <div className="relative text-left w-full flex">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="appearance-none bg-white border border-gray-300 rounded-l-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm flex-grow"
            />
            <button
              onClick={handleSearch}
              className="bg-royal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
              style={{ backgroundColor: 'royalblue', color: 'white' }}
            >
              Search
            </button>
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
