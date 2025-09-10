import React, { useEffect, useRef } from "react";
import "./WhyChooseUs.css";

/**
 * Props:
 *  bg    => "/tt.jpg" (from /public)
 *  speed => 0.2 - 0.5 (0.32 default)
 */
const WhyChooseUs = ({ bg = "/tt.jpg", speed = 0.32 }) => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const bgEl = bgRef.current;
    if (!section || !bgEl) return;

    // Respect user's reduced-motion setting
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        // When you scroll down, rect.top decreases. We want the bg to move up slower,
        // so translate in the opposite direction of scroll (negative sign).
        const translateY = -rect.top * speed;
        bgEl.style.transform = `translateY(${translateY}px) scale(1.15)`;
      });
    };

    // initial position + listeners
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return (
    <section ref={sectionRef} className="choose">
      {/* Parallax BG */}
      <div className="choose__bgWrap" aria-hidden="true">
        <div
          ref={bgRef}
          className="choose__bg choose__bg--div"
          style={{ backgroundImage: `url(${bg})` }}
        />
        <div className="choose__wash" />
      </div>

      {/* Floating card */}
      <div className="choose__card">
        <p className="choose__eyebrow">SEE THE DIFFERENCE —</p>
        <h2 className="choose__title">Why Choose Us?</h2>

        <ul className="choose__list">
          <li className="choose__item">
            <div className="choose__icon">🦷</div>
            <div>
              <h4 className="choose__itemTitle">Basic Gumcare</h4>
              <p className="choose__itemText">
                We are not just a regular clinic, but a medical service provider, with which you can share any problem
              </p>
            </div>
          </li>
          <li className="choose__item">
            <div className="choose__icon">💙</div>
            <div>
              <h4 className="choose__itemTitle">First Class Support</h4>
              <p className="choose__itemText">
                Caring, responsive support from check-in to follow-up—every visit, every time
              </p>
            </div>
          </li>
          <li className="choose__item">
            <div className="choose__icon">✨</div>
            <div>
              <h4 className="choose__itemTitle">Awesome Services</h4>
              <p className="choose__itemText">
                Modern equipment, expert doctors, and clear communication for stress-free care
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
