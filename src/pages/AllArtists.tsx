import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import { useMusicContext } from '../hook/useMusicContext';
import ArtistCard from '../components/ArtistCard';

const AllArtists: React.FC = () => {
  const { artists, playSong, setPlaylist, getSongsByArtist } = useMusicContext();
  const navigate = useNavigate();

  const handlePlayArtist = (artistId: string) => {
    const artistSongs = getSongsByArtist(artistId);
    if (artistSongs.length > 0) {
      setPlaylist(artistSongs);
      playSong(artistSongs[0]);
    }
  };

  const handleArtistClick = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <PageTransition>
      <ArtistCard
        artists={artists}
        onPlayArtist={handlePlayArtist}
        onArtistClick={handleArtistClick}
      />
    </PageTransition>
  );
};

export default AllArtists;