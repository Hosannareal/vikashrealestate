import React from 'react';
import { X, Search } from 'lucide-react';

const FilterPanel = ({ filters, setFilters, onClose, isOpen }) => {
  const propertyTypes = ["All", "Apartment", "Villa", "Plot", "Commercial"];
  const bhkOptions = ["Any", "1", "2", "3", "4", "5+"];
  const amenitiesList = ["Pool", "Gym", "Parking", "Security", "Lift", "Garden"];

  const handleTypeChange = (type) => {
    setFilters({ ...filters, propertyType: type === "All" ? "" : type });
  };

  const handleBhkChange = (bhk) => {
    setFilters({ ...filters, bhk: bhk === "Any" ? "" : bhk });
  };

  const toggleAmenity = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      propertyType: "",
      bhk: "",
      amenities: []
    });
  };

  // Base classes for the panel based on mobile drawer vs desktop sidebar
  const panelClasses = `
    bg-white w-full h-full flex flex-col
    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    transition-transform duration-300 fixed lg:static top-0 left-0 z-50 lg:z-auto
    lg:block lg:w-[320px] lg:h-[calc(100vh-140px)] lg:sticky lg:top-[120px] lg:rounded-xl lg:border lg:border-[#E9E4DC] lg:shadow-sm
    overflow-y-auto lg:hide-scrollbar
  `;

  return (
    <div className={panelClasses}>
      
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-[#E9E4DC] shrink-0 sticky top-0 bg-white z-10">
        <h2 className="text-[18px] font-serif font-medium text-[#111111]">Filters</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={clearFilters}
            className="text-[12px] text-[#6B6B6B] hover:text-[#C6A769] font-medium uppercase tracking-wider transition-colors"
          >
            Clear All
          </button>
          <button onClick={onClose} className="lg:hidden text-[#111]">
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="p-4 lg:p-6 flex flex-col gap-8">
        
        {/* Search / Location */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#111111] mb-3">
            Search Location & Keyword
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g. Bandra, Sea View..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full bg-[#F5F5F5] border border-transparent rounded-lg pl-10 pr-4 py-3 text-[14px] text-[#111] focus:outline-none focus:border-[#C6A769] transition-colors"
            />
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#111111] mb-3">
            Price Range
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] text-[13px]">₹</span>
              <input 
                type="number" 
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="w-full bg-[#F5F5F5] border border-transparent rounded-lg pl-8 pr-3 py-3 text-[13px] text-[#111] focus:outline-none focus:border-[#C6A769] transition-colors"
              />
            </div>
            <span className="text-[#6B6B6B]">-</span>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999] text-[13px]">₹</span>
              <input 
                type="number" 
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="w-full bg-[#F5F5F5] border border-transparent rounded-lg pl-8 pr-3 py-3 text-[13px] text-[#111] focus:outline-none focus:border-[#C6A769] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#111111] mb-3">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => {
              const isActive = (filters.propertyType === "" && type === "All") || filters.propertyType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleTypeChange(type)}
                  className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    isActive 
                      ? 'bg-[#111111] text-white' 
                      : 'bg-white border border-[#E9E4DC] text-[#6B6B6B] hover:border-[#111111]'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bedrooms (BHK) */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#111111] mb-3">
            Bedrooms (BHK)
          </label>
          <div className="flex gap-2">
            {bhkOptions.map((bhk) => {
              const isActive = (filters.bhk === "" && bhk === "Any") || filters.bhk === bhk;
              return (
                <button
                  key={bhk}
                  onClick={() => handleBhkChange(bhk)}
                  className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    isActive 
                      ? 'bg-[#C6A769] text-white border border-[#C6A769]' 
                      : 'bg-white border border-[#E9E4DC] text-[#6B6B6B] hover:border-[#111111]'
                  }`}
                >
                  {bhk}
                </button>
              );
            })}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#111111] mb-3">
            Premium Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {amenitiesList.map((amenity) => {
              const isActive = filters.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
                    isActive 
                      ? 'bg-[#111]/5 border-[#111] text-[#111]' 
                      : 'bg-transparent border-[#E9E4DC] text-[#6B6B6B] hover:border-[#C6A769]'
                  }`}
                >
                  {isActive && <span className="mr-1 inline-block">✓</span>}
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Mobile Footer Apply Button */}
      <div className="p-4 border-t border-[#E9E4DC] mt-auto lg:hidden sticky bottom-0 bg-white z-10">
        <button 
          onClick={onClose}
          className="w-full py-3.5 bg-[#111111] text-white text-[13px] uppercase tracking-widest font-semibold rounded-lg hover:bg-[#C6A769] transition-colors"
        >
          Apply Filters
        </button>
      </div>

    </div>
  );
};

export default FilterPanel;