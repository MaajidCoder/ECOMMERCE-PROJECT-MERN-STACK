import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSearchQuery, setCategory } from '../store/searchSlice';
import { logout } from '../store/authSlice';

const Navbar = ({ onCartClick, onMenuClick }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const currentCategory = useSelector((state) => state.search.category);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    dispatch(setSearchQuery(localSearch));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate('/login');
  };

  return (
    <header className="bg-amazon text-white sticky top-0 z-30">
      <div className="flex items-center justify-between p-2 pl-3 pr-4 gap-2">

        {/* Hamburger + Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onMenuClick}
            className="p-1 rounded hover:bg-amazon-light transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/" className="flex items-center cursor-pointer">
            <span className="text-2xl font-bold tracking-tight">E-Shop</span>
            <span className="text-sm font-bold mt-2 ml-0.5 text-amazon-orange">.in</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-grow items-center h-10 rounded-md overflow-hidden bg-white mx-2">
          <select
            className="h-full bg-gray-100 text-gray-700 px-2 border-r border-gray-300 outline-none cursor-pointer text-sm"
            value={currentCategory}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="All">All</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <input
            type="text"
            className="flex-grow h-full px-3 text-black outline-none"
            placeholder="Search products..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="h-full px-4 bg-amazon-orange hover:bg-amazon-buttonHover flex items-center justify-center transition-colors"
          >
            <Search className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Right: User + Cart */}
        <div className="flex items-center gap-3 text-sm font-semibold flex-shrink-0">

          {/* User section */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex flex-col items-start hover:border border-transparent hover:border-white p-1 rounded"
              >
                <span className="text-xs font-normal">Hello, {user?.name}</span>
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> Account ▾
                </span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white text-gray-800 rounded-md shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b">Your Profile</div>
                  </Link>
                  <Link to="/orders" onClick={() => setShowDropdown(false)}>
                    <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b">Your Orders</div>
                  </Link>
                  <Link to="/wishlist" onClick={() => setShowDropdown(false)}>
                    <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b">Wishlist</div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <div className="hidden sm:flex flex-col cursor-pointer hover:border border-transparent hover:border-white p-1 rounded">
                <span className="text-xs font-normal">Hello, sign in</span>
                <span>Account</span>
              </div>
            </Link>
          )}

          {/* Cart */}
          <div
            className="flex items-center cursor-pointer hover:border border-transparent hover:border-white p-1 rounded relative"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-7 h-7" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-amazon-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
            <span className="hidden md:inline ml-1">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
