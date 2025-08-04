import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hook/usePageTiltle';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [focusedInput, setFocusedInput] = useState(false);
    const navigate = useNavigate();

    usePageTitle(`Signup - Spotify`)

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const buttonVariants = {
        hover: { scale: 1.02, transition: { duration: 0.2 } },
        tap: { scale: 0.98, transition: { duration: 0.1 } },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] flex items-center justify-center p-4">
            <motion.div className="w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div className="flex justify-center mb-10" variants={itemVariants}>
                    <motion.button onClick={() => navigate('/')} className='cursor-pointer' variants={buttonVariants} whileHover="hover"
                        whileTap="tap">
                        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" alt="Spotify Logo" className="w-12 h-12" />
                    </motion.button>
                </motion.div>

                <motion.div className="text-center mb-8" variants={itemVariants}>
                    <motion.h1 className="text-white text-5xl font-bold mb-2">Sign up to</motion.h1>
                    <motion.h1 className="text-white text-5xl font-bold">start listening</motion.h1>
                </motion.div>

                <motion.div className="mb-6" variants={itemVariants}>
                    <label className="block text-white text-sm font-medium mb-2">Email address</label>
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
                    <motion.p
                        className="text-[#1ed760] text-sm mt-2 cursor-pointer hover:underline"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        Use phone number instead.
                    </motion.p>
                </motion.div>

                <motion.button
                    className={`w-full bg-[#1ed760] text-black font-bold py-3 px-4 rounded-full transition-colors mb-8 ${email
                        ? 'bg-green-500 cursor-pointer'
                        : 'bg-neutral-600 cursor-not-allowed'
                        }`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    Next
                </motion.button>

                <motion.div className="flex items-center mb-6" variants={itemVariants}>
                    <motion.div className="flex-1 border-t border-gray-600"></motion.div>
                    <span className="px-4 text-gray-400 text-sm">or</span>
                    <motion.div className="flex-1 border-t border-gray-600"></motion.div>
                </motion.div>

                <motion.div className="space-y-4 mb-6" variants={itemVariants}>
                    <motion.button
                        className="w-full bg-transparent border border-gray-600 text-white font-medium py-3 px-4 rounded-full hover:border-gray-400 flex items-center justify-center gap-3"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>

                        Sign up with Google
                    </motion.button>

                    <motion.button
                        className="w-full bg-transparent border border-gray-600 text-white font-medium py-3 px-4 rounded-full hover:border-gray-400 flex items-center justify-center gap-3"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5" />
                        Sign up with Apple
                    </motion.button>
                </motion.div>

                <motion.div className="text-center mb-4" variants={itemVariants}>
                    <p className="text-gray-400 text-sm">
                        Already have an account?{' '}
                        <motion.a href="#" className="text-white underline hover:text-[#1ed760] transition-colors" whileHover={{ scale: 1.05 }}>
                            Log in here
                        </motion.a>
                    </p>
                </motion.div>

                <motion.div className="text-center text-xs text-gray-400" variants={itemVariants}>
                    <p>
                        This site is protected by reCAPTCHA and the Google{' '}
                        <motion.a href="#" className="underline hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                            Privacy Policy
                        </motion.a>{' '}
                        and{' '}
                        <motion.a href="#" className="underline hover:text-white transition-colors" whileHover={{ scale: 1.05 }}>
                            Terms of Service
                        </motion.a>{' '}
                        apply.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Signup;