import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#09090B] border-t border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
              alt="Tesla Stock SpaceX"
              className="h-8 mb-4"
            />
            <p className="text-gray-500 text-sm">
              Tesla Stock SpaceX is a Worldwide Global delivering logistics company. We have offices in more than 15 countries and an international network of partners and agents.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Our Solutions</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="/air-freight" className="hover:text-white transition">Air Freight Forwarding</Link></li>
              <li><Link to="/road-freight" className="hover:text-white transition">Road Freight Forwarding</Link></li>
              <li><Link to="/ocean-freight" className="hover:text-white transition">Ocean Freight Forwarding</Link></li>
              <li><Link to="/warehouse" className="hover:text-white transition">Warehousing & Storage</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <a href="mailto:support@teslastockspacex.com" className="text-gray-500 hover:text-white transition flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@teslastockspacex.com
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;