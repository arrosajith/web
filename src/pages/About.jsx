import React, { useEffect, useMemo, useRef, useState } from "react";
import "./About.css";

export default function About() {
  // ---------- Gallery (lightbox) ----------
  const gallery = useMemo(
    () => [
      { src: "/tt.jpg", alt: "Clinic lobby" },
      { src: "/tt.png", alt: "Treatment room" },
      { src: "/zz.jpg", alt: "Laser suite" },
      { src: "/slider-image-3.jpg", alt: "Operation theatre" },
      { src: "/tt.jpg", alt: "Recovery lounge" },
      { src: "/zz.jpg", alt: "Pharmacy counter" },
    ],
    []
  );
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const onOpen = (i) => setLightbox({ open: true, index: i });
  const onClose = () => setLightbox({ open: false, index: 0 });
  const onNext = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % gallery.length }));
  const onPrev = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + gallery.length) % gallery.length }));

  // keyboard for lightbox
  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox.open]);

  // ---------- KPI counters ----------
  const countersRef = useRef(null);
  const [counts, setCounts] = useState({
    years: 0,
    specialists: 0,
    procedures: 0,
    satisfaction: 0,
  });
  useEffect(() => {
    const target = { years: 10, specialists: 25, procedures: 15000, satisfaction: 98 };
    let started = false;
    const el = countersRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          started = true;
          const start = performance.now();
          const dur = 1200;
          const tick = (t) => {
            const k = Math.min(1, (t - start) / dur);
            setCounts({
              years: Math.round(target.years * k),
              specialists: Math.round(target.specialists * k),
              procedures: Math.round(target.procedures * k),
              satisfaction: Math.round(target.satisfaction * k),
            });
            if (k < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ---------- Testimonials slider ----------
  const testimonials = [
    { q: "Excellent care and friendly staff. I felt safe.", name: "N.N.", stars: 5 },
    { q: "Clean facility and very professional doctors.", name: "K.S.", stars: 5 },
    { q: "Smooth recovery and great follow-up.", name: "R.D.", stars: 4 },
  ];
  const [tix, setTix] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTix((i) => (i + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="about">
      {/* ================= Hero Video (behind) + overlay text ================= */}
      <section className="about-hero">
        <video
          className="about-hero__video"
          autoPlay
          loop
          muted
          playsInline
          poster="/slider-image-3.jpg"
        >
          {/* Add these files into /public/videos/ if available */}
          <source src="/videos/clinic-hero.webm" type="video/webm" />
          <source src="/videos/clinic-hero.mp4" type="video/mp4" />
        </video>
        <div className="about-hero__shade" />
        <div className="container about-hero__content">
          <p className="eyebrow">SAFE & CERTIFIED AESTHETIC CARE</p>
          <h1 className="display">About LJ Cosmetic</h1>
          <p className="lead">
            We provide evidence-based cosmetic treatments with compassionate care, modern
            equipment, and strict safety protocols.
          </p>
          <div className="btn-row">
            <a className="btn btn--primary" href="/contact">Book Appointment</a>
            <a className="btn btn--ghost" href="#facilities">See Facilities</a>
          </div>
        </div>
      </section>

      {/* ================= Intro + Floating Video (video in front of text) ================= */}
      <section className="container about-intro" id="intro">
        <div className="intro__text">
          <h2 className="h2">Who we are</h2>
          <p>
            LJ Cosmetic is a patient-first clinic delivering surgical and non-surgical
            enhancements. Our mission is to combine artistry with medical precision while
            keeping your safety, privacy, and comfort at the core.
          </p>
          <ul className="ticks">
            <li>Experienced board-certified specialists</li>
            <li>ISO-aligned sterilization & quality controls</li>
            <li>Transparent pricing & tailored treatment plans</li>
            <li>Dedicated after-care and follow-ups</li>
          </ul>
        </div>
        <div className="intro__float">
          <div className="float-card">
            <video className="float-card__video" autoPlay loop muted playsInline poster="/tt.jpg">
              <source src="/videos/inside-tour.webm" type="video/webm" />
              <source src="/videos/inside-tour.mp4" type="video/mp4" />
            </video>
            <div className="float-card__badge">Clinic Walkthrough</div>
          </div>
        </div>
      </section>

      {/* ================= Facilities Grid ================= */}
      <section className="container about-facilities" id="facilities">
        <div className="sec-head">
          <h2 className="h2">Clinic Facilities</h2>
          <p className="muted">Modern spaces designed for safety, comfort, and precision.</p>
        </div>
        <div className="grid">
          {FACILITIES.map((f) => (
            <article key={f.title} className="facility">
              <img className="facility__img" src={f.img} alt={f.title} />
              <div className="facility__body">
                <h3 className="h4">{f.title}</h3>
                <p className="muted">{f.text}</p>
                <a href="#gallery" className="micro">View more →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= Stats / KPIs ================= */}
      <section className="about-stats" ref={countersRef} aria-label="Fast facts">
        <div className="container stats-grid">
          <Stat number={counts.years} after="+ Years" label="Experience" />
          <Stat number={counts.specialists} after="+ Specialists" label="Team" />
          <Stat number={counts.procedures} after="+ Procedures" label="Completed" />
          <Stat number={counts.satisfaction} after="%+" label="Satisfaction" />
        </div>
      </section>

      {/* ================= Gallery + Lightbox ================= */}
      <section className="container about-gallery" id="gallery">
        <div className="sec-head">
          <h2 className="h2">Clinic Image Gallery</h2>
          <p className="muted">A peek inside our spaces and equipment.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((g, i) => (
            <button
              key={i}
              className="thumb"
              onClick={() => onOpen(i)}
              aria-label={`Open ${g.alt}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" />
            </button>
          ))}
        </div>

        {lightbox.open && (
          <div className="lightbox" role="dialog" aria-modal="true">
            <button className="lightbox__close" onClick={onClose} aria-label="Close">×</button>
            <button className="lightbox__nav prev" onClick={onPrev} aria-label="Previous">‹</button>
            <img
              className="lightbox__img"
              src={gallery[lightbox.index].src}
              alt={gallery[lightbox.index].alt}
            />
            <button className="lightbox__nav next" onClick={onNext} aria-label="Next">›</button>
          </div>
        )}
      </section>

      {/* ================= Team Preview ================= */}
      <section className="container about-team">
        <div className="sec-head">
          <h2 className="h2">Our Specialists</h2>
          <p className="muted">Skilled practitioners focused on safe outcomes.</p>
        </div>
        <div className="team-grid">
          {TEAM.map((t) => (
            <article key={t.name} className="team-card">
              <img className="team-card__img" src={t.img} alt={t.name} loading="lazy" />
              <div className="team-card__body">
                <div className="team-card__name">{t.name}</div>
                <div className="team-card__role">{t.role}</div>
                <div className="team-card__meta">{t.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= Testimonials ================= */}
      <section className="about-testimonials" aria-label="Testimonials">
        <div className="container t-wrap">
          <div className="t-slider" style={{ transform: `translateX(-${tix * 100}%)` }}>
            {testimonials.map((q, i) => (
              <figure className="t-card" key={i}>
                <div className="stars" aria-hidden="true">
                  {"★".repeat(q.stars)}
                  {"☆".repeat(5 - q.stars)}
                </div>
                <blockquote>“{q.q}”</blockquote>
                <figcaption>— {q.name}</figcaption>
              </figure>
            ))}
          </div>
          <div className="t-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTix(i)}
                className={"dot" + (tix === i ? " is-active" : "")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= Safety Checklist ================= */}
      <section className="container about-safety">
        <div className="sec-head">
          <h2 className="h2">Safety & Sterilization</h2>
          <p className="muted">Strict protocols for your wellbeing.</p>
        </div>
        <ul className="checks">
          <li>IEC-grade sterilization and single-use needles</li>
          <li>HEPA filtration and controlled environments</li>
          <li>Pre-procedure consent and risk counselling</li>
          <li>Post-procedure after-care & 24/7 hotline</li>
        </ul>
        <div className="btn-row">
          <a className="btn btn--dark" href="/brochures/ljcosmetic-about.pdf" download>
            Download Safety Protocols (PDF)
          </a>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="container about-faq">
        <div className="sec-head">
          <h2 className="h2">FAQs</h2>
          <p className="muted">Quick answers to common questions.</p>
        </div>
        <div className="faq">
          {FAQS.map((f, i) => <Accordion key={i} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ================= Map + Hours ================= */}
      <section className="about-map">
        <div className="container map-grid">
          <div className="map-card">
            {/* You can replace with a real embed later */}
            <div className="map-placeholder">
              <img src="/zz.jpg" alt="Map placeholder" />
            </div>
            <div className="map-meta">
              <div><strong>Address:</strong> Rathnapura, Sri Lanka</div>
              <div><strong>Hotline:</strong> +94 XX XXX XXXX</div>
              <div className="btn-row">
                <a className="btn btn--ghost" href="/contact">Get Directions</a>
                <a className="btn btn--primary" href="/contact">Book Now</a>
              </div>
            </div>
          </div>
          <div className="hours-card">
            <h3 className="h3">Opening Hours</h3>
            <table className="hours">
              <tbody>
                {HOURS.map((h) => (
                  <tr key={h.d}>
                    <td>{h.d}</td>
                    <td>{h.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted s-note">* EMERGENCY support available 24/7.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- Small subcomponents/data (same file) ---------------- */
function Stat({ number, after, label }) {
  return (
    <div className="stat">
      <div className="stat__num">
        {number.toLocaleString()}
        <span className="stat__after">{after}</span>
      </div>
      <div className="stat__lbl">{label}</div>
    </div>
  );
}

function Accordion({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <details className={"acc" + (open ? " is-open" : "")} open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>{q}</summary>
      <div className="acc__body">{a}</div>
    </details>
  );
}

/* ---- Data ---- */
const FACILITIES = [
  { title: "OPD & Specialist Clinics", img: "/tt.jpg", text: "Daily OPD with specialists across key disciplines." },
  { title: "Laser & Aesthetic Suite", img: "/tt.png", text: "FDA-grade devices for safe cosmetic procedures." },
  { title: "Minor / Day Surgery", img: "/zz.jpg", text: "Modern theatres with strict aseptic techniques." },
  { title: "Recovery Rooms", img: "/slider-image-3.jpg", text: "Comfortable monitored recovery & observation." },
  { title: "Laboratory & Imaging", img: "/tt.jpg", text: "On-site diagnostics for quick, accurate results." },
  { title: "Pharmacy & After-care", img: "/zz.jpg", text: "Genuine medications and dedicated counselling." },
];

const TEAM = [
  { name: "Dr. A. Perera", role: "Consultant Plastic Surgeon", meta: "MBBS, MS, FRCS", img: "/tt.jpg" },
  { name: "Dr. I. Fernando", role: "Dermatologist", meta: "MBBS, MD (Derm)", img: "/tt.png" },
  { name: "Nurse Sanduni", role: "OT / Recovery Lead", meta: "B.Sc. Nursing", img: "/zz.jpg" },
];

const FAQS = [
  { q: "Procedure durations & recovery?", a: "Most minor aesthetic procedures take 30–90 minutes. Recovery can vary from same-day to 7–14 days depending on the treatment." },
  { q: "How do you ensure safety?", a: "We follow ISO-aligned sterilization, use single-use consumables where applicable, and run checklists before every procedure." },
  { q: "What payments do you accept?", a: "Cash, cards, and installment plans via partner gateways. Full invoices are provided with each visit." },
  { q: "Is consultation mandatory?", a: "Yes. We evaluate medical history and expectations to propose a tailored plan and consent." },
];

const HOURS = [
  { d: "Mon – Fri", t: "08:00 – 20:00" },
  { d: "Saturday", t: "09:00 – 18:00" },
  { d: "Sunday", t: "10:00 – 16:00" },
];
