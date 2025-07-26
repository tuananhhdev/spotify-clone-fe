import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home',
      activePaths: ['/', '/trending', '/artists']
    },
    {
      path: '/search',
      icon: Search,
      label: 'Search',
      activePaths: ['/search']
    },
    {
      path: '/liked',
      icon: Heart,
      label: 'Liked',
      activePaths: ['/liked']
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label, activePaths }) => {
          const isActive = activePaths.some(activePath =>
            activePath === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(activePath)
          );

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-4 transition-colors ${isActive
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNavigation;
