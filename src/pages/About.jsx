import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { Users, Zap, Globe, TrendingUp, Award, Shield } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '5M+', label: 'Vehicles Sold', icon: TrendingUp },
    { value: '50k+', label: 'Superchargers', icon: Zap },
    { value: '100+', label: 'Global Markets', icon: Globe },
    { value: '99%', label: 'Customer Satisfaction', icon: Award },
  ];

  const teamValues = [
    { title: 'Innovation First', desc: 'We invest heavily in R&D to push the boundaries of EV and energy tech.', icon: Zap },
    { title: 'Sustainability', desc: 'Committed to a zero-emission future with solar, batteries, and recycling.', icon: Shield },
    { title: 'Community Driven', desc: 'Over 5 million owners worldwide shaping the future of transport.', icon: Users },
  ];

  return (
    <div style={{ background: '#09090B', color: '#E4E4E7', fontFamily: "'Poppins', sans-serif" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Hero */}
        <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
            Our Story
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>
            More Than a Car Company
          </h1>
          <p style={{ color: 'rgba(228,228,231,0.6)', marginTop: 12, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto', fontSize: '0.8rem', lineHeight: 1.6 }}>
            Tesla Stock SpaceX is redefining transportation, energy, and space exploration — all driven by a mission to accelerate the world's transition to sustainable energy.
          </p>
        </Reveal>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginBottom: 64 }}>
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div style={{ background: '#141417', borderRadius: 20, padding: 20, textAlign: 'center', border: '1px solid rgba(39,39,42,0.8)', transition: 'all 0.3s' }}
                   onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'; e.currentTarget.style.boxShadow = '0 8px 20px -8px rgba(0,0,0,0.5)'; }}
                   onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'; }}>
                <stat.icon size={24} style={{ color: '#a78bfa', marginBottom: 10 }} />
                <div style={{ fontSize: '1.3rem', fontWeight: 600, fontFamily: "'Space Mono', monospace" }}>{stat.value}</div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(228,228,231,0.5)', marginTop: 4 }}>{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Image + mission statement */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, marginBottom: 64 }}>
          <Reveal>
            <img src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80" alt="Tesla Gigafactory" style={{ width: '100%', borderRadius: 24, objectFit: 'cover', height: '100%', maxHeight: 360, boxShadow: '0 15px 25px -12px rgba(0,0,0,0.5)' }} />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: 16 }}>Our mission</h2>
              <p style={{ color: 'rgba(228,228,231,0.7)', lineHeight: 1.7, marginBottom: 20, fontSize: '0.8rem' }}>
                To accelerate the world's transition to sustainable energy by producing the most compelling electric vehicles, energy storage systems, and solar products.
              </p>
              <p style={{ color: 'rgba(228,228,231,0.6)', lineHeight: 1.7, fontSize: '0.8rem' }}>
                From the factory floor to the open road, every Tesla is built with precision, performance, and the planet in mind. We're not just building cars — we're building a cleaner, smarter future.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core values cards */}
        <Reveal style={{ marginBottom: 40 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginBottom: 8 }}>WHAT WE BELIEVE</p>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 500 }}>Driven by purpose</h2>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 64 }}>
          {teamValues.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ background: '#141417', borderRadius: 20, padding: 24, border: '1px solid rgba(39,39,42,0.8)', transition: 'all 0.3s' }}
                   onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(168,85,247,0.5)'; }}
                   onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'; }}>
                <item.icon size={28} style={{ color: '#a78bfa', marginBottom: 16 }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: 'rgba(228,228,231,0.6)', lineHeight: 1.6, fontSize: '0.75rem' }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Leadership / team quote */}
        <Reveal>
          <div style={{ background: 'linear-gradient(135deg, #141417 0%, #1f1f22 100%)', borderRadius: 24, padding: 36, textAlign: 'center', border: '1px solid rgba(168,85,247,0.2)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1" style={{ opacity: 0.3, marginBottom: 16 }}><path d="M10 11h-4v-4h4v4zm8 0h-4v-4h4v4zm-8 8h-4v-4h4v4zm8 0h-4v-4h4v4z"/></svg>
            <p style={{ fontSize: '0.9rem', maxWidth: 650, margin: '0 auto 20px', lineHeight: 1.6, color: 'rgba(228,228,231,0.9)' }}>
              “Tesla has always been about solving problems that others ignore. Our team is relentless in pushing the boundaries of what's possible — for the planet and for our customers.”
            </p>
            <p style={{ fontWeight: 500, fontSize: '0.75rem' }}>— Elon Musk, CEO</p>
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}