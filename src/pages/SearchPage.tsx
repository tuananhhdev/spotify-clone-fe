import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Plus, MoreHorizontal, Music, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMusicContext } from '../contexts/MusicContext';
import type { Song } from '../types';

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

  const performSearch = useCallback((query: string) => {
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
  }, [searchSongs, searchArtists]);

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

  return (
    <div className="min-h-full text-white">
      {/* Input search riêng cho mobile */}
      <div className="lg:hidden p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for songs, artists..."
            className="w-full pl-12 pr-4 py-2.5 bg-[#2a2a2a] text-white rounded-full text-sm font-light focus:outline-none focus:ring-1 focus:ring-[#1DB954] placeholder-gray-400"
          />
        </div>
      </div>

      <div className="pl-6 pr-8 py-8">
        {!searchQuery ? (
          <div>
            <h2 className="text-white text-xl font-bold mb-6">Browse all</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {[
                { name: 'Pop', color: 'bg-pink-500' },
                { name: 'Hip-Hop', color: 'bg-orange-500' },
                { name: 'Rock', color: 'bg-red-500' },
                { name: 'Jazz', color: 'bg-blue-500' },
                { name: 'Electronic', color: 'bg-purple-500' },
                { name: 'Classical', color: 'bg-green-500' },
              ].map((category) => (
                <div
                  key={category.name}
                  className={`${category.color} rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform relative overflow-hidden h-32`}
                >
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                  <Music className="absolute bottom-2 right-2 text-white w-6 h-6 opacity-80" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {(searchResults.songs.length > 0 || searchResults.artists.length > 0) && (
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Top result */}
                {topResult && (
                  <div className="flex-shrink-0">
                    <h3 className="text-white text-2xl font-bold mb-6">Top result</h3>
                    <div
                      className="bg-[#181818] group hover:bg-[#282828] rounded-lg p-5 w-full max-w-[450px] h-[235px] transition-all duration-200 cursor-pointer relative"
                      onMouseEnter={() => setHoveredTopResult(true)}
                      onMouseLeave={() => setHoveredTopResult(false)}
                    >
                      <div className="flex flex-col h-full">
                        <img
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
                          className="w-[92px] h-[92px] rounded-lg object-cover shadow-xl"
                          onError={(e) => (e.currentTarget.src = '/api/placeholder/120/120')}
                        />
                        <div className="mt-4">
                          <h4 className="text-white font-bold text-[32px] mb-2 line-clamp-1">
                            {'title' in topResult
                              ? (topResult as Song).title
                              : (topResult as Artist).name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <p className="text-[#A7A7A7] text-sm font-semibold">
                              {'title' in topResult ? 'Song' : 'Artist'}
                            </p>
                            <div className="w-1 h-1 bg-[#A7A7A7] rounded-full"></div>
                            <p className="text-[#A7A7A7] text-sm line-clamp-1">
                              {'artist' in topResult ? (topResult as Song).artist : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out translate-y-2 group-hover:translate-y-0"
                        initial={false}
                        animate={{ opacity: hoveredTopResult ? 1 : 0, y: hoveredTopResult ? 0 : 8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          className="bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full p-3.5 shadow-xl hover:scale-105 transition-all"
                          onClick={() => handleSongPlay(topResult as Song)}
                        >
                          <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                        </button>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Songs */}
                {searchResults.songs.length > 0 && (
                  <div className="flex-1">
                    <h3 className="text-white text-2xl font-bold mb-6">Songs</h3>
                    <div className="flex flex-col">
                      {searchResults.songs.map((song) => (
                        <div
                          key={song.id}
                          className="group flex items-center gap-4 px-4 py-2 rounded hover:bg-[#ffffff1a] transition-colors cursor-pointer"
                          onMouseEnter={() => setHoveredSong(song.id)}
                          onMouseLeave={() => setHoveredSong(null)}
                        >
                          <div className="relative w-10 h-10">
                            <img
                              src={song.cover || '/api/placeholder/40/40'}
                              alt={song.title}
                              className="w-10 h-10 rounded object-cover"
                            />
                            {hoveredSong === song.id && (
                              <div
                                className="absolute inset-0 flex items-center justify-center bg-black/60"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSongPlay(song);
                                }}
                              >
                                <Play className="w-4 h-4 text-white" fill="currentColor" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white text-base font-normal truncate">{song.title}</h4>
                            <p className="text-[#a7a7a7] text-sm truncate">{song.artist}</p>
                          </div>
                          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="text-[#1ed760] hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToQueue(song);
                              }}
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                            <span className="text-[#a7a7a7] text-sm">{song.duration || '3:45'}</span>
                            <button className="text-[#a7a7a7] hover:text-white">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* No result */}
            {searchResults.songs.length === 0 && searchResults.artists.length === 0 && (
              <div className="text-center py-16">
                <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">No results found</h3>
                <p className="text-gray-400">Try searching with different keywords or check your spelling.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;