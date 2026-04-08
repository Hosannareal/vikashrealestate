import React, { useEffect } from 'react';
import PageHero from '../../components/shared/PageHero';
import SectionWrapper from '../../components/shared/SectionWrapper';
import ContactCard from '../../components/shared/ContactCard';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#F9F7F4]">
      <PageHero 
        title="About Campion and Company" 
        subtitle="Exclusive Luxury Real Estate"
      />
      
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-4xl font-serif text-[#111111] mb-8 leading-tight">
              Boston's Premier Luxury Real Estate Brokerage
            </h2>
            
            <div className="space-y-6 text-[16px] text-[#4A4A4A] font-sans leading-relaxed">
              <p>
                Founded in 2007, Campion and Company has established itself as the preeminent luxury real estate firm in Boston, orchestrating the most significant sales in the city's history. Our boutique firm provides an unparalleled level of service and marketing expertise to our exclusive clientele.
              </p>
              
              <div className="my-10">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Luxury real estate interior"
                  className="w-full h-auto object-cover object-center shadow-lg"
                />
              </div>
              
              <h3 className="text-2xl font-serif text-[#111111] mt-10 mb-4">A Legacy of Excellence</h3>
              <p>
                Over the past decade, we have consistently ranked as the number one real estate office in Boston. We specialize in the city's most desirable neighborhoods, including Back Bay, Beacon Hill, the South End, Waterfront, and Midtown. We represent buyers and sellers of historic townhouses, luxury condominiums, and new development projects.
              </p>
              
              <p>
                As the leading real estate brokerage in Boston, we have successfully represented developers of the city's most prestigious properties, including The Residences at the Mandarin Oriental, Millennium Tower, and One Dalton. Our deep understanding of the market, combined with our extensive network, allows us to provide discrete and effective representation for both buyers and sellers of the finest homes in the region.
              </p>
              
              <p>
                Register on the site to save your favorite listings and to receive email notifications when similar listings come to market. Our team is dedicated to helping you navigate the complexities of the luxury real estate market with insight, discretion, and a highly personalized approach to your unique needs.
              </p>
            </div>
          </div>
          
          {/* Right Sidebar - Contact Form */}
          <div className="lg:col-span-4 relative">
            <ContactCard />
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
};

export default AboutUsPage;