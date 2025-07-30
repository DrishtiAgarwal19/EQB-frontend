import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx"; // Assuming useAuth is needed for token

const MyBookings = () => {
  const { user } = useAuth();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // If we want to view a specific booking by ID

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Authentication token not found. Please log in.");
          setLoading(false);
          return;
        }

        // This assumes an API endpoint like /api/bookings/:id or /api/user/bookings
        // For now, I'll use a placeholder or mock data.
        // If fetching a specific booking by ID:
        // const response = await axios.get(`http://localhost:3000/api/bookings/${id}`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // If fetching all user bookings:
        const response = await axios.get("http://localhost:3000/api/user/bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });

        // For demonstration, let's assume the API returns an array of bookings
        // and we'll just display the first one or iterate.
        // For now, I'll use mock data to match the image structure.
        setBookingDetails({
          venueName: "The Grand Ballroom",
          eventType: "Wedding Reception",
          date: "July 20, 2024",
          guests: 150,
          addons: "Catering, DJ, Photography",
          totalPrice: "$15,000",
          status: "Confirmed",
          bookingId: "1234567890",
          venueDescription: "A luxurious venue perfect for weddings and large events.",
          venueImage: "https://via.placeholder.com/400x300", // Placeholder image
        });

      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [user, id]); // Re-fetch if user or booking ID changes

  if (loading) {
    return <div className="text-center py-10">Loading booking details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!bookingDetails) {
    return <div className="text-center py-10">No booking details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/dashboard" className="hover:underline">My Bookings</Link>
          <span className="mx-2">/</span>
          <span>Booking Details</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {bookingDetails.venueName}
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h2>
        <div className="border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Venue Name</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.venueName}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Event Type</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.eventType}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Date</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.date}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Guests</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.guests}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Add-ons</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.addons}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Total Price</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.totalPrice}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Status</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.status}
              </dd>
            </div>
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-lg font-medium text-gray-700">Booking ID</dt>
              <dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
                {bookingDetails.bookingId}
              </dd>
            </div>
          </dl>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Venue Details</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="md:w-2/3">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{bookingDetails.venueName}</h3>
            <p className="text-gray-700">{bookingDetails.venueDescription}</p>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img
              src={bookingDetails.venueImage}
              alt={bookingDetails.venueName}
              className="rounded-lg shadow-md object-cover w-full h-48 md:h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
