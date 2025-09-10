import React, { useEffect, useMemo, useState } from "react";
import "./Products.css"; // animations & small helpers

// ------- Demo data (swap with your API later) -------
const PRODUCTS = [
  {
    id: "recovery-cream",
    name: "Recovery Cream",
    price: 49,
    cover: "/tt.jpg",
    images: ["/tt.jpg", "/zz.jpg", "/tt.png"],
    description:
      "A soothing post-procedure cream enriched with ceramides and panthenol to calm redness, reinforce the skin barrier, and lock in hydration.",
  },
  {
    id: "spf-shield",
    name: "SPF 50+ Shield",
    price: 29,
    cover: "/zz.jpg",
    images: ["/zz.jpg", "/slider-image-3.jpg", "/tt.jpg"],
    description:
      "Broad-spectrum UVA/UVB protection with non-greasy finish. Ideal for sensitive and post-treatment skin.",
  },
  {
    id: "vitamin-c",
    name: "Vitamin C Serum 15%",
    price: 59,
    cover: "/tt.png",
    images: ["/tt.png", "/tt.jpg", "/zz.jpg"],
    description:
      "Stabilized L-ascorbic acid brightens, fights free radicals, and supports collagen for a more even, radiant complexion.",
  },
  {
    id: "gentle-cleanser",
    name: "Gentle Cleanser",
    price: 19,
    cover: "/slider-image-3.jpg",
    images: ["/slider-image-3.jpg", "/tt.jpg"],
    description:
      "pH-balanced, sulfate-free cleanser that removes impurities without stripping moisture. Great for daily use.",
  },
  {
    id: "hyaluronic-boost",
    name: "Hyaluronic Boost",
    price: 39,
    cover: "/tt.jpg",
    images: ["/tt.jpg", "/zz.jpg"],
    description:
      "Multi-weight hyaluronic acid replenishes hydration across layers for plumper, smoother-looking skin.",
  },
  {
    id: "retinol-refine",
    name: "Retinol Refine 0.3%",
    price: 54,
    cover: "/zz.jpg",
    images: ["/zz.jpg", "/tt.png"],
    description:
      "Encapsulated retinol improves texture and tone while minimizing irritation. Use at night with SPF by day.",
  },
];

// ------- Reusable UI -------
const Price = ({ value }) => (
  <span className="inline-flex items-baseline gap-1">
    <span className="text-slate-400 text-xs">$</span>
    <span className="font-extrabold tracking-tight">{value}</span>
  </span>
);

// ------- Card -------
function ProductCard({ product, onView }) {
  const { name, price, cover } = product;
  return (
    <div className="prod-card group">
      <div className="relative overflow-hidden rounded-2xl">
        <img src={cover} alt={name} className="prod-card__img" />
        <div className="prod-card__fade" />
      </div>

      <div className="p-3">
        <div className="font-extrabold text-slate-900">{name}</div>
        <div className="mt-1 text-sky-600">
          <Price value={price} />
        </div>

        <button
          className="prod-btn mt-3"
          onClick={() => onView(product)}
          aria-label={`View more about ${name}`}
        >
          View More
        </button>
      </div>
    </div>
  );
}

// ------- Modal -------
function ProductModal({ product, onClose }) {
  const [index, setIndex] = useState(0);
  const imgs = product?.images ?? [];
  const canPrev = index > 0;
  const canNext = index < imgs.length - 1;

  // lock body scroll and keyboard handlers
  useEffect(() => {
    if (!product) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && canNext) setIndex((i) => i + 1);
      if (e.key === "ArrowLeft" && canPrev) setIndex((i) => i - 1);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [product, canNext, canPrev, onClose]);

  if (!product) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        <div className="modal-panel">
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close product details"
          >
            ✕
          </button>

          <div className="grid lg:grid-cols-2 gap-5">
            {/* media */}
            <div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={imgs[index]}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {imgs.length > 1 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {imgs.map((src, i) => (
                    <button
                      key={src + i}
                      onClick={() => setIndex(i)}
                      className={`thumb ${i === index ? "thumb--active" : ""}`}
                      aria-label={`Show image ${i + 1}`}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* text */}
            <div>
              <h3 className="text-2xl font-black leading-tight">{product.name}</h3>
              <div className="text-sky-600 text-lg mt-1">
                <Price value={product.price} />
              </div>

              <p className="text-slate-600 mt-4">{product.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="cta-primary">Add to Cart</button>
                <button className="cta-ghost" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Prev/Next if multiple images */}
          {imgs.length > 1 && (
            <div className="nav-arrows">
              <button
                className="nav-arrow"
                onClick={() => canPrev && setIndex((i) => i - 1)}
                disabled={!canPrev}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                className="nav-arrow"
                onClick={() => canNext && setIndex((i) => i + 1)}
                disabled={!canNext}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ------- Page -------
export default function Products() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        String(p.price).includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* header & search */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight">
            Clinic-Approved Skincare
          </h1>
          <p className="text-slate-600">
            Curated products to support results between visits.
          </p>
        </div>
        <div className="relative">
          <input
            className="search"
            placeholder="Search products…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* grid */}
      <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onView={setActive} />
        ))}
      </div>

      {/* modal */}
      <ProductModal product={active} onClose={() => setActive(null)} />
    </div>
  );
}
