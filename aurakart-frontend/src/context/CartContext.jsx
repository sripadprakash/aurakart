import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user, syncUserChanges } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // RESTORE CART ON LOGIN
  useEffect(() => {
    if (user) {
      setCartItems(user.cart || []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // SYNC CART CHANGES TO USER PROFILE
  const syncCart = (newItems) => {
    setCartItems(newItems);
    if (user) {
      syncUserChanges({ cart: newItems });
    }
  };

  const addToCart = (product) => {
    let updatedItems;
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      updatedItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      let initialQty = 1;
      if (product.offer === 'BOGO') initialQty = 2;
      if (product.offer === 'B2G1') initialQty = 3;
      updatedItems = [...cartItems, { ...product, quantity: initialQty }];
    }
    
    syncCart(updatedItems);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    syncCart(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    syncCart(updatedItems);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartItems.reduce((total, item) => {
    if (item.offer === 'B2G1') {
      const setsOfThree = Math.floor(item.quantity / 3);
      const payableQuantity = item.quantity - setsOfThree;
      return total + (item.price * payableQuantity);
    }
    if (item.offer === 'BOGO') {
      const payableQuantity = Math.ceil(item.quantity / 2);
      return total + (item.price * payableQuantity);
    }
    return total + (item.price * item.quantity);
  }, 0);

  const getFreeCount = (item) => {
    if (item.offer === 'B2G1') return Math.floor(item.quantity / 3);
    if (item.offer === 'BOGO') return Math.floor(item.quantity / 2);
    return 0;
  };

  const clearCart = () => {
    syncCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      cartTotal, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      getFreeCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
