
import React from 'react';
import { useMusicContext } from '../contexts/MusicContext';
import PageTransition from '../components/PageTransition';
import FadeInSection from '../components/FadeInSection';
import TrendingSection from '../components/TrendingSection';
import PopularArtistsSection from '../components/PopularArtistsSection';

const Home: React.FC = () => {
  const { songs, artists } = useMusicContext();
  const trendingSongs = songs;
  const popularArtists = artists;

  return (
    <PageTransition className="min-h-full text-white overflow-hidden">
      <div className="py-8 w-full max-w-full min-w-0">
        <FadeInSection>
          <TrendingSection songs={trendingSongs} />
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <PopularArtistsSection artists={popularArtists} />
        </FadeInSection>
      </div>
    </PageTransition>
  );
};

export default Home;
