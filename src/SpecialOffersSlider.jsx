import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SpecialOffersSlider = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("http://localhost:3000/offers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading offers...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="mb-8">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {offers.map((offer) => (
          <Link to={`/venue/${offer.venue_id}`} key={offer._id} className="bg-white rounded-xl p-3 sm:p-4 w-56 sm:w-64 h-auto flex-shrink-0 cursor-pointer">
            <img src={offer.image?.[0]?.url || "https://via.placeholder.com/300x200"} alt={offer.title ?? 'N/A'} className="rounded-md mb-2 object-cover h-28 sm:h-32 w-full" style={{ aspectRatio: '1/1' }} />
            <h3 className="text-sm sm:text-md font-semibold">Get {offer.discount_percent}% @ {offer.venueName ?? 'N/A'}</h3>
            <p className="text-gray-600 text-xs sm:text-sm truncate">{offer.location ?? 'N/A'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersSlider;
