// src/data/products.js
export const categories = [
  { id: 1, name: "Mobiles", icon: "📱", count: 12, trending: true },
  { id: 2, name: "Fashion", icon: "👕", count: 45, new: true },
  { id: 3, name: "Electronics", icon: "💻", count: 28 },
  { id: 4, name: "Home", icon: "🏠", count: 15 },
  { id: 5, name: "Beauty", icon: "💄", count: 32, trending: true },
  { id: 6, name: "Grocery", icon: "🛒", count: 50 },
  { id: 7, name: "Gaming", icon: "🎮", count: 18, new: true },
  { id: 8, name: "Watches", icon: "⌚", count: 10, trending: true },
  { id: 9, name: "Sports", icon: "⚽", count: 22 },
  { id: 10, name: "Furniture", icon: "🛋️", count: 8 },
];

export const products = [
  // --- MOBILES ---
  {
    id: 'phone-pro-1',
    categoryId: 1,
    name: "AuraPhone Pro Max 5G (Red, 12GB RAM, 256GB)",
    description: "Red, 12GB RAM, 256GB",
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400",
    badge: "Bestseller"
  },
  {
    id: 'phone-ultra-1',
    categoryId: 1,
    name: "Aura Ultra 24 (16GB RAM, 512GB)",
    description: "16GB RAM, 512GB",
    price: 1199,
    originalPrice: 1399,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=400",
    badge: "Premium"
  },
  {
    id: 'phone-flip-1',
    categoryId: 1,
    name: "Aura Flip Foldable (12GB RAM, 256GB)",
    description: "12GB RAM, 256GB",
    price: 999,
    originalPrice: 1100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=400",
    badge: "New"
  },
  {
    id: 'phone-lite-1',
    categoryId: 1,
    name: "Aura Lite SE (8GB RAM, 128GB)",
    description: "8GB RAM, 128GB",
    price: 499,
    originalPrice: 599,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400",
    badge: "Out of Stock"
  },
  {
    id: 'phone-gaming-1',
    categoryId: 1,
    name: "Aura ROG Performance (16GB RAM, 512GB)",
    description: "16GB RAM, 512GB",
    price: 799,
    originalPrice: 899,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=400",
    badge: "Out of Stock"
  },
  {
    id: 'phone-neo-1',
    categoryId: 1,
    name: "Aura Neo X Performance (12GB RAM, 256GB)",
    description: "12GB RAM, 256GB",
    price: 699,
    originalPrice: 799,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=400",
    badge: "Out of Stock"
  },

  // --- ELECTRONICS ---
  {
    id: 'audio-pro-1',
    categoryId: 3,
    name: "AuraSound Pro Headphones",
    description: "Adaptive ANC, 40h Battery Life",
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
    badge: "40% OFF"
  },
  {
    id: 'elec-laptop-1',
    categoryId: 3,
    name: "AuraBook Pro 16",
    description: "M3 Ultra Chip, 32GB RAM, 1TB SSD",
    price: 2499.99,
    originalPrice: 2800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400",
    badge: "Ultimate"
  },
  {
    id: 'elec-camera-2',
    categoryId: 3,
    name: "AuraSnap X1 Mirrorless Camera",
    description: "24.2MP Full-Frame, 4K/60p, AI Subject Tracking",
    price: 1299.99,
    originalPrice: 1500,
    rating: 4.7,
    image: "/aurasnap-x1.jpg",
    badge: "New Arrival"
  },
  {
    id: 'elec-monitor-1',
    categoryId: 3,
    name: "AuraVision 49\" Curved",
    description: "240Hz, 1ms, Dual QHD OLED",
    price: 1299.99,
    originalPrice: 1500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400",
    badge: "Immersive"
  },
  {
    id: 'elec-drone-1',
    categoryId: 3,
    name: "AuraSky Guardian Drone",
    description: "4K/60fps, 45min Flight Time",
    price: 899.99,
    originalPrice: 1100,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=400",
    badge: "New"
  },

  // --- FASHION ---
  {
    id: 'sneakers-future-1',
    categoryId: 2,
    name: "AuraGlide Boost Sneakers",
    description: "Cloud-knit fabric, 12-hour comfort",
    price: 189.99,
    originalPrice: 240,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400",
    badge: "Trending"
  },
  {
    id: 'fashion-jacket-1',
    categoryId: 2,
    name: "Aura Stealth Tech Parka",
    description: "Water-resistant, thermal lining",
    price: 299.99,
    originalPrice: 450,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400",
    badge: "Premium"
  },
  {
    id: 'fashion-hoodie-1',
    categoryId: 2,
    name: "Aura Minimalist Essential Hoodie",
    description: "100% Organic Cotton, Oversized Fit",
    price: 89.99,
    originalPrice: 120,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400",
    badge: "Bestseller",
    ecoCertified: true
  },
  {
    id: 'fashion-watch-1',
    categoryId: 2,
    name: "Aura Chrono-Luxury Timepiece",
    description: "Sapphire Crystal, Japanese Movement",
    price: 549.99,
    originalPrice: 750,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=400",
    badge: "Elite"
  },
  {
    id: 'fashion-backpack-1',
    categoryId: 2,
    name: "Aura Urban Commuter Pack (Anti-Theft, 16\")",
    description: "Anti-Theft, 16\"",
    price: 129.99,
    originalPrice: 180,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400",
    badge: "Out of Stock"
  },
  {
    id: 'beauty-serum-1',
    categoryId: 5,
    name: "Aura Bio-Luminous Serum",
    description: "20% Vitamin C, Ferulic Acid, Hyaluronic",
    price: 129.99,
    originalPrice: 180,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400",
    badge: "Elite",
    ecoCertified: true
  },
  {
    id: 'beauty-cream-1',
    categoryId: 5,
    name: "Aura Cellular Renewal Cream",
    description: "Plant Stem Cells, Peptides, Ceramides",
    price: 159.99,
    originalPrice: 210,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400",
    badge: "Clinical"
  },
  {
    id: 'beauty-mask-1',
    categoryId: 5,
    name: "Aura Deep Detox Clay Mask",
    description: "Volcanic Ash, Activated Carbon, Tea Tree",
    price: 69.99,
    originalPrice: 95,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400",
    badge: "Pure"
  },
  {
    id: 'beauty-oil-1',
    categoryId: 5,
    name: "Aura Golden Elixir Face Oil",
    description: "24K Gold Flakes, Rosehip, Squalane",
    price: 110.00,
    originalPrice: 145,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=400",
    badge: "Luxe"
  },
  {
    id: 'beauty-cleanser-1',
    categoryId: 5,
    name: "Aura Enzyme Gel Cleanser",
    description: "Papaya Enzymes, Aloe, Green Tea",
    price: 45.99,
    originalPrice: 65,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400",
    badge: "Daily"
  },
  {
    id: 'gaming-console-1',
    categoryId: 7,
    name: "Aura Play Console X",
    description: "8K Ray Tracing, 2TB SSD, Carbon Black",
    price: 599.99,
    originalPrice: 699,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=400",
    badge: "Elite"
  },
  {
    id: 'gaming-pc-1',
    categoryId: 7,
    name: "Aura Omega Battle Station",
    description: "RTX 4090, i9-14900K, 64GB DDR5",
    price: 3499.99,
    originalPrice: 3800,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400",
    badge: "Ultimate"
  },
  {
    id: 'gaming-keyboard-1',
    categoryId: 7,
    name: "Aura Mech-X Keyboard",
    description: "Optical Switches, RGB, Magnetic Wrist Rest",
    price: 199.99,
    originalPrice: 250,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=400",
    badge: "Pro"
  },
  {
    id: 'gaming-mouse-1',
    categoryId: 7,
    name: "Aura Glide-Zero Mouse",
    description: "32K DPI, 45g Ultra-Lightweight, 8K Polling",
    price: 149.99,
    originalPrice: 180,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400",
    badge: "Hyper"
  },
  {
    id: 'gaming-headset-1',
    categoryId: 7,
    name: "Aura Atmos 7.1 Wireless",
    description: "Planar Drivers, Spatial Audio, 60h Battery",
    price: 299.99,
    originalPrice: 350,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599666505327-7758b44a9985?q=80&w=400",
    badge: "Spatial"
  },
  {
    id: 'watch-classic-1',
    categoryId: 8,
    name: "Aura Heritage Automatic",
    description: "24-Jewel Movement, Open Heart Dial",
    price: 899.99,
    originalPrice: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    badge: "Masterpiece"
  },
  {
    id: 'watch-sport-1',
    categoryId: 8,
    name: "Aura Diver Pro 300M",
    description: "Ceramic Bezel, Helium Escape Valve",
    price: 1299.99,
    originalPrice: 1500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=400",
    badge: "Professional"
  },
  {
    id: 'watch-smart-1',
    categoryId: 8,
    name: "Aura Horizon Smartwatch",
    description: "Titanium Case, Sapphire Glass, 14-Day Battery",
    price: 449.99,
    originalPrice: 550,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=400",
    badge: "High-Tech"
  },
  {
    id: 'watch-minimal-1',
    categoryId: 8,
    name: "Aura Lunar Minimalist",
    description: "Ultra-Thin 5mm, Milanese Loop",
    price: 249.99,
    originalPrice: 320,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=400",
    badge: "Elegant"
  },
  {
    id: 'watch-executive-1',
    categoryId: 8,
    name: "Aura Executive Gold",
    description: "18K Gold Plated, Perpetual Calendar",
    price: 2199.99,
    originalPrice: 2500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=400",
    badge: "Prestige"
  },
  // --- SPORTS ---
  {
    id: 'sports-bike-1',
    categoryId: 9,
    name: "Aura Speed-Pro Carbon Bike",
    description: "Ultra-Lightweight Carbon Fiber, 22-Speed Shimano",
    price: 3499.99,
    originalPrice: 4000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400",
    badge: "Elite"
  },
  {
    id: 'sports-gym-1',
    categoryId: 9,
    name: "Aura Peak-Performance Smart Gym",
    description: "AI-Powered Resistance, Virtual Coaching",
    price: 2499.99,
    originalPrice: 2800,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400",
    badge: "Innovation"
  },
  {
    id: 'sports-treadmill-1',
    categoryId: 9,
    name: "Aura Hydro-Flow Treadmill",
    description: "Adaptive Suspension, 22\" HD Screen",
    price: 1899.99,
    originalPrice: 2200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400",
    badge: "Pro"
  },
  {
    id: 'sports-watch-1',
    categoryId: 9,
    name: "Aura Ultra-Sport GPS Watch",
    description: "Dual-Band GPS, 100h Battery, Titanium",
    price: 699.99,
    originalPrice: 850,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    badge: "Essential"
  },
  {
    id: 'sports-weights-1',
    categoryId: 9,
    name: "Aura Flex-Weight System",
    description: "Adjustable 5-50lbs, Space-Saving Design",
    price: 399.99,
    originalPrice: 500,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=400",
    badge: "New"
  },
  // --- FURNITURE ---
  {
    id: 'furn-sofa-1',
    categoryId: 10,
    name: "Aura Ethereal Cloud Sofa",
    description: "Modular Italian Velvet, Memory Foam Support",
    price: 4299.99,
    originalPrice: 5000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400",
    badge: "Masterpiece"
  },
  {
    id: 'furn-desk-1',
    categoryId: 10,
    name: "Aura Lumos Smart Desk",
    description: "Built-in Wireless Charging, OLED Control",
    price: 1499.99,
    originalPrice: 1800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=400",
    badge: "Innovation"
  },
  {
    id: 'furn-chair-1',
    categoryId: 10,
    name: "Aura Zenith Ergonomic Chair",
    description: "4D Lumbar Support, Breathable Tech-Mesh",
    price: 899.99,
    originalPrice: 1100,
    rating: 4.8,
    image: "/aura-zenith-ergonomic-chair.jpg",
    badge: "Pro",
    ecoCertified: true
  },
  {
    id: 'furn-bed-1',
    categoryId: 10,
    name: "Aura Somnus Smart Bed",
    description: "Climate-Controlled, Sleep Tracking Base",
    price: 5999.99,
    originalPrice: 6500,
    rating: 5.0,
    image: "/aura-somnus-smart-bed.jpg",
    badge: "Elite"
  },
  {
    id: 'furn-lamp-1',
    categoryId: 10,
    name: "Aura Gravity Floating Lamp",
    description: "Magnetic Levitation, Touch Dimming",
    price: 299.99,
    originalPrice: 400,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400",
    badge: "New"
  }
];
