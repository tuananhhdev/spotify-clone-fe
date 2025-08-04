import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface ArtistCardProps {
  artists: Array<{
    id: string;
    name: string;
    image: string;
    followers: number;
  }>;
  onPlayArtist?: (artistId: string) => void;
  onArtistClick?: (artistId: string) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  artists,
  onPlayArtist,
  onArtistClick,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handlePlay = (artistId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlayArtist) onPlayArtist(artistId);
  };

  const handleArtistClick = (artistId: string) => {
    if (onArtistClick) onArtistClick(artistId);
  };

  return (
    <div className="min-h-screen text-white p-6 pt-10 pb-28 sm:py-10 bg-[#121212]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Popular artists</h1>
      </div>

      {/* Artists Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="group relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 p-4 hover:bg-[#282828]"
            onMouseEnter={() => setHoveredCard(artist.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleArtistClick(artist.id)}
          >
            {/* Artist Image */}
            <div className="relative w-full aspect-square mb-4">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover rounded-full"
              />

              {/* Play Button - nằm ngoài hình tròn */}
              <div
                className={`absolute bottom-2 right-2 transition-all duration-300 z-10 ${hoveredCard === artist.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
              >
                <button
                  onClick={(e) => handlePlay(artist.id, e)}
                  className="w-12 h-12 bg-[#1fdf64] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1ed760] transition-all duration-200"
                >
                  <Play className="w-6 h-6 text-black fill-current" />
                </button>
              </div>
            </div>


            {/* Artist Info */}
            <div>
              <h3 className="text-white font-semibold text-base truncate hover:underline">
                {artist.name}
              </h3>
              <p className="text-[#a7a7a7] text-sm">Artist</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistCard;