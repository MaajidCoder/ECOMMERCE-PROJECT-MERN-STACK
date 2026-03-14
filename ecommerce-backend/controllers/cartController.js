const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    "name price image",
  );

  if (cart) {
    res.json(cart);
  } else {
    res.json({ items: [], totalPrice: 0 });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
      totalPrice: 0,
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  // Calculate total price
  cart.totalPrice = cart.items.reduce((total, item) => {
    const itemProduct = product; // For simplicity, assuming same product
    return total + itemProduct.price * item.quantity;
  }, 0);

  await cart.save();
  await cart.populate("items.product", "name price image");

  res.json(cart);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.id,
  );

  // Recalculate total price
  const populatedCart = await cart.populate("items.product", "price");
  cart.totalPrice = populatedCart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  await cart.save();
  await cart.populate("items.product", "name price image");

  res.json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === req.params.id,
  );

  if (!item) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  item.quantity = quantity;

  // Recalculate total price
  const populatedCart = await cart.populate("items.product", "price");
  cart.totalPrice = populatedCart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  await cart.save();
  await cart.populate("items.product", "name price image");

  res.json(cart);
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
  }

  res.json({ message: "Cart cleared" });
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
};
