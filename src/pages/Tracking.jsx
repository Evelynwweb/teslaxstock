import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// 🟢 REAL MAP IMPORTS (Leaflet)
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Tracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 🟢 TIMELINE HELPERS
  const getTimelineDotColor = (status) => {
    const map = {
      'Order Confirmed': 'bg-[#5F0F40] border-[#5F0F40]',
      'Picked by Courier': 'bg-[#5F0F40] border-[#5F0F40]',
      'On The Way': 'bg-[#5F0F40] border-[#5F0F40]',
      'Custom Hold': 'bg-orange-500 border-orange-500',
      'Delivered': 'bg-green-500 border-green-500'
    };
    return map[status] || 'bg-[#5F0F40] border-[#5F0F40]';
  };

  const getTimelineIcon = (status) => {
    const map = {
      'Order Confirmed': '✓',
      'Picked by Courier': '📦',
      'On The Way': '🚚',
      'Custom Hold': '⏳',
      'Delivered': '🏠'
    };
    return map[status] || '⚫';
  };

  // 🟢 HANDLE SEARCH
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await fetch(`${API_URL}/api/tracking/${trackingNumber}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Tracking number not found');
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setTrackingData(data);
    } catch (err) {
      setError(err.message || 'Error fetching tracking information');
    } finally {
      setLoading(false);
    }
  };

  // 🟢 LOAD FROM URL PARAM
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      setTrackingNumber(id);
      setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
    }
  }, []);

  return (
    <div className="bg-[#09090B] text-white font-['Poppins',sans-serif] min-h-screen">
      <Header />

      {/* 🟢 HERO SECTION (Dark Theme) */}
      <section className="relative h-[65vh] min-h-[450px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://teslastockspacex.com/wp-content/uploads/2026/01/tesla-more-detail-video-showcase-6x4-truckbed.mp4"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Track Your Tesla</h1>
          <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl">
            Follow your vehicle's journey from production to delivery
          </p>

          <div className="w-full max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center w-full p-1.5 rounded-full bg-[#3F3F46] shadow-lg"
            >
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter Tracking Number..."
                className="flex-1 px-4 py-2.5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-5 py-2 bg-[#3B82F6] text-white rounded-full hover:bg-blue-600 transition-colors flex items-center justify-center text-sm`}
              >
                {loading ? '...' : 'Track'}
              </button>
            </form>
            {error && (
              <div className="mt-3 p-2.5 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 🟢 TRACKING RESULTS — EXACT SCREENSHOT UI */}
      {trackingData && (
        <section className="py-8 px-4">
          <div className="max-w-3xl mx-auto">
            
            {/* 🔴 BACK TO HOME BUTTON */}
            <button 
              onClick={() => window.location.href = '/'}
              className="mb-4 px-4 py-2 bg-[#5F0F40] text-white rounded-lg hover:bg-[#4A0C33] transition text-sm flex items-center gap-2"
            >
              <span>←</span> Back to Home
            </button>

            {/* 🟢 MAROON TOP CARD */}
            <div className="bg-[#5F0F40] rounded-t-xl rounded-b-lg p-6 text-white mb-6 shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 0v4m0-4h4m-4 4H8m8 0v4m0 0h-4m0 0v4m0-4H8" />
                </svg>
                <span className="text-sm font-semibold">Tracking Number</span>
              </div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold">{trackingData.trackingNumber}</h2>
                <span className="px-2 py-0.5 bg-white text-[#5F0F40] text-xs font-bold rounded-full">Verified</span>
              </div>
              
              {/* Status Box */}
              <div className="mt-4 p-3 bg-white/10 rounded-lg flex items-center gap-3">
                <span className="text-sm">Current Status:</span>
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                  {trackingData.status}
                </span>
              </div>
              
              <div className="mt-3 text-sm text-white/80 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Last Updated: {new Date().toLocaleString()}</span>
              </div>
            </div>

            {/* 🔴 WHITE CARDS GRID */}
            <div className="space-y-4">
              
              {/* SENDER */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h4 className="text-[#5F0F40] font-bold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Sender Information
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-3"><span className="text-gray-400">👤</span> Tesla, Inc.</p>
                  <p className="flex items-center gap-3"><span className="text-gray-400">📍</span> 45500 Fremont Blvd, Fremont, CA 94538</p>
                  <p className="flex items-center gap-3"><span className="text-gray-400">📞</span> +1 (555) 000-0000</p>
                  <p className="flex items-center gap-3"><span className="text-gray-400">✉️</span> contact@tesla.com</p>
                </div>
              </div>

              {/* RECEIVER */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h4 className="text-[#5F0F40] font-bold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  Receiver Information
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-3"><span className="text-gray-400">👤</span> {trackingData.customerName || 'Valued Customer'}</p>
                  <p className="flex items-center gap-3"><span className="text-gray-400">📍</span> {trackingData.currentLocation?.city}, {trackingData.currentLocation?.state}</p>
                  <p className="flex items-center gap-3"><span className="text-gray-400">📞</span> {trackingData.customerPhone || '+1 (555) 123-4567'}</p>
                  <p className="flex items-center gap-3"><span className="text-gray-400">✉️</span> {trackingData.customerEmail || 'customer@email.com'}</p>
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h4 className="text-[#5F0F40] font-bold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Shipment Details
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-3"><span className="text-gray-400">📦</span> Weight: {trackingData.weight || '3 kg'}</div>
                  <div className="flex items-center gap-3"><span className="text-gray-400">📡</span> Type: {trackingData.mode || 'Air Freight'}</div>
                  <div className="flex items-center gap-3"><span className="text-gray-400">📅</span> Shipped: {new Date(trackingData.estimatedDelivery).toLocaleDateString()}</div>
                </div>
              </div>

              {/* STATUS INFO */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h4 className="text-[#5F0F40] font-bold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Status Information
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-3"><span className="text-gray-400">⏱️</span> Status: <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{trackingData.status}</span></div>
                  <div className="flex items-center gap-3"><span className="text-gray-400">📍</span> Location: {trackingData.currentLocation?.city}, {trackingData.currentLocation?.state}</div>
                </div>
              </div>

              {/* 🟢 SHIPMENT PROGRESS — VERTICAL TIMELINE */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-[#5F0F40] font-bold mb-6">Shipment Progress</h3>
                <div className="relative pl-8">
                  {trackingData.history && trackingData.history.map((event, index) => {
                    const isLast = index === trackingData.history.length - 1;
                    const dotColor = getTimelineDotColor(event.status);
                    const icon = getTimelineIcon(event.status);
                    return (
                      <div key={index} className="relative flex items-start gap-4 pb-8">
                        {/* Timeline Dot Circle */}
                        <div className={`absolute left-[-24px] top-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${dotColor}`}>
                          {icon}
                        </div>
                        {/* Connecting line */}
                        {!isLast && (
                          <div className={`absolute left-[ -4px] top-10 w-0.5 h-[calc(100%+4px)] bg-gray-200`} style={{ left: '-4px' }} />
                        )}
                        {/* Content */}
                        <div className="flex-1 pt-0.5">
                          <p className="font-bold text-gray-800">{event.status}</p>
                          <p className="text-sm text-gray-500">{new Date(event.timestamp).toLocaleDateString()}</p>
                          {event.note && <p className="text-sm text-gray-400 mt-0.5">{event.note}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 🟢 REAL MAP (LEAFLET) */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h4 className="text-[#5F0F40] font-bold mb-3">Shipment Route</h4>
                <div className="h-56 w-full rounded-lg overflow-hidden border border-gray-200 z-0">
                  <MapContainer center={[37.5483, -121.9886]} zoom={5} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[37.5483, -121.9886]}>
                      <Popup>Origin: Fremont, CA</Popup>
                    </Marker>
                    <Marker position={[39.7392, -104.9903]}>
                      <Popup>Destination: Denver, CO</Popup>
                    </Marker>
                    <Polyline positions={[[37.5483, -121.9886], [39.7392, -104.9903]]} color="#5F0F40" weight={4} />
                  </MapContainer>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 bg-[#5F0F40] text-white rounded-lg hover:bg-[#4A0C33] transition text-sm font-medium">Print Receipt</button>
                <button className="flex-1 py-3 bg-white border border-[#5F0F40] text-[#5F0F40] rounded-lg hover:bg-gray-50 transition text-sm font-medium">Pay Clearance Fee</button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 🟢 WHAT TO EXPECT (Dark Theme) */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">What to Expect</h2>
            <p className="text-gray-400 text-base max-w-3xl mx-auto">
              From order confirmation to delivery day, we'll keep you updated every step of the way.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#18181B] rounded-xl p-6 flex flex-col items-center text-center hover:bg-[#27272A] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-1.5">Production Updates</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Get notified when your vehicle enters production.</p>
            </div>
            <div className="bg-[#18181B] rounded-xl p-6 flex flex-col items-center text-center hover:bg-[#27272A] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0h2.25a1.125 1.125 0 0 0 1.125-1.125V11.25m-9.75 7.5V9m0 0h-4.5M21 11.25h-4.5" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-1.5">Real-time Tracking</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Follow your vehicle's journey in real time.</p>
            </div>
            <div className="bg-[#18181B] rounded-xl p-6 flex flex-col items-center text-center hover:bg-[#27272A] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#1E293B] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-1.5">Delivery Scheduling</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Choose a convenient delivery window.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tracking;