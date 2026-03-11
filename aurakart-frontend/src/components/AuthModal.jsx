// src/components/AuthModal.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiLock, FiUser, FiArrowRight, FiLogOut, FiShoppingBag, FiHeart, FiChevronLeft, FiTrash2, FiClock } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, user, logout, syncUserChanges } = useAuth();
  const { addToCart } = useCart();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [view, setView] = useState('profile'); // 'profile', 'orders', 'orderDetail', 'wishlist'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // RESET VIEW ON MODAL CLOSE
  useEffect(() => {
    if (!isAuthModalOpen) {
      setTimeout(() => {
        setView('profile');
        setSelectedOrder(null);
      }, 300); // Wait for exit animation
    }
  }, [isAuthModalOpen]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setView('orderDetail');
  };

  const handleBackToOrders = () => {
    setView('orders');
    setSelectedOrder(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = toast.loading(isLoginTab ? 'Authenticating...' : 'Creating Account...');
    setTimeout(() => {
      if (isLoginTab) {
        const result = login(formData.email, formData.password);
        if (result.success) {
          toast.success('Welcome back!', { id });
        } else {
          toast.dismiss(id);
          if (result.errorType === 'NEW_USER') {
            toast.error(result.message, { duration: 4000 });
            setTimeout(() => setIsLoginTab(false), 1000);
          } else {
            toast.error(result.message, { duration: 4000 });
          }
        }
      } else {
        const result = register(formData.name, formData.email, formData.password);
        if (result.success) {
          toast.success('Account created! You can now login.', { id });
          setIsLoginTab(true);
        } else {
          toast.error(result.message, { id });
        }
      }
    }, 1000);
  };

  const removeFromWishlist = (id) => {
    const updated = user.wishlist.filter(item => item.id !== id);
    syncUserChanges({ wishlist: updated });
    toast.success('Removed from wishlist');
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAuthModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#0f172a] border border-white/10 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl">
            
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-6 right-6 z-30 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white"><FiX size={20} /></button>

            {user ? (
              <div className="p-8">
                {/* Back Button for sub-views */}
                {view !== 'profile' && (
                  <button 
                    onClick={view === 'orderDetail' ? handleBackToOrders : () => setView('profile')} 
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors font-bold text-xs uppercase tracking-widest"
                  >
                    <FiChevronLeft /> {view === 'orderDetail' ? 'Back to Orders' : 'Back to Profile'}
                  </button>
                )}

                {view === 'profile' && (
                  <div className="text-center flex flex-col items-center gap-8 py-4">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-orange-500/20 rounded-full blur-xl"></div>
                      <div className="relative w-24 h-24 rounded-full border-4 border-orange-500/20 p-1 bg-white/5 flex items-center justify-center text-orange-500"><MdAccountCircle size={80} /></div>
                    </div>
                    <div><h2 className="text-3xl font-black text-white">{user.name}</h2><p className="text-gray-400 font-medium">{user.email}</p></div>
                    <div className="w-full space-y-3 pt-4 border-t border-white/5">
                      <button onClick={() => setView('orders')} className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white border border-white/5 group">
                        <div className="flex items-center gap-4"><FiShoppingBag className="text-orange-500 text-xl" /><span className="font-bold">Order History</span></div>
                        <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button onClick={() => setView('wishlist')} className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-white border border-white/5 group">
                        <div className="flex items-center gap-4"><FiHeart className="text-pink-500 text-xl" /><span className="font-bold">My Wishlist</span></div>
                        <FiArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                      <button onClick={() => { logout(); setIsAuthModalOpen(false); toast.success('Logged out'); }} className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition-all text-red-400 border border-red-500/20 mt-6"><FiLogOut className="text-lg" /><span className="font-black uppercase tracking-[0.2em] text-xs">Sign Out</span></button>
                    </div>
                  </div>
                )}

                {view === 'orders' && (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-left">
                    <h3 className="text-xl font-black text-white mb-6">Order History</h3>
                    {!user.orders || user.orders.length === 0 ? (
                      <div className="text-center py-10 opacity-40">
                        <FiClock size={48} className="mx-auto mb-4" />
                        <p className="font-bold uppercase tracking-widest text-xs">No orders yet</p>
                      </div>
                    ) : (
                      user.orders.map(order => (
                        <button 
                          key={order.id} 
                          onClick={() => handleOrderClick(order)}
                          className="w-full bg-white/5 p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:bg-white/10 transition-colors group"
                        >
                          <div className="text-left">
                            <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{order.id}</p>
                            <p className="font-bold text-white text-sm">{order.date}</p>
                            <p className="text-xs text-gray-400">{order.items} item(s)</p>
                          </div>
                          <div className="text-right flex items-center gap-4">
                            <div>
                              <p className="font-black text-white">${order.total}</p>
                              <span className="text-[8px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md font-bold uppercase">{order.status}</span>
                            </div>
                            <FiArrowRight className="text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}

                {view === 'orderDetail' && selectedOrder && (
                  <div className="space-y-6 text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-black text-white">Order Details</h3>
                        <p className="text-orange-500 font-black text-[10px] tracking-widest uppercase mt-1">{selectedOrder.id}</p>
                      </div>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {selectedOrder.status}
                      </span>
                    </div>

                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                        <span className="text-gray-400 font-medium tracking-tight">Order Date</span>
                        <span className="text-white font-bold">{selectedOrder.date}</span>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Payment Summary</p>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Items ({selectedOrder.items})</span>
                          <span className="text-white font-bold">${(selectedOrder.total - (selectedOrder.shipping || 0)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Shipping</span>
                          <span className={`font-bold ${selectedOrder.shipping > 0 ? 'text-white' : 'text-green-400'}`}>
                            {selectedOrder.shipping > 0 ? `$${selectedOrder.shipping.toFixed(2)}` : 'FREE'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-white/10">
                          <span className="text-lg font-black text-white uppercase tracking-tighter">Total Paid</span>
                          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                            ${selectedOrder.total}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                        <FiShoppingBag />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Thank you for your purchase!</p>
                        <p className="text-gray-400 text-xs font-medium">Your items are being prepared for dispatch.</p>
                      </div>
                    </div>
                  </div>
                )}

                {view === 'wishlist' && (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar text-left">
                    <h3 className="text-xl font-black text-white mb-6">My Wishlist</h3>
                    {!user.wishlist || user.wishlist.length === 0 ? (
                      <div className="text-center py-10 opacity-40">
                        <FiHeart size={48} className="mx-auto mb-4" />
                        <p className="font-bold uppercase tracking-widest text-xs">Your wishlist is empty</p>
                      </div>
                    ) : (
                      user.wishlist.map(item => (
                        <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex gap-4 items-center hover:bg-white/10 transition-colors">
                          <Link 
                            to={`/product/${item.id}`} 
                            onClick={() => setIsAuthModalOpen(false)}
                            className="flex flex-1 gap-4 items-center min-w-0"
                          >
                            <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-white text-sm truncate">{item.name}</p>
                              <p className="font-black text-orange-400 text-xs">${item.price}</p>
                            </div>
                          </Link>
                          <div className="flex gap-2">
                            <button onClick={() => { addToCart(item); toast.success('Added to cart!'); }} className="p-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-all shadow-lg"><FiShoppingBag size={14} /></button>
                            <button onClick={() => removeFromWishlist(item.id)} className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"><FiTrash2 size={14} /></button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* FORM VIEW - Same as before */
              <>
                <div className="flex bg-white/5 p-2 m-8 mb-4 rounded-2xl border border-white/5">
                  <button onClick={() => setIsLoginTab(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${isLoginTab ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Login</button>
                  <button onClick={() => setIsLoginTab(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${!isLoginTab ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>Register</button>
                </div>
                <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-5">
                  <div className="text-center mb-8"><h2 className="text-3xl font-black text-white">{isLoginTab ? 'Welcome Back' : 'Create Account'}</h2><p className="text-gray-400 text-sm mt-2">{isLoginTab ? 'Enter your details to sign in' : 'Join our premium community today'}</p></div>
                  {!isLoginTab && (<div className="relative group"><FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" /><input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-white font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>)}
                  <div className="relative group"><FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" /><input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-white font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
                  <div className="relative group"><FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" /><input required type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-white font-bold" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} /></div>
                  <button type="submit" className="w-full bg-white text-black hover:bg-orange-500 hover:text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl group mt-4">{isLoginTab ? 'Sign In' : 'Get Started'}<FiArrowRight className="group-hover:translate-x-1 transition-transform" /></button>
                  <p className="text-[10px] text-center text-gray-500 font-bold tracking-widest uppercase mt-6">By continuing, you agree to our <span className="text-gray-300">Terms</span> & <span className="text-gray-300">Privacy</span></p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
