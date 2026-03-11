import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { categories, products } from '../data/products';
import { 
  FiSearch, FiArrowRight, FiGrid, FiList, FiFilter, 
  FiTrendingUp, FiStar, FiZap, FiPackage, FiInfo,
  FiShoppingBag, FiCheckCircle, FiArrowLeft
} from 'react-icons/fi';

const Collections = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Premium', 'New Arrival', 'Best Value', 'Trending'];

  const filteredCategories = useMemo(() => {
    return categories
      .filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'All' || 
          (selectedTag === 'Trending' && cat.trending) ||
          (selectedTag === 'New Arrival' && cat.new) ||
          (selectedTag === 'Premium' && cat.count < 20); // Just a mock condition
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        if (sortBy === 'az') return a.name.localeCompare(b.name);
        if (sortBy === 'za') return b.name.localeCompare(a.name);
        if (sortBy === 'items') return b.count - a.count;
        return 0;
      });
  }, [searchQuery, sortBy, selectedTag]);

  // Mock function to get popular items for a category
  const getPopularItems = (catId) => {
    return products.filter(p => p.categoryId === catId).slice(0, 2);
  };

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative bg-[#020617]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-orange-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-xs uppercase tracking-widest">Back to Home</span>
            </Link>
          </motion.div>
          
          {/* 1. HERO SECTION WITH STATS */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-8 uppercase border border-orange-500/20">
                <FiZap className="animate-pulse" />
                Curated Ecosystem
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Aurakart</span><br />
                Collections
              </h1>
              <p className="text-gray-400 text-xl max-w-lg font-medium leading-relaxed">
                Explore our expansive universe of premium products. From cutting-edge tech to urban fashion, find exactly what fits your vibe.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Active Categories', value: categories.length, icon: <FiGrid /> },
                { label: 'Total Products', value: '2.4k+', icon: <FiPackage /> },
                { label: 'Daily Arrivals', value: '150+', icon: <FiTrendingUp /> },
                { label: 'Verified Sellers', value: '45', icon: <FiCheckCircle /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
                  <div className="text-orange-500 mb-4 text-xl">{stat.icon}</div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3. CATEGORIES DISPLAY */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" 
                : "flex flex-col gap-4"
              }
            >
              {categories.map((cat, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={cat.id}
                  whileHover={viewMode === 'grid' ? { scale: 1.05, y: -10 } : { x: 10 }}
                  className={`group relative bg-white/5 border border-white/10 rounded-[2.5rem] transition-all duration-500 hover:border-orange-500/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] backdrop-blur-2xl cursor-pointer ${
                    viewMode === 'grid' ? 'p-8 flex flex-col items-center justify-center gap-6' : 'p-6 flex items-center justify-between'
                  }`}
                >
                  {/* Floating Icon Container */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className={`relative z-10 bg-gradient-to-br from-white/10 to-transparent rounded-3xl text-white shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === 'grid' ? 'p-6 text-4xl' : 'p-3 text-2xl'
                    }`}>
                      <span className="drop-shadow-2xl">{cat.icon}</span>
                    </div>
                  </div>
                  
                  <div className={`flex flex-col items-center gap-1 ${viewMode === 'grid' ? '' : 'flex-grow ml-6 !items-start'}`}>
                    <span className="text-sm font-black text-gray-200 group-hover:text-white tracking-widest uppercase transition-colors">
                      {cat.name}
                    </span>
                    {viewMode === 'grid' && <div className="w-0 group-hover:w-8 h-1 bg-orange-500 rounded-full transition-all duration-500"></div>}
                  </div>

                  {viewMode === 'list' && (
                    <FiArrowRight className="text-gray-600 group-hover:text-orange-500 group-hover:translate-x-2 transition-all" />
                  )}

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/10 group-hover:bg-orange-500 transition-colors"></div>
                  
                  <Link to={`/category/${cat.name.toLowerCase()}`} className="absolute inset-0 z-20" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Collections;
