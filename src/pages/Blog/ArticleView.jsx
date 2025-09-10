// src/pages/Blog/ArticleView.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { posts } from "../../data/posts";
import "./ArticleView.css";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const readingTime = (content) => {
  const words = (Array.isArray(content) ? content.join(" ") : content || "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

export default function ArticleView() {
  const { slug } = useParams();
  const idx = posts.findIndex((p) => p.slug === slug);
  const p = posts[idx];

  const prev = posts[idx - 1];
  const next = posts[idx + 1];

  const suggestions = useMemo(
    () => posts.filter((x) => x.slug !== slug && x.category === p?.category).slice(0, 3),
    [slug, p]
  );

  if (!p) return <main style={{ padding: 24 }}><h2>Article not found.</h2></main>;

  const share = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    } catch {
      alert(url);
    }
  };

  return (
    <main className="article">
      <header className="article__hero">
        <img src={p.image} alt="" />
        <div className="article__wash" />
        <div className="article__heroInner">
          <span className="tag">{p.category}</span>
          <h1 className="article__title">{p.title}</h1>
          <div className="meta meta--light">
            <span>👤 {p.author}</span>
            <span className="meta__dot">•</span>
            <span>📅 {fmtDate(p.date)}</span>
            <span className="meta__dot">•</span>
            <span>⏱ {readingTime(p.content)} min read</span>
          </div>
          <div className="article__actions">
            <button className="btn btn--ghost" onClick={share}>Copy link</button>
            <button
              className="btn btn--save"
              onClick={() => {
                const saved = JSON.parse(localStorage.getItem("saved_posts") || "[]");
                if (!saved.includes(p.slug)) saved.push(p.slug);
                localStorage.setItem("saved_posts", JSON.stringify(saved));
                alert("Saved!");
              }}
            >☆ Save</button>
          </div>
        </div>
      </header>

      <section className="article__wrap">
        <div className="article__content">
          {p.content.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <aside className="article__aside">
          <div className="widget">
            <h4 className="widget__title">In this article</h4>
            <ul className="toc">
              {p.content.map((_, i) => <li key={i}><a href={`#sec-${i}`}>Section {i + 1}</a></li>)}
            </ul>
          </div>
        </aside>
      </section>

      <nav className="article__nav">
        {prev ? <Link className="article__navBtn" to={`/blog/${prev.slug}`}>← {prev.title}</Link> : <span />}
        {next ? <Link className="article__navBtn" to={`/blog/${next.slug}`}>{next.title} →</Link> : <span />}
      </nav>

      <section className="article__suggest">
        <h3>More in {p.category}</h3>
        <div className="article__suggestGrid">
          {suggestions.map((s) => (
            <Link to={`/blog/${s.slug}`} className="sugg" key={s.id}>
              <img src={s.image} alt="" />
              <div className="sugg__body">
                <div className="sugg__title">{s.title}</div>
                <div className="sugg__meta">{fmtDate(s.date)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
