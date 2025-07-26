import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Download, Home } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showComingSoon } = useNotification();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAuthClick = (action: string) => {
    showComingSoon(`${action} feature`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!location.pathname.includes('/search')) {
      navigate('/search');
    }
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="px-6 h-16 flex items-center bg-black">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo + Home + Search */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <svg viewBox="0 0 1024 1024" className="w-5 h-5">
                <path fill="#000" d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zm234.7 739.1c-9.4 15.4-29.5 20.2-44.9 10.8-123-75.1-277.6-92.1-459.7-50.4-17.6 4-35.3-7-39.3-24.6s7-35.3 24.6-39.3c199.8-45.8 372.2-26.1 511.4 58.3 15.4 9.4 20.2 29.5 10.8 44.9l.1-.7zm64.1-142.6c-11.8 19.1-36.9 25.1-56 13.3-140.8-86.6-355.5-111.7-521.9-61.2-21.3 6.5-43.8-6.5-50.3-27.8s6.5-43.8 27.8-50.3c190.4-57.8 428.9-29.8 588.7 70.1 19.1 11.8 25.1 36.9 13.3 56l-1.6-.1zm5.5-148.4c-169-100.4-448.2-109.8-609.4-60.8-25.5 7.7-52.5-6.7-60.2-32.2s6.7-52.5 32.2-60.2c184.8-56.2 494.2-45.4 683.5 70.1 22.8 13.9 30 43.5 16.1 66.3-13.9 22.8-43.5 30-66.3 16.1l4.1-2.3z" />
              </svg>
            </div>
          </Link>
          {/* Home */}
          <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-[#121212] hover:bg-[#232323] transition-colors">
            <Home className="w-6 h-6 text-white" />
          </Link>
          {/* Search bar */}
          <div className="flex items-center bg-[#242424] rounded-full h-12 w-[360px] px-4 ml-2 transition-colors duration-200 focus-within:bg-[#2a2a2a]">
            <Search className="text-[#a7a7a7] w-4 h-4 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What do you want to play?"
              className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-[#a7a7a7] placeholder:text-base placeholder:font-medium font-normal"
            />
          </div>
        </div>
        {/* Right: Menu */}
        <div className="flex items-center gap-4 ml-6">
          <Link to="/premium" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Premium</Link>
          <Link to="/support" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Support</Link>
          <Link to="/download" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Download</Link>
          <div className="h-4 border-r border-[#a7a7a7]"></div>
          <button
            onClick={() => showComingSoon('Install App')}
            className="flex items-center gap-1 text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Install App</span>
          </button>
          <Link to="/signup" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Sign up</Link>
          <button
            onClick={() => handleAuthClick('Log In')}
            className="bg-white hover:bg-[#f0f0f0] text-black px-7 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
          >
            Log in
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;