import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plots = [
  { id: 1, title: 'Upcoming Premium Plots', subtitle: 'Invest early in high-growth zones.', img: '/assets/images/property-1.png' },
  { id: 2, title: 'Riverside Enclave', subtitle: 'Serene locations for your dream home.', img: '/assets/images/property-5.png' },
  { id: 3, title: 'Valley Views', subtitle: 'Plots surrounded by nature.', img: '/assets/images/property-4.png' }
];

const InspirationSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideRight = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % plots.length);
  };

  const slideLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + plots.length) % plots.length);
  };

  const getVisibleImages = () => {
     let images = [];
     for(let i=0; i<3; i++) {
        images.push(plots[(currentIndex + i) % plots.length]);
     }
     return images;
  };

  const visiblePlots = getVisibleImages();

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: -9,
      scale: 0.9,
    }),
    center: {
      zIndex: 11,
      x: 0,
      opacity: 10,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: -9,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="section section-soft overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Text Details */}
        <div className="lg:w-1/3 z-20">
             <AnimatePresence mode="wait">
                 <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                 >
                    <h2 className="text-4xl md:text-5xl font-serif text-black uppercase tracking-tight mb-4">
                      {plots[currentIndex].title}
                    </h2>
                    <p className="text-[#a0a0a0] mb-8 font-light text-lg">
                      {plots[currentIndex].subtitle}
                    </p>
                    
                    <div className="flex gap-4">
                      <button
                        onClick={() => navigate('/plots?view=map&sort=newly-launched&status=newly-launched')}
                        className="bg-[var(--primary)] text-white px-6 py-3 uppercase text-xs tracking-widest hover:bg-[#b09355] transition-all font-semibold"
                      >
                            View Details
                        </button>
                      <button
                        onClick={() => navigate('/advance-booking')}
                        className="text-black border border-black/30 px-6 py-3 uppercase text-xs tracking-widest hover:bg-black/10 transition-all font-semibold"
                      >
                            Advance Booking
                        </button>
                    </div>
                 </motion.div>
             </AnimatePresence>

             <div className="flex gap-4 mt-12">
               <button onClick={slideLeft} className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-black hover:bg-black/10 transition-all">
                  <ChevronLeft size={20} />
               </button>
               <button onClick={slideRight} className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-black hover:bg-black/10 transition-all">
                  <ChevronRight size={20} />
               </button>
             </div>
        </div>

        {/* Right Side: Image Slider Stack */}
        <div className="lg:w-2/4 relative h-[350px] md:h-[450px] w-full mt-12 lg:mt-0 flex justify-end">
            
            <AnimatePresence custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.4 }
                    }}
                    className="absolute w-[80%] h-[80%] lg:w-[60%] lg:h-full right-0 z-30"
                >
                    <img src={visiblePlots[0].img} alt="Main Block" className="w-full h-full object-cover shadow-2xl" />
                </motion.div>
            </AnimatePresence>
            
            {/* Background next image (preview) */}
            <div className="absolute w-[60%] h-[80%] lg:w-[45%] lg:h-[80%] right-[-10%] top-[10%] opacity-40 grayscale z-10 pointer-events-none hidden md:block">
               <img src={visiblePlots[1]?.img} alt="Next Block" className="w-full h-full object-cover" />
            </div>

            {/* Background prev image (preview) */}
            <div className="absolute w-[40%] h-[60%] left-[10%] bottom-[10%] opacity-20 z-10 grayscale pointer-events-none hidden md:block">
               <img src={visiblePlots[2]?.img} alt="Prev Block" className="w-full h-full object-cover" />
            </div>

        </div>

      </div>
    </section>
  );
};

export default InspirationSlider;
