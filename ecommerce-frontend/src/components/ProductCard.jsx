import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { Check, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-md shadow-sm hover:shadow-lg hover:scale-[1.02] transform transition-all duration-300 p-4 flex flex-col h-full cursor-pointer relative group"
    >
      
      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-red-50 transition-colors"
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-300 group-hover:text-gray-400'}`}
        />
      </button>

      {/* Product Image */}
      <div className="h-48 w-full flex items-center justify-center mb-4 bg-gray-50 rounded p-2">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2 mb-1 group-hover:text-amazon-buttonHover transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">{product.rating.count}</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline mb-3">
          <span className="text-xs mr-0.5 align-super text-gray-900">$</span>
          <span className="text-xl font-medium text-gray-900">{Math.floor(product.price)}</span>
          <span className="text-xs align-super text-gray-900">
            {(product.price % 1).toFixed(2).substring(1)}
          </span>
        </div>

        {/* Add to Cart */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full text-sm py-2 px-4 rounded-full shadow-sm transition-all duration-300 focus:outline-none flex items-center justify-center gap-2
              ${isAdded
                ? 'bg-green-500 text-white cursor-default'
                : 'bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-transparent hover:border-[#F2C200]'
              }`}
          >
            {isAdded ? <><Check className="w-4 h-4" /> Added</> : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
