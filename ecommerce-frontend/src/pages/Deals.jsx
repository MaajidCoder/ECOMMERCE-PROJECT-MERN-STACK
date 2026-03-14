import React, { useState, useEffect } from 'react';
import { Tag, Zap } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist } from '../store/wishlistSlice';
import { Heart, Check } from 'lucide-react';

const Deals = () => {
  const dispatch = useDispatch();
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then((r) => r.json())
      .then((data) => {
        // Add a fake "original price" discount for UI
        const withDeals = data.map((p) => ({
          ...p,
          originalPrice: (p.price * (1 + (Math.random() * 0.4 + 0.2))).toFixed(2),
          discount: Math.floor(Math.random() * 30 + 10),
        }));
        setDeals(withDeals);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = (product) => {
    dispatch(addToCart(product));
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.id]: false })), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-r from-amazon to-amazon-light text-white rounded-xl p-6 mb-8 flex items-center gap-4">
          <Zap className="w-12 h-12 text-amazon-orange flex-shrink-0" />
          <div>
            <h1 className="text-3xl font-bold mb-1">Today's Deals</h1>
            <p className="text-gray-300">Limited time offers — grab them before they're gone!</p>
          </div>
          <div className="ml-auto text-right hidden sm:block">
            <p className="text-amazon-orange font-bold text-lg">Up to 40% OFF</p>
            <p className="text-gray-400 text-sm">on selected items</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deals.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col relative">
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                  -{product.discount}%
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => dispatch(addToWishlist(product))}
                  className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                </button>

                <div className="h-40 flex items-center justify-center mb-3 bg-gray-50 rounded p-2 mt-4">
                  <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-grow mb-2">{product.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  disabled={addedItems[product.id]}
                  className={`w-full flex items-center justify-center gap-1 py-2 px-3 rounded-full text-sm font-medium transition-all ${
                    addedItems[product.id]
                      ? 'bg-green-500 text-white'
                      : 'bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-[#FCD200]'
                  }`}
                >
                  {addedItems[product.id] ? <><Check className="w-4 h-4" /> Added</> : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
