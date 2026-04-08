import React from 'react';

const SectionWrapper = ({ children, className = '', bg = 'bg-[#F9F7F4]' }) => {
  return (
    <section className={`w-full py-16 md:py-24 ${bg} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;