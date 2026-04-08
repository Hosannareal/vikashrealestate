import React, { useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import PropertyStatsSection from '../components/PropertyStatsSection';
import InfoCategorySection from '../components/home/InfoCategorySection';
import NewlyLaunchedProjects from '../components/home/NewlyLaunchedProjects';
import UpcomingProjectSection from '../components/home/UpcomingProjectSection';
import ExploreLandSection from '../components/home/ExploreLandSection';
import SellPropertyCTA from '../components/home/SellPropertyCTA';
import ExploreByCities from '../components/home/ExploreByCities';
import LuxuryExploreGrid from '../components/home/LuxuryExploreGrid';
import ComingSoonSection from '../components/home/ComingSoonSection';
import LandPlotSection from '../components/home/LandPlotSection';
import CityConnectionSection from '../components/home/CityConnectionSection';
import InspirationSlider from '../components/home/InspirationSlider';
import TestimonialSection from '../components/home/TestimonialSection';
import CollectionGrid from '../components/home/CollectionGrid';
import LandSearchBar from '../components/LandSearchBar';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import RecommendedSearches from '../components/RecommendedSearches';

const Home = ({ isDropdownOpen, setIsDropdownOpen }) => {
  return (
    <>
      <HeroCarousel />

      {/*
        This is a dedicated Land Search Bar to demonstrate the requested feature.
        It can be placed right below the Hero or inside a specific Tab.
      */}
      <div className="relative z-30 -translate-y-6 md:-translate-y-10 px-4">
        {/* <LandSearchBar />   */}
      </div>

      {/* Luxury Sections */}
      <InfoCategorySection />
      <div className="section-divider" />
      <WhyChooseUsSection />
      <div className="section-divider" />
      <NewlyLaunchedProjects />
      <div className="section-divider" />
      <ComingSoonSection />
      <div className="section-divider" />
      <InspirationSlider />
      <div className="section-divider" />
      
      <ExploreByCities />
      <div className="section-divider" />
      <CollectionGrid />
      <TestimonialSection />
      
      <RecommendedSearches />
    </>
  );
};

export default Home;
