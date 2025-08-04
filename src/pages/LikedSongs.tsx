import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Play, Pause, Heart, Download, MoreHorizontal, Clock, Plus, ListPlus, Share, Trash2 } from 'lucide-react';
import { songs } from '../data/songs';

const LikedSongs: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSong, setHoveredSong] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Trigger for loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter only liked songs
  const likedSongs = songs.filter(song => song.isLiked);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSongPlay = (songId: string) => {
    console.log('Playing song:', songId);
  };

  const handleMoreClick = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === songId ? null : songId);
  };

  const handleAddToQueue = (songId: string) => {
    console.log('Adding to queue:', songId);
    setOpenDropdown(null);
  };

  const handleAddToPlaylist = (songId: string) => {
    console.log('Adding to playlist:', songId);
    setOpenDropdown(null);
  };

  const handleShare = (songId: string) => {
    console.log('Sharing song:', songId);
    setOpenDropdown(null);
  };

  const handleRemoveFromLiked = (songId: string) => {
    console.log('Removing from liked:', songId);
    setOpenDropdown(null);
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const getTotalDuration = () => {
    return `${likedSongs.length * 3} min`;
  };

 const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.8 } },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0.7, rotate: 15 },
    visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 120, damping: 10, duration: 0.7 } },
  };

  const controlsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const controlItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 12 } },
  };

  const songListVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const songItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  const emptyStateVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-800 via-purple-900 to-black overflow-hidden">
      {/* Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 max-w-screen-2xl mx-auto">
          {/* Liked Songs Icon */}
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-gradient-to-br from-purple-400 to-blue-600 rounded-xl shadow-2xl flex items-center justify-center"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <Heart className="text-white w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24" fill="currentColor" />
          </motion.div>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <motion.p
              variants={headerVariants}
              className="text-white/80 text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-3 lg:mb-4 tracking-wide"
            >
              PLAYLIST
            </motion.p>
            <motion.h1
              variants={headerVariants}
              className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 lg:mb-6 leading-tight tracking-tight"
            >
              Liked Songs
            </motion.h1>
            <motion.div
              variants={headerVariants}
              className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm md:text-base text-white/70"
            >
              <span className="font-medium">Your liked songs</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="font-medium">{likedSongs.length} songs</span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="font-medium">{getTotalDuration()}</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        variants={controlsContainerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 bg-gradient-to-b from-transparent via-black/10 to-transparent"
      >
        <motion.div className="flex items-center space-x-4 sm:space-x-6 max-w-screen-2xl mx-auto">
          <motion.button
            variants={controlItemVariants}
            onClick={handlePlayPause}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center text-black hover:bg-green-400 shadow-lg hover:shadow-green-500/25"
            whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-0.5" fill="currentColor" />
            )}
          </motion.button>

          <motion.button
            variants={controlItemVariants}
            className="text-gray-400 hover:text-white p-1 sm:p-2"
            whileHover={{ scale: 1.15, transition: { type: 'spring', stiffness: 300 } }}
          >
            <Download className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>

          <motion.button
            variants={controlItemVariants}
            className="text-gray-400 hover:text-white p-1 sm:p-2"
            whileHover={{ scale: 1.15, transition: { type: 'spring', stiffness: 300 } }}
          >
            <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Song List */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12"
      >
        <div className="max-w-screen-2xl mx-auto">
          {likedSongs.length === 0 ? (
            <motion.div
              variants={emptyStateVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="text-center pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 1.5 } }}
              >
                <Heart className="text-gray-500 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-4 sm:mb-6" />
              </motion.div>
              <motion.h2
                variants={emptyStateVariants}
                className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3"
              >
                Songs you like will appear here
              </motion.h2>
              <motion.p
                variants={emptyStateVariants}
                className="text-gray-400 text-sm sm:text-base md:text-lg"
              >
                Save songs by tapping the heart icon.
              </motion.p>
            </motion.div>
          ) : (
            <div className="bg-black/20 rounded-xl backdrop-blur-sm border border-white/10">
              {/* Desktop Header */}
              <div className="hidden lg:grid lg:grid-cols-[60px_1fr_300px_200px_120px_80px] gap-4 px-4 sm:px-6 pt-3 sm:pt-4 pb-3 sm:pb-4 text-gray-400 text-sm font-medium border-b border-white/10">
                <div className="text-center">#</div>
                <div>TITLE</div>
                <div>ALBUM</div>
                <div>DATE ADDED</div>
                <div></div>
                <div className="text-center">
                  <Clock className="w-4 h-4 mx-auto" />
                </div>
              </div>

              {/* Songs List */}
              <motion.div
                variants={songListVariants}
                initial="hidden"
                animate={isLoaded ? 'visible' : 'hidden'}
                className="divide-y divide-white/5"
              >
                {likedSongs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    variants={songItemVariants}
                    className="group cursor-pointer transition-all duration-300 hover:bg-white/5 relative"
                    onMouseEnter={() => setHoveredSong(song.id)}
                    onMouseLeave={() => setHoveredSong(null)}
                    onClick={() => handleSongPlay(song.id)}
                    whileHover={{ y: -2 }}
                  >
                    {/* Mobile Layout */}
                    <div className="flex items-center p-3 sm:p-4 lg:hidden space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 relative">
                        <AnimatePresence>
                          {hoveredSong === song.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center z-10"
                            >
                              <Play className="text-white w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm sm:text-base truncate group-hover:text-green-400 transition-colors">
                          {song.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm truncate">
                          {song.artist}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                        {hoveredSong === song.id && (
                          <motion.button
                            className="text-green-500 hover:text-green-400 transition-colors p-1"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
                          </motion.button>
                        )}
                        <span className="text-gray-400 text-xs sm:text-sm">
                          {formatDuration(song.duration)}
                        </span>
                        <div className="relative" ref={openDropdown === song.id ? dropdownRef : null}>
                          <motion.button
                            onClick={(e) => handleMoreClick(e, song.id)}
                            className="text-gray-400 hover:text-white transition-colors p-1"
                            whileHover={{ scale: 1.2 }}
                          >
                            <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                          </motion.button>

                          {/* Mobile Dropdown */}
                          <AnimatePresence>
                            {openDropdown === song.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 py-2"
                              >
                                <button
                                  onClick={() => handleAddToQueue(song.id)}
                                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add to queue</span>
                                </button>
                                <button
                                  onClick={() => handleAddToPlaylist(song.id)}
                                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <ListPlus className="w-4 h-4" />
                                  <span>Add to playlist</span>
                                </button>
                                <button
                                  onClick={() => handleShare(song.id)}
                                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <Share className="w-4 h-4" />
                                  <span>Share</span>
                                </button>
                                <hr className="border-gray-700 my-2" />
                                <button
                                  onClick={() => handleRemoveFromLiked(song.id)}
                                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Remove from liked</span>
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:grid lg:grid-cols-[60px_1fr_300px_200px_120px_80px] gap-4 px-4 sm:px-6 pt-2 sm:pt-3 pb-2 sm:pb-3 items-center">
                      <div className="flex items-center justify-center">
                        {hoveredSong === song.id ? (
                          <motion.button
                            className="text-white"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Play className="w-4 h-4" fill="currentColor" />
                          </motion.button>
                        ) : (
                          <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                        <div className="relative flex-shrink-0">
                          <AnimatePresence>
                            {hoveredSong === song.id && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 rounded flex items-center justify-center z-10"
                              >
                                <Play className="text-white w-4 h-4" fill="currentColor" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <img
                            src={song.cover}
                            alt={song.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-medium text-sm sm:text-base truncate group-hover:text-green-400 transition-colors">
                            {song.title}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm truncate hover:text-white transition-colors cursor-pointer">
                            {song.artist}
                          </p>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <span className="text-gray-400 text-sm truncate hover:text-white hover:underline transition-colors cursor-pointer block">
                          {song.album || song.title}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-400 text-sm">
                          3 days ago
                        </span>
                      </div>

                      <div className="flex items-center justify-end space-x-2">
                        {hoveredSong === song.id && (
                          <motion.button
                            className="text-green-500 hover:text-green-400 transition-all duration-200"
                            whileHover={{ scale: 1.2 }}
                          >
                            <Heart className="w-4 h-4" fill="currentColor" />
                          </motion.button>
                        )}
                        <div className="relative" ref={openDropdown === song.id ? dropdownRef : null}>
                          {hoveredSong === song.id && (
                            <motion.button
                              onClick={(e) => handleMoreClick(e, song.id)}
                              className="text-gray-400 hover:text-white transition-all duration-200"
                              whileHover={{ scale: 1.2 }}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </motion.button>
                          )}

                          {/* Desktop Dropdown */}
                          <AnimatePresence>
                            {openDropdown === song.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute right-0 top-full mt-2 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 py-2"
                              >
                                <button
                                  onClick={() => handleAddToQueue(song.id)}
                                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <Plus className="w-4 h-4" />
                                  <span>Add to queue</span>
                                </button>
                                <button
                                  onClick={() => handleAddToPlaylist(song.id)}
                                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <ListPlus className="w-4 h-4" />
                                  <span>Add to playlist</span>
                                </button>
                                <button
                                  onClick={() => handleShare(song.id)}
                                  className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <Share className="w-4 h-4" />
                                  <span>Share</span>
                                </button>
                                <hr className="border-gray-700 my-2" />
                                <button
                                  onClick={() => handleRemoveFromLiked(song.id)}
                                  className="w-full px-4 py-3 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center space-x-3"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Remove from liked</span>
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                          {formatDuration(song.duration)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LikedSongs;