import React from 'react';
import { motion } from 'framer-motion';

const PageHero = ({ title, subtitle, image }) => {
  return (
    <section className="relative w-full h-[45vh] min-h-[350px] flex items-center justify-center bg-[#111111] overflow-hidden pt-24">
      {image ? (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#111111]" />
      )}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-wide mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C8A96A] text-sm md:text-base uppercase tracking-[0.2em] font-medium"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;