import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import type { Song } from '../types';
import MusicCard from './MusicCard';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface TrendingSectionProps {
  songs: Song[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ songs }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // Smooth navigation functions
  const handlePrevClick = () => {
    if (swiperRef.current) {
      // Disable free mode temporarily cho smooth navigation
      swiperRef.current.allowTouchMove = false;
      swiperRef.current.slidePrev();
      // Re-enable sau khi transition xong
      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.allowTouchMove = true;
        }
      }, 600);
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      // Disable free mode temporarily cho smooth navigation
      swiperRef.current.allowTouchMove = false;
      swiperRef.current.slideNext();
      // Re-enable sau khi transition xong
      setTimeout(() => {
        if (swiperRef.current) {
          swiperRef.current.allowTouchMove = true;
        }
      }, 600);
    }
  };

  // Tối ưu resize, chỉ kiểm tra khi cần
  const handleResize = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="mb-16 w-full overflow-hidden max-w-full">
      <motion.div
        className="flex items-center justify-between mb-6 px-6 min-w-0"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-white text-2xl font-bold tracking-tight truncate flex-1 min-w-0">
          Trending songs
        </h2>
        <Link
          to="/trending"
          className="text-gray-400 text-sm font-semibold whitespace-nowrap ml-4 flex-shrink-0 relative group"
        >
          <span className="relative z-10">Show all</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-200 ease-out group-hover:w-full"></span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`relative group px-6 swiper-container ${!isBeginning ? 'scrolled' : ''} ${isEnd ? 'scrolled-end' : ''}`}
      >
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={16}
          slidesPerView={6.5}
          slidesPerGroup={2} // Slide nhiều items một lúc
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.5, // Giảm momentum để smooth hơn
            momentumVelocityRatio: 0.4,
            sticky: true, // Snap to slides
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          grabCursor={true}
          allowTouchMove={true}
          watchSlidesProgress={true}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          onResize={handleResize}
          onProgress={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 12,
              slidesPerGroup: 1
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 14,
              slidesPerGroup: 1
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 16,
              slidesPerGroup: 2
            },
            1024: {
              slidesPerView: 5.5,
              spaceBetween: 16,
              slidesPerGroup: 2
            },
            1280: {
              slidesPerView: 6.5,
              spaceBetween: 16,
              slidesPerGroup: 2
            },
          }}
          className="trending-swiper relative"
        >
          {songs.map((song) => (
            <SwiperSlide key={song.id} className="min-w-[200px]">
              <MusicCard song={song} />
            </SwiperSlide>
          ))}
        </Swiper>

        {!isBeginning && (
          <button
            className="swiper-button-prev-custom absolute z-30 left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
            onClick={handlePrevClick}
            type="button"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {!isEnd && (
          <button
            className="swiper-button-next-custom absolute z-30 right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
            onClick={handleNextClick}
            type="button"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </motion.div>

      <style>{`
        .trending-swiper {
          overflow: visible !important;
        }
        
        .trending-swiper .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .trending-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Hide default navigation */
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
      `}</style>
    </section>
  );
};

export default TrendingSection;