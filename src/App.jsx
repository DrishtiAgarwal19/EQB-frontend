import React from 'react';
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.jsx";
import CodeVerification from "./CodeVerification.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./Navbar.jsx";
import VenueSlider from "./VenueSlider.jsx";
import VenueList from "./VenueList.jsx";
import VenueDetails from "./VenueDetails.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import NewPassword from "./NewPassword.jsx";
import CustomerQuery from "./CustomerQuery.jsx";
import Wishlist from "./Wishlist.jsx";
import ExploreDestinations from "./ExploreDestinations.jsx";
import SpecialOffersList from "./SpecialOffersList.jsx";
import Dashboard from "./Dashboard.jsx";
import DestinationVenueDetails from "./DestinationVenueDetails.jsx";
import Footer from "./Footer.jsx";
import AdminSignup from "./AdminSignup.jsx"; // Import the new AdminSignup component
import AdminLogin from "./AdminLogin.jsx"; // Import the new AdminLogin component
import AdminDashboard from "./AdminDashboard.jsx"; // Import the new AdminDashboard component
import UserProfile from "./UserProfile.jsx"; // Import the new UserProfile component
import MyBookings from "./MyBookings.jsx"; // Import the new MyBookings component
import AdminVenueList from "./AdminVenueList.jsx"; // Import the new AdminVenueList component
import AdminBookingList from "./AdminBookingList.jsx"; // Import the new AdminBookingList component
import AdminUserList from "./AdminUserList.jsx"; // Import the new AdminUserList component
import AdminAddVenue from "./AdminAddVenue.jsx"; // Import the new AdminAddVenue component
import { AuthProvider } from "./AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/code-verification" element={<CodeVerification />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/customer-query" element={<ProtectedRoute><CustomerQuery /></ProtectedRoute>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/explore-destinations" element={<ExploreDestinations />} />
          <Route path="/special-offers" element={<SpecialOffersList />} />
          <Route path="/venue-list" element={<VenueList />} />
          <Route path="/destination-venue/:id" element={<DestinationVenueDetails />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin-signup" element={<AdminSignup />} /> {/* Add the new route */}
          <Route path="/admin-login" element={<AdminLogin />} /> {/* Add the new route */}
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> {/* Corrected route */}
          <Route path="/admin/venues" element={<ProtectedRoute><AdminVenueList /></ProtectedRoute>} /> {/* Add the new AdminVenueList route */}
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookingList /></ProtectedRoute>} /> {/* Add the new AdminBookingList route */}
          <Route path="/admin/users" element={<ProtectedRoute><AdminUserList /></ProtectedRoute>} /> {/* Add the new AdminUserList route */}
          <Route path="/admin/add-venue" element={<ProtectedRoute><AdminAddVenue /></ProtectedRoute>} /> {/* Add the new AdminAddVenue route */}
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> {/* Add the new UserProfile route */}
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} /> {/* Add the new MyBookings route */}
        </Routes>
        <Footer />
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
