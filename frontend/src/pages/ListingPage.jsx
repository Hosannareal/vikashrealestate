import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter as FilterIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import TopFilterBar from '../components/listing/TopFilterBar';
import SortBar from '../components/listing/SortBar';
import PropertyCard from '../components/listing/PropertyCard';
import MapView from '../components/listing/MapView';
import Pagination from '../components/listing/Pagination';

// Data
import { mockLandProperties } from '../data/mockLand';

// Stores
import { useMapStore } from '../store/useMapStore';

const ListingPage = ({ type }) => {
  const [viewMode, setViewMode] = useState('grid'); // grid | list
  const [isMapView, setIsMapView] = useState(false); // Map mode toggle

  const location = useLocation();
  
  // Zustand State
  const { 
    hoveredPropertyId, setHoveredPropertyId,
    selectedPropertyId, setSelectedPropertyId,
    mapBounds, searchThisAreaTrigger 
  } = useMapStore();
  
  const [sortOption, setSortOption] = useState('featured');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    plotSize: '',
    amenities: [],
    status: [], // ['newly-launched', 'coming-soon']
  });

  // Initialize from URL query (Home + City + Newly Launched CTAs)
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = (params.get('q') || '').trim();
    const city = (params.get('city') || '').trim();
    const view = params.get('view');
    const sort = params.get('sort');
    const statusParam = params.get('status');

    if (view === 'map') setIsMapView(true);

    if (q || city) {
      setFilters((prev) => ({ ...prev, location: q || city }));
    }

    if (sort) {
      const allowed = ['newly-launched', 'coming-soon', 'featured', 'price-asc', 'price-desc'];
      if (allowed.includes(sort)) setSortOption(sort);
    }

    if (statusParam) {
      const parsed = statusParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const allowedStatus = ['newly-launched', 'coming-soon'];
      const next = parsed.filter((s) => allowedStatus.includes(s));
      if (next.length > 0) setFilters((prev) => ({ ...prev, status: next }));
    } else {
      // If sort is status-driven, also filter to that status.
      if (sort === 'newly-launched') setFilters((prev) => ({ ...prev, status: ['newly-launched'] }));
      if (sort === 'coming-soon') setFilters((prev) => ({ ...prev, status: ['coming-soon'] }));
    }
  }, [location.search]);

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      plotSize: '',
      amenities: [],
      status: [],
    });
  };

  // Debounced/Derived Filtering Logic
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...mockLandProperties];

    // Location
    if (filters.location) {
      const q = filters.location.toLowerCase();
      result = result.filter((p) =>
        (p.location || '').toLowerCase().includes(q) || (p.title || '').toLowerCase().includes(q)
      );
    }

    // Price Range
    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseInt(filters.maxPrice));
    }

    // Property Type
    if (filters.propertyType) {
      result = result.filter(p => p.propertyType === filters.propertyType || p.tags.includes(filters.propertyType));
    }

    // Status (Newly Launched / Coming Soon)
    if (Array.isArray(filters.status) && filters.status.length > 0) {
      const wantsNew = filters.status.includes('newly-launched');
      const wantsComingSoon = filters.status.includes('coming-soon');
      result = result.filter((p) => {
        const isNew = p?.status === 'newly_launched' || p?.isNew;
        const isComingSoon = p?.status === 'coming_soon' || p?.isComingSoon;
        if (wantsNew && isNew) return true;
        if (wantsComingSoon && isComingSoon) return true;
        return false;
      });
    }

    // Filter by Map Bounds if "Search this area" was triggered
    if (mapBounds) {
      // mapBounds = [minLng, minLat, maxLng, maxLat]
      result = result.filter(p => {
         const [lat, lng] = p.coordinates;
         return lng >= mapBounds[0] && lng <= mapBounds[2] && lat >= mapBounds[1] && lat <= mapBounds[3];
      });
    }

    // Sorting
    switch (sortOption) {
      case 'newly-launched':
        result.sort((a, b) => {
          const aNew = a?.status === 'newly_launched' || a?.isNew ? 1 : 0;
          const bNew = b?.status === 'newly_launched' || b?.isNew ? 1 : 0;
          return bNew - aNew;
        });
        break;
      case 'coming-soon':
        result.sort((a, b) => {
          const aSoon = a?.status === 'coming_soon' || a?.isComingSoon ? 1 : 0;
          const bSoon = b?.status === 'coming_soon' || b?.isComingSoon ? 1 : 0;
          return bSoon - aSoon;
        });
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortOption, searchThisAreaTrigger]); // re-run if search this area trigger increments

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans relative">
      
      {/* Top Filter Bar */}
      <TopFilterBar variant="results" filters={filters} setFilters={setFilters} clearFilters={clearFilters} />

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 xl:px-8 py-8">
        
        {/* Main Header / SortBar Level */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 pb-4 border-b border-[#E9E4DC]">
          <div>
            <h1 className="text-[32px] md:text-[40px] font-serif text-[#111111] leading-tight mb-2">
              Premium Land & Plots
            </h1>
            <p className="text-[#6B6B6B] text-[15px]">
              Discover exclusive land parcels, scenic plots, and commercial grounds.
            </p>
          </div>
          <div className="mt-6 md:mt-0 w-full shrink-0 md:w-auto">
            <SortBar 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
              sortOption={sortOption} 
              setSortOption={setSortOption}
              totalResults={filteredAndSortedProperties.length}
              isMapView={isMapView}
              setIsMapView={setIsMapView}
            />
          </div>
        </div>

        {/* Layout Container: Map LEFT, Cards RIGHT */}
        <div className={`grid gap-8 items-start w-full transition-all duration-300 ${isMapView ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          
          {/* MAP CONTAINER (LEFT SIDE in Split View) */}
          {isMapView && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[400px] lg:h-[calc(100vh-140px)] lg:sticky lg:top-[20px] rounded-2xl overflow-hidden shadow-lg z-10"
            >
              <MapView properties={filteredAndSortedProperties} />
            </motion.div>
          )}

          {/* LISTINGS CONTAINER */}
          <div className="w-full min-w-0 transition-all duration-500 ease-in-out">
            
            {filteredAndSortedProperties.length === 0 ? (
              <div className="w-full py-24 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-[#E9E4DC] shadow-sm">
                <div className="w-20 h-20 bg-[#F5F1EB] rounded-full flex items-center justify-center mb-6 text-[#C6A769]">
                  <FilterIcon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif text-[#111] mb-3">No Properties Match Your Search</h3>
                <p className="text-[#6B6B6B] text-[15px] max-w-[400px] mb-8">Try adjusting your filters, location, or price range to find the perfect plot.</p>
                <button 
                  onClick={clearFilters}
                  className="px-8 py-3.5 bg-[#111] text-white text-[13px] uppercase tracking-[0.15em] font-semibold rounded-md hover:bg-[#C6A769] transition-all shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div 
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? (isMapView ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4') 
                    : 'grid-cols-1'
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      viewMode={viewMode}
                      isActive={hoveredPropertyId === property.id || selectedPropertyId === property.id}
                      onHover={() => setHoveredPropertyId(property.id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                      onClick={() => {
                        setSelectedPropertyId(property.id);
                      }}
                      isMapActive={isMapView}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {filteredAndSortedProperties.length > 0 && (
              <Pagination currentPage={1} totalPages={3} totalResults={140} />
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default ListingPage;
