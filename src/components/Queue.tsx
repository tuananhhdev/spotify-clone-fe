import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Trash2 } from 'lucide-react';
import { useMusicContext } from '../hook/useMusicContext';

const Queue: React.FC = () => {
  const {
    queue,
    showQueue,
    toggleQueue,
    removeFromQueue,
    clearQueue,
    playFromQueue,
    currentSong
  } = useMusicContext();

  if (!showQueue) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-0 top-0 h-full w-80 bg-[#121212] border-l border-[#2a2a2a] z-50 flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
          <h2 className="text-white text-lg font-semibold">Queue</h2>
          <div className="flex items-center space-x-2">
            {queue.length > 0 && (
              <motion.button
                onClick={clearQueue}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                title="Clear queue"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            )}
            <motion.button
              onClick={toggleQueue}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Current Song */}
        {currentSong && (
          <div className="p-4 border-b border-[#2a2a2a]">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Now Playing</h3>
            <div className="flex items-center space-x-3">
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                loading="lazy"
                className="w-12 h-12 rounded-md object-cover"
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
          </div>
        )}

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto">
          {queue.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Your queue is empty</h3>
              <p className="text-gray-400 text-sm">
                Add songs to your queue to see them here
              </p>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">
                Next in queue ({queue.length})
              </h3>
              <div className="space-y-2">
                {queue.map((song, index) => (
                  <motion.div
                    key={`${song.id}-${index}`}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-white/5 transition-colors group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="relative">
                      <img
                        src={song.cover}
                        alt={song.title}
                        loading="lazy"
                        className="w-10 h-10 rounded object-cover"
                      />
                      <motion.button
                        onClick={() => playFromQueue(song)}
                        className="absolute inset-0 bg-black/60 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">
                        {song.title}
                      </h4>
                      <p className="text-gray-400 text-xs truncate">
                        {song.artist}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => removeFromQueue(song.id)}
                      className="p-1 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={toggleQueue}
      />
    </AnimatePresence>
  );
};

export default Queue;
