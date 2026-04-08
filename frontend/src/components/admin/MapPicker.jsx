import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

const MapPicker = ({ location, setLocation }) => {
  const defaultCenter = [20.5937, 78.9629]; // India center roughly
  const currentCenter = location && location[0] && location[1] ? location : defaultCenter;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-[#E9E4DC] shadow-sm relative z-0">
      <MapContainer center={currentCenter} zoom={13} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapClickHandler onSelect={setLocation} />
        <MapUpdater center={currentCenter} />
        {location && location[0] && location[1] && (
          <Marker position={location} />
        )}
      </MapContainer>
      <div className="absolute top-4 right-4 z-[400] bg-white px-4 py-2 text-sm font-medium shadow-md rounded border border-gray-200 pointer-events-none">
        Click on the map to pin property location
      </div>
    </div>
  );
};

export default MapPicker;
