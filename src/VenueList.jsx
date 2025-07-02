import React from 'react';
import { useNavigate } from 'react-router-dom';

const VenueList = () => {
  const navigate = useNavigate();

  const venues = [
    {
      id: 1,
      name: 'The Grand Ballroom',
      location: 'Downtown Metropolis',
      rating: 4.5,
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: 2,
      name: 'The Urban Loft',
      location: 'Central City',
      rating: 4.2,
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: 3,
      name: 'The Lakeside Pavilion',
      location: 'Lake Serenity',
      rating: 4.8,
      image: 'https://via.placeholder.com/400x300',
    },
    {
      id: 4,
      name: 'The Historic Manor',
      location: 'Old Town',
      rating: 4.0,
      image: 'https://via.placeholder.com/400x300',
    },
  ];

  return (
<div className="bg-gray-50 min-h-screen py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Find Your Perfect Venue
        </h2>
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-start items-center gap-4">
          <div className="relative inline-block text-left">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Location</option>
              <option>Downtown</option>
              <option>Uptown</option>
              <option>Suburbs</option>
            </select>
          </div>
          <div className="relative inline-block text-left">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Capacity</option>
              <option>50-100</option>
              <option>100-200</option>
              <option>200+</option>
            </select>
          </div>
          <div className="relative inline-block text-left">
            <select className="appearance-none bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>Event Type</option>
              <option>Wedding</option>
              <option>Corporate</option>
              <option>Party</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex overflow-x-auto space-x-6 pb-4">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="flex-none w-80 bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer"
              onClick={() => navigate(`/venue/${venue.id}`)}
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={venue.image}
                  alt=""
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-xl">
                  {venue.name}
                </h3>
                <p className="text-gray-500 mt-1 text-sm">{venue.location}</p>
                <p className="text-gray-500 mt-1 text-sm">{venue.rating} stars</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueList;
