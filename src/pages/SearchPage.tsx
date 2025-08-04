import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Plus, Music, Search } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { Song } from '../types';
import { useMusicContext } from '../hook/useMusicContext';
import { usePageTitle } from '../hook/usePageTiltle';

interface Artist {
  id: string;
  name: string;
  image?: string;
}

interface SearchResults {
  songs: Song[];
  artists: Artist[];
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    songs: [],
    artists: [],
  });

  const [hoveredSong, setHoveredSong] = useState<string | null>(null);
  const [hoveredTopResult, setHoveredTopResult] = useState(false);

  usePageTitle(`Search - Spotify`)

  const context = useMusicContext();
  const { searchSongs, searchArtists, playSong, addToQueue } = context || {
    searchSongs: () => [],
    searchArtists: () => [],
    playSong: () => { },
    addToQueue: () => { },
  };

  const handleSongPlay = useCallback((song: Song) => {
    playSong(song);
  }, [playSong]);

  const handleAddToQueue = useCallback((song: Song) => {
    if (addToQueue) addToQueue(song);
  }, [addToQueue]);

  const performSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        try {
          const songs = searchSongs(query) || [];
          const artists = searchArtists(query) || [];
          setSearchResults({ songs, artists });
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults({ songs: [], artists: [] });
        }
      } else {
        setSearchResults({ songs: [], artists: [] });
      }
    },
    [searchSongs, searchArtists]
  );

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    if (query) performSearch(query);
  }, [searchParams, performSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchParams({ q: value });
  };

  if (!context) return <div className="text-white p-6">Error: MusicContext not found</div>;

  const topResult = searchResults.songs[0] || searchResults.artists[0];

  const searchInputVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 15 } },
  };

  const browseAllVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const resultsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const topResultVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const songsListVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const songItemVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const noResultContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.2,
      },
    },
  };

  const noResultIconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
    pulse: {
      scale: [1, 1.15, 1],
      rotate: [0, 5, -5, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    },
  };

  const noResultTextVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#181818] text-white">
      {/* Mobile Search Input */}
      <div className="lg:hidden sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <motion.input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for songs, artists..."
              className="w-full pl-12 pr-4 py-3 bg-[#2a2a2a] text-white rounded-full text-base focus:outline-none focus:ring-2 focus:ring-[#1DB954] placeholder-gray-400 transition-all duration-200"
              variants={searchInputVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
        {!searchQuery ? (
          <motion.div variants={browseAllVariants} initial="hidden" animate="visible">
            <motion.h2
              variants={categoryVariants}
              className="text-white text-2xl lg:text-3xl font-bold mb-6 lg:mb-8"
            >
              Browse all
            </motion.h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
              {[
                { name: 'Pop', color: 'bg-pink-500' },
                { name: 'Hip-Hop', color: 'bg-orange-500' },
                { name: 'Rock', color: 'bg-red-500' },
                { name: 'Jazz', color: 'bg-blue-500' },
                { name: 'Electronic', color: 'bg-purple-500' },
                { name: 'Classical', color: 'bg-green-500' },
              ].map((category) => (
                <motion.div
                  key={category.name}
                  variants={categoryVariants}
                  className={`${category.color} rounded-lg p-4 lg:p-6 cursor-pointer relative overflow-hidden h-24 sm:h-28 lg:h-32 group`}
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">
                    {category.name}
                  </h3>
                  <motion.div
                    className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3"
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    initial={{ opacity: 0.8 }}
                  >
                    <Music className="text-white w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {(searchResults.songs.length > 0 || searchResults.artists.length > 0) && (
              <motion.div
                variants={resultsContainerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8"
              >
                {/* Top result */}
                {topResult && (
                  <div className="lg:col-span-5 xl:col-span-4">
                    <motion.h3
                      variants={topResultVariants}
                      className="text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-6"
                    >
                      Top result
                    </motion.h3>
                    <motion.div
                      variants={topResultVariants}
                      className="bg-[#181818] group hover:bg-[#282828] rounded-xl p-5 lg:p-6 cursor-pointer relative overflow-hidden"
                      onMouseEnter={() => setHoveredTopResult(true)}
                      onMouseLeave={() => setHoveredTopResult(false)}
                      whileHover={{ y: -2 }}
                      style={{ minHeight: '200px' }}
                    >
                      <div className="flex flex-col h-full">
                        <div className="relative mb-4">
                          <motion.img
                            src={
                              'cover' in topResult
                                ? (topResult as Song).cover
                                : (topResult as Artist).image || '/api/placeholder/120/120'
                            }
                            alt={
                              'title' in topResult
                                ? (topResult as Song).title
                                : (topResult as Artist).name
                            }
                            className="w-20 h-20 lg:w-24 lg:h-24 rounded-lg object-cover shadow-xl"
                            onError={(e) => (e.currentTarget.src = '/api/placeholder/120/120')}
                            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-xl lg:text-2xl xl:text-3xl mb-2 line-clamp-2 leading-tight">
                            {'title' in topResult ? (topResult as Song).title : (topResult as Artist).name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="bg-[#A7A7A7] text-black px-2 py-1 rounded-full text-xs font-semibold">
                              {'title' in topResult ? 'SONG' : 'ARTIST'}
                            </span>
                            {'artist' in topResult && (
                              <>
                                <div className="w-1 h-1 bg-[#A7A7A7] rounded-full"></div>
                                <p className="text-[#A7A7A7] text-sm line-clamp-1">
                                  {(topResult as Song).artist}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <motion.div
                        className="absolute bottom-5 lg:bottom-6 right-5 lg:right-6"
                        initial={false}
                        animate={{
                          opacity: hoveredTopResult ? 1 : 0,
                          y: hoveredTopResult ? 0 : 8,
                          scale: hoveredTopResult ? 1 : 0.9,
                        }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        <motion.button
                          className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full p-3 lg:p-3.5 shadow-xl"
                          onClick={() => handleSongPlay(topResult as Song)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="w-5 h-5 lg:w-6 lg:h-6 ml-0.5" fill="currentColor" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                )}

                {/* Songs */}
                {searchResults.songs.length > 0 && (
                  <div className="lg:col-span-7 xl:col-span-8">
                    <motion.h3
                      variants={songItemVariants}
                      className="text-white text-xl lg:text-2xl font-bold mb-4 lg:mb-6"
                    >
                      Songs
                    </motion.h3>
                    <motion.div variants={songsListVariants} initial="hidden" animate="visible" className="space-y-1">
                      {searchResults.songs.map((song) => (
                        <motion.div
                          key={song.id}
                          variants={songItemVariants}
                          className="group flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-2 lg:py-3 rounded-lg hover:bg-[#ffffff1a] cursor-pointer"
                          onMouseEnter={() => setHoveredSong(song.id)}
                          onMouseLeave={() => setHoveredSong(null)}
                          whileHover={{ y: -2 }}
                        >
                          <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
                            <img
                              src={song.cover || '/api/placeholder/48/48'}
                              alt={song.title}
                              className="w-full h-full rounded object-cover"
                              onError={(e) => (e.currentTarget.src = '/api/placeholder/48/48')}
                            />
                            <AnimatePresence>
                              {hoveredSong === song.id && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 flex items-center justify-center bg-black/60 rounded cursor-pointer hover:bg-black/70 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSongPlay(song);
                                  }}
                                >
                                  <Play className="w-4 h-4 text-white" fill="currentColor" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-sm lg:text-base font-normal truncate group-hover:text-[#1ed760] transition-colors duration-200">
                              {song.title}
                            </h4>
                            <p className="text-[#a7a7a7] text-xs lg:text-sm truncate">{song.artist}</p>
                          </div>
                          <div className="flex items-center gap-2 lg:gap-4 ml-auto">
                            <span className="text-[#a7a7a7] text-xs lg:text-sm font-mono">
                              {song.duration || '3:45'}
                            </span>
                            <motion.div
                              className="flex items-center gap-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredSong === song.id ? 1 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.button
                                className="text-[#a7a7a7] hover:text-[#1ed760] p-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToQueue(song);
                                }}
                                title="Add to queue"
                                whileHover={{ scale: 1.2 }}
                              >
                                <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                              </motion.button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}

            {/* No result */}
            {searchResults.songs.length === 0 && searchResults.artists.length === 0 && (
              <motion.div
                variants={noResultContainerVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-16 lg:py-24 max-w-2xl mx-auto"
              >
                <motion.div
                  variants={noResultIconVariants}
                  animate="pulse"
                  className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-8 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center shadow-lg"
                >
                  <Music className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </motion.div>
                <motion.h3
                  variants={noResultTextVariants}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-2xl lg:text-3xl font-bold mb-4"
                >
                  No results found
                </motion.h3>
                <motion.p
                  variants={noResultTextVariants}
                  className="text-gray-300 text-base lg:text-lg max-w-md mx-auto leading-relaxed mb-6"
                >
                  Try searching with different keywords or check your spelling.
                </motion.p>
                <motion.button
                  variants={noResultTextVariants}
                  className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold px-6 py-3 rounded-full shadow-lg"
                  whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery('')}
                >
                  Browse all genres
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;