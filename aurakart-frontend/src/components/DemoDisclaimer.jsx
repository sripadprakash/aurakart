import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiInfo, FiMessageSquare, FiLock, FiUnlock } from 'react-icons/fi';

const DemoDisclaimer = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const scrollRef = useRef(null);

  // Robust check for scrollability and initial state
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
        // If content fits without scrolling OR we are already at the bottom
        const isActuallyScrollable = scrollHeight > clientHeight + 10;
        const isAlreadyAtBottom = scrollTop + clientHeight >= scrollHeight - 20;

        if (!isActuallyScrollable || isAlreadyAtBottom) {
          setIsLocked(false);
        }
      }
    };

    // Check multiple times to ensure layout has settled
    const timer1 = setTimeout(checkScrollable, 100);
    const timer2 = setTimeout(checkScrollable, 500);
    const timer3 = setTimeout(checkScrollable, 1000);
    
    window.addEventListener('resize', checkScrollable);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  const handleAccept = () => {
    if (isLocked) return;
    
    // -- VISIT TRACKING LOGIC --
    try {
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
    } catch (e) {
      console.warn('Could not save visit log:', e);
    }
    // ---------------------------

    setIsVisible(false);
    setTimeout(onAccept, 500);
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    
    // Check if content is actually scrollable
    const isActuallyScrollable = scrollHeight > clientHeight + 10;
    
    if (!isActuallyScrollable) {
      setIsLocked(false);
      return;
    }

    // Dynamic lock/unlock: Only unlock when at the very bottom (with small buffer)
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
    
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] md:bg-[#020617]/90 backdrop-blur-xl px-4 py-6 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl flex flex-col max-h-[85vh] z-[101]"
          >
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 scroll-smooth"
              data-lenis-prevent
              style={{ 
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch' 
              }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] mb-4 uppercase border border-blue-500/20">
                  <FiInfo className="text-xs" /> Project Presentation
                </div>
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
                    <strong className="text-white">Feedback & Future Projects:</strong> I would love to hear your thoughts. Please share your feedback—what you liked or what could be improved. For real inquiries or future project discussions, you can contact me through the <span className="text-blue-400">“Get in touch”</span> section.
                  </p>
                </div>
                
                {isLocked && (
                  <div className="py-4 text-center text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] animate-bounce">
                    Scroll down to unlock entry
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
              <button
                onClick={handleAccept}
                disabled={isLocked}
                className={`group relative px-12 py-4 font-black uppercase tracking-[0.2em] text-xs rounded-2xl transition-all duration-500 shadow-xl transform w-full sm:w-auto text-center flex items-center justify-center gap-3 ${
                  isLocked 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-70 border border-white/10' 
                    : 'bg-white text-black hover:bg-blue-600 hover:text-white hover:-translate-y-1 shadow-white/5 hover:shadow-blue-600/40'
                }`}
              >
                <span className="relative z-10">
                  {isLocked ? 'Locked (Scroll to Unlock)' : 'Accept & Enter Website'}
                </span>
                <div className="relative z-10 flex items-center justify-center">
                  {isLocked ? <FiLock size={18} /> : <FiUnlock size={22} className="text-green-500" />}
                </div>
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
