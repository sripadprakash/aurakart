import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TrendingCarousel = ({ products }) => {
  return (
    <div className="w-full relative group px-4">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          el: '.trending-pagination'
        }}
        navigation={{
          prevEl: '.trending-prev',
          nextEl: '.trending-next',
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="!pb-16"
      >
        {products.slice(0, 10).map((product) => (
          <SwiperSlide key={product.id} className="py-4">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="trending-prev absolute left-[-20px] top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:left-[-10px]">
        <FiChevronLeft size={24} />
      </button>
      <button className="trending-next absolute right-[-20px] top-[45%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:right-[-10px]">
        <FiChevronRight size={24} />
      </button>

      {/* Custom Pagination Container */}
      <div className="trending-pagination flex justify-center gap-2 mt-4"></div>

      <style jsx="true">{`
        .trending-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .trending-pagination .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default TrendingCarousel;