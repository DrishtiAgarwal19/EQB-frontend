import React from 'react';

const SpecialOffersList = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Special Offers</h1>
      <p className="text-gray-600 mb-8">Explore exclusive deals and discounts from our partner venues.</p>

      {/* Offer 1 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Summer Celebration</h2>
          <p className="text-gray-600 mb-2">Enjoy 20% off on all venue bookings made in June and July. Perfect for summer weddings and parties.</p>
          <a href="#" className="text-blue-500 hover:text-blue-700">View Details</a>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x300" alt="Summer Celebration" className="rounded-md" />
        </div>
      </div>

      {/* Offer 2 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Corporate Event Discount</h2>
          <p className="text-gray-600 mb-2">Get 15% off on venue rentals for corporate events booked in August. Ideal for conferences and workshops.</p>
          <a href="#" className="text-blue-500 hover:text-blue-700">View Details</a>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x300" alt="Corporate Event Discount" className="rounded-md" />
        </div>
      </div>

      {/* Offer 3 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Holiday Season Special</h2>
          <p className="text-gray-600 mb-2">Book your holiday party venue before November 1st and receive a complimentary catering package upgrade.</p>
          <a href="#" className="text-blue-500 hover:text-blue-700">View Details</a>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x300" alt="Holiday Season Special" className="rounded-md" />
        </div>
      </div>

      {/* Offer 4 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Last Minute Deals</h2>
          <p className="text-gray-600 mb-2">Check out our last-minute venue availability for this weekend and enjoy up to 30% off.</p>
          <a href="#" className="text-blue-500 hover:text-blue-700">View Details</a>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x300" alt="Last Minute Deals" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersList;
