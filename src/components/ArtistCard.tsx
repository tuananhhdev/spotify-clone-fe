import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause } from 'lucide-react';
import type { Artist } from '../types';

interface ArtistCardProps {
  artist: Artist;
  isPlaying?: boolean;
  onPlay?: (artist: Artist) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  artist,
  isPlaying = false,
  onPlay
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlay) {
      onPlay(artist);
    }
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Link to={`/artist/${artist.id}`}>
      <div
        className="bg-gray-800/40 hover:bg-gray-800/60 p-4 rounded-lg transition-all duration-300 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mb-4">
          <img
            src={artist.image}
            alt={artist.name}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-full shadow-lg"
          />

          {/* Play Button Overlay */}
          <button
            onClick={handlePlayClick}
            className={`absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black shadow-lg transition-all duration-300 ${isHovered || isPlaying
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
              } hover:scale-105 hover:bg-green-400`}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </button>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-white font-medium text-sm truncate group-hover:text-green-400 transition-colors">
            {artist.name}
          </h3>
          <p className="text-gray-400 text-xs">
            {formatFollowers(artist.followers)} followers
          </p>
          <p className="text-gray-500 text-xs">
            Artist
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
