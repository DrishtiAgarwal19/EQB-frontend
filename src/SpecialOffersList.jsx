import React, { useState, useEffect } from 'react';

const SpecialOffersList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api-docs/#/Offer/get_offers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Special Offers</h2>
      <ul>
        {offers.map(offer => (
          <li key={offer.id}>
            {offer.title} - {offer.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialOffersList;
