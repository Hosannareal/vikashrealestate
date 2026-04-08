import React, { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiMapPin, FiMic, FiSearch, FiMenu, FiTarget } from 'react-icons/fi'

const SearchBarNew = ({ inHero = false, onToggle }) => {
  const [activeTab, setActiveTab] = useState('buy')
  const [location, setLocation] = useState('')
  const [showMainDropdown, setShowMainDropdown] = useState(false)
  const [activeFilterSection, setActiveFilterSection] = useState('propertyType')
  
  const dropdownRef = useRef(null)

  const [filters, setFilters] = useState({
    propertyType: {
      flat: true,
      builderFloor: true,
      independentHouse: true,
      residentialLand: true,
      studioApartment: true,
      farmHouse: true,
      servicedApartments: true,
      other: true,
    },
    budget: { min: 0, max: 100 },
    bedroom: 'any',
  })

  // Notify parent on toggle
  useEffect(() => {
    if (onToggle) onToggle(showMainDropdown)
  }, [showMainDropdown, onToggle])

  const tabs = [
    { id: 'buy', label: 'Buy' },
    { id: 'rent', label: 'Rent' },
    { id: 'newlaunch', label: 'New Launch' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'plots', label: 'Plots/Land' },
    { id: 'projects', label: 'Projects' },
    { id: 'post', label: 'Post Property', highlight: true },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMainDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderFilterContent = () => {
    switch (activeFilterSection) {
      case 'propertyType':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-y-4 gap-x-8 w-full mt-4">
              {Object.keys(filters.propertyType).map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.propertyType[type]}
                    onChange={() => setFilters({
                        ...filters,
                        propertyType: { ...filters.propertyType, [type]: !filters.propertyType[type] }
                    })}
                    className="w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-700 text-sm font-medium group-hover:text-[#0081C9] transition-colors whitespace-nowrap capitalize">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              ))}
            </div>
            <button className="text-[#0081C9] font-bold text-sm hover:underline absolute top-0 right-0">Clear</button>
            <p className="text-[#0081C9] text-xs font-bold mt-6 cursor-pointer hover:underline">
               Looking for commercial properties? Click here
            </p>
          </div>
        )
      case 'budget':
        return (
          <div className="py-4 space-y-6">
            <div className="flex justify-between items-center text-sm font-bold text-gray-800">
               <h3>Select Price Range</h3>
               <span>0 - 100+ Crore</span>
            </div>
            <div className="relative pt-6 h-20">
               <div className="h-1 bg-gray-100 rounded-full w-full relative">
                  <div className="absolute top-0 left-0 h-1 bg-[#0081C9] rounded-full" style={{width: '100%'}}></div>
                  <div className="absolute -top-1.5 left-0 w-4 h-4 bg-white border-2 border-[#0081C9] rounded-full shadow-md cursor-pointer"></div>
                  <div className="absolute -top-1.5 right-0 w-4 h-4 bg-white border-2 border-[#0081C9] rounded-full shadow-md cursor-pointer"></div>
               </div>
               <div className="flex justify-between mt-6">
                  <div className="bg-[#002B4B] text-white px-2 py-0.5 text-[10px] font-bold rounded">0</div>
                  <div className="bg-[#002B4B] text-white px-2 py-0.5 text-[10px] font-bold rounded">100+ Crores</div>
               </div>
            </div>
          </div>
        )
      case 'bedroom':
        return (
            <div className="py-2 space-y-6">
                <h3 className="font-bold text-gray-800 text-sm italic">Number of Bedrooms</h3>
                <div className="flex flex-wrap gap-4">
                    {['1 RK/1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map((label) => (
                        <button
                            key={label}
                            className={`px-5 py-1.5 border rounded-full text-[13px] font-semibold transition-all ${
                                label === '2 BHK' 
                                ? 'bg-blue-50 border-[#0081C9] text-[#0081C9]' 
                                : 'border-gray-100 text-gray-600 hover:border-gray-200'
                            }`}
                        >
                            + {label}
                        </button>
                    ))}
                </div>
            </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`w-full bg-white ${inHero ? 'rounded-2xl' : 'rounded-lg'} shadow-2xl relative border border-gray-100`} ref={dropdownRef}>
      {/* Tabs */}
      <div className="flex items-center gap-10 px-8 py-3 border-b border-gray-50 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap text-[15px] font-black transition-all pb-3 border-b-[3px] ${
              activeTab === tab.id
                ? 'text-gray-900 border-[#0081C9]'
                : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            {tab.label}
            {tab.highlight && <span className="ml-1 bg-green-500 text-white text-[9px] px-1 py-0.5 rounded-sm uppercase tracking-tighter">FREE</span>}
          </button>
        ))}
      </div>

      {/* Main Bar */}
      <div className="px-6 py-2 flex items-center gap-2">
        <button
          onClick={() => {
              setShowMainDropdown(true)
              setActiveFilterSection('propertyType')
          }}
          className="flex items-center gap-3 px-4 py-4 border-r border-gray-50 hover:bg-gray-50/50 transition min-w-[180px] group"
        >
          <span className="text-[15px] font-bold text-gray-800">All Residential</span>
          <FiChevronDown className={`transition-transform duration-300 text-gray-400 ${showMainDropdown && activeFilterSection === 'propertyType' ? 'rotate-180 text-[#0081C9]' : ''}`} />
        </button>

        <div className="flex-1 flex items-center gap-2 px-2">
           <FiSearch className="text-gray-400 w-5 h-5 ml-2" />
           <input
            type="text"
            placeholder="Search 'Noida'"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 py-4 bg-transparent outline-none text-gray-800 placeholder-gray-400 font-bold text-sm"
          />
          <div className="flex items-center gap-5 px-4 text-gray-400">
            <div className="bg-blue-50 p-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
                <FiTarget className="w-4 h-4 text-[#0081C9]" />
            </div>
             <div className="bg-blue-50 p-2 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
                <FiMic className="w-4 h-4 text-[#0081C9]" />
            </div>
          </div>
          <button
            onClick={() => setShowMainDropdown(false)}
            className="px-10 py-3 bg-[#0081C9] hover:bg-[#005CA8] text-white font-black rounded-lg transition-all shadow-md shadow-blue-100 uppercase tracking-tight"
          >
            Search
          </button>
        </div>
      </div>

      {/* Dropdown Box */}
      {showMainDropdown && (
        <div className="absolute top-[calc(100%+15px)] left-0 w-full bg-white rounded-2xl shadow-2xl z-[110] p-10 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="min-h-[140px] relative">
            {renderFilterContent()}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-50 overflow-x-auto no-scrollbar">
             <div className="flex items-center gap-4">
                {[
                    { id: 'budget', label: 'Budget' },
                    { id: 'bedroom', label: 'Bedroom' },
                    { id: 'construction', label: 'Construction Status' },
                    { id: 'postedby', label: 'Posted By' }
                ].map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => setActiveFilterSection(btn.id)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full border text-[13px] font-bold transition-all whitespace-nowrap ${
                            activeFilterSection === btn.id 
                            ? 'bg-blue-50 border-[#0081C9] text-[#0081C9]' 
                            : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {btn.label}
                        <FiChevronDown className={activeFilterSection === btn.id ? 'rotate-180' : ''} />
                    </button>
                ))}
             </div>
          </div>
        </div>
      )}

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </div>
  )
}

export default SearchBarNew
