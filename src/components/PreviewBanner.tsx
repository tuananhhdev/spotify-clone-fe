import React from 'react';
import { Link } from 'react-router-dom';

const PreviewBanner: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex-1">
          <h3 className="font-bold text-sm mb-1">Preview of Spotify</h3>
          <p className="text-sm opacity-90">
            Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
          </p>
        </div>
        
        <Link
          to="/signup"
          className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform ml-4 whitespace-nowrap"
        >
          Sign up free
        </Link>
      </div>
    </div>
  );
};

export default PreviewBanner;
