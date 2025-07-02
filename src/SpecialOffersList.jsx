import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialOffersList = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const offersData = [
    {
      id: 1,
      title: 'Exclusive Offer: 20% Off Venue Rental',
      description: 'Book your event before July 31st and receive a 20% discount on venue rental fees. Valid for events held between August 1st and December 31st. Terms and conditions apply.',
      image: 'https://via.placeholder.com/1200x400',
      venueName: 'The Grand Ballroom',
      venueLocation: 'Downtown Metropolis',
      validity: 'Valid until July 31st, 2025',
      terms: 'This offer is subject to availability and cannot be combined with other promotions. A minimum booking value may apply. Contact us for more details.',
    },
    {
      id: 2,
      title: 'Early Bird Discount: 15% Off All Bookings',
      description: 'Secure your event date at least 6 months in advance and get 15% off the total booking amount. Perfect for planners who like to get ahead!',
      image: 'https://via.placeholder.com/1200x400',
      venueName: 'The Urban Loft',
      venueLocation: 'Central City',
      validity: 'Bookings made 6 months in advance',
      terms: 'Offer applies to new bookings only. Not valid on previously confirmed events. Discount applied at the time of final payment.',
    },
    {
      id: 3,
      title: 'Weekend Wedding Package: Complimentary Champagne Toast',
      description: 'Book your wedding for a Saturday or Sunday and receive a complimentary champagne toast for all your guests. Celebrate in style!',
      image: 'https://via.placeholder.com/1200x400',
      venueName: 'The Lakeside Pavilion',
      venueLocation: 'Lake Serenity',
      validity: 'Weekend weddings only',
      terms: 'Minimum guest count of 100 required. Offer valid for events held within the next 12 months. Cannot be exchanged for cash value.',
    },
  ];

  useEffect(() => {
    setOffers(offersData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading offers...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl mb-8">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(`/special-offer/${offer.id}`)}
          >
            <img
              className="h-48 w-full object-cover"
              src={offer.image}
              alt={offer.title}
            />
            <div className="p-6">
              <h3 className="text-gray-900 font-semibold text-xl mb-2">
                {offer.title}
              </h3>
              <p className="text-gray-700 text-base mb-4">{offer.description}</p>
              <p className="text-gray-500 text-sm">Valid for: {offer.venueName}</p>
              <p className="text-gray-500 text-sm">Location: {offer.venueLocation}</p>
              <p className="text-gray-500 text-sm">Validity: {offer.validity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersList;
