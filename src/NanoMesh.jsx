export default function TopBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="flex items-center space-x-4">
          <img src="/clinic-logo.png" alt="LJ Hospital Logo" className="h-12" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            LJ Hospital <span className="text-blue-200">| Health Care</span>
          </h1>
        </div>

        {/* Optional: Navigation links below the logo */}
        <nav className="mt-4 space-x-4 text-sm md:text-base">
          <a href="/products" className="hover:text-blue-200">Products</a>
          <a href="/about" className="hover:text-blue-200">About</a>
          <a href="/contact" className="hover:text-blue-200">Contact</a>
          <a href="/cart" className="hover:text-blue-200">Cart</a>
        </nav>
      </div>
    </div>
  );
}
