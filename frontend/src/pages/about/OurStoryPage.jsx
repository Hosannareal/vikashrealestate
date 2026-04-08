import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/shared/PageHero';
import SectionWrapper from '../../components/shared/SectionWrapper';
import ContactCard from '../../components/shared/ContactCard';

const milestones = [
  {
    year: '2007',
    title: 'The Beginning',
    description: 'Campion and Company was founded with a singular vision: to provide unparalleled service in the luxury real estate market in Boston. From a small office in Back Bay, we began setting new standards for client representation.'
  },
  {
    year: '2012',
    title: 'Market Leadership',
    description: 'Within five years, we achieved the position of the number one real estate office in Boston, a testament to our dedication to our clients and our deep understanding of the luxury market mechanics.'
  },
  {
    year: '2015',
    title: 'Pioneering New Developments',
    description: 'We were selected to represent some of the most ambitious and exclusive new development projects in the city, reshaping the skyline and the standard of luxury living.'
  },
  {
    year: '2020',
    title: 'Record-Breaking Sales',
    description: 'Despite global challenges, we orchestrated multiple record-breaking sales across Back Bay and Beacon Hill, demonstrating the resilience of our market approach and the trust our clients place in us.'
  },
  {
    year: '2025',
    title: 'Expanding Our Heritage',
    description: 'Today, we continue to lead the Boston luxury real estate market with over $10 billion in career sales. We remain an independent, boutique firm dedicated exclusively to the highest echelon of the market.'
  }
];

const OurStoryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#F9F7F4]">
      <PageHero 
        title="Our Story" 
        subtitle="A Legacy of Luxury Real Estate"
      />
      
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-4xl font-serif text-[#111111] mb-12 text-center">
              The Journey of Excellence
            </h2>
            
            {/* Timeline */}
            <div className="relative border-l border-[#C8A96A]/30 ml-4 md:ml-6 space-y-12 pb-8">
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute w-4 h-4 rounded-full bg-[#C8A96A] -left-[9px] top-1.5 shadow-[0_0_0_4px_#F9F7F4]" />
                  
                  <span className="text-[#C8A96A] text-sm font-bold tracking-widest uppercase mb-2 block object-left">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-serif text-[#111111] mb-3">
                    {milestone.title}
                  </h3>
                  <p className="text-[16px] text-[#4A4A4A] font-sans leading-relaxed">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Img Block */}
            <div className="mt-16 mb-8 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Architecture"
                className="w-full h-80 object-cover object-center"
              />
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Interior Design"
                className="w-full h-80 object-cover object-center"
              />
            </div>
          </div>
          
          <div className="lg:col-span-4 relative">
            <ContactCard />
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
};

export default OurStoryPage;