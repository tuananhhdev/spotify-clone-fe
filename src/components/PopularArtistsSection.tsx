import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { Artist } from '../types';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

interface PopularArtistsSectionProps {
  artists: Artist[];
}

const PopularArtistsSection: React.FC<PopularArtistsSectionProps> = ({ artists }) => {
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

  return (
    <section className="mb-12 w-full">
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer">
            Popular artists
          </h2>
          <Link
            to="/artists"
            className="text-[#b3b3b3] text-sm font-semibold hover:text-white hover:underline transition-colors duration-200"
          >
            Show all
          </Link>
        </div>
      </div>

      <div className="relative group/container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={24}
          slidesPerView="auto"
          freeMode={true}
          navigation={{
            prevEl: '.artists-swiper-button-prev',
            nextEl: '.artists-swiper-button-next',
          }}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 5.5,
              spaceBetween: 24,
            },
          }}
          className="!px-6"
        >
          {artists.map((artist, index) => (
            <SwiperSlide key={artist.id} className="!w-[200px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + index * 0.05,
                  ease: "easeOut"
                }}
                className="cursor-pointer group/card"
              >
                {/* Card - No background by default, background on hover */}
                <div className="relative p-4 bg-transparent hover:bg-[#1a1a1a] rounded-lg transition-all duration-300">
                  <div className="relative">
                    {/* Artist Image Container */}
                    <div className="relative mb-4">
                      <div className="relative overflow-hidden rounded-full">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          loading="lazy"
                          className="w-full aspect-square object-cover"
                        />
                      </div>

                      {/* Play Button - positioned outside image at bottom right */}
                      <div className="absolute -bottom-2 -right-2 opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                        <button className="w-12 h-12 bg-[#1ed760] hover:bg-[#1fdf64] hover:scale-105 rounded-full flex items-center justify-center shadow-lg transition-all duration-200">
                          <Play className="w-5 h-5 text-black ml-0.5" fill="currentColor" />
                        </button>
                      </div>
                    </div>

                    {/* Artist Info */}
                    <div className="text-left">
                      <Link to={`/artist/${artist.id}`}>
                        <h3 className="text-white font-bold text-base mb-1 truncate hover:underline transition-colors duration-200">
                          {artist.name}
                        </h3>
                      </Link>
                      <p className="text-[#b3b3b3] text-sm font-normal">
                        Artist
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {!isBeginning && (
          <button className="artists-swiper-button-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#000000cc] hover:bg-[#000000] rounded-full flex items-center justify-center text-white opacity-0 group-hover/container:opacity-100 transition-all duration-300 shadow-xl">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {!isEnd && (
          <button className="artists-swiper-button-next absolute right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#000000cc] hover:bg-[#000000] rounded-full flex items-center justify-center text-white opacity-0 group-hover/container:opacity-100 transition-all duration-300 shadow-xl">
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
};

export default PopularArtistsSection;