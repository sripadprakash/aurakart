import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiMessageSquare, FiLock, FiUnlock } from 'react-icons/fi';

const DemoDisclaimer = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const scrollRef = useRef(null);

  const handleAccept = () => {
    if (isLocked) return;
    
    // -- VISIT TRACKING LOGIC --
    const visitData = {
      id: Date.now(),
      event: 'DISCLAIMER_ACCEPTED',
      timestamp: new Date().toLocaleString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('aurakart_logs') || '[]');
    existingLogs.push(visitData);
    localStorage.setItem('aurakart_logs', JSON.stringify(existingLogs));
    
    console.log('New Visit Recorded:', visitData);
    // ---------------------------

    setIsVisible(false);
    setTimeout(onAccept, 500);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Check if user has reached the bottom (with a small 5px buffer for rounding)
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
    
    if (isAtBottom) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-[#020617]/80 backdrop-blur-xl px-4 py-8 md:py-12 overflow-y-auto"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl flex flex-col max-h-[90vh]"
          >
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-y-auto custom-scrollbar pr-2 scroll-smooth"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-4 uppercase border border-blue-500/20"
                >
                  <FiInfo className="text-xs" /> Project Presentation
                </motion.div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Demo of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Aurakart Project</span>
                </h1>
              </div>

              <div className="space-y-5 text-gray-400 font-medium text-sm md:text-base leading-relaxed">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <FiAlertTriangle className="text-orange-500" size={20} />
                  </div>
                  <p>
                    <strong className="text-white">Disclaimer:</strong> This is strictly a demonstration project. All products, brands, and imagery shown are not real and are used solely for illustrative purposes. No commercial transactions take place here.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <FiCheckCircle className="text-blue-400" size={20} />
                  </div>
                  <p>
                    <strong className="text-white">Simulated Features:</strong> The payment system, order processing, cart, wishlist, and notification systems (email/SMS) are fully simulated. They demonstrate platform functionality without processing any real payments or data.
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <FiInfo className="text-cyan-400" size={20} />
                  </div>
                  <p>
                    <strong className="text-white">Exploration:</strong> You are welcome to explore all features, including creating test accounts, adding items to the cart, and checking live offers. All features are designed to showcase a modern e-commerce user experience.
                  </p>
                </div>

                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex-shrink-0 mt-1">
                    <FiMessageSquare className="text-purple-400" size={20} />
                  </div>
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">Feedback & Future Projects:</strong> I would love to hear your thoughts. Please share your feedback—what you liked or what could be improved. For real inquiries or future project discussions, you can contact me through the <span className="text-blue-400">“Click here to get in touch”</span> option on the last page.
                  </p>
                </div>
                
                {/* Visual hint to scroll */}
                {isLocked && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-4 text-center text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-bounce"
                  >
                    Scroll down to unlock entry
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={handleAccept}
                disabled={isLocked}
                className={`group relative px-12 py-4 font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500 shadow-xl transform overflow-hidden w-full sm:w-auto text-center flex items-center justify-center gap-3 ${
                  isLocked 
                    ? 'bg-gray-800 text-gray-300 cursor-not-allowed opacity-70 border border-white/10 shadow-none' 
                    : 'bg-white text-black hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-white/5 hover:shadow-blue-600/40'
                }`}
              >
                <span className="relative z-10">
                  {isLocked ? 'Locked (Scroll to Unlock)' : 'Accept & Enter Website'}
                </span>
                {isLocked ? <FiLock className="relative z-10" /> : <FiUnlock className="relative z-10 animate-pulse" />}
                {!isLocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}
              </button>
              
              <p className="mt-6 text-[10px] text-gray-600 font-black uppercase tracking-widest text-center">
                Designed & Built by Sripad Prakash
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoDisclaimer;
