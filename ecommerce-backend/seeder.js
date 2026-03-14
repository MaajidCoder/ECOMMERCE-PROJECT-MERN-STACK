const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

dotenv.config();

connectDB();

const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    price: 89.99,
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    image: "https://via.placeholder.com/300x200?text=Airpods",
    category: "Electronics",
    stock: 10,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    price: 599.99,
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    image: "https://via.placeholder.com/300x200?text=iPhone+11+Pro",
    category: "Electronics",
    stock: 7,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    price: 929.99,
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    image: "https://via.placeholder.com/300x200?text=Canon+EOS+80D",
    category: "Electronics",
    stock: 5,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    price: 399.99,
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    image: "https://via.placeholder.com/300x200?text=PlayStation+4+Pro",
    category: "Electronics",
    stock: 11,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    price: 49.99,
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    image: "https://via.placeholder.com/300x200?text=Logitech+Mouse",
    category: "Electronics",
    stock: 7,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    price: 29.99,
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    image: "https://via.placeholder.com/300x200?text=Echo+Dot",
    category: "Electronics",
    stock: 0,
  },
];

const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

const validateImageUrl = (url) => {
  if (!url || typeof url !== "string") return placeholderImage;
  if (!/^https?:\/\//i.test(url)) return placeholderImage;
  return url;
};

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const sanitizedProducts = products.map((product) => ({
      ...product,
      image: validateImageUrl(product.image),
    }));

    const createdProducts = await Product.insertMany(sanitizedProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
