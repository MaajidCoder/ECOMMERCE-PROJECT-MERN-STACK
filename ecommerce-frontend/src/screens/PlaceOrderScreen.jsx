import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { order, loading, error, success } = useSelector(
    (state) => state.orders,
  );

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const paymentMethod = localStorage.getItem("paymentMethod");

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch(clearCart());
    }
  }, [success, navigate, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }),
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {shippingAddress.address},{" "}
                {shippingAddress.city} {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
            </div>
            <div className="list-group-item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {paymentMethod}
              </p>
            </div>
            <div className="list-group-item">
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div className="list-group list-group-flush">
                  {cartItems.map((item, index) => (
                    <div className="list-group-item" key={index}>
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img
                            src={item.product.image || "/placeholder.jpg"}
                            alt={item.product.name}
                            className="img-fluid rounded"
                          />
                        </div>
                        <div className="col">
                          <Link to={`/product/${item.product._id}`}>
                            {item.product.name}
                          </Link>
                        </div>
                        <div className="col-md-4">
                          {item.quantity} x ${item.product.price} = $
                          {item.quantity * item.product.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2>Order Summary</h2>
              <div className="row">
                <div className="col">Items:</div>
                <div className="col">${itemsPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col">Shipping:</div>
                <div className="col">${shippingPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col">Tax:</div>
                <div className="col">${taxPrice.toFixed(2)}</div>
              </div>
              <div className="row">
                <div className="col">Total:</div>
                <div className="col">${totalPrice.toFixed(2)}</div>
              </div>
              {error && <Message variant="danger">{error}</Message>}
              <button
                type="button"
                className="btn btn-primary w-100 mt-3"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}>
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
