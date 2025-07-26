import React, { useState } from 'react';
import { Play, Pause, Heart, Download, MoreHorizontal, Clock } from 'lucide-react';
import { songs } from '../data/songs';

const LikedSongs: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSong, setHoveredSong] = useState<string | null>(null);

  // Filter only liked songs
  const likedSongs = songs.filter(song => song.isLiked);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSongPlay = (songId: string) => {
    console.log('Playing song:', songId);
  };

  const formatDuration = (duration: string) => {
    return duration;
  };

  const getTotalDuration = () => {
    // Simple calculation for demo
    return `${likedSongs.length * 3} min`;
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-purple-800 via-purple-900 to-black">
      {/* Header */}
      <div className="pl-6 pr-8 py-8 pb-6">
        <div className="flex items-end space-x-6">
          {/* Liked Songs Icon */}
          <div className="w-60 h-60 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg shadow-2xl flex items-center justify-center">
            <Heart className="text-white w-20 h-20" fill="currentColor" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium mb-2">PLAYLIST</p>
            <h1 className="text-white text-6xl font-bold mb-6 leading-none">
              Liked Songs
            </h1>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-medium">Your liked songs</span>
              <span>•</span>
              <span>{likedSongs.length} songs</span>
              <span>•</span>
              <span>{getTotalDuration()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pl-6 pr-8 py-6 bg-gradient-to-b from-black/20 to-transparent">
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePlayPause}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="text-xl" />
            ) : (
              <Play className="text-xl ml-1" />
            )}
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <Download className="text-xl" />
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="text-xl" />
          </button>
        </div>
      </div>

      {/* Song List */}
      <div className="pl-6 pr-8 pb-8">
        {likedSongs.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="text-gray-500 w-16 h-16 mx-auto mb-4" />
            <h2 className="text-white text-2xl font-bold mb-2">Songs you like will appear here</h2>
            <p className="text-gray-400">Save songs by tapping the heart icon.</p>
          </div>
        ) : (
          <div className="bg-black/20 rounded-lg">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-gray-400 text-sm border-b border-gray-700">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-6">TITLE</div>
              <div className="col-span-3">ALBUM</div>
              <div className="col-span-1">DATE ADDED</div>
              <div className="col-span-1 text-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>

            {/* Songs */}
            <div className="divide-y divide-gray-700/50">
              {likedSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-white/10 transition-colors group cursor-pointer"
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                  onClick={() => handleSongPlay(song.id)}
                >
                  <div className="col-span-1 flex items-center justify-center">
                    {hoveredSong === song.id ? (
                      <button className="text-white">
                        <Play className="text-sm" />
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">{index + 1}</span>
                    )}
                  </div>

                  <div className="col-span-6 flex items-center space-x-3 min-w-0">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <h3 className="text-white font-medium truncate group-hover:text-green-400 transition-colors">
                        {song.title}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <span className="text-gray-400 text-sm truncate">
                      {song.album || song.title}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center">
                    <span className="text-gray-400 text-sm">
                      3 days ago
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      {hoveredSong === song.id && (
                        <button className="text-green-500 hover:text-green-400 transition-colors opacity-0 group-hover:opacity-100">
                          <Heart className="w-4 h-4" fill="currentColor" />
                        </button>
                      )}
                      <span className="text-gray-400 text-sm">
                        {formatDuration(song.duration)}
                      </span>
                      {hoveredSong === song.id && (
                        <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="text-sm" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
