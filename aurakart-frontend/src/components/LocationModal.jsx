// src/components/LocationModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMapPin, FiNavigation, FiSearch } from 'react-icons/fi';
import { useLocation } from '../context/LocationContext';
import toast from 'react-hot-toast';

const popularCities = ['New York, NY', 'Los Angeles, CA', 'London, UK', 'Dubai, UAE', 'Mumbai, IN', 'Tokyo, JP'];

const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, updateLocation, location } = useLocation();
  const [inputValue, setInputValue] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      updateLocation(inputValue);
      toast.success(`Delivery updated to ${inputValue}`);
    }
  };

  const handleDetectLocation = () => {
    toast.loading('Detecting location...', { id: 'loc' });
    setTimeout(() => {
      const mockLoc = 'Manhattan, New York';
      updateLocation(mockLoc);
      toast.success(`Detected: ${mockLoc}`, { id: 'loc' });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLocationModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div>
                <h2 className="text-2xl font-black text-white">Select Location</h2>
                <p className="text-gray-400 text-sm font-medium">Where should we deliver your order?</p>
              </div>
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
              >
                <FiX />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Detect Button */}
              <button 
                onClick={handleDetectLocation}
                className="w-full group flex items-center gap-4 p-5 rounded-2xl bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-all text-orange-400"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <FiNavigation />
                </div>
                <div className="text-left">
                  <span className="block font-black text-sm uppercase tracking-widest">Detect My Location</span>
                  <span className="text-xs font-medium opacity-70 italic text-white/60">Uses browser GPS for accuracy</span>
                </div>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0f172a] px-4 text-gray-500 font-bold tracking-[0.3em]">Or enter manually</span></div>
              </div>

              {/* Manual Input */}
              <form onSubmit={handleManualSubmit} className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors">
                  <FiMapPin />
                </div>
                <input 
                  type="text"
                  placeholder="Enter city, state, or zip code..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-24 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-white font-bold placeholder:text-gray-600"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 px-6 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-lg"
                >
                  Apply
                </button>
              </form>

              {/* Popular Regions */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Popular Regions</h4>
                <div className="grid grid-cols-2 gap-3">
                  {popularCities.map((city) => (
                    <button 
                      key={city}
                      onClick={() => { updateLocation(city); toast.success(`Delivery updated to ${city}`); }}
                      className={`text-left p-4 rounded-xl border transition-all text-sm font-bold ${location === city ? 'bg-orange-500/20 border-orange-500 text-orange-400' : 'bg-white/5 border-white/5 hover:border-white/20 text-gray-300'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LocationModal;
