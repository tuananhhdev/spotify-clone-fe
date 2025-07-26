import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  List,
  MoreHorizontal,
  ChevronUp
} from 'lucide-react';
import { useMusicContext } from '../contexts/MusicContext';

const PlayerBar: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlayPause,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    toggleLike,
    repeatMode,
    toggleRepeat,
    isShuffled,
    toggleShuffle,
    toggleQueue
  } = useMusicContext();

  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  if (!currentSong) {
    return null;
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seekTo(percent * duration);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;

    const rect = volumeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(percent);
    setIsMuted(percent === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };



  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  return (
    <AnimatePresence>
      {/* Desktop Player */}
      <motion.div
        className="hidden lg:block fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-[#181818] to-[#181818] border-t border-[#2a2a2a] px-4 py-3 z-40 backdrop-blur-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3
        }}
      >
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          {/* Left: Current Song Info */}
          <div className="flex items-center space-x-4 w-1/4 min-w-0">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                loading="lazy"
                className="w-14 h-14 rounded-lg object-cover shadow-lg"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <div className="min-w-0 flex-1">
              <h4 className="text-white text-sm font-medium truncate hover:underline cursor-pointer transition-colors">
                {currentSong.title}
              </h4>
              <p className="text-gray-400 text-xs truncate hover:underline hover:text-white cursor-pointer transition-colors">
                {currentSong.artist}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleLike(currentSong.id)}
                className={`p-2 rounded-full transition-all hover:scale-110 ${currentSong.isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'
                  }`}
              >
                <Heart className={`w-4 h-4 ${currentSong.isLiked ? 'fill-current' : ''}`} />
              </button>

            </div>
          </div>

          {/* Center: Player Controls */}
          <div className="flex flex-col items-center w-2/4 max-w-xl">
            {/* Control Buttons */}
            <div className="flex items-center space-x-6 mb-3">
              <motion.button
                onClick={toggleShuffle}
                className={`p-1 rounded ${isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'
                  }`}
                title="Shuffle"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Shuffle className="w-4 h-4" />
              </motion.button>

              <button
                onClick={previousSong}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Previous"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <motion.button
                onClick={togglePlayPause}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg"
                title={isPlaying ? 'Pause' : 'Play'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </motion.button>

              <button
                onClick={nextSong}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Next"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <motion.button
                onClick={toggleRepeat}
                className={`p-1 rounded relative ${repeatMode > 0 ? 'text-green-500' : 'text-gray-400 hover:text-white'
                  }`}
                title={repeatMode === 0 ? 'Repeat off' : repeatMode === 1 ? 'Repeat all' : 'Repeat one'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Repeat className="w-4 h-4" />
                {repeatMode === 2 && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                )}
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 w-full">
              <span className="text-xs text-gray-400 w-10 text-right font-mono">
                {formatTime(currentTime)}
              </span>

              <div
                ref={progressRef}
                className="flex-1 bg-gray-600/50 rounded-full h-1 relative group cursor-pointer overflow-hidden"
                onClick={handleSeek}
                onTouchStart={handleSeek}
              >
                <div className="absolute inset-0 bg-gray-600 rounded-full" />
                <div
                  className="bg-white rounded-full h-full relative transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                </div>
                <div
                  className="absolute inset-0 bg-green-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs text-gray-400 w-10 font-mono">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Additional Controls */}
          <div className="flex items-center space-x-3 w-1/4 justify-end">
            <motion.button
              onClick={toggleQueue}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              title="Queue"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <List className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center space-x-2 group">
              <button
                onClick={toggleMute}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <div className="w-24 opacity-70 group-hover:opacity-100 transition-opacity">
                <div
                  ref={volumeRef}
                  className="bg-gray-600/50 rounded-full h-1 relative cursor-pointer group/volume"
                  onClick={handleVolumeChange}
                >
                  <div className="absolute inset-0 bg-gray-600 rounded-full" />
                  <div
                    className="bg-white rounded-full h-full relative"
                    style={{ width: `${volumePercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/volume:opacity-100 transition-opacity shadow-lg" />
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </motion.div>

      {/* Mobile Player - Mini Bar */}
      <motion.div
        className="lg:hidden fixed bottom-16 left-0 right-0 bg-gradient-to-t from-black via-[#181818] to-[#181818] border-t border-[#2a2a2a] z-40 backdrop-blur-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3,
          delay: 0.1
        }}
      >
        {/* Progress bar at top */}
        <div
          ref={progressRef}
          className="w-full bg-gray-600 h-0.5 cursor-pointer"
          onClick={handleSeek}
          onTouchStart={handleSeek}
        >
          <div
            className="bg-white h-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mini player content */}
        <div className="flex items-center justify-between p-3">
          <div
            className="flex items-center space-x-3 flex-1 min-w-0"
            onClick={() => setShowMobilePlayer(true)}
          >
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              loading="lazy"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-white text-sm font-medium truncate">
                {currentSong.title}
              </h4>
              <p className="text-gray-400 text-xs truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleLike(currentSong.id)}
              className={`p-2 transition-colors ${currentSong.isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'
                }`}
            >
              <Heart className={`w-5 h-5 ${currentSong.isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Full Player Overlay */}
      <AnimatePresence>
        {showMobilePlayer && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-gradient-to-b from-[#1e3a8a] via-[#181818] to-black z-50 overflow-hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setShowMobilePlayer(false)}
                  className="p-2 text-white"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Playing from playlist</p>
                  <p className="text-sm text-white font-medium">Liked Songs</p>
                </div>
                <button className="p-2 text-white">
                  <MoreHorizontal className="w-6 h-6" />
                </button>
              </div>

              {/* Album Art */}
              <div className="flex-1 flex items-center justify-center mb-8">
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  loading="lazy"
                  className="w-80 h-80 max-w-[90vw] max-h-[50vh] rounded-lg object-cover shadow-2xl"
                />
              </div>

              {/* Song Info */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-white text-2xl font-bold truncate mb-1">
                      {currentSong.title}
                    </h1>
                    <p className="text-gray-400 text-lg truncate">
                      {currentSong.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleLike(currentSong.id)}
                    className={`p-3 transition-colors ${currentSong.isLiked ? 'text-green-500' : 'text-gray-400'
                      }`}
                  >
                    <Heart className={`w-7 h-7 ${currentSong.isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Progress */}
                <div
                  ref={progressRef}
                  className="bg-gray-600 rounded-full h-2 mb-2 cursor-pointer"
                  onClick={handleSeek}
                  onTouchStart={handleSeek}
                >
                  <div
                    className="bg-white rounded-full h-full relative"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-8">
                <motion.button
                  onClick={toggleShuffle}
                  className={`p-2 ${isShuffled ? 'text-green-500' : 'text-gray-400'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Shuffle className="w-6 h-6" />
                </motion.button>

                <button onClick={previousSong} className="p-2 text-white">
                  <SkipBack className="w-8 h-8" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>

                <button onClick={nextSong} className="p-2 text-white">
                  <SkipForward className="w-8 h-8" />
                </button>

                <motion.button
                  onClick={toggleRepeat}
                  className={`p-2 relative ${repeatMode > 0 ? 'text-green-500' : 'text-gray-400'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Repeat className="w-6 h-6" />
                  {repeatMode === 2 && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"></span>
                  )}
                </motion.button>
              </div>

              {/* Bottom actions */}
              <div className="flex items-center justify-center">
                <motion.button
                  onClick={toggleQueue}
                  className="p-2 text-gray-400"
                  title="Queue"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default PlayerBar;