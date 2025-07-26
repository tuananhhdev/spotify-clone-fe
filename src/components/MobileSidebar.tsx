import React from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Heart, TrendingUp, Users } from 'lucide-react';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-black z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0a0a0a] h-full flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <h2 className="text-white font-bold text-lg">Menu</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent smooth-scroll">
            <div className="p-6">
              {/* Quick Navigation */}
              <div className="space-y-2 mb-6">
                <Link
                  to="/search"
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 py-2 hover:translate-x-1"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </Link>
               
                <Link
                  to="/liked"
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 py-2 hover:translate-x-1"
                >
                  <Heart className="w-4 h-4" />
                  <span>Liked Songs</span>
                </Link>
                <Link
                  to="/trending"
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 py-2 hover:translate-x-1"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Trending Songs</span>
                </Link>
                <Link
                  to="/artists"
                  onClick={onClose}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 py-2 hover:translate-x-1"
                >
                  <Users className="w-4 h-4" />
                  <span>Popular Artists</span>
                </Link>
               
              </div>

              {/* Create Playlist Section */}
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <h3 className="text-white font-bold text-base mb-2">Create your first playlist</h3>
                <p className="text-gray-400 text-sm mb-4">It's easy, we'll help you</p>
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all duration-200 hover:shadow-lg active:scale-95">
                  Create playlist
                </button>
              </div>

              {/* Podcasts Section */}
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <h3 className="text-white font-bold text-sm mb-2 leading-tight">Let's find some podcasts to follow</h3>
                <p className="text-gray-400 text-xs mb-3 leading-tight">We'll keep you updated on new episodes</p>
                <div className="w-12 h-1 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="p-6 pt-4 border-t border-gray-800">
            {/* Footer Links */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
                <Link to="/legal" onClick={onClose} className="hover:text-white transition-colors">Legal</Link>
                <Link to="/safety" onClick={onClose} className="hover:text-white transition-colors">Safety & Privacy Center</Link>
                <Link to="/privacy" onClick={onClose} className="hover:text-white transition-colors">Privacy Policy</Link>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
                <Link to="/cookies" onClick={onClose} className="hover:text-white transition-colors">Cookies</Link>
                <Link to="/ads" onClick={onClose} className="hover:text-white transition-colors">About Ads</Link>
                <Link to="/accessibility" onClick={onClose} className="hover:text-white transition-colors">Accessibility</Link>
              </div>
              <div className="text-xs text-gray-400">
                <Link to="/cookies" onClick={onClose} className="hover:text-white transition-colors">Cookies</Link>
              </div>
            </div>

            {/* Language Selector */}
            <div className="mt-6">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors border border-gray-600 rounded-full px-3 py-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">English</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
