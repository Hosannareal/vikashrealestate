import React, { useState } from 'react';
import { Search } from 'lucide-react';

const RecommendedSearches = () => {
  const [activeTab, setActiveTab] = useState('cities');

  const searchData = {
    cities: [
      { title: 'Mumbai Apartments', icon: '??' },
      { title: 'Delhi Villas', icon: '??' },
      { title: 'Bangalore Tech Parks', icon: '???' },
      { title: 'Pune Luxury Homes', icon: '?' },
      { title: 'Chennai Waterfront', icon: '??' },
      { title: 'Hyderabad Commercial', icon: '???' },
      { title: 'Goa Beachfront', icon: '???' },
      { title: 'Jaipur Heritage', icon: '??' },
      { title: 'Ahmedabad Industrial', icon: '??' },
    ],
    upcomingProjects: [
      { title: 'Lakeside Residences', icon: '??' },
      { title: 'Green Valley Tower', icon: '??' },
      { title: 'Urban Horizon', icon: '??' },
      { title: 'Riverside Villas', icon: '??' },
      { title: 'Tech Hub 2026', icon: '??' },
      { title: 'Smart Living Phase 2', icon: '??' },
      { title: 'Eco Reserve', icon: '??' },
      { title: 'Metropolitan Plaza', icon: '??' },
      { title: 'Eden Gardens', icon: '??' },
    ],
    newlyLaunched: [
      { title: 'Prestige Towers', icon: '??' },
      { title: 'Luxe Residences', icon: '??' },
      { title: 'Sky Gardens', icon: '??' },
      { title: 'Premium Plaza', icon: '??' },
      { title: 'Elite Homes', icon: '??' },
      { title: 'Modern Spaces', icon: '??' },
      { title: 'Golden Heights', icon: '?' },
      { title: 'Diamond Villas', icon: '??' },
      { title: 'Heritage Plus', icon: '???' },
    ],
  };

  const tabs = [
    { id: 'cities', label: 'Cities' },
    { id: 'upcomingProjects', label: 'Upcoming Projects' },
    { id: 'newlyLaunched', label: 'Newly Launched' },
  ];

  const currentData = searchData[activeTab];

  return (
    <section className="section section-dark border-t border-[var(--primary)]/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight mb-4">
            Recommended Searches
          </h2>
          <p className="text-[#a0a0a0] text-lg font-light">
            Explore popular properties and projects across regions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-8 mb-12 border-b border-[#333]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 text-sm md:text-base font-medium uppercase tracking-wider transition-all duration-300 ${activeTab === tab.id ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' : 'text-[#666] hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid of Search Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
          {currentData.map((item, index) => (
            <div
              key={index}
              className="group relative p-6 border border-[#333] rounded-sm bg-[#111] hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[var(--primary)]"
            >
              {/* Icon */}
              <div className="text-3xl mb-3 grayscale group-hover:grayscale-0 transition-all">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium text-[#ccc] mb-4 group-hover:text-[var(--primary)] transition-colors">
                {item.title}
              </h3>

              {/* Search Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Search className="w-5 h-5 text-[var(--primary)]" />
              </div>

              {/* Bottom Border Effect on Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 flex flex-col items-center">
          <p className="text-[#a0a0a0] mb-6 font-light">
            Didn't find what you're looking for?
          </p>
          <a
            href="/plots"
            className="text-white border border-[var(--primary)] px-8 py-3 uppercase text-xs tracking-widest hover:bg-[var(--primary)] transition-all font-semibold"
          >
            View All Listings
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSearches;
