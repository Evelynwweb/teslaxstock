import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 4000);
    }, 1000);
  };

  // Social icons as inline SVGs
  const socialIcons = [
    { name: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
    { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { name: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' },
    { name: 'Instagram', path: 'M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm-4 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm4.5-1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' }
  ];

  return (
    <div style={{ background: '#09090B', color: '#E4E4E7', fontFamily: "'Poppins', sans-serif" }}>
      <Header />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
            Get in Touch
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>
            Let's Connect
          </h1>
          <p style={{ color: 'rgba(228,228,231,0.5)', marginTop: 12, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', fontSize: '0.8rem' }}>
            Have questions or need support? We're just a message away.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {/* Contact Form */}
          <Reveal>
            <div style={{ background: '#141417', borderRadius: 20, padding: 28, border: '1px solid rgba(39,39,42,0.8)', transition: 'transform 0.3s ease, border-color 0.3s' }}
                 onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Mail size={20} style={{ color: '#2563EB' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>Send us a message</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(228,228,231,0.7)' }}>Full name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required
                    style={{ width: '100%', background: '#1f1f22', border: '1px solid #2c2c30', borderRadius: 12, padding: '10px 14px', color: '#fff', fontSize: '0.75rem', transition: 'border-color 0.2s' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#2563EB'}
                    onBlur={e => e.currentTarget.style.borderColor = '#2c2c30'} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(228,228,231,0.7)' }}>Email address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required
                    style={{ width: '100%', background: '#1f1f22', border: '1px solid #2c2c30', borderRadius: 12, padding: '10px 14px', color: '#fff', fontSize: '0.75rem' }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.04em', color: 'rgba(228,228,231,0.7)' }}>Message *</label>
                  <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required
                    style={{ width: '100%', background: '#1f1f22', border: '1px solid #2c2c30', borderRadius: 12, padding: '10px 14px', color: '#fff', fontSize: '0.75rem', resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={isSubmitting}
                  style={{ width: '100%', background: '#2563EB', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 40, fontWeight: 500, fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s', letterSpacing: '0.05em' }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = '#1d4ed8'; }}
                  onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = '#2563EB'; }}>
                  {isSubmitting ? 'Sending...' : <><Send size={14} /> Send Message</>}
                </button>
                {submitStatus === 'success' && (
                  <div style={{ marginTop: 14, padding: 10, background: 'rgba(16,185,129,0.1)', borderRadius: 10, textAlign: 'center', fontSize: '0.7rem', color: '#10b981' }}>
                    ✓ Message sent! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </Reveal>

          {/* Contact Info + Map */}
          <Reveal delay={120}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Info cards */}
              <div style={{ background: '#141417', borderRadius: 20, padding: 24, border: '1px solid rgba(39,39,42,0.8)', transition: 'transform 0.3s' }}
                   onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                   onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 18 }}>Reach out directly</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <MapPin size={18} style={{ color: '#2563EB' }} />
                    <div><p style={{ fontWeight: 500, fontSize: '0.75rem', margin: 0 }}>Headquarters</p><p style={{ color: 'rgba(228,228,231,0.6)', fontSize: '0.7rem', margin: 0 }}>3500 Deer Creek Road, Palo Alto, CA</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Phone size={18} style={{ color: '#2563EB' }} />
                    <div><p style={{ fontWeight: 500, fontSize: '0.75rem', margin: 0 }}>Support hotline</p><p style={{ color: 'rgba(228,228,231,0.6)', fontSize: '0.7rem', margin: 0 }}>+1 (888) 518-3752</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Mail size={18} style={{ color: '#2563EB' }} />
                    <div><p style={{ fontWeight: 500, fontSize: '0.75rem', margin: 0 }}>Email us</p><p style={{ color: 'rgba(228,228,231,0.6)', fontSize: '0.7rem', margin: 0 }}>support@teslastockspacex.com</p></div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div style={{ background: '#141417', borderRadius: 20, padding: 24, border: '1px solid rgba(39,39,42,0.8)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: 14 }}>Follow the future</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  {socialIcons.map((icon, idx) => (
                    <a key={idx} href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, background: '#1f1f22', borderRadius: '50%', transition: 'all 0.2s' }}
                       onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.querySelector('svg').style.stroke = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                       onMouseLeave={e => { e.currentTarget.style.background = '#1f1f22'; e.currentTarget.querySelector('svg').style.stroke = 'rgba(228,228,231,0.7)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(228,228,231,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={icon.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div style={{ background: '#141417', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(39,39,42,0.8)', height: 200, position: 'relative' }}
                   onMouseEnter={e => e.currentTarget.querySelector('iframe')?.style.setProperty('filter', 'grayscale(0)')}
                   onMouseLeave={e => e.currentTarget.querySelector('iframe')?.style.setProperty('filter', 'grayscale(0.8)')}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.416783265474!2d-122.1624174!3d37.4418837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbafe24285237%3A0x1b9c9c5b7e0c2f2f!2s3500%20Deer%20Creek%20Rd%2C%20Palo%20Alto%2C%20CA%2094304!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus" 
                  width="100%" height="100%" style={{ border: 0, filter: 'grayscale(0.8)', transition: 'filter 0.3s' }} allowFullScreen loading="lazy">
                </iframe>
                <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: 16, fontSize: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>Tesla HQ</div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}