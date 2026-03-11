import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const seedUsers = [
      { 
        name: 'Tom', 
        email: 'tom@gmail.com', 
        password: '12345',
        location: 'Manhattan, New York',
        wishlist: [],
        orders: [
          { id: 'ORD-9921', date: '2024-03-01', total: 1299.99, status: 'Delivered', items: 1 },
          { id: 'ORD-8842', date: '2024-02-15', total: 349.99, status: 'Processing', items: 1 }
        ],
        cart: [
          { id: 'audio-pro-1', name: 'Next-Gen Audio Experience Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', quantity: 1 },
          { id: 'smart-watch-1', name: 'Aura Series 9 Premium Smartwatch', price: 349.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop', quantity: 1 }
        ]
      },
      {
        name: 'Ray',
        email: 'ray@gmail.com',
        password: '12345',
        location: 'London, UK',
        wishlist: [
          {
            id: 'phone-pro-1',
            name: "AuraPhone Pro Max 5G",
            price: 899,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400"
          }
        ],
        orders: [
          { id: 'ORD-1234', date: '2024-03-05', total: 299.99, status: 'Delivered', items: 1 }
        ],
        cart: [
          {
            id: 'sneakers-future-1',
            name: "AuraGlide Boost Sneakers",
            price: 189.99,
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400",
            quantity: 1
          }
        ]
      }
    ];

    try {
      const saved = localStorage.getItem('aura_users');
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        seedUsers.forEach(seedUser => {
          if (!parsed.some(u => u.email.toLowerCase() === seedUser.email.toLowerCase())) {
            parsed.push(seedUser);
          }
        });
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse users:', e);
    }
    
    return seedUsers;
  });

  // Sync users to LocalStorage and BACKEND
  useEffect(() => {
    // 1. Local Browser Sync
    localStorage.setItem('aura_users', JSON.stringify(registeredUsers));

    // 2. Server Sync (Save to users.json file)
    fetch('http://localhost:5000/api/users/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registeredUsers),
    })
    .then(res => res.json())
    .catch(err => console.error('Backend sync failed. Make sure your server is running:', err));
  }, [registeredUsers]);

  // Load latest users from Server on start
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
    .then(res => res.json())
    .then(serverUsers => {
      if (serverUsers && serverUsers.length > 0) {
        setRegisteredUsers(prev => {
          // Merge logic: prioritize server data but keep existing ones
          const merged = [...prev];
          serverUsers.forEach(su => {
            if (!merged.some(u => u.email.toLowerCase() === su.email.toLowerCase())) {
              merged.push(su);
            }
          });
          return merged;
        });
      }
    })
    .catch(err => console.warn('Could not fetch from server, using local data only.'));
  }, []);

  // Sync current user's changes back to the main database
  const syncUserChanges = (updates) => {
    if (!user) return;
    setRegisteredUsers(prev => prev.map(u => 
      u.email === user.email ? { ...u, ...updates } : u
    ));
    setUser(prev => ({ ...prev, ...updates }));
  };

  const login = (email, password) => {
    const foundUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!foundUser) {
      return { success: false, errorType: 'NEW_USER', message: 'New user? Proceeding to create an account.' };
    }

    if (foundUser.password !== password) {
      return { success: false, errorType: 'WRONG_PASSWORD', message: 'Wrong password, please try again.' };
    }

    setUser({ ...foundUser });
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const register = (name, email, password) => {
    if (registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'User already exists.' };
    }
    const newUser = { 
      name, 
      email: email.toLowerCase(), 
      password, 
      location: 'Select Location',
      wishlist: [],
      orders: [],
      cart: [] 
    };
    setRegisteredUsers([...registeredUsers, newUser]);
    return { success: true };
  };

  const logout = () => setUser(null);

  const triggerLoginForCheckout = () => {
    setPendingCheckout(true);
    setIsAuthModalOpen(true);
  };

  const addOrder = (orderDetails) => {
    if (!user) return;
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      ...orderDetails
    };
    const updatedOrders = [newOrder, ...(user.orders || [])];
    syncUserChanges({ orders: updatedOrders });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register,
      logout, 
      isAuthModalOpen, 
      setIsAuthModalOpen,
      pendingCheckout,
      setPendingCheckout,
      triggerLoginForCheckout,
      syncUserChanges,
      addOrder
    }}>
      {children}
    </AuthContext.Provider>
  );
};
