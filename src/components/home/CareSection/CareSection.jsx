import React from "react";
import "./CareSection.css";
import CareImageCard from "../CareImageCard/CareImageCard";

const CareSection = ({ image = "/front1.png" }) => {
  return (
    <section className="care">
      <div className="care__grid">
        {/* LEFT SIDE */}
        <div className="care__left">
          <h2 className="care__title">
            Caring For The Health And <br />
            Well Being Of You And Your <br />
            Family.
          </h2>

          <p className="care__lead">
            We provide all aspects of medical practice for your whole family,
            including general check-ups or assisting you with injuries.
          </p>

          <p className="care__para">
            We will work with you to develop individualised care plans,
            including management of chronic diseases. If we cannot assist,
            we can provide referrals or advice about the type of practitioner
            you require. We treat all enquiries in the strictest confidence.
          </p>

          <div className="care__ctaRow">
            <a href="/contact" className="btn btn--primary care__ctaBtn">
              Contact Us <span className="btn__arrow">➜</span>
            </a>

            <div className="care__doc">
              <div className="care__docName">John Winston</div>
              <div className="care__docRole">Pediatrician</div>
            </div>
          </div>

          <ul className="care__ticks">
            <li>Delivering tomorrow’s health care for your family</li>
            <li>Connecting with the world to improve health globally</li>
            <li>Accelerating discovery and creating education</li>
          </ul>
        </div>

        {/* RIGHT SIDE (separate reusable image card) */}
        <div className="care__right">
          <CareImageCard
            image={image}                     // <-- now uses your passed path
            badgeIcon="🏥"
            cardTitle="We Provide The Best Medical Care For Your Family!"
          />
        </div>
      </div>
    </section>
  );
};

export default CareSection;
