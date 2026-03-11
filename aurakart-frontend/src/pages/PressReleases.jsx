import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FiFileText, FiCalendar, FiArrowRight, FiX, FiShare2, FiDownload, FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PressReleases = () => {
  const [selectedRelease, setSelectedOrder] = useState(null);

  const releases = [
    {
      id: "PR-2026-001",
      date: "March 10, 2026",
      category: "Innovation",
      title: "Aurakart Unveils AI-Driven Personalized Shopping Experience",
      excerpt: "The new engine utilizes advanced neural networks to predict consumer needs with 95% accuracy.",
      content: `Today, Aurakart announced the global rollout of its next-generation AI shopping engine, 'AuraSense'. This breakthrough technology represents a three-year investment in machine learning and data science. 

      AuraSense doesn't just recommend products based on past purchases; it understands the context of a user's lifestyle, seasonal needs, and even aesthetic preferences. Early beta testing showed a 40% increase in customer satisfaction scores and a significant reduction in return rates as customers find exactly what they need faster.

      "We are moving beyond the search bar," said the CTO of Aurakart. "AuraSense is about intuitive discovery. It's like having a world-class personal shopper in your pocket."`,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070"
    },
    {
      id: "PR-2026-002",
      date: "February 24, 2026",
      category: "Expansion",
      title: "Aurakart Expands Premium Delivery Network to 10 New European Cities",
      excerpt: "New logistical hubs in Berlin, Paris, and Milan to support sub-24-hour delivery for Prime members.",
      content: `Aurakart continues its rapid global expansion with the opening of ten new high-tech fulfillment centers across Europe. This expansion aims to bring the 'Aurakart Gold' standard of delivery—guaranteed arrival within 24 hours—to millions more customers.

      The new facilities are 100% powered by renewable energy and feature the latest in robotic sorting technology. This move is expected to create over 2,000 new jobs in the region across logistics, engineering, and management roles.

      By localizing our inventory, we not only speed up delivery but significantly reduce the carbon footprint of each shipment.`,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
    },
    {
      id: "PR-2026-003",
      date: "January 15, 2026",
      category: "Partnership",
      title: "Aurakart Partners with Global Sustainability Alliance",
      excerpt: "Committing to a 100% plastic-free packaging initiative by the end of 2026.",
      content: `In a major step toward environmental responsibility, Aurakart has officially joined the Global Sustainability Alliance. As part of this partnership, Aurakart has pledged to eliminate all single-use plastics from its supply chain and packaging by December 2026.

      We are introducing new 'Eco-Shell' packaging—a biodegradable, mushroom-based material that provides superior protection for high-end electronics while being completely compostable at home.

      "Luxury shouldn't come at the cost of our planet," said the CEO. "This is not just a policy; it's a fundamental shift in how we operate."`,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070"
    },
    {
      id: "PR-2025-012",
      date: "December 05, 2025",
      category: "Financial",
      title: "Aurakart Announces Record-Breaking Q4 Growth",
      excerpt: "Revenue surges by 150% YoY as premium consumer demand reaches all-time highs.",
      content: `Aurakart today reported its most successful financial quarter in company history. The results highlight the growing consumer shift toward high-quality, long-lasting premium goods over fast-fashion and disposable electronics.

      Key growth drivers included the 'Smart Living' and 'Pro Audio' categories, which saw unprecedented demand during the holiday season. The company also reported a 200% increase in active 'Aurakart Prime' subscriptions.

      Following these results, the board has approved an increased investment in R&D for 2026 to further cement Aurakart's position as the market leader in premium retail.`,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015"
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden bg-[#020617]">
      {/* Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-cyan-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-blue-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          
          {/* Hero Section */}
          <section className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-cyan-500/20"
            >
              Newsroom
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-8"
            >
              Press <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Releases</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Stay up to date with the latest innovations, partnerships, and global updates from the world of Aurakart.
            </motion.p>
          </section>

          {/* Press Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {releases.map((release, idx) => (
              <motion.div 
                key={release.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#0f172a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 flex flex-col shadow-2xl"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={release.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-black/50 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">
                      {release.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black tracking-[0.2em] mb-4 uppercase">
                    <FiCalendar /> {release.date}
                  </div>
                  <h3 
                    onClick={() => setSelectedOrder(release)}
                    className="text-2xl font-black text-white mb-4 hover:text-cyan-400 transition-colors leading-tight cursor-pointer"
                  >
                    {release.title}
                  </h3>
                  <p className="text-gray-400 font-medium mb-8 line-clamp-2">
                    {release.excerpt}
                  </p>
                  <div className="mt-auto">
                    <button 
                      onClick={() => setSelectedOrder(release)}
                      className="flex items-center gap-3 text-white font-black uppercase tracking-[0.2em] text-xs group/btn"
                    >
                      Read Full Article <FiArrowRight className="text-cyan-400 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Media Contact CTA */}
          <section className="relative bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">Media Inquiries</h2>
              <p className="text-white/80 text-lg font-medium max-w-2xl mb-10">
                Are you a journalist or member of the press? Contact our communications team for assets, interviews, and further information.
              </p>
              <a href="mailto:press@aurakart.com" className="bg-white text-cyan-600 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3">
                Contact Press Office <FiExternalLink />
              </a>
            </div>
          </section>

        </main>

        <Footer />
      </div>

      {/* ARTICLE MODAL */}
      <AnimatePresence>
        {selectedRelease && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedOrder(null)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              className="relative bg-[#0f172a] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="absolute top-6 right-6 z-30">
                <button 
                  onClick={() => setSelectedOrder(null)} 
                  className="w-12 h-12 rounded-full bg-black/50 hover:bg-white text-white hover:text-black transition-all border border-white/10 flex items-center justify-center backdrop-blur-md"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="h-[40vh] w-full relative">
                  <img src={selectedRelease.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="bg-cyan-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 inline-block shadow-xl">
                      {selectedRelease.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                      {selectedRelease.title}
                    </h2>
                  </div>
                </div>

                <div className="p-10 md:p-16">
                  <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Release Date</span>
                        <span className="text-white font-bold">{selectedRelease.date}</span>
                      </div>
                      <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Reference ID</span>
                        <span className="text-white font-bold">{selectedRelease.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    {selectedRelease.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
                        {paragraph.trim()}
                      </p>
                    ))}
                  </div>

                  <div className="mt-16 bg-white/5 rounded-3xl p-8 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <FiFileText size={24} />
                      </div>
                      <p className="text-white font-bold">End of Release</p>
                    </div>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">© 2026 Aurakart Global Communications</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PressReleases;
