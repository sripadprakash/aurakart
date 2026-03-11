import { FiHeart, FiSlash } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;
  const { addToCart } = useCart();
  const { user, syncUserChanges, triggerLoginForCheckout } = useAuth();

  const isWishlisted = user?.wishlist?.some(item => item.id === product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please sign in to save items');
      triggerLoginForCheckout();
      return;
    }

    const currentWishlist = user.wishlist || [];
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = currentWishlist.filter(item => item.id !== product.id);
      toast.success('Removed from wishlist');
    } else {
      updatedWishlist = [...currentWishlist, { ...product }];
      toast.success('Added to wishlist!', { icon: '❤️' });
    }

    syncUserChanges({ wishlist: updatedWishlist });
  };
  // If your product data doesn't have old prices or ratings yet, we create some fallbacks so the design looks great immediately!
  const oldPrice = product.oldPrice || (product.price * 1.25).toFixed(2);
  const rating = product.rating || "4.8";
  const reviews = product.reviews || 128;

  // Determine the product link
  let productLink = '#';
  if (product.id === 'phone-pro-1') productLink = '/product/phone-pro-1';
  if (product.id === 'phone-ultra-1') productLink = '/product/phone-ultra-1';
  if (product.id === 'phone-flip-1') productLink = '/product/phone-flip-1';
  if (product.id === 'phone-lite-1') productLink = '/product/phone-lite-1';
  if (product.id === 'phone-gaming-1') productLink = '/product/phone-gaming-1';
  if (product.id === 'phone-neo-1') productLink = '/product/phone-neo-1';
  if (product.id === 'sneakers-future-1') productLink = '/product/sneakers-future-1';
  if (product.id === 'fashion-jacket-1') productLink = '/product/fashion-jacket-1';
  if (product.id === 'fashion-hoodie-1') productLink = '/product/fashion-hoodie-1';
  if (product.id === 'fashion-watch-1') productLink = '/product/fashion-watch-1';
  if (product.id === 'fashion-backpack-1') productLink = '/product/fashion-backpack-1';
  if (product.id === 'beauty-serum-1') productLink = '/product/beauty-serum-1';
  if (product.id === 'beauty-cream-1') productLink = '/product/beauty-cream-1';
  if (product.id === 'beauty-mask-1') productLink = '/product/beauty-mask-1';
  if (product.id === 'beauty-oil-1') productLink = '/product/beauty-oil-1';
  if (product.id === 'beauty-cleanser-1') productLink = '/product/beauty-cleanser-1';
  if (product.id === 'gaming-console-1') productLink = '/product/gaming-console-1';
  if (product.id === 'gaming-pc-1') productLink = '/product/gaming-pc-1';
  if (product.id === 'gaming-keyboard-1') productLink = '/product/gaming-keyboard-1';
  if (product.id === 'gaming-mouse-1') productLink = '/product/gaming-mouse-1';
  if (product.id === 'gaming-headset-1') productLink = '/product/gaming-headset-1';
  if (product.id === 'audio-pro-1') productLink = '/product/audio-pro-1';
  if (product.id === 'elec-laptop-1') productLink = '/product/elec-laptop-1';
  if (product.id === 'elec-camera-2') productLink = '/product/elec-camera-2';
  if (product.id === 'elec-monitor-1') productLink = '/product/elec-monitor-1';
  if (product.id === 'elec-drone-1') productLink = '/product/elec-drone-1';
  if (product.id === 'elec-tablet-1') productLink = '/product/elec-tablet-1';
  if (product.id === 'watch-classic-1') productLink = '/product/watch-classic-1';
  if (product.id === 'watch-sport-1') productLink = '/product/watch-sport-1';
  if (product.id === 'watch-smart-1') productLink = '/product/watch-smart-1';
  if (product.id === 'watch-minimal-1') productLink = '/product/watch-minimal-1';
  if (product.id === 'watch-executive-1') productLink = '/product/watch-executive-1';
  if (product.id === 'sports-bike-1') productLink = '/product/sports-bike-1';
  if (product.id === 'sports-gym-1') productLink = '/product/sports-gym-1';
  if (product.id === 'sports-treadmill-1') productLink = '/product/sports-treadmill-1';
  if (product.id === 'sports-watch-1') productLink = '/product/sports-watch-1';
  if (product.id === 'sports-weights-1') productLink = '/product/sports-weights-1';
  if (product.id === 'furn-sofa-1') productLink = '/product/furn-sofa-1';
  if (product.id === 'furn-desk-1') productLink = '/product/furn-desk-1';
  if (product.id === 'furn-chair-1') productLink = '/product/furn-chair-1';
  if (product.id === 'furn-bed-1') productLink = '/product/furn-bed-1';
  if (product.id === 'furn-lamp-1') productLink = '/product/furn-lamp-1';

  return (
    <Link to={productLink} className="block group">
      <div className="relative bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 flex flex-col gap-4 transition-all duration-500 group-hover:border-orange-500/40 group-hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] group-hover:-translate-y-2">
        
        {/* --- TOP SECTION: Image & Badges --- */}
        <div className="w-full h-56 bg-[#020617]/50 rounded-2xl overflow-hidden relative">
          
          {/* Sale Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-gradient-to-r from-brand-pink to-brand-orange text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
              Save 20%
            </span>
          </div>

          {/* Wishlist Button (Glassmorphism) */}
          <button 
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 z-20 backdrop-blur-md p-2.5 rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] 
              ${isWishlisted ? 'bg-white text-red-500 scale-110' : 'bg-white/20 text-white hover:bg-white/40'}
            `}
          >
            <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Product Image with Hover Zoom */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Dark overlay at the bottom of the image for better blending */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* --- MIDDLE SECTION: Details --- */}
        <div className="flex flex-col gap-2 flex-grow px-2">
          
          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex text-yellow-400 text-xs">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            <span className="text-gray-400 text-xs font-medium">({rating}) {reviews} Reviews</span>
          </div>

          {/* Title - Fixed height for consistency */}
          <div className="h-14">
            <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight tracking-wide group-hover:text-orange-400 transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Description - Fixed height for consistency */}
          <div className="h-8">
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          {/* Pricing */}
          <div className="flex items-center gap-2 mt-auto pt-2">
            <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 font-semibold line-through">
              ${oldPrice}
            </p>
          </div>
        </div>
        
        {/* --- BOTTOM SECTION: Add to Cart Button --- */}
        <div className="mt-2" onClick={(e) => e.preventDefault()}>
          {product.badge === "Out of Stock" ? (
            <button 
              className="w-full bg-white/5 border border-white/10 text-gray-500 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] cursor-not-allowed flex items-center justify-center gap-2"
              disabled
            >
              <FiSlash />
              Out of Stock
            </button>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="cart-btn !bg-[#f97316]" 
              data-tooltip="Add to your"
            >
              <div className="cart-btn-wrapper">
                <div className="text uppercase tracking-wider text-xs font-bold">
                  Add to Cart
                </div>
                <span className="icon flex-col gap-0.5">
                  <svg viewBox="0 0 16 16" className="bi bi-cart2 drop-shadow-md" fill="currentColor" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                  </svg>
                  <span className="text-[8px] uppercase font-black tracking-tighter leading-none">BASKET</span>
                </span>
              </div>
            </button>
          )}
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;
