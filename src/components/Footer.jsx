import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();

  const links = [
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/support", label: "Support & Downloads" },
    { href: "/careers", label: "Careers" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ];

  const services = [
    { href: "/doctors", label: "Find a Doctor" },
    { href: "/departments", label: "Departments" },
    { href: "/timetable", label: "Doctors Timetable" },
    { href: "/emergency", label: "Emergency Care" },
    { href: "/insurance", label: "Insurance Partners" },
    { href: "/appointments", label: "Book an Appointment" },
  ];

  const submitNewsletter = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // plug your API call here
    alert(`Thanks! We’ll keep you posted at: ${email}`);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-200">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-white/5 via-white/20 to-white/5" />
      </div>

      <div
        className="relative mx-auto max-w-7xl px-6 py-16"
        itemScope
        itemType="https://schema.org/MedicalOrganization"
      >
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand / Contact / Trust */}
          <section className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/clinic-logo.png"
                onError={(e) => (e.currentTarget.src = "/logo.png")}
                alt="LJ Hospital logo"
                className="h-12 w-auto"
                itemProp="logo"
              />
              <div>
                <h2 className="text-2xl font-extrabold tracking-wide" itemProp="name">
                  LJ Hospital
                </h2>
                <p className="text-xs uppercase tracking-wider text-blue-300/80">Care You Can Trust</p>
              </div>
            </div>

            <p className="max-w-sm text-slate-300" itemProp="description">
              Your trusted partner in healthcare—modern diagnostics, compassionate teams, and evidence-based care.
            </p>

            <div className="space-y-2 text-slate-300" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p className="flex items-center gap-2">
                <span role="img" aria-label="address">📍</span>
                <span>
                  <span itemProp="streetAddress">21 Wellness Avenue</span>,{" "}
                  <span itemProp="addressLocality">Colombo</span>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="phone">📞</span>
                <a href="tel:+94111234567" className="hover:text-white" itemProp="telephone">
                  +94 11 123 4567
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span role="img" aria-label="email">✉️</span>
                <a href="mailto:info@ljhospital.lk" className="hover:text-white" itemProp="email">
                  info@ljhospital.lk
                </a>
              </p>
              <p className="mt-2 rounded-lg bg-blue-600/10 px-3 py-2 text-sm text-blue-200">
                <span className="font-semibold">Emergency 24/7:</span>{" "}
                <a className="underline decoration-dotted underline-offset-2" href="tel:1990">1990</a>
              </p>
            </div>

            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <img src="/iso-9001.png" alt="ISO 9001 Certified" className="h-9 w-auto object-contain" />
              <img src="/iso-27001.png" alt="ISO 27001 Certified" className="h-9 w-auto object-contain" />
              <img src="/gdpr.png" alt="GDPR Compliant" className="h-9 w-auto object-contain" />
            </div>
          </section>

          {/* Links */}
          <nav className="md:col-span-4 grid grid-cols-2 gap-10" aria-label="Footer navigation">
            <div>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="rounded outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 border-b border-white/10 pb-2 text-lg font-semibold">Patient Services</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                {services.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="rounded outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Hours / Social / Newsletter */}
          <aside className="md:col-span-4 space-y-8">
            {/* Opening hours */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="mb-3 text-lg font-semibold">Opening Hours</h3>
              <ul className="space-y-1 text-sm text-slate-300">
                <li className="flex justify-between"><span>Mon – Fri</span><b className="text-white">8.00 – 7.00 pm</b></li>
                <li className="flex justify-between"><span>Saturday</span><b className="text-white">9.00 – 8.00 pm</b></li>
                <li className="flex justify-between"><span>Sunday</span><b className="text-white">10.00 – 9.00 pm</b></li>
              </ul>
            </div>

            {/* Newsletter */}
            <form onSubmit={submitNewsletter} className="rounded-2xl border border-white/10 bg-gradient-to-tr from-slate-900/60 to-slate-800/60 p-5">
              <h3 className="mb-2 text-lg font-semibold">Subscribe to Updates</h3>
              <p className="mb-3 text-sm text-slate-300">
                Get health tips, clinic news, and appointment openings. No spam—unsubscribe anytime.
              </p>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Join
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                By subscribing you agree to our{" "}
                <a href="/privacy" className="underline decoration-dotted underline-offset-2">Privacy Policy</a>.
              </p>
            </form>

            {/* Social */}
            <div className="text-center md:text-left">
              <h3 className="mb-3 text-lg font-semibold">Connect with us</h3>
              <div className="flex justify-center gap-4 md:justify-start">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="rounded-lg bg-white/5 p-3 text-xl text-slate-300 transition hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="rounded-lg bg-white/5 p-3 text-xl text-slate-300 transition hover:bg-sky-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="rounded-lg bg-white/5 p-3 text-xl text-slate-300 transition hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="rounded-lg bg-white/5 p-3 text-xl text-slate-300 transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row">
          <p className="select-none">
            © {year} <span className="font-semibold text-slate-200">LJ Hospital</span>. All rights reserved. Reg No: PB 11.
            <span className="hidden sm:inline"> Powered by Oganro.</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap</a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="rounded bg-white/5 px-2 py-1 text-slate-200 hover:bg-white/10"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:translate-y-[-2px] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Back to top"
        title="Back to top"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 transition-transform group-hover:-translate-y-0.5">
          <path d="M12 5l-7 7m7-7l7 7" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </footer>
  );
}
