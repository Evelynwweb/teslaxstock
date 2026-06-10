import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinkStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 400,
    letterSpacing: '0.06em',
    color: 'rgba(228,228,231,0.7)',
    textDecoration: 'none',
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  const solutions = [
    { to: '/air-freight',   label: 'Air Freight Forwarding' },
    { to: '/road-freight',  label: 'Road Freight Forwarding' },
    { to: '/ocean-freight', label: 'Ocean Freight Forwarding' },
    { to: '/warehouse',     label: 'Warehouse & Storage' },
  ];

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
        background: scrolled ? 'rgba(9,9,11,0.85)' : 'rgba(9,9,11,0.55)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(39,39,42,0.7)' : 'rgba(39,39,42,0.35)'}`,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>

            {/* Logo */}
            <Link to="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', textDecoration: 'none', opacity: 1, transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.72'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <img
                src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
                alt="Tesla Stock SpaceX"
                style={{ height: 17, width: 'auto', objectFit: 'contain', filter: 'brightness(0.95)' }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}
              className="hide-mobile"
            >
              {['/', '/about', '/faq', '/contact', '/tracking'].map((path, i) => {
                const labels = ['Home', 'About', 'FAQ', 'Contact', 'Tracking'];
                return (
                  <Link
                    key={path} to={path}
                    style={navLinkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(228,228,231,0.7)'}
                  >{labels[i]}</Link>
                );
              })}

              {/* Solutions dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={e => e.currentTarget.querySelector('.dropdown').style.opacity = '1'}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.dropdown').style.opacity = '0';
                  e.currentTarget.querySelector('.dropdown').style.pointerEvents = 'none';
                  e.currentTarget.querySelector('.dropdown').style.transform = 'translateY(6px)';
                }}
              >
                <button
                  style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(228,228,231,0.7)'}
                  onMouseEnterCapture={e => {
                    e.currentTarget.closest('div').querySelector('.dropdown').style.opacity = '1';
                    e.currentTarget.closest('div').querySelector('.dropdown').style.pointerEvents = 'auto';
                    e.currentTarget.closest('div').querySelector('.dropdown').style.transform = 'translateY(0)';
                  }}
                >
                  Our Solutions
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ opacity: 0.6 }}>
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className="dropdown"
                  style={{
                    position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
                    transform: 'translateX(-50%) translateY(6px)',
                    width: 228,
                    background: '#141417',
                    border: '1px solid rgba(63,63,70,0.7)',
                    borderRadius: 14,
                    boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
                    padding: '6px',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.22s ease, transform 0.22s ease',
                    zIndex: 100,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.pointerEvents = 'auto'; e.currentTarget.style.transform = 'translateX(-50%) translateY(0)'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0'; e.currentTarget.style.pointerEvents = 'none'; e.currentTarget.style.transform = 'translateX(-50%) translateY(6px)'; }}
                >
                  {solutions.map(({ to, label }) => (
                    <Link
                      key={to} to={to}
                      style={{
                        display: 'block', padding: '9px 12px',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.72rem', fontWeight: 300,
                        color: 'rgba(228,228,231,0.55)',
                        textDecoration: 'none', borderRadius: 9,
                        transition: 'background 0.15s, color 0.15s',
                        letterSpacing: '0.03em',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(228,228,231,0.55)'; }}
                    >{label}</Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Desktop CTAs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}
              className="hide-mobile"
            >
              <Link to="/tracking" style={{
                padding: '7px 18px',
                background: 'transparent',
                border: '1px solid rgba(63,63,70,0.9)',
                color: 'rgba(228,228,231,0.8)',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.7rem', fontWeight: 400,
                borderRadius: 100, textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(228,228,231,0.8)'; e.currentTarget.style.borderColor = 'rgba(63,63,70,0.9)'; }}
              >Track Order</Link>
              <a href="https://user.spacexnova.com/" style={{
                padding: '7px 18px',
                background: '#2563EB',
                color: '#fff',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.7rem', fontWeight: 400,
                borderRadius: 100, textDecoration: 'none',
                letterSpacing: '0.06em',
                transition: 'background 0.25s, transform 0.2s',
                boxShadow: '0 2px 12px rgba(37,99,235,0.25)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >Login</a>
            </div>

            {/* Mobile toggle */}
            <button
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 6, borderRadius: 8,
                color: 'rgba(228,228,231,0.7)',
                transition: 'color 0.2s, background 0.2s',
                display: 'none',
              }}
              className="show-mobile"
              onClick={() => setMobileMenuOpen(o => !o)}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(228,228,231,0.7)'; e.currentTarget.style.background = 'none'; }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path d="M6 18L18 6M6 6l12 12" />
                  : <path d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>

          {/* Mobile drawer */}
          <div style={{
            maxHeight: mobileMenuOpen ? 500 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
            borderTop: mobileMenuOpen ? '1px solid rgba(39,39,42,0.6)' : '1px solid transparent',
          }}
            className="show-mobile"
          >
            <div style={{ padding: '16px 4px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['/', 'Home'], ['/about', 'About'], ['/faq', 'FAQ'], ['/contact', 'Contact'], ['/tracking', 'Tracking']].map(([path, label]) => (
                <Link key={path} to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '0.78rem', fontWeight: 400,
                    color: 'rgba(228,228,231,0.65)', textDecoration: 'none',
                    padding: '10px 8px', borderRadius: 8,
                    transition: 'color 0.2s, background 0.2s',
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(228,228,231,0.65)'; e.currentTarget.style.background = 'transparent'; }}
                >{label}</Link>
              ))}

              {/* Mobile solutions accordion */}
              <button
                onClick={() => setSolutionsDropdown(o => !o)}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.78rem', fontWeight: 400,
                  color: 'rgba(228,228,231,0.65)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '10px 8px', borderRadius: 8,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  textAlign: 'left', width: '100%',
                  letterSpacing: '0.04em',
                }}
              >
                Our Solutions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{ transition: 'transform 0.3s', transform: solutionsDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div style={{
                maxHeight: solutionsDropdown ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
                paddingLeft: 16,
                borderLeft: '1px solid rgba(63,63,70,0.5)',
                marginLeft: 8,
              }}>
                {solutions.map(({ to, label }) => (
                  <Link key={to} to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.72rem', fontWeight: 300,
                      color: 'rgba(228,228,231,0.45)', textDecoration: 'none',
                      padding: '8px 6px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(228,228,231,0.45)'}
                  >{label}</Link>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 16, marginTop: 8, borderTop: '1px solid rgba(39,39,42,0.5)' }}>
                <Link to="/tracking" onClick={() => setMobileMenuOpen(false)} style={{
                  textAlign: 'center', padding: '10px 20px',
                  border: '1px solid rgba(63,63,70,0.9)',
                  color: 'rgba(228,228,231,0.8)', borderRadius: 100, textDecoration: 'none',
                  fontFamily: "'Poppins', sans-serif", fontSize: '0.72rem', fontWeight: 400,
                  transition: 'all 0.25s', letterSpacing: '0.06em',
                }}>Track Order</Link>
                <a href="https://user.spacexnova.com/" style={{
                  textAlign: 'center', padding: '10px 20px',
                  background: '#2563EB', color: '#fff', borderRadius: 100, textDecoration: 'none',
                  fontFamily: "'Poppins', sans-serif", fontSize: '0.72rem', fontWeight: 400,
                  letterSpacing: '0.06em',
                }}>Login</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @media (min-width: 1024px) {
          .hide-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Header;