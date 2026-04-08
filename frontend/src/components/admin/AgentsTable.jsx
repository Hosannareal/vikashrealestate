import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Edit2, Trash2, Eye, Power, PowerOff } from 'lucide-react';

const ActionDropdown = ({ agent, onEdit, onDelete, onToggleStatus, isOpen, onToggle }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (isOpen) onToggle(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onToggle]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggle(isOpen ? null : agent.id);
        }}
        className="p-1.5 text-gray-500 hover:text-[#111111] hover:bg-[#f8f6f2] rounded transition"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#f3efe8] rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-50 overflow-hidden border border-[#e5e0d8]">
          <button className="w-full text-left px-4 py-2 text-sm text-[#111111] hover:bg-[#e5e0d8] flex items-center gap-2 transition">
            <Eye size={14} /> View
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(agent); onToggle(null); }}
            className="w-full text-left px-4 py-2 text-sm text-[#111111] hover:bg-[#e5e0d8] flex items-center gap-2 transition"
          >
            <Edit2 size={14} /> Edit
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleStatus(agent); onToggle(null); }}
            className="w-full text-left px-4 py-2 text-sm text-[#111111] hover:bg-[#e5e0d8] flex items-center gap-2 transition"
          >
            {(agent.status || 'Active') === 'Active' ? <PowerOff size={14} /> : <Power size={14} />}
            {(agent.status || 'Active') === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(agent); onToggle(null); }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#e5e0d8] flex items-center gap-2 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const AgentsTable = ({ agents, isLoading, onEdit, onDelete, onToggleStatus }) => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl shadow-sm border border-[#e5e0d8] overflow-hidden">
        <div className="p-4 flex gap-4 animate-pulse border-b border-[#e5e0d8] bg-gray-50">
           <div className="h-6 w-32 bg-gray-200 rounded"></div>
           <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
        {[1,2,3,4,5].map(i => (
          <div key={i} className="p-4 border-b border-[#e5e0d8] flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
               <div>
                 <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                 <div className="h-3 w-32 bg-gray-100 rounded"></div>
               </div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-[#e5e0d8] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-wider border-b border-[#e5e0d8] bg-[#f8f6f2] text-[#6B6B6B] text-[11px] font-semibold">
            <tr>
              <th scope="col" className="px-6 py-4">Agent</th>
              <th scope="col" className="px-6 py-4">Contact</th>
              <th scope="col" className="px-6 py-4">Specialization</th>
              <th scope="col" className="px-6 py-4">Experience & Listings</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b border-[#e5e0d8] hover:bg-[#f8f6f2]/50 transition">
                
                {/* Agent Profile */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={agent.image || 'https://via.placeholder.com/40'} 
                      alt={agent.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#e5e0d8]"
                    />
                    <div>
                      <p className="text-[#111111] font-semibold">{agent.name}</p>
                      <p className="text-[11px] text-[#6B6B6B] uppercase tracking-wider">ID: #{agent.id.toString().padStart(4, '0')}</p>
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <p className="text-[#111111]">{agent.phone}</p>
                  <p className="text-[#6B6B6B] text-[12px]">{agent.email}</p>
                </td>

                {/* Specializations */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 max-w-[150px]">
                    {(agent.specializations || agent.specialties || []).slice(0, 2).map((spec, idx) => (
                      <span key={idx} className="bg-[#f8f6f2] text-[#a8874f] text-[10px] uppercase font-semibold px-2 py-0.5 rounded border border-[#e5e0d8] w-fit truncate">
                        {spec}
                      </span>
                    ))}
                    {(agent.specializations || agent.specialties || []).length > 2 && (
                       <span className="text-[10px] text-[#6B6B6B]">+{((agent.specializations || agent.specialties || []).length) - 2} more</span>
                    )}
                  </div>
                </td>

                {/* Experience & Listings */}
                <td className="px-6 py-4">
                  <p className="text-[#111111] font-medium mb-1">
                     {agent.experience_years || agent.experienceYears || 0} Years Exp.
                  </p>
                  <p className="text-[#6B6B6B] text-[12px]">
                     Active: <span className="font-semibold text-[#111111]">{agent.active_listings || agent.activeListings || 0}</span> | 
                     Sold: <span className="font-semibold text-[#111111]">{agent.total_sold || agent.plotsSold || 0}</span>
                  </p>
                </td>

                {/* Status Toggle */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      (agent.status || 'Active') === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${(agent.status || 'Active') === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {agent.status || 'Active'}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <ActionDropdown 
                      agent={agent}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onToggleStatus={onToggleStatus}
                      isOpen={openDropdownId === agent.id}
                      onToggle={setOpenDropdownId}
                    />
                  </div>
                </td>
              </tr>
            ))}

            {agents.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-[#6B6B6B]">
                  No agents found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentsTable;