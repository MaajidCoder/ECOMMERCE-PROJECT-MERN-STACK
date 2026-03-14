import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementItem, decrementItem, removeFromCart } from '../store/cartSlice';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10 flex flex-col items-center">
              <img src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB424694257_.svg" alt="Empty Cart" className="w-48 mb-4 brightness-95" />
              <h3 className="text-2xl font-bold mb-2">Your Amazon Cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">Looking for ideas?</p>
              <button 
                onClick={onClose}
                className="bg-amazon-orange hover:bg-amazon-buttonHover text-black py-2 px-8 rounded-full font-medium"
              >
                Shop today's deals
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded p-1 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-sm line-clamp-2 text-amazon-blue mb-1">{item.title}</h4>
                  <p className="font-bold mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-gray-100 rounded-md shadow-sm border border-gray-300">
                      <button 
                        onClick={() => dispatch(decrementItem(item.id))}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(incrementItem(item.id))}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 p-1 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4 text-lg">
              <span className="font-bold">Subtotal:</span>
              <span className="font-bold ml-2">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-sm text-black py-3 px-4 rounded-full shadow-sm transition-colors font-medium border border-transparent hover:border-[#F2C200] focus:ring-2 focus:ring-[#F2C200] focus:outline-none">
              Proceed to Checkout ({totalQuantity} items)
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
