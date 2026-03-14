import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Deals from './pages/Deals';
import ProductDetail from './pages/ProductDetail';

// Protected route - redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Auth pages - no layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Pages with Layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
      <Route path="/deals" element={<Layout><Deals /></Layout>} />
      <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
      <Route path="/orders" element={<Layout><Orders /></Layout>} />

      {/* Protected pages */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout><Profile /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
