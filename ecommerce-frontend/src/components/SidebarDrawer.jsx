import React, { useState } from 'react';
import { X, UserCircle, Heart, Package, Home, Tag, Cpu, Gem, Shirt, ChevronRight, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSearchQuery } from '../store/searchSlice';
import { logout } from '../store/authSlice';

const categories = [
  { label: 'All Products', value: 'All', icon: Home },
  { label: 'Electronics', value: 'electronics', icon: Cpu },
  { label: 'Jewelry', value: 'jewelery', icon: Gem },
  { label: "Men's Clothing", value: "men's clothing", icon: Shirt },
  { label: "Women's Clothing", value: "women's clothing", icon: Shirt },
];

const SidebarDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const handleCategoryClick = (value) => {
    dispatch(setCategory(value));
    dispatch(setSearchQuery(''));
    navigate('/');
    onClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-amazon text-white p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amazon-orange flex items-center justify-center font-bold text-white text-lg">
              {isLoggedIn ? user?.name?.[0]?.toUpperCase() : <UserCircle className="w-6 h-6" />}
            </div>
            <div>
              <p className="text-xs text-gray-300">Hello,</p>
              <p className="font-bold">{isLoggedIn ? user?.name : 'Sign in'}</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:text-amazon-orange transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto">

          {/* Shop by Category */}
          <div className="border-b border-gray-200">
            <p className="text-xs font-bold uppercase text-gray-400 tracking-widest px-4 pt-4 pb-2">Shop by Category</p>
            {categories.map(({ label, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => handleCategoryClick(value)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-amazon-orange" />
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amazon-orange" />
              </button>
            ))}
          </div>

          {/* Pages */}
          <div className="border-b border-gray-200">
            <p className="text-xs font-bold uppercase text-gray-400 tracking-widest px-4 pt-4 pb-2">Pages</p>

            <Link to="/" onClick={onClose}>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                <Home className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-800">Home</span>
              </div>
            </Link>

            <Link to="/wishlist" onClick={onClose}>
              <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-800">Wishlist</span>
                </div>
                {wishlistCount > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{wishlistCount}</span>
                )}
              </div>
            </Link>

            <Link to="/orders" onClick={onClose}>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                <Package className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-800">Your Orders</span>
              </div>
            </Link>

            <Link to="/deals" onClick={onClose}>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-800">Today's Deals</span>
              </div>
            </Link>
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-bold uppercase text-gray-400 tracking-widest px-4 pt-4 pb-2">Account</p>
            {isLoggedIn ? (
              <>
                <Link to="/profile" onClick={onClose}>
                  <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
                    <UserCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-800">Your Profile</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/login" onClick={onClose}>
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer text-amazon-orange font-semibold">
                  <LogIn className="w-5 h-5" />
                  <span className="text-sm">Sign In / Sign Up</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDrawer;
