import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductDetails,
  createProductReview,
} from "../store/slices/productSlice";
import { addToCart } from "../store/slices/cartSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { product, loading, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.user);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
    navigate("/cart");
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview({
        productId: id,
        review: { rating: Number(rating), comment },
      }),
    );
    setRating(0);
    setComment("");
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="img-fluid"
            />
          </div>
          <div className="col-md-3">
            <h3>{product.name}</h3>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5>Price: ${product.price}</h5>
                <p>Status: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                {product.stock > 0 && (
                  <div className="mb-3">
                    <label>Quantity:</label>
                    <select
                      className="form-select"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}>
                      {[...Array(product.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  className="btn btn-primary w-100"
                  disabled={product.stock === 0}
                  onClick={addToCartHandler}>
                  {cartLoading ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-md-6">
          <h3>Reviews</h3>
          {product.reviews && product.reviews.length === 0 && (
            <Message>No Reviews</Message>
          )}
          {product.reviews &&
            product.reviews.map((review) => (
              <div key={review._id} className="mb-3">
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          <div className="mt-4">
            <h4>Write a Customer Review</h4>
            {userInfo ? (
              <form onSubmit={submitReviewHandler}>
                <div className="mb-3">
                  <label>Rating</label>
                  <select
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Comment</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            ) : (
              <Message>
                Please <a href="/login">sign in</a> to write a review
              </Message>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
