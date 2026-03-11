import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { FiArrowLeft, FiZap, FiPercent } from 'react-icons/fi';

const Deals = () => {
  const dealProducts = products.filter(p => p.originalPrice > p.price);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative bg-[#020617]">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-pink-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-xs uppercase tracking-widest">Back to Home</span>
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-500/20 p-3 rounded-2xl border border-purple-500/20 text-purple-500">
                  <FiZap size={32} />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                  Limited <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Deals</span>
                </h1>
              </div>
              <p className="text-gray-400 text-lg max-w-xl font-medium">
                High-performance gear at unbeatable prices. Grab these exclusive offers before they're gone.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500">
                <FiPercent size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Active Offers</p>
                <p className="text-2xl font-black">{dealProducts.length} Items</p>
              </div>
            </motion.div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {dealProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {dealProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl font-medium">No active deals at the moment. Check back soon!</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Deals;
