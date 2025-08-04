import React, { useState, useEffect } from 'react';
import MusicCard from '../components/MusicCard';
import PageTransition from '../components/PageTransition';
import { useMusicContext } from '../hook/useMusicContext';

const AllTrending: React.FC = () => {
  const { songs } = useMusicContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen mb-20 sm:mb-0">
        {/* Header Section - Spotify Style */}
        <div className={`px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6 transition-all duration-700 ease-out transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Mobile Header */}
          <div className="block sm:hidden mb-6">
            <h1 className="text-white text-2xl font-bold mb-2">
              Trending songs
            </h1>
            <p className="text-gray-400 text-sm">
              The most played tracks right now
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden sm:block ">
            <h1 className={`text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-2 transition-all duration-500 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Trending songs
            </h1>
            
          </div>
        </div>

        {/* Songs Grid - Spotify Layout */}
        <div className={`px-4 sm:px-6 lg:px-8 pb-32 sm:pb-8 transition-all duration-700 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Mobile Grid: 2 columns */}
          <div className="block sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`transition-all duration-500 ease-out ${
                    isLoaded ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <MusicCard song={song} />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Grid: 3-4 columns */}
          <div className="hidden sm:block md:hidden">
            <div className="grid grid-cols-3 gap-4">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`transition-all duration-500 ease-out ${
                    isLoaded ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${600 + index * 80}ms` }}
                >
                  <MusicCard song={song} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid: 4-6 columns */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-4 gap-5">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`transition-all duration-500 ease-out ${
                    isLoaded ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${600 + index * 60}ms` }}
                >
                  <MusicCard song={song} />
                </div>
              ))}
            </div>
          </div>

          {/* Large Desktop Grid: 5-6 columns */}
          <div className="hidden lg:block xl:hidden">
            <div className="grid grid-cols-5 gap-6">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`transition-all duration-500 ease-out ${
                    isLoaded ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${600 + index * 50}ms` }}
                >
                  <MusicCard song={song} />
                </div>
              ))}
            </div>
          </div>

          {/* Extra Large Desktop Grid: 6+ columns */}
          <div className="hidden xl:block">
            <div className="grid grid-cols-6 2xl:grid-cols-7 gap-6">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`transition-all duration-500 ease-out ${
                    isLoaded ? 'animate-fade-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${600 + index * 40}ms` }}
                >
                  <MusicCard song={song} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    </PageTransition>
  );
};

export default AllTrending;