import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Header from '../components/Header';
import Footer from '../components/Footer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdown, setSolutionsDropdown] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Show loading screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // --- Loading Screen ---
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen w-full flex flex-col items-center justify-center">
        {/* Exact Tesla Text Logo */}
        <img
              src="https://teslastockspacex.com/wp-content/uploads/2020/10/Asset-4432tesla.png"
              alt="Tesla Stock SpaceX"
              className="h-6 md:h-8 w-auto"
            />
      </div>
    );
  }
  // ----------------------

  const heroSlides = [
    {
      id: 1,
      title: 'Model 3',
      subtitle: 'Lease starting at $329/mo',
      type: 'image',
      media: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_2_image-scaled.jpeg',
    },
    {
      id: 2,
      title: 'Model Y',
      subtitle: 'Lease starting at $399/mo',
      type: 'image',
      media: 'https://teslastockspacex.com/wp-content/uploads/2026/02/image-scaled.avif',
    },
    {
      id: 3,
      title: 'Cybertruck',
      subtitle: 'Better Utility Than a Truck with More Performance Than a Sports Car',
      type: 'video',
      media: 'https://teslastockspacex.com/wp-content/uploads/2026/01/tesla-more-detail-video-showcase-6x4-truckbed.mp4',
      logo: 'https://teslastockspacex.com/wp-content/uploads/2026/01/Asset-1cybertuck-white.svg',
    },
  ];

  const fleetSlides = [
    { id: 1, name: 'Model 3', price: 'Lease starting at $299/mo', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_6_image.jpeg', isCybertruck: false },
    { id: 2, name: 'Model Y', price: 'Lease starting at $349/mo', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_8_image.jpeg', isCybertruck: false },
    { id: 3, name: 'Cybertruck', price: 'Lease starting at $899/mo', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_10_image.jpeg', isCybertruck: true },
    { id: 4, name: 'Model S', price: 'From $71,090', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_12_image.jpeg', isCybertruck: false },
  ];

  const investmentPlans = [
    { name: 'Bronze', description: 'Perfect for getting started with Tesla investment', minInvestment: '$1,000', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_6_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Silver', description: 'Enhanced returns for serious investors', minInvestment: '$15,000', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_8_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Gold', description: 'Premium investment with exclusive benefits', minInvestment: '$50,000', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_12_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Diamond', description: 'Elite tier with maximum returns and VIP treatment', minInvestment: '$100,000', image: 'https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_10_image.jpeg', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
    { name: 'Joint Plan', description: 'Perfect for getting started with joint investors', minInvestment: '$4,000', image: 'https://teslastockspacex.com/wp-content/uploads/2026/02/image-scaled.avif', features: ['Portfolio Access', 'Investment Dashboard', 'Email Support'] },
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
    <div className="bg-[#09090B] text-white font-['Poppins',sans-serif] overflow-x-hidden">
      {/* Header */}
      <Header />

      {/* Hero Carousel */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="h-screen w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                {slide.type === 'image' ? (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.media})` }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                ) : (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src={slide.media}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                  {slide.logo ? (
                    <>
                      <img src={slide.logo} alt="Cybertruck" className="h-16 md:h-20 mb-4" />
                      {/* Show only the logo – no title */}
                    </>
                  ) : (
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fadeInUp">
                      {slide.title}
                    </h1>
                  )}
                  <p className={`mb-50 max-w-2xl animate-fadeInUp animation-delay-100 ${slide.logo ? 'text-[1.2rem]' : 'text-xl md:text-2xl'}`}>
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-200">
                    <a href="/tracking" className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
                      Track Order
                    </a>
                    <a href="https://tesladashboard.vercel.app" className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Explore the Fleet */}
      <section className="py-20 bg-[#09090B]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Explore the Fleet</h2>
            <p className="text-gray-400 text-lg">Designed for efficiency, built for performance</p>
          </div>
          
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {fleetSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative h-[500px] rounded-xl overflow-hidden group">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {slide.isCybertruck ? (
                      <img 
                        src="https://teslastockspacex.com/wp-content/uploads/2026/01/Asset-1cybertuck-white.svg" 
                        alt="Cybertruck" 
                        className="h-12 mb-2"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold mb-1">{slide.name}</h3>
                    )}
                    <p className="text-gray-200 mb-4">{slide.price}</p>
                    <div className="flex gap-3">
                      <a href="/tracking" className="px-4 py-2 bg-[#3B82F6] text-white rounded-full text-sm hover:bg-gray-200 transition">
                        Order Now
                      </a>
                      <a href="/about" className="px-4 py-2 bg-transparent border border-white rounded-full text-white text-sm hover:bg-white hover:text-black transition">
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
      <section className="py-20 bg-[#09090B]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Current Offers Card */}
            <div className="bg-[#18181B] rounded-xl overflow-hidden group animate-fadeInUp flex flex-col md:flex-row h-auto md:h-[400px]">
              {/* Image Section - Left Side */}
              <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden">
                <img 
                  src="https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_14_image.jpeg" 
                  alt="Current Offers" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Text Section - Right Side */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-start bg-[#18181B]">
                <h3 className="text-2xl font-bold mb-2">Current Offers</h3>
                <p className="text-gray-400 mb-6">Explore limited-time offers on Tesla vehicles.</p>
                <a href="#" className="inline-block px-6 py-2 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-black transition">
                  Learn More
                </a>
              </div>
            </div>

            {/* American Heroes Card */}
            <div className="bg-[#18181B] rounded-xl overflow-hidden group animate-fadeInUp animation-delay-200 flex flex-col md:flex-row h-auto md:h-[400px]">
              {/* Image Section - Left Side */}
              <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden">
                <img 
                  src="https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_15_image.jpeg" 
                  alt="American Heroes" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Text Section - Right Side */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-start bg-[#18181B]">
                <h3 className="text-2xl font-bold mb-2">American Heroes</h3>
                <p className="text-gray-400 mb-6">$500 off for military, first responders, healthcare, teachers and students.</p>
                <a href="#" className="inline-block px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition">
                  Learn More
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full Self-Driving Section */}
      <section className="py-20 bg-[#09090B]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[500px] rounded-xl overflow-hidden group animate-fadeInUp">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://teslastockspacex.com/wp-content/uploads/2026/01/Homepage-FSD-Desktop.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-4">Full Self-Driving (Supervised)</h3>
                <div className="flex gap-3">
                  <a href="/tracking" className="px-4 py-2 bg-[#3B82F6] text-white rounded-full hover:bg-gray-200 transition">
                    Order Now
                  </a>
                  <a href="/about" className="px-4 py-2 bg-transparent border border-white rounded-full text-white hover:bg-white hover:text-black transition">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div 
              className="relative h-[500px] rounded-xl overflow-hidden bg-cover bg-center group animate-fadeInUp animation-delay-200"
              style={{ backgroundImage: 'url(https://teslastockspacex.com/wp-content/uploads/2026/01/imgi_43_image.jpeg)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold mb-4">Features That Come Standard</h3>
                <a href="/tracking" className="inline-block px-4 py-2 bg-[#3B82F6] text-white rounded-full hover:bg-gray-200 transition">
                  Track Order
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section className="py-20 bg-[#09090B]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Investment Plans</h2>
            <p className="text-gray-400 text-lg">Choose the plan that fits your investment goals</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {investmentPlans.map((plan, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-[#18181B] rounded-xl overflow-hidden">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${plan.image})` }}
                  ></div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-white">{plan.minInvestment}</p>
                      <p className="text-gray-500 text-sm">minimum investment</p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a href="https://tesladashboard.vercel.app" className="block w-full text-center px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">
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
      <section className="py-20 bg-[#09090B]">
        <div className="container mx-auto px-4">
          <div className="relative h-[500px] rounded-xl overflow-hidden animate-fadeInUp">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://teslastockspacex.com/wp-content/uploads/2026/01/Cybertruck-Redefining-Desktop-v2.webm"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Track Your Tesla</h3>
              <p className="text-gray-200 mb-6 max-w-md">Follow your vehicle's journey from order to delivery in real-time</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <a href="/tracking" className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition inline-block text-center">
                  Track Now
                </a>
                <a href="/about" className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-black transition inline-block text-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#09090B]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-lg">Everything you need to know about Tesla</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-[#18181B] rounded-lg" open={idx === 0}>
                <summary className="flex justify-between items-center cursor-pointer p-5 list-none">
                  <span className="font-semibold text-white">{faq.question}</span>
                  <span className="text-white group-open:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                  <span className="text-white hidden group-open:block">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 text-gray-400">
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
        }
        .swiper-pagination-bullet {
          background: white !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #18181B;
        }
        ::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;