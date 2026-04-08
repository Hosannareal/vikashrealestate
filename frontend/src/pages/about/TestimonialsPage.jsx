import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import PageHero from '../../components/shared/PageHero';
import SectionWrapper from '../../components/shared/SectionWrapper';
import RecommendedSection from '../../components/shared/RecommendedSection';

const testimonialsData = [
  {
    quote: "The level of service provided was absolutely exceptional. They handled the sale of our historic Beacon Hill townhouse with extraordinary discretion and brought us a qualified buyer within weeks. Their market knowledge is truly unmatched.",
    name: "Eleanor & Richard T.",
    location: "Beacon Hill Seller",
    type: "Sale: $4.2M"
  },
  {
    quote: "Relocating from London to Boston was a daunting prospect, but the team made the transition seamless. They didn't just find us a beautiful penthouse; they introduced us to the neighborhood and handled every detail of the closing.",
    name: "Marcus H.",
    location: "Back Bay Buyer",
    type: "Acquisition: $2.8M"
  },
  {
    quote: "I have worked with many luxury brokers over the years, but none possess the strategic acumen of this firm. Their pricing strategy for our new development project resulted in record-breaking price-per-square-foot sales.",        
    name: "David S.",
    location: "Developer",
    type: "Development Sales"
  },
  {
    quote: "Professionalism, profound market insight, and absolute dedication. They listened to exactly what we wanted and curated a selection of off-market properties that perfectly matched our criteria.",
    name: "Sarah M.",
    location: "South End Buyer",
    type: "Acquisition: $1.9M"
  },
  {
    quote: "From staging advice to the final negotiations, every step was handled with white-glove precision. They understand the nuances of the high-end market better than anyone else in the city.",
    name: "James L.",
    location: "Seaport Seller",
    type: "Sale: $3.5M"
  },
  {
    quote: "Our family estate required a complex, multi-party negotiation that took months. The patience, tact, and unyielding advocacy we experienced from our broker ensured an outcome that exceeded our family's expectations.",
    name: "The Wentworth Family",
    location: "Brookline Seller",
    type: "Estate Planning Sale"
  },
  {
    quote: "As foreign investors, we rely heavily on local expertise to guide our acquisitions. Their data-driven approach allowed us to identify an emerging sub-market and secure a property that has since appreciated significantly.",
    name: "Arun V.",
    location: "International Investor",
    type: "Investment Portfolio"
  },
  {
    quote: "When competing in a multi-offer situation on a prime property, our broker's reputation with other agents in the city proved to be the deciding factor. The seller chose our offer because they knew our team would close.",
    name: "Emily R.",
    location: "Charlestown Buyer",
    type: "Acquisition: $1.4M"
  },
  {
    quote: "They made what is traditionally a stressful process feel effortless. The bespoke marketing campaign they designed for our waterfront home attracted global attention and secured a buyer in record time.",
    name: "Michael & Clara P.",
    location: "Waterfront Seller",
    type: "Sale: $5.1M"
  }
];

const ITEMS_PER_PAGE = 6;

const TestimonialCard = ({ quote, name, location, type, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="bg-[#f8f6f2] p-10 md:p-12 relative flex flex-col h-full"
  >
    <Quote size={48} className="text-[#e8e4db] absolute top-8 right-8" strokeWidth={1} />
    
    <div className="flex gap-1.5 mb-8 text-[#111]">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
    
    <p className="text-[17px] text-[#2a2a2a] font-serif leading-relaxed italic mb-10 flex-grow relative z-10">
      "{quote}"
    </p>

    <div className="pt-6 border-t border-[#e8e4db] mt-auto">
      <h4 className="text-[14px] font-bold text-[#111] uppercase tracking-[0.1em] mb-1">{name}</h4>
      <div className="flex items-center gap-3 text-[13px] text-[#6b6b6b] font-sans">
        <span>{location}</span>
        <span className="w-1 h-1 rounded-full bg-[#c6a87d]"></span>
        <span className="text-[#c6a87d]">{type}</span>
      </div>
    </div>
  </motion.div>
);

const TestimonialsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(testimonialsData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const currentTestimonials = testimonialsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="w-full min-h-screen bg-white">
      <section className="relative pt-32 pb-24 bg-[#111] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#c6a87d] text-[13px] uppercase tracking-[0.2em] font-medium mb-6">
              Client Relationships
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-8 leading-tight">
              Voices of our Success
            </h1>
            <p className="text-gray-400 font-sans text-lg max-w-2xl mx-auto leading-relaxed">
              We measure our achievements not by the number of transactions, but by the satisfaction of our distinguished clientele. Discover their experiences working with our firm.
            </p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent bottom-0 h-1/2 pointer-events-none" />
      </section>

      <SectionWrapper className="bg-white py-24">
        <div className="min-h-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto"
            >
              {currentTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={`${currentPage}-${index}`} 
                  index={index} 
                  {...testimonial} 
                />  
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-6 mt-20 pt-10 border-t border-[#f0ede5]">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
                currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed border border-gray-100' 
                  : 'text-[#111] border border-[#111] hover:bg-[#111] hover:text-white'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-[14px] font-sans text-[#4a4a4a] tracking-widest uppercase">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
                currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed border border-gray-100' 
                  : 'text-[#111] border border-[#111] hover:bg-[#111] hover:text-white'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </SectionWrapper>
      
      <RecommendedSection />
    </main>
  );
};

export default TestimonialsPage;
