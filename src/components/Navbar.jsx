import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const MENU = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Shop", to: "/products" },
  { label: "Pages", to: "/about" },
  { label: "Blog", to: "/blog" },
  //{ label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top micro bar (location + phone) */}
      <div className="fixed top-0 inset-x-0 z-50">
        <div className="hidden md:block">
          <div className="max-w-6xl mx-auto px-4 py-2 text-[11px] tracking-widest uppercase text-white/90">
            <div className="flex items-center justify-between">
              <span>St. Lambor, New York (US)</span>
              <span>Clinic : +94 234 934 972</span>
            </div>
          </div>
        </div>

        {/* Main nav “pill” */}
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`mt-3 md:mt-4 rounded-2xl border ${
              scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white"
            }`}
          >
            <nav className="flex items-center gap-3 px-3 md:px-5 py-2">
              {/* Brand */}
              <Link
                to="/"
                className="shrink-0 inline-flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100"
                title="LJ Cosmetic"
              >
                <span className="text-[11px] font-extrabold tracking-[0.35em] text-sky-700">
                  LJ
                </span>
                <span className="font-extrabold tracking-wide text-slate-900">
                  Cosmetic
                </span>
              </Link>

              {/* Desktop menu */}
              <div className="hidden lg:flex items-center gap-1 mx-auto">
                {MENU.map((m) => (
                  <NavLink
                    key={m.to}
                    to={m.to}
                    end={m.to === "/"}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-xl text-sm font-semibold ${
                        isActive
                          ? "text-white bg-slate-900"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {m.label}
                  </NavLink>
                ))}
              </div>

              {/* Search (desktop) */}
              <div className="hidden md:flex items-center ms-auto lg:ms-0">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="relative"
                  role="search"
                >
                  <input
                    type="search"
                    placeholder="Search…"
                    className="w-40 lg:w-56 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 ring-sky-200"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    ⌕
                  </span>
                </form>
              </div>

              {/* Book now */}
              <Link
                to="/contact"
                className="hidden md:inline-flex ms-2 px-4 py-2 rounded-xl bg-teal-400 text-white font-bold shadow hover:brightness-105"
              >
                Book Now
              </Link>

              {/* Mobile toggles */}
              <button
                className="lg:hidden ms-auto inline-flex items-center justify-center w-10 h-10 rounded-xl border"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
              >
                ☰
              </button>
            </nav>

            {/* Mobile drawer */}
            {open && (
              <div className="lg:hidden border-t p-3 space-y-2">
                <form onSubmit={(e) => e.preventDefault()} role="search">
                  <input
                    type="search"
                    placeholder="Search…"
                    className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 ring-sky-200"
                  />
                </form>
                <div className="grid gap-1">
                  {MENU.map((m) => (
                    <NavLink
                      key={m.to}
                      to={m.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-lg text-sm font-semibold ${
                          isActive
                            ? "bg-slate-900 text-white"
                            : "hover:bg-slate-100 text-slate-800"
                        }`
                      }
                    >
                      {m.label}
                    </NavLink>
                  ))}
                </div>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center px-4 py-2 rounded-xl bg-teal-400 text-white font-bold"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
