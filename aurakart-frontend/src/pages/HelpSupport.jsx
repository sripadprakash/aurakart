import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiSearch, FiShoppingBag, FiCreditCard, FiTruck, FiUser, FiMessageSquare, FiMail, FiPhone, FiChevronDown, FiArrowRight, FiX, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';

const HelpSupport = () => {
  const { user, triggerLoginForCheckout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [activeFaq, setActiveFaq] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const categories = [
    { id: 'orders', label: 'Orders', icon: <FiShoppingBag /> },
    { id: 'payment', label: 'Payments', icon: <FiCreditCard /> },
    { id: 'shipping', label: 'Shipping', icon: <FiTruck /> },
    { id: 'account', label: 'Account', icon: <FiUser /> },
  ];

  const helpContent = {
    orders: [
      { q: "How do I track my order?", a: "You can track your order in your Account Dashboard under 'Order History'. Each order has a live tracking link once it has been dispatched." },
      { q: "Can I cancel my order?", a: "Orders can be cancelled within 2 hours of placement. After this window, the order enters our automated fulfillment system and cannot be stopped." },
      { q: "What should I do if an item is missing?", a: "Please contact our support team within 48 hours of delivery with your Order ID and a photo of the received package." }
    ],
    payment: [
      { q: "Which payment methods do you accept?", a: "We accept all major credit cards (Visa, Mastercard, AMEX), PayPal, and Apple Pay for a seamless checkout experience." },
      { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard SSL encryption and never store your full credit card details on our servers." },
      { q: "How do refunds work?", a: "Refunds are processed back to your original payment method within 5-10 business days after we receive your returned item." }
    ],
    shipping: [
      { q: "What are your shipping rates?", a: "We offer free delivery on your first 3 orders. After that, a flat $1.00 charge applies to standard orders. Premium shipping is available for $15.00." },
      { q: "Do you ship internationally?", a: "Currently, we ship to over 15 countries. You can check availability during the checkout process when entering your address." },
      { q: "How long does delivery take?", a: "Standard shipping typically takes 3-5 business days. Express delivery takes 1-2 business days depending on your location." }
    ],
    account: [
      { q: "How do I reset my password?", a: "Click on 'Your Account' in the footer, then select 'Login'. You'll see a 'Forgot Password' link below the input fields." },
      { q: "How do I update my email?", a: "For security reasons, email updates must be handled through our support team. Please send us a request via the contact form below." },
      { q: "What is Aurakart Prime?", a: "Aurakart Prime is our loyalty program offering permanent free shipping, early access to new drops, and exclusive seasonal discounts." }
    ]
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login");
      triggerLoginForCheckout();
      return;
    }
    toast.success("Message sent! Our team will get back to you within 24 hours.");
    setShowContactModal(false);
  };

  const allHelpItems = Object.keys(helpContent).flatMap(cat => 
    helpContent[cat].map(item => ({ ...item, category: cat }))
  );

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : allHelpItems.filter(item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const isSearching = searchQuery.trim() !== '';

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-indigo-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-blue-500/20"
            >
              Support Center
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
            >
              How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">help you?</span>
            </motion.h1>
            
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
              <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl flex items-center px-6 py-5 shadow-2xl">
                <FiSearch className="text-gray-500 mr-4 text-xl" />
                <input 
                  type="text" 
                  placeholder="Search for help topics, orders, or policies..." 
                  className="bg-transparent w-full text-white placeholder-gray-500 focus:outline-none font-bold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Categories & FAQs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
            
            {/* Sidebar Tabs */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 px-4">Browse Categories</h3>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveTab(cat.id); setActiveFaq(null); }}
                  className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-300 group ${activeTab === cat.id ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xl transition-transform duration-300 ${activeTab === cat.id ? 'scale-110' : 'group-hover:scale-110'}`}>{cat.icon}</span>
                    <span className="font-bold tracking-wide">{cat.label}</span>
                  </div>
                  <FiArrowRight className={`transition-all duration-300 ${activeTab === cat.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                </button>
              ))}

              <div className="mt-12 p-8 bg-indigo-600/10 border border-indigo-500/20 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -z-10 group-hover:bg-indigo-500/20 transition-colors"></div>
                <h4 className="text-white font-black mb-2 tracking-tight">Need direct help?</h4>
                <p className="text-indigo-300/80 text-sm font-medium mb-6">Our experts are standing by to assist you with any inquiries.</p>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-white text-indigo-600 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all active:scale-95"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSearching ? 'search' : activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`h-8 w-1.5 rounded-full ${isSearching ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                    <h2 className="text-3xl font-black text-white tracking-tight capitalize">
                      {isSearching ? `Search Results (${searchResults.length})` : `${activeTab} Assistance`}
                    </h2>
                  </div>

                  {(isSearching ? searchResults : helpContent[activeTab]).map((item, idx) => (
                    <div 
                      key={`${isSearching ? 'search' : activeTab}-${idx}`}
                      className={`rounded-[2rem] border transition-all duration-500 overflow-hidden ${activeFaq === idx ? 'bg-white/5 border-white/20' : 'bg-[#0f172a] border-white/5 hover:border-white/10'}`}
                    >
                      <button 
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full p-8 flex justify-between items-center text-left group"
                      >
                        <div>
                          {isSearching && (
                            <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-2">{item.category}</span>
                          )}
                          <span className={`text-lg font-bold transition-colors duration-300 ${activeFaq === idx ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{item.q}</span>
                        </div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${activeFaq === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-white/5 text-gray-500'}`}>
                          <FiChevronDown size={20} />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                          >
                            <div className="px-8 pb-8">
                              <div className="w-full h-px bg-white/5 mb-6"></div>
                              <p className="text-gray-400 font-medium leading-relaxed text-base">
                                {item.a}
                              </p>
                              <div className="mt-8 flex gap-4">
                                <button onClick={() => toast.success("Glad we could help!")} className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-green-500/20 hover:text-green-400 px-4 py-2 rounded-lg border border-white/5 transition-all">Was this helpful?</button>
                                <button onClick={() => setShowContactModal(true)} className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 px-4 py-2 rounded-lg border border-white/5 transition-all">Still need help?</button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {isSearching && searchResults.length === 0 && (
                    <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                      <p className="text-gray-500 font-bold uppercase tracking-widest">No matching help topics found</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-blue-400 font-black text-xs uppercase tracking-widest hover:underline"
                      >
                        Clear Search
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Contact Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <FiMessageSquare />, title: "Live Chat", value: "Available 24/7", color: "text-green-400", action: () => toast.success("Live chat connecting...") },
              { icon: <FiMail />, title: "Email Support", value: "support@aurakart.com", color: "text-blue-400", action: () => setShowContactModal(true) },
              { icon: <FiPhone />, title: "Phone Support", value: "+1 (800) AURA-KRT", color: "text-purple-400", action: () => toast.success("Requesting callback...") }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                onClick={item.action}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-4 backdrop-blur-md cursor-pointer hover:bg-white/10 transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-2xl border border-white/10 ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-black text-white mb-1">{item.title}</h4>
                  <p className="text-gray-400 font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </section>

        </main>

        <Footer />
      </div>

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowContactModal(false)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-blue-600/5">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">Contact <span className="text-blue-400">Support</span></h2>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Average Response: 2 Hours</p>
                </div>
                <button onClick={() => setShowContactModal(false)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all border border-white/10 flex items-center justify-center"><FiX /></button>
              </div>

              <form onSubmit={handleContactSubmit} className="p-8 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Name</label>
                    <input required type="text" className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all text-white font-bold" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Order ID</label>
                    <input type="text" className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all text-white font-bold" placeholder="Optional" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Subject</label>
                  <select className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all text-white font-bold appearance-none">
                    <option>General Inquiry</option>
                    <option>Order Issue</option>
                    <option>Payment/Refund</option>
                    <option>Product Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Message</label>
                  <textarea required rows="4" className="w-full bg-[#020617] border border-white/10 rounded-xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all text-white font-bold resize-none" placeholder="Describe your issue..."></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3">
                  Send Message <FiCheckCircle />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpSupport;
