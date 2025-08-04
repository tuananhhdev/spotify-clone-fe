import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { showComingSoon } from '../util/toast';
import { usePageTitle } from '../hook/usePageTiltle';

const SpotifyLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState(false);
  const navigate = useNavigate()
  const { scrollY } = useScroll();
  const overlayOpacity = useTransform(scrollY, [0, 300], [0, 0.5]);

usePageTitle(`Login - Spotify`)

  const handleComingSoon = () => {
    showComingSoon()
  };

  const handleLogoClick = () => {
    navigate('/')

  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const logoVariants: Variants = {
    hidden: { scale: 0, rotate: -90 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2 // giữ
      }
    }
  };


  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(180deg, #121212 0%, #000000 100%)'
          }}
        />

        {/* Overlay that darkens on scroll */}
        <motion.div
          className="absolute inset-0 bg-black z-10 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />


        {/* Content */}
        <div className="min-h-screen flex items-center justify-center p-0 md:p-6 lg:p-8 relative z-10">
          <motion.div
            className="w-full md:max-w-[736px] md:rounded-lg px-4 md:px-6 lg:px-10 py-6 md:py-8"

            style={{
              backgroundColor: '#1a1a1a'
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Form Content Container */}
            <div className="max-w-md mx-auto">
              {/* Spotify Logo */}
              <motion.div
                className="text-center mb-8 md:mb-6"
                variants={itemVariants}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-8 md:mb-6  rounded-full flex items-center justify-center cursor-pointer"
                  variants={logoVariants}
                  onClick={handleLogoClick}
                  whileHover={{
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png"
                    alt="Spotify Logo"
                    className="h-20 w-auto object-contain"
                  />
                </motion.div>

                <motion.h1
                  className="text-white text-2xl md:text-3xl lg:text-4xl font-black mb-0 tracking-tight"
                  variants={itemVariants}
                >
                  Log in to Spotify
                </motion.h1>
              </motion.div>

              {/* Social Login Buttons */}
              <div className="max-w-sm w-full mx-auto">

                <motion.div
                  className="space-y-4 md:space-y-3 mb-8"
                  variants={itemVariants}
                >
                  {/* Google */}
                  <motion.button
                    onClick={handleComingSoon}
                    className="w-full py-3 px-6 rounded-full border border-neutral-600 text-white font-semibold text-base bg-transparent hover:bg-neutral-800 transition-colors duration-200 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-4 relative z-10">
                      <motion.div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                      </motion.div>
                      <span>Continue with Google</span>
                    </div>
                    <AnimatePresence>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </AnimatePresence>
                  </motion.button>

                  {/* Facebook */}
                  <motion.button
                    onClick={handleComingSoon}
                    className="w-full py-3 px-6 rounded-full border border-neutral-600 text-white font-semibold text-base bg-transparent hover:bg-neutral-800 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <motion.div
                        className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </motion.div>
                      <span>Continue with Facebook</span>
                    </div>
                  </motion.button>

                  {/* Apple */}
                  <motion.button
                    onClick={handleComingSoon}
                    className="w-full py-3 px-6 rounded-full border border-neutral-600 text-white font-semibold text-base bg-transparent hover:bg-neutral-800 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-4">
                      <motion.svg
                        className="w-5 h-5 fill-white"
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.2 }}
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </motion.svg>
                      <span>Continue with Apple</span>
                    </div>
                  </motion.button>

                  {/* Phone */}
                  <motion.button
                    onClick={handleComingSoon}
                    className="w-full py-3 px-6 rounded-full border border-white text-white font-semibold text-base bg-transparent hover:bg-neutral-800 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <span>Continue with phone number</span>
                    </div>
                  </motion.button>
                </motion.div>
              </div>

            </div>

            {/* Divider - Full width */}
            <motion.div
              className="relative mt-5 mb-7 sm:my-6 mx-6 md:my-7"
              variants={itemVariants}
            >
              <motion.div
                className="w-full border-t border-neutral-700"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </motion.div>

            {/* Form Content Container */}
            <div className="max-w-sm w-full mx-auto">

              {/* Email Form */}
              <motion.div
                className="space-y-5 md:space-y-4"
                variants={itemVariants}
              >
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <label className="block text-white text-sm font-bold mb-2">
                    Email or username
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedInput(true)}
                      onBlur={() => setFocusedInput(false)}
                      placeholder="Email or username"
                      className={`w-full py-3 px-4 bg-neutral-800 border-2 rounded text-white placeholder-neutral-400 transition-all duration-300 focus:outline-none text-base  hover:bg-neutral-700 ${focusedInput || email ? 'border-white' : 'border-neutral-600'
                        } ${email ? "font-sans" : ""} `}
                      whileFocus={{
                        scale: 1.01,
                        borderColor: "#ffffff"
                      }}
                    />
                  </div>
                </motion.div>

                <motion.button
                  onClick={handleComingSoon}
                  disabled={!email}
                  className={`w-full py-4.5 px-7 sm:px-3 sm:py-6  rounded-full font-black text-black text-sm relative overflow-hidden ${email
                    ? 'bg-green-500 cursor-pointer'
                    : 'bg-neutral-600 cursor-not-allowed'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={email ? {
                    backgroundColor: "#1ed760",
                    y: -1,
                    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                  } : {}}
                  whileTap={email ? {
                    scale: 0.98,
                    y: 0,
                    transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
                  } : {}}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={email ? 'enabled' : 'disabled'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      Continue
                    </motion.span>
                  </AnimatePresence>

                  {/* Subtle glow on hover */}
                  {email && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-400/20"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                    />
                  )}

                  {/* Press feedback */}
                  {email && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-300/30"
                      initial={{ opacity: 0 }}
                      whileTap={{
                        opacity: 1,
                        transition: { duration: 0.1 }
                      }}
                    />
                  )}

                  {/* Gentle shimmer */}
                  {email && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full will-change-transform overflow-hidden"

                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 1
                      }}
                    />
                  )}
                </motion.button>


              </motion.div>

              {/* Sign Up Link */}
              <motion.div
                className="text-center mt-8 md:mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-neutral-400 text-base">
                  Don't have an account?{' '}
                  <motion.p
                    className="text-white underline hover:text-green-500 transition-colors duration-300 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={'/signup'}>
                      Sign up for Spotify
                    </Link>
                  </motion.p>
                </p>
              </motion.div>

              {/* Footer - mobile only */}
              <motion.div
                className="text-center mt-12 pt-8 border-t border-neutral-800 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p className="text-xs text-neutral-500 leading-relaxed">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <motion.a
                    href="#"
                    className="underline hover:text-neutral-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Privacy Policy
                  </motion.a>{' '}
                  and{' '}
                  <motion.a
                    href="#"
                    className="underline hover:text-neutral-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Terms of Service
                  </motion.a>{' '}
                  apply.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>



        {/* Separate Footer - desktop only */}
        <motion.footer
          className="hidden md:block bg-[#1a1a1a] py-8 px-4 relative z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-neutral-500 leading-relaxed">
              This site is protected by reCAPTCHA and the Google{' '}
              <motion.a
                href="#"
                className="underline hover:text-neutral-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>{' '}
              and{' '}
              <motion.a
                href="#"
                className="underline hover:text-neutral-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>{' '}
              apply.
            </p>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default SpotifyLogin;