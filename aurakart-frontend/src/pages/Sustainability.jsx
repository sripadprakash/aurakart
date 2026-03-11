import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { FiDroplet, FiSun, FiWind, FiArrowRight, FiCheckCircle, FiGlobe, FiShield, FiX } from 'react-icons/fi';

const FiLeaf = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a8 8 0 0 1-10 10Z"></path>
    <path d="M21 2c-2 2-5 4-8 7"></path>
    <path d="M18 12c-2.5 2.5-6 3.5-10 3.5"></path>
  </svg>
);

const Sustainability = () => {
  const [showEcoModal, setShowEcoModal] = useState(false);
  const ecoProducts = products.filter(p => p.ecoCertified);

  const initiatives = [
    {
      title: "Plastic-Free Packaging",
      desc: "We are on track to eliminate 100% of single-use plastics from our packaging by the end of 2026.",
      icon: <FiLeaf className="text-green-400" />,
      progress: 75
    },
    {
      title: "Renewable Energy",
      desc: "Our global headquarters and fulfillment centers are now 100% powered by solar and wind energy.",
      icon: <FiSun className="text-orange-400" />,
      progress: 100
    },
    {
      title: "Carbon Neutrality",
      desc: "We invest in verified carbon offset projects to neutralize the footprint of every delivery we make.",
      icon: <FiWind className="text-blue-400" />,
      progress: 60
    },
    {
      title: "Ethical Sourcing",
      desc: "100% of our partners must adhere to our strict Code of Conduct regarding labor and environmental impact.",
      icon: <FiShield className="text-purple-400" />,
      progress: 90
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-green-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-emerald-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-green-500/20"
            >
              Our Commitment
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
            >
              Elegance Meeting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Environmental Duty</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              At Aurakart, we believe that premium retail shouldn't come at the expense of our planet. We are building a sustainable future for commerce.
            </motion.p>
          </section>

          {/* Core Initiatives Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {initiatives.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-8 hover:border-green-500/30 transition-all duration-500 group shadow-2xl"
              >
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-1">Target Progress</span>
                    <span className="text-2xl font-black text-white">{item.progress}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-green-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                  />
                </div>
              </motion.div>
            ))}
          </section>

          {/* The Eco-Shell Highlight */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[3rem] overflow-hidden group border border-white/10 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2070" 
                alt="Sustainability" 
                className="w-full h-full object-cover aspect-video group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div className="inline-flex items-center gap-2 text-green-400 text-[10px] font-black tracking-[0.3em] uppercase">
                <FiDroplet /> Material Innovation
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Introducing the <br />
                <span className="text-green-400">Eco-Shell</span> Technology
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-medium">
                Our new mushroom-based packaging is 100% biodegradable and provides 2x more shock absorption for your high-end electronics than traditional plastics.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  "Home Compostable",
                  "Chemical Free",
                  "Zero Waste",
                  "Locally Produced"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-white font-bold text-sm">
                    <FiCheckCircle className="text-green-500" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Global Impact CTA */}
          <section className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <FiGlobe className="text-6xl text-white/20 mb-8" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Small Actions, Global Impact.</h2>
              <p className="text-white/80 text-lg font-medium max-w-2xl mb-10">
                Join our Circular Economy program. Return your old Aurakart devices for recycling and receive credit toward your next purchase.
              </p>
              <button 
                onClick={() => setShowEcoModal(true)}
                className="bg-white text-green-600 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3"
              >
                Shop Eco-Certified <FiArrowRight />
              </button>
            </div>
          </section>

        </main>

        <Footer />
      </div>

      {/* ECO-CERTIFIED MODAL */}
      <AnimatePresence>
        {showEcoModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowEcoModal(false)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative bg-[#0f172a] border border-white/10 w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                    Eco <span className="text-green-400">Certified</span>
                  </h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">
                    {ecoProducts.length} Consciously Crafted Items
                  </p>
                </div>
                <button 
                  onClick={() => setShowEcoModal(false)} 
                  className="w-14 h-14 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all border border-white/10 flex items-center justify-center"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {ecoProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {ecoProducts.length === 0 && (
                  <div className="text-center py-20 opacity-40">
                    <FiLeaf size={64} className="mx-auto mb-6" />
                    <p className="text-xl font-bold uppercase tracking-[0.2em]">Curating new items...</p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-green-500/5 border-t border-white/5 text-center">
                <p className="text-green-400/60 text-[10px] font-black uppercase tracking-[0.3em]">
                  Guaranteed Sustainable Sourcing & Ethical Labor
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sustainability;
