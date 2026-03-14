import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Container, Row, Col, Card } from "react-bootstrap";

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  // Group products by category
  const categories = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categoryIcons = {
    Electronics: "fas fa-laptop",
    Clothing: "fas fa-tshirt",
    Books: "fas fa-book",
    "Home & Garden": "fas fa-home",
    Sports: "fas fa-futbol",
    Beauty: "fas fa-spa",
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Product Categories</h1>

      {!selectedCategory ? (
        <>
          <p className="text-center mb-4">
            Explore our wide range of product categories
          </p>
          <Row>
            {Object.keys(categories).map((category) => (
              <Col md={4} lg={3} className="mb-4" key={category}>
                <Card
                  className="category-card h-100"
                  onClick={() => handleCategoryClick(category)}
                  style={{ cursor: "pointer" }}>
                  <Card.Body className="text-center">
                    <i
                      className={`category-icon ${categoryIcons[category] || "fas fa-box"}`}></i>
                    <Card.Title className="mt-3">{category}</Card.Title>
                    <Card.Text>
                      {categories[category].length} product
                      {categories[category].length !== 1 ? "s" : ""}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <div className="mb-4">
            <button
              className="btn btn-outline-primary mb-3"
              onClick={handleBackToCategories}>
              <i className="fas fa-arrow-left me-2"></i>
              Back to Categories
            </button>
            <h2 className="text-primary">{selectedCategory}</h2>
          </div>
          <Row>
            {categories[selectedCategory].map((product) => (
              <Col lg={3} md={4} sm={6} className="mb-4" key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default CategoriesScreen;
