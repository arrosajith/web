import React, { useEffect, useMemo, useRef, useState } from "react";
import "./HeroSection.css";

const HeroSection = ({ slides, background }) => {
  // fallback: if slides not provided, build from your /public images
  const defaultSlides = useMemo(
    () => [
      {
        img: "/cc.jpg",
        titleLines: ["Wide Range Of", "Medical Services For", "Your Family"],
        lead:
          "The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.",
      },
      {
        img: "/front.jpg",
        titleLines: ["Caring For The Health", "And Well Being Of You", "And Your Family"],
        lead:
          "From general check-ups to chronic care, we provide all aspects of medical practice for your whole family.",
      },
      {
        img: "/slider-image-1.jpg",
        titleLines: ["Advanced Diagnostics", "Modern Facilities"],
        lead:
          "State-of-the-art labs and imaging services help us diagnose and treat with precision.",
      },
      {
        img: "/ff.jpg",
        titleLines: ["Compassionate Doctors", "Trusted By Families"],
        lead:
          "Experienced, caring professionals dedicated to delivering exceptional outcomes.",
      },
    ],
    []
  );

  const items =
    (slides && slides.length > 0 && slides) ||
    (background ? [{ img: background, titleLines: defaultSlides[0].titleLines, lead: defaultSlides[0].lead }] : defaultSlides);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = (dir) => {
    setIndex((i) => (i + dir + items.length) % items.length);
  };

  useEffect(() => {
    if (paused || items.length <= 1) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(timerRef.current);
  }, [items.length, paused]);

  // Keyboard nav (←/→)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(+1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="hero__slides">
        {items.map((s, i) => (
          <div
            key={i}
            className={`hero__slide ${i === index ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${s.img})` }}
            aria-hidden={i !== index}
          />
        ))}
      </div>
      <div className="hero__wash" />

      {/* Nav chevrons */}
      <button
        className="hero__nav hero__nav--left"
        aria-label="Previous"
        onClick={() => go(-1)}
      >
        <span>‹</span>
      </button>
      <button
        className="hero__nav hero__nav--right"
        aria-label="Next"
        onClick={() => go(+1)}
      >
        <span>›</span>
      </button>

      {/* Dots */}
      <div className="hero__dots" role="tablist" aria-label="Hero slides">
        {items.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            className={`hero__dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {/* Text block (changes with slide) */}
      <div className="hero__content" aria-live="polite">
        <div key={index} className="hero__contentInner">
          <h1 className="hero__title">
            {items[index].titleLines?.map((line, li) => (
              <span key={li} className="hero__titleLine">
                {line}
              </span>
            ))}
          </h1>

          {items[index].lead && <p className="hero__lead">{items[index].lead}</p>}

          <div className="hero__actions">
            <a className="btn btn--light" href="/about">
              More About Us <span className="btn__arrow">➜</span>
            </a>
            <a className="btn btn--primary" href="/doctors">
              Find A Doctor
            </a>
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="hero__info">
        <div className="info__grid">
          {/* Emergency */}
          <div className="info__card">
            <div className="info__head">
              <div className="info__icon" aria-hidden="true">🩺</div>
              <h3 className="info__title">Emergency Cases</h3>
            </div>
            <p className="info__text">
              Please feel free to contact our friendly reception staff with any
              general or medical enquiry.
            </p>
            <div className="info__contact">
              <span className="info__phoneLabel">📞</span>
              <a href="tel:01061245741" className="info__phone">01061245741</a>
            </div>
          </div>

          {/* Timetable */}
          <div className="info__card">
            <div className="info__head">
              <div className="info__icon" aria-hidden="true">🗓️</div>
              <h3 className="info__title">Doctors Timetable</h3>
            </div>
            <p className="info__text">
              Qualified doctors available six days a week. View our timetable to
              make an appointment.
            </p>
            <a href="/timetable" className="info__link">➜ View Timetable</a>
          </div>

          {/* Opening Hours */}
          <div className="info__card info__card--hours">
            <div className="info__head">
              <div className="info__icon" aria-hidden="true">📝</div>
              <h3 className="info__title">Opening Hours</h3>
            </div>
            <ul className="hours">
              <li><span>Monday – Friday</span><b>8.00 – 7.00 pm</b></li>
              <li><span>Saturday</span><b>9.00 – 8.00 pm</b></li>
              <li><span>Sunday</span><b>10.00 – 9.00 pm</b></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
