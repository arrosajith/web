// src/pages/Blog/HeroSpotlight.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../BlogPage.css";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const readingTime = (content) => {
  const words = (Array.isArray(content) ? content.join(" ") : content || "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export default function HeroSpotlight({ posts = [] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (paused || posts.length <= 1) return;
    timer.current = setInterval(() => setI((v) => (v + 1) % posts.length), 6000);
    return () => clearInterval(timer.current);
  }, [paused, posts.length]);

  const main = posts[i];
  const side1 = posts[(i + 1) % posts.length];
  const side2 = posts[(i + 2) % posts.length];

  return (
    <section className="heroX" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="heroX__wrap">
        {/* Left: main spotlight */}
        <article className="heroX__main">
          <Link className="heroX__media" to={`/blog/${main.slug}`}>
            <img src={main.image} alt="" />
            <div className="heroX__gradient" />
            <span className="tag">{main.category}</span>
          </Link>
          <div className="heroX__content">
            <Link className="heroX__title" to={`/blog/${main.slug}`}>{main.title}</Link>
            <div className="meta meta--light">
              <span>👤 {main.author}</span>
              <span className="meta__dot">•</span>
              <span>📅 {fmtDate(main.date)}</span>
              <span className="meta__dot">•</span>
              <span>⏱ {readingTime(main.content)} min read</span>
            </div>
            <p className="heroX__excerpt">{main.excerpt}</p>
            <div className="heroX__ctas">
              <Link className="btn btn--ghost" to={`/blog/${main.slug}`}>Read now</Link>
              <button
                className="btn btn--save"
                onClick={() => {
                  const saved = JSON.parse(localStorage.getItem("saved_posts") || "[]");
                  if (!saved.includes(main.slug)) saved.push(main.slug);
                  localStorage.setItem("saved_posts", JSON.stringify(saved));
                }}
              >
                ☆ Save
              </button>
            </div>
          </div>
        </article>

        {/* Right: two stacked teasers */}
        <div className="heroX__side">
          {[side1, side2].map((p) => (
            <article className="heroX__tile" key={p.id}>
              <Link className="heroX__tileMedia" to={`/blog/${p.slug}`}>
                <img src={p.image} alt="" />
                <div className="heroX__gradient" />
                <span className="tag">{p.category}</span>
              </Link>
              <div className="heroX__tileBody">
                <Link className="heroX__tileTitle" to={`/blog/${p.slug}`}>{p.title}</Link>
                <div className="meta meta--light">
                  <span>📅 {fmtDate(p.date)}</span>
                  <span className="meta__dot">•</span>
                  <span>⏱ {readingTime(p.content)}m</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        <div className="heroX__dots">
          {posts.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === i ? "is-active" : ""}`}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
