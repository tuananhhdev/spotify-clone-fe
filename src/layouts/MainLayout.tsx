import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PlayerBar from '../components/PlayerBar';
import MobileNavigation from '../components/MobileNavigation';
import MobileSidebar from '../components/MobileSidebar';
import Queue from '../components/Queue';
import { useMusicContext } from '../hook/useMusicContext';

const MainLayout: React.FC = () => {
  const { currentSong } = useMusicContext();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);
  const openMobileSidebar = () => setIsMobileSidebarOpen(true);

  return (
    <div className="bg-black h-screen overflow-hidden flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <Header onOpenMenu={openMobileSidebar} />
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-1 pt-16 sm:px-2 ${currentSong ? 'pb-40 sm:pb-20' : 'sm:pb-2'} overflow-hidden`}
      >
        {/* Sidebar */}
        <div className="hidden lg:block w-[400px] h-full rounded-lg overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0a0a0a] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-hidden text-white ml-0 lg:ml-2">
          <div className="bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0a0a0a] rounded-none lg:rounded-lg h-full overflow-y-auto ">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Fixed bottom elements */}
      {currentSong && <PlayerBar />}
      <Queue />
      <MobileNavigation />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />
    </div>
  );
};

export default MainLayout;