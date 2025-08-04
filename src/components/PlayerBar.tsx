import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
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
  ChevronDown
} from 'lucide-react';
import { useMusicContext } from '../hook/useMusicContext';
import useDominantColor from '../hook/useDominantColor';

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
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const { dominantColor } = useDominantColor(currentSong?.cover || "")

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



  const slideUpVariant = {
    hidden: {
      y: 100,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8,
        duration: 0.6
      } as Transition
    },
    exit: {
      y: 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4
      } as Transition
    }
  };

  const mobilePlayerVariant = {
    hidden: {
      y: "100%",
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      } as Transition
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 35,
        duration: 0.3
      } as Transition
    }
  };

  const buttonHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 400, damping: 17 } as Transition
  };

  const buttonTap = {
    scale: 0.95,
    transition: { type: "spring", stiffness: 400, damping: 17 } as Transition
  };

  return (
    <AnimatePresence mode="wait">
      {/* Desktop Player */}
      <motion.div
        className="hidden lg:block fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-[#181818]/95 to-[#181818]/90 border-t border-[#2a2a2a]/80 px-4 py-3 z-40 backdrop-blur-xl"
        variants={slideUpVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          {/* Left: Current Song Info */}
          <div className="flex items-center space-x-4 w-1/4 min-w-0 xl:w-1/3">
            <motion.div
              className="relative group cursor-pointer w-14 h-14 xl:w-16 xl:h-16 rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>

            <div className="min-w-0 flex-1">
              <motion.h4
                className="text-white text-sm xl:text-base font-medium truncate hover:underline cursor-pointer transition-colors"
                whileHover={{ color: "#1db954", scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {currentSong.title}
              </motion.h4>
              <motion.p
                className="text-gray-400 text-xs xl:text-sm truncate hover:underline cursor-pointer transition-colors"
                whileHover={{ color: "#ffffff", scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {currentSong.artist}
              </motion.p>
            </div>

            <motion.button
              onClick={() => toggleLike(currentSong.id)}
              className={`p-2 rounded-full transition-all ${currentSong.isLiked
                ? 'text-green-500 bg-green-500/10'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Heart className={`w-4 h-4 xl:w-5 xl:h-5 ${currentSong.isLiked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {/* Center: Player Controls */}
          <div className="flex flex-col items-center w-2/4 max-w-2xl xl:w-1/3">
            {/* Control Buttons */}
            <div className="flex items-center space-x-4 xl:space-x-6 mb-3">
              <motion.button
                onClick={toggleShuffle}
                className={`p-2 rounded-full transition-colors ${isShuffled
                  ? 'text-green-500 bg-green-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                title="Shuffle"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Shuffle className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={previousSong}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                title="Previous"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <SkipBack className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={togglePlayPause}
                className="w-10 h-10 xl:w-12 xl:h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl hover:shadow-2xl transition-shadow"
                title={isPlaying ? 'Pause' : 'Play'}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Pause className="w-5 h-5 xl:w-6 xl:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Play className="w-5 h-5 xl:w-6 xl:h-6 ml-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                onClick={nextSong}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                title="Next"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <SkipForward className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={toggleRepeat}
                className={`p-2 rounded-full relative transition-colors ${repeatMode > 0
                  ? 'text-green-500 bg-green-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                title={repeatMode === 0 ? 'Repeat off' : repeatMode === 1 ? 'Repeat all' : 'Repeat one'}
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Repeat className="w-4 h-4" />
                <AnimatePresence>
                  {repeatMode === 2 && (
                    <motion.span
                      className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3 w-full">
              <span className="text-xs text-gray-400 w-10 text-right font-mono">
                {formatTime(currentTime)}
              </span>

              <div
                ref={progressRef}
                className="flex-1 bg-gray-600/30 rounded-full h-1 relative group cursor-pointer overflow-hidden hover:h-1.5 transition-all duration-200"
                onClick={handleSeek}
                onTouchStart={handleSeek}
              >
                <div className="absolute inset-0 bg-gray-600 rounded-full" />
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-green-400 rounded-full h-full relative"
                  style={{ width: `${progress}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                >
                  <motion.div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                </motion.div>
                <div
                  className="absolute inset-0 bg-green-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs text-gray-400 w-10 font-mono">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Additional Controls */}
          <div className="flex items-center space-x-2 xl:space-x-3 w-1/4 xl:w-1/3 justify-end">
            <motion.button
              onClick={toggleQueue}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              title="Queue"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <List className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center space-x-2 group">
              <motion.button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                title={isMuted ? 'Unmute' : 'Mute'}
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <AnimatePresence mode="wait">
                  {isMuted || volume === 0 ? (
                    <motion.div
                      key="muted"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <VolumeX className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="volume"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Volume2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.div
                className="w-20 xl:w-28 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onMouseLeave={() => setShowVolumeSlider(false)}
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: showVolumeSlider ? 1 : 0,
                  width: showVolumeSlider ? 112 : 80
                }}
                transition={{ duration: 0.2 }}
              >
                <div
                  ref={volumeRef}
                  className="bg-gray-600/30 rounded-full h-1 relative cursor-pointer group/volume hover:h-1.5 transition-all duration-200"
                  onClick={handleVolumeChange}
                >
                  <div className="absolute inset-0 bg-gray-600 rounded-full" />
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-400 rounded-full h-full relative"
                    style={{ width: `${volumePercent}%` }}
                    animate={{ width: `${volumePercent}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  >
                    <motion.div
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/volume:opacity-100"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Player - Mini Bar */}
      <motion.div
        className="lg:hidden fixed bottom-16 left-0 right-0 bg-gradient-to-t from-[#1a1a1a] via-[#181818]/95 to-[#181818]/90 border-t border-[#2a2a2a]/80 z-40 pb-4"
        variants={slideUpVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Progress bar at top */}
        <motion.div
          ref={progressRef}
          className="w-full bg-gray-600/30 h-1 cursor-pointer"
          onClick={handleSeek}
          onTouchStart={handleSeek}
        >
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-400 h-full"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </motion.div>

        {/* Mini player content */}
        <div className="flex items-center justify-between p-3 sm:p-4">
          <motion.div
            className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => setShowMobilePlayer(true)}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shadow-lg ring-1 ring-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h4
                className="text-white text-sm sm:text-base font-medium truncate"
                whileHover={{ color: "#1db954", scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {currentSong.title}
              </motion.h4>
              <motion.p
                className="text-gray-400 text-xs sm:text-sm truncate"
                whileHover={{ color: "#ffffff", scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {currentSong.artist}
              </motion.p>
            </div>
          </motion.div>

          <div>
            <motion.button
              onClick={togglePlayPause}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Full Player Overlay */}
      <AnimatePresence>
        {showMobilePlayer && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 overflow-hidden backdrop-blur-2xl shadow-inner"
            style={{
              background: `linear-gradient(to bottom, ${dominantColor}, rgba(24,24,24,0.9) 65%, #000 100%)`,
              transition: 'background 0.7s ease',
            }}
            transition={{ duration: 0.7 }}
            variants={mobilePlayerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full p-4 sm:p-6 pb-6">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-6 sm:mb-8"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <motion.button
                  onClick={() => setShowMobilePlayer(false)}
                  className="p-2 text-white rounded-full hover:bg-white/10"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.button>
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Playing from playlist</p>
                  <p className="text-sm text-white font-medium">Liked Songs</p>
                </div>
                <motion.button
                  className="p-2 text-white rounded-full hover:bg-white/10"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <MoreHorizontal className="w-6 h-6" />
                </motion.button>
              </motion.div>

              {/* Album Art */}
              <motion.div
                className="flex-1 flex items-center justify-center mb-6 sm:mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
              >
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  loading="lazy"
                  className="w-72 h-72 sm:w-80 sm:h-80 max-w-[85vw] max-h-[40vh] rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                />
              </motion.div>

              {/* Song Info */}
              <motion.div
                className="mb-6 sm:mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-white text-xl sm:text-2xl font-bold truncate mb-1">
                      {currentSong.title}
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg truncate">
                      {currentSong.artist}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => toggleLike(currentSong.id)}
                    className={`p-3 transition-colors rounded-full ${currentSong.isLiked
                      ? 'text-green-500 bg-green-500/10'
                      : 'text-gray-400 hover:bg-white/10'
                      }`}
                    whileHover={buttonHover}
                    whileTap={buttonTap}
                  >
                    <Heart className={`w-7 h-7 ${currentSong.isLiked ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>

                {/* Progress */}
                <div
                  ref={progressRef}
                  className="bg-gray-600/30 rounded-full h-2 mb-2 cursor-pointer"
                  onClick={handleSeek}
                  onTouchStart={handleSeek}
                >
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-400 rounded-full h-full relative"
                    style={{ width: `${progress}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </motion.div>

              {/* Controls */}
              <motion.div
                className="flex items-center justify-between mb-6 sm:mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <motion.button
                  onClick={toggleShuffle}
                  className={`p-3 rounded-full transition-colors ${isShuffled
                    ? 'text-green-500 bg-green-500/10'
                    : 'text-gray-400 hover:bg-white/10'
                    }`}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <Shuffle className="w-6 h-6" />
                </motion.button>

                <motion.button
                  onClick={previousSong}
                  className="p-3 text-white rounded-full hover:bg-white/10"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <SkipBack className="w-8 h-8" />
                </motion.button>

                <motion.button
                  onClick={togglePlayPause}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center text-black shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Pause className="w-8 h-8 sm:w-10 sm:h-10" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={nextSong}
                  className="p-3 text-white rounded-full hover:bg-white/10"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <SkipForward className="w-8 h-8" />
                </motion.button>

                <motion.button
                  onClick={toggleRepeat}
                  className={`p-3 rounded-full relative transition-colors ${repeatMode > 0
                    ? 'text-green-500 bg-green-500/10'
                    : 'text-gray-400 hover:bg-white/10'
                    }`}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <Repeat className="w-6 h-6" />
                  <AnimatePresence>
                    {repeatMode === 2 && (
                      <motion.span
                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Bottom actions */}
              <motion.div
                className="flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <motion.button
                  onClick={toggleQueue}
                  className="p-3 text-gray-400 rounded-full hover:bg-white/10"
                  title="Queue"
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default PlayerBar;