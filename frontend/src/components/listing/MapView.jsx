import React, { useEffect, useState } from 'react';
import { useMapStore } from '../../store/useMapStore';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';

const formatPrice = (price) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
  return `₹${price.toLocaleString()}`;
};

// Create a component to handle map events
const MapEvents = ({ setShowSearchButton }) => {
  const { setMapBounds } = useMapStore();
  const map = useMapEvents({
    moveend: () => {
      setShowSearchButton(true);
      const bounds = map.getBounds();
      // Note: Leaflet bounds are SouthWest to NorthEast
      setMapBounds([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ]);
    },
  });
  return null;
};

// Sync component to handle flyTo when selected from outside
const MapSync = ({ selectedPropertyId, properties }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPropertyId && properties.length > 0) {
      const selectedProp = properties.find(p => p.id === selectedPropertyId);
      if (selectedProp) {
        // Leaflet expects [lat, lng], assume coordinates are [lat, lng]
        map.flyTo([selectedProp.coordinates[0], selectedProp.coordinates[1]], 14, {
          duration: 1.5
        });
      }
    }
  }, [selectedPropertyId, properties, map]);
  return null;
};

// Custom Reset Control
const CustomControls = ({ properties }) => {
  const map = useMap();
  
  const handleReset = (e) => {
    e.stopPropagation();
    if (properties.length > 0) {
      // Create a bounds object that includes all markers
      const bounds = L.latLngBounds(properties.map(p => [p.coordinates[0], p.coordinates[1]]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const handleLocation = (e) => {
    e.stopPropagation();
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  return (
    <div className="leaflet-bottom leaflet-right" style={{ bottom: '20px', right: '10px', position: 'absolute', zIndex: 1000, pointerEvents: 'auto' }}>
      <div className="leaflet-control flex flex-col gap-2 mb-20"> {/* Margin bottom pushes it above zoom control */}
        <button 
          className="w-8 h-8 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-700 text-lg leading-none"
          title="Reset View"
          onClick={handleReset}
        >
          ⟲
        </button>
        <button 
          className="w-8 h-8 bg-white rounded shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-700 text-sm leading-none"
          title="My Location"
          onClick={handleLocation}
        >
          📍
        </button>
      </div>
    </div>
  );
};

const CustomMarker = ({ property, isSelected, isHovered, onClick, onMouseEnter, onMouseLeave }) => {
  const bgColor = isSelected ? 'bg-[#111]' : (isHovered ? 'bg-[#C6A769]' : 'bg-white');
  const textColor = isSelected || isHovered ? 'text-white' : 'text-[#111111]';
  const scale = isSelected || isHovered ? 'scale-110' : '';
  const zIndex = isSelected || isHovered ? 1000 : 1;
  const borderColor = isSelected ? 'border-t-[#111]' : (isHovered ? 'border-t-[#C6A769]' : 'border-t-white');

  const html = `
    <div class="relative px-3 py-1.5 rounded-full text-[13px] font-bold shadow-lg transition-all duration-300 ${bgColor} ${textColor} ${scale}" style="transform-origin: bottom center; display: inline-block; white-space: nowrap;">
      ${formatPrice(property.price)}
      <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent ${borderColor}"></div>
    </div>
  `;

  // Provide a reasonable iconSize so leaflet anchors it correctly. 
  // Anchor is [width/2, height] to center the tip pointing at the location.
  const icon = L.divIcon({
    html: html,
    className: 'custom-leaflet-marker bg-transparent border-none', // removed default leaflet styles
    iconSize: [80, 40], // Base size
    iconAnchor: [40, 40] 
  });
  
  return (
    <Marker 
      position={[property.coordinates[0], property.coordinates[1]]} 
      icon={icon}
      zIndexOffset={zIndex}
      eventHandlers={{
        click: onClick,
        mouseover: onMouseEnter,
        mouseout: onMouseLeave
      }}
    />
  );
};

const MapView = ({ properties }) => {
  const [showSearchButton, setShowSearchButton] = useState(false);
  
  const {
    hoveredPropertyId, setHoveredPropertyId,
    selectedPropertyId, setSelectedPropertyId
  } = useMapStore();

  const handleSearchArea = () => {
    setShowSearchButton(false);
    useMapStore.getState().triggerSearchThisArea();
  };

  const handleMarkerClick = (property) => {
    setSelectedPropertyId(property.id);
    const cardEl = document.getElementById(`property-${property.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Extract initial center if properties are available
  const centerLat = properties[0]?.coordinates[0] || 28.5355;
  const centerLng = properties[0]?.coordinates[1] || 77.3910;

  return (
    <div className="w-full h-full min-h-[500px] relative rounded-2xl overflow-hidden shadow-inner border border-[#E9E4DC]">
      <MapContainer 
        center={[centerLat, centerLng]} 
        zoom={10} 
        style={{ width: '100%', height: '100%', minHeight: '500px', zIndex: 0 }}
        zoomControl={false} // Custom placing
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <ZoomControl position="bottomright" />
        <MapEvents setShowSearchButton={setShowSearchButton} />
        <MapSync selectedPropertyId={selectedPropertyId} properties={properties} />
        <CustomControls properties={properties} />

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
        >
          {properties.map(property => (
            <CustomMarker 
              key={property.id}
              property={property}
              isSelected={selectedPropertyId === property.id}
              isHovered={hoveredPropertyId === property.id}
              onClick={() => handleMarkerClick(property)}
              onMouseEnter={() => setHoveredPropertyId(property.id)}
              onMouseLeave={() => setHoveredPropertyId(null)}
            />
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Search this area button */}
      {showSearchButton && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400]">
          <button
            className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg text-[#111] text-sm font-semibold hover:bg-[#111] hover:text-white transition-colors"
            onClick={handleSearchArea}
          >
            Search this area
          </button>
        </div>
      )}
    </div>
  );
};

export default MapView;