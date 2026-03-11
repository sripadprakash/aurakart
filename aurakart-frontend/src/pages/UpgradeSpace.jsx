// src/pages/UpgradeSpace.jsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiStar, FiShield, FiTruck, FiHeart, FiZap, FiX, FiCheckCircle, FiCreditCard, FiMic, FiSpeaker, FiHome, FiWifi, FiLock, FiCpu, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';

const UpgradeSpace = () => {
  const { user, triggerLoginForCheckout, pendingCheckout, setPendingCheckout, syncUserChanges, addOrder } = useAuth();
  const { location, setIsLocationModalOpen, pendingAction, setPendingAction } = useLocation();
  const { addToCart } = useCart();
  
  const [cartTooltip, setCartTooltip] = useState('Add to your');
  const [isAdded, setIsAdded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- WISHLIST SYNC ---
  const isWishlisted = user?.wishlist?.some(item => item.id === 'smart-home-1');

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
      updatedWishlist = currentWishlist.filter(item => item.id !== 'smart-home-1');
      toast.success('Removed from wishlist');
    } else {
      const newItem = {
        id: 'smart-home-1',
        name: 'Aura Home Pro - Smart Assistant',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2000&auto=format&fit=crop'
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
      id: 'smart-home-1',
      name: 'Aura Home Pro - Smart Assistant',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2000&auto=format&fit=crop'
    });
    setCartTooltip('Added to your');
    setIsAdded(true);
    toast.success('Smart Assistant added to cart!');
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
        total: (149.99) + (user?.orders?.length >= 3 ? 1 : 0),
        items: 1,
        productName: 'Aura Home Pro'
      });

      toast.success('Purchase Successful! Your smart home journey begins.', {
        icon: '🏠',
        duration: 5000,
        style: { borderRadius: '10px', background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
    }, 2500);
  };

  const specs = [
    { label: "Voice Control", value: "Aura AI Integration", icon: <FiMic className="text-blue-400" /> },
    { label: "Connectivity", value: "Wi-Fi 6 & Bluetooth 5.2", icon: <FiWifi className="text-cyan-400" /> },
    { label: "Audio", value: "360° Immersive Sound", icon: <FiSpeaker className="text-purple-400" /> },
    { label: "Security", value: "256-bit Encryption", icon: <FiLock className="text-red-400" /> },
    { label: "Automation", value: "Zigbee & Matter Ready", icon: <FiHome className="text-green-400" /> },
    { label: "Hardware", value: "Octa-Core Processing", icon: <FiCpu className="text-yellow-400" /> },
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col relative overflow-hidden">
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isProcessing && setShowCheckout(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <div><h2 className="text-2xl font-black">Secure Checkout</h2><p className="text-gray-400 text-sm font-medium">Smart Living Order</p></div>
                {!isProcessing && (<button onClick={() => setShowCheckout(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white"><FiX /></button>)}
              </div>
              <div className="p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <img src="https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=200&auto=format&fit=crop" className="w-16 h-16 rounded-xl object-cover" alt="Assistant" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">Aura Home Pro</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <FiMapPin className="text-orange-400" size={12} />
                      <span className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[150px]">{location}</span>
                    </div>
                  </div>
                  <p className="font-black text-lg">$149.99</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-gray-400 font-medium">Subtotal</span><span className="font-bold">$149.99</span></div>
                  <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-medium">Shipping</span>
                  <span className={user?.orders?.length >= 3 ? "text-red-400 font-black uppercase text-[10px]" : "text-green-400 font-black uppercase text-[10px]"}>
                    {user?.orders?.length >= 3 ? "Offer expired as used. Shipping: $1.00" : "FREE"}
                  </span>
                </div>
                  <div className="pt-3 border-t border-white/5 flex justify-between items-center"><span className="text-lg font-bold">Total</span><span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">${((149.99) + (user?.orders?.length >= 3 ? 1 : 0)).toFixed(2)}</span></div>
                </div>
                <button onClick={handleCompletePurchase} disabled={isProcessing} className={`w-full py-5 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center gap-3 ${isProcessing ? 'bg-white/10 text-white/30' : 'bg-white text-black hover:bg-orange-500 hover:text-white shadow-xl shadow-orange-500/20'}`}>
                  {isProcessing ? (<><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full" /><span>PROCESSING...</span></>) : (<><FiZap className="text-xl" />{location === 'Select Location' ? 'SELECT ADDRESS' : 'COMPLETE PURCHASE'}</>)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 bg-[#020617] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45rem] h-[45rem] bg-blue-600/10 rounded-full blur-[150px]"></div>
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
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Logged In as {user.name.split(' ')[0]}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <button onClick={handleWishlistClick} className="absolute top-6 right-6 z-20 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border-2 border-black/5">
                <FiHeart className={`text-2xl transition-all duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-black'}`} />
              </button>
              <img src="https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=2070&auto=format&fit=crop" alt="Smart Space" className="relative rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-square" />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
              <div>
                <span className="bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-md text-xs font-bold tracking-widest uppercase mb-4 inline-block border border-orange-500/30">Smart Living</span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white text-left leading-tight">Upgrade Your <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Space</span></h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-yellow-400"><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /><FiStar fill="currentColor" /></div>
                  <span className="text-gray-400 font-medium">(1.2k Reviews)</span>
                </div>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-medium text-left">The ultimate voice-controlled smart assistant. Aura Home Pro brings your space to life with advanced automation and immersive 360° audio.</p>
              <div className="flex items-center gap-6 my-4"><span className="text-5xl font-black text-white">$149.99</span><span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm font-bold tracking-widest uppercase">Special Price</span></div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1"><button onClick={handleBuyNow} className="cart-btn !bg-blue-600 !h-16 !rounded-2xl" data-tooltip="Secure"><div className="cart-btn-wrapper"><div className="text uppercase tracking-[0.1em] text-lg font-black flex items-center justify-center">Buy Now</div><span className="icon flex-col gap-1"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" height="24" width="24"><path d="M4 10h16v11H4z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="17" x2="16" y2="17" /></svg><span className="text-[10px] uppercase font-bold tracking-widest leading-none">Checkout</span></span></div></button></div>
                <div className="flex-1"><button onClick={handleAddToCart} className={`cart-btn !bg-[#f97316] !h-16 !rounded-2xl ${isAdded ? 'is-added' : ''}`} data-tooltip={cartTooltip}><div className="cart-btn-wrapper"><div className="text uppercase tracking-[0.1em] text-lg font-black flex items-center justify-center">ADD TO CART</div><span className="icon flex-col gap-1"><svg viewBox="0 0 16 16" fill="currentColor" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg><span className="text-[10px] uppercase font-bold tracking-widest leading-none">BASKET</span></span></div></button></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8"><div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"><FiShield className="text-orange-400 text-2xl" /><span className="text-sm font-bold text-gray-200">2 Year Pro Warranty</span></div><div className="flex items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"><FiTruck className="text-blue-400 text-2xl" /><span className="text-sm font-bold text-gray-200">Express Free Shipping</span></div></div>
            </motion.div>
          </div>

          <section className="mt-24 relative">
            <div className="flex flex-col items-center text-center mb-12"><span className="text-orange-500 text-sm font-black tracking-[0.4em] uppercase mb-4 px-4 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">Masterpiece Specs</span><h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Technical Excellence</h2><div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)]"></div></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specs.map((spec, idx) => (
                <motion.div key={idx} whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl flex flex-col gap-6 transition-all duration-500 group shadow-2xl">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center text-3xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">{spec.icon}</div>
                  <div className="text-left"><h4 className="text-orange-400/80 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{spec.label}</h4><p className="text-white text-2xl font-black tracking-tight group-hover:text-orange-400 transition-colors duration-500">{spec.value}</p></div>
                </motion.div>
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-orange-600/5 blur-[180px] -z-10 pointer-events-none rounded-full"></div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default UpgradeSpace;
