const AboutScreen = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="mb-4">About Our Ecommerce Store</h1>
          <p className="lead mb-4">
            Welcome to our modern ecommerce platform where you can find the best
            products at competitive prices. We're committed to providing
            excellent customer service and a seamless shopping experience.
          </p>

          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-shipping-fast fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Fast Shipping</h5>
                  <p className="card-text">
                    Quick and reliable delivery to get your orders to you as
                    soon as possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">Secure Payment</h5>
                  <p className="card-text">
                    Your payment information is protected with industry-standard
                    security.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-headset fa-3x text-primary mb-3"></i>
                  <h5 className="card-title">24/7 Support</h5>
                  <p className="card-text">
                    Our customer support team is always ready to help you with
                    any questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3>Our Mission</h3>
            <p>
              To provide high-quality products at affordable prices while
              ensuring customer satisfaction through excellent service and fast
              delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
