import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#09090B] border-t border-zinc-900/80 pt-20 pb-8 antialiased">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          
          {/* Brand/Logo Column */}
          <div className="flex flex-col space-y-4">
            <img
              src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
              alt="Tesla Stock SpaceX"
              className="h-4 w-auto self-start brightness-95 object-contain"
            />
            <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-sm">
              Tesla Stock SpaceX is a worldwide enterprise delivering premium logistic frameworks. We maintain integrated operations across more than 15 global territories alongside a custom network of international strategic partners.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-zinc-200 text-xs font-medium uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">Home</Link></li>
              <li><Link to="/about" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/faq" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">FAQs</Link></li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-zinc-200 text-xs font-medium uppercase tracking-wider mb-4">Our Solutions</h3>
            <ul className="space-y-2.5">
              <li><Link to="/air-freight" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">Air Freight Forwarding</Link></li>
              <li><Link to="/road-freight" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">Road Freight Forwarding</Link></li>
              <li><Link to="/ocean-freight" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">Ocean Freight Forwarding</Link></li>
              <li><Link to="/warehouse" className="text-zinc-500 hover:text-white text-xs font-light transition-colors duration-200">Warehousing & Storage</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-zinc-200 text-xs font-medium uppercase tracking-wider mb-4">Contact</h3>
            <a 
              href="mailto:support@teslastockspacex.com" 
              className="text-zinc-500 hover:text-white group flex items-center gap-2 text-xs font-light transition-colors duration-200 break-all"
            >
              <svg className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@teslastockspacex.com
            </a>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="text-center text-zinc-600 text-[11px] font-light tracking-wide pt-8 border-t border-zinc-900/60">
          &copy; {new Date().getFullYear()} Tesla Stock SpaceX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;