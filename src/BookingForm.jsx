import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const BookingForm = ({ venueName, venueId, onClose }) => {
  const [step, setStep] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [customEventType, setCustomEventType] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [eventTypes, setEventTypes] = useState([]);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [availableAddons, setAvailableAddons] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [preferredVendors, setPreferredVendors] = useState('');
  const [theme, setTheme] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [bookingOption, setBookingOption] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/event-types');
        setEventTypes(response.data);
      } catch (error) {
        console.error('Error fetching event types:', error);
      }
    };
    fetchEventTypes();

    const fetchUserProfile = async () => {
      if (user && user.token) {
        try {
          const response = await axios.get('http://localhost:5000/user/profile', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const profile = response.data;
          setFullName(profile.Name || '');
          setEmail(profile.Email || '');
          setPhoneNumber(profile.phone_no || '');
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    const fetchAvailableAddons = async () => {
      if (!venueId) return;
      try {
        const response = await axios.get(`http://localhost:5000/venues/${venueId}/addons`);
        setAvailableAddons(response.data);
      } catch (error) {
        console.error('Error fetching available add-ons:', error);
      }
    };
    fetchAvailableAddons();
  }, [venueId]);

  const handleAddonChange = (addonName) => {
    setSelectedAddons(prev =>
      prev.includes(addonName)
        ? prev.filter(item => item !== addonName)
        : [...prev, addonName]
    );
  };

  const checkVenueAvailability = async () => {
    if (!venueId || !fromDate || !toDate) {
      setAvailabilityMessage('');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/bookings/availability/check', {
        hall_id: venueId,
        booking_dates: [fromDate, toDate],
      });
      setAvailabilityMessage(response.data.msg);
    } catch (error) {
      console.error('Error checking availability:', error);
      setAvailabilityMessage(error.response?.data?.msg || 'Error checking availability.');
    }
  };

  useEffect(() => {
    checkVenueAvailability();
  }, [fromDate, toDate, venueId]);

  useEffect(() => {
    const calculatePrice = async () => {
      if (!venueId || !fromDate || !toDate || !numberOfGuests || !eventType) {
        setTotalPrice(0);
        return;
      }
      try {
        const response = await axios.post('http://localhost:5000/bookings/calculate-price', {
          venueId,
          from: fromDate,
          to: toDate,
          guests: parseInt(numberOfGuests, 10),
          eventType: eventType === 'Other' ? customEventType : eventType,
          addons: selectedAddons,
        });
        setTotalPrice(response.data.totalPrice);
      } catch (error) {
        console.error('Error calculating price:', error);
        setTotalPrice(0); // Reset price on error
      }
    };
    calculatePrice();
  }, [venueId, fromDate, toDate, numberOfGuests, eventType, customEventType, selectedAddons]);


  const nextStep = () => {
    // Add validation for Step 1 before proceeding
    if (step === 1) {
      if (!fromDate || !toDate || !eventType || !numberOfGuests) {
        alert('Please fill in all required fields for Event Details.');
        return;
      }
      if (eventType === 'Other' && !customEventType) {
        alert('Please specify the custom event type.');
        return;
      }
      if (availabilityMessage && availabilityMessage.includes('booked')) {
        alert('Venue is not available for the selected dates. Please choose different dates.');
        return;
      }
    }
    if (!user) {
      alert('Please login/signup to continue booking.');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <div className="w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">Step 1 of 4</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-black h-2.5 rounded-full w-1/4"></div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Venue name"
                  value={venueName}
                  readOnly
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                />
                <label htmlFor="fromDate" className="block text-gray-700 text-sm font-bold mb-2">From:</label>
                <input
                  type="date"
                  id="fromDate"
                  placeholder="From date"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 text-gray-500"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <label htmlFor="toDate" className="block text-gray-700 text-sm font-bold mb-2">To:</label>
                <input
                  type="date"
                  id="toDate"
                  placeholder="To date"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 text-gray-500"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
                {availabilityMessage && (
                  <p className={`text-sm ${availabilityMessage.includes('booked') ? 'text-red-500' : 'text-green-500'}`}>
                    {availabilityMessage}
                  </p>
                )}

                <div className="relative">
                  <div className="flex flex-col">
                    <select
                      className="block appearance-none p-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 focus:outline-none focus:border-blue-400"
                      style={{ width: '100%' }}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        setEventType(selectedValue);
                        setCustomEventType('');
                      }}
                      value={eventType}
                    >
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Other">Other</option>
                    </select>
                     {eventType === 'Other' && (
                      <input
                        type="text"
                        placeholder="Specify event type"
                        className="p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 mt-2"
                        value={customEventType}
                        onChange={(e) => setCustomEventType(e.target.value)}
                      />
                     )}
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="Number of guests"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                />
              </div>
              <button
                onClick={nextStep}
                className="w-full mt-8 p-3 rounded-lg bg-orange-200 text-gray-800 font-semibold hover:bg-orange-300 transition duration-200"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <div className="w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">Step 2 of 4</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-black h-2.5 rounded-full w-1/2"></div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Add-ons & Services</h3>
              <div className="space-y-4 mb-8">
                {availableAddons.length > 0 ? (
                  availableAddons.map((addon) => (
                    <label key={addon.id} className="flex items-center text-gray-700">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                        checked={selectedAddons.includes(addon.name)}
                        onChange={() => handleAddonChange(addon.name)}
                      />
                      {addon.name} ({addon.description})
                    </label>
                  ))
                ) : (
                  <p className="text-gray-700 text-sm">No specific add-ons available for this venue. You can use special requests.</p>
                )}
              </div>

              <input
                type="text"
                placeholder="Preferred Vendors (Optional)"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
                value={preferredVendors}
                onChange={(e) => setPreferredVendors(e.target.value)}
              />

              <input
                type="text"
                placeholder="Theme (Optional)"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />

              <textarea
                placeholder="Special requests"
                rows="5"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 resize-none"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              ></textarea>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="w-1/2 mr-2 p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="w-full p-3 rounded-lg bg-orange-200 text-gray-800 font-semibold hover:bg-orange-300 transition duration-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <div className="w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">Step 3 of 4</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-black h-2.5 rounded-full w-3/4"></div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Contact Information & Summary</h3>
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  readOnly={user && user.token ? true : false} // Make read-only if auto-filled
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={user && user.token ? true : false} // Make read-only if auto-filled
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  readOnly={user && user.token ? true : false} // Make read-only if auto-filled
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2 mb-8 text-gray-700">
                <div className="flex justify-between">
                  <span>Venue</span>
                  <span>{venueName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{fromDate} to {toDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Event Type</span>
                  <span>{eventType === 'Other' ? customEventType : eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>{numberOfGuests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-ons</span>
                  <span>{selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None'}</span>
                </div>
                {preferredVendors && (
                  <div className="flex justify-between">
                    <span>Preferred Vendors</span>
                    <span>{preferredVendors}</span>
                  </div>
                )}
                {theme && (
                  <div className="flex justify-between">
                    <span>Theme</span>
                    <span>{theme}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Special Requests</span>
                  <span>{specialRequests || 'None'}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>INR {totalPrice.toLocaleString('en-IN')}</span> {/* Display calculated total price */}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="w-1/2 mr-2 p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  className="w-full p-3 rounded-lg bg-orange-200 text-gray-800 font-semibold hover:bg-orange-300 transition duration-200"
                  disabled={submissionStatus === 'loading' || !agreeTerms || !bookingOption}
                >
                  {submissionStatus === 'loading' ? 'Submitting...' : 'Confirm & Submit'}
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
            <div className="w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">Step 4 of 4</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-black h-2.5 rounded-full w-full"></div>
              </div>

              <h3 className="text-xl font-semibold mb-4">Payment Option / Enquiry</h3>
              <div className="space-y-4 mb-8">
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="bookingOption"
                    value="payment"
                    className="form-radio h-5 w-5 text-blue-600 mr-2"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  Proceed to Payment
                </label>
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="bookingOption"
                    value="enquiry"
                    className="form-radio h-5 w-5 text-blue-600 mr-2"
                    checked={bookingOption === 'enquiry'}
                    onChange={(e) => setBookingOption(e.target.value)}
                  />
                  Submit Enquiry
                </label>
              </div>

              {showTermsModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative">
                    <h3 className="text-xl font-semibold mb-4">Terms and Conditions</h3>
                    <div className="border p-4 rounded-lg bg-gray-50 text-gray-700 text-sm mb-4 max-h-60 overflow-y-auto">
                      <p className="mb-2"><strong>By proceeding with this booking, you agree that your booking will be confirmed only after the required payment is successfully received and a confirmation email or message is sent to you.</strong> You agree to pay all applicable charges as displayed, including any taxes, and to clear any balance payment before the event date. Cancellations made 14 days or more before the event date may be eligible for a 50% refund, while cancellations made less than 7 days before the event date are non‑refundable. Any rescheduling request must be made at least 7 days in advance and is subject to availability and applicable charges. You agree to follow all venue usage rules, including permitted timings, noise regulations, and any restrictions on decorations or outside services, and you are responsible for any damage caused during your booking, which may be deducted from any security deposit or charged separately. The website acts as a booking intermediary, and the venue is solely responsible for providing the booked services. Neither the venue nor the website shall be held liable for any delay, cancellation, or failure due to events beyond reasonable control, such as natural disasters or government restrictions. Your personal information will only be used to process your booking and will be protected according to our privacy policy. The platform reserves the right to update these terms at any time, and the terms effective at the time of your booking will apply.</p>
                    </div>
                    <button
                      onClick={() => setShowTermsModal(false)}
                      className="mt-4 p-2 rounded-lg bg-royal-blue text-white font-semibold hover:bg-blue-700 transition duration-200"
                      style={{ backgroundColor: 'royalblue' }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              <label className="flex items-center text-gray-700 mb-8">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                I agree to the terms and conditions
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="ml-2 text-blue-500 hover:underline focus:outline-none"
                >
                  (View Terms)
                </button>
              </label>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="w-1/2 mr-2 p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full p-3 rounded-lg bg-orange-200 text-gray-800 font-semibold hover:bg-orange-300 transition duration-200"
                  disabled={submissionStatus === 'loading' || !agreeTerms || !bookingOption}
                >
                  {submissionStatus === 'loading' ? 'Submitting...' : 'Confirm & Submit'}
                </button>
              </div>
              {submissionStatus === 'success' && (
                <p className="text-green-600 text-center mt-4">Booking submitted successfully!</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-600 text-center mt-4">Error submitting booking. Please try again.</p>
              )}
            </div>
          </div>
        );
      default:
        return <div>Something went wrong!</div>;
    }
  };

  const handleSubmit = async () => {
    if (!agreeTerms || !bookingOption) {
      alert('Please agree to terms and select a booking option.');
      return;
    }

    setSubmissionStatus('loading');
    try {
      const bookingData = {
        user_id: user ? user.id : null, // Assuming user.id is available from AuthContext
        hall_id: venueId, // Use venueId passed from VenueDetails
        booking_dates: [fromDate, toDate],
        status: bookingOption === 'payment' ? 'booked' : 'enquiry', // Dynamically set status
        purpose: eventType === 'Other' ? customEventType : eventType,
        guest_quantity: parseInt(numberOfGuests, 10),
        addons: selectedAddons, // Use dynamically selected addons
        preferred_vendors: preferredVendors, // Include preferred vendors
        theme: theme, // Include theme
        special_requests: specialRequests,
        contact_name: fullName,
        contact_email: email,
        contact_phone: phoneNumber,
      };

      const response = await axios.post('http://localhost:5000/bookings', bookingData);
      console.log('Booking successful:', response.data);
      setSubmissionStatus('success');
      // Optionally, close the form or navigate to a confirmation page
      // onClose();
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-auto my-8 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        aria-label="Close booking form"
      >
        &times;
      </button>
      {renderStepContent()}
    </div>
  );
};

export default BookingForm;
