import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------
// LIVE SLIDER DATA
// ----------------------------------------------------------------------
const slides = [
  {
    id: 1,
    badge: "New Arrival",
    title: "Next-Gen Audio Experience",
    subtitle: "Noise-Cancelling Wireless Pro Headphones",
    discount: "Up to 40% OFF",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "Trending Tech",
    title: "Smart Tech on Your Wrist",
    subtitle: "Aura Series 9 Premium Smartwatch",
    discount: "Flat $50 OFF",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "Season Exclusive",
    title: "Elevate Your Daily Style",
    subtitle: "Premium Urban Streetwear Collection",
    discount: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    badge: "Pro Gear",
    title: "Master Your Vision",
    subtitle: "AuraSnap X1 Mirrorless Camera",
    discount: "Save $200 Today",
    image: "/aurasnap-x1.jpg",
  },
  {
    id: 5,
    badge: "Gamer's Choice",
    title: "Unleash Ultimate Power",
    subtitle: "Predator Series Gaming Setup",
    discount: "Up to 25% OFF",
    image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 6,
    badge: "Limited Edition",
    title: "Step Into The Future",
    subtitle: "AuraGlide Boost Sneakers",
    discount: "Members Get 15% OFF",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 7,
    badge: "Smart Living",
    title: "Upgrade Your Space",
    subtitle: "Voice-Controlled Smart Assistant",
    discount: "Starts at $49.99",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 8,
    badge: "Activewear",
    title: "Push Your Limits",
    subtitle: "Seamless Performance Gear",
    discount: "Buy 2 Get 1 Free",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2000&auto=format&fit=crop",
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const navigate = useNavigate();

  // Auto-play the slider (Timer restarts properly if you click an arrow)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(interval);
  }, [current, length]);

  // Stop propagation so clicking arrows doesn't accidentally trigger the banner click
  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const handleBannerClick = () => {
    switch(slides[current].id) {
      case 1: navigate('/audio-experience'); break;
      case 2: navigate('/smart-tech-wrist'); break;
      case 3: navigate('/urban-streetwear'); break;
      case 4: navigate('/product/elec-camera-2'); break;
      case 5: navigate('/unleash-power'); break;
      case 6: navigate('/step-future'); break;
      case 7: navigate('/upgrade-space'); break;
      case 8: navigate('/push-limits'); break;
      default: console.log(`Navigating to collection ${slides[current].id}`);
    }
  };

  return (
    // MADE SECTION LARGER: Changed height to h-[80vh] md:h-[90vh] lg:h-screen
    <section 
      onClick={handleBannerClick}
      className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden bg-[#020617] border-b border-white/10 z-10 cursor-pointer"
    >
      
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Live Background Image */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          ></div>
          
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent"></div>
          
          {/* Slider Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-full flex flex-col justify-center text-left">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-2xl flex flex-col items-start"
            >
              <span className="inline-block px-4 py-1 mb-4 md:mb-6 text-xs md:text-sm font-bold tracking-widest text-blue-400 uppercase border border-blue-400/30 rounded-full bg-blue-400/10 backdrop-blur-md shadow-lg">
                {slides[current].badge}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-2xl tracking-tighter">
                {slides[current].title}
              </h1>
              
              <p className="text-base md:text-xl text-gray-300 mb-2 font-medium drop-shadow-md">
                {slides[current].subtitle}
              </p>
              
              <p className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 md:mb-10 drop-shadow-lg">
                {slides[current].discount}
              </p>

              {/* CLEAN BLUE BUTTON */}
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                Shop Collection
              </button>

            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls (Arrows) */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full backdrop-blur-md text-white border border-white/10 shadow-lg transition-all hover:scale-110"
      >
        <FiChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full backdrop-blur-md text-white border border-white/10 shadow-lg transition-all hover:scale-110"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3 flex-wrap justify-center max-w-[80vw]">
        {slides.map((_, index) => (
          <div 
            key={index} 
            onClick={(e) => { e.stopPropagation(); setCurrent(index); }}
            className={`cursor-pointer transition-all duration-300 rounded-full ${index === current ? 'w-8 md:w-10 bg-blue-500 h-2 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'w-2 bg-white/40 h-2 hover:bg-white/80'}`}
          ></div>
        ))}
      </div>

    </section>
  );
};

export default HeroSlider;