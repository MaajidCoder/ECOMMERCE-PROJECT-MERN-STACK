import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amazon text-white pt-8 mt-12 w-full">
      <div className="text-center py-4 bg-amazon-light cursor-pointer hover:bg-gray-700 transition-colors" onClick={() => window.scrollTo(0, 0)}>
        <span className="text-sm font-semibold">Back to top</span>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold mb-4 text-base">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">About Amazon</li>
            <li className="hover:underline cursor-pointer">Investor Relations</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-base">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
            <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
            <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            <li className="hover:underline cursor-pointer">Advertise Your Products</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-base">Amazon Payment Products</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Amazon Business Card</li>
            <li className="hover:underline cursor-pointer">Shop with Points</li>
            <li className="hover:underline cursor-pointer">Reload Your Balance</li>
            <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4 text-base">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">Amazon and COVID-19</li>
            <li className="hover:underline cursor-pointer">Your Account</li>
            <li className="hover:underline cursor-pointer">Your Orders</li>
            <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
            <li className="hover:underline cursor-pointer">Returns & Replacements</li>
            <li className="hover:underline cursor-pointer">Help</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 py-8 text-center text-sm text-gray-400">
        <div className="flex justify-center space-x-6 mb-4">
          <span className="hover:underline cursor-pointer">Conditions of Use</span>
          <span className="hover:underline cursor-pointer">Privacy Notice</span>
          <span className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</span>
        </div>
        <p>&copy; 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
