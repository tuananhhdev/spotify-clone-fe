import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Plus, Globe, Heart, TrendingUp, Users } from 'lucide-react';

const Sidebar: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const navItems = [
    { label: 'Liked Songs', to: '/liked', icon: Heart },
    { label: 'Trending Songs', to: '/trending', icon: TrendingUp },
    { label: 'Popular Artists', to: '/artists', icon: Users }
  ];

  const footerLinks = [
    'Legal', 'Safety & Privacy', 'Privacy Policy',
    'Cookies', 'About Ads', 'Accessibility'
  ];

  return (
    <motion.aside
      className="w-[400px] text-white flex flex-col h-full p-1"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="h-full flex flex-col overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth">
          <div className="px-6 py-8">
            {/* Library Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              variants={itemVariants}
            >
              <h2 className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Library
              </h2>
              <motion.button 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center shadow-lg shadow-gray-800/20"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Plus className="w-5 h-5 text-white" />
            </motion.button>
            </motion.div>

            {/* Quick Nav */}
            <motion.div
              className="space-y-2 mb-8"
              variants={itemVariants}
            >
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={item.to}
                    href={item.to}
                    className="group flex items-center text-sm font-medium text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#1a1a1a] hover:to-[#2a2a2a] px-4 py-3 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    // transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 group-hover:text-[#1ed760] transition-colors duration-100" />
                      <span>{item.label}</span>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Create Playlist */}
            <motion.div
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 mb-6 border border-white/5 shadow-2xl"
              variants={itemVariants}
              whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              <h3 className="font-bold text-lg mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create your first playlist
              </h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                It's easy, we'll help you
              </p>
              <motion.button
                className="bg-gradient-to-r from-white to-gray-100 text-black px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow duration-100 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1ed760] to-[#1db954] opacity-0"
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.1 }}
                />
                <span className="relative z-10">Create playlist</span>
              </motion.button>
            </motion.div>

            {/* Podcast */}
            <motion.div
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl p-6 mb-6 border border-white/5 shadow-2xl"
              variants={itemVariants}
              whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              <h3 className="font-bold text-base mb-3 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Let's find some podcasts to follow
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                We'll keep you updated on new episodes
              </p>
              <motion.button
                className="bg-gradient-to-r from-white to-gray-100 text-black px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow duration-100 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.1 }}
                />
                <span className="relative z-10">Browse podcasts</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="px-6 pt-6 pb-8 border-t border-[#2c2c2c] text-xs text-gray-400 space-y-6"
          variants={itemVariants}
        >
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link}
                href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-white transition-colors duration-100 relative group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.8 }}
              >
                {link}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1ed760] to-[#1db954]"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.1 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Language Selector */}
          <motion.button
            className="flex items-center justify-center gap-3 text-white border border-gray-600 rounded-full px-4 py-2 hover:border-[#1ed760] transition-colors duration-100 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] shadow-lg"
            whileHover={{ scale: 1.05, borderColor: "#1ed760" }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <motion.div whileHover={{ rotate: 15 }}>
              <Globe className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">English</span>
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        /* Custom scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #718096;
        }

        /* Smooth scrolling */
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </motion.aside>
  );
};

export default Sidebar;