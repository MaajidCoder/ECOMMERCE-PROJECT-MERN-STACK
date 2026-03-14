import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { Star, ShoppingCart, Heart, ArrowLeft, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlistItems.some((item) => item.id === parseInt(id));

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const toggleWishlist = () => {
    if (!product) return;
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link to="/" className="text-amazon-orange hover:underline font-semibold flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-500 border-b border-gray-100 flex items-center gap-2">
        <Link to="/" className="hover:text-amazon-orange hover:underline italic">Home</Link>
        <span>›</span>
        <span className="capitalize">{product.category}</span>
        <span>›</span>
        <span className="text-gray-400 line-clamp-1">{product.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left: Image Container (Fixed on desktop) */}
        <div className="md:col-span-5 flex justify-center sticky top-20 h-fit bg-gray-50 rounded-xl p-8 group">
          <div className="relative w-full max-w-sm">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
            <button 
              onClick={toggleWishlist}
              className={`absolute top-0 right-0 p-3 rounded-full shadow-md bg-white hover:bg-red-50 transition-all ${isWishlisted ? 'text-red-500' : 'text-gray-300'}`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center: Info Container */}
        <div className="md:col-span-4 space-y-4">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center text-amazon-orange">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="ml-1 font-bold">{product.rating.rate}</span>
            </div>
            <span className="text-blue-600 hover:text-amazon-orange hover:underline cursor-pointer transition-colors">
              {product.rating.count} ratings
            </span>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-1">
            <p className="text-2xl font-medium text-gray-900">
              <span className="text-sm align-top mr-1">$</span>
              {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
          </div>

          <div className="flex gap-4 py-2 overflow-x-auto no-scrollbar">
            <div className="flex-shrink-0 flex flex-col items-center gap-1 w-20 text-center">
              <RotateCcw className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-medium text-blue-600">10 days Replacement</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-1 w-20 text-center">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-medium text-blue-600">Amazon Delivered</span>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-1 w-20 text-center">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-medium text-blue-600">1 Year Warranty</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">About this item</h3>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {product.description}
            </p>
          </div>
        </div>

        {/* Right: Action Card */}
        <div className="md:col-span-3">
          <div className="border border-gray-300 rounded-xl p-5 space-y-4 bg-white sticky top-20 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl font-medium text-gray-900">${product.price.toFixed(2)}</div>
            
            <div className="space-y-1">
              <p className="text-green-700 font-bold text-sm">In stock</p>
              <p className="text-xs">Sold by <span className="text-blue-600 hover:underline cursor-pointer">RetailNet Limited</span> and Delivered by <span className="text-blue-600 hover:underline cursor-pointer">E-Shop</span>.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Quantity:</label>
                <select 
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="bg-gray-100 border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-amazon-orange outline-none cursor-pointer"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-2.5 px-4 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  isAdded 
                    ? 'bg-green-500 text-white shadow-none cursor-default' 
                    : 'bg-[#FFD814] hover:bg-[#F7CA00] text-black shadow-sm'
                }`}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button 
                className="w-full bg-[#FFA41C] hover:bg-[#F38F00] text-black font-semibold py-2.5 px-4 rounded-full text-sm shadow-sm transition-all shadow-[#FFA41C]/20"
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart'); // Hypothetical cart page
                }}
              >
                Buy Now
              </button>
            </div>

            <div className="pt-2">
              <button 
                onClick={toggleWishlist}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-amazon-orange transition-colors py-2 group"
              >
                <Heart className={`w-4 h-4 transition-transform group-hover:scale-110 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
