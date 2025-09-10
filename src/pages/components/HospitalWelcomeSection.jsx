import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./HospitalWelcomeSection.css";

const images = ["oo.jpg", "pp.jpg", "oo.jpg"];

export default function HospitalWelcomeSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hospital-welcome-section">
      <div className="background-slider">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            className="background-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
      </div>
      <div className="overlay">
        <div className="content">
          <h1>Keep your Skin Safely Join With Us.</h1>
          <p>
            Our skin care specialists provide top-notch service to help you maintain healthy, glowing skin.
            From personalized treatments to professional advice, we’re with you every step of the way.
            Trust us to offer solutions that fit your lifestyle and enhance your natural beauty.
            Join our clinic today for a radiant future.
          </p>
        </div>
      </div>
    </div>
  );
}
