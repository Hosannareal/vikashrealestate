import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const navItems = [
  { name: 'SEARCH', path: '/plots' },
  { name: 'FIND AN AGENT', path: '/agents' },
  { name: 'DEVELOPMENTS', path: '/projects' },
  { 
    name: 'CITIES', 
    path: '#',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Back Bay', path: '/plots' },
      { name: 'Beacon Hill', path: '/plots' },
      { name: 'Seaport', path: '/plots' },
      { name: 'South End', path: '/plots' },
    ]
  },
  { 
    name: 'SERVICES', 
    path: '#',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Plot Resale', path: '/services/plot-resale' },
      { name: 'Request CMA', path: '/services/plot-resale/request-cma' },
      { name: 'Schedule Visit', path: '/services/schedule-visit' },
    ]
  },
  { 
    name: 'ABOUT', 
    path: '/about',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Our Brand', path: '/about' },
      { name: 'Our Story', path: '/our-story' },
      { name: 'Why Choose Us', path: '/why-choose-us' },
      { name: 'Testimonials', path: '/testimonials' },
      { name: 'Locations', path: '/location' },
      { name: 'Contact Us', path: '/contact' },
    ]
  }
];

const NavMenu = ({ scrolled }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <nav className="flex items-center gap-10 lg:gap-12 text-[12px] pt-0.5">
      {navItems.map((item) => (
        <div
          key={item.name}
          className="relative group"
          onMouseEnter={() => setHoveredItem(item.name)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link
            to={item.path}
            className={`flex items-center gap-1.5 uppercase tracking-[0.12em] py-2.5 transition-colors duration-300 font-medium text-[11px] ${
              location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '#')
                ? 'text-white'
                : 'text-white/75 hover:text-white'
            }`}
          >
            {item.name}
            {item.hasDropdown && <ChevronDown size={12} className="mt-[-1px] opacity-60" />}
          </Link>
          
          {/* Active / Hover Underline equivalent to Campion */}
          <span 
             className={`absolute bottom-0.5 left-0 w-full h-0.5 bg-[#c6a87d] transform origin-left transition-transform duration-300 ${
               hoveredItem === item.name || (location.pathname === item.path && item.path !== '#') ? 'scale-x-100' : 'scale-x-0'
             }`}
          ></span>

          {item.hasDropdown && (
            <AnimatePresence>
              {hoveredItem === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 pt-4"
                >
                  <div className="bg-[#111] border border-white/10 shadow-xl min-w-[220px] py-3 flex flex-col">
                    {item.dropdownItems.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        to={dropItem.path}
                        className="px-6 py-2.5 text-[12px] uppercase tracking-[0.1em] text-[#b8b8b8] hover:text-[#c6a87d] hover:bg-white/5 transition-all duration-300"
                      >
                        {dropItem.name}
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
  );
};

export default NavMenu;