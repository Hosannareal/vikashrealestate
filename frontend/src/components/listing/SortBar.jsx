import React from 'react';
import { Grid, List as ListIcon, Map, MapPin } from 'lucide-react';
import CustomDropdown from '../ui/CustomDropdown';

const SortBar = ({ 
  viewMode, 
  setViewMode, 
  sortOption, 
  setSortOption, 
  totalResults,
  isMapView,
  setIsMapView
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 mb-6 border-b border-[#E9E4DC] gap-4">
      <div className="text-[#111111] font-medium text-[15px]">
        Showing <span className="font-semibold">{totalResults}</span> Properties
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
        
        {/* Sort Dropdown */}
        <div className="flex items-center min-w-[180px]">
          <label className="text-[12px] text-[#6B6B6B] uppercase tracking-wider font-semibold mr-2 shrink-0">
            Sort By:
          </label>
          <div className="w-full">
            <CustomDropdown
              label="Featured"
              options={["Newly Launched", "Coming Soon", "Featured", "Price: Low to High"]}
              value={
                sortOption === 'newly-launched' ? 'Newly Launched' :
                sortOption === 'coming-soon' ? 'Coming Soon' :
                sortOption === 'featured' ? 'Featured' :
                sortOption === 'price-asc' ? 'Price: Low to High' :
                'Featured'
              }
              onChange={(val) => {
                if (val === 'Newly Launched') setSortOption('newly-launched');
                if (val === 'Coming Soon') setSortOption('coming-soon');
                if (val === 'Featured') setSortOption('featured');
                if (val === 'Price: Low to High') setSortOption('price-asc');
              }}
            />
          </div>
        </div>

        <div className="h-6 w-[1px] bg-[#E9E4DC]"></div>

        {/* View Toggles */}
        <div className="flex items-center bg-[#F5F1EB] rounded-md p-1 border border-[#E9E4DC]/50 shrink-0">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-all ${
              viewMode === 'grid' 
                ? 'bg-white shadow-sm text-[#111]' 
                : 'text-[#6B6B6B] hover:text-[#111]'
            }`}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded transition-all ${
              viewMode === 'list' 
                ? 'bg-white shadow-sm text-[#111]' 
                : 'text-[#6B6B6B] hover:text-[#111]'
            }`}
            title="List View"
          >
            <ListIcon size={18} />
          </button>
        </div>

        {/* Map Toggle */}
        <button 
          onClick={() => setIsMapView(!isMapView)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md border text-[13px] font-semibold transition-all shrink-0 ${
            isMapView 
              ? 'bg-[#111] text-white border-[#111]' 
              : 'bg-white text-[#111] border-[#E9E4DC] hover:border-[#111]'
          }`}
        >
          <Map size={16} />
          {isMapView ? 'Hide Map' : 'Show Map'}
        </button>

      </div>
    </div>
  );
};

export default SortBar;