import React, { useState, useCallback, memo } from 'react';
import { Play, Pause, Plus } from 'lucide-react';
import type { Song } from '../types';
import { useMusicContext } from '../contexts/MusicContext';

interface MusicCardProps {
  song: Song;
}

const MusicCard: React.FC<MusicCardProps> = memo(({ song }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentSong, isPlaying, playSong, pauseSong, addToQueue } = useMusicContext();

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

  const handleAddToQueue = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(song);
  }, [addToQueue, song]);

  return (
    <div
      className="relative cursor-pointer group w-full flex-shrink-0 min-w-0 mr-4 transition-all duration-300 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background overlay - radius tròn hơn */}
      <div className={`absolute -inset-2 rounded-xl bg-gradient-to-b via-gray-300/15 to-white/5 transition-opacity duration-500 ease-out ${isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

      {/* Card content */}
      <div className="relative z-10">
        <div className="relative mb-4 mx-1 mt-1">
          <img
            src={song.cover}
            alt={song.title}
            loading="lazy"
            className="aspect-square w-full max-w-[240px] object-cover rounded-xl"
          />

          {/* Overlay container cho buttons */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">

            {/* Add to Queue Button - tròn hơn */}
            <button
              onClick={handleAddToQueue}
              className={`absolute top-4 right-4 w-11 h-11 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-500 ease-out will-change-transform ${isHovered
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-75'
                } hover:scale-110 hover:bg-black/90 hover:shadow-2xl active:scale-95`}
              title="Add to queue"
            >
              <Plus className="w-5 h-5" />
            </button>

            {/* Play Button Overlay - đã là rounded-full nên OK */}
            <button
              onClick={handlePlayClick}
              className={`absolute bottom-3 right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black shadow-lg transition-all duration-300 ease-out ${isHovered || isCurrentlyPlaying
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-2 scale-95'
                } hover:scale-105 hover:bg-green-400 active:scale-95`}
            >
              {isCurrentlyPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1 mt-3 mx-1 mb-1">
          <h3 className="text-white font-semibold text-base truncate leading-tight">
            {song.title}
          </h3>
          <p className="text-gray-400 text-sm truncate pb-2">{song.artist}</p>
        </div>
      </div>
    </div>
  );
});

export default MusicCard;