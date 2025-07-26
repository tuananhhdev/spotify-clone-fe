import React from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import ArtistCard from '../components/ArtistCard';
import PageTransition from '../components/PageTransition';

const AllArtists: React.FC = () => {
  const { artists } = useMusicContext();

  return (
    <PageTransition>
      <div className="min-h-full text-white">
        <div className="pl-6 pr-8 py-8">
          <h1 className="text-white text-4xl font-bold mb-6">All Artists</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AllArtists;
