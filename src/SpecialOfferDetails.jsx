import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';
import BookingForm from './BookingForm'; // Assuming BookingForm is generic enough or will be adapted

const SpecialOfferDetails = () => {
  const { id } = useParams();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/offers/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffer(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferDetails();
  }, [id]);

  const handleBookNowClick = () => {
    setShowBookingForm(true);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading offer details...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error.message}</div>;
  }

  if (!offer) {
    return <div className="container mx-auto px-4 py-8 text-center">Offer not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg flex items-end p-4 mb-8"
        style={{ backgroundImage: `url("${offer.images[0].url}")` }}>
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{offer.hall_name}</h1>
          <p className="text-lg md:text-xl">{offer.location} - {offer.averageRating} ({Object.keys(offer.individualRatings).length} reviews)</p>
          <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBookNowClick}>Book Now</button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">Add to Wishlist</button>
            <p className="text-white py-2 px-4">Check Availability</p>
          </div>
        </div>
      </section>

      {/* Special Offer Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Special Offer Details</h2>
        <p className="text-gray-700 mb-2">{offer.special_offer.offer_description}</p>
        <p className="text-gray-600 text-sm">Validity: {offer.special_offer.offer_start_date} to {offer.special_offer.offer_end_date}</p>
        <p className="text-gray-600 text-sm">Discount: {offer.special_offer.discount_percent}%</p>
        <div className="mt-4 flex items-center space-x-4">
          <img src={offer.images[0].url} alt={offer.images[0].caption} className="rounded-lg object-cover" />
        </div>
      </section>

      {/* Venue Gallery */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Venue Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {offer.images.map((image, index) => (
            <img key={index} src={image.url} alt={image.caption} className="w-full h-auto rounded-lg object-cover" />
          ))}
        </div>
      </section>

      {/* Venue Details */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Venue Details</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Hall Type:</strong> {offer.hall_type}</p>
          <p className="text-gray-700"><strong>Price Per Day:</strong> ₹{offer.priceperday}</p>
          <p className="text-gray-700"><strong>Availability:</strong> {offer.availabilty_status ? 'Available' : 'Not Available'}</p>
          <p className="text-gray-700"><strong>Amenities:</strong></p>
          <ul className="list-disc list-inside ml-4">
            {offer.hall_amenities.map((amenity) => (
              <li key={amenity.ameniti_id}>{amenity.amenity_type}: {amenity.amenity_description} (Quantity: {amenity.amenity_qnt})</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-6">
          {Object.entries(offer.individualRatings).map(([user, rating]) => (
            <div key={user} className="review-item border-b pb-4">
              <div className="flex items-center mb-2">
                <img src="https://via.placeholder.com/50x50" alt="Reviewer" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-lg">{user}</p>
                  <p className="text-sm text-gray-500">Rating: {rating}</p>
                </div>
              </div>
              <div className="review-content">
                <p className="text-yellow-500">{'⭐'.repeat(Math.floor(rating))}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-4">For inquiries and bookings, please contact us via:</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <a href="#" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center">WhatsApp</a>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">Phone</a>
        </div>
      </section>

      {showBookingForm && <BookingForm onClose={() => setShowBookingForm(false)} />}
    </div>
  );
};

export default SpecialOfferDetails;
