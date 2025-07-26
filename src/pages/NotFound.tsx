import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, Music, Headphones, Volume2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const floatingIcons = [
    { icon: Music, delay: 0, x: 20, y: 30 },
    { icon: Headphones, delay: 0.5, x: -30, y: 20 },
    { icon: Volume2, delay: 1, x: 40, y: -20 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <PageTransition className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #1db954 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #1ed760 0%, transparent 50%)`
        }} />
      </div>

      {floatingIcons.map(({ icon: Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-gray-700 opacity-20"
          style={{
            left: `${20 + index * 25}%`,
            top: `${30 + index * 15}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.2,
            scale: 1,
            x: [0, x, 0],
            y: [0, y, 0],
          }}
          transition={{
            duration: 4,
            delay: delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <Icon className="w-12 h-12 lg:w-16 lg:h-16" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16 lg:py-24">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 404 Number */}
          <motion.div
            className="relative mb-8"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600"
              initial={{ scale: 0.3, rotateY: -180, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
              404
            </motion.h1>

            {/* Glowing Effect */}
            <motion.div
              className="absolute inset-0 text-8xl lg:text-9xl font-black text-green-500 opacity-20 blur-xl"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              404
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-2xl lg:text-4xl font-bold text-white mb-4"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Oops! Track Not Found
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-gray-400 text-base lg:text-lg mb-8 leading-relaxed"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Looks like this page went off the playlist. Don't worry, we've got plenty more music to explore!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Go Home Button */}
            <motion.div
              variants={buttonVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-black px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-sm lg:text-base transition-colors shadow-lg hover:shadow-green-500/25"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            {/* Search Button */}
            <motion.div
              variants={buttonVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/search"
                className="inline-flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-semibold text-sm lg:text-base transition-colors border border-gray-600 hover:border-gray-500"
              >
                <Search className="w-5 h-5" />
                <span>Discover Music</span>
              </Link>
            </motion.div>

            {/* Go Back Button */}
            <motion.div
              variants={buttonVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center space-x-3 text-gray-400 hover:text-white px-4 lg:px-6 py-3 lg:py-4 rounded-full font-medium text-sm lg:text-base transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Popular Suggestions */}
          <motion.div
            className="mt-12 lg:mt-16"
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-gray-500 text-sm lg:text-base mb-6">Or try these popular sections:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { to: '/trending', label: 'Trending' },
                { to: '/artists', label: 'Artists' },
                { to: '/playlists', label: 'Playlists' },
                { to: '/liked', label: 'Liked Songs' }
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.15 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.to}
                    className="inline-block bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors border border-gray-700 hover:border-gray-600"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave Effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 lg:h-48"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="url(#gradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, delay: 2.2 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1db954" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#1ed760" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1db954" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </PageTransition>
  );
};

export default NotFound;
