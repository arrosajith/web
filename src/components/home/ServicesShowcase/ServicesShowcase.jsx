import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ServicesShowcase.css";

const ServicesShowcase = ({ slides }) => {
  // Default slides using your /public images
  const defaultSlides = useMemo(
    () => [
      {
        title: "Bespoke Cosmetic Treatments",
        text:
          "A tailored combination of aesthetic treatments to enhance features and soften wrinkles. Relaxed, professional care that helps you look great and feel fantastic.",
        image: "/front.jpg",
        cta: "Find Out More",
        href: "/services",
      },
      {
        title: "Skin Rejuvenation & Anti-Wrinkle",
        text:
          "From skin rejuvenation to anti-wrinkle solutions, our team provides evidence-based treatments to restore your glow with natural-looking results.",
        image: "/ff.jpg",
        cta: "Find Out More",
        href: "/services",
      },
      {
        title: "Facial Contouring & Fillers",
        text:
          "Subtle contouring and filler techniques to complement your unique facial harmony, performed by experienced clinicians.",
        image: "/slider-image-1.jpg",
        cta: "Find Out More",
        href: "/services",
      },
    ],
    []
  );

  const items = slides && slides.length ? slides : defaultSlides;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  const go = (dir) => setIndex((i) => (i + dir + items.length) % items.length);
  const goto = (i) => setIndex(i);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(timer.current);
  }, [paused, items.length]);

  // keyboard (←/→)
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
      className="svc2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="svc2__wrap">
        <h2 className="svc2__title">
          Advanced Healthcare Solutions
          <br />
          <span>for Your Well-being</span>
        </h2>

        {/* viewport */}
        <div className="svc2__viewport">
          {/* slider track */}
          <div
            className="svc2__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {items.map((s, i) => {
              const reverse = i % 2 === 1; // alternate layout
              const isCurrent = i === index;
              return (
                <article
                  key={i}
                  className={`svc2__slide ${reverse ? "is-reverse" : ""} ${
                    isCurrent ? "is-current" : ""
                  }`}
                >
                  {/* text area */}
                  <div className="svc2__text">
                    <h3 className="svc2__heading">{s.title}</h3>
                    <p className="svc2__para">{s.text}</p>
                    <a className="svc2__btn" href={s.href || "#"}>
                      {s.cta || "Learn More"}
                    </a>
                  </div>

                  {/* image area */}
                  <div className="svc2__media">
                    <img className="svc2__img" src={s.image} alt="" />
                  </div>
                </article>
              );
            })}
          </div>

          {/* nav */}
          <button
            className="svc2__nav svc2__nav--prev"
            aria-label="Previous"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            className="svc2__nav svc2__nav--next"
            aria-label="Next"
            onClick={() => go(+1)}
          >
            ›
          </button>

          {/* dots */}
          <div className="svc2__dots" role="tablist" aria-label="Slides">
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                className={`svc2__dot ${i === index ? "is-active" : ""}`}
                onClick={() => goto(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
