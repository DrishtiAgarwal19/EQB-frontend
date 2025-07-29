import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  console.log('Navbar: isAdmin:', isAdmin, 'user:', user); // Add console log for debugging
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginSignupDropdownOpen, setIsLoginSignupDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Ref for the dropdown container to detect clicks outside
  const servicesDropdownRef = React.useRef(null);
  const loginSignupDropdownRef = React.useRef(null);
  const profileDropdownRef = React.useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesHovered(false);
      }
      if (loginSignupDropdownRef.current && !loginSignupDropdownRef.current.contains(event.target)) {
        setIsLoginSignupDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/'); // Redirect to home after logout
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsLoginSignupDropdownOpen(false); // Close other dropdown
  };

  const handleLoginSignupClick = () => {
    setIsLoginSignupDropdownOpen(!isLoginSignupDropdownOpen);
    setIsProfileDropdownOpen(false); // Close other dropdown
  };

  const handleDashboardNavigation = () => {
    if (isAdmin) {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="flex flex-wrap justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center">
        <img src="/src/assets/WhatsApp Image 2025-06-23 at 17.58.19_dcbbe03b.jpg" alt="EventQuickBook Logo" className="h-8" />
        <span className="text-lg sm:text-xl font-bold ml-2" style={{ color: 'black' }}>QualityBook</span>
      </div>

      {/* Hamburger menu icon for mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            )}
          </svg>
        </button>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-4 items-center text-base">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <div
          className="relative"
          onMouseEnter={() => setIsServicesHovered(true)}
          onMouseLeave={() => setIsServicesHovered(false)}
          ref={servicesDropdownRef}
        >
          <Link to="/services" className="hover:text-blue-600 cursor-pointer">Our Services</Link>
          {isServicesHovered && (
            <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 text-sm">
              <div className="py-1">
                <p className="block px-4 py-2 text-gray-800 font-bold">Venue Booking Services</p>
                <Link to="/services/wedding-venue-booking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wedding Venue Booking</Link>
                <Link to="/services/engagement-reception-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Engagement & Reception Halls</Link>
                <Link to="/services/birthday-party-venues" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Birthday Party Venues (Adults & Kids)</Link>
                <Link to="/services/corporate-event-spaces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Corporate Event Spaces</Link>
                <Link to="/services/banquet-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Banquet Halls & Marriage Halls</Link>
                <Link to="/services/conference-rooms" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Conference Rooms / Meeting Spaces</Link>
                <Link to="/services/party-lawns" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Party Lawns & Farmhouses</Link>
                <Link to="/services/restaurants-lounges" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Restaurants & Lounges for Private Parties</Link>
                <Link to="/services/hotels-event-packages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hotels for Stay + Event Packages</Link>
              </div>
            </div>
          )}
        </div>
        {user ? (
          // ✅ Show Profile Dropdown if logged in
          <div className="relative" ref={profileDropdownRef}>
            <Link
              to="#"
              onClick={handleProfileClick}
              className="hover:text-blue-600 focus:outline-none"
            >
              Profile
            </Link>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 text-sm">
                <div className="py-1">
                  {isAdmin ? (
                    <>
                      <Link
                        to="/admin-dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        User Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </>
                  )}

                  <Link
                    to="#"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          // ✅ Show Login/Signup if not logged in
          <div className="relative" ref={loginSignupDropdownRef}>
            <Link
              to="#"
              onClick={handleLoginSignupClick}
              className="hover:text-blue-600 focus:outline-none"
            >
              Login/Signup
            </Link>
            {isLoginSignupDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 text-sm">
                <div className="py-1">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLoginSignupDropdownOpen(false)}
                  >
                    Login/Signup as User
                  </Link>
                  <Link
                    to="/admin-login"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsLoginSignupDropdownOpen(false)}
                  >
                    Login/Signup as Admin
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        <Link to="/wishlist" className="hover:text-blue-600">Wishlist</Link>
        <Link to="/customer-query" className="hover:text-blue-600">Customer Query</Link>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden w-full mt-2 flex flex-col space-y-2 items-center text-sm">
          <Link to="/" className="block w-full text-center py-2 hover:bg-gray-100">Home</Link>
          <div className="relative w-full text-center">
            <Link to="/services" className="block w-full py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsServicesHovered(!isServicesHovered)}>Our Services</Link>
            {isServicesHovered && (
              <div className="w-full bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <p className="block px-4 py-2 text-gray-800 font-bold">Venue Booking Services</p>
                  <Link to="/services/wedding-venue-booking" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Wedding Venue Booking</Link>
                  <Link to="/services/engagement-reception-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Engagement & Reception Halls</Link>
                  <Link to="/services/birthday-party-venues" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Birthday Party Venues (Adults & Kids)</Link>
                  <Link to="/services/corporate-event-spaces" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Corporate Event Spaces</Link>
                  <Link to="/services/banquet-halls" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Banquet Halls & Marriage Halls</Link>
                  <Link to="/services/conference-rooms" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Conference Rooms / Meeting Spaces</Link>
                  <Link to="/services/party-lawns" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Party Lawns & Farmhouses</Link>
                  <Link to="/services/restaurants-lounges" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Restaurants & Lounges for Private Parties</Link>
                  <Link to="/services/hotels-event-packages" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Hotels for Stay + Event Packages</Link>
                  <p className="block px-4 py-2 text-gray-800 font-bold mt-2">🎯 Event Planning Assistance</p>
                  <Link to="/services/event-planner-recommendations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Event Planner Recommendations</Link>
                  <Link to="/services/theme-decor-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Theme & Decor Services</Link>
                  <Link to="/services/catering-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Catering Services</Link>
                  <Link to="/services/photography-videography" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Photography & Videography</Link>
                  <Link to="/services/entertainment-services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Entertainment Services (DJ, Live Music, Anchors)</Link>
                  <Link to="/services/lighting-sound-setup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Lighting & Sound Setup</Link>
                </div>
              </div>
            )}
          </div>
          {user ? (
            <div className="relative w-full text-center">
              <Link
                to="#"
                onClick={handleProfileClick}
                className="block w-full py-2 hover:bg-gray-100 focus:outline-none"
              >
                {isAdmin ? "Admin Profile" : "User Profile"}
              </Link>
              {isProfileDropdownOpen && (
                <div className="w-full bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin-dashboard"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block w-full text-center py-2 text-gray-700"
                        >
                          Admin Dashboard
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block w-full text-center py-2 text-gray-700"
                        >
                          User Dashboard
                        </Link>
                      </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </>
                    )}

                    <Link
                      to="#"
                      onClick={handleLogout}
                      className="block w-full text-center py-2 text-gray-700"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative w-full text-center">
              <Link
                to="#"
                onClick={handleLoginSignupClick}
                className="block w-full py-2 hover:bg-gray-100 focus:outline-none"
              >
                Login/Signup
              </Link>
              {isLoginSignupDropdownOpen && (
                <div className="w-full bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsLoginSignupDropdownOpen(false)}
                    >
                      Login/Signup as User
                    </Link>
                    <Link
                      to="/admin-login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsLoginSignupDropdownOpen(false)}
                    >
                      Login/Signup as Admin
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          <Link to="/wishlist" className="block w-full text-center py-2 hover:bg-gray-100">Wishlist</Link>
          <Link to="/customer-query" className="block w-full text-center py-2 hover:bg-gray-100">Customer Query</Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
<environment_details>
# VSCode Visible Files
src/Navbar.jsx

# VSCode Open Tabs
src/VenueSlider.jsx
.git/COMMIT_EDITMSG
src/Home.jsx
src/styles.css
src/CustomerQuery.jsx
src/BookingForm.jsx
src/App.css
src/Footer.jsx
src/SpecialOffersList.jsx
src/VenueList.jsx
src/ForgotPassword.jsx
src/SpecialOffersSlider.jsx
src/AdminDashboard.jsx
src/App.jsx
src/AdminSignup.jsx
src/AdminLogin.jsx
src/ExploreDestinations.jsx
src/DestinationVenueDetails.jsx
src/Dashboard.jsx
src/Login.jsx
src/Signup.jsx
src/AuthContext.jsx
src/Navbar.jsx
src/Wishlist.jsx
src/AccountCreated.jsx
src/VenueDetails.jsx

# Current Time
7/23/2025, 7:10:39 PM (Asia/Calcutta, UTC+5.5:00)

# Context Window Usage
120,276 / 1,048.576K tokens used (11%)

# Current Mode
ACT MODE
</environment_details>
