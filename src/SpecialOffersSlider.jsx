
import React from "react";

const offers = [
  { id: 1, title: "20% Off Wedding Venues", description: "Book now and save 20% on select venues!", image: "https://via.placeholder.com/300x200?text=20%25+Off" },
  { id: 2, title: "Free Decoration", description: "Get free decoration services with your booking.", image: "https://via.placeholder.com/300x200?text=Free+Decoration" },
  { id: 3, title: "Complimentary Catering", description: "Enjoy complimentary catering for your event.", image: "https://via.placeholder.com/300x200?text=Complimentary+Catering" },
  { id: 4, title: "Summer Discount", description: "Special discount for summer bookings!", image: "https://via.placeholder.com/300x200?text=Summer+Discount" },
  { id: 5, title: "Weekend Special", description: "Exclusive offers for weekend events.", image: "https://via.placeholder.com/300x200?text=Weekend+Special" },
  { id: 6, title: "Early Bird Offer", description: "Book 3 months in advance and get a bonus.", image: "https://via.placeholder.com/300x200?text=Early+Bird" },
  { id: 7, title: "Corporate Event Package", description: "Tailored packages for corporate gatherings.", image: "https://via.placeholder.com/300x200?text=Corporate+Package" },
  { id: 8, title: "Anniversary Special", description: "Celebrate your anniversary with us!", image: "https://via.placeholder.com/300x200?text=Anniversary+Special" },
  { id: 9, title: "Birthday Bash Deal", description: "Great deals for birthday parties.", image: "https://via.placeholder.com/300x200?text=Birthday+Deal" },
];

const SpecialOffersSlider = () => {
  return (
    <div className="mb-8">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-2">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-xl p-4 w-64 h-64 flex-shrink-0">
            <img src={offer.image} alt={offer.title} className="rounded-md mb-2 object-cover h-32 w-full" style={{ aspectRatio: '1/1' }} />
            <h3 className="text-md font-semibold">{offer.title}</h3>
<p className="text-gray-600 truncate">{offer.description}</p>
            <a href="#" className="text-blue-500 hover:text-blue-700">Explore More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffersSlider;
