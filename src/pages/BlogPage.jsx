// src/pages/Blog/BlogPage.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { posts as POSTS, uniqueCategories } from "../data/posts";
import HeroSpotlight from "./Blog/HeroSpotlight";
import "./BlogPage.css";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const readingTime = (content) => {
  const words = (Array.isArray(content) ? content.join(" ") : content || "").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

const Card = ({ p }) => (
  <article className="card">
    <Link to={`/blog/${p.slug}`} className="card__media">
      <img src={p.image} alt="" />
      <span className="tag">{p.category}</span>
    </Link>
    <div className="card__body">
      <Link to={`/blog/${p.slug}`} className="card__title">{p.title}</Link>
      <p className="card__excerpt">{p.excerpt}</p>
      <div className="meta">
        <span>👤 {p.author}</span>
        <span className="meta__dot">•</span>
        <span>📅 {fmtDate(p.date)}</span>
        <span className="meta__dot">•</span>
        <span>⏱ {readingTime(p.content)}m</span>
      </div>
    </div>
  </article>
);

export default function BlogPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("new");
  const [visible, setVisible] = useState(6);

  const heroPosts = useMemo(() => POSTS.slice(0, 5), []);
  const filtered = useMemo(() => {
    let arr = POSTS.slice();
    if (cat !== "All") arr = arr.filter((p) => p.category === cat);
    if (q.trim()) {
      const t = q.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(t) ||
          p.excerpt.toLowerCase().includes(t) ||
          p.category.toLowerCase().includes(t)
      );
    }
    arr.sort((a, b) =>
      sort === "new" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );
    return arr;
  }, [q, cat, sort]);

  const showing = filtered.slice(0, visible);

  // simple "Trending" = most recent 3
  const trending = useMemo(
    () => POSTS.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3),
    []
  );

  return (
    <main className="blogX">
      <HeroSpotlight posts={heroPosts} />

      {/* Controls */}
      <section className="controls">
        <div className="controls__wrap">
          <input
            className="field"
            placeholder="Search articles…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select className="field" value={cat} onChange={(e) => setCat(e.target.value)}>
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select className="field" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="new">Newest first</option>
            <option value="old">Oldest first</option>
          </select>
        </div>
      </section>

      {/* Grid + Sidebar */}
      <section className="layout">
        <div className="layout__wrap">
          <div className="layout__main">
            <div className="grid">
              {showing.map((p) => <Card key={p.id} p={p} />)}
            </div>

            {visible < filtered.length && (
              <div className="loadMore">
                <button className="btn btn--solid" onClick={() => setVisible((v) => v + 6)}>
                  Load more
                </button>
                <div className="loadMore__count">
                  Showing {showing.length} of {filtered.length}
                </div>
              </div>
            )}
          </div>

          <aside className="sidebar">
            <div className="widget">
              <h4 className="widget__title">Trending</h4>
              <ul className="trend">
                {trending.map((p) => (
                  <li key={p.id}>
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    <div className="trend__meta">{fmtDate(p.date)}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="widget">
              <h4 className="widget__title">Categories</h4>
              <div className="chips">
                {uniqueCategories.slice(1).map((c) => (
                  <button
                    key={c}
                    className={`chip ${cat === c ? "is-active" : ""}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="widget">
              <h4 className="widget__title">Saved</h4>
              <SavedList />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ——— Saved (localStorage) ——— */
function SavedList() {
  const saved = JSON.parse(localStorage.getItem("saved_posts") || "[]");
  if (!saved.length) return <p className="muted">You haven’t saved any posts yet.</p>;
  return (
    <ul className="trend">
      {saved.map((slug) => (
        <li key={slug}>
          <Link to={`/blog/${slug}`}>{slug.replace(/-/g, " ")}</Link>
        </li>
      ))}
    </ul>
  );
}
