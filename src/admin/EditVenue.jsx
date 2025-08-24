import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const EditVenue = () => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const { id } = useParams();
  const navigate = useNavigate();

  // Offers state
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [showAddOfferForm, setShowAddOfferForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [offerFormData, setOfferFormData] = useState({
    startDate: '',
    endDate: '',
    discount_percent: '',
    description: ''
  });

  // Basic Information
  const [formData, setFormData] = useState({
    hall_name: '',
    hall_type: '',
    location: '',
    priceperday: '',
    capacity: '',
    description: '',
    contactmail: '',
    contact_phone: '',
    availabilty_status: true,
    offers_destination_wedding: false,
  });

  // Dynamic arrays
  const [amenities, setAmenities] = useState([{
    ameniti_id: '',
    amenity_type: '',
    amenity_description: '',
    amenity_qnt: ''
  }]);

  const [images, setImages] = useState([{
    url: '',
    caption: ''
  }]);

  const [destinationPackages, setDestinationPackages] = useState([{
    package_name: '',
    description: {
      theme: '',
      duration: '',
      location_vibe: '',
      audience: '',
      style: ''
    },
    price: '',
    inclusions: []
  }]);

  const [addons, setAddons] = useState([{
    addon_name: '',
    description: '',
    price: '',
    is_available: true
  }]);

  useEffect(() => {
    fetchVenueWithOffers();
  }, [id]);

  const fetchVenueWithOffers = async () => {
    try {
      setFetchLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/venues/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const venue = await response.json();
        
        // Populate form data
        setFormData({
          hall_name: venue.hall_name || '',
          hall_type: venue.hall_type || '',
          location: venue.location || '',
          priceperday: venue.priceperday || '',
          capacity: venue.capacity || '',
          description: venue.description || '',
          contactmail: venue.contactmail || '',
          contact_phone: venue.contact_phone || '',
          availabilty_status: venue.availabilty_status !== undefined ? venue.availabilty_status : true,
          offers_destination_wedding: venue.offers_destination_wedding || false,
        });

        // Populate amenities
        if (venue.hall_amenities && venue.hall_amenities.length > 0) {
          setAmenities(venue.hall_amenities);
        }

        // Populate images
        if (venue.images && venue.images.length > 0) {
          setImages(venue.images);
        }

        // Populate destination packages
        if (venue.destination_wedding_packages && venue.destination_wedding_packages.length > 0) {
          setDestinationPackages(venue.destination_wedding_packages);
        }

        // Populate addons
        if (venue.addons && venue.addons.length > 0) {
          setAddons(venue.addons);
        }

        // Populate offers from the venue data
        if (venue.offers && venue.offers.length > 0) {
          setOffers(venue.offers);
        } else {
          setOffers([]);
        }
      } else {
        setError('Failed to fetch venue details');
      }
    } catch (error) {
      console.error('Error fetching venue:', error);
      setError('Error fetching venue details');
    } finally {
      setFetchLoading(false);
    }
  };

  // Updated function to refresh offers after CRUD operations
  const refreshOffers = async () => {
    try {
      setOffersLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/venues/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const venue = await response.json();
        if (venue.offers && venue.offers.length > 0) {
          setOffers(venue.offers);
        } else {
          setOffers([]);
        }
      }
    } catch (error) {
      console.error('Error refreshing offers:', error);
    } finally {
      setOffersLoading(false);
    }
  };

  const getOfferStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 'Upcoming';
    if (now > end) return 'Expired';
    return 'Active';
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    
    if (new Date(offerFormData.endDate) <= new Date(offerFormData.startDate)) {
      setError('End date must be after start date');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Convert dates to ISO format as expected by the API
      const startDate = new Date(offerFormData.startDate + 'T00:00:00.000Z').toISOString();
      const endDate = new Date(offerFormData.endDate + 'T23:59:59.999Z').toISOString();
      
      const payload = {
        hall_id: id, // ObjectId as required by API
        startDate: startDate, // ISO format
        endDate: endDate, // ISO format
        discount_percent: Number(offerFormData.discount_percent),
        description: offerFormData.description || undefined // Optional field
      };

      const url = editingOffer 
        ? `http://localhost:3000/offers/${editingOffer._id}`
        : 'http://localhost:3000/offers';
      
      const method = editingOffer ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess(editingOffer ? 'Offer updated successfully!' : 'Offer added successfully!');
        setShowAddOfferForm(false);
        setEditingOffer(null);
        setOfferFormData({
          startDate: '',
          endDate: '',
          discount_percent: '',
          description: ''
        });
        refreshOffers();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save offer');
      }
    } catch (error) {
      console.error('Error saving offer:', error);
      setError('Error saving offer. Please try again.');
    }
  };

  const handleEditOffer = (offer) => {
    setEditingOffer(offer);
    setOfferFormData({
      startDate: offer.startDate.split('T')[0],
      endDate: offer.endDate.split('T')[0],
      discount_percent: offer.discount_percent,
      description: offer.description || ''
    });
    setShowAddOfferForm(true);
  };

  const handleDeleteOffer = async (offerId) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/offers/${offerId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setSuccess('Offer deleted successfully!');
          refreshOffers();
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError('Failed to delete offer');
        }
      } catch (error) {
        console.error('Error deleting offer:', error);
        setError('Error deleting offer');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleOfferInputChange = (e) => {
    const { name, value } = e.target;
    setOfferFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Amenities handlers
  const addAmenity = () => {
    setAmenities([...amenities, {
      ameniti_id: '',
      amenity_type: '',
      amenity_description: '',
      amenity_qnt: ''
    }]);
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const updateAmenity = (index, field, value) => {
    const updated = amenities.map((amenity, i) => 
      i === index ? { ...amenity, [field]: value } : amenity
    );
    setAmenities(updated);
  };

  // Images handlers
  const addImage = () => {
    setImages([...images, { url: '', caption: '' }]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const updateImage = (index, field, value) => {
    const updated = images.map((image, i) => 
      i === index ? { ...image, [field]: value } : image
    );
    setImages(updated);
  };

  // Destination packages handlers
  const addDestinationPackage = () => {
    setDestinationPackages([...destinationPackages, {
      package_name: '',
      description: {
        theme: '',
        duration: '',
        location_vibe: '',
        audience: '',
        style: ''
      },
      price: '',
      inclusions: []
    }]);
  };

  const removeDestinationPackage = (index) => {
    setDestinationPackages(destinationPackages.filter((_, i) => i !== index));
  };

  const updateDestinationPackage = (index, field, value) => {
    const updated = destinationPackages.map((pkg, i) => {
      if (i === index) {
        if (field.includes('.')) {
          const [parent, child] = field.split('.');
          return {
            ...pkg,
            [parent]: {
              ...pkg[parent],
              [child]: value
            }
          };
        }
        return { ...pkg, [field]: value };
      }
      return pkg;
    });
    setDestinationPackages(updated);
  };

  // Add-ons handlers
  const addAddon = () => {
    setAddons([...addons, {
      addon_name: '',
      description: '',
      price: '',
      is_available: true
    }]);
  };

  const removeAddon = (index) => {
    setAddons(addons.filter((_, i) => i !== index));
  };

  const updateAddon = (index, field, value) => {
    const updated = addons.map((addon, i) => 
      i === index ? { ...addon, [field]: value } : addon
    );
    setAddons(updated);
  };

  const validateForm = () => {
    if (!formData.hall_name.trim()) {
      setError('Hall name is required');
      return false;
    }
    if (!formData.hall_type.trim()) {
      setError('Hall type is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.priceperday || formData.priceperday <= 0) {
      setError('Valid price per day is required');
      return false;
    }

    // Validate amenities
    for (let i = 0; i < amenities.length; i++) {
      const amenity = amenities[i];
      if (amenity.ameniti_id.trim() || amenity.amenity_type.trim() || 
          amenity.amenity_description.trim() || amenity.amenity_qnt) {
        if (!amenity.ameniti_id.trim() || !amenity.amenity_type.trim() || 
            !amenity.amenity_description.trim() || !amenity.amenity_qnt) {
          setError(`All amenity fields are required for amenity ${i + 1} if any field is filled`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // Filter out empty amenities, images, etc.
      const filteredAmenities = amenities.filter(amenity => 
        amenity.ameniti_id.trim() && amenity.amenity_type.trim()
      );
      
      const filteredImages = images.filter(image => image.url.trim());
      
      const filteredAddons = addons.filter(addon => 
        addon.addon_name.trim() && addon.price
      );

      const payload = {
        ...formData,
        priceperday: Number(formData.priceperday),
        capacity: Number(formData.capacity) || 0,
        hall_amenities: filteredAmenities.map(amenity => ({
          ...amenity,
          amenity_qnt: Number(amenity.amenity_qnt)
        })),
        images: filteredImages,
        addons: filteredAddons.map(addon => ({
          ...addon,
          price: Number(addon.price)
        }))
      };

      if (formData.offers_destination_wedding) {
        const filteredPackages = destinationPackages.filter(pkg => 
          pkg.package_name.trim()
        );
        payload.destination_wedding_packages = filteredPackages.map(pkg => ({
          ...pkg,
          price: Number(pkg.price) || 0
        }));
      }

      const response = await fetch(`http://localhost:3000/venues/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess('Venue updated successfully!');
        setTimeout(() => {
          navigate('/admin/venues');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to update venue');
      }
    } catch (error) {
      console.error('Error updating venue:', error);
      setError('Error updating venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', name: 'Basic Information', icon: '🏢' },
    { id: 'amenities', name: 'Amenities', icon: '🛠️' },
    { id: 'images', name: 'Images', icon: '📸' },
    { id: 'destination', name: 'Destination Wedding', icon: '💒' },
    { id: 'addons', name: 'Add-ons', icon: '➕' },
    { id: 'offers', name: 'Offers Management', icon: '🎯' }
  ];

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
          <Link to="/admin/venues" className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-200">
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Edit Venue</h1>
            <Link to="/admin/venues" className="text-blue-600 hover:text-blue-800">
              ← Back to Venues
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-3 border-b-2 font-medium text-sm whitespace-nowrap rounded-t-md ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Basic Information Tab */}
                {activeTab === 'basic' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hall Name *
                        </label>
                        <input
                          type="text"
                          name="hall_name"
                          value={formData.hall_name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hall Type *
                        </label>
                        <select
                          name="hall_type"
                          value={formData.hall_type}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select Hall Type</option>
                          <option value="Banquet Hall">Banquet Hall</option>
                          <option value="Wedding Hall">Wedding Hall</option>
                          <option value="Conference Hall">Conference Hall</option>
                          <option value="Party Hall">Party Hall</option>
                          <option value="Resort">Resort</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Outdoor Venue">Outdoor Venue</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price per Day *
                        </label>
                        <input
                          type="number"
                          name="priceperday"
                          value={formData.priceperday}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capacity
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          name="contactmail"
                          value={formData.contactmail}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          name="contact_phone"
                          value={formData.contact_phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="availabilty_status"
                            checked={formData.availabilty_status}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          <span className="text-sm font-medium text-gray-700">Available for booking</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                    {amenities.map((amenity, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Amenity {index + 1}</h3>
                          {amenities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAmenity(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amenity ID
                            </label>
                            <input
                              type="text"
                              value={amenity.ameniti_id}
                              onChange={(e) => updateAmenity(index, 'ameniti_id', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amenity Type
                            </label>
                            <input
                              type="text"
                              value={amenity.amenity_type}
                              onChange={(e) => updateAmenity(index, 'amenity_type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <input
                              type="text"
                              value={amenity.amenity_description}
                              onChange={(e) => updateAmenity(index, 'amenity_description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={amenity.amenity_qnt}
                              onChange={(e) => updateAmenity(index, 'amenity_qnt', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAmenity}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Amenity
                    </button>
                  </div>
                )}

                {/* Images Tab */}
                {activeTab === 'images' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Images</h2>
                    {images.map((image, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Image {index + 1}</h3>
                          {images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Image URL
                            </label>
                            <input
                              type="url"
                              value={image.url}
                              onChange={(e) => updateImage(index, 'url', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={image.caption}
                              onChange={(e) => updateImage(index, 'caption', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Image
                    </button>
                  </div>
                )}

                {/* Destination Wedding Tab */}
                {activeTab === 'destination' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Destination Wedding</h2>
                    <div className="mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="offers_destination_wedding"
                          checked={formData.offers_destination_wedding}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Offers Destination Wedding</span>
                      </label>
                    </div>

                    {formData.offers_destination_wedding && (
                      <div>
                        <h3 className="text-lg font-medium mb-4">Wedding Packages</h3>
                        {destinationPackages.map((pkg, index) => (
                          <div key={index} className="border border-gray-200 p-4 rounded-md mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium">Package {index + 1}</h4>
                              {destinationPackages.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeDestinationPackage(index)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Package Name
                                </label>
                                <input
                                  type="text"
                                  value={pkg.package_name}
                                  onChange={(e) => updateDestinationPackage(index, 'package_name', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  value={pkg.price}
                                  onChange={(e) => updateDestinationPackage(index, 'price', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  min="0"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Theme
                                </label>
                                <input
                                  type="text"
                                  value={pkg.description?.theme || ''}
                                  onChange={(e) => updateDestinationPackage(index, 'description.theme', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  value={pkg.description?.duration || ''}
                                  onChange={(e) => updateDestinationPackage(index, 'description.duration', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Location Vibe
                                </label>
                                <input
                                  type="text"
                                  value={pkg.description?.location_vibe || ''}
                                  onChange={(e) => updateDestinationPackage(index, 'description.location_vibe', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Audience
                                </label>
                                <input
                                  type="text"
                                  value={pkg.description?.audience || ''}
                                  onChange={(e) => updateDestinationPackage(index, 'description.audience', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Style
                                </label>
                                <input
                                  type="text"
                                  value={pkg.description?.style || ''}
                                  onChange={(e) => updateDestinationPackage(index, 'description.style', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addDestinationPackage}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Add Package
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Add-ons Tab */}
                {activeTab === 'addons' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Add-ons</h2>
                    {addons.map((addon, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-md mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Add-on {index + 1}</h3>
                          {addons.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeAddon(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Add-on Name
                            </label>
                            <input
                              type="text"
                              value={addon.addon_name}
                              onChange={(e) => updateAddon(index, 'addon_name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price
                            </label>
                            <input
                              type="number"
                              value={addon.price}
                              onChange={(e) => updateAddon(index, 'price', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              min="0"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={addon.description}
                              onChange={(e) => updateAddon(index, 'description', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="3"
                            />
                          </div>
                          <div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={addon.is_available}
                                onChange={(e) => updateAddon(index, 'is_available', e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700">Available</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAddon}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add Add-on
                    </button>
                  </div>
                )}

                {/* Offers Management Tab */}
                {activeTab === 'offers' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Offers Management</h2>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddOfferForm(true);
                          setEditingOffer(null);
                          setOfferFormData({
                            startDate: '',
                            endDate: '',
                            discount_percent: '',
                            description: ''
                          });
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Add New Offer
                      </button>
                    </div>

                    {/* Add/Edit Offer Form */}
                    {showAddOfferForm && (
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h3 className="text-lg font-medium mb-4">
                          {editingOffer ? 'Edit Offer' : 'Add New Offer'}
                        </h3>
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Date *
                              </label>
                              <input
                                type="date"
                                name="startDate"
                                value={offerFormData.startDate}
                                onChange={handleOfferInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Date *
                              </label>
                              <input
                                type="date"
                                name="endDate"
                                value={offerFormData.endDate}
                                onChange={handleOfferInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Percentage *
                              </label>
                              <input
                                type="number"
                                name="discount_percent"
                                value={offerFormData.discount_percent}
                                onChange={handleOfferInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0"
                                max="100"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                              </label>
                              <textarea
                                name="description"
                                value={offerFormData.description}
                                onChange={handleOfferInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="Optional offer description"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAddOfferForm(false);
                                setEditingOffer(null);
                              }}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleOfferSubmit}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              {editingOffer ? 'Update Offer' : 'Add Offer'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Current Offers List */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Current Offers</h3>
                      {offersLoading ? (
                        <div className="text-center py-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        </div>
                      ) : offers.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <p>No offers found for this venue.</p>
                          <p className="text-sm">Click "Add New Offer" to create your first offer.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {offers.map((offer) => {
                            const status = getOfferStatus(offer.startDate, offer.endDate);
                            const statusColors = {
                              'Active': 'bg-green-100 text-green-800',
                              'Upcoming': 'bg-yellow-100 text-yellow-800',
                              'Expired': 'bg-red-100 text-red-800'
                            };

                            return (
                              <div key={offer._id} className="border border-gray-200 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="font-medium text-lg">
                                      Offer #{offer._id.slice(-6)}
                                    </h4>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
                                      {status}
                                    </span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEditOffer(offer)}
                                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteOffer(offer._id)}
                                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium text-blue-600 text-lg">
                                      {offer.discount_percent}% OFF
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Status: {status}
                                    </span>
                                  </div>
                                </div>
                                {offer.description && (
                                  <p className="mt-2 text-gray-600 text-sm">{offer.description}</p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button - Only show for venue data tabs */}
                {activeTab !== 'offers' && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex justify-end space-x-4">
                      <Link
                        to="/admin/venues"
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Updating...' : 'Update Venue'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditVenue;
