import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ⬇️ Use the file that actually exists in your /src/pages
// If your file is HomePage.jsx, keep this import:
import HomePage from "./pages/HomePage.jsx";
// If your file is Homepage.jsx instead, use:
// import HomePage from "./pages/Homepage.jsx";

import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import CartPage from "./pages/CartPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";

export default function App() {
  return (
    <div className="font-sans flex flex-col min-h-screen bg-white text-slate-800">
      {/* Brand + menu + search + Book Now */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* Home should be at "/" */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Blog" element={<BlogPage />} />
          {/* Any unknown path → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
