import { create } from 'zustand';

export const useMapStore = create((set) => ({
  hoveredPropertyId: null,
  setHoveredPropertyId: (id) => set({ hoveredPropertyId: id }),
  
  selectedPropertyId: null,
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),
  
  mapBounds: null,
  setMapBounds: (bounds) => set({ mapBounds: bounds }),
  
  mapViewState: {
    longitude: 77.3910,
    latitude: 28.5355,
    zoom: 10
  },
  setMapViewState: (viewState) => set({ mapViewState: viewState }),
  
  searchThisAreaTrigger: 0,
  triggerSearchThisArea: () => set((state) => ({ searchThisAreaTrigger: state.searchThisAreaTrigger + 1 })),
}));
