import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import TrendingCarousel from '../components/TrendingCarousel';
import Footer from '../components/Footer';
import { categories, products } from '../data/products';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiClock, FiZap, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------
// COUNTDOWN TIMER COMPONENT
// ----------------------------------------------------------------------
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3">
      {[
        { label: 'HRS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEC', value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 w-12 h-12 rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-xl font-black text-white tabular-nums">
              {item.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] font-black text-gray-400 mt-1 tracking-widest">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ----------------------------------------------------------------------
// ANIMATED STAR SVG FOR YOUR BUTTON
// ----------------------------------------------------------------------
const StarSVG = ({ className }) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53">
      <g id="Layer_x0020_1">
        <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.05,-407.78z"></path>
      </g>
    </svg>
  </div>
);

// ----------------------------------------------------------------------
// MAIN HOME COMPONENT
// ----------------------------------------------------------------------
const Home = () => {
  const { user } = useAuth();

  const handleClaimOffer = () => {
    if (!user) {
      toast.error('Please log in first.');
      return;
    }

    const orderCount = user.orders?.length || 0;

    if (orderCount >= 3) {
      toast.error('Offer expired as used.');
    } else {
      const remaining = 3 - orderCount;
      toast.success(`Free delivery offer available – ${remaining} left`);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[45rem] h-[45rem] bg-blue-600/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen pt-16 md:pt-20">
        <Navbar />
        <HeroSlider />

        {/* 1. Explore Categories */}
        <section 
          className="w-full relative py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url("/categories.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
          }}
        >
          <div className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm z-0 pointer-events-none"></div>
          
          {/* Decorative Background Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
            
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 w-full gap-8">
              
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-6 uppercase border border-blue-500/20"
                >
                  Premium Collections
                </motion.span>
                
                <div className="flex flex-col gap-3">
                  <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
                    Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Categories</span>
                  </h2>
                  <p className="text-gray-400 font-medium max-w-xl text-base md:text-lg tracking-wide">
                    Discover a curated world of high-end essentials and lifestyle upgrades
                  </p>
                </div>
              </div>

              <div className="hidden lg:block">
                <Link to="/collections">
                  <button className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md">
                    <span className="text-white font-bold uppercase tracking-widest text-xs">View All Collections</span>
                    <FiArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
              {categories.slice(0, 6).map((cat, idx) => (
                <Link to={`/category/${cat.name.toLowerCase()}`} key={cat.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-6 cursor-pointer backdrop-blur-2xl transition-all duration-500 hover:border-orange-500/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)]"
                  >
                    {/* Floating Icon Container */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative z-10 bg-gradient-to-br from-white/10 to-transparent p-6 rounded-3xl text-white shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-4xl drop-shadow-2xl">{cat.icon}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-black text-gray-200 group-hover:text-white tracking-widest uppercase transition-colors">{cat.name}</span>
                      <div className="w-0 group-hover:w-8 h-1 bg-orange-500 rounded-full transition-all duration-500"></div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/10 group-hover:bg-orange-500 transition-colors"></div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-12 lg:hidden flex justify-center w-full">
              <Link to="/collections">
                <button className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md">
                  <span className="text-white font-bold uppercase tracking-widest text-xs">View All Collections</span>
                  <FiArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

          </div>
        </section>

        {/* 2. Featured Deals */}
        <section 
          className="w-full relative py-20 md:py-28 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url("/deals.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
          }}
        >
          <div className="absolute inset-0 bg-[#020617]/90 z-0 pointer-events-none"></div>
          
          {/* Animated Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/5 blur-[150px] -z-10 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
            
            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 w-full gap-8">
              
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-6 uppercase shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                >
                  <FiZap className="animate-pulse" />
                  Flash Sale Ending Soon
                </motion.div>
                
                <div className="flex flex-col gap-3">
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Deals</span>
                  </h2>
                  <p className="text-gray-400 font-medium max-w-xl text-lg tracking-wide">
                    Curated selection of high-performance gear at unbeatable prices
                  </p>
                </div>
              </div>

              {/* Countdown Timer Integration */}
              <div className="flex flex-col items-center lg:items-end gap-4 bg-white/5 p-6 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">Hurry! Offer Ends In:</span>
                <CountdownTimer />
              </div>

            </div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full"
            >
              {products
                .filter(product => product.originalPrice > product.price)
                .slice(0, 4)
                .map((product) => (
                <div key={product.id} className="relative group">
                  {/* Decorative Glow for each card */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>

            {/* Bottom Call to Action */}
            <div className="mt-20 flex justify-center">
              <Link to="/deals">
                <button className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-2xl transition-all duration-300 backdrop-blur-md">
                  <span className="text-white font-black uppercase tracking-[0.2em] text-sm">View All Limited Deals</span>
                  <FiArrowRight className="text-pink-500 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>
            </div>

          </div>
        </section>

        {/* 3. Promotional Banner */}
        <section 
          className="w-full relative py-16 md:py-20 flex flex-col items-center justify-center"
          style={{
            backgroundImage: 'url("/deliver.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
          }}
        >
          <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm z-0 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
              
              <span className="inline-block px-5 py-2 mb-6 text-sm font-bold tracking-widest text-gray-200 uppercase border border-white/20 rounded-full bg-white/10 backdrop-blur-md shadow-lg">
                Limited Time Offer
              </span>
              
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow-2xl tracking-tight">
                Free Delivery on your first <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">3 orders!</span>
              </h2>
              
              <p className="text-lg md:text-xl text-gray-200 mb-10 font-medium drop-shadow-md max-w-2xl">
                Experience lightning-fast, secure delivery directly to your doorstep with Aurakart Prime. No hidden fees.
              </p>
              
              <button onClick={handleClaimOffer} className="star-btn">
                Claim Offer Now
                <StarSVG className="star-1" />
                <StarSVG className="star-2" />
                <StarSVG className="star-3" />
                <StarSVG className="star-4" />
                <StarSVG className="star-5" />
                <StarSVG className="star-6" />
              </button>
              
          </div>
        </section>

        {/* 4. Trending Now & Features */}
        <section className="w-full relative py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
          {/* Modern Background Accents */}
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-600/5 rounded-full blur-[150px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-600/5 rounded-full blur-[150px] -z-10"></div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
            
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 w-full gap-8">
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-6 uppercase"
                >
                  Market Favorites
                </motion.span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                    Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Now</span>
                  </h2>
                  <p className="text-gray-400 font-medium max-w-xl text-lg tracking-wide mt-2">
                    Discover the products that are defining modern living this season.
                  </p>
                </div>
              </div>

              <div className="hidden md:block">
                <Link to="/collections">
                  <button className="group flex items-center gap-3 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 px-8 py-4 rounded-2xl transition-all duration-500 backdrop-blur-md">
                    <span className="text-white font-bold uppercase tracking-widest text-xs">Explore All</span>
                    <FiArrowRight className="text-blue-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </button>
                </Link>
              </div>

            </div>

            {/* The Trending Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <TrendingCarousel products={products} />
            </motion.div>

            {/* INTEGRATED FEATURES SECTION */}
            <div className="mt-24 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <FiTruck size={24} />, title: user?.orders?.length >= 3 ? 'Standard Shipping' : 'Free Shipping', color: 'text-blue-400', bg: 'bg-blue-400/5' },
                  { icon: <FiShield size={24} />, title: 'Secure Payment', color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
                  { icon: <FiRefreshCw size={24} />, title: 'Easy Returns', color: 'text-cyan-400', bg: 'bg-cyan-400/5' },
                  { icon: <FiHeadphones size={24} />, title: '24/7 Support', color: 'text-blue-500', bg: 'bg-blue-500/5' }
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`${feature.bg} ${feature.color} p-4 rounded-2xl`}>
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-gray-200 text-sm tracking-wide uppercase">{feature.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Footer */}
        <div className="relative z-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
