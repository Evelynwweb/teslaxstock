import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#09090B]/70 backdrop-blur-md border-b border-zinc-900/60 transition-all duration-300 antialiased">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo - Tuned for balanced luxury scale */}
          <Link to="/" className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80">
            <img
              src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
              alt="Tesla Stock SpaceX"
              className="h-4 md:h-5 w-auto brightness-95 object-contain"
            />
          </Link>

          {/* Desktop Navigation - Smaller, sharp modern typography */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link to="/" className="text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-medium tracking-wide">Home</Link>
            <Link to="/about" className="text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-medium tracking-wide">About</Link>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="text-zinc-300 hover:text-white transition-colors duration-200 flex items-center gap-1 text-xs font-medium tracking-wide focus:outline-none">
                Our Solutions
                <svg className="w-3.5 h-3.5 opacity-70 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Premium Floating Context Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-[#141417] border border-zinc-800/80 rounded-xl shadow-xl opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                <div className="py-1.5 p-1">
                  <Link to="/air-freight" className="block px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg text-xs transition-colors duration-150">Air Freight Forwarding</Link>
                  <Link to="/road-freight" className="block px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg text-xs transition-colors duration-150">Road Freight Forwarding</Link>
                  <Link to="/ocean-freight" className="block px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg text-xs transition-colors duration-150">Ocean Freight Forwarding</Link>
                  <Link to="/warehouse" className="block px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg text-xs transition-colors duration-150">Warehouse And Storage</Link>
                </div>
              </div>
            </div>

            <Link to="/faq" className="text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-medium tracking-wide">FAQ</Link>
            <Link to="/contact" className="text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-medium tracking-wide">Contact</Link>
            <Link to="/tracking" className="text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-medium tracking-wide">Tracking</Link>
          </nav>

          {/* Desktop Call To Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/tracking" className="px-4 py-2 bg-transparent border border-zinc-800 text-zinc-200 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs font-medium">
              Track Order
            </Link>
            <a href="https://user.spacexnova.com/" className="px-4 py-2 bg-[#2563EB] text-white rounded-full hover:bg-blue-500 transition-all duration-300 text-xs font-medium shadow-sm shadow-blue-600/10">
              Login
            </a>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            className="lg:hidden p-1.5 text-zinc-400 hover:text-white focus:outline-none rounded-lg hover:bg-zinc-900/50 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-900/80 animate-fadeInUp">
            <div className="flex flex-col space-y-3 px-1">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xs font-medium py-1 transition-colors">Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xs font-medium py-1 transition-colors">About</Link>
              
              <button
                onClick={() => setSolutionsDropdown(!solutionsDropdown)}
                className="text-zinc-300 hover:text-white flex items-center justify-between text-xs font-medium py-1 text-left focus:outline-none"
              >
                <span>Our Solutions</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {solutionsDropdown && (
                <div className="pl-3 py-1 flex flex-col space-y-2.5 border-l border-zinc-900">
                  <Link to="/air-freight" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white text-xs font-light transition-colors">Air Freight Forwarding</Link>
                  <Link to="/road-freight" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white text-xs font-light transition-colors">Road Freight Forwarding</Link>
                  <Link to="/ocean-freight" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white text-xs font-light transition-colors">Ocean Freight Forwarding</Link>
                  <Link to="/warehouse" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white text-xs font-light transition-colors">Warehouse And Storage</Link>
                </div>
              )}
              
              <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xs font-medium py-1 transition-colors">FAQ</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xs font-medium py-1 transition-colors">Contact</Link>
              <Link to="/tracking" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 hover:text-white text-xs font-medium py-1 transition-colors">Tracking</Link>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-900/60">
                <Link to="/tracking" onClick={() => setMobileMenuOpen(false)} className="w-full py-2 border border-zinc-800 rounded-full text-zinc-200 text-center hover:bg-white hover:text-black transition duration-300 text-xs font-medium">
                  Track Order
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-2 bg-white text-black rounded-full text-center hover:bg-zinc-200 transition duration-300 text-xs font-medium">
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;