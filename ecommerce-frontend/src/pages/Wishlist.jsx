import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Your Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
            <Link to="/">
              <button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 px-8 rounded-full font-semibold transition-colors">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col hover:shadow-md transition-shadow">
                <div className="h-40 flex items-center justify-center mb-3 bg-gray-50 rounded p-2">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 flex-grow mb-2">{item.title}</h3>
                <p className="text-lg font-bold text-gray-900 mb-3">${item.price.toFixed(2)}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(addToCart(item))}
                    className="flex-grow flex items-center justify-center gap-1 bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 px-3 rounded-full text-sm font-medium transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
