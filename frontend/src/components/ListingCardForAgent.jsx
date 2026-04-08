import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MessageCircle, Camera } from 'lucide-react';

const ListingCardForAgent = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg border border-[#e5e0d8] overflow-hidden hover:shadow-md transition-all group"
    >
      <div className="flex flex-col md:flex-row gap-0">
        {/* Left: Image */}
        <div className="relative w-full md:w-2/5 h-[250px] md:h-auto overflow-hidden bg-[#f8f6f2]">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          />

          {/* Badge - Gold Ribbon Style */}
          {listing.badge && (
            <div className="absolute top-3 left-3">
              <div className="relative">
                {/* Ribbon background */}
                <div className="bg-[#C6A769] text-white px-3 py-1.5 rounded-sm shadow-lg font-semibold text-[11px] uppercase tracking-wider">
                  {listing.badge}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          {/* Title & Location */}
          <div className="flex-1">
            <h3 className="text-[#C6A769] font-serif text-lg md:text-xl mb-1 hover:text-[#B39659] transition cursor-pointer">
              {listing.title}
            </h3>
            <p className="text-[#6B6B6B] text-sm mb-3">
              {listing.address}
              <br />
              {listing.city}
            </p>

            {/* MLS & Type */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-[12px] text-[#111111]">
              <span>
                <span className="font-semibold text-[#6B6B6B]">MLS:</span> {listing.mlsId}
              </span>
              <span>
                <span className="font-semibold text-[#6B6B6B]">Type:</span> {listing.type}
              </span>
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-[#e5e0d8]">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Beds
                </span>
                <span className="text-lg font-serif text-[#111111]">{listing.beds}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Baths
                </span>
                <span className="text-lg font-serif text-[#111111]">{listing.baths}</span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
                  Sq Ft
                </span>
                <span className="text-lg font-serif text-[#111111]">{listing.sqft}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[13px] text-[#6B6B6B] line-clamp-2 leading-relaxed mb-4">
              {listing.description}
            </p>
          </div>

          {/* Price & Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-[#e5e0d8]">
            {/* Price - Right aligned on desktop */}
            <div className="order-2 md:order-1 text-right md:text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold block mb-1">
                Sale Price
              </span>
              <span className="text-xl md:text-2xl font-serif text-[#C6A769]">
                {listing.price}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="order-1 md:order-2 flex gap-3">
              <button 
                onClick={() => navigate(`/plots/${listing.slug || listing.id}`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#f8f6f2] text-[#111111] rounded-lg text-[12px] uppercase tracking-wider font-semibold hover:bg-[#e5e0d8] transition"
              >
                <Eye size={16} />
                <span className="hidden sm:inline">View</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#f8f6f2] text-[#111111] rounded-lg text-[12px] uppercase tracking-wider font-semibold hover:bg-[#e5e0d8] transition">
                <MessageCircle size={16} />
                <span className="hidden sm:inline">Ask</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#f8f6f2] text-[#111111] rounded-lg text-[12px] uppercase tracking-wider font-semibold hover:bg-[#e5e0d8] transition">
                <Camera size={16} />
                <span className="hidden sm:inline">Tour</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCardForAgent;
