import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout, updateProfile } from '../store/authSlice';
import { UserCircle, Package, Heart, MapPin, CreditCard, LogOut, Edit2, Check } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSave = () => {
    dispatch(updateProfile({ name: editName }));
    setIsEditing(false);
  };

  const menuItems = [
    { icon: Package, label: 'Your Orders', sub: 'Track, return, cancel an order' },
    { icon: Heart, label: 'Your Wishlist', sub: 'Saved items you love' },
    { icon: MapPin, label: 'Manage Addresses', sub: 'Edit addresses for orders and gifts' },
    { icon: CreditCard, label: 'Payment Methods', sub: 'Manage payment methods and settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Profile Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-amazon flex items-center justify-center text-white text-4xl font-bold mb-4">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>

            {isEditing ? (
              <div className="w-full flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                />
                <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                  <Check className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-gray-900">{user?.name}</h2>
                <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-amazon-orange">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}

            <p className="text-sm text-gray-500 mb-4">{user?.email}</p>

            <div className="w-full border-t pt-4 text-sm text-gray-700">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Cart items</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded text-sm font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>

          {/* Right: Menu Grid */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuItems.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 flex items-start gap-4 cursor-pointer hover:border-amazon-orange transition-colors group"
              >
                <div className="bg-amazon-background p-3 rounded-full group-hover:bg-orange-100 transition-colors">
                  <Icon className="w-6 h-6 text-amazon group-hover:text-amazon-orange transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-amazon-orange transition-colors">{label}</h3>
                  <p className="text-sm text-gray-500">{sub}</p>
                </div>
              </div>
            ))}

            {/* Back to Shopping */}
            <div className="sm:col-span-2">
              <Link to="/">
                <div className="bg-amazon text-white rounded-lg p-4 text-center cursor-pointer hover:bg-amazon-light transition-colors">
                  <span className="font-semibold">← Continue Shopping</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
