import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart, Maximize, Compass, Map, Edit, Trash2 } from 'lucide-react';

// Pass onClick from parent for map synchronization
const PropertyCard = ({ property, viewMode, isActive, onHover, onMouseLeave, onClick, isMapActive, isAdmin, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const isList = viewMode === 'list';

  return (
    <div
      id={`property-${property.id}`}
      onMouseEnter={onHover}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`bg-white rounded-xl overflow-hidden border cursor-pointer hover:shadow-lg transition duration-300 ease-in-out
        ${isActive ? 'border-[#C6A769] shadow-xl shadow-[#C6A769]/10' : 'border-[#E9E4DC]'}
        ${isList ? 'flex flex-col sm:flex-row' : 'flex-col'}
      `}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden shrink-0 ${isList ? 'sm:w-[35%] h-[200px] sm:h-auto' : 'w-full h-[220px]'}`}>
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.isFeatured && (
            <span className="bg-[#111111] text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold shadow-sm">
              Featured
            </span>
          )}
          {property.verified && (
            <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-semibold shadow-sm">
              Verified Plot
            </span>
          )}
        </div>

{/* Right Corner Actions */}
        {!isAdmin ? (
          <button
            onClick={(e) => { e.stopPropagation(); /* handle favorite */ }}       
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm z-10"
          >
            <Heart size={16} />
          </button>
        ) : (
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit && onEdit(property); }}       
              className="p-2 bg-white/90 backdrop-blur-md rounded-full text-gray-600 hover:text-[#C6A769] hover:bg-white transition-all shadow-sm"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete && onDelete(property.id); }}       
              className="p-2 bg-white/90 backdrop-blur-md rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all shadow-sm"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Bottom Tags */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto no-scrollbar">
          {property.tags?.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="bg-white/90 backdrop-blur-md text-[#111] text-[11px] px-2 py-0.5 rounded-sm font-medium whitespace-nowrap shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content - Reduced padding (p-4 instead of p-6) */}
      <div className={`p-4 flex flex-col w-full items-start justify-between`}>
        
        <div className="w-full flex justify-between items-start mb-1 gap-2">
          <h3 className="text-[17px] font-serif text-[#111111] leading-tight line-clamp-2">
            {property.title}
          </h3>
          <p className="text-[18px] font-semibold text-[#111111] whitespace-nowrap">
            ?{(property.price / 100000).toFixed(2)} Cr
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-gray-500 text-[12px] mb-4">
          <MapPin size={13} className="text-[#C6A769]" /> {property.location}
        </p>

        {/* Key Metrics Grid - Tighter layout */}
        <div className={`w-full flex gap-4 mb-4 pt-3 border-t border-[#E9E4DC]`}>
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
               <Maximize size={12} /> Size
            </span>
            <span className="text-[13px] text-[#111] font-medium">{property.plotSize} {property.sizeUnit}</span>
          </div>
          
          <div className="flex flex-col gap-0.5 border-l pl-4 border-[#E9E4DC]">
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
               <Compass size={12} /> Facing
            </span>
            <span className="text-[13px] text-[#111] font-medium">{property.facing}</span>
          </div>

          <div className="flex flex-col gap-0.5 border-l pl-4 border-[#E9E4DC]">
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
               <Map size={12} /> Type
            </span>
            <span className="text-[13px] text-[#111] font-medium line-clamp-1">{property.propertyType}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="w-full mt-auto pt-3 border-t border-[#E9E4DC] flex items-center justify-between gap-3">
          {property.pricePerSqft ? (
            <div className="text-[11px] text-gray-500 font-medium">
              <span className="text-[#111]">?{property.pricePerSqft.toLocaleString()}</span> / sq.ft
            </div>
          ) : (
            <div className="text-[11px] text-gray-500 font-medium">Price on Request</div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate(`/plot/${property.id}`); }}
              className="px-4 py-1.5 bg-[#111] text-white text-[12px] font-semibold rounded hover:bg-[#C6A769] transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
