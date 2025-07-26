import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PlayerBar from '../components/PlayerBar';
import MobileNavigation from '../components/MobileNavigation';
import MobileSidebar from '../components/MobileSidebar';
import Queue from '../components/Queue';
import { useMusicContext } from '../contexts/MusicContext';

const MainLayout: React.FC = () => {
  const { currentSong } = useMusicContext();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="bg-black flex h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 will-change-transform">
        <Header onToggleSidebar={toggleMobileSidebar} />
      </div>

      <div className={`flex w-full h-full pt-16 ${currentSong ? 'pb-40 lg:pb-32' : 'pb-20 lg:pb-4'}`}>
        <div className="hidden lg:block w-80 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <Sidebar />
        </div>

        <main className="flex-1 text-white p-2 pr-4 lg:pr-6 h-full overflow-hidden">
          <div className="bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0a0a0a] rounded-lg h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth">
            <Outlet />
          </div>
        </main>
      </div>

      {currentSong && <PlayerBar />}
      <Queue />
      <MobileNavigation />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
    </div>
  );
};

export default MainLayout;