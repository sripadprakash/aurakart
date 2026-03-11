import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiArrowLeft, FiShoppingCart, FiStar, FiZap, FiMail, FiCheckCircle, FiSun, FiTruck, FiPackage, FiAward } from 'react-icons/fi';
import toast from 'react-hot-toast';

const GroceryCategory = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    toast.success("You're on the list! Freshness is coming your way.", {
      icon: '🥗',
      style: { borderRadius: '10px', background: '#1e293b', color: '#fff' }
    });
  };

  const features = [
    { title: "Artisan Sourcing", desc: "Direct partnerships with local organic farms for unmatched quality.", icon: <FiAward /> },
    { title: "Eco-Logic Tech", desc: "100% compostable and climate-controlled smart packaging.", icon: <FiPackage /> },
    { title: "Hyper-Local", desc: "Delivery from farm to doorstep in under 60 minutes.", icon: <FiTruck /> },
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-emerald-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-teal-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Link to="/collections" className="inline-flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-xs uppercase tracking-widest">Back to Collections</span>
            </Link>
            
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-emerald-500/20">
              <FiShoppingCart />
              The Aura Market
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
              COMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 animate-pulse">FRESH</span>
            </h1>
            <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
              We're disrupting the supply chain to bring the farm directly to your digital table. Sourcing perfection.
            </p>
          </motion.div>

          {/* Feature Teasers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-24">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 group"
              >
                <div className="text-3xl text-emerald-500 mb-6 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">{f.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Early Access Form */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full max-w-4xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 p-10 opacity-5"><FiShoppingCart size={200} /></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black tracking-tighter mb-6">Reserve Your First Basket</h2>
              <p className="text-gray-300 text-lg mb-10 max-w-lg mx-auto">Be the first to experience zero-waste luxury grocery shopping. Join for a lifetime of free delivery on artisan essentials.</p>
              
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form 
                    key="form"
                    exit={{ opacity: 0, scale: 0.9 }}
                    onSubmit={handleSubscribe} 
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  >
                    <div className="relative flex-grow">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-all font-medium"
                      />
                    </div>
                    <button type="submit" className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-2xl">
                      Get Priority
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 text-emerald-400"
                  >
                    <FiCheckCircle size={48} />
                    <span className="font-black uppercase tracking-widest">You're on the A-List Market</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Philosophy Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 text-center max-w-2xl"
          >
            <div className="flex justify-center text-emerald-500/30 mb-8"><FiStar size={40} /><FiStar size={40} /><FiStar size={40} /></div>
            <p className="text-2xl md:text-3xl font-light italic text-gray-300 leading-relaxed">
              "We're bringing respect back to the harvest, merging ancient agricultural wisdom with ultra-modern logistics."
            </p>
            <div className="mt-8">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">The Aura Agronomy & Sourcing Team</span>
            </div>
          </motion.div>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default GroceryCategory;
