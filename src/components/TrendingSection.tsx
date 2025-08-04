import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Song } from '../types';
import MusicCard from './MusicCard';

import 'swiper/css';
import 'swiper/css/navigation';

interface TrendingSectionProps {
  songs: Song[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ songs }) => {
  return (
    <section className="mb-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6 max-w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-white text-3xl sm:text-3xl lg:text-3xl font-bold cursor-pointer truncate">
          Trending songs
        </h2>
        <Link to={'/trendings'}>
          <motion.button
            className="text-[#b3b3b3] text-sm font-bold hover:underline transition-colors duration-200 mr-7 sm:mr-8 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show all
          </motion.button>
        </Link>
      </motion.div>

      {/* Swiper Container */}
      <div className="relative w-full max-w-full overflow-hidden group">
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView="auto"
            slidesPerGroup={1}
            speed={400}
            grabCursor={true}
            allowTouchMove={true}
            centeredSlides={false}
            centerInsufficientSlides={false}
            navigation={{
              prevEl: '.trending-swiper-button-prev',
              nextEl: '.trending-swiper-button-next',
              enabled: true,
            }}
            watchOverflow={true}
            watchSlidesProgress={true}
            breakpoints={{
              320: {
                slidesPerView: "auto",
                spaceBetween: 12,
              },
              480: {
                slidesPerView: "auto",
                spaceBetween: 14,
              },
              640: {
                slidesPerView: "auto",
                spaceBetween: 16,
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: "auto",
                spaceBetween: 20,
              },
            }}
            className="trending-swiper w-full"
          >
            {songs.map((song) => (
              <SwiperSlide key={song.id}>
                <MusicCard song={song} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Buttons */}
        <button
          className="trending-swiper-button-prev absolute z-40 left-2 top-[40%] -translate-y-1/2 w-10 h-10 bg-black/90 hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 opacity-0 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="trending-swiper-button-next absolute z-40 right-2 top-[40%] -translate-y-1/2 w-10 h-10 bg-black/90 hover:bg-black rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 opacity-0 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        .trending-swiper {
          width: 100% !important;
          overflow: hidden !important;
        }
        
        .trending-swiper .swiper-wrapper {
          display: flex !important;
          width: fit-content !important;
        }
        
        .trending-swiper .swiper-slide {
          flex-shrink: 0 !important;
          width: auto !important;
          height: auto !important;
          max-width: 180px; /* Set consistent width for slides */
        }
        
        /* Responsive slide widths */
        @media (max-width: 640px) {
          .trending-swiper .swiper-slide {
            max-width: 140px;
          }
        }
        
        @media (min-width: 1280px) {
          .trending-swiper .swiper-slide {
            max-width: 200px;
          }
        }
        
        /* Show navigation buttons on hover, but hide when disabled */
        .group:hover .trending-swiper-button-prev:not(.swiper-button-disabled),
        .group:hover .trending-swiper-button-next:not(.swiper-button-disabled) {
          opacity: 1 !important;
        }
        
        /* Swiper automatically adds this class when navigation is disabled */
        .swiper-button-disabled {
          opacity: 0 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
        }
        
        /* Prevent horizontal scroll */
        body, html {
          overflow-x: hidden !important;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;