import React, { useRef, useState } from "react";
import "./BeforeAfterSection.css";

/** ========== Core Before/After slider (unchanged behavior) ========== */
const BACompare = ({
  before = "/front.jpg",
  after = "/ff.jpg",
  labelBefore = "Before",
  labelAfter = "After",
  start = 50,
}) => {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(start); // 0..100
  const [drag, setDrag] = useState(false);

  const clamp = (v) => Math.max(0, Math.min(100, v));

  const setFromEvent = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(clamp(pct));
  };

  const onDown = (e) => {
    setDrag(true);
    setFromEvent(e);
    if ("touches" in e) e.preventDefault();
  };
  const onMove = (e) => {
    if (!drag) return;
    setFromEvent(e);
  };
  const onUp = () => setDrag(false);

  const onKey = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => clamp(p - 2));
    if (e.key === "ArrowRight") setPos((p) => clamp(p + 2));
  };

  return (
    <div
      className="ba"
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchMove={onMove}
      onTouchEnd={onUp}
      role="group"
      aria-label="Before and After image comparison"
      style={{ "--pos": `${pos}%` }}
    >
      <img className="ba__img ba__img--after" src={after} alt={labelAfter} />
      <div className="ba__before" style={{ width: `${pos}%` }}>
        <img className="ba__img ba__img--before" src={before} alt={labelBefore} />
      </div>

      <div className="ba__badge ba__badge--left">{labelBefore}</div>
      <div className="ba__badge ba__badge--right">{labelAfter}</div>

      <button
        type="button"
        className="ba__handle"
        style={{ left: `${pos}%` }}
        onMouseDown={onDown}
        onTouchStart={onDown}
        onKeyDown={onKey}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-label="Drag to reveal before and after"
      >
        <span className="ba__bar" />
        <span className="ba__knob" />
      </button>
    </div>
  );
};

/** ========== A single alternating card (text + compare) ========== */
const BAItem = ({
  side = "right", // 'right' = text on right (first card), 'left' = text on left (second card), etc.
  title,
  text,
  before,
  after,
}) => {
  const isRight = side === "right";
  return (
    <article className={`baItem ${isRight ? "is-right" : "is-left"}`}>
      <div className="baItem__grid">
        {/* media */}
        <div className="baItem__media">
          <BACompare before={before} after={after} start={50} />
        </div>

        {/* text */}
        <div className="baItem__text">
          <h3 className="baItem__title">{title}</h3>
          <p className="baItem__para">{text}</p>
        </div>
      </div>
    </article>
  );
};

/** ========== Section with alternating cards ========== */
const BeforeAfterSection = () => {
  const items = [
    {
      title: "Subtle, Natural Enhancements",
      text:
        "Our aesthetic approach focuses on balance and harmony. Compare before and after to see how small refinements can deliver confident, natural results.",
      before: "/front.jpg",
      after: "/ff.jpg",
      // first card text on RIGHT
      side: "right",
    },
    {
      title: "Skin Rejuvenation",
      text:
        "Target textural concerns and dullness. Treatments are tailored for your skin type to restore clarity and glow.",
      before: "/pp.jpg",
      after: "/zz.jpg",
      // second card text on LEFT
      side: "left",
    },
    {
      title: "Contours & Definition",
      text:
        "Thoughtful contouring techniques enhance facial definition while preserving your unique character.",
      before: "/cc.jpg",
      after: "/slider-image-1.jpg",
      // third card text on RIGHT again
      side: "right",
    },
  ];

  return (
    <section className="baSection">
      <div className="baSection__wrap">
        <p className="baSection__eyebrow">Real Results</p>
        <h2 className="baSection__title">Before &amp; After</h2>
        <p className="baSection__lead">
          Drag the slider to compare. Cards alternate: first shows the text on the right,
          second on the left, third on the right—exactly as you asked.
        </p>

        <div className="baList">
          {items.map((it, i) => (
            <BAItem key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
export { BACompare };
