import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter as FilterIcon, Grid, List as ListIcon, Map as MapIcon, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import TopFilterBar from '../components/listing/TopFilterBar';
import PropertyCard from '../components/listing/PropertyCard';
import MapView from '../components/listing/MapView';
import Pagination from '../components/listing/Pagination';
import PropertyModal from '../components/admin/PropertyModal';
import CustomDropdown from '../components/ui/CustomDropdown';
import ConfirmDeleteModal from '../components/admin/ConfirmDeleteModal';

// Data
import { mockLandProperties } from '../data/mockLand';

// Stores
import { useMapStore } from '../store/useMapStore';

const AdminListingPage = () => {
  // Persistence using localStorage
  const [properties, setProperties] = useState(() => {
    const saved = localStorage.getItem("plots");
    if (saved) return JSON.parse(saved);
    return mockLandProperties;
  });

  useEffect(() => {
    localStorage.setItem("plots", JSON.stringify(properties));
  }, [properties]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deletePropertyId, setDeletePropertyId] = useState(null);

  const [viewMode, setViewMode] = useState('grid');
  const [isMapView, setIsMapView] = useState(false);
  
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
  });

  const clearFilters = () => {
    setFilters({ location: '', minPrice: '', maxPrice: '', propertyType: '', plotSize: '', amenities: [] });
  };

  // CRUD Operations
  const handleSaveProperty = (propertyData) => {
    if (editingProperty) {
      setProperties(prev => prev.map(p => p.id === propertyData.id ? propertyData : p));
    } else {
      setProperties(prev => [propertyData, ...prev]);
    }
  };

  const confirmDelete = () => {
    if (deletePropertyId) {
      setProperties(prev => prev.filter(p => p.id !== deletePropertyId));
      setDeletePropertyId(null);
    }
  };

  const openAddModal = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  // Debounced/Derived Filtering Logic
  const filteredAndSortedProperties = useMemo(() => {
    let result = [...properties];

    if (filters.location) result = result.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()) || p.title.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.minPrice) result = result.filter(p => p.price >= parseInt(filters.minPrice));
    if (filters.maxPrice) result = result.filter(p => p.price <= parseInt(filters.maxPrice));
    if (filters.propertyType) result = result.filter(p => p.propertyType === filters.propertyType || (p.tags && p.tags.includes(filters.propertyType)));

    if (mapBounds && isMapView) {
      result = result.filter(p => {
         const lat = p.coordinates?.[0];
         const lng = p.coordinates?.[1];
         if (!lat || !lng) return false;
         return lng >= mapBounds[0] && lng <= mapBounds[2] && lat >= mapBounds[1] && lat <= mapBounds[3];
      });
    }

    // Sorting
    switch (sortOption) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'featured':
      default: result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
    }

    return result;
  }, [properties, filters, sortOption, searchThisAreaTrigger, mapBounds, isMapView]);

  const hasActiveFilters = Object.values(filters).some(x => Array.isArray(x) ? x.length > 0 : !!x);

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans relative">
      <TopFilterBar 
        filters={filters} 
        setFilters={setFilters} 
        clearFilters={clearFilters}
        isAdmin={true} // Triggers rendering 'Clear All' logic inside TopFilterBar on the left
        rightContent={
          <div className="flex gap-4 items-center">
            {/* Sort Toggle */}
            <div className="flex items-center min-w-[150px] bg-white rounded-md border border-[#E9E4DC]">
              <span className="text-[12px] text-[#6B6B6B] uppercase tracking-wider font-semibold ml-3 mr-1">Sort:</span>
              <div className="w-full">
                <CustomDropdown
                  label="Featured"
                  options={["Featured", "Newest", "Price: Low-High", "Price: High-Low"]}
                  value={
                    sortOption === 'featured' ? 'Featured' :
                    sortOption === 'newest' ? 'Newest' :
                    sortOption === 'price-asc' ? 'Price: Low-High' :
                    sortOption === 'price-desc' ? 'Price: High-Low' : 'Featured'
                  }
                  onChange={(val) => {
                    if (val === 'Featured') setSortOption('featured');
                    if (val === 'Newest') setSortOption('newest');
                    if (val === 'Price: Low-High') setSortOption('price-asc');
                    if (val === 'Price: High-Low') setSortOption('price-desc');
                  }}
                />
              </div>
            </div>

            {/* View Toggles */}
            <div className="flex items-center bg-[#F5F1EB] rounded-md p-1 border border-[#E9E4DC]/50 shrink-0">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#111]' : 'text-[#6B6B6B] hover:text-[#111]'}`}>
                <Grid size={16} />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-[#111]' : 'text-[#6B6B6B] hover:text-[#111]'}`}>
                <ListIcon size={16} />
              </button>
            </div>

            {/* Map Toggle */}
            <button
              onClick={() => setIsMapView(!isMapView)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-[13px] font-semibold transition-all shrink-0 ${
                isMapView ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-[#111] border-[#E9E4DC] hover:border-[#111]'
              }`}
            >
              <MapIcon size={14} />
              {isMapView ? 'Hide Map' : 'Map View'}
            </button>

            {/* Add New Plot Button */}
            <button 
              onClick={openAddModal}
              className="px-4 py-2 bg-[#111] text-white text-[13px] font-semibold uppercase tracking-wider rounded border border-[#111] hover:bg-[#C6A769] hover:border-[#C6A769] transition-all whitespace-nowrap shrink-0"
            >
              + Add New Plot
            </button>
          </div>
        }
      />

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 xl:px-8 py-8">
        
        {/* Main Header */}
        <div className="mb-6">
          <h1 className="text-[32px] md:text-[40px] font-serif text-[#111111] leading-tight mb-2">
            Admin: Land & Plots
          </h1>
          <p className="text-[#6B6B6B] text-[15px] max-w-3xl">
            Manage the master inventory of exclusive land parcels and scenic plots. Changes synchronize automatically.
          </p>
          <div className="mt-4 text-[#111111] font-medium text-[14px]">
            Showing <span className="font-semibold">{filteredAndSortedProperties.length}</span> Properties
          </div>
        </div>

        {/* Layout Container */}
        <div className={`grid gap-8 items-start w-full transition-all duration-300 ${isMapView ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          
          {isMapView && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-[400px] lg:h-[calc(100vh-160px)] lg:sticky lg:top-[20px] rounded-2xl overflow-hidden shadow-lg z-10"
            >
              <MapView properties={filteredAndSortedProperties} />
            </motion.div>
          )}

          <div className="w-full min-w-0 transition-all duration-500 ease-in-out">
            {filteredAndSortedProperties.length === 0 ? (
              <div className="w-full py-24 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-[#E9E4DC] shadow-sm">
                <div className="w-20 h-20 bg-[#F5F1EB] rounded-full flex items-center justify-center mb-6 text-[#C6A769]">
                  <FilterIcon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif text-[#111] mb-3">No Properties Match Your Criteria</h3>
                <p className="text-[#6B6B6B] text-[15px] max-w-[400px] mb-8">Try adjusting your filters, location, or add a new plot.</p>
                <button onClick={clearFilters} className="px-8 py-3.5 bg-[#111] text-white text-[13px] uppercase tracking-[0.15em] font-semibold rounded-md hover:bg-[#C6A769] transition">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? (isMapView ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4') : 'grid-cols-1'}`}>
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedProperties.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      viewMode={viewMode}
                      isActive={hoveredPropertyId === property.id || selectedPropertyId === property.id}
                      onHover={() => setHoveredPropertyId(property.id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                      onClick={() => setSelectedPropertyId(property.id)}
                      isMapActive={isMapView}
                      isAdmin={true}
                      onEdit={openEditModal}
                      onDelete={(id) => setDeletePropertyId(id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
            {filteredAndSortedProperties.length > 0 && <Pagination currentPage={1} totalPages={3} totalResults={filteredAndSortedProperties.length} />}
          </div>
        </div>
      </div>

      {/* Extracted Fullscreen Modal */}
      <PropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProperty} 
        editingProperty={editingProperty}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal 
        isOpen={!!deletePropertyId}
        onClose={() => setDeletePropertyId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminListingPage;
