import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const animTimer = setTimeout(() => setStartAnimation(true), 50);  
    // Optimized simulated loading duration from 12s to 1.8s for premium UX
    const loadTimer = setTimeout(() => setLoading(false), 1800); 
    return () => {
      clearTimeout(animTimer);
      clearTimeout(loadTimer);
    };
  }, []);
  useEffect(() => {
  if (!startAnimation) return;
  const keyframes = [
    { t: 0, v: 0 }, { t: 240, v: 8 }, { t: 640, v: 35 },
    { t: 1120, v: 72 }, { t: 1408, v: 92 }, { t: 1600, v: 100 },
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
    const el2 = document.getElementById('pct-counter');
    if (el2) el2.textContent = Math.min(val, 100);
    if (val < 100) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, [startAnimation]);

if (loading) {
  return (
    <div className="bg-[#09090B] text-white min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center gap-5">

        {/* Battery-fill logo reveal */}
        <div className="relative inline-block">
          {/* Dim base logo (unfilled layer) */}
          <img
            src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
            alt="Tesla"
            className="h-7 md:h-8 w-auto"
            style={{ filter: 'brightness(0) invert(0.15)' }}
          />

          {/* Bright fill layer — clips from bottom to top */}
          <div className="absolute inset-0 flex flex-col justify-end overflow-hidden">
            <div
              className="w-full overflow-hidden"
              style={{
                height: startAnimation ? '100%' : '0%',
                transition: 'height 1.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
              }}
            >
              <img
                src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
                alt=""
                aria-hidden="true"
                className="h-7 md:h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </div>
        </div>

        {/* Synced percentage counter */}
        {/* <p
          className="text-[11px] tracking-[0.14em] font-light tabular-nums"
          style={{
            color: 'rgba(255,255,255,0.38)',
            opacity: startAnimation ? 1 : 0,
            transition: 'opacity 0.4s ease 0.3s',
          }}
        >
          <span id="pct-counter">0</span>%
        </p> */}
      </div>
    </div>
  );
}

  const heroSlides = [
    {
      id: 1,
      title: 'Model 3',
      subtitle: 'Lease starting at $329/mo',
      type: 'image',
      media: '/imgi_2_image-scaled.jpeg', // ✅ local file
    },
    {
      id: 2,
      title: 'Model Y',
      subtitle: 'Lease starting at $399/mo',
      type: 'image',
      media: '/image-scaled.avif', // ✅ local file
    },
    {
      id: 3,
      title: 'Cybertruck',
      subtitle: 'Better Utility Than a Truck with More Performance Than a Sports Car',
      type: 'video',
      media: '/tesla-more-detail-video-showcase-6x4-truckbed.mp4', // ✅ local file
      logo: 'https://teslastockspacex.com/wp-content/uploads/2026/01/Asset-1cybertuck-white.svg',
    },
  ];

  const fleetSlides = [
    { id: 1, name: 'Model 3', price: 'Lease starting at $299/mo', image: '/imgi_6_image.jpeg', isCybertruck: false },
    { id: 2, name: 'Model Y', price: 'Lease starting at $349/mo', image: '/imgi_8_image.jpeg', isCybertruck: false },
    { id: 3, name: 'Cybertruck', price: 'Lease starting at $899/mo', image: '/imgi_10_image.jpeg', isCybertruck: true },
    { id: 4, name: 'Model S', price: 'From $71,090', image: '/imgi_12_image.jpeg', isCybertruck: false },
  ];

  const investmentPlans = [
    { name: 'Bronze', description: 'Perfect for getting started with Tesla investment', minInvestment: '$1,000', image: '/imgi_6_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Silver', description: 'Enhanced returns for serious investors', minInvestment: '$15,000', image: '/imgi_8_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Gold', description: 'Premium investment with exclusive benefits', minInvestment: '$50,000', image: '/imgi_12_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Diamond', description: 'Elite tier with maximum returns and VIP treatment', minInvestment: '$100,000', image: '/imgi_10_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Joint Plan', description: 'Perfect for getting started with joint investors', minInvestment: '$4,000', image: '/image-scaled.avif', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
  ];

  const faqs = [
    { question: 'How do I order a Tesla?', answer: 'You can order a Tesla directly through our website. Simply choose your model, customize your features, and place your order with a deposit. Orders can be completed in minutes from anywhere.' },
    { question: 'What is the range of Tesla vehicles?', answer: 'Range varies by model and configuration. The Model S can achieve up to 405 miles, Model 3 up to 341 miles, Model X up to 348 miles, and Model Y up to 330 miles on a single charge.' },
    { question: 'How does charging work?', answer: 'You can charge at home with a Wall Connector or Mobile Connector, or on the road at one of our 50,000+ Superchargers worldwide. Supercharging adds up to 200 miles of range in 15 minutes.' },
    { question: 'What is Autopilot and Full Self-Driving?', answer: 'Autopilot is an advanced driver assistance system that comes standard on every new Tesla. Full Self-Driving (Supervised) is an optional upgrade that enables additional autonomous driving capabilities.' },
    { question: 'What warranties are included?', answer: 'All new Tesla vehicles come with a Basic Vehicle Limited Warranty (4 years or 50,000 miles) and a Battery and Drive Unit Limited Warranty (8 years or 100,000-150,000 miles depending on model).' },
    { question: 'Can I test drive a Tesla?', answer: 'Yes! You can schedule a test drive at a Tesla location near you or request a Demo Drive to experience Tesla at your convenience. Visit our website to book your test drive today.' },
  ];

  return (
    <div className="bg-[#09090B] text-[#E4E4E7] font-['Poppins',sans-serif] overflow-x-hidden selection:bg-white selection:text-black antialiased">
      {/* Header */}
      <Header />

      {/* Hero Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
  {/* Thin progress bar */}
  <div
    className="absolute top-0 left-0 h-[2px] bg-white/85 z-30 transition-none"
    style={{ animation: 'progress 4s linear infinite' }}
  />

  <Swiper
    modules={[Navigation, Pagination, Autoplay, EffectFade]}
    effect="fade"
    navigation={{
      prevEl: '.nav-prev',
      nextEl: '.nav-next',
    }}
    pagination={{ clickable: true, el: '.custom-pagination' }}
    autoplay={{ delay: 4000, disableOnInteraction: false }}
    loop={true}
    className="h-full w-full"
  >
    {heroSlides.map((slide) => (
      <SwiperSlide key={slide.id}>
        <div className="relative w-full h-full flex flex-col justify-between pt-32 pb-24 px-4 items-center text-center">

          {/* Background with subtle Ken Burns scale */}
          {slide.type === 'image' ? (
            <div
              className="absolute inset-0 bg-cover bg-center scale-[1.04] swiper-slide-active:scale-100 transition-transform duration-[6000ms] ease-out"
              style={{ backgroundImage: `url(${slide.media})` }}
            >
              {/* Layered gradient: fade top & bottom, light global tint */}
              <div className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(to top,   rgba(0,0,0,0.72) 0%, transparent 45%),
                    linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 40%),
                    rgba(0,0,0,0.18)
                  `
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full">
              <video autoPlay muted loop playsInline className="w-full h-full object-cover" src={slide.media} />
              <div className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(to top,   rgba(0,0,0,0.68) 0%, transparent 45%),
                    linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 38%)
                  `
                }}
              />
            </div>
          )}

          {/* Top — title + rule + subtitle */}
          <div className="relative z-10 flex flex-col items-center gap-2 mt-4 animate-fadeInUp">
            {slide.logo ? (
              <img src={slide.logo} alt={slide.title} className="h-10 md:h-12 w-auto object-contain drop-shadow" />
            ) : (
             <h1 className="font-semibold text-[clamp(2.6rem,7vw,5rem)] tracking-tight text-white leading-none">
              {slide.title}
            </h1>
            )}

            {/* Thin accent rule */}
            <span className="block w-10 h-px bg-white/30 mx-auto" />

            <p className="text-[0.7rem] md:text-[0.78rem] font-light tracking-[0.18em] uppercase text-white/60 max-w-[30rem] leading-relaxed animate-fadeInUp animation-delay-100">
              {slide.subtitle}
            </p>
          </div>

          {/* Bottom — pill buttons */}
          <div className="relative z-10 flex flex-row gap-3 justify-center items-center flex-wrap animate-fadeInUp animation-delay-200">
  <a
    href="/tracking"
    className="min-w-[152px] text-center px-6 py-[0.6rem] bg-white text-black font-medium text-[0.7rem] tracking-[0.12em] uppercase rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.32)] hover:bg-zinc-200 hover:shadow-[0_6px_28px_rgba(0,0,0,0.38)] transition-all duration-300 active:scale-95"
  >
    Track Order
  </a>
  <a
    href="https://user.spacexnova.com/"
    className="min-w-[152px] text-center px-6 py-[0.6rem] bg-white/[0.08] text-white font-medium text-[0.7rem] tracking-[0.12em] uppercase rounded-full border border-white/20 backdrop-blur-[12px] hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95"
  >
    Get Started
  </a>
</div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Custom nav arrows */}
  <button className="nav-prev absolute left-5 top-1/2 -translate-y-1/2 z-20 w-[38px] h-[38px] rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-[10px] flex items-center justify-center text-white/75 hover:bg-white/[0.18] hover:border-white/40 transition-all duration-250">
    <ChevronLeft size={16} />
  </button>
  <button className="nav-next absolute right-5 top-1/2 -translate-y-1/2 z-20 w-[38px] h-[38px] rounded-full bg-white/[0.08] border border-white/20 backdrop-blur-[10px] flex items-center justify-center text-white/75 hover:bg-white/[0.18] hover:border-white/40 transition-all duration-250">
    <ChevronRight size={16} />
  </button>

  {/* Custom dot pagination */}
  <div className="custom-pagination absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-[6px] items-center
    [&_.swiper-pagination-bullet]:w-[5px] [&_.swiper-pagination-bullet]:h-[5px] [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-white/35 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-350
    [&_.swiper-pagination-bullet-active]:w-5 [&_.swiper-pagination-bullet-active]:bg-white"
  />
</section>

      {/* Explore the Fleet */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-2">Explore the Fleet</h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light">Designed for efficiency, engineered for extreme performance</p>
          </div>
          
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {fleetSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-[460px] rounded-2xl overflow-hidden group border border-zinc-900 bg-zinc-950/40">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start z-10">
                    {slide.isCybertruck ? (
                      <img 
                        src="https://teslastockspacex.com/wp-content/uploads/2026/01/Asset-1cybertuck-white.svg" 
                        alt="Cybertruck" 
                        className="h-7 mb-2 object-contain"
                      />
                    ) : (
                      <h3 className="text-xl font-medium text-white tracking-tight mb-1">{slide.name}</h3>
                    )}
                    <p className="text-zinc-300 text-xs font-light mb-5 tracking-wide">{slide.price}</p>
                    <div className="flex gap-2.5 w-full">
                      <a href="/tracking" className="flex-1 text-center py-2 bg-white text-black font-medium text-xs rounded-full hover:bg-zinc-200 transition duration-300">
                        Order Now
                      </a>
                      <a href="/about" className="flex-1 text-center py-2 bg-transparent border border-white/30 text-white font-medium text-xs rounded-full backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition duration-300">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-12 bg-[#09090B]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Current Offers Card */}
            <div className="bg-[#141417] border border-zinc-900/80 rounded-2xl overflow-hidden group animate-fadeInUp flex flex-col sm:flex-row h-auto sm:h-[320px] transition-all duration-300 hover:border-zinc-800">
              <div className="w-full sm:w-1/2 h-[220px] sm:h-full relative overflow-hidden">
                <img 
                  src="https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_14_image.jpeg" 
                  alt="Current Offers" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="w-full sm:w-1/2 p-6 flex flex-col justify-center items-start bg-[#141417]">
                <h3 className="text-lg font-medium text-white tracking-tight mb-1.5">Current Offers</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6">Explore flexible, limited-time purchase options on Tesla fleets.</p>
                <a href="#" className="inline-block px-5 py-2 bg-transparent border border-zinc-700 text-zinc-200 text-xs font-medium rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                  Learn More
                </a>
              </div>
            </div>

            {/* American Heroes Card */}
            <div className="bg-[#141417] border border-zinc-900/80 rounded-2xl overflow-hidden group animate-fadeInUp animation-delay-200 flex flex-col sm:flex-row h-auto sm:h-[320px] transition-all duration-300 hover:border-zinc-800">
              <div className="w-full sm:w-1/2 h-[220px] sm:h-full relative overflow-hidden">
                <img 
                  src="https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_15_image.jpeg" 
                  alt="American Heroes" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="w-full sm:w-1/2 p-6 flex flex-col justify-center items-start bg-[#141417]">
                <h3 className="text-lg font-medium text-white tracking-tight mb-1.5">American Heroes</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6">$500 adaptive credit for military, healthcare workers, first responders, and educators.</p>
                <a href="#" className="inline-block px-5 py-2 bg-white text-black text-xs font-medium rounded-full hover:bg-zinc-200 transition-all duration-300">
                  Learn More
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full Self-Driving Section */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-[460px] rounded-2xl overflow-hidden group border border-zinc-900 animate-fadeInUp">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://teslastockspacex.com/wp-content/uploads/2026/01/Homepage-FSD-Desktop.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-lg font-medium text-white tracking-tight mb-3">Full Self-Driving (Supervised)</h3>
                <div className="flex gap-2.5">
                  <a href="/tracking" className="px-5 py-2 bg-[#2563EB] text-white font-medium text-xs rounded-full hover:bg-blue-500 transition duration-300">
                    Order Now
                  </a>
                  <a href="/about" className="px-5 py-2 bg-transparent border border-white/30 text-white font-medium text-xs rounded-full backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition duration-300">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div 
              className="relative h-[460px] rounded-2xl overflow-hidden bg-cover bg-center group border border-zinc-900 animate-fadeInUp animation-delay-200"
              style={{ backgroundImage: 'url(https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_43_image.jpeg)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <h3 className="text-lg font-medium text-white tracking-tight mb-3">Features That Come Standard</h3>
                <a href="/tracking" className="inline-block px-5 py-2 bg-[#2563EB] text-white font-medium text-xs rounded-full hover:bg-blue-500 transition duration-300">
                  Track Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-2">Investment Plans</h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light">Choose the tier structured to match your custom financial milestones</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-16"
          >
            {investmentPlans.map((plan, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-[#141417] border border-zinc-900 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-zinc-800/80">
                  <div 
                    className="h-40 bg-cover bg-center filter brightness-[0.85]"
                    style={{ backgroundImage: `url(${plan.image})` }}
                  ></div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-white tracking-tight mb-1">{plan.name}</h3>
                    <p className="text-zinc-400 text-xs font-light min-h-[32px] mb-4 leading-relaxed">{plan.description}</p>
                    
                    <div className="mb-5 bg-zinc-950/50 p-3 rounded-xl border border-zinc-900/50">
                      <p className="text-2xl font-semibold text-white tracking-tight">{plan.minInvestment}</p>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-medium mt-0.5">Minimum investment requirement</p>
                    </div>

                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5 text-zinc-300 text-xs font-light">
                          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <a href="https://user.spacexnova.com/" className="block w-full text-center px-4 py-2 bg-white text-black font-medium text-xs rounded-full hover:bg-zinc-200 transition-all duration-300">
                      Get Started
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Track Your Tesla Section */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="relative h-[480px] rounded-2xl overflow-hidden border border-zinc-900 animate-fadeInUp">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://teslastockspacex.com/wp-content/uploads/2026/01/Cybertruck-Redefining-Desktop-v2.webm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center md:items-start text-center md:text-left z-10">
              <h3 className="text-2xl font-medium text-white tracking-tight mb-2">Track Your Tesla</h3>
              <p className="text-zinc-300 text-xs font-light mb-6 max-w-md leading-relaxed">Seamlessly monitor assembly status logistics updates from factory line to delivery routing in real-time.</p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a href="/tracking" className="px-6 py-2.5 bg-white text-black font-medium text-xs rounded-full hover:bg-zinc-200 transition duration-300 text-center">
                  Track Now
                </a>
                <a href="/about" className="px-6 py-2.5 bg-transparent border border-white/30 text-white font-medium text-xs rounded-full backdrop-blur-sm hover:bg-white hover:text-black hover:border-white transition duration-300 text-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#09090B]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-2">Frequently Asked Questions</h2>
            <p className="text-zinc-400 text-xs md:text-sm font-light">Essential answers about engineering configs and access systems</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-[#141417]/40 border border-zinc-900/60 rounded-xl transition-all duration-300" open={idx === 0}>
                <summary className="flex justify-between items-center cursor-pointer p-4 list-none select-none">
                  <span className="font-medium text-white text-xs md:text-sm tracking-wide pr-4">{faq.question}</span>
                  <span className="text-zinc-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-45">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-zinc-400 text-xs font-light leading-relaxed border-t border-zinc-900/40 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx>{`
      @keyframes fillBar {
        0% { width: 0%; }
        100% { width: 100%; }
      }
      .animate-loading-bar {
        animation: fillBar 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeInUp {
        animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .animation-delay-100 {
        animation-delay: 0.08s;
      }
      .animation-delay-200 {
        animation-delay: 0.16s;
      }
      .animation-delay-300 {
        animation-delay: 0.24s;
      }
      .swiper-button-next,
      .swiper-button-prev {
        color: rgba(255, 255, 255, 0.8) !important;
        transform: scale(0.65);
        transition: color 0.2s;
      }
      .swiper-button-next:hover,
      .swiper-button-prev:hover {
        color: #ffffff !important;
      }
      .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.3) !important;
        opacity: 1 !important;
        transform: scale(0.8);
        transition: all 0.3s ease;
      }
      .swiper-pagination-bullet-active {
        background: #ffffff !important;
        transform: scale(1.1);
        width: 14px !important;
        border-radius: 4px !important;
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #09090B;
      }
      ::-webkit-scrollbar-thumb {
        background: #27272A;
        border-radius: 20px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #3F3F46;
      }
      `}</style>
    </div>
  );
};

export default LandingPage;