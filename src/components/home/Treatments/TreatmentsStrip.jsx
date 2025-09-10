import React, { useEffect, useMemo, useRef, useState } from "react";
import "./TreatmentsStrip.css";

/**
 * Auto-sliding, responsive image grid (4/3/2/1 per view).
 * - Pause on hover
 * - Arrow nav in the title bar
 * - Keyboard ←/→
 * - Overlay captions
 */
const TreatmentsStrip = ({ items }) => {
  const defaults = useMemo(
    () => [
      { img: "/front.jpg",            title: "ACNE THERAPY" },
      { img: "/ff.jpg",               title: "ANTI-WRINKLE INJECTIONS" },
      { img: "/slider-image-1.jpg",   title: "CHEMICAL PEELS" },
      { img: "/tt.jpg",               title: "DERMAL FILLERS" },
      { img: "/pp.jpg",               title: "SKIN RESURFACING" },
      { img: "/oo.jpg",               title: "LASER HAIR REMOVAL" },
    ],
    []
  );
  const data = items?.length ? items : defaults;

  // perView changes with breakpoints
  const getPerView = () => {
    const w = window.innerWidth;
    if (w < 560) return 1;
    if (w < 900) return 2;
    if (w < 1280) return 3;
    return 4;
  };

  const [perView, setPerView] = useState(typeof window !== "undefined" ? getPerView() : 4);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const maxIndex = Math.max(0, data.length - perView);

  const go = (dir) => {
    setIndex((i) => {
      if (maxIndex === 0) return 0;
      const next = i + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  };

  // autoplay
  useEffect(() => {
    if (paused || data.length <= perView) return;
    timerRef.current = setInterval(() => go(+1), 3000);
    return () => clearInterval(timerRef.current);
  }, [paused, data.length, perView]);

  // perView on resize
  useEffect(() => {
    const onResize = () => setPerView(getPerView());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(+1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [maxIndex]);

  // % to move per step
  const stepPct = 100 / perView;

  return (
    <section
      className="treat"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="treat__bar">
        <button className="treat__arrow" aria-label="Previous" onClick={() => go(-1)}>‹</button>
        <h3 className="treat__title">THE AESTHETIC CLINIC’S WIDE RANGE OF TREATMENTS</h3>
        <button className="treat__arrow" aria-label="Next" onClick={() => go(+1)}>›</button>
      </div>

      <div className="treat__viewport" style={{ "--per": perView }}>
        <div
          className="treat__track"
          style={{ transform: `translateX(-${index * stepPct}%)` }}
        >
          {data.map((item, i) => (
            <figure className="treat__tile" key={`${item.title}-${i}`}>
              <img className="treat__img" src={item.img} alt={item.title} />
              <figcaption className="treat__cap">
                <span>{item.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TreatmentsStrip;
