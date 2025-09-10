import React from "react";
import "./CareImageCard.css";

const CareImageCard = ({
  image = "/images/hero/doctor-hero.jpg",
  badgeIcon = "🏥",
  cardTitle = "We Provide The Best Medical Care For Your Family!",
}) => {
  return (
    <div className="cic">
      <img className="cic__img" src={image} alt="Medical staff" />

      {/* Play button (decorative) */}
      <button className="cic__play" aria-label="Play intro video">
        ▶
      </button>

      {/* Floating white card */}
      <div className="cic__floating">
        <div className="cic__badge" aria-hidden="true">{badgeIcon}</div>
        <h4 className="cic__title">{cardTitle}</h4>
        <div className="cic__underlines">
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

export default CareImageCard;
