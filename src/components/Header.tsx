import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Download, Home } from 'lucide-react';



interface HeaderProps {
  onOpenMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');


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
    <header className="px-4 h-16 flex items-center bg-black">
      <div className="flex items-center justify-between w-full">
        {/* Left: Logo + Home + Search */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
              alt="Spotify Logo"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Home */}
          <Link to="/" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[#121212] hover:bg-[#232323] transition-colors">
            <Home className="w-6 h-6 text-white" />
          </Link>
          {/* Search bar: chỉ hiện trên desktop */}
          <div className="hidden md:flex items-center bg-[#242424] rounded-full h-12 w-full max-w-[360px] px-4 ml-2 transition-colors duration-200 focus-within:bg-[#2a2a2a]">
            <Search className="text-[#a7a7a7] w-4 h-4 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="What do you want to play?"
              className="flex-1 bg-transparent text-base text-white focus:outline-none placeholder:text-[#a7a7a7] placeholder:font-medium font-normal"
            />
          </div>
        </div>
        {/* Right: Menu + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/premium" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Premium</Link>
            <Link to="/support" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Support</Link>
            <Link to="/download" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors">Download</Link>
            <div className="h-4 border-r border-[#a7a7a7]"></div>
            <button
              className="flex items-center gap-1 text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Install App</span>
            </button>
            <Link to="/signup" className="text-[#a7a7a7] hover:text-white text-sm font-bold transition-colors cursor-pointer">
              <button>Sign up</button>
            </Link>
            <Link to="/login"
              className="bg-white hover:bg-[#f0f0f0] text-black px-8 py-3 rounded-full text-base font-bold transition-all hover:scale-105 duration-500 cursor-pointer"
            >
              Log in
            </Link>
          </div>
          {/* Hamburger menu: chỉ hiện trên mobile */}
          <button className="block md:hidden p-2 rounded cursor-pointer hover:bg-[#232323]" onClick={onOpenMenu}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;