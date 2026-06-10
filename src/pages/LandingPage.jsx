import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Header from '../components/Header';
import Footer from '../components/Footer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* ─────────────────────────────────────────
   HOOK: intersection observer for reveal
───────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────
   REVEAL WRAPPER
───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   LOADER COMPONENT
───────────────────────────────────────── */
function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const keyframes = [
      { t: 0, v: 0 }, { t: 300, v: 12 }, { t: 700, v: 40 },
      { t: 1100, v: 68 }, { t: 1450, v: 88 }, { t: 1700, v: 100 },
    ];
    let raf, start;
    const tick = (ts) => {
      if (!start) start = ts;
      const el = ts - start;
      let val = 0;
      for (let i = 0; i < keyframes.length - 1; i++) {
        const a = keyframes[i], b = keyframes[i + 1];
        if (el >= a.t && el <= b.t) {
          val = Math.round(a.v + (b.v - a.v) * ((el - a.t) / (b.t - a.t)));
          break;
        } else if (el > b.t) val = b.v;
      }
      const clamped = Math.min(val, 100);
      setPct(clamped);
      setFillHeight(clamped);
      if (clamped < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setExit(true);
          setTimeout(onDone, 600);
        }, 280);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#09090B',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: exit ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow pulse */}
      <div style={{
        position: 'absolute',
        width: 360, height: 360,
        background: 'radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'loaderGlow 2.4s ease-in-out infinite',
      }} />

      {/* Logo fill container */}
      <div style={{ position: 'relative', marginBottom: 40 }}>
        {/* Dark base logo */}
        <img
          src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
          alt="Tesla"
          style={{
            height: 48,
            width: 'auto',
            display: 'block',
            filter: 'brightness(0) invert(0.12)',
          }}
        />
        {/* White fill — clips from bottom up */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: `${fillHeight}%`,
          overflow: 'hidden',
          transition: 'height 0.08s linear',
        }}>
          <img
            src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0, left: 0,
              height: 48,
              width: 'auto',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>
      </div>

      {/* Progress bar track */}
      <div style={{
        width: 200,
        height: 1,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.9))',
          borderRadius: 2,
          transition: 'width 0.08s linear',
          boxShadow: '0 0 8px rgba(255,255,255,0.3)',
        }} />
      </div>

      {/* Percentage */}
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: '10px',
        color: 'rgba(255,255,255,0.28)',
        letterSpacing: '0.22em',
        userSelect: 'none',
      }}>
        {String(pct).padStart(3, '0')}
      </span>

      <style>{`
        @keyframes loaderGlow {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  const parallaxY = scrollY * 0.4;

  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: 600, overflow: 'hidden' }}>
      {/* Video layer with parallax */}
      <div style={{
        position: 'absolute', inset: 0,
        transform: `translateY(${parallaxY}px) scale(1.08)`,
        willChange: 'transform',
      }}>
        <video
          autoPlay muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          src="/tesla-more-detail-video-showcase-6x4-truckbed.mp4"
        />
      </div>

      {/* Layered overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          linear-gradient(to top, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.1) 40%, transparent 65%),
          linear-gradient(to bottom, rgba(9,9,11,0.5) 0%, transparent 30%),
          linear-gradient(to right, rgba(9,9,11,0.2) 0%, transparent 50%)
        `,
      }} />

      {/* Subtle vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(9,9,11,0.45) 100%)',
      }} />

      {/* Mouse parallax spotlight */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 55% 55% at ${50 + mousePos.x * 8}% ${50 + mousePos.y * 6}%, rgba(255,255,255,0.025) 0%, transparent 60%)`,
        transition: 'background 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* TOP CENTER — logo + tagline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        paddingTop: 96,
        zIndex: 10,
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s',
      }}>
        <img
          src="https://teslastockspacex.com/wp-content/uploads/2026/01/Asset-1cybertuck-white.svg"
          alt="Cybertruck"
          style={{ height: 44, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))' }}
        />
        <div style={{ width: 36, height: 1, background: 'rgba(255,255,255,0.25)', margin: '12px auto 10px' }} />
        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.65rem',
          fontWeight: 300,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          maxWidth: 380,
          lineHeight: 1.8,
        }}>
          Better Utility · More Performance · Built Different
        </p>
      </div>

      {/* BOTTOM — main copy + CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 24px 56px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 10,
      }}>
        {/* Headline */}
        <div style={{
          textAlign: 'center', marginBottom: 8,
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s',
        }}>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            margin: 0,
          }}>
            Redefine What's Possible
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(0.7rem, 1.5vw, 0.8rem)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.06em',
            marginTop: 10,
          }}>
            The future of driving — available now
          </p>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex', gap: 'clamp(20px, 5vw, 56px)',
          margin: '24px 0 28px',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s',
        }}>
          {[
            { val: '2.6s', label: '0–60 mph' },
            { val: '500+', label: 'Mile Range' },
            { val: '11k', label: 'lb Tow Cap' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: '#fff',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>{val}</div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.6rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginTop: 5,
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s',
        }}>
          <a
            href="/tracking"
            style={{
              minWidth: 148,
              textAlign: 'center',
              padding: '11px 28px',
              background: '#fff',
              color: '#000',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 100,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
              transition: 'background 0.25s, transform 0.2s, box-shadow 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e4e4e7'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)'; }}
          >
            Track Order
          </a>
          <a
            href="https://user.spacexnova.com/"
            style={{
              minWidth: 148,
              textAlign: 'center',
              padding: '11px 28px',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              borderRadius: 100,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              transition: 'background 0.25s, color 0.25s, transform 0.2s, border-color 0.25s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
          >
            Get Started
          </a>
        </div>

        {/* Scroll indicator */}
        <div style={{
          marginTop: 36,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: entered ? 0.4 : 0,
          transition: 'opacity 1s ease 1.2s',
        }}>
          <div style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.7))',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); transform-origin: top; }
          50% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────── */
function FaqItem({ question, answer, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div
      style={{
        background: '#141417',
        border: `1px solid ${open ? 'rgba(255,255,255,0.1)' : 'rgba(39,39,42,0.8)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.3s',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px', userSelect: 'none',
      }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.82rem', fontWeight: 500,
          color: '#fff', letterSpacing: '0.01em', paddingRight: 16,
        }}>{question}</span>
        <div style={{
          flexShrink: 0, width: 22, height: 22,
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          background: open ? 'rgba(255,255,255,0.08)' : 'transparent',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5">
            <path d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <p style={{
          padding: '0 20px 18px',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '0.75rem', fontWeight: 300,
          color: 'rgba(228,228,231,0.55)', lineHeight: 1.8,
          margin: 0,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 14,
        }}>{answer}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const LandingPage = () => {
  const [loaded, setLoaded] = useState(false);

  const fleetSlides = [
    { id: 1, name: 'Model 3', price: 'Lease from $299/mo', image: '/imgi_6_image.jpeg', isCybertruck: false },
    { id: 2, name: 'Model Y', price: 'Lease from $349/mo', image: '/imgi_8_image.jpeg', isCybertruck: false },
    { id: 3, name: 'Cybertruck', price: 'Lease from $899/mo', image: '/imgi_10_image.jpeg', isCybertruck: true },
    { id: 4, name: 'Model S', price: 'From $71,090', image: '/imgi_12_image.jpeg', isCybertruck: false },
  ];

  const investmentPlans = [
    { name: 'Bronze', description: 'Perfect entry into Tesla investment', minInvestment: '$1,000', image: '/imgi_6_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Silver', description: 'Enhanced returns for serious investors', minInvestment: '$15,000', image: '/imgi_8_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Priority Support'] },
    { name: 'Gold', description: 'Premium investment with exclusive benefits', minInvestment: '$50,000', image: '/imgi_12_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Dedicated Manager'] },
    { name: 'Diamond', description: 'Elite tier, maximum returns and VIP treatment', minInvestment: '$100,000', image: '/imgi_10_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'White-Glove Service'] },
    { name: 'Joint Plan', description: 'Built for partners investing together', minInvestment: '$4,000', image: '/image-scaled.avif', features: ['Dual Portfolio Access', 'Investment Dashboard', 'Email Support'] },
  ];

  const faqs = [
    { question: 'How do I order a Tesla?', answer: 'You can order directly through our website. Choose your model, customize your features, and place your order with a deposit — completed in minutes from anywhere.' },
    { question: 'What is the range of Tesla vehicles?', answer: 'Range varies by model. Model S achieves up to 405 miles, Model 3 up to 341 miles, Model X up to 348 miles, and Model Y up to 330 miles on a full charge.' },
    { question: 'How does charging work?', answer: 'Charge at home with a Wall Connector or Mobile Connector, or use one of 50,000+ Superchargers worldwide. Supercharging adds up to 200 miles in 15 minutes.' },
    { question: 'What is Autopilot and Full Self-Driving?', answer: 'Autopilot is an advanced driver assistance system standard on every new Tesla. Full Self-Driving (Supervised) is an optional upgrade enabling additional autonomous driving capabilities.' },
    { question: 'What warranties are included?', answer: 'All new Tesla vehicles come with a 4-year / 50,000-mile Basic Warranty and an 8-year / 100,000–150,000-mile Battery and Drive Unit Warranty depending on model.' },
    { question: 'Can I test drive a Tesla?', answer: 'Yes — schedule a test drive at any Tesla location or request a Demo Drive at your convenience. Book directly from our website.' },
  ];

  const planTiers = {
    Bronze: { gradient: 'linear-gradient(135deg, #7c5a3a 0%, #c8986b 100%)', glow: 'rgba(200,152,107,0.15)' },
    Silver: { gradient: 'linear-gradient(135deg, #555 0%, #c0c0c0 100%)', glow: 'rgba(192,192,192,0.12)' },
    Gold:   { gradient: 'linear-gradient(135deg, #8a6a00 0%, #f5c842 100%)', glow: 'rgba(245,200,66,0.15)' },
    Diamond:{ gradient: 'linear-gradient(135deg, #2e1065 0%, #a78bfa 100%)', glow: 'rgba(167,139,250,0.15)' },
    'Joint Plan': { gradient: 'linear-gradient(135deg, #0c3a2e 0%, #4a9d7f 100%)', glow: 'rgba(74,157,127,0.12)' },
  };

  return (
    <>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <div style={{
        background: '#09090B',
        color: '#E4E4E7',
        fontFamily: "'Poppins', sans-serif",
        overflowX: 'hidden',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        WebkitFontSmoothing: 'antialiased',
      }}>
        <Header />

        {/* HERO */}
        <HeroSection />

        {/* ── FLEET ─────────────────────────────── */}
        <section style={{ padding: '96px 0', background: '#09090B' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
                Our Lineup
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                Explore the Fleet
              </h2>
              <p style={{ color: 'rgba(228,228,231,0.4)', fontSize: '0.78rem', fontWeight: 300, marginTop: 8 }}>
                Designed for efficiency, engineered for extreme performance
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                style={{ paddingBottom: 56 }}
              >
                {fleetSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <div
                      style={{
                        position: 'relative', height: 460,
                        borderRadius: 18, overflow: 'hidden',
                        border: '1px solid rgba(39,39,42,0.9)',
                        background: '#0d0d0f',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.querySelector('.fleet-img').style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)';
                        e.currentTarget.querySelector('.fleet-img').style.transform = 'scale(1)';
                      }}
                    >
                      <div
                        className="fleet-img"
                        style={{
                          position: 'absolute', inset: 0,
                          backgroundImage: `url(${slide.image})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 55%, transparent 80%)' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 22 }}>
                        {slide.isCybertruck ? (
                          <img src="https://teslastockspacex.com/wp-content/uploads/2026/01/Asset-1cybertuck-white.svg" alt="Cybertruck" style={{ height: 26, marginBottom: 6, display: 'block' }} />
                        ) : (
                          <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.1rem', fontWeight: 500, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{slide.name}</h3>
                        )}
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', margin: '0 0 16px', letterSpacing: '0.04em' }}>{slide.price}</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <a href="/tracking" style={btnStyle('#fff', '#000', false)}>Order Now</a>
                          <a href="/about" style={btnStyle('transparent', '#fff', true)}>Learn More</a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Reveal>
          </div>
        </section>

        {/* ── CURRENT OFFERS ─────────────────────── */}
        <section style={{ padding: '0 0 80px', background: '#09090B' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {[
                { img: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_14_image.jpeg', title: 'Current Offers', desc: 'Explore flexible, limited-time purchase options on Tesla fleets.', cta: 'Learn More', btnBg: 'transparent', btnBdr: 'rgba(255,255,255,0.2)', btnColor: '#fff' },
                { img: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_15_image.jpeg', title: 'American Heroes', desc: '$500 adaptive credit for military, healthcare workers, first responders & educators.', cta: 'Learn More', btnBg: '#fff', btnBdr: '#fff', btnColor: '#000' },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 120}>
                  <div
                    style={{
                      display: 'flex', flexDirection: 'row', height: 300,
                      background: '#141417', borderRadius: 18, overflow: 'hidden',
                      border: '1px solid rgba(39,39,42,0.8)',
                      transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(39,39,42,0.8)'}
                  >
                    <div style={{ width: '50%', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <img
                        src={card.img} alt={card.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ flex: 1, padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 500, color: '#fff', marginBottom: 8, letterSpacing: '-0.01em' }}>{card.title}</h3>
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: 'rgba(228,228,231,0.45)', lineHeight: 1.75, marginBottom: 22 }}>{card.desc}</p>
                      <a href="#" style={{ display: 'inline-block', padding: '9px 20px', background: card.btnBg, color: card.btnColor, border: `1px solid ${card.btnBdr}`, fontFamily: "'Poppins', sans-serif", fontSize: '0.68rem', fontWeight: 500, borderRadius: 100, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', transition: 'all 0.25s', width: 'fit-content' }}>
                        {card.cta}
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL SELF-DRIVING ─────────────────── */}
        <section style={{ padding: '80px 0', background: '#09090B' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
              {[
                {
                  type: 'video',
                  src: 'https://teslastockspacex.com/wp-content/uploads/2026/01/Homepage-FSD-Desktop.mp4',
                  title: 'Full Self-Driving (Supervised)',
                  cta1: { label: 'Order Now', href: '/tracking' },
                  cta2: { label: 'Learn More', href: '/about' },
                },
                {
                  type: 'image',
                  src: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_43_image.jpeg',
                  title: 'Features That Come Standard',
                  cta1: { label: 'Track Order', href: '/tracking' },
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 120}>
                  <div style={{
                    position: 'relative', height: 480, borderRadius: 18, overflow: 'hidden',
                    border: '1px solid rgba(39,39,42,0.9)',
                    transition: 'border-color 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)'}
                  >
                    {item.type === 'video' ? (
                      <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={item.src} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.15) 50%, transparent 80%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                      <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: '#fff', marginBottom: 16, letterSpacing: '-0.01em' }}>{item.title}</h3>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <a href={item.cta1.href} style={{ padding: '8px 20px', background: '#2563EB', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.68rem', borderRadius: 100, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'background 0.25s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                          onMouseLeave={e => e.currentTarget.style.background = '#2563EB'}
                        >{item.cta1.label}</a>
                        {item.cta2 && (
                          <a href={item.cta2.href} style={{ padding: '8px 20px', background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.68rem', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', backdropFilter: 'blur(8px)', transition: 'all 0.25s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                          >{item.cta2.label}</a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── INVESTMENT PLANS ──────────────────── */}
        <section style={{ padding: '96px 0', background: '#09090B' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
                Grow With Tesla
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                Investment Plans
              </h2>
              <p style={{ color: 'rgba(228,228,231,0.4)', fontSize: '0.78rem', fontWeight: 300, marginTop: 8 }}>
                Choose the tier structured to match your financial milestones
              </p>
            </Reveal>

            <Reveal delay={100}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                style={{ paddingBottom: 56 }}
              >
                {investmentPlans.map((plan, idx) => {
                  const tier = planTiers[plan.name] || planTiers.Bronze;
                  return (
                    <SwiperSlide key={idx}>
                      <div
                        style={{
                          background: '#111113',
                          border: '1px solid rgba(39,39,42,0.9)',
                          borderRadius: 18, overflow: 'hidden',
                          display: 'flex', flexDirection: 'column',
                          transition: 'border-color 0.3s, box-shadow 0.3s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = `0 0 40px ${tier.glow}`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(39,39,42,0.9)'; e.currentTarget.style.boxShadow = 'none'; }}
                      >
                        {/* Plan header with gradient */}
                        <div style={{
                          height: 8,
                          background: tier.gradient,
                        }} />
                        <div style={{
                          height: 140,
                          backgroundImage: `url(${plan.image})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          filter: 'brightness(0.7)',
                        }} />
                        <div style={{ padding: '20px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Tier badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: tier.gradient, flexShrink: 0 }} />
                            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1rem', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{plan.name}</h3>
                          </div>
                          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', fontWeight: 300, color: 'rgba(228,228,231,0.45)', minHeight: 36, marginBottom: 16, lineHeight: 1.75 }}>{plan.description}</p>

                          {/* Min investment box */}
                          <div style={{
                            background: 'rgba(9,9,11,0.6)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 10, padding: '12px 14px', marginBottom: 18,
                          }}>
                            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '1.4rem', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{plan.minInvestment}</div>
                            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: 5 }}>Min. investment</div>
                          </div>

                          {/* Features */}
                          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', flex: 1 }}>
                            {plan.features.map((f, fi) => (
                              <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: "'Poppins', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: 'rgba(228,228,231,0.6)', marginBottom: 8 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                                {f}
                              </li>
                            ))}
                          </ul>
                          <a href="https://user.spacexnova.com/" style={{
                            display: 'block', textAlign: 'center', padding: '10px 20px',
                            background: '#fff', color: '#000',
                            fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.7rem',
                            borderRadius: 100, textDecoration: 'none',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            transition: 'background 0.25s',
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e4e4e7'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                          >
                            Get Started
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Reveal>
          </div>
        </section>

        {/* ── TRACK YOUR TESLA ──────────────────── */}
        <section style={{ padding: '0 0 96px', background: '#09090B' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
            <Reveal>
              <div style={{ position: 'relative', height: 500, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(39,39,42,0.9)' }}>
                <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src="https://teslastockspacex.com/wp-content/uploads/2026/01/Cybertruck-Redefining-Desktop-v2.webm" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.3) 55%, rgba(9,9,11,0.1) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 48px 48px' }}>
                  <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 12 }}>Live Tracking</p>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 10px', maxWidth: 440 }}>Track Your Tesla</h3>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.45)', maxWidth: 400, lineHeight: 1.8, marginBottom: 28 }}>
                    Seamlessly monitor assembly status and logistics updates — from factory line to delivery routing, in real-time.
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <a href="/tracking" style={{
                      padding: '11px 28px', background: '#fff', color: '#000',
                      fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.68rem',
                      borderRadius: 100, textDecoration: 'none', letterSpacing: '0.12em',
                      textTransform: 'uppercase', transition: 'all 0.25s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#e4e4e7'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >Track Now</a>
                    <a href="/about" style={{
                      padding: '11px 28px', background: 'rgba(255,255,255,0.06)', color: '#fff',
                      fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: '0.68rem',
                      borderRadius: 100, textDecoration: 'none', letterSpacing: '0.12em',
                      textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)', transition: 'all 0.25s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; }}
                    >Learn More</a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────── */}
        <section style={{ padding: '0 0 96px', background: '#09090B' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
            <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>
                Got Questions
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 500, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>
                Frequently Asked
              </h2>
            </Reveal>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 60}>
                  <FaqItem question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .swiper-button-next, .swiper-button-prev {
          color: rgba(255,255,255,0.7) !important;
          transform: scale(0.6);
          transition: color 0.2s, opacity 0.2s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover { color: #fff !important; }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.25) !important;
          opacity: 1 !important;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #fff !important;
          width: 14px !important;
          border-radius: 4px !important;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #09090B; }
        ::-webkit-scrollbar-thumb { background: #27272A; border-radius: 20px; }
        ::-webkit-scrollbar-thumb:hover { background: #3F3F46; }
      `}</style>
    </>
  );
};

/* tiny helper */
function btnStyle(bg, color, bordered) {
  return {
    flex: 1, textAlign: 'center',
    padding: '8px 12px',
    background: bg,
    color,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 500,
    fontSize: '0.68rem',
    borderRadius: 100,
    textDecoration: 'none',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    border: bordered ? '1px solid rgba(255,255,255,0.25)' : 'none',
    backdropFilter: bordered ? 'blur(8px)' : 'none',
    transition: 'all 0.25s',
  };
}

export default LandingPage;