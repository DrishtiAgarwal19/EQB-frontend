import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ViewVenue = () => {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchVenue();
  }, [id]);

  const fetchVenue = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/venues/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVenue(data);
      } else {
        setError('Failed to fetch venue details');
      }
    } catch (error) {
      console.error('Error fetching venue:', error);
      setError('Error fetching venue details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/venues/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          alert('Venue deleted successfully');
          navigate('/admin/venues');
        } else {
          alert('Failed to delete venue');
        }
      } catch (error) {
        console.error('Error deleting venue:', error);
        alert('Error deleting venue');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Venue Admin</h2>
          <nav className="space-y-4">
            <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Dashboard
            </Link>
            <Link to="/admin/venues" className="flex items-center p-3 rounded-lg bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 002 14v2a1 1 0 001 1h14a1 1 0 001-1v-2a1 1 0 01-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z"></path>
              </svg>
              Venues
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Venue Admin</h2>
          <nav className="space-y-4">
            <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Dashboard
            </Link>
            <Link to="/admin/venues" className="flex items-center p-3 rounded-lg bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 002 14v2a1 1 0 001 1h14a1 1 0 001-1v-2a1 1 0 01-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z"></path>
              </svg>
              Venues
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="text-center py-8">
            <p className="text-gray-500">Venue not found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Venue Admin</h2>
        <nav className="space-y-4">
          <Link to="/admin-dashboard" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            Dashboard
          </Link>
          <Link to="/admin/venues" className="flex items-center p-3 rounded-lg bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 002 14v2a1 1 0 001 1h14a1 1 0 001-1v-2a1 1 0 01-.293-.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z"></path>
            </svg>
            Venues
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{venue.hall_name}</h1>
                <Link to="/admin/venues" className="text-blue-600 hover:text-blue-800">
                  ← Back to Venues
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to={`/admin/venues/edit/${venue._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Venue
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Venue
                </button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Hall Type</label>
                <p className="text-gray-900">{venue.hall_type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                <p className="text-gray-900">{venue.location}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Price per Day</label>
                <p className="text-gray-900">₹{venue.priceperday?.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Capacity</label>
                <p className="text-gray-900">{venue.capacity || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Contact Email</label>
                <p className="text-gray-900">{venue.contactmail || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Contact Phone</label>
                <p className="text-gray-900">{venue.contact_phone || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Availability Status</label>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  venue.availabilty_status 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {venue.availabilty_status ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Average Rating</label>
                <p className="text-gray-900">
                  {venue.averageRating ? `${venue.averageRating.toFixed(1)}/5` : 'No ratings'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Destination Wedding</label>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  venue.offers_destination_wedding 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {venue.offers_destination_wedding ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            {venue.description && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <p className="text-gray-900">{venue.description}</p>
              </div>
            )}
          </div>

          {/* Images Gallery */}
          {venue.images && venue.images.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {venue.images.map((image, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.caption || `Venue image ${index + 1}`}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                      }}
                    />
                    {image.caption && (
                      <div className="p-2">
                        <p className="text-sm text-gray-600">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {venue.hall_amenities && venue.hall_amenities.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venue.hall_amenities.map((amenity, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{amenity.amenity_type}</h3>
                      <span className="text-sm text-gray-500">ID: {amenity.ameniti_id}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{amenity.amenity_description}</p>
                    <p className="text-sm text-gray-500">Quantity: {amenity.amenity_qnt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destination Wedding Packages */}
          {venue.offers_destination_wedding && venue.destination_wedding_packages && venue.destination_wedding_packages.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Destination Wedding Packages</h2>
              <div className="space-y-4">
                {venue.destination_wedding_packages.map((pkg, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{pkg.package_name}</h3>
                      <span className="text-lg font-semibold text-blue-600">
                        ₹{pkg.price?.toLocaleString()}
                      </span>
                    </div>
                    {pkg.description && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                        {pkg.description.theme && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Theme:</span>
                            <p className="text-gray-900">{pkg.description.theme}</p>
                          </div>
                        )}
                        {pkg.description.duration && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Duration:</span>
                            <p className="text-gray-900">{pkg.description.duration}</p>
                          </div>
                        )}
                        {pkg.description.location_vibe && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Location Vibe:</span>
                            <p className="text-gray-900">{pkg.description.location_vibe}</p>
                          </div>
                        )}
                        {pkg.description.audience && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Audience:</span>
                            <p className="text-gray-900">{pkg.description.audience}</p>
                          </div>
                        )}
                        {pkg.description.style && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Style:</span>
                            <p className="text-gray-900">{pkg.description.style}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Inclusions:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {pkg.inclusions.map((inclusion, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                              {inclusion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {venue.addons && venue.addons.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Add-ons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {venue.addons.map((addon, index) => (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{addon.addon_name}</h3>
                      <div className="text-right">
                        <span className="text-lg font-semibold text-blue-600">
                          ₹{addon.price?.toLocaleString()}
                        </span>
                        <div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            addon.is_available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {addon.is_available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {addon.description && (
                      <p className="text-gray-600">{addon.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {(venue.review || venue.individualRatings) && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
              {venue.review && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Review</h3>
                  <p className="text-gray-600">{venue.review}</p>
                </div>
              )}
              {venue.individualRatings && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Individual Ratings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(venue.individualRatings).map(([category, rating]) => (
                      <div key={category} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{category.replace('_', ' ')}:</span>
                        <span className="font-medium">{rating}/5</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Offers */}
          {venue.offers && venue.offers.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Special Offers</h2>
              <div className="space-y-3">
                {venue.offers.map((offer, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-900">{offer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ViewVenue;
