// src/pages/ContactPage.jsx
import React, { useMemo, useState } from "react";
import {
  FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiAlertCircle, FiCheckCircle, FiCopy,
} from "react-icons/fi";

/** Small helpers */
const encode = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {}
      }}
      title="Copy to clipboard"
      className="inline-flex items-center gap-1 rounded-md border border-slate-300/60 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
    >
      <FiCopy /> {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", department: "General",
    message: "", consent: false,
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle | sending | ok | error

  const canSubmit =
    form.name.trim() &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.message.trim().length >= 10 &&
    form.consent;

  const departments = ["General", "Appointments", "Emergency", "Billing", "Careers"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus({ state: "sending", msg: "" });

    // 1) Try POST to your API (adjust endpoint if you have one)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ ...form, formName: "contact" }),
      });
      if (res.ok) {
        setStatus({ state: "ok", msg: "Thanks! We’ll get back to you shortly." });
        setForm({ name: "", email: "", phone: "", subject: "", department: "General", message: "", consent: false });
        return;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch {
      // 2) Fallback to mailto: if API not configured
      const subject = `[${form.department}] ${form.subject || "New message"} — ${form.name}`;
      const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nDepartment: ${form.department}\n\n${form.message}`;
      window.location.href = `mailto:info@ljhospital.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ state: "ok", msg: "Opening your email client…" });
    }
  };

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      name: "LJ Hospital",
      url: window.location.origin + "/contact",
      logo: window.location.origin + "/clinic-logo.png",
      telephone: "+94 11 123 4567",
      address: {
        "@type": "PostalAddress",
        streetAddress: "21 Wellness Avenue",
        addressLocality: "Colombo",
        addressRegion: "Western",
        addressCountry: "LK",
      },
      openingHours: ["Mo-Fr 08:00-19:00", "Sa 09:00-20:00", "Su 10:00-21:00"],
    }),
    []
  );

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white text-slate-800">
      {/* Decorative background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
      </div>

      {/* JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              How can we help?
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
              Contact <span className="text-blue-700">LJ Hospital</span>
            </h1>
            <p className="mt-4 text-slate-600">
              We’re here for appointments, general questions, and support. For emergencies, call{" "}
              <span className="font-semibold text-blue-700">1990</span> immediately.
            </p>

            {/* Quick cards */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <QuickCard
                icon={<FiPhone className="h-5 w-5" />}
                title="Call Us"
                value="+94 11 123 4567"
                href="tel:+94111234567"
                badge="24/7 for emergency"
              />
              <QuickCard
                icon={<FiMail className="h-5 w-5" />}
                title="Email"
                value="info@ljhospital.lk"
                href="mailto:info@ljhospital.lk"
                badge="Replies within 1 business day"
              />
            </div>
          </div>

          {/* Address & Hours mini-card */}
          <div className="w-full max-w-md rounded-2xl border border-blue-100 bg-white/70 p-5 shadow-lg backdrop-blur">
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold">
              <FiMapPin className="text-blue-600" /> Visit us
            </h3>
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                21 Wellness Avenue, Colombo <CopyBtn text="21 Wellness Avenue, Colombo" />
              </p>
              <p className="flex items-center gap-2">
                <FiClock className="text-blue-600" /> Mon–Fri 8.00–7.00 pm • Sat 9.00–8.00 pm • Sun 10.00–9.00 pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 md:grid-cols-5">
          {/* FORM */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-xl">
              <h2 className="mb-1 text-2xl font-bold text-slate-900">Send us a message</h2>
              <p className="mb-6 text-sm text-slate-600">
                Fill in the form and our team will get back to you. Required fields are marked with *
              </p>

              {status.state === "ok" && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700">
                  <FiCheckCircle /> {status.msg || "Message sent successfully."}
                </div>
              )}
              {status.state === "error" && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-rose-700">
                  <FiAlertCircle /> {status.msg || "Something went wrong. Please try again."}
                </div>
              )}

              <form onSubmit={submit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700">Full name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+94 …"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Department</label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    minLength={10}
                    required
                    rows={6}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please include any relevant details…"
                  />
                  <div className="mt-1 text-right text-xs text-slate-500">
                    {form.message.length} / 1500
                  </div>
                </div>

                <label className="sm:col-span-2 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={form.consent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  I agree to the processing of my information in line with the{" "}
                  <a className="ml-1 underline decoration-dotted" href="/privacy" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>.
                </label>

                <div className="sm:col-span-2 mt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={!canSubmit || status.state === "sending"}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
                  >
                    {status.state === "sending" ? (
                      <>
                        <svg className="-ml-0.5 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" d="M4 12a8 8 0 018-8v4" fill="currentColor" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend /> Send message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500">We typically reply within 1 business day.</p>
                </div>
              </form>
            </div>
          </div>

          {/* SIDEBAR: Direct contacts & hours */}
          <aside className="md:col-span-2 space-y-6">
            <Card title="Direct Contacts" description="Reach the right team faster.">
              <DirectRow icon={<FiPhone />} label="Appointments" value="+94 11 123 4567" href="tel:+94111234567" />
              <DirectRow icon={<FiPhone />} label="Emergency" value="1990" href="tel:1990" />
              <DirectRow icon={<FiMail />} label="Billing" value="billing@ljhospital.lk" href="mailto:billing@ljhospital.lk" />
            </Card>

            <Card title="Opening Hours" description="Walk-ins are welcome.">
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between"><span>Mon – Fri</span><b>8.00 – 7.00 pm</b></li>
                <li className="flex justify-between"><span>Saturday</span><b>9.00 – 8.00 pm</b></li>
                <li className="flex justify-between"><span>Sunday</span><b>10.00 – 9.00 pm</b></li>
              </ul>
            </Card>

            <Card title="Find Us" description="Parking available on site.">
              <div className="overflow-hidden rounded-lg border">
                {/* Google Maps embed (no API key needed for place query) */}
                <iframe
                  title="LJ Hospital Map"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-56 w-full grayscale-[30%] contrast-[105%] saturate-[105%]"
                  src="https://www.google.com/maps?q=Colombo%20Sri%20Lanka&output=embed"
                />
              </div>
              <a
                href="https://maps.google.com/?q=21%20Wellness%20Avenue%2C%20Colombo"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
              >
                <FiMapPin /> Open in Google Maps
              </a>
            </Card>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-blue-100/60 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
            Quick answers about appointments, referrals, insurance and online reports.
          </p>

          <div className="mx-auto mt-8 grid max-w-4xl gap-3">
            <Accordion q="Do I need a referral to see a specialist?">
              Referrals are not required for most departments, but your insurer may request one. Call our helpdesk to confirm.
            </Accordion>
            <Accordion q="Can I reschedule my appointment online?">
              Yes—use the confirmation link in your email or call our front desk. Same-day rescheduling depends on availability.
            </Accordion>
            <Accordion q="Do you accept my insurance?">
              We work with major insurers. Bring your card and ID; our billing team will handle the rest.
            </Accordion>
            <Accordion q="How can I access my test results?">
              You’ll receive an SMS/email with a secure link. You can also request printed copies at the reception.
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Smaller building blocks ---------- */

function QuickCard({ icon, title, value, href, badge }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-blue-100 bg-white/70 p-4 shadow transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
    >
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-blue-700 group-hover:underline">{value}</div>
        {badge && <div className="text-xs text-slate-500">{badge}</div>}
      </div>
    </a>
  );
}

function Card({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <span className="h-2 w-2 rounded-full bg-blue-600" /> {title}
      </h3>
      {description && <p className="mt-1 text-sm text-slate-600">{description}</p>}
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function DirectRow({ icon, label, value, href }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-700">
        <span className="text-blue-700">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <a href={href} className="text-sm font-semibold text-blue-700 hover:underline">
        {value}
      </a>
    </div>
  );
}

function Accordion({ q, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-white">
      <button
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900">{q}</span>
        <span
          className={`grid h-7 w-7 place-items-center rounded-full border border-slate-300 text-slate-600 transition ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`px-4 pb-4 text-slate-600 transition-[max-height] duration-300 ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
