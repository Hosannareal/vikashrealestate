import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ListingCardForAgent from './ListingCardForAgent';

const AgentListings = ({ agent, listings }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Filter listings by status
  const filteredListings = useMemo(() => {
    const agentListings = listings.filter((l) => l.agentId === agent.id);

    switch (activeTab) {
      case 'sold':
        return agentListings.filter((l) => l.status === 'sold');
      case 'active':
        return agentListings.filter((l) => l.status === 'active');
      case 'land':
        return agentListings.filter((l) => l.type === 'Land' || l.type === 'Plot');
      default:
        return agentListings;
    }
  }, [activeTab, agent.id, listings]);

  const tabs = [
    { id: 'all', label: 'All', count: listings.filter((l) => l.agentId === agent.id).length },
    { id: 'sold', label: 'Sold', count: listings.filter((l) => l.agentId === agent.id && l.status === 'sold').length },
    { id: 'active', label: 'Active', count: listings.filter((l) => l.agentId === agent.id && l.status === 'active').length },
    { id: 'land', label: 'Land / Plots', count: listings.filter((l) => l.agentId === agent.id && (l.type === 'Land' || l.type === 'Plot')).length },
  ];

  return (
    <section className="py-12 px-6 md:px-12 bg-white border-t border-[#e5e0d8]">
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-[2.5rem] md:text-[3rem] font-serif text-[#111111] mb-2">
            {agent.name}'s Listings
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-[#C6A769]"></div>
            <span className="text-[13px] uppercase tracking-wider text-[#6B6B6B] font-semibold">
              Total: {listings.filter((l) => l.agentId === agent.id).length}
            </span>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8 border-b border-[#e5e0d8] pb-4"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-[12px] uppercase tracking-wider font-semibold transition-all relative group ${
                activeTab === tab.id
                  ? 'text-[#C6A769]'
                  : 'text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {tab.label}
              <span className="text-[11px] ml-2 text-[#999]">({tab.count})</span>
              {/* Underline animation */}
              <motion.div
                layoutId="underline"
                className={`absolute -bottom-4 left-0 right-0 h-[2px] bg-[#C6A769] ${
                  activeTab === tab.id ? 'block' : 'hidden'
                }`}
              />
            </button>
          ))}
        </motion.div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {filteredListings.map((listing) => (
              <ListingCardForAgent key={listing.id} listing={listing} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-[#f8f6f2] rounded-lg"
          >
            <p className="text-[#6B6B6B] text-lg">
              No listings in this category at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AgentListings;
