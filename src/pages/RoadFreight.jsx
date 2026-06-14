import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function RoadFreight() {
  return (
    <div style={{ background: '#09090B', color: '#E4E4E7', fontFamily: "'Poppins', sans-serif" }}>
      <Header />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <Reveal>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em' }}>Road Freight Forwarding</h1>
          <p style={{ color: 'rgba(228,228,231,0.6)', fontSize: '1.1rem', marginTop: 16, maxWidth: 700 }}>Efficient overland transport across North America and Europe.</p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 64 }}>
          <Reveal>
            <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80" alt="Road freight truck" style={{ width: '100%', borderRadius: 18, objectFit: 'cover' }} />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 20 }}>Reliable road logistics</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Door‑to‑door delivery', 'Temperature‑controlled options', 'Real‑time GPS tracking', 'Dedicated fleet manager'].map((item, i) => (
                  <li key={i} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}