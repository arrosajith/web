import React from 'react';
import './TopBanner.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HomePage() {
  return (
    <>
      {/* ✅ Menu Bar */}
      
      <header className="main-header">
        <div className="top-bar">
          <img src="clinic-logo.png" alt="Clinic Logo" className="menu-logo" />
          <div className="branding-text">LJ Hospital | MediPlus Clinic</div>
          <div className="top-links">
            <a href="#">Laboratories</a>
            <a href="#">International</a>
            <a href="#">Academy</a>
          </div>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-links">
            <li><a href="/HomePage">HOME</a></li>
            <li><a href="/MediaPage">MEDIA</a></li>
            <li><a href="/FaciPage">FACILITIES</a></li>
            <li><a href="/About">ABOUT</a></li>
            <li className="has-submenu">
              <a href="ProductPage">SERVICES</a>
              <ul className="submenu">
                <li><a href="#">Skin Care</a></li>
                <li><a href="#">Facial Care</a></li>
                <li><a href="#">General Treatments</a></li>
                <li><a href="#">Other Treatments</a></li>
              </ul>
            </li>
            <li><a href="/CountactPage">Contact-Us</a></li>
            <li><a href="#"></a></li>
          </ul>
          <div className="nav-buttons">
            <button className="btn-orange">Book Your Appoinment</button>
            <button className="btn-red">Emergency Contact </button>
          </div>
        </nav>
      </header>

      {/* ✅ Hero Section */}
      <section className="hero-split">
        <div className="hero-left" />
        <div className="hero-right">
          <img src="clinic-logo.png" alt="Clinic Logo" className="hero-logo" />
          <h2>Compassionate Medical Care</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* ✅ Main Content */}
      <div className="mediplus-container">
        {/* ... your existing Swiper and info-boxes ... */}
      </div>
    </>
  );
}
