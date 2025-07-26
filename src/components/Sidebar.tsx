import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Sidebar: React.FC = () => {

  return (
    <aside className="w-80 text-white flex flex-col h-full p-2">
      <div className="bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0a0a0a] rounded-lg h-full flex flex-col">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent smooth-scroll">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Your Library</h2>
              <button className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-2 mb-6">

              <Link
                to="/liked"
                className="block text-gray-300 hover:text-white text-sm font-medium transition-colors py-2"
              >
                Liked Songs
              </Link>
              <Link
                to="/trending"
                className="block text-gray-300 hover:text-white text-sm font-medium transition-colors py-2"
              >
                Trending Songs
              </Link>
              <Link
                to="/artists"
                className="block text-gray-300 hover:text-white text-sm font-medium transition-colors py-2"
              >
                Popular Artists
              </Link>

            </div>

            {/* Create Playlist Section */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <h3 className="text-white font-bold text-base mb-2">Create your first playlist</h3>
              <p className="text-gray-400 text-sm mb-4">It's easy, we'll help you</p>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
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
              <Link to="/legal" className="hover:text-white transition-colors">Legal</Link>
              <Link to="/safety" className="hover:text-white transition-colors">Safety & Privacy Center</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <Link to="/ads" className="hover:text-white transition-colors">About Ads</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            </div>
            <div className="text-xs text-gray-400">
              <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
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
  );
};

export default Sidebar;