import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiStar, FiShield, FiTruck, FiHeart, FiZap, FiX, FiCheckCircle, FiCpu, FiSmartphone, FiBattery, FiCamera, FiWifi, FiActivity, FiHardDrive, FiMapPin, FiSlash, FiLayout, FiWind } from 'react-icons/fi';
import { FaBatteryFull } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const AuraROGPerformance = () => {
  const { user, triggerLoginForCheckout, syncUserChanges } = useAuth();
  
  const product = {
    id: 'phone-gaming-1',
    name: "Aura ROG Performance (16GB RAM, 512GB)",
    price: 799,
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=400"
  };

  // --- WISHLIST SYNC ---
  const isWishlisted = user?.wishlist?.some(item => item.id === product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please Log in to save to wishlist');
      triggerLoginForCheckout();
      return;
    }

    const currentWishlist = user.wishlist || [];
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
      toast.success('Removed from wishlist');
    } else {
      updatedWishlist = [...currentWishlist, product];
      toast.success('Added to Wishlist!', { icon: '❤️' });
    }
    syncUserChanges({ wishlist: updatedWishlist });
  };

  const specs = [
    { label: "Processor", value: "Aura GameEngine X", icon: <FiCpu className="text-orange-400" /> },
    { label: "Memory", value: "16GB RAM, 512GB", icon: <FiHardDrive className="text-blue-400" /> },
    { label: "Cooling", value: "Active Vapor Chamber", icon: <FiWind className="text-purple-400" /> },
    { label: "Battery", value: "6000 mAh", icon: <FaBatteryFull className="text-green-400" /> },
    { label: "Network", value: "HyperLink 5G", icon: <FiWifi className="text-cyan-400" /> },
    { label: "Warranty", value: "2 Year Pro", icon: <FiShield className="text-red-400" /> },
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden">
      
      <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-rose-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-8">
            <Link to="/category/mobiles" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Mobiles</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative group">
              <div className="absolute -inset-4 bg-purple-500/5 rounded-3xl blur-2xl opacity-20"></div>
              <button onClick={handleWishlistClick} className="absolute top-6 right-6 z-20 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-black/5">
                <FiHeart className={`text-2xl transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-black'}`} />
              </button>
              <div className="absolute inset-0 z-10 bg-black/40 flex items-center justify-center rounded-2xl">
                <div className="bg-red-600 text-white px-8 py-3 rounded-full font-black uppercase tracking-[0.3em] shadow-2xl border border-red-500/50">Out of Stock</div>
              </div>
              <img src={product.image} alt="ROG Performance" className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-square grayscale-[0.5]" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
              <div>
                <span className="bg-purple-500/20 text-purple-400 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-purple-500/30">16GB RAM, 512GB Edition</span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-400 text-left leading-tight">Aura <br /><span className="text-white/50">ROG Performance (16GB RAM, 512GB)</span></h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-yellow-400"><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /></div>
                  <span className="text-gray-400 font-medium">(4.6k Reviews)</span>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-medium text-left">Dedicated gaming phone with active cooling and high-refresh-rate display. The Aura ROG Performance (16GB RAM, 512GB) is built for competitive play and ultimate power.</p>
              <div className="flex items-center gap-6 my-4">
                <span className="text-5xl font-black text-white/50">${product.price}</span>
                <span className="bg-white/5 text-gray-400 px-3 py-1 rounded-full text-sm font-bold tracking-widest uppercase border border-white/10">Currently Unavailable</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button disabled className="flex-1 bg-white/5 border border-white/10 text-gray-500 py-5 rounded-2xl font-black text-lg uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-3">
                  <FiSlash />
                  Out of Stock
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md opacity-50">
                  <FiShield className="text-gray-400 text-2xl" />
                  <span className="text-sm font-bold text-gray-400">2 Year Pro</span>
                </div>
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md opacity-50">
                  <FiTruck className="text-gray-400 text-2xl" />
                  <span className="text-sm font-bold text-gray-400">Standard Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>

          <section className="mt-24 relative opacity-80">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-gray-500 text-sm font-black tracking-[0.4em] uppercase mb-4 px-4 py-1 bg-white/5 rounded-full border border-white/10">Core Specs</span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Technical Specs</h2>
              <div className="w-32 h-1.5 bg-gray-700 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specs.map((spec, idx) => (
                <div key={idx} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col gap-6 group shadow-2xl">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white/5 flex items-center justify-center text-3xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">{spec.icon}</div>
                  <div className="text-left">
                    <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{spec.label}</h4>
                    <p className="text-white text-2xl font-black tracking-tight">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AuraROGPerformance;
