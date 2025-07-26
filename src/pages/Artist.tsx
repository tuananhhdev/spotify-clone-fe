import React from 'react';
import { useParams } from 'react-router-dom';
import { Play, UserPlus, MoreHorizontal } from 'lucide-react';
import { useMusicContext } from '../contexts/MusicContext';

const Artist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { artists, getSongsByArtist, playSong } = useMusicContext();
  const artist = artists.find(a => a.id === id);

  if (!artist) {
    return (
      <div className="min-h-full text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artist not found</h1>
          <p className="text-gray-400">The artist you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Get artist's songs using the new function
  const artistSongs = getSongsByArtist(artist.id);

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-blue-900 via-blue-800 to-black">
      {/* Artist Header */}
      <div className="pl-6 pr-8 py-8 pb-6">
        <div className="flex items-end space-x-6">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-60 h-60 rounded-full shadow-2xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-2">
              <svg className="w-6 h-6 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-400 text-sm font-medium">Verified Artist</span>
            </div>
            <h1 className="text-white text-6xl font-bold mb-6 leading-none">
              {artist.name}
            </h1>
            <p className="text-gray-300 text-lg">
              {formatFollowers(artist.followers)} monthly listeners
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pl-6 pr-8 py-6 bg-gradient-to-b from-black/20 to-transparent">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => artistSongs.length > 0 && playSong(artistSongs[0])}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform disabled:opacity-50"
            disabled={artistSongs.length === 0}
          >
            <Play className="text-xl ml-1" />
          </button>

          <button className="border border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium hover:border-white transition-colors flex items-center space-x-2">
            <UserPlus />
            <span>{artist.isFollowing ? 'Following' : 'Follow'}</span>
          </button>

          <button className="text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="text-xl" />
          </button>
        </div>
      </div>

      {/* Popular Songs */}
      <div className="pl-6 pr-8 pb-8">
        <h2 className="text-white text-2xl font-bold mb-6">Popular</h2>

        {artistSongs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No songs available for this artist yet.</p>
          </div>
        ) : (
          <div>
            <div className="space-y-2">
              {artistSongs.slice(0, 5).map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center space-x-4 p-2 rounded-md hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <span className="text-gray-400 text-sm w-4 text-center group-hover:hidden">
                    {index + 1}
                  </span>
                  <button
                    onClick={() => playSong(song)}
                    className="hidden group-hover:block text-white hover:text-green-500 transition-colors"
                  >
                    <Play className="text-sm" />
                  </button>

                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-10 h-10 rounded"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">
                      {song.title}
                    </h3>
                  </div>

                  <span className="text-gray-400 text-sm">
                    {song.duration}
                  </span>
                </div>
              ))}
            </div>

            {artistSongs.length > 5 && (
              <button className="text-gray-400 hover:text-white text-sm font-medium mt-4">
                Show more
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artist;
