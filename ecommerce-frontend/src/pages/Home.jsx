import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const searchQuery = useSelector((state) => state.search.query).toLowerCase();
  const searchCategory = useSelector((state) => state.search.category);

  // Mock fetching products initially
  useEffect(() => {
    // We'll replace this with actual API call later
    const fetchDummyProducts = async () => {
      try {
        // Using FakeStoreAPI for dummy data to look like real products
        const res = await fetch('https://fakestoreapi.com/products?limit=12');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };
    fetchDummyProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="max-w-[1500px] mx-auto">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden">
          {/* Hero Image (Placeholder for a large promo banner) */}
          <div className="w-full h-[250px] md:h-[400px] bg-gradient-to-b from-blue-300 via-blue-200 to-gray-100 flex items-center justify-center relative">
            <img 
              src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg" 
              alt="Hero Banner" 
              className="w-full h-full object-cover object-top mask-image-gradient"
              style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)' }}
            />
          </div>

          {/* Product Grid positioned to overlap the hero banner slightly */}
          <div className="px-4 md:px-6 lg:px-8 mt-[-100px] md:mt-[-150px] relative z-10">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-orange"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products
                  .filter((product) => {
                    const matchesCategory = searchCategory === 'All' || product.category === searchCategory;
                    const matchesSearch = product.title.toLowerCase().includes(searchQuery);
                    return matchesCategory && matchesSearch;
                  })
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
