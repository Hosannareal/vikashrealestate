import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const AgentCard = ({ agent, onEmailClick }) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleImageClick = () => {
    navigate(`/agents/${agent.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group h-full"
    >
      <div className="bg-white rounded-xl overflow-hidden border border-[#e5e0d8] hover:border-[#C6A769] shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 transform group-hover:-translate-y-1.5 flex flex-col h-full">
        {/* Image Container */}
        <div
          className="relative w-full aspect-[4/3] overflow-hidden bg-[#f8f6f2] cursor-pointer"
          onClick={handleImageClick}
        >
          <motion.img
            src={agent.image}
            alt={agent.name}
            className="w-full h-full object-cover rounded-t-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-t-xl"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Name - Gold */}
          <h3
            className="text-lg font-serif text-[#111111] mb-1 cursor-pointer group-hover:text-[#C6A769] transition"
            onClick={handleImageClick}
          >
            {agent.name}
          </h3>

          {/* Contact Info */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[12px] text-[#6B6B6B]">Cell: </span>
            <a
              href={`tel:${agent.phone}`}
              className="text-[12px] text-[#C6A769] hover:text-[#B39659] hover:underline font-medium"
            >
              {agent.phone}
            </a>
          </div>

          {/* Experience / Stats */}
          <div className="flex flex-col gap-1.5 mb-4 text-[#6B6B6B] text-[12px]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A769]"></span>
              <span className="font-semibold text-[#111111]">{agent.plotsSold}+</span> Plots Sold
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A769]"></span>
              <span className="font-semibold text-[#111111]">{agent.activeListings}+</span> Active Listings
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A769]"></span>
              <span className="font-semibold text-[#111111]">{agent.experienceYears}</span> Years Experience
            </div>
          </div>

          {/* Specialties - Small Tags */}
          <div className="flex flex-wrap gap-2 mb-6 mt-auto">
            {agent.specialties?.slice(0, 3).map((specialty, idx) => (
              <span
                key={idx}
                className="text-[10px] uppercase tracking-wider bg-[#f1e8d8] text-[#a8874f] px-2.5 py-1 rounded-full font-semibold"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 text-[12px] uppercase tracking-wider font-semibold border-t border-[#e5e0d8] pt-4 mt-auto">
            <button
              onClick={handleImageClick}
              className="flex-1 text-[#111111] hover:text-[#C6A769] transition py-2"
            >
              Bio
            </button>
            <span className="text-[#e5e0d8]">|</span>
            <button
              onClick={() => onEmailClick(agent)}
              className="flex-1 text-[#111111] hover:text-[#C6A769] flex items-center justify-center gap-2 transition py-2"
            >
              <Mail size={14} />
              Email
            </button>
            <span className="text-[#e5e0d8]">|</span>
            <button
              onClick={handleImageClick}
              className="flex-1 text-[#111111] hover:text-[#C6A769] transition py-2"
            >
              Listings
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgentCard;
