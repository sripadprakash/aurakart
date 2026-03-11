import { useState, useEffect, useRef } from 'react';
import { FiMapPin, FiSearch, FiArrowRight, FiTag, FiShoppingBag, FiX, FiMenu, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import { MdAccountCircle, MdOutlineShoppingCart } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLocation as useAppLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';
import { products, categories } from '../data/products';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ products: [], categories: [] });
  const [showResults, setShowResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount = 0, setIsCartOpen } = useCart() || {};
  const { location: deliveryLocation = 'Select Location', setIsLocationModalOpen } = useAppLocation() || {};
  const { user, setIsAuthModalOpen } = useAuth() || {};

  // SEARCH LOGIC
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase();
      
      const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      ).slice(0, 5);

      const filteredCategories = categories.filter(c => 
        c.name.toLowerCase().includes(query)
      ).slice(0, 3);

      setSearchResults({ products: filteredProducts, categories: filteredCategories });
      setShowResults(true);
    } else {
      setSearchResults({ products: [], categories: [] });
      setShowResults(false);
    }
  }, [searchQuery]);

  // Close search results on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (path) => {
    setSearchQuery('');
    setShowResults(false);
    setIsSearchVisible(false);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-xl border-b border-gray-200/50 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ease-in-out gap-4 ${isScrolled ? 'h-16' : 'h-16 md:h-20'}`}>
          
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3 md:gap-8">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FiMenu size={24} />
            </button>
            
            <div onClick={handleLogoClick} className="flex-shrink-0 flex items-center cursor-pointer group">
              <img 
                src={logo} 
                alt="Aurakart Logo" 
                className={`transition-all duration-300 ease-in-out object-contain mix-blend-darken ${isScrolled ? 'h-7 md:h-8' : 'h-8 md:h-11'}`} 
              />
            </div>

            <div 
              onClick={() => setIsLocationModalOpen && setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center gap-2 text-gray-800 cursor-pointer transition-colors group"
            >
              <FiMapPin className="text-gray-700 group-hover:text-orange-500 transition-colors duration-300" size={20} />
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold leading-tight group-hover:text-orange-400 transition-colors duration-300">Delivering to</span>
                <span className="text-sm font-bold text-gray-900 leading-tight group-hover:text-orange-500 transition-colors duration-300">
                  {deliveryLocation}
                </span>
              </div>
            </div>
          </div>

          {/* SEARCH ENGINE BAR - Desktop & Mobile Toggle */}
          <div className={`flex-1 ${isSearchVisible ? 'flex absolute inset-x-0 top-0 h-full bg-white z-50 px-4 items-center gap-3' : 'hidden lg:flex'} max-w-2xl relative group`} ref={searchRef}>
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for tech, fashion..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setShowResults(true)}
                className={`w-full rounded-full pl-6 pr-16 text-sm text-gray-900 placeholder-gray-500 outline-none transition-all duration-400 ease-in-out bg-white border border-gray-300 shadow-inner hover:border-orange-500 focus:border-orange-500 ${isScrolled ? 'py-2' : 'py-2.5'}`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX size={16} />
                </button>
              )}
              <button className={`absolute right-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition-all duration-300 ease-in-out shadow-md ${isScrolled ? 'top-1 bottom-1 px-4' : 'top-1 bottom-1 px-5'}`}>
                <FiSearch size={isScrolled ? 16 : 18} />
              </button>
            </div>
            
            {isSearchVisible && (
              <button onClick={() => setIsSearchVisible(false)} className="lg:hidden text-gray-500">
                <FiX size={24} />
              </button>
            )}

            {/* SEARCH RESULTS DROPDOWN */}
            <AnimatePresence>
              {showResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-50 p-2"
                >
                  {searchResults.categories.length > 0 && (
                    <div className="p-4 border-b border-gray-50">
                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2 flex items-center gap-2">
                        <FiTag /> Popular Categories
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.categories.map(cat => (
                          <button 
                            key={cat.id}
                            onClick={() => handleResultClick(`/category/${cat.name.toLowerCase()}`)}
                            className="px-4 py-2 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 rounded-xl text-xs font-bold transition-colors border border-transparent hover:border-orange-200"
                          >
                            {cat.icon} {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {searchResults.products.length > 0 ? (
                      <div className="p-2">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-4 flex items-center gap-2 py-2">
                          <FiShoppingBag /> Top Matches
                        </h4>
                        {searchResults.products.map(product => (
                          <button
                            key={product.id}
                            onClick={() => handleResultClick(`/product/${product.id}`)}
                            className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-all group text-left"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100 group-hover:border-orange-200 transition-colors">
                              <img src={product.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">{product.name}</p>
                              <p className="text-[10px] text-gray-500 font-medium truncate">{product.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black text-gray-900">${product.price}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <FiSearch size={40} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No matches found</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 md:gap-8">
            <button 
              onClick={() => setIsSearchVisible(true)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FiSearch size={22} />
            </button>

            <div 
              onClick={() => setIsAuthModalOpen && setIsAuthModalOpen(true)}
              className="flex items-center gap-2 text-gray-800 cursor-pointer transition-colors group text-left"
            >
              <MdAccountCircle className="text-gray-700 group-hover:text-orange-500 transition-colors duration-300" size={isScrolled ? 28 : 34} />
              <div className="hidden lg:flex flex-col whitespace-nowrap">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold leading-tight group-hover:text-orange-400 transition-colors duration-300">
                  {user?.name ? `Hello, ${user.name.split(' ')[0]}` : 'Hello, Sign in'}
                </span>
                <span className="text-sm font-bold text-gray-900 leading-tight group-hover:text-orange-500 transition-colors duration-300">Account</span>
              </div>
            </div>

            <button 
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="flex items-end gap-1 md:gap-2 text-gray-800 transition-all duration-300 group hover:scale-105 cursor-pointer pb-1"
            >
              <div className="relative flex items-center">
                <MdOutlineShoppingCart className="text-gray-700 group-hover:text-orange-500 transition-colors duration-300" size={isScrolled ? 28 : 34} />
                <span className={`absolute bg-orange-500 text-white font-bold rounded-full flex items-center justify-center transition-all duration-300 ease-in-out shadow-sm ${isScrolled ? '-top-1 -right-1 text-[9px] h-4 w-4' : '-top-2 -right-2 text-[10px] h-5 w-5'}`}>
                  {cartCount}
                </span>
              </div>
              <span className="hidden lg:block text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
                Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <img src={logo} alt="Logo" className="h-8 object-contain mix-blend-darken" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900">
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Delivery Location Mobile */}
                <div 
                  onClick={() => { setIsLocationModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 active:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <FiMapPin size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Delivering to</span>
                    <span className="text-sm font-bold text-gray-900">{deliveryLocation}</span>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Explore Categories</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => handleResultClick(`/category/${cat.name.toLowerCase()}`)}
                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{cat.icon}</span>
                          <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{cat.name}</span>
                        </div>
                        <FiChevronRight className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collections Link */}
                <Link 
                  to="/collections" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center p-4 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                >
                  Shop All Collections
                </Link>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                  Aurakart &copy; {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;