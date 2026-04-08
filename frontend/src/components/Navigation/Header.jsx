import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import TopBar from './TopBar';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

const Header = ({ variant = 'default' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHero = variant === 'hero';
  
  // Logic for background
  // If it's a hero header and NOT scrolled, it's transparent.
  // Otherwise, it's solid dark (#111).
  const isTransparent = isHero && !scrolled;
  
  const headerClasses = `
    w-full z-[80] transition-all duration-300 ease-in-out
    ${isHero ? 'fixed top-0 left-0' : 'relative'}
    ${isTransparent ? 'bg-transparent py-5 md:py-6' : 'bg-[#111] shadow-md py-4 md:py-5'}       
  `;

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-16 w-full flex items-center justify-between">

          {/* LEFT: Logo */}
          <Link to="/" className="flex flex-col items-center group min-w-max">
            <span className="text-[24px] md:text-[28px] font-serif text-white tracking-[0.15em] uppercase group-hover:text-[#c6a87d] transition-colors duration-500">
              VIKASH
            </span>
            <span className="text-[9px] md:text-[10px] font-sans text-[#c6a87d] tracking-[0.3em] uppercase mt-0.5">
              REAL ESTATE
            </span>
          </Link>

          {/* RIGHT: Desktop Layout */}
          <div className="hidden md:flex flex-col flex-grow items-end gap-1">
             <TopBar />
             <NavMenu />
          </div>

          {/* RIGHT: Mobile Hamburger */}
          <button 
            className="md:hidden text-white hover:text-[#c6a87d] transition-colors p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

export default Header;