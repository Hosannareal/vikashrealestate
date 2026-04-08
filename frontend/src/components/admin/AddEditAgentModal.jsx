import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Plus, Trash2, Search, CheckSquare, ChevronDown } from 'lucide-react';
import { mockLandProperties } from '../../data/mockLand'; 

const initialForm = {
  name: '',
  phone: '',
  email: '',
  image: '',
  cities: [],
  specializations: [],
  experience_years: '',
  total_sold: 0,
  active_listings: 0,
  bio: '',
  status: 'Active',
  active_plots: [],
  sold_plots: []
};

// Generic click outside hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// Hook for smart position
function useSmartPosition(isOpen) {
  const ref = useRef(null);
  const [openUpwards, setOpenUpwards] = useState(false);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300; // max height of dropdown
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    }
  }, [isOpen]);

  return { ref, openUpwards };
}

// Multi select dropdown for strings with add new
const StringMultiSelect = ({ title, options, selected, onChange, onAddNew, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, openUpwards } = useSmartPosition(isOpen);
  useOnClickOutside(ref, () => setIsOpen(false));

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleToggle = (opt, e) => {
    e.stopPropagation();
    if (selected.includes(opt)) {
      onChange(selected.filter(item => item !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  const handleRemove = (opt, e) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== opt));
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[46px] border border-[#e5e0d8] rounded-[10px] p-2 bg-[#f8f6f2] hover:bg-white cursor-pointer transition flex items-center justify-between"
      >
        <div className="flex flex-wrap gap-2 items-center flex-1">
          {selected.length === 0 && <span className="text-sm text-[#6B6B6B] ml-2">{placeholder}</span>}
          {selected.map(sel => (
            <span key={sel} className="bg-white border border-[#e5e0d8] px-2 py-1 text-[11px] rounded text-[#111111] flex items-center gap-1">
              {sel} 
              <button 
                 onClick={(e) => handleRemove(sel, e)}
                 type="button" 
                 className="hover:text-red-500 rounded-full p-0.5 ml-1"
              >
                  <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <ChevronDown size={16} className="text-[#6B6B6B] mr-2" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: openUpwards ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpwards ? 5 : -5 }}
            className={`absolute left-0 w-full bg-white border border-[#e5e0d8] shadow-lg rounded-[12px] z-[60] overflow-hidden flex flex-col ${openUpwards ? 'bottom-[105%]' : 'top-full mt-2'}`}
          >
            <div className="p-3 border-b border-[#e5e0d8] flex gap-2 items-center bg-[#f8f6f2]">
              <Search size={16} className="text-[#6B6B6B]" />
              <input 
                type="text" 
                placeholder={`Search ${title}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-[#111111]"
              />
            </div>
            <div className="max-h-[220px] overflow-y-auto custom-scrollbar p-2">
              {filteredOptions.length > 0 ? filteredOptions.map(opt => (
                <div 
                  key={opt}
                  onClick={(e) => handleToggle(opt, e)}
                  className="flex items-center gap-2 p-2 hover:bg-[#f8f6f2] rounded cursor-pointer"
                >
                  <input type="checkbox" readOnly checked={selected.includes(opt)} className="accent-[#C6A769] cursor-pointer" />
                  <span className="text-sm text-[#111111]">{opt}</span>
                </div>
              )) : (
                <div className="p-4 text-center text-sm text-[#6B6B6B]">No results found.</div>
              )}
            </div>
            {onAddNew && (
              <div 
                 onClick={(e) => { e.stopPropagation(); setIsOpen(false); onAddNew(); }}
                 className="p-3 bg-[#f8f6f2] border-t border-[#e5e0d8] text-[#C6A769] text-sm font-medium flex items-center justify-center gap-1 cursor-pointer hover:bg-[#e5e0d8] transition"
              >
                <Plus size={16} /> Add New {title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Plot selection dropdown
const PlotMultiSelect = ({ title, options, selectedIds, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, openUpwards } = useSmartPosition(isOpen);
  useOnClickOutside(ref, () => setIsOpen(false));

  const filteredOptions = options.filter(plot => 
    plot.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = (id, e) => {
    e.stopPropagation();
    onSelectionChange(id);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[46px] border border-[#e5e0d8] rounded-[10px] p-2 bg-[#f8f6f2] hover:bg-white cursor-pointer transition flex items-center justify-between"
      >
        <div className="flex flex-wrap gap-2 items-center flex-1">
          {selectedIds.length === 0 && <span className="text-sm text-[#6B6B6B] ml-2">Select {title}...</span>}
          {selectedIds.map(id => {
            const plot = mockLandProperties.find(p => p.id === id);
            if (!plot) return null;
            return (
              <span key={id} className="bg-white border border-[#e5e0d8] px-2 py-1 text-[11px] rounded text-[#111111] flex items-center gap-1">
                {plot.title} 
                <button type="button" onClick={(e) => handleRemove(id, e)} className="hover:text-red-500 rounded-full p-0.5 ml-1">
                   <X size={12} />
                </button>
              </span>
            )
          })}
        </div>
        <ChevronDown size={16} className="text-[#6B6B6B] mr-2" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: openUpwards ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpwards ? 5 : -5 }}
            className={`absolute left-0 w-full bg-white border border-[#e5e0d8] shadow-lg rounded-[12px] z-[60] overflow-hidden flex flex-col max-h-[300px] ${openUpwards ? 'bottom-[105%]' : 'top-full mt-2'}`}
          >
            <div className="p-3 border-b border-[#e5e0d8] flex gap-2 items-center bg-[#f8f6f2]">
               <Search size={16} className="text-[#6B6B6B]" />
               <input 
                 type="text" 
                 placeholder={`Search ${title.toLowerCase()}...`}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="bg-transparent border-none outline-none text-sm w-full text-[#111111]"
               />
               <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-[#e5e0d8] rounded text-[#111111]">
                 <X size={14} />
               </button>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1 pb-2">
              {filteredOptions.length > 0 ? (
                <table className="w-full text-left text-[11px] uppercase tracking-wider">
                   <thead className="bg-[#f8f6f2] sticky top-0 z-[10] font-semibold text-[#6B6B6B]">
                     <tr>
                       <th className="p-2 w-10 text-center"><CheckSquare size={14} /></th>
                       <th className="p-2">Plot Name</th>
                       <th className="p-2">Location</th>
                       <th className="p-2">Price</th>
                     </tr>
                   </thead>
                   <tbody>
                     {filteredOptions.map(plot => (
                       <tr 
                         key={plot.id} 
                         className="border-b border-[#e5e0d8] hover:bg-[#f8f6f2] cursor-pointer" 
                         onClick={(e) => { e.stopPropagation(); onSelectionChange(plot.id); }}
                       >
                         <td className="p-2 text-center">
                           <input 
                             type="checkbox" 
                             readOnly
                             checked={selectedIds.includes(plot.id)}
                             className="accent-[#C6A769] cursor-pointer"
                           />
                         </td>
                         <td className="p-2 font-semibold text-[#111111] max-w-[150px] truncate">{plot.title}</td>
                         <td className="p-2 text-[#6B6B6B] max-w-[100px] truncate">{plot.location}</td>
                         <td className="p-2 text-[#C6A769] font-semibold">?{(plot.price/100000).toFixed(2)}L</td>
                       </tr>
                     ))}
                   </tbody>
                </table>
              ) : (
                <div className="p-4 text-center text-sm text-[#6B6B6B]">No plots found matching current filters.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// Simple Add New Modal logic
const AddNewItemModal = ({ isOpen, onClose, onSave, title }) => {
  const [val, setVal] = useState('');
  useEffect(() => { setVal(''); }, [isOpen]);

  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-[11000] flex items-center justify-center">
       <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" onClick={onClose}></div>
       <div className="relative bg-white rounded-[12px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] w-full max-w-sm p-6 z-10 transition-transform">
          <h3 className="text-xl font-serif text-[#111111] mb-4">Add New {title}</h3>
          <input 
            type="text" 
            autoFocus
            className="w-full rounded-[10px] p-3 border border-[#e5e0d8] focus:border-[#C6A769] focus:outline-none focus:ring-1 focus:ring-[#C6A769] mb-6"
            placeholder={`Enter ${title} name`}
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <button onClick={onClose} className="px-5 py-2.5 rounded-[10px] text-sm font-semibold text-[#111111] hover:bg-[#f8f6f2] transition border border-[#e5e0d8]">Cancel</button>
            <button 
               onClick={() => { if(val.trim()){ onSave(val.trim()); onClose(); } }}
               className="px-5 py-2.5 rounded-[10px] text-sm font-semibold bg-[#C6A769] text-white hover:bg-[#b0945b] transition"
            >Save</button>
          </div>
       </div>
     </div>
  );
};

const AddEditAgentModal = ({ isOpen, onClose, onSave, editingAgent }) => {
  const [formData, setFormData] = useState(initialForm);
  const [isSaving, setIsSaving] = useState(false);
  
  const [availableCities, setAvailableCities] = useState(['Jaipur', 'Delhi NCR', 'Pune', 'Mumbai', 'Bangalore', 'Hyderabad']);
  const [availableSpecs, setAvailableSpecs] = useState(['Residential Plots', 'Commercial Land', 'Farm Land', 'Industrial Land']);

  const [addNewModal, setAddNewModal] = useState({ open: false, type: '' });

  useEffect(() => {
    if (editingAgent && isOpen) {
      setFormData({ ...initialForm, ...editingAgent, cities: editingAgent.cities || [], specializations: editingAgent.specializations || [] });
    } else if (isOpen) {
      setFormData(initialForm);
    }
  }, [editingAgent, isOpen]);

  useEffect(() => {
    if (isOpen) {
       document.body.style.overflow = 'hidden';
    } else {
       document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handlePlotSelection = (type, id) => {
    const key = type === 'active' ? 'active_plots' : 'sold_plots';
    setFormData(prev => {
      const currentList = prev[key];
      return {
        ...prev,
        [key]: currentList.includes(id) 
          ? currentList.filter(plotId => plotId !== id)
          : [...currentList, id]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSave(formData);
      setIsSaving(false);
      onClose();
    }, 800);
  };

  const saveNewOption = (val) => {
    if (addNewModal.type === 'City') {
      if (!availableCities.includes(val)) setAvailableCities(prev => [...prev, val]);
      if (!formData.cities.includes(val)) setFormData(p => ({ ...p, cities: [...p.cities, val] }));
    } else {
      if (!availableSpecs.includes(val)) setAvailableSpecs(prev => [...prev, val]);
      if (!formData.specializations.includes(val)) setFormData(p => ({ ...p, specializations: [...p.specializations, val] }));
    }
  };

  const isValid = formData.name && formData.phone && formData.email;

  // Smart Filtering for Plots
  let availablePlotsFiltered = mockLandProperties;
  if (formData.cities.length > 0) {
    availablePlotsFiltered = availablePlotsFiltered.filter(plot => 
      formData.cities.some(c => plot.location.toLowerCase().includes(c.toLowerCase()))
    );
  }
  if (formData.specializations.length > 0) {
     availablePlotsFiltered = availablePlotsFiltered.filter(plot => 
        formData.specializations.some(s => plot.propertyType && plot.propertyType.toLowerCase() === s.toLowerCase()) || 
        formData.specializations.some(s => s.toLowerCase().includes('land') && (plot.propertyType === 'Land' || plot.propertyType === 'Plot')) ||
        !plot.propertyType // Mocking leniency
     );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[10000] overflow-y-auto"
        >
            <div className="fixed inset-0 bg-[#f8f6f2] -z-10 pointer-events-none"></div>
            
            <div className="flex items-center justify-between px-8 py-4 border-b border-[#e5e0d8] bg-white sticky top-0 z-[1000] shadow-sm">
              <button type="button" onClick={onClose} className="p-2 hover:bg-[#f8f6f2] rounded-full transition text-[#111111]">
                <X size={24} />
              </button>
              <h2 className="text-xl font-serif text-[#111111]">
                {editingAgent ? 'Edit Agent' : 'Add New Agent'}
              </h2>
              <button form="agent-form" type="submit" disabled={!isValid || isSaving} className="px-6 py-2.5 rounded-[10px] text-sm font-semibold text-white bg-[#C6A769] hover:bg-[#b0945b] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Agent'}
              </button>
            </div>

            {/* FULLSCREEN MODAL BREATHING SPACE FIX */}
            <div className="py-12 md:py-16 px-4 md:px-[80px] max-w-[1200px] mx-auto custom-scrollbar">
              <form id="agent-form" onSubmit={handleSubmit} className="space-y-12 bg-white p-8 md:p-[40px] rounded-[16px] border border-[#e5e0d8] shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
                
                {/* Basic Info */}
                <div>
                  <h3 className="text-[14px] uppercase tracking-wider text-[#C6A769] mb-8 flex items-center gap-2 font-semibold">
                    Basic Info
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-36 h-36 rounded-[12px] border border-[#e5e0d8] bg-[#f8f6f2] flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0 group">
                      {formData.image ? (
                        <>
                          <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                             <Trash2 size={24} className="text-white cursor-pointer" onClick={() => setFormData(p => ({ ...p, image: ''}))} />
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload size={28} className="text-[#C6A769] mb-2" />
                          <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B]">Upload</span>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8f6f2]/50 p-6 rounded-[12px]">
                      <div className="md:col-span-2">
                        <label className="block text-sm text-[#111111] mb-2 font-medium">Full Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-[10px] p-3 border border-[#e5e0d8] bg-white focus:border-[#C6A769] focus:outline-none transition shadow-sm bg-white" placeholder="e.g. John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm text-[#111111] mb-2 font-medium">Phone *</label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full rounded-[10px] p-3 border border-[#e5e0d8] bg-white focus:border-[#C6A769] focus:outline-none transition shadow-sm bg-white" placeholder="e.g. +91 9876543210" />
                      </div>
                      <div>
                        <label className="block text-sm text-[#111111] mb-2 font-medium">Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-[10px] p-3 border border-[#e5e0d8] bg-white focus:border-[#C6A769] focus:outline-none transition shadow-sm bg-white" placeholder="e.g. john@example.com" />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-sm text-[#111111] mb-2 font-medium">Biography</label>
                         <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full rounded-[10px] p-3 border border-[#e5e0d8] bg-white focus:border-[#C6A769] focus:outline-none transition shadow-sm bg-white resize-none" placeholder="Detailed description about the agent..."></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Stats */}
                <div>
                   <h3 className="text-[14px] uppercase tracking-wider text-[#C6A769] mb-8 flex items-center gap-2 font-semibold">
                       Professional Stats
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#f8f6f2]/50 p-6 rounded-[12px]">
                       <div>
                        <label className="block text-sm text-[#111111] mb-2 font-medium">Experience (Years)</label>
                        <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} className="w-full rounded-[10px] p-3 border border-[#e5e0d8] bg-white focus:border-[#C6A769] focus:outline-none transition shadow-sm" />
                      </div>
                      <div>
                         <label className="block text-sm text-[#111111] mb-2 font-medium">Account Status</label>
                         <div className="flex items-center h-[50px] bg-white border border-[#e5e0d8] rounded-[10px] px-4 shadow-sm">
                           <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" checked={formData.status === 'Active'} onChange={(e) => setFormData(p => ({...p, status: e.target.checked ? 'Active' : 'Inactive'}))} />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                              <span className="ml-3 text-sm font-medium text-[#111111]">{formData.status}</span>
                            </label>
                         </div>
                      </div>
                    </div>
                </div>

                {/* Listings & Service Areas */}
                <div>
                   <h3 className="text-[14px] uppercase tracking-wider text-[#C6A769] mb-4 flex items-center gap-2 font-semibold">
                       Listings & Service Areas
                   </h3>
                   <div className="bg-[#f8f6f2]/50 p-6 md:p-8 rounded-[12px]">
                       <p className="text-sm text-[#6B6B6B] mb-8">Select Service Cities and Specializations to filter assignable properties below.</p>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                          {/* Cities */}
                          <div className="flex flex-col gap-2 relative">
                             <label className="block text-sm text-[#111111] font-medium">Service Cities</label>
                             <StringMultiSelect 
                               title="City"
                               options={availableCities}
                               selected={formData.cities}
                               onChange={(v) => setFormData(p => ({...p, cities: v}))}
                               onAddNew={() => setAddNewModal({ open: true, type: 'City' })}
                               placeholder="Select Cities..."
                             />
                          </div>
                          
                          {/* Specializations */}
                          <div className="flex flex-col gap-2 relative">
                             <label className="block text-sm text-[#111111] font-medium">Specializations</label>
                             <StringMultiSelect 
                               title="Specialization"
                               options={availableSpecs}
                               selected={formData.specializations}
                               onChange={(v) => setFormData(p => ({...p, specializations: v}))}
                               onAddNew={() => setAddNewModal({ open: true, type: 'Specialization' })}
                               placeholder="Select Specializations..."
                             />
                          </div>

                          {/* Active Listings */}
                          <div className="flex flex-col gap-2 relative">
                             <label className="block text-sm text-[#111111] font-medium">Active Plots ({formData.active_plots.length})</label>
                             <PlotMultiSelect 
                               title="Active Plots"
                               options={availablePlotsFiltered}
                               selectedIds={formData.active_plots}
                               onSelectionChange={(id) => handlePlotSelection('active', id)}
                             />
                          </div>

                          {/* Sold Plots */}
                          <div className="flex flex-col gap-2 relative">
                             <label className="block text-sm text-[#111111] font-medium">Sold Plots ({formData.sold_plots.length})</label>
                             <PlotMultiSelect 
                               title="Sold Plots"
                               options={availablePlotsFiltered}
                               selectedIds={formData.sold_plots}
                               onSelectionChange={(id) => handlePlotSelection('sold', id)}
                             />
                          </div>
                       </div>
                   </div>
                </div>

              </form>
            </div>

            <AddNewItemModal 
              isOpen={addNewModal.open} 
              onClose={() => setAddNewModal({ open: false, type: '' })} 
              title={addNewModal.type} 
              onSave={saveNewOption} 
            />

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEditAgentModal;
