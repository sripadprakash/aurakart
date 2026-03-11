// src/components/CartDrawer.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, triggerLoginForCheckout, addOrder } = useAuth();

  const handleCheckoutClick = () => {
    if (!user) {
      setIsCartOpen(false);
      triggerLoginForCheckout();
      toast.error('Please sign in to complete your purchase');
      return;
    }

    const shippingCharge = (user.orders?.length || 0) >= 3 ? 1 : 0;
    const finalTotal = cartTotal + shippingCharge;

    // Create a new order
    addOrder({
      total: finalTotal,
      items: cartItems.length,
      shipping: shippingCharge
    });

    // Clear the cart after order placement
    clearCart();

    // Close the cart drawer
    setIsCartOpen(false);

    // Show success message
    if (shippingCharge > 0) {
      toast.success(`Order placed successfully! Total: $${finalTotal.toFixed(2)} (inc. $1.00 shipping)`);
    } else {
      toast.success(`Order placed! Total: $${finalTotal.toFixed(2)} (Free Shipping Applied)`);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#020617] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <FiShoppingBag className="text-orange-500 text-xl" />
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Your Basket</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition-all"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-6"
              data-lenis-prevent
            >
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-40">
                  <FiShoppingBag size={64} className="text-gray-500" />
                  <p className="text-lg font-bold text-white uppercase tracking-widest">Your cart is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 text-orange-500 font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white text-sm line-clamp-1">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1 border border-white/5">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="text-xs font-black text-white w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                        <div className="flex flex-col items-end">
                          {item.offer === 'B2G1' && Math.floor(item.quantity / 3) > 0 && (
                            <span className="text-[8px] bg-green-500 text-white px-1.5 py-0.5 rounded-md font-black mb-1 animate-pulse">
                              {Math.floor(item.quantity / 3)} FREE
                            </span>
                          )}
                          <p className="font-black text-orange-400">
                            ${(item.price * (item.offer === 'B2G1' ? (item.quantity - Math.floor(item.quantity / 3)) : item.quantity)).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-white/5 backdrop-blur-xl border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-2xl font-black text-white">${(cartTotal + (user?.orders?.length >= 3 ? 1 : 0)).toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckoutClick}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-3"
                >
                  PROCEED TO CHECKOUT
                </button>
                <p className="text-[10px] text-center font-bold tracking-widest uppercase">
                  {user?.orders?.length >= 3 ? (
                    <span className="text-red-400">Offer expired as used. Shipping: $1.00</span>
                  ) : (
                    <span className="text-gray-500">Free Shipping Applied to this Order</span>
                  )}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
