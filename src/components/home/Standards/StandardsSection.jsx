import React, { useState } from "react";
import "./StandardsSection.css";

/* ==== Simple stroke icons (blue line style) ==== */
const BeakerIcon = () => (
  <svg viewBox="0 0 48 48" className="icon">
    <path d="M14 6h20" />
    <path d="M18 6v8l-7 15a8 8 0 0 0 7 11h12a8 8 0 0 0 7-11l-7-15V6" />
    <path d="M16 28h16" />
    <path d="M18 33h12" />
  </svg>
);

const ToothIcon = () => (
  <svg viewBox="0 0 48 48" className="icon">
    <path d="M16 9c5-6 11-6 16 0 4 5 2 11 0 15-1 2-2 6-2 10 0 6-5 7-8 0-3 7-8 6-8 0 0-4-1-8-2-10-2-4-4-10 0-15z" />
  </svg>
);

const WatchIcon = () => (
  <svg viewBox="0 0 48 48" className="icon">
    <rect x="15" y="12" width="18" height="24" rx="4" />
    <path d="M24 18v8l5 3" />
    <rect x="18" y="4" width="12" height="6" rx="2" />
    <rect x="18" y="38" width="12" height="6" rx="2" />
  </svg>
);

const DoctorIcon = () => (
  <svg viewBox="0 0 48 48" className="icon">
    <circle cx="24" cy="14" r="6" />
    <path d="M10 36c2-8 10-10 14-10s12 2 14 10" />
    <path d="M24 26v6" />
    <path d="M20 30h8" />
  </svg>
);

/* ==== Feature Card ==== */
const FeatureCard = ({ Icon: IconComponent, title, desc }) => {
  const [active, setActive] = useState(false);

  return (
    <article
      className={`featCard ${active ? "is-active" : ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="featCard__inner">
        <div className="featCard__icon">
          {IconComponent ? <IconComponent /> : null}
        </div>
        <h4 className="featCard__title">{title}</h4>
        <p className="featCard__desc">{desc}</p>
      </div>

      {/* bottom toggle (works for touch/keyboard) */}
      <button
        className="featCard__toggle"
        aria-expanded={active}
        aria-label={active ? "Collapse card details" : "Expand card details"}
        onClick={() => setActive((s) => !s)}
      >
        <span className="chev" />
      </button>
    </article>
  );
};

/* ==== Full Section ==== */
const StandardsSection = ({ bg = "/background.jpg" }) => {
  return (
    <section className="standards" style={{ "--standards-bg": `url(${bg})` }}>
      <div className="standards__wrap">
        {/* Top two-column header */}
        <div className="standards__top">
          <div className="standards__left">
            <p className="eyebrow">Wide Range Of Medical Services For Your Family</p>
            <h2 className="title">
              Sets The Standard For High <br />
              Quality Care And Patient <br />
              Safety!!
            </h2>
          </div>

          <div className="standards__right">
            <p className="lead strong">
              Our doctors include highly qualified male and female practitioners who
              come from a range of backgrounds and bring a diversity of skills. Our
              administration and support staff all have exceptional people skills.
            </p>
            <p className="lead">
              Our administration and support staff all have exceptional people skills
              and are trained to assist you with all medical enquiries.
            </p>

            <div className="ctaRow">
              <a className="btn btn--solid" href="/values">
                Our Core Values <span className="arr">➜</span>
              </a>
              <a className="btn btn--ghost" href="/doctors">
                Meet Our Doctors
              </a>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="feat">
          <FeatureCard
            Icon={BeakerIcon}
            title="Medical Advices & Check Ups"
            desc="Free coverage for adults with limited income"
          />
          <FeatureCard
            Icon={ToothIcon}
            title="Trusted Medical Treatment"
            desc="Evidence-based care with modern facilities"
          />
          <FeatureCard
            Icon={WatchIcon}
            title="Emergency Help Available 24/7"
            desc="Fast response and continuous monitoring"
          />
          <FeatureCard
            Icon={DoctorIcon}
            title="Only Qualified Doctors"
            desc="Board-certified, experienced professionals"
          />
        </div>
      </div>
    </section>
  );
};

export default StandardsSection;
