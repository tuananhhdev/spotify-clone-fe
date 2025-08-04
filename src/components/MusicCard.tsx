import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import type { Song } from '../types';
import { useMusicContext } from '../hook/useMusicContext';
import { FaPause, FaPlay } from 'react-icons/fa6';

interface MusicCardProps {
  song: Song;
}

const MusicCard: React.FC<MusicCardProps> = memo(({ song }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentSong, isPlaying, playSong, pauseSong } = useMusicContext();

  const isCurrentSong = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrentSong && isPlaying;

  const handlePlayClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isCurrentSong) {
      if (isPlaying) {
        pauseSong();
      } else {
        playSong(song);
      }
    } else {
      playSong(song);
    }
  }, [isCurrentSong, isPlaying, pauseSong, playSong, song]);

  return (
    <div
      className="group cursor-pointer p-1 rounded-lg transition-all duration-300 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Album Cover Container */}
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg">
        <motion.img
          src={song.cover}
          alt={song.title}
          className="w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />


        {/* Play Button */}
        <motion.button
          onClick={handlePlayClick}
          className="absolute bottom-4 right-4 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 hover:bg-[#1ed760] transition-all duration-500 cursor-pointer"
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 8
          }}
          animate={{
            opacity: isHovered || isCurrentlyPlaying ? 1 : 0,
            scale: isHovered || isCurrentlyPlaying ? 1 : 0.8,
            y: isHovered || isCurrentlyPlaying ? 0 : 8
          }}
          transition={{ duration: 0.2 }}
        >
          {isCurrentlyPlaying ? (
            <FaPause className="w-5 h-5" />
          ) : (
            <FaPlay className="w-5 h-5 ml-0.5" />
          )}
        </motion.button>
      </div>

      {/* Song Info */}
      <div className="space-y-0.5">
        <h3 className="text-white font-semibold text-sm truncate">
          {song.title}
        </h3>
        <p className="text-[#b3b3b3] text-xs truncate">
          {song.artist}
        </p>
      </div>
    </div>
  );
});

MusicCard.displayName = 'MusicCard';

export default MusicCard;