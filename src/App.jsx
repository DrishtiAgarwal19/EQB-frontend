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
import ListVenues from "./admin/ListVenues.jsx";
import AddVenue from "./admin/AddVenue.jsx";
import ViewVenue from "./admin/ViewVenue.jsx";
import EditVenue from "./admin/EditVenue.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
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
          <Route path="/admin/venues" element={<ProtectedRoute><ListVenues /></ProtectedRoute>} />
          <Route path="/admin/venues/add" element={<ProtectedRoute><AddVenue /></ProtectedRoute>} />
          <Route path="/admin/venues/view/:id" element={<ProtectedRoute><ViewVenue /></ProtectedRoute>} />
          <Route path="/admin/venues/edit/:id" element={<ProtectedRoute><EditVenue /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </ErrorBoundary>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
