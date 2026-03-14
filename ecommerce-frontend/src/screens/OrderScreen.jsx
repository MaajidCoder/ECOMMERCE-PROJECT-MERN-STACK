import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../store/slices/orderSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!order || order._id !== id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder({ orderId: id, paymentResult }));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container">
      <h1>Order {order._id}</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </div>
            <div className="list-group-item">
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </div>
            <div className="list-group-item">
              <h2>Order Items</h2>
              {order.items.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="list-group list-group-flush">
                  {order.items.map((item, index) => (
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
                          {item.quantity} x ${item.price} = $
                          {item.quantity * item.price}
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
                <div className="col">
                  $
                  {order.items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="col">Shipping:</div>
                <div className="col">$10.00</div>
              </div>
              <div className="row">
                <div className="col">Tax:</div>
                <div className="col">
                  $
                  {(
                    0.15 *
                    order.items.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0,
                    )
                  ).toFixed(2)}
                </div>
              </div>
              <div className="row">
                <div className="col">Total:</div>
                <div className="col">${order.totalPrice}</div>
              </div>
              {!order.isPaid && (
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={successPaymentHandler}>
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
