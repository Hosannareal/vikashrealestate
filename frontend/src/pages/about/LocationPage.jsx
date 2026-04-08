import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import PageHero from '../../components/shared/PageHero';
import SectionWrapper from '../../components/shared/SectionWrapper';
import ContactCard from '../../components/shared/ContactCard';

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OFFICE_COORDS = [42.3499, -71.0772]; // Boston roughly (Newbury St, Boston)

const LocationPage = () => {
  const [startAddress, setStartAddress] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetDirections = (e) => {
    e.preventDefault();
    const encodedStart = encodeURIComponent(startAddress);
    window.open(`https://www.google.com/maps/dir/${encodedStart}/${OFFICE_COORDS[0]},${OFFICE_COORDS[1]}`, '_blank');
  };

  return (
    <main className="w-full min-h-screen bg-[#F9F7F4]">
      <PageHero 
        title="Our Office" 
        subtitle="Visit Us at Campion and Company"
      />
      
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-3xl font-serif text-[#111111] mb-10">
              Visit Our Headquarters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 border border-[#E8E1D9]">
                <h3 className="text-xl font-serif mb-6 text-[#111111]">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#C8A96A] shrink-0 mt-1" size={20} />
                    <p className="text-[15px] font-sans text-[#4A4A4A]">172 Newbury Street<br/>Boston, MA 02116</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="text-[#C8A96A] shrink-0" size={20} />
                    <p className="text-[15px] font-sans text-[#4A4A4A]">617-236-0711</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="text-[#C8A96A] shrink-0" size={20} />
                    <p className="text-[15px] font-sans text-[#4A4A4A]">info@vikashrealestate.com</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-[#C8A96A] shrink-0 mt-1" size={20} />
                    <div className="text-[15px] font-sans text-[#4A4A4A]">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday - Sunday: By Appointment</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 border border-[#E8E1D9] flex flex-col justify-center">
                <h3 className="text-xl font-serif mb-4 text-[#111111]">Get Directions</h3>
                <p className="text-[14px] text-[#6B6B6B] mb-5">Enter your starting location to get turn-by-route directions to our office.</p>
                <form onSubmit={handleGetDirections} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Enter starting address..."
                    value={startAddress}
                    onChange={(e) => setStartAddress(e.target.value)}
                    className="w-full border border-[#E8E1D9] px-4 py-3 text-[14px] focus:outline-none focus:border-[#C8A96A] bg-[#FAFAFA]"
                  />
                  <button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#111111] text-white py-3 text-[13px] uppercase tracking-widest font-medium hover:bg-[#C8A96A] transition-colors duration-300"
                  >
                    <Navigation size={16} /> Locate On Map
                  </button>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[500px] border border-[#E8E1D9] z-0 relative shadow-sm">
              <MapContainer 
                center={OFFICE_COORDS} 
                zoom={14} 
                scrollWheelZoom={false} 
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={OFFICE_COORDS} />
              </MapContainer>
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

export default LocationPage;