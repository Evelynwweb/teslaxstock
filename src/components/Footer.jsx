import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  const colHeadStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.58rem',
    fontWeight: 400,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: '0.26em',
    textTransform: 'uppercase',
    marginBottom: 18,
    display: 'block',
  };

  const linkStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 300,
    color: 'rgba(228,228,231,0.38)',
    textDecoration: 'none',
    display: 'block',
    padding: '4px 0',
    transition: 'color 0.2s, transform 0.2s',
    letterSpacing: '0.02em',
  };

  const quickLinks = [
    { to: '/',        label: 'Home' },
    { to: '/about',   label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
    { to: '/faq',     label: 'FAQs' },
  ];

  const solutions = [
    { to: '/air-freight',   label: 'Air Freight Forwarding' },
    { to: '/road-freight',  label: 'Road Freight Forwarding' },
    { to: '/ocean-freight', label: 'Ocean Freight Forwarding' },
    { to: '/warehouse',     label: 'Warehousing & Storage' },
  ];

  return (
    <footer style={{
      background: '#09090B',
      borderTop: '1px solid rgba(39,39,42,0.6)',
      paddingTop: 80,
      paddingBottom: 32,
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px 32px',
          marginBottom: 64,
        }}>

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'inline-flex', width: 'fit-content', opacity: 1, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <img
                src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
                alt="Tesla Stock SpaceX"
                style={{ height: 16, width: 'auto', objectFit: 'contain', filter: 'brightness(0.9)' }}
              />
            </Link>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.7rem', fontWeight: 300,
              color: 'rgba(228,228,231,0.28)',
              lineHeight: 1.85,
              maxWidth: 280,
            }}>
              Tesla Stock SpaceX delivers premium logistics frameworks worldwide, operating across 15+ global territories with a network of strategic international partners.
            </p>

            {/* Social icons row */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {[
                { label: 'X / Twitter', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.85L2.25 2.25h6.844l4.259 5.622 5.891-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'LinkedIn', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map(({ label, d }) => (
                <button key={label} title={label} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid rgba(63,63,70,0.7)',
                  background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'border-color 0.2s, background 0.2s',
                  padding: 0,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(63,63,70,0.7)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)" stroke="none">
                    <path d={d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <span style={colHeadStyle}>Quick Links</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={linkStyle}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(228,228,231,0.38)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <span style={colHeadStyle}>Our Solutions</span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {solutions.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} style={linkStyle}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(228,228,231,0.38)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span style={colHeadStyle}>Contact</span>
            <a
              href="mailto:support@teslastockspacex.com"
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 9,
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.7rem', fontWeight: 300,
                color: 'rgba(228,228,231,0.38)',
                textDecoration: 'none',
                lineHeight: 1.6,
                wordBreak: 'break-all',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(228,228,231,0.38)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                style={{ flexShrink: 0, marginTop: 2, opacity: 0.5 }}>
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@teslastockspacex.com
            </a>

            {/* Newsletter micro-widget */}
            <div style={{ marginTop: 28 }}>
              <span style={{ ...colHeadStyle, marginBottom: 12 }}>Stay Updated</span>
              <div style={{
                display: 'flex', borderRadius: 100, overflow: 'hidden',
                border: '1px solid rgba(63,63,70,0.7)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'border-color 0.25s',
              }}
                onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
                onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(63,63,70,0.7)'}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1, background: 'none', border: 'none', outline: 'none',
                    padding: '9px 14px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.68rem', fontWeight: 300,
                    color: 'rgba(228,228,231,0.8)',
                    minWidth: 0,
                  }}
                />
                <button style={{
                  flexShrink: 0,
                  padding: '9px 14px',
                  background: '#fff', color: '#000',
                  border: 'none', cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.65rem', fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e4e4e7'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >Join</button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(39,39,42,0.5)', marginBottom: 24 }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12,
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.58rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.14em',
          }}>
            &copy; {year} Tesla Stock SpaceX. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['#', 'Privacy Policy'], ['#', 'Terms of Service']].map(([href, label]) => (
              <a key={label} href={href} style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.65rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.2)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
              >{label}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;