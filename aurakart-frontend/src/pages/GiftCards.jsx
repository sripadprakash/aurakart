import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiGift, FiSend, FiClock, FiSmartphone, FiArrowRight, FiBell, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const GiftCards = () => {
  const [email, setEmail] = useState('');

  const handleNotify = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Great! We'll notify you the moment Gift Cards go live.", {
        icon: '🔔',
        style: { borderRadius: '10px', background: '#1e293b', color: '#fff' }
      });
      setEmail('');
    }
  };

  const plannedFeatures = [
    {
      title: "Customizable Designs",
      desc: "Choose from a gallery of premium, artist-curated designs or upload your own high-res photo.",
      icon: <FiGift className="text-orange-400" />
    },
    {
      title: "Scheduled Delivery",
      desc: "Pick the exact date and time you want your gift to arrive in their inbox.",
      icon: <FiClock className="text-blue-400" />
    },
    {
      title: "Instant Mobile Redemption",
      desc: "Add cards directly to Apple Wallet or Google Pay for seamless in-store and online use.",
      icon: <FiSmartphone className="text-purple-400" />
    },
    {
      title: "Global Send",
      desc: "Send gifts to friends and family in over 15 countries with automatic currency conversion.",
      icon: <FiSend className="text-cyan-400" />
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-indigo-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Coming Soon Hero */}
          <section className="text-center mb-24 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-6 py-2 rounded-full text-xs font-black tracking-[0.4em] mb-8 uppercase border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
            >
              Coming Soon
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8"
            >
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-indigo-500">Gift Experience</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12"
            >
              We're building a new way to share the world of Aurakart. Premium digital gift cards that feel as high-end as the products they buy.
            </motion.p>

            {/* Notify Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <form onSubmit={handleNotify} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-indigo-600 rounded-2xl blur opacity-20 group-focus-within:opacity-100 transition duration-1000"></div>
                <div className="relative flex bg-[#0f172a] border border-white/10 rounded-2xl p-2 shadow-2xl">
                  <input 
                    required
                    type="email" 
                    placeholder="Enter email for early access" 
                    className="bg-transparent w-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none font-bold text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-white text-black hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    Notify Me <FiBell />
                  </button>
                </div>
              </form>
            </motion.div>
          </section>

          {/* Visual Placeholder */}
          <section className="mb-32 relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
            >
              <img 
                src="https://images.unsplash.com/photo-1549463591-24c18d2bd12a?q=80&w=2070" 
                alt="Gift Card Preview" 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50 flex items-center justify-center">
                <div className="text-center p-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl">
                  <FiGift className="text-6xl text-orange-500 mx-auto mb-6" />
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Designing Perfection</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Launching Spring 2026</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Planned Features */}
          <section className="mb-32">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Planned Features</h2>
              <div className="w-24 h-1 bg-orange-500 mt-4 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plannedFeatures.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-6 hover:border-white/20 transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-black text-white">{feature.title}</h4>
                  <p className="text-gray-400 font-medium text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="bg-white/5 rounded-[3rem] p-12 md:p-20 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">Why give an <br /><span className="text-orange-500">Aurakart Gift?</span></h2>
                <div className="space-y-6">
                  {[
                    "Zero Expiry Dates - Gifts that last a lifetime.",
                    "Instant Delivery - Perfect for last-minute excellence.",
                    "Flexible Spending - Use across all categories and collections.",
                    "Premium Unboxing - Digital cards with a cinematic reveal."
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-4 text-white font-bold">
                      <FiCheckCircle className="text-green-500 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-3xl"></div>
                <div className="relative bg-[#020617] border border-white/10 rounded-[3rem] p-12 flex flex-col items-center gap-8 shadow-2xl">
                  <div className="w-full aspect-video bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="text-[10px] font-black text-white/20 rotate-[-20deg] scale-[2] pointer-events-none uppercase tracking-[1em]">AURAKART</div>
                  </div>
                  <div className="text-center">
                    <p className="text-orange-500 font-black text-[10px] tracking-widest uppercase mb-2">The Golden Card</p>
                    <h4 className="text-2xl font-black text-white">Exclusivity, Gifted.</h4>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default GiftCards;
