import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

export default function AirFreight() {
  return (
    <div style={{ background: '#09090B', color: '#E4E4E7', fontFamily: "'Poppins', sans-serif" }}>
      <Header />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
        <Reveal>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em' }}>Air Freight Forwarding</h1>
          <p style={{ color: 'rgba(228,228,231,0.6)', fontSize: '1.1rem', marginTop: 16, maxWidth: 700 }}>Fast, reliable global air cargo solutions for time‑sensitive shipments.</p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, marginTop: 64 }}>
          <Reveal>
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" alt="Air freight" style={{ width: '100%', borderRadius: 18 }} />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 20 }}>Why choose our air freight?</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Global network of 200+ airports', 'Real-time tracking and status updates', 'Customs brokerage included', '24/7 customer support'].map((item, i) => (
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