import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
              alt="Tesla Stock SpaceX"
              className="h-2 md:h-3 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-300 transition text-sm">Home</Link>
            <Link to="/about" className="text-white hover:text-gray-300 transition text-sm">About</Link>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition flex items-center gap-1 text-sm">
                Our Solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-[#18181B] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/air-freight" className="block px-4 py-2 text-gray-300 hover:bg-[#27272A] hover:text-white text-sm">Air Freight Forwarding</Link>
                  <Link to="/road-freight" className="block px-4 py-2 text-gray-300 hover:bg-[#27272A] hover:text-white text-sm">Road Freight Forwarding</Link>
                  <Link to="/ocean-freight" className="block px-4 py-2 text-gray-300 hover:bg-[#27272A] hover:text-white text-sm">Ocean Freight Forwarding</Link>
                  <Link to="/warehouse" className="block px-4 py-2 text-gray-300 hover:bg-[#27272A] hover:text-white text-sm">Warehouse And Storage</Link>
                </div>
              </div>
            </div>

            <Link to="/faq" className="text-white hover:text-gray-300 transition text-sm">FAQ</Link>
            <Link to="/contact" className="text-white hover:text-gray-300 transition text-sm">Contact</Link>
            <Link to="/tracking" className="text-white hover:text-gray-300 transition text-sm">Tracking</Link>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/tracking" className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition text-sm">
              Track Order
            </Link>
            <Link to="/login" className="px-4 py-2 bg-[#3B82F6] text-white rounded-full hover:bg-gray-200 transition text-sm">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-white hover:text-gray-300 transition text-sm">Home</Link>
              <Link to="/about" className="text-white hover:text-gray-300 transition text-sm">About</Link>
              <button
                onClick={() => setSolutionsDropdown(!solutionsDropdown)}
                className="text-white hover:text-gray-300 transition flex items-center justify-between text-sm"
              >
                Our Solutions
                <svg className={`w-4 h-4 transition-transform ${solutionsDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {solutionsDropdown && (
                <div className="pl-4 flex flex-col space-y-2">
                  <Link to="/air-freight" className="text-gray-300 hover:text-white text-sm">Air Freight Forwarding</Link>
                  <Link to="/road-freight" className="text-gray-300 hover:text-white text-sm">Road Freight Forwarding</Link>
                  <Link to="/ocean-freight" className="text-gray-300 hover:text-white text-sm">Ocean Freight Forwarding</Link>
                  <Link to="/warehouse" className="text-gray-300 hover:text-white text-sm">Warehouse And Storage</Link>
                </div>
              )}
              <Link to="/faq" className="text-white hover:text-gray-300 transition text-sm">FAQ</Link>
              <Link to="/contact" className="text-white hover:text-gray-300 transition text-sm">Contact</Link>
              <Link to="/tracking" className="text-white hover:text-gray-300 transition text-sm">Tracking</Link>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/tracking" className="px-4 py-2 border border-white rounded-full text-white text-center hover:bg-white hover:text-black transition text-sm">
                  Track Order
                </Link>
                <Link to="/login" className="px-4 py-2 bg-white text-black rounded-full text-center hover:bg-gray-200 transition text-sm">
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