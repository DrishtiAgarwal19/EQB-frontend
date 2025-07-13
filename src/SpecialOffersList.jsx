import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialOffersList = () => {
  const navigate = useNavigate();
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
    return <div>Loading offers...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/venue/${offer.venue_id}`)}
          >
            <img
              className="h-40 sm:h-48 w-full object-cover"
              src={offer.image[0]?.url || "https://via.placeholder.com/1200x400"}
              alt={offer.title}
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Get {offer.discount_percent}% @ {offer.venueName}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">{offer.description}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Location: {offer.location}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Validity: {new Date(offer.valid_until).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersList;
