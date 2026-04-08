import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navData = [
  {
    title: 'Search',
    dropdown: [
      { label: 'Advanced Search', path: '/plots' },
      { label: 'Exclusive Listings', path: '/plots' },
      { label: 'Exclusive Rentals', path: '/rent' },
      { label: 'Luxury Buildings', path: '/projects' },
      { label: 'Coming Soon', path: '/projects' },
      { label: 'Get Listing Updates', path: '/contact' },
    ],
  },
  {
    title: 'Find an Agent',
    path: '/agents',
  },
  {
    title: 'Developments',
    dropdown: [
      { label: 'Ongoing Projects', path: '/projects' },
      { label: 'Upcoming Projects', path: '/projects' },
      { label: 'Newly Launched', path: '/projects' },
      { label: 'Luxury Developments', path: '/projects' },
    ],
  },
  {
    title: 'Cities',
    dropdown: [
      { label: 'Mumbai', path: '/' },
      { label: 'Delhi', path: '/' },
      { label: 'Bangalore', path: '/' },
      { label: 'Hyderabad', path: '/' },
      { label: 'Pune', path: '/' },
      { label: 'Chennai', path: '/' },
    ],
  },
  {
    title: 'Services',
    dropdown: [
      { label: 'Plot Resell Services', path: '/services/plot-resale' },
      { label: 'Site Visit Request', path: '/services/schedule-visit' },
      { label: 'Market Analysis', path: '/services/plot-resale/request-cma' },
      { label: 'Investment Consulting', path: '/contact' },
      { label: 'Legal & Documentation', path: '/contact' },
      { label: 'Get Listing Updates', path: '/contact' },
    ],
  },
  {
    title: 'About',
    dropdown: [
      { label: 'About Us', path: '/about' },
      { label: 'Our Story', path: '/our-story' },
      { label: 'Why Choose Us', path: '/why-choose-us' },
      { label: 'Testimonials', path: '/testimonials' },
      { label: 'Locations', path: '/location' },
      { label: 'Contact Us', path: '/contact' },
      { label: 'Register', path: '/register' },
    ],
  },
];

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navRef = useRef(null);
  const isHomePage = location.pathname === '/';

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (index, hasDropdown) => {
    if (hasDropdown) {
      setOpenDropdown(openDropdown === index ? null : index);
    } else {
      setOpenDropdown(null);
    }
  };

  const toggleMobileSection = (index) => {
    setMobileExpandedSection(mobileExpandedSection === index ? null : index);
  };

  const phoneNumber = '617-236-0711';

  return (
    <header
      className={`relative w-full z-[100] h-[96px] flex items-center transition-all duration-300 ${
        isHomePage
          ? 'bg-black/40 backdrop-blur-sm border-b border-white/10'
          : 'bg-gradient-to-r from-black to-[#1A1A1A] shadow-lg shadow-black/30 border-b border-white/5'
      } text-white`}
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-full" ref={navRef}>
        
        {/* LEFT SECTION: Logo */}
        <div
          className="flex-shrink-0 flex flex-col justify-center cursor-pointer pt-1 hover:opacity-90 transition-opacity"
          onClick={() => window.location.href = '/'}
        >
          <span className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-white">
            VIKASH
          </span>
          <span className="text-[9px] uppercase tracking-[0.4em] mt-1 text-[#C8A96A] font-medium">
            — REAL ESTATE —
          </span>
        </div>

        {/* CENTER NAVIGATION: Desktop */}
        <nav className="hidden lg:flex items-center gap-8 h-full flex-grow justify-center">
          {navData.map((item, index) => (
            <div key={index} className="relative h-full flex items-center">
              {item.path ? (
                <Link
                  to={item.path}
                  className="font-sans font-medium text-[13px] uppercase tracking-[0.06em] transition-all duration-300 text-white hover:text-[#C8A96A]"
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.title}
                </Link>
              ) : (
                <button
                  onClick={() => handleNavClick(index, !!item.dropdown)}
                  className={`font-sans font-medium text-[13px] uppercase tracking-[0.06em] transition-all duration-300 flex items-center gap-1.5 focus:outline-none ${
                    openDropdown === index ? 'text-[#C8A96A]' : 'text-white hover:text-[#C8A96A]'
                  }`}
                >
                  {item.title}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${openDropdown === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              {/* DROPDOWN MENU */}
              {item.dropdown && (
                <AnimatePresence>
                  {openDropdown === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute top-[85px] left-1/2 -translate-x-1/2 w-[260px] bg-black/70 backdrop-blur-sm shadow-2xl border border-white/10 py-3 rounded-sm z-[110]"
                    >
                      <div className="flex flex-col">
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <Link
                            key={dropIndex}
                            to={dropItem.path}
                            className="px-6 py-3 text-[13px] text-white/80 hover:text-[#C8A96A] hover:bg-white/5 hover:translate-x-1 transition-all duration-300 block whitespace-nowrap"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {dropItem.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT SECTION: Phone + Auth */}
        <div className="hidden lg:flex items-center gap-8 flex-shrink-0">
          {/* Phone Number */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 text-[13px] font-medium text-white hover:text-[#C8A96A] transition-colors duration-300 uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden md:inline">{phoneNumber}</span>
          </a>

          {/* Auth Section */}
          {isLoggedIn ? (
            <button className="border border-white bg-transparent text-white px-7 py-2.5 text-[12px] uppercase tracking-wider font-medium hover:border-[#C8A96A] hover:text-[#C8A96A] hover:bg-[#C8A96A]/10 transition-all duration-300 rounded-sm">
              My Account
            </button>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className="text-[13px] font-medium text-white hover:text-[#C8A96A] transition-colors duration-300 uppercase tracking-wider"
              >
                Login
              </Link>
              <div className="w-px h-5 bg-white/20"></div>
              <Link
                to="/register"
                className="text-[13px] font-medium text-white hover:text-[#C8A96A] transition-colors duration-300 uppercase tracking-wider"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="lg:hidden text-white hover:text-[#C8A96A] transition-colors p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* MOBILE FULL-SCREEN DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-[110] bg-black flex flex-col h-[100dvh]"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 h-[96px]">
              <div className="flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-serif tracking-widest uppercase text-white">
                  VIKASH
                </span>
                <span className="text-[8px] uppercase tracking-[0.4em] mt-1 text-[#C8A96A]">
                  — REAL ESTATE —
                </span>
              </div>
              <button
                className="text-white hover:text-[#C8A96A] p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 py-4 px-6 overflow-y-auto overflow-x-hidden pb-32">
              {navData.map((item, index) => (
                <div key={index} className="border-b border-white/10 py-1">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="block py-4 text-[15px] font-medium text-white hover:text-[#C8A96A] uppercase tracking-widest transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => toggleMobileSection(index)}
                        className="w-full flex items-center justify-between py-4 text-[15px] font-medium uppercase tracking-widest transition-colors focus:outline-none"
                      >
                        <span className={mobileExpandedSection === index ? 'text-[#C8A96A]' : 'text-white'}>
                          {item.title}
                        </span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            mobileExpandedSection === index ? 'rotate-180 text-[#C8A96A]' : 'text-white/50'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileExpandedSection === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col pl-4 pb-5 space-y-4 pt-1">
                              {item.dropdown.map((dropItem, dropIndex) => (
                                <Link
                                  key={dropIndex}
                                  to={dropItem.path}
                                  className="text-[14px] text-white/60 hover:text-[#C8A96A] hover:translate-x-1 transition-all duration-300 block"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {dropItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Auth */}
              <div className="mt-12 flex flex-col gap-5 pb-8 border-t border-white/10 pt-8">
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-center text-[14px] font-medium text-white hover:text-[#C8A96A] transition-colors uppercase tracking-wider"
                >
                  📞 {phoneNumber}
                </a>
                {isLoggedIn ? (
                  <button className="w-full border border-white bg-transparent text-white px-6 py-4 text-[14px] uppercase tracking-widest font-medium hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all rounded-sm">
                    My Account
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      to="/login"
                      className="text-center border border-white/20 bg-white/5 text-white px-2 py-3.5 text-[13px] uppercase tracking-widest font-medium hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all rounded-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-center border border-[#C8A96A] bg-[#C8A96A] text-black px-2 py-3.5 text-[13px] uppercase tracking-widest font-medium hover:bg-[#B5965A] hover:border-[#B5965A] transition-all rounded-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
