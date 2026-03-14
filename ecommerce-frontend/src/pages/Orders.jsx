import React from 'react';
import { Package, CheckCircle, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock orders for UI demonstration
const mockOrders = [
  {
    id: 'ORD-20241201',
    date: 'December 1, 2024',
    status: 'Delivered',
    total: 199.95,
    items: [
      { title: 'Fjallraven Foldsack No.1 Backpack', image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', price: 109.95, quantity: 1 },
      { title: 'Mens Casual T-Shirts', image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', price: 22.3, quantity: 2 },
    ],
  },
  {
    id: 'ORD-20241115',
    date: 'November 15, 2024',
    status: 'Shipped',
    total: 55.99,
    items: [
      { title: 'John Hardy Women\'s Legends Naga Ring', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_FMwebp_QL65_.jpg', price: 55.99, quantity: 1 },
    ],
  },
];

const statusIcon = {
  Delivered: <CheckCircle className="w-4 h-4 text-green-600" />,
  Shipped: <Truck className="w-4 h-4 text-blue-500" />,
  Processing: <Clock className="w-4 h-4 text-yellow-500" />,
};
const statusColor = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
};

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Package className="w-6 h-6 text-amazon-orange" /> Your Orders
        </h1>

        {mockOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
            <Link to="/">
              <button className="bg-[#FFD814] hover:bg-[#F7CA00] text-black py-2 px-8 rounded-full font-semibold transition-colors">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                {/* Order Header */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-6 text-sm text-gray-600">
                    <div>
                      <p className="text-xs uppercase font-semibold text-gray-400">Order placed</p>
                      <p className="font-medium text-gray-800">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-gray-400">Total</p>
                      <p className="font-medium text-gray-800">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-gray-400">Order #</p>
                      <p className="font-mono font-medium text-gray-800">{order.id}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColor[order.status]}`}>
                    {statusIcon[order.status]} {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="p-4 flex flex-col gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} · ${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
