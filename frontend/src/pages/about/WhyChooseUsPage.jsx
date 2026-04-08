import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Building, Award, Target, Users, BookOpen } from 'lucide-react';
import PageHero from '../../components/shared/PageHero';
import SectionWrapper from '../../components/shared/SectionWrapper';
import ContactSidebar from '../../components/shared/ContactSidebar';
import RecommendedSection from '../../components/shared/RecommendedSection';

const WhyChooseUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full min-h-screen bg-white">
      <PageHero
        title="Why Choose Us"
        subtitle="Unparalleled Expertise in Luxury Real Estate"
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 space-y-16 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-[42px] font-serif text-[#111] mb-8 leading-[1.2]">
                Elevating the Standard of Luxury Real Estate Representation.
              </h2>
              <p className="text-[17px] text-[#4a4a4a] font-sans leading-[1.8] first-line:tracking-widest first-letter:text-5xl first-letter:font-bold first-letter:text-[#111] first-letter:mr-3 first-letter:float-left">
                Choosing the right representation is the most critical decision in acquiring or selling a luxury home. Our firm is built on the unwavering principles of integrity, deep market analysis, and a relentless commitment to our clients' unique goals. Over the past decade, we have facilitated some of the most significant residential transactions in Boston, establishing our reputation as the preferred partners for discerning individuals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/images/homebanner.jpg" 
                alt="Luxury real estate team"
                className="w-full h-[500px] object-cover"
              />
              <p className="text-[13px] text-[#888] font-sans mt-3 text-right italic">Our headquarters overlooking the Boston Public Garden</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-[#111] text-white p-12 lg:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
            >
              <div>
                <span className="block text-[42px] font-serif text-[#c6a87d] mb-2">$5B+</span>
                <span className="text-[13px] uppercase tracking-widest font-sans text-gray-400">Career Sales</span>
              </div>
              <div>
                <span className="block text-[42px] font-serif text-[#c6a87d] mb-2">#1</span>
                <span className="text-[13px] uppercase tracking-widest font-sans text-gray-400">Boutique Agency</span>  
              </div>
              <div>
                <span className="block text-[42px] font-serif text-[#c6a87d] mb-2">98%</span>
                <span className="text-[13px] uppercase tracking-widest font-sans text-gray-400">Client Retention</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-2xl font-serif text-[#111] mb-6 flex items-center gap-4">
                  <Shield size={24} className="text-[#c6a87d]" strokeWidth={1.5} />
                  Discretion & Confidentality
                </h3>
                <p className="text-[16px] text-[#4a4a4a] font-sans leading-relaxed mb-6">
                  In the upper echelons of the real estate market, privacy is paramount. We represent high-net-worth individuals, executives, and public figures with absolute discretion. Our off-market network allows us to transact quietly and securely, protecting our clients' interests at every juncture.
                </p>
                <ul className="space-y-4 font-sans text-[15px] text-[#4a4a4a]">
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6a87d] mt-2 shrink-0"></span>
                    <span>Exclusive access to private, unlisted "whisper" properties.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6a87d] mt-2 shrink-0"></span>
                    <span>NDAs administered as standard practice for high-profile acquisitions.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6a87d] mt-2 shrink-0"></span>
                    <span>Secure digital environments for financial document review.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#111] mb-6 flex items-center gap-4">
                  <BookOpen size={24} className="text-[#c6a87d]" strokeWidth={1.5} />
                  Data-Driven Valuation
                </h3>
                <p className="text-[16px] text-[#4a4a4a] font-sans leading-relaxed">
                  We don't guess; we analyze. Our internal research team monitors micro-market trends down to the street level. By combining historical data, current market velocity, and future development projections, we provide our clients with a precise financial framework that guarantees optimal pricing strategies—whether acquiring or divesting assets.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-[#111] mb-6 flex items-center gap-4">
                  <Award size={24} className="text-[#c6a87d]" strokeWidth={1.5} />
                  White-Glove Service Delivery
                </h3>
                <p className="text-[16px] text-[#4a4a4a] font-sans leading-relaxed">
                  To provide our signature level of service, we intentionally limit the number of active clients we take on. This ensures that every listing receives the bespoke marketing it deserves, and every search gets the tireless dedication required to uncover the perfect property. 
                </p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 relative">
            <ContactSidebar />
          </div>
        </div>
      </SectionWrapper>
      
      <RecommendedSection />
    </main>
  );
};

export default WhyChooseUsPage;
