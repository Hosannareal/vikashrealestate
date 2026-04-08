import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const HeroCarousel = () => {
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: '/assets/images/property-1.jpg', // Placeholder, uses Unsplash if missing
      fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80'
    },
    {
      id: 2,
      image: '/assets/images/property-2.jpg',
      fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80'
    },
    {
      id: 3,
      image: '/assets/images/property-3.jpg',
      fallback: 'https://images.unsplash.com/photo-1600573472550-d08e4c9cd6bc?auto=format&fit=crop&w=1920&q=80'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Autoplay carousel
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 500);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 500);
  };

  // Image load error handler for fallback
  const handleImageError = (e, fallbackUrl) => {
    e.target.src = fallbackUrl;
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-black">
      {/* 1. FULL WIDTH BACKGROUND IMAGE (carousel) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ 
            opacity: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'linear' } // Slow zoom effect
          }}
          className="absolute inset-0"
        >
          <img 
             src={slides[currentIndex].fallback} // using fallback directly for reliability based on user context
             alt="Luxury Real Estate"
             className="w-full h-full object-cover"
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-12 flex flex-col md:flex-row justify-between items-end md:items-center">
        
        {/* 2. LEFT SIDE: Text Block */}
        <div className="w-full md:max-w-2xl flex flex-col justify-center h-full mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#C6A769]"></div>
              <span className="text-xs md:text-sm tracking-[0.25em] font-medium text-[#C6A769] uppercase">
                Premium Land Investments
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl xl:text-6xl font-serif text-white leading-[0.9] mb-8 drop-shadow-lg">
              Own the Ground
              <br />
              Beneath Your
              <br />
              Dreams
            </h1>

            {/* <p className="text-base md:text-lg text-white/85 max-w-lg mb-12 font-light leading-relaxed">
              Discover premium plots in high-growth locations with verified ownership and future-ready value. Secure land today. Build your legacy tomorrow.
            </p> */}

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <button
                onClick={() => navigate('/plots')}
                className="px-10 py-4 bg-[#C6A769] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B8955F] transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
              >
                Explore Plots
              </button>
              <button
                onClick={() => navigate('/request-site-visit')}
                className="px-10 py-4 bg-transparent border-2 border-white text-white text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                Request Site Visit
              </button>
            </div>
          </motion.div>
        </div>

        {/* 3. RIGHT SIDE (BOTTOM-END ALIGN): Search Bar Component */}
        <div className="w-full md:w-auto mt-auto md:mt-0 flex justify-end self-end z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-[700px]"
          >
            {/* The existing SearchBar component logic, but we need to inject our own wrapper for styling */}
            {/* <div className="bg-white/95   backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8">
              <p className="text-[#111111] font-serif text-xl mb-4">Search Luxury Real Estate</p>
              
              <div className="space-y-4">
                 <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#666] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, Address, Neighborhood..."
                    className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:border-[#C6A769] transition-colors text-sm text-[#111] placeholder-[#999]"
                  />
                </div>

                 <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#666] mb-1">
                      Property Type
                    </label>
                    <select className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:border-[#C6A769] transition-colors text-sm text-[#111] appearance-none cursor-pointer">
                      <option>All Residential</option>
                      <option>Villa / House</option>
                      <option>Apartment</option>
                      <option>Land / Plot</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#666] mb-1">
                      Budget
                    </label>
                    <select className="w-full px-4 py-3 bg-[#F5F5F5] border border-transparent rounded-lg focus:outline-none focus:border-[#C6A769] transition-colors text-sm text-[#111] appearance-none cursor-pointer">
                      <option>Any Price</option>
                      <option>Up to 5 Cr</option>
                      <option>5 Cr - 10 Cr</option>
                      <option>10+ Cr</option>
                    </select>
                  </div>
                </div>

                 <button className="w-full mt-2 py-3.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#C6A769] transition-colors flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  Search Properties
                </button>
              </div>
            </div>  */}
                    {/* <LandSearchBar />   */}


          </motion.div>
        </div>

      </div>

      {/* 4. CENTER: Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between px-4 md:px-8 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto group w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} className="text-white opacity-80 group-hover:opacity-100" />
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto group w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight size={24} className="text-white opacity-80 group-hover:opacity-100" />
        </button>
      </div>

    </section>
  );
};

export default HeroCarousel;