import  { useState, useRef } from 'react';
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useMusicContext } from '../hook/useMusicContext';
import useDominantColor from '../hook/useDominantColor';
import { usePageTitle } from '../hook/usePageTiltle';

const Artist = () => {
  const {
    currentSong,
    isPlaying,
    artists,
    getSongsByArtist,
    playSong,
    toggleLike,
  } = useMusicContext();

  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  const artist = artists.find((a) => a.id === id);

  usePageTitle(`${artist?.name} | Spotify`);

  const { dominantColor, isLoading: colorLoading } = useDominantColor(artist?.background || '');

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-6">
        <h1 className="text-2xl font-bold text-white">Artist not found</h1>
      </div>
    );
  }

  const artistSongs = getSongsByArtist(artist.id);
  const displayedSongs = showAllSongs ? artistSongs : artistSongs.slice(0, 5);
  const isCurrentArtist = currentSong && artistSongs.some((s) => s.id === currentSong.id);

  const handlePlayPause = (songId?: string) => {
    if (songId) {
      const song = artistSongs.find((s) => s.id === songId);
      if (song) playSong(song);
    } else if (artistSongs.length > 0) {
      playSong(artistSongs[0]);
    }
  };

  const formatNumber = (n: number) => {
    if (n >= 1000000) {
      return (n / 1000000).toFixed(1) + 'M';
    } else if (n >= 1000) {
      return (n / 1000).toFixed(1) + 'K';
    }
    return n.toLocaleString('vi-VN');
  };

  return (
    <div className="min-h-screen text-white"
      style={{
        background: colorLoading
          ? 'linear-gradient(to bottom, #1e1e1e, #121212)'
          : `linear-gradient(to bottom, ${dominantColor} 0%, #121212 75%, #121212 100%)`,
      }}
    >
      {/* Hero Section - Spotify-like compact height */}
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden"> {/* Đã điều chỉnh các giá trị h-* ở đây */}
        {/* Background Image with responsive object positioning */}
        <div className="absolute inset-0">
          <img
            ref={imgRef}
            src={artist.background}
            alt={artist.name}
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              console.error('Image failed to load:', artist.background);
              setImageLoaded(true);
            }}
          />

          {/* Loading gradient placeholder with dominant color */}
          {!imageLoaded && (
            <div
              className="absolute inset-0 w-full h-full animate-pulse"
              style={{
                background: colorLoading
                  ? 'linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)'
                  : `linear-gradient(135deg, ${dominantColor} 0%, #1f2937 50%, #111827 100%)`,
              }}
            />
          )}
        </div>

        {/* Responsive overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 sm:via-black/30 to-transparent" />

        {/* Content container with responsive padding */}
        <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-6 lg:p-8">
          {/* Verified Badge - responsive sizing */}
          <div className="flex items-center bg-green-500 text-black text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full w-fit mb-2 sm:mb-3">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-current" viewBox="0 0 16 16">
              <path d="M13.985 2.383L5.127 12.754 1.388 8.375l-.658.77 4.397 5.149 9.618-11.262z" />
            </svg>
            <span className="hidden sm:inline">Verified Artist</span>
            <span className="sm:hidden">Verified</span>
          </div>

          {/* Artist Name - Spotify-style typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2 sm:mb-3 drop-shadow-lg">
            {artist.name}
          </h1>

          {/* Followers count - responsive text */}
          <p className="text-white/80 text-sm sm:text-base lg:text-lg font-medium">
            {formatNumber(artist.followers)} monthly listeners
          </p>
        </div>
      </div>

      {/* Main Content - responsive container */}
      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto">
        {/* Control Buttons - responsive sizing and spacing */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 mb-6 sm:mb-8">
          {/* Play/Pause Button */}
          <button
            onClick={() => handlePlayPause()}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-green-500 hover:bg-green-400 text-black rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isPlaying && isCurrentArtist ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ml-0.5" />
            )}
          </button>

          {/* Follow Button */}
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`border border-white/40 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-full hover:border-white/60 transition-all duration-200 text-sm sm:text-base lg:text-lg font-medium ${isFollowing
              ? 'bg-white/10 border-white/60'
              : 'hover:bg-white/5'
              }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>

          {/* More Options */}
          <button className="text-white/60 hover:text-white p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/10 transition-all duration-200">
            <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        {/* Popular Songs Section */}
        <div className="w-full">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Popular</h2>
            {artistSongs.length > 5 && (
              <button
                onClick={() => setShowAllSongs(!showAllSongs)}
                className="text-sm sm:text-base lg:text-lg text-white/60 hover:text-white transition-colors duration-200 font-medium hover:underline"
              >
                {showAllSongs ? 'Show less' : 'Show all'}
              </button>
            )}
          </div>

          {/* Songs List - responsive layout */}
          <div className="space-y-1 sm:space-y-2">
            {displayedSongs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center py-2 sm:py-3 lg:py-4 px-2 sm:px-3 lg:px-4 rounded-lg cursor-pointer hover:bg-white/5 transition-all duration-200"
                onClick={() => handlePlayPause(song.id)}
              >
                {/* Track Number / Play Button */}
                <div className="w-6 sm:w-8 lg:w-10 flex justify-center items-center mr-3 sm:mr-4 lg:mr-5">
                  <span className={`text-white/60 group-hover:hidden text-sm sm:text-base lg:text-lg font-medium ${currentSong?.id === song.id ? 'text-green-500' : ''
                    }`}>
                    {index + 1}
                  </span>
                  <div className="hidden group-hover:flex">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>

                {/* Album Cover - responsive sizing */}
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded object-cover mr-3 sm:mr-4 lg:mr-5 shadow-md flex-shrink-0"
                />

                {/* Song Info - responsive typography */}
                <div className="flex-1 min-w-0 mr-3 sm:mr-4 lg:mr-6">
                  <p className={`text-sm sm:text-base lg:text-lg truncate font-medium transition-colors duration-200 ${currentSong?.id === song.id ? 'text-green-500' : 'text-white group-hover:text-white'
                    }`}>
                    {song.title}
                  </p>
                </div>

                {/* Like Button - responsive sizing */}
                <button
                  className={`mr-3 sm:mr-4 lg:mr-6 transition-all duration-200 p-1 sm:p-1.5 lg:p-2 rounded-full hover:bg-white/10 ${song.isLiked
                    ? 'text-green-500 opacity-100'
                    : 'text-white/40 hover:text-white opacity-0 group-hover:opacity-100'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(song.id);
                  }}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${song.isLiked ? 'fill-current' : ''}`} />
                </button>

                {/* Duration - responsive sizing */}
                <div className="text-white/60 text-sm sm:text-base lg:text-lg w-12 sm:w-14 lg:w-16 text-right font-mono">
                  {song.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;