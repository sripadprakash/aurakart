// src/pages/StepIntoFuture.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiStar, FiShield, FiTruck, FiHeart, FiZap, FiX, FiCheckCircle, FiCreditCard, FiMove, FiTarget, FiActivity, FiLayers, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';

const StepIntoFuture = () => {
  const { user, triggerLoginForCheckout, pendingCheckout, setPendingCheckout, syncUserChanges, addOrder } = useAuth();
  const { location, setIsLocationModalOpen, pendingAction, setPendingAction } = useLocation();
  const { addToCart } = useCart();
  
  const [cartTooltip, setCartTooltip] = useState('Add to your');
  const [isAdded, setIsAdded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- WISHLIST SYNC ---
  const isWishlisted = user?.wishlist?.some(item => item.id === 'sneakers-future-1');

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please Log in to save to wishlist');
      triggerLoginForCheckout();
      return;
    }

    const currentWishlist = user.wishlist || [];
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = currentWishlist.filter(item => item.id !== 'sneakers-future-1');
      toast.success('Removed from wishlist');
    } else {
      const newItem = {
        id: 'sneakers-future-1',
        name: 'AuraGlide Boost Sneakers',
        price: 189.99,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop'
      };
      updatedWishlist = [...currentWishlist, newItem];
      toast.success('Added to Wishlist!', { icon: '❤️' });
    }
    syncUserChanges({ wishlist: updatedWishlist });
  };

  // --- AUTO RESUME ---
  useEffect(() => {
    if (user && pendingCheckout) {
      setPendingCheckout(false);
      setShowCheckout(true);
    }
  }, [user, pendingCheckout, setPendingCheckout]);

  useEffect(() => {
    if (location !== 'Select Location' && pendingAction === 'complete-buy') {
      setPendingAction(null);
      setShowCheckout(true); 
      handleCompletePurchase(); 
    }
  }, [location, pendingAction]);

  const handleAddToCart = () => {
    addToCart({
      id: 'sneakers-future-1',
      name: 'AuraGlide Boost Sneakers',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop'
    });
    setCartTooltip('Added to your');
    setIsAdded(true);
    toast.success('Sneakers added to cart!');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to proceed');
      triggerLoginForCheckout();
      return;
    }
    setShowCheckout(true);
  };

  const handleCompletePurchase = () => {
    if (location === 'Select Location') {
      toast.error('Please select a delivery address');
      setShowCheckout(false);
      setPendingAction('complete-buy');
      setIsLocationModalOpen(true);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowCheckout(false);

      // RECORD ORDER
      addOrder({
        total: 189.99,
        items: 1,
        productName: 'AuraGlide Boost Sneakers'
      });

      toast.success('Order Placed! Your future steps are on the way.', {
        icon: '👟',
        duration: 5000,
        style: { borderRadius: '10px', background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
    }, 2500);
  };

  const specs = [
    { label: "Cushioning", value: "AuraGlide Foam 2.0", icon: <FiMove className="text-blue-400" /> },
    { label: "Stability", value: "Carbon Fiber Plate", icon: <FiTarget className="text-cyan-400" /> },
    { label: "Upper", value: "Ultra-Breathable Mesh", icon: <FiActivity className="text-green-400" /> },
    { label: "Weight", value: "Featherlight 180g", icon: <FiZap className="text-yellow-400" /> },
    { label: "Durability", value: "Reinforced Sole", icon: <FiShield className="text-purple-400" /> },
    { label: "Tech", value: "Adaptive Fit Pro", icon: <FiLayers className="text-orange-400" /> },
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden">
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isProcessing && setShowCheckout(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div><h2 className="text-2xl font-black">Secure Checkout</h2><p className="text-gray-400 text-sm font-medium">Limited Edition AuraGlide</p></div>
                {!isProcessing && (<button onClick={() => setShowCheckout(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white"><FiX /></button>)}
              </div>
              <div className="p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=200&auto=format&fit=crop" className="w-16 h-16 rounded-xl object-cover" alt="Sneakers" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">AuraGlide Boost</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <FiMapPin className="text-blue-400" size={12} />
                      <span className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[150px]">{location}</span>
                    </div>
                  </div>
                  <p className="font-black text-lg">$189.99</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-400 font-medium">Total</span><span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">${location === 'Select Location' ? '---' : '189.99'}</span></div>
                </div>
                <button onClick={handleCompletePurchase} disabled={isProcessing} className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${isProcessing ? 'bg-white/10 text-white/30' : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-xl'}`}>
                  {isProcessing ? (<><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" /><span>PROCESSING...</span></>) : (<><FiZap className="text-xl" />{location === 'Select Location' ? 'SELECT ADDRESS' : 'COMPLETE ORDER'}</>)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-cyan-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="flex justify-between items-center mb-8">
            <Link to="/collections" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Collections</span>
            </Link>
            {user && (
              <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold border border-white/10 px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                Logged In as {user.name.split(' ')[0]}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <button onClick={handleWishlistClick} className="absolute top-6 right-6 z-20 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-black/5">
                <FiHeart className={`text-2xl transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-black'}`} />
              </button>
              <img src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop" alt="AuraGlide Sneakers" className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-square" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
              <div>
                <span className="bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-blue-500/30">Limited Edition</span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white text-left leading-tight">Step Into <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">The Future</span></h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-yellow-400"><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /></div>
                  <span className="text-gray-400 font-medium">(1.4k Reviews)</span>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-medium text-left">AuraGlide Boost. High-performance cushioning system designed for gravity-defying comfort and futuristic style in every step.</p>
              <div className="flex items-center gap-6 my-4"><span className="text-5xl font-black text-white">$189.99</span><span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold tracking-widest uppercase">New Release</span></div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <button onClick={handleBuyNow} className="cart-btn !bg-blue-600 !h-16 !rounded-2xl" data-tooltip="Secure">
                    <div className="cart-btn-wrapper">
                      <div className="text uppercase tracking-[0.1em] text-lg font-black flex items-center justify-center">Buy Now</div>
                      <span className="icon flex-col gap-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="24" width="24"><path d="M4 10h16v11H4z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="17" x2="16" y2="17" /></svg>
                        <span className="text-[10px] uppercase font-bold tracking-widest leading-none">Checkout</span>
                      </span>
                    </div>
                  </button>
                </div>
                <div className="flex-1">
                  <button onClick={handleAddToCart} className={`cart-btn !bg-[#f97316] !h-16 !rounded-2xl ${isAdded ? 'is-added' : ''}`} data-tooltip={cartTooltip}>
                    <div className="cart-btn-wrapper">
                      <div className="text uppercase tracking-[0.1em] text-lg font-black flex items-center justify-center">ADD TO CART</div>
                      <span className="icon flex-col gap-1"><svg viewBox="0 0 16 16" fill="currentColor" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg><span className="text-[10px] uppercase font-bold tracking-widest leading-none">BASKET</span></span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <FiShield className="text-blue-400 text-2xl" />
                  <span className="text-sm font-bold text-gray-200">Lifetime Sole Warranty</span>
                </div>
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <FiTruck className="text-cyan-400 text-2xl" />
                  <span className="text-sm font-bold text-gray-200">Express Free Shipping</span>
                </div>
              </div>
            </motion.div>
          </div>

          <section className="mt-24 relative">
            <div className="flex flex-col items-center text-center mb-12">
              <span className="text-blue-500 text-sm font-black tracking-[0.4em] uppercase mb-4 px-4 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">Future Ready</span>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Technical Excellence</h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.4)]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specs.map((spec, idx) => (
                <motion.div key={idx} whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col gap-6 transition-all duration-500 group shadow-2xl">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-3xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">{spec.icon}</div>
                  <div className="text-left"><h4 className="text-blue-400/80 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{spec.label}</h4><p className="text-white text-2xl font-black tracking-tight group-hover:text-blue-400 transition-colors duration-500">{spec.value}</p></div>
                </motion.div>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/5 blur-[180px] -z-10 pointer-events-none rounded-full"></div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default StepIntoFuture;
