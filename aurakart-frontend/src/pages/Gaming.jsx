import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { FiArrowLeft, FiPlay, FiCpu, FiMonitor, FiZap, FiTarget } from 'react-icons/fi';

const Gaming = () => {
  const gamingProducts = products.filter(p => p.categoryId === 7);

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative bg-[#020617]">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[120px]"></div>
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
              <Link to="/collections" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-xs uppercase tracking-widest">Back to Collections</span>
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-500/20 text-indigo-500">
                  <FiPlay size={32} />
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                  Aura <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Gaming</span>
                </h1>
              </div>
              <p className="text-gray-400 text-lg max-w-xl font-medium">
                Unleash ultimate performance with our elite gaming ecosystem. Built for champions, engineered for victory.
              </p>
            </motion.div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {gamingProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {gamingProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No gaming products found.</p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Gaming;
