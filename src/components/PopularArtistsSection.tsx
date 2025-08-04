import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Artist } from '../types/artist';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Link } from 'react-router-dom';
import { useMusicContext } from '../hook/useMusicContext';

interface PopularArtistsSectionProps {
  artists: Artist[];
}

const PopularArtistsSection: React.FC<PopularArtistsSectionProps> = ({ artists }) => {
  const { playSong, setPlaylist, getSongsByArtist } = useMusicContext();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const handlePlayClick = (artistId: string) => {
    const artistSongs = getSongsByArtist(artistId);
    if (artistSongs.length > 0) {
      // Đặt danh sách bài hát của artist làm playlist
      setPlaylist(artistSongs);
      // Phát bài đầu tiên
      playSong(artistSongs[0]);
    }
  };

  return (
    <>
      {/* Header Section */}
      <motion.div
        className="flex items-center justify-between py-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold sm:text-3xl lg:text-3xl"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          Popular artists
        </motion.h2>
        <Link to={'/artists'}>
        <motion.button
          className="text-[#b3b3b3] text-sm font-bold hover:underline transition-colors duration-200 mr-7 sm:mr-8 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show all
        </motion.button>
        </Link>
      </motion.div>

      {/* Artists Carousel */}
      <motion.div
        className="relative group overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={16}
          slidesPerView={1.5}
          freeMode={{ enabled: true, momentum: true }}
          speed={400}
          grabCursor={true}
          allowTouchMove={true}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          breakpoints={{
            320: { slidesPerView: 1.5, spaceBetween: 8 },
            640: { slidesPerView: 2.2, spaceBetween: 12 },
            768: { slidesPerView: 2.8, spaceBetween: 14 },
            1024: { slidesPerView: 3.5, spaceBetween: 16 },
            1280: { slidesPerView: 4.2, spaceBetween: 16 },
            1536: { slidesPerView: 4.8, spaceBetween: 16 },
          }}
          className="artists-swiper"
        >
          {artists.map((artist) => (
            <SwiperSlide key={artist.id}>
              <motion.div
                className="cursor-pointer"
                layout
                onMouseEnter={() => setIsHovered(artist.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* Artist Card */}
                <motion.div
                  className="rounded-lg p-4 w-full relative"
                  initial={{ backgroundColor: 'transparent' }}
                  whileHover={{
                    backgroundColor: '#282828',
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Artist Image Container */}
                  <div className="relative mb-4">
                    <motion.div
                      className="aspect-square rounded-full overflow-hidden shadow-2xl w-full h-auto"
                    >
                      <motion.img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        animate={{
                          scale: isHovered === artist.id ? 1.1 : 1,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </motion.div>

                    {/* Play Button */}
                    <AnimatePresence>
                      {isHovered === artist.id && (
                        <motion.button
                          onClick={() => handlePlayClick(artist.id)}
                          className="absolute bottom-4 -right-2 top-24 w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center shadow-2xl hover:bg-[#1ed760] cursor-pointer"
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          transition={{ duration: 0.2 }}
                          whileHover={{ scale: 1.1, transition: { duration: 0.1 } }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-6 h-6 text-black ml-0.5" fill="currentColor" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Artist Info */}
                  <div className="text-left">
                    <motion.h3
                      className="text-white font-bold text-lg mb-1 truncate hover:underline"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to={`artist/${artist.id}`}>
                        {artist.name}
                      </Link>
                    </motion.h3>
                    <p className="text-[#b3b3b3] text-base font-medium">Artist</p>
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.button
          className="swiper-button-prev-custom absolute z-30 left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black/95 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.95)', transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          className="swiper-button-next-custom absolute z-30 right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-black/95 rounded-full flex items-center justify-center text-white shadow-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.95)', transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      <style>{`
        .artists-swiper {
          overflow: visible !important;
          padding: 0 !important;
        }
        .artists-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .artists-swiper .swiper-slide {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          justify-content: center;
        }
        .swiper-button-next,
        .swiper-button-prev {
          display: none !important;
        }
        .artists-swiper::-webkit-scrollbar {
          display: none;
        }
        .artists-swiper {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      `}</style>
    </>
  );
};

export default PopularArtistsSection;