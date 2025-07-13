import React, { useState } from 'react';
import './styles.css';

const BookingForm = ({ venueName, onClose }) => {
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('');
  const [customEventType, setCustomEventType] = useState('');

  const nextStep = () => {
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
                />
                <label htmlFor="toDate" className="block text-gray-700 text-sm font-bold mb-2">To:</label>
                <input
                  type="date"
                  id="toDate"
                  placeholder="To date"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 text-gray-500"
                />
                <div className="relative">
                  <select
                    className="block appearance-none w-full p-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 pr-8 focus:outline-none focus:border-blue-400"
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setEventType(selectedValue);
                      if (selectedValue !== 'Other') {
                        setCustomEventType('');
                      }
                    }}
                    value={eventType}
                  >
                    <option value="">Select event type</option>
                    <option>Wedding</option>
                    <option>Birthday Party</option>
                    <option>Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                  {eventType === 'Other' && (
                    <input
                      type="text"
                      placeholder="Specify event type"
                      className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 mt-2"
                      value={customEventType}
                      onChange={(e) => setCustomEventType(e.target.value)}
                    />
                  )}
                </div>
                <input
                  type="number"
                  placeholder="Number of guests"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
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

              <h3 className="text-xl font-semibold mb-4">Add-ons</h3>
              <div className="space-y-4 mb-8">
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-2" />
                  Catering
                </label>
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-2" />
                  Photography
                </label>
                <label className="flex items-center text-gray-700">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-2" />
                  DJ
                </label>
              </div>

              <textarea
                placeholder="Special requests"
                rows="5"
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400 resize-none"
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
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:border-blue-400"
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
                  <span>July 20, 2024</span> {/* Placeholder, ideally from state */}
                </div>
                <div className="flex justify-between">
                  <span>Event Type</span>
                  <span>{eventType === 'Other' ? customEventType : eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>150</span> {/* Placeholder, ideally from state */}
                </div>
                <div className="flex justify-between">
                  <span>Add-ons</span>
                  <span>Catering, Photography, DJ</span> {/* Placeholder, ideally from state */}
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>INR 9,500</span> {/* Placeholder, ideally calculated */}
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
                >
                  Next
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
                  <input type="radio" name="bookingOption" value="payment" className="form-radio h-5 w-5 text-blue-600 mr-2" />
                  Proceed to Payment
                </label>
                <label className="flex items-center text-gray-700">
                  <input type="radio" name="bookingOption" value="enquiry" className="form-radio h-5 w-5 text-blue-600 mr-2" />
                  Submit Enquiry
                </label>
              </div>

              <label className="flex items-center text-gray-700 mb-8">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-2" />
                I agree to the terms and conditions
              </label>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="w-1/2 mr-2 p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition duration-200"
                >
                  Previous
                </button>
                <button
                  className="w-full p-3 rounded-lg bg-orange-200 text-gray-800 font-semibold hover:bg-orange-300 transition duration-200"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Something went wrong!</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 my-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BookingForm;
