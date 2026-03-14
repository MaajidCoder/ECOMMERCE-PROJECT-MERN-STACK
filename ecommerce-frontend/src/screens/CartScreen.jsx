import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCart,
  removeFromCart,
  addToCart,
} from "../store/slices/cartSlice";
import Message from "../components/Message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, loading, error } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchCart());
    }
  }, [dispatch, userInfo]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div key={item.product} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={item.product.image || "/placeholder.jpg"}
                      alt={item.product.name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <Link to={`/product/${item.product._id}`}>
                        <h5 className="card-title">{item.product.name}</h5>
                      </Link>
                      <p className="card-text">${item.product.price}</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <select
                      className="form-select"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCart({
                            productId: item.product._id,
                            quantity: Number(e.target.value),
                          }),
                        )
                      }>
                      {[...Array(item.product.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCartHandler(item.product._id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h5>
                <p>
                  $
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.quantity * item.product.price,
                      0,
                    )
                    .toFixed(2)}
                </p>
                <button
                  className="btn btn-primary w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
