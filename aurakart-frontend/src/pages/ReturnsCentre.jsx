import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiRotateCcw, FiPackage, FiTruck, FiCheckCircle, FiArrowRight, FiInfo, FiSearch, FiAlertCircle, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ReturnsCentre = () => {
  const { user, triggerLoginForCheckout } = useAuth();
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundOrder, setFoundOrder] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is your return policy window?",
      a: "We offer a 30-day return policy for all premium items. Products must be in their original condition, unused, and with all original packaging and tags intact. For certain high-end electronics, the window may be 15 days, which will be noted on the product page."
    },
    {
      q: "Are return shipping labels free?",
      a: "Yes! For all 'Aurakart Gold' members and orders over $500, return shipping is completely free. For other orders, a flat-rate shipping fee of $5.00 will be deducted from your final refund amount."
    },
    {
      q: "Can I exchange an item instead of returning?",
      a: "Absolutely. During the return initiation process, you can select 'Exchange' instead of 'Refund'. If the new item is at a different price point, you will either be charged the difference or receive a partial refund."
    },
    {
      q: "How do I track my return status?",
      a: "Once you drop off your package, you can track its journey back to our warehouse using the tracking link provided in your return confirmation email. You will also receive automated notifications when we receive the package and when your refund is processed."
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to manage returns');
      triggerLoginForCheckout();
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const order = user.orders?.find(o => o.id === orderId.toUpperCase() || o.id.includes(orderId));
      if (order) {
        setFoundOrder(order);
      } else {
        toast.error('Order not found. Please check the ID.');
      }
    }, 1500);
  };

  const handleStartReturn = () => {
    toast.success('Return request initiated. Check your email for the shipping label.');
    setFoundOrder(null);
    setOrderId('');
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-rose-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-orange-500/20"
            >
              Support Center
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
            >
              Hassle-Free <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Returns Centre</span>
            </motion.h1>
            <p className="text-gray-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              Need to return an item? We've made the process simple, fast, and transparent. Enter your order details below to get started.
            </p>
          </section>

          {/* Main Action Area */}
          <div className="max-w-4xl mx-auto mb-32">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0f172a] border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
            >
              {!foundOrder ? (
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white mb-8 text-center">Find Your Order</h3>
                  <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 group">
                      <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Enter Order ID (e.g. ORD-123)" 
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                        className="w-full bg-[#020617] border border-white/10 rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-white font-bold"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSearching}
                      className="bg-white text-black hover:bg-orange-500 hover:text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSearching ? 'Searching...' : 'Search Order'}
                      {!isSearching && <FiArrowRight />}
                    </button>
                  </form>
                  <div className="mt-8 flex items-start gap-4 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <FiInfo className="text-blue-400 mt-1 shrink-0" />
                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                      You can find your Order ID in your confirmation email or in your <button onClick={() => toast.success('Open Your Account to find IDs')} className="text-white underline font-bold">Account History</button>.
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative z-10"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-orange-500 font-black text-[10px] tracking-widest uppercase">Order Found</span>
                      <h3 className="text-3xl font-black text-white mt-1">{foundOrder.id}</h3>
                    </div>
                    <button 
                      onClick={() => setFoundOrder(null)}
                      className="text-gray-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                      Change Order
                    </button>
                  </div>

                  <div className="bg-[#020617] rounded-3xl p-8 border border-white/5 mb-10">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</span>
                        <span className="text-white font-bold">{foundOrder.date}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total</span>
                        <span className="text-white font-bold">${foundOrder.total}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 font-medium mb-8">
                      This order contains <span className="text-white font-bold">{foundOrder.items} item(s)</span> and is eligible for return until <span className="text-green-400 font-bold">March 30, 2026</span>.
                    </p>
                    <button 
                      onClick={handleStartReturn}
                      className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3"
                    >
                      Start Return Process <FiRotateCcw />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-widest justify-center">
                    <FiAlertCircle className="text-orange-500" />
                    Items must be in original condition with all tags attached.
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Process Steps */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">How it Works</h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  step: "01", 
                  title: "Initiate Request", 
                  desc: "Find your order using your Order ID and select the items you wish to return.",
                  icon: <FiSearch />
                },
                { 
                  step: "02", 
                  title: "Pack & Ship", 
                  desc: "Print your prepaid shipping label and drop off the package at any authorized center.",
                  icon: <FiPackage />
                },
                { 
                  step: "03", 
                  title: "Quick Refund", 
                  desc: "Once received and inspected, your refund will be processed within 3-5 business days.",
                  icon: <FiCheckCircle />
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-6 relative group"
                >
                  <span className="absolute top-10 right-10 text-5xl font-black text-white/5 group-hover:text-orange-500/10 transition-colors">{item.step}</span>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl border border-white/10 group-hover:scale-110 transition-transform">
                    <div className="text-orange-400">{item.icon}</div>
                  </div>
                  <h4 className="text-2xl font-black text-white">{item.title}</h4>
                  <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQs Section */}
          <section className="bg-white/5 rounded-[3rem] p-12 md:p-20 border border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl -z-10"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-6 uppercase border border-orange-500/20"
                >
                  Knowledge Base
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">Frequently Asked <br /><span className="text-orange-500">Questions</span></h2>
                <p className="text-gray-400 text-lg font-medium mb-10 leading-relaxed">
                  Everything you need to know about our return process, refunds, and exchanges. Can't find an answer? Our support team is ready to help.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    className={`rounded-3xl border transition-all duration-500 overflow-hidden ${activeFaq === i ? 'bg-orange-500/5 border-orange-500/30' : 'bg-[#020617] border-white/5 hover:border-white/20'}`}
                  >
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full p-6 md:p-8 flex justify-between items-center text-left"
                    >
                      <span className={`text-lg font-bold transition-colors duration-300 ${activeFaq === i ? 'text-white' : 'text-gray-300'}`}>{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeFaq === i ? 'bg-orange-500 text-white rotate-180' : 'bg-white/5 text-gray-500'}`}>
                        <FiArrowRight size={14} />
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                        >
                          <div className="px-8 pb-8 md:px-10 md:pb-10">
                            <div className="w-full h-px bg-white/5 mb-6"></div>
                            <p className="text-gray-400 font-medium leading-relaxed text-base">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
};

export default ReturnsCentre;
