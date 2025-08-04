import React, { useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  X, Home, Search, Library, Heart, Plus,
  Globe, TrendingUp, Users,
  LogIn,
  UserPlus,
  User 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', icon: <Home size={18} />, text: 'Home' },
  { to: '/search', icon: <Search size={18} />, text: 'Search' },
  { to: '/library', icon: <Library size={18} />, text: 'Library' },
];

const extraItems = [
  { to: '/login', icon: <LogIn size={18} />, text: 'Login' },
  { to: '/signup', icon: <UserPlus size={18} />, text: 'Sign up' },
  { to: '/liked', icon: <Heart size={18} className="text-green-500" />, text: 'Liked Songs' },
  { to: '/trending', icon: <TrendingUp size={18} />, text: 'Trending' },
  { to: '/artists', icon: <Users size={18} />, text: 'Top Artists' },
  { to: '/create-playlist', icon: <Plus size={18} />, text: 'Create Playlist' },
];

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

const sidebarVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      mass: 0.8
    }
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      mass: 0.6
    }
  }
};

const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      mass: 0.5
    }
  }
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm backdrop-saturate-[180%] backdrop-brightness-90"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#121212] flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              willChange: 'transform'
            }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-white/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4 }
              }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center ring-2 ring-white/10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", damping: 20 }}
                  >
                    <User size={24} className="text-white" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#121212]"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      transition: { delay: 0.5, type: "spring", damping: 15 }
                    }}
                  />
                </div>
                <div>
                  <span className="text-white font-semibold text-lg">Your Library</span>
                  <p className="text-gray-400 text-sm">Personal collection</p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors duration-200"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 400
                  }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 400
                  }
                }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent px-6 py-6">
              {/* Primary Nav */}
              <motion.div
                className="space-y-1 mb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h3
                  className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2"
                  variants={staggerItem}
                >
                  Navigation
                </motion.h3>
                {navItems.map((item) => (
                  <motion.div key={item.to} variants={staggerItem}>
                    <SidebarItem {...item} onClick={onClose} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Divider */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { delay: 0.6, duration: 0.5 }
                }}
              />

              {/* Extra Items */}
              <motion.div
                className="space-y-1 mb-8"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h3
                  className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2"
                  variants={staggerItem}
                >
                  More
                </motion.h3>
                {extraItems.map((item) => (
                  <motion.div key={item.to} variants={staggerItem}>
                    <SidebarItem {...item} onClick={onClose} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Discover Section */}
              <motion.div
                className="bg-neutral-900 rounded-xl p-6 mt-6 border border-white/5"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    delay: 0.8,
                    type: "spring",
                    damping: 20,
                    stiffness: 200
                  }
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <motion.div
                    className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-black font-bold text-sm">🎵</span>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-white text-base font-bold mb-1">Let's find your vibe</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">We'll keep you updated with personalized music recommendations.</p>
                  </div>
                </div>
                <motion.button
                  className="w-full mt-4 text-sm text-black bg-white rounded-full px-6 py-3 font-semibold hover:bg-gray-100 transition-colors duration-200"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 4px 12px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  Discover Music
                </motion.button>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="p-6 border-t border-white/10 bg-[#121212]/80 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.9, duration: 0.4 }
              }}
            >
              <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                {['Privacy', 'Cookies', 'Accessibility'].map((link, index) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-white transition-colors duration-200"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 1 + (index * 0.1) }
                    }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
              <motion.button
                className="flex items-center gap-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-full transition-all duration-200 hover:bg-white/5"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.05)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={14} />
                <span className="text-sm">English</span>
              </motion.button>
            </motion.div>
          </motion.aside>

          <style>{`
            .scrollbar-thin::-webkit-scrollbar {
              width: 4px;
            }
            
            .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
              background-color: rgb(55 65 81);
              border-radius: 2px;
            }
            
            .scrollbar-track-transparent::-webkit-scrollbar-track {
              background-color: transparent;
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
};

const SidebarItem = ({
  to,
  icon,
  text,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      className="group flex items-center gap-4 text-sm text-gray-300 hover:text-white transition-colors duration-200 py-3 px-4 rounded-lg hover:bg-white/5 active:bg-white/10"
      whileHover={{
        x: 4,
        backgroundColor: "rgba(255, 255, 255, 0.05)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
    >
      <motion.div
        className="flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {icon}
      </motion.div>
      <span className="font-medium">{text}</span>
      <motion.div
        className="ml-auto w-1 h-6 bg-white rounded-full"
        initial={{ opacity: 0, x: 8 }}
        whileHover={{
          opacity: 1,
          x: 0,
          transition: { type: "spring", damping: 20, stiffness: 300 }
        }}
      />
    </motion.div>
  </Link>
);

export default MobileSidebar;