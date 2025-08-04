import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

const Footer: React.FC = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const linkVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.footer
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="pr-6 sm:px-0 sm:pr-4">
                {/* Top border line */}
                <motion.div
                    className="border-t border-[#292929]"
                    variants={itemVariants}
                ></motion.div>

                {/* Main footer content - 2 sections flex */}
                <motion.div
                    className="py-12"
                    variants={itemVariants}
                >
                    <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-0">
                        {/* Left section - Links grid */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.08
                                    }
                                }
                            }}
                        >
                            {/* Company */}
                            <motion.div variants={itemVariants}>
                                <motion.h3
                                    className="text-white font-bold text-base mb-5 tracking-tight"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Company
                                </motion.h3>
                                <motion.ul
                                    className="space-y-3"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                >
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            About
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Jobs
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            For the Record
                                        </motion.a>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>

                            {/* Communities */}
                            <motion.div variants={itemVariants}>
                                <motion.h3
                                    className="text-white font-bold text-base mb-5 tracking-tight"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Communities
                                </motion.h3>
                                <motion.ul
                                    className="space-y-3"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                >
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            For Artists
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Developers
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Advertising
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Investors
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Vendors
                                        </motion.a>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>

                            {/* Useful links */}
                            <motion.div variants={itemVariants}>
                                <motion.h3
                                    className="text-white font-bold text-base mb-5 tracking-tight"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Useful links
                                </motion.h3>
                                <motion.ul
                                    className="space-y-3"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                >
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Support
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Free Mobile App
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Popular by Country
                                        </motion.a>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>

                            {/* Spotify Plans */}
                            <motion.div variants={itemVariants}>
                                <motion.h3
                                    className="text-white font-bold text-base mb-5 tracking-tight"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Spotify Plans
                                </motion.h3>
                                <motion.ul
                                    className="space-y-3"
                                    variants={{
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                >
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Premium Individual
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Premium Student
                                        </motion.a>
                                    </motion.li>
                                    <motion.li variants={linkVariants}>
                                        <motion.a
                                            href="#"
                                            className="text-[#b3b3b3] hover:text-white hover:underline transition-colors duration-200 text-base font-normal leading-6"
                                            whileHover={{ x: 3, transition: { duration: 0.2 } }}
                                        >
                                            Spotify Free
                                        </motion.a>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>
                        </motion.div>

                        {/* Right section - Social media icons - FIX RESPONSIVE HERE */}
                        <motion.div
                            className="flex justify-center lg:justify-end"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="flex space-x-4"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                <motion.a
                                    href="#"
                                    className="w-12 h-12 bg-[#292929] hover:bg-[#3e3e3e] rounded-full flex items-center justify-center transition-colors duration-200"
                                    aria-label="Instagram"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "#3e3e3e",
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Instagram className="w-5 h-5 text-white" />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="w-12 h-12 bg-[#292929] hover:bg-[#3e3e3e] rounded-full flex items-center justify-center transition-colors duration-200"
                                    aria-label="Twitter"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "#3e3e3e",
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Twitter className="w-5 h-5 text-white" />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="w-12 h-12 bg-[#292929] hover:bg-[#3e3e3e] rounded-full flex items-center justify-center transition-colors duration-200"
                                    aria-label="Facebook"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        backgroundColor: "#3e3e3e",
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Facebook className="w-5 h-5 text-white" />
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom border line */}
                <motion.div
                    className="border-t border-[#292929] hidden sm:block"
                    variants={itemVariants}
                ></motion.div>

                {/* Copyright */}
                <motion.div
                    className="py-8"
                    variants={itemVariants}
                >
                    <motion.p
                        className="text-[#b3b3b3] text-sm font-normal"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                    >
                        © 2025 Spotify AB
                    </motion.p>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;