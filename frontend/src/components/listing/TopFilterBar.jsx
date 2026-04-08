import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, Map as MapIcon, X } from 'lucide-react';

const TopFilterBar = ({ filters, setFilters, clearFilters, isAdmin, rightContent }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const handleApply = () => {
    setActiveDropdown(null);
  };

  const popoverVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -5, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <div className="w-full bg-white border-b border-[#E9E4DC] sticky top-[0px] shadow-sm py-4 px-4 md:px-8 xl:px-12 flex items-center justify-between" style={{ zIndex: 50, position: 'relative' }}>
      
      {/* Filters Container - Removed overflow-x-auto to prevent dropdown clipping */}
      <div className="flex flex-wrap gap-3 items-center" style={{ overflow: 'visible' }} ref={dropdownRef}>
        
        {/* All Filters Button */}
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-[#F5F1EB] text-[#111111] hover:bg-[#E9E4DC] transition rounded-full text-[13px] font-medium whitespace-nowrap"
          onClick={() => toggleDropdown('all')}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-[#E9E4DC] mx-1 hidden sm:block"></div>
        {isAdmin && Object.values(filters).some(x => x && x.length > 0) && (
          <button onClick={clearFilters} className="text-[13px] text-gray-500 hover:text-red-500 underline decoration-transparent hover:decoration-red-500 transition-all font-medium whitespace-nowrap">Clear All</button>
        )}

        {/* --- Location Dropdown --- */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('location')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition whitespace-nowrap
              ${activeDropdown === 'location' || filters.location ? 'border-[#C6A769] bg-[#C6A769]/10 text-[#C6A769]' : 'border-[#E9E4DC] bg-white text-[#444] hover:border-[#111111]'}
            `}
          >
            Location {filters.location && `(${filters.location})`}
            <ChevronDown size={14} className={activeDropdown === 'location' ? 'rotate-180' : ''}/>
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'location' && (
              <>
                <motion.div 
                  variants={popoverVariants} initial="hidden" animate="visible" exit="exit"
                  className="absolute top-full mt-3 bg-white border border-[#E9E4DC] shadow-xl rounded-xl w-[280px] p-5 z-40 transform"
                >
                  <h4 className="font-serif text-[#111111] mb-3 text-[15px]">Select Location</h4>
                  <div className="flex flex-col gap-2 relative z-50">
                    {['Alpha City', 'Yamuna Expressway', 'Electronic City', 'Ooty'].map(loc => (
                      <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition
                          ${filters.location === loc ? 'bg-[#C6A769] border-[#C6A769]' : 'border-gray-300 group-hover:border-[#C6A769]'}
                        `}>
                          {filters.location === loc && <span className="w-2 h-2 bg-white rounded-sm"></span>}
                        </div>
                        <span className="text-[14px] text-gray-700">{loc}</span>
                        {/* Hidden radio input */}
                        <input 
                          type="radio" name="location" value={loc} className="hidden"
                          onChange={(e) => setFilters({...filters, location: e.target.value})}
                          checked={filters.location === loc}
                        />
                      </label>
                    ))}
                    <button onClick={() => setFilters({...filters, location: ''})} className="text-left text-sm text-gray-500 mt-2 hover:text-black">Any Location</button>
                  </div>
                  <div className="mt-5 pt-3 border-t flex justify-end">
                    <button onClick={handleApply} className="bg-[#111] text-white px-4 py-2 rounded-md text-sm">Apply</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* --- Price Range --- */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => toggleDropdown('price')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition whitespace-nowrap
              ${activeDropdown === 'price' || filters.minPrice || filters.maxPrice ? 'border-[#C6A769] bg-[#C6A769]/10 text-[#C6A769]' : 'border-[#E9E4DC] bg-white text-[#444] hover:border-[#111111]'}
            `}
          >
            Price Range
            <ChevronDown size={14} className={activeDropdown === 'price' ? 'rotate-180' : ''}/>
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'price' && (
               <>
                <motion.div 
                  variants={popoverVariants} initial="hidden" animate="visible" exit="exit"
                  className="absolute top-full left-0 mt-3 bg-white border border-[#E9E4DC] shadow-xl rounded-xl w-[320px] p-5 z-40 transform"
                >
                  <div className="flex justify-between items-center mb-4 relative z-50">
                    <h4 className="font-serif text-[#111111] text-[15px]">Price Range</h4>
                  </div>
                  
                  {/* Dual Input */}
                  <div className="flex gap-4 items-center mb-6 relative z-50">
                    <div className="flex-1">
                      <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1 block">Min Price (?)</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#C6A769]"
                        placeholder="0"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      />
                    </div>
                    <span className="text-gray-400 mt-4">-</span>
                    <div className="flex-1">
                      <label className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1 block">Max Price (?)</label>
                      <input 
                        type="number" 
                        className="w-full border border-gray-200 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#C6A769]"
                        placeholder="Any"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t flex justify-end">
                    <button onClick={handleApply} className="bg-[#111] w-full text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-[#C6A769] transition">Apply Filter</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* --- Property Type --- */}
        <div className="relative hidden md:block">
          <button 
            onClick={() => toggleDropdown('type')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition whitespace-nowrap
              ${activeDropdown === 'type' || filters.propertyType ? 'border-[#C6A769] bg-[#C6A769]/10 text-[#C6A769]' : 'border-[#E9E4DC] bg-white text-[#444] hover:border-[#111111]'}
            `}
          >
            Property Type
            <ChevronDown size={14} className={activeDropdown === 'type' ? 'rotate-180' : ''}/>
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'type' && (
              <>
                <motion.div 
                  variants={popoverVariants} initial="hidden" animate="visible" exit="exit"
                  className="absolute top-full left-0 mt-3 bg-white border border-[#E9E4DC] shadow-xl rounded-xl w-[260px] p-5 z-40 transform"
                >
                  <div className="flex flex-col gap-3 relative z-50">
                    {['Residential Plot', 'Commercial Land', 'Agricultural', 'Industrial'].map(type => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition
                          ${filters.propertyType === type ? 'border-[#C6A769] bg-[#C6A769]' : 'border-gray-300 group-hover:border-[#C6A769]'}
                        `}>
                          {filters.propertyType === type && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                        </div>
                        <span className="text-[14px] text-gray-700">{type}</span>
                        <input 
                          type="radio" name="ptype" value={type} className="hidden"
                          onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                          checked={filters.propertyType === type}
                        />
                      </label>
                    ))}
                    <button onClick={() => setFilters({...filters, propertyType: ''})} className="text-left text-sm text-gray-500 mt-2 hover:text-black">Any Type</button>
                  </div>
                  <div className="mt-5 pt-3 border-t flex justify-end relative z-50">
                    <button onClick={handleApply} className="bg-[#111] w-full text-white px-4 py-2 rounded-md text-sm">Apply</button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 hidden lg:flex z-50 relative"> {rightContent}
        {!isAdmin && Object.values(filters).some(x => x && x.length > 0) && (
          <button 
            onClick={clearFilters}
            className="text-[13px] text-gray-500 hover:text-red-500 underline decoration-transparent hover:decoration-red-500 transition-all font-medium whitespace-nowrap"
          >
            Clear All
          </button>
        )}
      </div>

    </div>
  );
};

export default TopFilterBar;
