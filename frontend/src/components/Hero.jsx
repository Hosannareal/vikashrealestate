import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onDropdownToggle }) => {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F1EB] flex flex-col md:flex-row items-center justify-between overflow-hidden pt-24 pb-12 px-6 md:px-16 lg:px-24">
      {/* Decorative Textures */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#C6A769] opacity-10 blur-3xl rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#E8E1D9] opacity-40 blur-3xl pointer-events-none" />

      {/* Left Content Column */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full md:w-1/2 flex flex-col justify-center z-10 pt-10 pb-16 md:py-0 pr-0 md:pr-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-[#C6A769]"></div>
          <span className="text-sm md:text-md tracking-[0.3em] font-medium text-[#C6A769] uppercase">
            Artisanal Homes
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#111111] leading-[1.1] mb-8">
          A SENSE<br />OF PLACE
        </h1>
        
        <p className="text-lg text-[#6B6B6B] max-w-md mb-10 font-light leading-relaxed">
          Experience the true expression of luxury at our exceptional residences, 
          merging personalized comfort with an inspiring design-led journey.
        </p>

        <div className="flex gap-6 items-center">
          <button className="btn-primary flex items-center justify-center min-w-[200px]">
            Explore Residences
          </button>
          <button className="btn-secondary flex items-center justify-center min-w-[200px]">
            View Journal
          </button>
        </div>
      </motion.div>

      {/* Right Image Column */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        className="w-full md:w-1/2 relative h-[500px] md:h-[75vh] z-10"
      >
        {/* Abstract Gold block behind image */}
        <div className="absolute -top-6 -right-6 w-32 h-32 md:w-64 md:h-64 bg-[#C6A769] opacity-80" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 100%)'}} />
        
        {/* Main Image Base */}
        <div className="w-full h-full relative overflow-hidden rounded-sm shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
            alt="Luxury Space" 
            className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-110 object-center"
          />
          {/* Subtle Warm Overlay */}
          <div className="absolute inset-0 bg-[#C6A769]/10 mix-blend-color-burn"></div>
        </div>

        {/* Floating Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute -bottom-8 md:-bottom-12 -left-8 md:-left-16 bg-[#F5F1EB] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-20 border border-[#E8E1D9] max-w-[280px]"
        >
          <h3 className="text-3xl font-serif text-[#111111] mb-2">510 <span className="text-sm font-sans tracking-widest text-[#C6A769] ml-1">SQ.FT UP</span></h3>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            The ultimate urban hideaway for those seeking bespoke living and exceptional vistas.
          </p>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
