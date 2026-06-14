import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const faqs = [
  { q: 'How do I order a Tesla?', a: 'You can order directly through our website. Choose your model, customize features, and place an order with a deposit — completed in minutes.' },
  { q: 'What is the range of Tesla vehicles?', a: 'Model S: 405 mi, Model 3: 341 mi, Model X: 348 mi, Model Y: 330 mi.' },
  { q: 'How does charging work?', a: 'Charge at home with Wall Connector or use 50,000+ Superchargers worldwide. Supercharging adds up to 200 miles in 15 minutes.' },
  { q: 'What is Autopilot and Full Self-Driving?', a: 'Autopilot is standard driver assistance. Full Self-Driving (Supervised) is optional with advanced autonomous capabilities.' },
  { q: 'What warranties are included?', a: '4-year/50,000-mile Basic Warranty and 8-year/100,000–150,000-mile Battery & Drive Unit Warranty.' },
  { q: 'Can I test drive a Tesla?', a: 'Yes — schedule online at any Tesla location or request a Demo Drive.' },
];

function FaqItem({ question, answer, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ background: '#141417', border: `1px solid ${open ? 'rgba(255,255,255,0.1)' : 'rgba(39,39,42,0.8)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.3s', cursor: 'pointer' }}
      onClick={() => setOpen(o => !o)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#fff' }}>{question}</span>
        <div style={{ flexShrink: 0, width: 22, height: 22, border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.35s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5"><path d="M12 4v16m8-8H4" /></svg>
        </div>
      </div>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
        <p style={{ padding: '0 20px 18px', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(228,228,231,0.55)', lineHeight: 1.8, borderTop: '1px solid rgba(255,255,255,0.05)', margin: 0, paddingTop: 14 }}>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div style={{ background: '#09090B', color: '#E4E4E7', fontFamily: "'Poppins', sans-serif" }}>
      <Header />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase' }}>Got Questions</p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 500, letterSpacing: '-0.02em', marginTop: 8 }}>Frequently Asked</h1>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 60}>
              <FaqItem question={faq.q} answer={faq.a} defaultOpen={idx === 0} />
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}