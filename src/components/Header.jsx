import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative h-[88vh] min-h-[560px] overflow-hidden">
      {/* Background */}
      <img
        src="/slider-image-3.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Top-to-right dim */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/30 to-transparent" />
      {/* Bottom teal tint like screenshot */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-teal-200/60 to-transparent mix-blend-multiply" />

      {/* Content */}
      <div className="relative max-w-6xl mx-auto h-full px-4">
        <div className="flex flex-col justify-center h-full">
          <p className="text-[11px] md:text-xs font-extrabold tracking-[0.35em] text-white/80">
            SAFE & CERTIFIED TREATMENTS
          </p>
          <h1 className="mt-3 text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Surgical Retouching
          </h1>

          {/* Lower-left text + down indicator */}
          <div className="mt-10 max-w-md text-white/90">
            <p className="text-sm leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-white/90">
              <span className="w-10 h-10 rounded-full border border-white/70 grid place-items-center">
                ↓
              </span>
              <span className="text-xs tracking-widest">SCROLL</span>
            </div>
          </div>

          {/* Social (bottom-right) */}
          <div className="absolute right-6 bottom-6 hidden md:flex items-center gap-5 text-white/80 text-[11px] tracking-widest">
            <a href="#" className="hover:text-white">FB</a>
            <a href="#" className="hover:text-white">IG</a>
            <a href="#" className="hover:text-white">YT</a>
          </div>
        </div>
      </div>

      {/* Optional CTA chip like the original */}
      <div className="absolute top-[110px] right-[calc(50%-36rem)] hidden xl:block">
        <Link
          to="/contact"
          className="px-5 py-2 rounded-xl bg-teal-400 text-white font-bold shadow hover:brightness-105"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
