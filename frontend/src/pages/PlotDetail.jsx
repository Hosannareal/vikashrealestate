import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { ArrowLeft, MapPin, Heart, Share2, Printer, Mail, Maximize, ChevronLeft, ChevronRight, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockLandProperties } from '../data/mockLand';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E9E4DC] rounded-xl overflow-hidden mb-4 bg-white shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-[#FDFCFB] hover:bg-[#F5F1EB] transition-colors"
      >
        <h3 className="font-serif text-[18px] text-[#111]">{title}</h3>
        <ChevronDown className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 border-t border-[#E9E4DC] text-[15px] leading-relaxed text-[#444]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PlotDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [directionStart, setDirectionStart] = useState('');

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem("plots");
    let allPlots = [];
    if (saved) {
      try {
        allPlots = JSON.parse(saved);
      } catch (e) {
        allPlots = [];
      }
    }
    
    // 2. Fallback to mock data if empty
    if (!allPlots || allPlots.length === 0) {
      allPlots = mockLandProperties;
    }

    const found = allPlots.find(p => String(p.id) === id);
    setPlot(found);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">Loading...</div>;
  }

  if (!plot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCFB] text-center px-4">
        <h1 className="text-4xl font-serif text-[#111] mb-4">Property Not Found</h1>
        <p className="text-[#6B6B6B] mb-8">The plot you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/plots')} className="px-6 py-3 bg-[#111] text-white rounded hover:bg-[#C6A769] transition">
          Return to Listings
        </button>
      </div>
    );
  }

  // Formatting helpers
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(price);
  };

  // Mock robust images array since many plots only have 1 imageUrl
  const images = [...(plot.images || [])];
  if (images.length === 0 && plot.imageUrl) {
    images.push(plot.imageUrl);
  }
  // Add placeholder secondary images if only 1 exists for the gallery layout
  while (images.length < 5) {
    images.push(`https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80&sig=${images.length}`);
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plot.title,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      /* fallback feedback */
    }
  };

  const handleDirections = () => {
    const coords = plot.coordinates ? `${plot.coordinates[0]},${plot.coordinates[1]}` : (plot.location || '');
    if (directionStart) {
      window.open(`https://www.google.com/maps/dir/${encodeURIComponent(directionStart)}/${coords}`);
    } else {
      window.open(`https://www.google.com/maps/dir//${coords}`);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans pt-[80px]"> {/* Account for fixed nav if any */}
      
      {/* 1. Header & Address */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#111] mb-4 transition font-medium">
          <ArrowLeft size={16} /> Back to Search
        </button>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] md:text-[40px] font-serif text-[#111] leading-tight mb-2">{plot.title}</h1>
            <p className="flex items-center gap-2 text-[#6B6B6B] text-[15px]">
              <MapPin size={16} className="text-[#C6A769]" />
              {plot.location} {plot.city ? `, ${plot.city}` : ''} {plot.state ? `, ${plot.state}` : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-3 bg-white border border-[#E9E4DC] rounded-full text-gray-600 hover:text-red-500 hover:border-red-200 transition drop-shadow-sm">
              <Heart size={20} />
            </button>
            <button onClick={handleShare} className="p-3 bg-white border border-[#E9E4DC] rounded-full text-gray-600 hover:text-blue-500 hover:border-blue-200 transition drop-shadow-sm">
              <Share2 size={20} />
            </button>
            <button onClick={() => window.print()} className="p-3 bg-white border border-[#E9E4DC] rounded-full text-gray-600 hover:text-[#111] hover:border-gray-300 transition drop-shadow-sm">
              <Printer size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Price + Meta Strip */}
      <div className="border-y border-[#E9E4DC] bg-white   md:top-[70px] z-30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex flex-wrap items-center divide-x divide-[#E9E4DC]">
          <div className="py-4 pr-8">
            <span className="block text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mb-1">Listed Price</span>
            <span className="text-[26px] font-serif text-[#111]">{formatPrice(plot.price)}</span>
          </div>
          <div className="py-4 px-6 md:px-8">
            <span className="block text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mb-1">Total Area</span>
            <span className="text-[20px] font-serif text-[#111]">{plot.plotSize} <span className="text-[14px] text-gray-500">{plot.sizeUnit || 'sq.ft'}</span></span>
          </div>
          <div className="py-4 px-6 md:px-8">
            <span className="block text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mb-1">Property Type</span>
            <span className="text-[17px] font-serif text-[#111]">{plot.propertyType || 'Plot'}</span>
          </div>
          <div className="py-4 px-6 md:px-8">
            <span className="block text-[11px] uppercase tracking-widest text-[#6B6B6B] font-semibold mb-1">Facing</span>
            <span className="text-[17px] font-serif text-[#111]">{plot.facing || 'Select View'}</span>
          </div>
        </div>
      </div>

      {/* 3. Image Gallery */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
          
          {/* Main big image */}
          <div 
            onClick={() => { setActiveImageIndex(0); setIsFullscreen(true); }}
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden border border-[#E9E4DC]"
          >
            <img src={images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <Maximize size={14} /> Fullscreen
            </div>
          </div>

          {/* 4 Small Images */}
          {images.slice(1, 5).map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => { setActiveImageIndex(idx + 1); setIsFullscreen(true); }}
              className="hidden md:block relative group cursor-pointer overflow-hidden border border-[#E9E4DC]"
            >
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {idx === 3 && images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-serif text-xl">
                  +{images.length - 5} More
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Content Area: Details & Sidebar */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column (Main Details) */}
        <div className="flex-1 w-full lg:w-2/3 space-y-12">
          
          {/* Description */}
          <section>
            <h2 className="text-[24px] font-serif text-[#111] mb-6">About This Property</h2>
            <div className="prose max-w-none text-[#444] text-[16px] leading-relaxed">
              <p>{plot.description || 'Experience the perfect blend of luxury and natural beauty. This prime parcel offers an exceptional opportunity to build your dream home or a lucrative development project in one of the most sought-after locations.'}</p>
              <p className="mt-4">Boasting excellent connectivity, premium surroundings, and uninterrupted views, this land ensures high appreciation value and an unparalleled lifestyle quality.</p>
            </div>
          </section>

          {/* Features Highlights */}
          <section>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 md:p-8 bg-white border border-[#E9E4DC] rounded-xl shadow-sm">
               {['isFeatured', 'verified', 'cornerPlot', 'gatedCommunity'].map((key) => {
                 if (!plot[key]) return null;
                 return (
                   <div key={key} className="flex flex-col gap-2">
                     <CheckCircle size={24} className="text-[#C6A769]" />
                     <span className="capitalize text-[#111] font-semibold">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                   </div>
                 );
               })}
             </div>
          </section>

          {/* Accordion Details */}
          <section>
            <Accordion title="Property Details" defaultOpen={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Property ID</span><span className="font-medium text-[#111]">{plot.id}</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Property Type</span><span className="font-medium text-[#111]">{plot.propertyType || 'Plot'}</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Lot Size</span><span className="font-medium text-[#111]">{plot.plotSize} {plot.sizeUnit}</span></div>
                <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-500">Price/Sq.Ft</span><span className="font-medium text-[#111]">{plot.pricePerSqft ? `₹${plot.pricePerSqft}` : 'N/A'}</span></div>
              </div>
            </Accordion>
            
            <Accordion title="Utility & Location Features">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#C6A769]" /> <span className="text-[#444]">Main Road Access</span></div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#C6A769]" /> <span className="text-[#444]">Water Connection</span></div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#C6A769]" /> <span className="text-[#444]">Grid Electricity</span></div>
                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#C6A769]" /> <span className="text-[#444]">Clear Title</span></div>
              </div>
            </Accordion>
          </section>

          {/* Map Location */}
          {plot.coordinates && plot.coordinates[0] && (
            <section>
              <h2 className="text-[24px] font-serif text-[#111] mb-6">Location Map</h2>
              <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-[#E9E4DC] shadow-sm z-10 relative">
                <MapContainer center={[plot.coordinates[0], plot.coordinates[1]]} zoom={15} className="w-full h-full">
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  <Marker position={[plot.coordinates[0], plot.coordinates[1]]} />
                </MapContainer>
              </div>
            </section>
          )}

          {/* Driving Directions */}
          <section className="bg-[#F5F1EB] p-8 rounded-2xl border border-[#E9E4DC]">
            <h2 className="text-[20px] font-serif text-[#111] mb-2">Get Directions</h2>
            <p className="text-[14px] text-gray-500 mb-6">Enter your starting location to map your route to this property.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Enter starting address..." 
                value={directionStart}
                onChange={(e) => setDirectionStart(e.target.value)}
                className="flex-1 px-4 py-3.5 rounded-lg border border-[#E9E4DC] outline-none focus:border-[#C6A769] transition"
              />
              <button 
                onClick={handleDirections}
                className="px-8 py-3.5 bg-[#111] hover:bg-[#C6A769] text-white rounded-lg uppercase tracking-wider text-[13px] font-semibold transition-colors shrink-0"
              >
                Get Directions
              </button>
            </div>
          </section>

        </div>

        {/* Right Column (Sidebar Contact) */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-[150px] space-y-6">
            
            {/* CMA / Sell Similar Plot CTA */}
            <div className="bg-[#f8f6f2] border-2 border-[#C6A769] rounded-xl p-6 shadow-sm text-center">
              <h3 className="font-serif text-[20px] text-[#111] mb-2">Sell Similar Plot?</h3>
              <p className="text-[14px] text-gray-600 mb-4">Want to know the current market value of your property in this area?</p>
              <button 
                onClick={() => navigate('/services/plot-resale/request-cma', { 
                  state: { prefill: { 
                    city: plot.location?.split(',')[0] || '', 
                    area: plot.area || '', 
                    type: plot.propertyType || '' 
                  } } 
                })}
                className="w-full flex items-center justify-center py-3 bg-[#C6A769] hover:bg-[#b0945b] text-white uppercase tracking-wider text-[13px] font-bold rounded transition-colors"
              >
                Get Plot Valuation
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-white border border-[#E9E4DC] rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0 border border-[#E9E4DC]">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" alt="Agent" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-[18px] text-[#111] mb-1">Rajesh Kumar</h4>
                  <p className="text-[13px] text-[#6B6B6B] uppercase tracking-wider font-semibold">Lead Property Expert</p>
                </div>
              </div>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-[#111] rounded uppercase tracking-wider text-[13px] font-semibold text-[#111] hover:bg-[#111] hover:text-white transition-all">
                  <Mail size={16} /> Request Info
                </button>
                <div className="text-center">
                  <p className="text-[14px] text-gray-500 mb-1">Call us directly</p>
                  <a href="tel:+919876543210" className="text-[20px] font-serif text-[#111] hover:text-[#C6A769] transition">+91 98765 43210</a>
                </div>
              </div>
            </div>

            {/* Schedule Visit Form */}
            <div className="bg-[#111] text-white rounded-xl p-8 shadow-xl">
              <h3 className="font-serif text-[24px] mb-2 text-white">Schedule a Visit</h3>
              <p className="text-gray-400 text-[14px] mb-6">Choose a time and date to tour this magnificent property.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); console.log("Form:", formData); setFormStatus("Visit Scheduled!"); }} className="space-y-4">
                <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded focus:border-[#C6A769] focus:bg-white/15 outline-none transition placeholder-gray-400" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded focus:border-[#C6A769] focus:bg-white/15 outline-none transition placeholder-gray-400" onChange={e => setFormData({...formData, email: e.target.value})} />
                <input required type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded focus:border-[#C6A769] focus:bg-white/15 outline-none transition placeholder-gray-400" onChange={e => setFormData({...formData, phone: e.target.value})} />
                
                <div className="grid grid-cols-2 gap-4">
                  <input required type="date" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded focus:border-[#C6A769] focus:bg-white/15 outline-none transition text-gray-300" onChange={e => setFormData({...formData, date: e.target.value})} />
                  <input required type="time" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded focus:border-[#C6A769] focus:bg-white/15 outline-none transition text-gray-300" onChange={e => setFormData({...formData, time: e.target.value})} />
                </div>
                
                <textarea placeholder="Message (Optional)" rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded focus:border-[#C6A769] focus:bg-white/15 outline-none transition placeholder-gray-400 resize-none" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                
                {formStatus && <div className="p-3 bg-green-500/20 text-green-300 rounded text-center text-sm font-semibold mb-3">{formStatus}</div>}
                <button type="submit" className="w-full py-4 bg-[#C6A769] hover:bg-[#b0945b] text-white uppercase tracking-widest text-[13px] font-bold rounded transition-colors mt-2">
                  Submit Request
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4 md:p-8"
          >
            <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white transition">
              <Maximize className="rotate-45" size={28} />
            </button>
            <div className="absolute top-6 left-6 text-white/70 font-semibold tracking-widest text-sm uppercase">
              {activeImageIndex + 1} / {images.length}
            </div>
            
            <button onClick={prevImage} className="absolute left-4 md:left-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur-sm">
              <ChevronLeft size={24} />
            </button>
            
            <img src={images[activeImageIndex]} alt="Fullscreen view" className="max-w-full max-h-full object-contain select-none" />
            
            <button onClick={nextImage} className="absolute right-4 md:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur-sm">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PlotDetail;
