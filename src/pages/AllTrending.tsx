import React from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import MusicCard from '../components/MusicCard';
import PageTransition from '../components/PageTransition';

const AllTrending: React.FC = () => {
  const { songs } = useMusicContext();

  return (
    <PageTransition>
      <div className="min-h-full text-white">
        <div className="pl-6 pr-8 py-8">
          <div className="mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight mb-3">
              Trending songs
            </h1>
            <p className="text-gray-400 text-lg">
              The most played tracks right now
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {songs.map((song) => (
              <MusicCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AllTrending;
