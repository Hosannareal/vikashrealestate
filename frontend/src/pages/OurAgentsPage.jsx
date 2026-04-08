import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentCard from '../components/AgentCard';
import ContactAgentModal from '../components/ContactAgentModal';
import CustomDropdown from '../components/ui/CustomDropdown';
import { mockAgents } from '../data/mockAgents';

const OurAgentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    plotSize: '',
    priceRange: '',
    listingType: '',
    agentName: '',
  });

  // Filter options
  const locationOptions = ['Any Location', 'Jaipur', 'Delhi NCR', 'Gurgaon', 'Noida', 'Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];
  const propertyTypeOptions = ['Any Type', 'Residential Plots', 'Commercial Land', 'Farm Land', 'Industrial Land', 'Investment Plots'];
  const plotSizeOptions = ['Any Size', '< 100 sq yd', '100–500 sq yd', '500–1000 sq yd', '1000+ sq yd'];
  const priceRangeOptions = ['Any Price', 'Under 10L', '10L–50L', '50L–1Cr', '1Cr+'];
  const listingTypeOptions = ['Any Listing', 'For Sale', 'For Investment', 'New Launch'];

  // Filter agents
  const filteredAgents = useMemo(() => {
    return mockAgents.filter((agent) => {
      const matchLocation = !filters.location || filters.location === 'Any Location' || agent.serviceAreas.includes(filters.location);
      const matchType = !filters.propertyType || filters.propertyType === 'Any Type' || agent.specialties.includes(filters.propertyType);
      const matchName =
        !filters.agentName ||
        agent.name.toLowerCase().includes(filters.agentName.toLowerCase());

      // Simplified logic for purely UI matching right now for demonstration
      // We assume plotSize, priceRange, listingType might apply broadly or would filter listings actually
      return matchLocation && matchType && matchName;
    });
  }, [filters]);

  const handleEmailClick = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === 'Any Location' || value === 'Any Type' || value === 'Any Size' || value === 'Any Price' || value === 'Any Listing' ? '' : value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      propertyType: '',
      plotSize: '',
      priceRange: '',
      listingType: '',
      agentName: '',
    });
  };

  return (
    <div className="w-full bg-[#f8f6f2] min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:px-12 bg-gradient-to-b from-[#f8f6f2] to-[#f8f6f2]">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[3.5rem] md:text-[4.5rem] font-serif text-[#111111] mb-2 tracking-tight">
              OUR AGENTS
            </h1>
            <div className="w-16 h-px bg-[#C6A769] mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
              Meet our experienced land and plot specialists dedicated to finding your perfect piece of earth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white rounded-xl border border-[#e5e0d8] p-6 shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[13px] uppercase tracking-wider font-semibold text-[#111111]">
                FILTER EXPERTS
              </h3>
              {Object.values(filters).some((v) => v) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[12px] uppercase tracking-wider font-semibold text-[#C6A769] hover:text-[#B39659] transition"
                >
                  Reset Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 xl:gap-6 items-end">
              {/* Row 1 */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2">
                  Location
                </label>
                <CustomDropdown
                  label="Any Location"
                  options={locationOptions}
                  value={filters.location}
                  onChange={(val) => handleFilterChange('location', val)}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2">
                  Property Type
                </label>
                <CustomDropdown
                  label="Any Type"
                  options={propertyTypeOptions}
                  value={filters.propertyType}
                  onChange={(val) => handleFilterChange('propertyType', val)}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2">
                  Plot Size
                </label>
                <CustomDropdown
                  label="Any Size"
                  options={plotSizeOptions}
                  value={filters.plotSize}
                  onChange={(val) => handleFilterChange('plotSize', val)}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2">
                  Price Range
                </label>
                <CustomDropdown
                  label="Any Price"
                  options={priceRangeOptions}
                  value={filters.priceRange}
                  onChange={(val) => handleFilterChange('priceRange', val)}
                />
              </div>

              {/* Row 2 */}
              <div className="lg:col-span-2 xl:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2">
                  Listing Type
                </label>
                <CustomDropdown
                  label="Any Listing"
                  options={listingTypeOptions}
                  value={filters.listingType}
                  onChange={(val) => handleFilterChange('listingType', val)}
                />
              </div>

              <div className="lg:col-span-2 xl:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  placeholder="Search by agent name..."
                  value={filters.agentName}
                  onChange={(e) => handleFilterChange('agentName', e.target.value)}
                  className="w-full px-4 py-[9px] border border-[#e5e0d8] rounded-lg bg-[#f8f6f2] text-[#111111] text-sm focus:outline-none focus:border-[#C6A769] focus:bg-white focus:ring-1 focus:ring-[#C6A769] transition shadow-sm h-[42px]"
                />
              </div>
            </div>
          </motion.div>

          {/* Agents Grid */}
          <AnimatePresence mode="wait">
            {filteredAgents.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-[13px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-8">
                  Showing {filteredAgents.length} Agent{filteredAgents.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 align-items-stretch">
                  {filteredAgents.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onEmailClick={handleEmailClick}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white rounded-xl border border-[#e5e0d8] shadow-sm"
              >
                <h3 className="text-xl font-serif text-[#111111] mb-2">No agents found</h3>
                <p className="text-[#6B6B6B] mb-6">
                  Try adjusting your filters to find suitable agents.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 bg-[#C6A769] text-white rounded-lg text-sm uppercase tracking-wider font-semibold hover:bg-[#a8874f] transition shadow-md"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactAgentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAgent(null);
        }}
        agent={selectedAgent}
        onSubmit={(formData) => {
          console.log('Form submitted:', formData);
          // API call would go here
        }}
      />
    </div>
  );
};

export default OurAgentsPage;
