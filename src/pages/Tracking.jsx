import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

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
      'Custom Hold': 'bg-amber-500 border-amber-500',
      'Delivered': 'bg-emerald-500 border-emerald-500'
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
    if (e) e.preventDefault();
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
      // Let state settle briefly before firing tracking
      const timeoutId = setTimeout(() => {
        setLoading(true);
        fetch(`${API_URL}/api/tracking/${id}`)
          .then(res => {
            if (!res.ok) throw new Error('Tracking number not found');
            return res.json();
          })
          .then(data => setTrackingData(data))
          .catch(err => setError(err.message))
          .finally(() => setLoading(false));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  return (
    <div className="bg-[#09090B] text-white font-['Poppins',sans-serif] min-h-screen selection:bg-[#5F0F40] selection:text-white">
      <Header />

      {/* 🟢 HERO SECTION (Dark Theme) */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://teslastockspacex.com/wp-content/uploads/2026/01/tesla-more-detail-video-showcase-6x4-truckbed.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-[#09090B]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 w-full max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-3"
          >
            Track Your Tesla
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-sm md:text-lg text-gray-300 mb-8 max-w-xl"
          >
            Follow your vehicle's journey from production line to delivery day.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-xl px-2"
          >
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center w-full p-1.5 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-zinc-700 focus-within:border-zinc-500 shadow-2xl transition-all duration-300"
            >
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter your tracking number..."
                className="flex-1 px-5 py-3 bg-transparent text-white placeholder-zinc-400 focus:outline-none text-sm font-medium"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#3B82F6] hover:bg-blue-600 active:scale-95 disabled:opacity-50 text-white font-semibold rounded-full transition-all flex items-center justify-center text-sm shadow-md"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : 'Track Order'}
              </button>
            </form>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium backdrop-blur-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* 🟢 TRACKING RESULTS */}
      <AnimatePresence>
        {trackingData && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="py-12 px-4 bg-[#09090B]"
          >
            <div className="max-w-6xl mx-auto">
              
              {/* BACK TO HOME BUTTON */}
              <button 
                onClick={() => window.location.href = '/'}
                className="mb-6 px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl hover:bg-zinc-800 hover:text-white transition-all text-xs font-semibold flex items-center gap-2 group shadow-sm"
              >
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Home
              </button>

              {/* MAROON TOP CARD */}
              <div className="bg-[#5F0F40] rounded-2xl p-6 text-white mb-8 shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-10 -translate-y-10">
                  <svg width="400" height="400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 3.99L19.53 19H4.47L12 5.99z"/></svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 opacity-90 text-xs font-medium tracking-wide uppercase">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span>Live Reference Identifier</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{trackingData.trackingNumber}</h2>
                      <span className="px-2.5 py-0.5 bg-white text-[#5F0F40] text-[10px] font-extrabold tracking-wider uppercase rounded-full shadow-sm">Verified Bundle</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:items-center gap-3">
                    <div className="p-2.5 bg-black/20 backdrop-blur-sm rounded-xl flex items-center gap-3 border border-white/10">
                      <span className="text-xs font-medium text-white/80">Current Node status:</span>
                      <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                        {trackingData.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/70 flex items-center gap-2 bg-black/10 px-3 py-2 rounded-xl border border-white/5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span>Refreshed: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* LEFT COLUMN: INFORMATION BLOCKS (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* METRIC SUB-GRID FOR INFO CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* SENDER */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-zinc-100 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[#5F0F40] font-bold text-sm tracking-wide uppercase mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                          Origin Faciliator
                        </h4>
                        <div className="space-y-3 text-sm text-zinc-600">
                          <p className="flex items-start gap-2.5 font-medium text-zinc-800">
                            <span className="text-zinc-400 mt-0.5">👤</span> Tesla, Inc.
                          </p>
                          <p className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-zinc-400 mt-0.5">📍</span> 45500 Fremont Blvd, Fremont, CA 94538
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-50 space-y-1.5 text-xs text-zinc-500">
                        <p className="flex items-center gap-2"><span>📞</span> +1 (555) 000-0000</p>
                        <p className="flex items-center gap-2"><span>✉️</span> logistics@tesla.com</p>
                      </div>
                    </div>

                    {/* RECEIVER */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-zinc-100 flex flex-col justify-between">
                      <div>
                        <h4 className="text-[#5F0F40] font-bold text-sm tracking-wide uppercase mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                          Consignee Registry
                        </h4>
                        <div className="space-y-3 text-sm text-zinc-600">
                          <p className="flex items-start gap-2.5 font-medium text-zinc-800">
                            <span className="text-zinc-400 mt-0.5">👤</span> {trackingData.customerName || 'Valued Customer'}
                          </p>
                          <p className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-zinc-400 mt-0.5">📍</span> {trackingData.currentLocation?.city}, {trackingData.currentLocation?.state}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-50 space-y-1.5 text-xs text-zinc-500">
                        <p className="flex items-center gap-2"><span>📞</span> {trackingData.customerPhone || '+1 (555) 123-4567'}</p>
                        <p className="flex items-center gap-2"><span>✉️</span> {trackingData.customerEmail || 'customer@email.com'}</p>
                      </div>
                    </div>

                    {/* SHIPMENT DETAILS */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-zinc-100">
                      <h4 className="text-[#5F0F40] font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        Manifest Profile
                      </h4>
                      <div className="space-y-2.5 text-sm text-zinc-600">
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                          <span className="text-zinc-400 flex items-center gap-2"><span>📦</span> Net Mass:</span>
                          <span className="font-semibold text-zinc-800">{trackingData.weight || '2,108 kg'}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                          <span className="text-zinc-400 flex items-center gap-2"><span>📡</span> Freight Mode:</span>
                          <span className="font-semibold text-zinc-800">{trackingData.mode || 'Carrier Transporter'}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-zinc-400 flex items-center gap-2"><span>📅</span> Dispatch Date:</span>
                          <span className="font-semibold text-zinc-800">{new Date(trackingData.estimatedDelivery).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                        </div>
                      </div>
                    </div>

                    {/* STATUS INFO */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-zinc-100">
                      <h4 className="text-[#5F0F40] font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Telemetry Core
                      </h4>
                      <div className="space-y-3 text-sm text-zinc-600">
                        <div className="flex justify-between items-center py-1 border-b border-gray-50">
                          <span className="text-zinc-400 flex items-center gap-2"><span>⏱️</span> Allocation State:</span>
                          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">{trackingData.status}</span>
                        </div>
                        <div className="flex justify-between items-start py-1">
                          <span className="text-zinc-400 flex items-center gap-2 whitespace-nowrap"><span>📍</span> Current Sector:</span>
                          <span className="font-semibold text-zinc-800 text-right">{trackingData.currentLocation?.city}, {trackingData.currentLocation?.state}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* ACTION INTERACTIVE FOOTER */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button className="flex-1 py-3.5 bg-[#5F0F40] text-white rounded-xl hover:bg-[#4A0C33] active:scale-[0.99] font-semibold text-sm shadow-md transition-all">
                      Print Secure Receipt
                    </button>
                    <button className="flex-1 py-3.5 bg-white border-2 border-[#5F0F40] text-[#5F0F40] rounded-xl hover:bg-zinc-50 active:scale-[0.99] font-bold text-sm transition-all">
                      Settle Logistics Duties
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: TIMELINE & MAP (1/3 width) */}
                <div className="space-y-6">
                  
                  {/* REAL MAP (LEAFLET) */}
                  <div className="bg-white rounded-2xl p-5 shadow-md border border-zinc-100 overflow-hidden">
                    <h4 className="text-[#5F0F40] font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                      Active Route Grid
                    </h4>
                    <div className="h-60 w-full rounded-xl overflow-hidden border border-zinc-200 z-0 shadow-inner">
                      <MapContainer center={[37.5483, -121.9886]} zoom={4} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[37.5483, -121.9886]}>
                          <Popup>Production Plant: Fremont, CA</Popup>
                        </Marker>
                        <Marker position={[39.7392, -104.9903]}>
                          <Popup>Hub Cluster: Denver, CO</Popup>
                        </Marker>
                        <Polyline positions={[[37.5483, -121.9886], [39.7392, -104.9903]]} color="#5F0F40" weight={4} dashArray="5, 10" />
                      </MapContainer>
                    </div>
                  </div>

                  {/* SHIPMENT PROGRESS — VERTICAL TIMELINE */}
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-zinc-100">
                    <h3 className="text-[#5F0F40] font-bold text-sm tracking-wide uppercase mb-6 flex items-center gap-2 border-b border-gray-100 pb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      Transit Chain Logs
                    </h3>
                    <div className="relative pl-6 border-l-2 border-zinc-100 ml-4 space-y-6">
                      {trackingData.history && trackingData.history.map((event, index) => {
                        const isLast = index === trackingData.history.length - 1;
                        const dotColor = getTimelineDotColor(event.status);
                        const iconSymbol = getTimelineIcon(event.status);
                        
                        return (
                          <div key={index} className="relative">
                            {/* Timeline Dot Circle */}
                            <div className={`absolute left-[-37px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm ${dotColor}`}>
                              {iconSymbol}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                              <p className="font-bold text-sm text-zinc-800 leading-tight">{event.status}</p>
                              <p className="text-[11px] font-medium text-zinc-400 mt-0.5">
                                {new Date(event.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                              </p>
                              {event.note && (
                                <p className="text-xs text-zinc-500 mt-1 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                                  {event.note}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 🟢 WHAT TO EXPECT (Dark Theme) */}
      <section className="py-16 px-4 border-t border-zinc-800 bg-[#0C0C0E]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">Fulfillment Stages</h2>
            <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              From the assembly pipeline to your driveway, experience modular updates at every milestone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#18181B] border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2">Production Queues</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Receive instant system signals as your customized chassis enters the automated assembly phase.</p>
            </div>
            <div className="bg-[#18181B] border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0h2.25a1.125 1.125 0 0 0 1.125-1.125V11.25m-9.75 7.5V9m0 0h-4.5M21 11.25h-4.5" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2">Live Telemetry</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Track global logistical positioning data synchronously via unified carrier coordinates.</p>
            </div>
            <div className="bg-[#18181B] border border-zinc-800/60 rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-700 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2">Handover Coordination</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">Lock in precision structural arrival slots directly synchronized with final field distribution nodes.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tracking;