# 🛒 E-Shop - Modern Amazon-Style E-Commerce Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

A high-performance, fully responsive e-commerce frontend built with **React**, **Redux Toolkit**, and **Tailwind CSS**. Inspired by Amazon's clean and functional design.

## ✨ Features

### 🔐 Authentication & User Profile
- **Login & Signup**: Interactive forms with validation and show/hide password logic.
- **Protected Routes**: Secure access to the user profile and order history.
- **Dynamic Profile**: Edit user details and manage account settings.

### 🔍 Search & Discovery
- **Live Search**: Real-time product filtering using Redux state.
- **Category Filtering**: functional category selection (Electronics, Jewelry, etc.) directly from the search bar or sidebar.
- **Dynamic Product Grid**: Smart layout for high-quality product cards.

### 🛍️ Shopping Experience
- **Interactive Cart**: Slide-out drawer with real-time total calculation and quantity management.
- **Wishlist System**: Heart toggle on any product to save items for later.
- **Product Details**: Comprehensive view with gallery, quantity selector, and delivery features.
- **Orders History**: Beautifully designed tracking page with order status badges.

### ☰ Advanced Navigation
- **Responsive Sidebar**: Multi-level navigation for categories, pages, and account settings.
- **Sticky Navbar**: Amazon-style header with sticky behavior for easy access.

## 🛠️ Tech Stack

- **Framework**: [React.js](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MaajidCoder/MERN-ECOMMERCE-PROJECT.git
   ```

2. **Navigate to project directory**:
   ```bash
   cd MERN-ECOMMERCE-PROJECT
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📁 Project Structure

```text
src/
├── components/     # Reusable UI components (Navbar, Cart, Sidebar, etc.)
├── pages/          # Individual page components (Home, Login, Profile, etc.)
├── store/          # Redux Toolkit slices and store configuration
├── App.jsx         # Main routing and app structure
└── main.jsx        # Entry point
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/MaajidCoder/MERN-ECOMMERCE-PROJECT/issues).


Built with ❤️ by [MaajidCoder](https://github.com/MaajidCoder)
