import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AddVenue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      if (!amenity.ameniti_id.trim() || !amenity.amenity_type.trim() || 
          !amenity.amenity_description.trim() || !amenity.amenity_qnt) {
        setError(`All amenity fields are required for amenity ${i + 1}`);
        return false;
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

      const response = await fetch('http://localhost:3000/venues', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccess('Venue created successfully!');
        setTimeout(() => {
          navigate('/admin/venues');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create venue');
      }
    } catch (error) {
      console.error('Error creating venue:', error);
      setError('Error creating venue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Add New Venue</h1>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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

            {/* Amenities Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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
                        Amenity ID *
                      </label>
                      <input
                        type="text"
                        value={amenity.ameniti_id}
                        onChange={(e) => updateAmenity(index, 'ameniti_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amenity Type *
                      </label>
                      <input
                        type="text"
                        value={amenity.amenity_type}
                        onChange={(e) => updateAmenity(index, 'amenity_type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <input
                        type="text"
                        value={amenity.amenity_description}
                        onChange={(e) => updateAmenity(index, 'amenity_description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        value={amenity.amenity_qnt}
                        onChange={(e) => updateAmenity(index, 'amenity_qnt', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
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

            {/* Images Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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

            {/* Destination Wedding Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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
                            value={pkg.description.theme}
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
                            value={pkg.description.duration}
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
                            value={pkg.description.location_vibe}
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
                            value={pkg.description.audience}
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
                            value={pkg.description.style}
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

            {/* Add-ons Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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

            {/* Submit Button */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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
                  {loading ? 'Creating...' : 'Create Venue'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddVenue;
