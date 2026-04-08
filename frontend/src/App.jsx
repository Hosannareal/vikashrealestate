import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ListingPage from "./pages/ListingPage";
import AdminListingPage from "./pages/AdminListingPage";
import PlotDetail from "./pages/PlotDetail";
import OurAgentsPage from "./pages/OurAgentsPage";
import AgentDetailPage from "./pages/AgentDetailPage";
import AdminAgentsPage from "./pages/admin/AdminAgentsPage";
import Header from "./components/Navigation/Header";
import Footer from "./components/Footer";
import PlotResalePage from "./pages/services/PlotResalePage";
import CMARequestPage from "./pages/services/CMARequestPage";
import SiteVisitRequestPage from "./pages/SiteVisitRequestPage";
import ContactUsPage from "./pages/ContactUsPage";
import RegisterPage from "./pages/RegisterPage";
import ValuationPage from "./pages/ValuationPage";
import AdvanceBookingPage from "./pages/AdvanceBookingPage";
import SellPage from "./pages/SellPage";
import AboutUsPage from "./pages/about/AboutUsPage";
import OurStoryPage from "./pages/about/OurStoryPage";
import WhyChooseUsPage from "./pages/about/WhyChooseUsPage";
import TestimonialsPage from "./pages/about/TestimonialsPage";
import LocationPage from "./pages/about/LocationPage";

function AppContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Smooth scroll to top on navigation
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  return (
    <main className="w-full relative min-h-screen bg-gray-50">
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 pointer-events-none ${isDropdownOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0"}`}
      />

      {!isAdminRoute && <Header variant={location.pathname === '/' ? 'hero' : 'default'} />}

      <Routes>
        <Route path="/" element={<Home isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/plots" element={<ListingPage type="plots" />} />
        <Route path="/rent" element={<ListingPage type="rent" />} />
        <Route path="/admin/plots" element={<AdminListingPage />} />
        <Route path="/plot/:id" element={<PlotDetail />} />
        <Route path="/plots/:id" element={<PlotDetail />} />
        <Route path="/agents" element={<OurAgentsPage />} />
        <Route path="/agents/:id" element={<AgentDetailPage />} />
        <Route path="/admin/agents" element={<AdminAgentsPage />} />
        
        {/* Services */}
        <Route path="/services/plot-resale" element={<PlotResalePage />} />
        <Route path="/resale" element={<PlotResalePage />} />
        <Route path="/services/plot-resale/request-cma" element={<CMARequestPage />} />
        <Route path="/services/schedule-visit" element={<SiteVisitRequestPage />} />
        <Route path="/request-site-visit" element={<SiteVisitRequestPage />} />
        <Route path="/valuation" element={<ValuationPage />} />
        <Route path="/advance-booking" element={<AdvanceBookingPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* About & Brand */}
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/location" element={<LocationPage />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

