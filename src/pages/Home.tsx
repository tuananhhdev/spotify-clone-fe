
import React from 'react';
import PageTransition from '../components/PageTransition';
import FadeInSection from '../components/FadeInSection';
import TrendingSection from '../components/TrendingSection';
import PopularArtistsSection from '../components/PopularArtistsSection';
import { useMusicContext } from '../hook/useMusicContext';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const { songs, artists } = useMusicContext();

  return (
    <PageTransition>
      <div className="pt-5 sm:pt-8 pl-5 sm:pl-8">
        <FadeInSection>
          <TrendingSection songs={songs} />
        </FadeInSection>

        <FadeInSection>
          <PopularArtistsSection artists={artists} />
        </FadeInSection>

        <FadeInSection>
          <Footer />
        </FadeInSection>
      </div>

    </PageTransition>
  );
};

export default Home;
