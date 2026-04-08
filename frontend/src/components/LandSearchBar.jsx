import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Maximize, IndianRupee, Map, ChevronDown, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandSearchBar = () => {
  const [activeTab, setActiveTab] = useState('Buy Land');
  const tabs = ['Buy Land', 'Sell Land', 'Agricultural', 'Commercial Plots'];
  
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Search State
  const [searchParams, setSearchParams] = useState({
    location: '',
    minSize: '',
    maxSize: '',
    unit: 'Sq.yd',
    minPrice: '',
    maxPrice: '',
    landType: 'Residential Plot',
    roadAccess: false,
    cornerPlot: false,
    electricity: false,
    water: false
  });

  // Debounced saved search (just demonstrating save to localStorage mechanism)
  useEffect(() => {
    const saved = localStorage.getItem('lastLandSearch');
    if (saved) {
      try {
        setSearchParams(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Save to local storage
    localStorage.setItem('lastLandSearch', JSON.stringify(searchParams));

    // Construct query parameters
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== '' && value !== false) {
        params.append(key, value);
      }
    });

    // For demonstration, navigate to a lands listing page with the query string
    // In a real app this would trigger fetching or a page load
    setTimeout(() => {
      setLoading(false);
      navigate(`/lands?${params.toString()}`);
    }, 600);
  };

  const clearFilters = () => {
    setSearchParams({
      location: '', minSize: '', maxSize: '', unit: 'Sq.yd', 
      minPrice: '', maxPrice: '', landType: 'Residential Plot',
      roadAccess: false, cornerPlot: false, electricity: false, water: false
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto z-30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-visible p-6 sm:p-8"
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar gap-2 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-3 text-sm md:text-base font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab ? 'text-blue-700' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="landTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-700 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            
            {/* Location */}
            <div className="lg:col-span-1 border border-gray-300 bg-white rounded-xl relative focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <MapPin size={20} className="text-gray-400" />
              </div>
              <label className="absolute text-[10px] uppercase font-bold text-gray-500 top-2 left-10">Location</label>
              <input 
                type="text" 
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="City, locality, pincode..." 
                className="w-full pl-10 pr-4 pt-6 pb-2 bg-transparent rounded-xl outline-none text-sm text-gray-700 placeholder-gray-300"
              />
            </div>

            {/* Plot Size */}
            <div className="lg:col-span-1 border border-gray-300 bg-white rounded-xl relative focus-within:ring-2 focus-within:ring-blue-500 transition-all flex">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Maximize size={20} className="text-gray-400" />
              </div>
              <label className="absolute text-[10px] uppercase font-bold text-gray-500 top-2 left-10">Plot Size</label>
              <div className="flex w-full pt-6 pb-2 pl-10 pr-2 items-center gap-2">
                <input 
                  type="number" 
                  name="minSize"
                  value={searchParams.minSize}
                  onChange={handleInputChange}
                  placeholder="Min" 
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-300"
                />
                <span className="text-gray-300">-</span>
                <input 
                  type="number" 
                  name="maxSize"
                  value={searchParams.maxSize}
                  onChange={handleInputChange}
                  placeholder="Max" 
                  className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-300"
                />
              </div>
              <div className="border-l border-gray-200">
                <select 
                  name="unit" 
                  value={searchParams.unit}
                  onChange={handleInputChange}
                  className="h-full bg-transparent outline-none text-xs font-semibold text-blue-700 px-2 cursor-pointer rounded-r-xl"
                >
                  <option value="Sq.yd">Sq.yd</option>
                  <option value="Sq.ft">Sq.ft</option>
                  <option value="Acre">Acre</option>
                  <option value="Hectare">Hectare</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="lg:col-span-1 border border-gray-300 bg-white rounded-xl relative focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <IndianRupee size={20} className="text-gray-400" />
              </div>
              <label className="absolute text-[10px] uppercase font-bold text-gray-500 top-2 left-10">Budget (₹)</label>
              <div className="flex w-full pt-6 pb-2 pl-10 pr-4 items-center gap-2">
                <select name="minPrice" value={searchParams.minPrice} onChange={handleInputChange} className="w-full bg-transparent outline-none text-sm text-gray-700 cursor-pointer">
                  <option value="">Min</option>
                  <option value="1000000">10 Lac</option>
                  <option value="5000000">50 Lac</option>
                  <option value="10000000">1 Cr</option>
                </select>
                <span className="text-gray-300">-</span>
                <select name="maxPrice" value={searchParams.maxPrice} onChange={handleInputChange} className="w-full bg-transparent outline-none text-sm text-gray-700 cursor-pointer">
                  <option value="">Max</option>
                  <option value="5000000">50 Lac</option>
                  <option value="10000000">1 Cr</option>
                  <option value="50000000">5 Cr</option>
                  <option value="100000000">10 Cr</option>
                </select>
              </div>
            </div>

            {/* Land Type */}
            <div className="lg:col-span-1 border border-gray-300 bg-white rounded-xl relative focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Map size={20} className="text-gray-400" />
              </div>
              <label className="absolute text-[10px] uppercase font-bold text-gray-500 top-2 left-10">Land Type</label>
              <select 
                name="landType"
                value={searchParams.landType}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 pt-6 pb-2 bg-transparent rounded-xl outline-none text-sm text-gray-700 cursor-pointer appearance-none"
              >
                <option value="Residential Plot">Residential Plot</option>
                <option value="Agricultural Land">Agricultural Land</option>
                <option value="Farm Land">Farm Land</option>
                <option value="Industrial Land">Industrial Land</option>
              </select>
            </div>

            {/* CTA Button */}
            <div className="lg:col-span-1 h-full">
              <motion.button 
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-full min-h-[60px] bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Search size={22} />
                    <span>Search Land</span>
                  </>
                )}
              </motion.button>
            </div>
            
          </div>

          {/* Advanced Filters Toggle */}
          <div className="mt-4 flex justify-between items-center">
            <button 
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-800 transition"
            >
              <ChevronDown size={16} className={`transform transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
              Advanced Filters
            </button>

            <button 
              type="button" 
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition"
            >
              <X size={14} /> Clear All
            </button>
          </div>

          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                  {[
                    { name: 'roadAccess', label: 'Road Access' },
                    { name: 'cornerPlot', label: 'Corner Plot' },
                    { name: 'electricity', label: 'Electricity Available' },
                    { name: 'water', label: 'Water Available' }
                  ].map((filter) => (
                    <label 
                      key={filter.name} 
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition-all ${
                        searchParams[filter.name] 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        name={filter.name}
                        checked={searchParams[filter.name]}
                        onChange={handleInputChange}
                        className="hidden" 
                      />
                      {searchParams[filter.name] && <Check size={14} />}
                      <span className="text-sm font-medium">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </form>
      </motion.div>
    </div>
  );
};

export default LandSearchBar;