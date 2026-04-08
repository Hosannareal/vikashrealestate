import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { mockAgents } from '../../data/mockAgents';
import AgentsTable from '../../components/admin/AgentsTable';
import AddEditAgentModal from '../../components/admin/AddEditAgentModal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import CustomDropdown from '../../components/ui/CustomDropdown';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

// Helper to adapt existing mock data to new schema if needed, or we just map it.
const initialAdminAgents = mockAgents.map((agent, index) => ({
  id: index + 1,
  name: agent.name,
  phone: agent.phone || '+91 00000 00000',
  email: agent.email || 'agent@example.com',
  image: agent.image,
  location: agent.serviceAreas?.[0] || 'City',
  specializations: agent.specialties || ['Residential'],
  experience_years: agent.experienceYears || 5,
  total_sold: agent.plotsSold || 10,
  active_listings: agent.activeListings || 5,
  bio: agent.bio || '',
  status: index % 4 === 0 ? 'Inactive' : 'Active', // Mocking some inactive status
  active_properties: [],
  sold_properties: []
}));

const AdminAgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [specFilter, setSpecFilter] = useState('All Specializations');

  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState({ type: '', agent: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination mock
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Simulate initial fetch
    const fetchAgents = setTimeout(() => {
      setAgents(initialAdminAgents);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(fetchAgents);
  }, []);

  // Filtered Agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          agent.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All Status' || agent.status === statusFilter;
    const matchesSpec = specFilter === 'All Specializations' || agent.specializations.includes(specFilter);
    
    return matchesSearch && matchesStatus && matchesSpec;
  });

  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage) || 1;

  // Handlers
  const handleAddClick = () => {
    setEditingAgent(null);
    setIsAddEditOpen(true);
  };

  const handleEditClick = (agent) => {
    setEditingAgent(agent);
    setIsAddEditOpen(true);
  };

  const handleDeleteClick = (agent) => {
    setConfirmAction({ type: 'delete', agent });
    setIsConfirmOpen(true);
  };

  const handleToggleStatusClick = (agent) => {
    setConfirmAction({ type: 'toggle_status', agent });
    setIsConfirmOpen(true);
  };

  const handleConfirmAction = () => {
    setIsDeleting(true);
    const { type, agent } = confirmAction;

    setTimeout(() => {
      if (type === 'delete') {
        setAgents(prev => prev.filter(a => a.id !== agent.id));
        // Add toast here in real app
      } else if (type === 'toggle_status') {
        setAgents(prev => prev.map(a => 
          a.id === agent.id 
            ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } 
            : a
        ));
      }
      
      setIsDeleting(false);
      setIsConfirmOpen(false);
      setConfirmAction({ type: '', agent: null });
    }, 600);
  };

  const handleSaveAgent = (savedAgent) => {
    if (editingAgent) {
      // Update
      setAgents(prev => prev.map(a => a.id === savedAgent.id ? { ...a, ...savedAgent } : a));
    } else {
      // Create
      const newAgent = {
        ...savedAgent,
        id: Math.max(...agents.map(a => a.id), 0) + 1
      };
      setAgents([newAgent, ...agents]);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#f8f6f2] flex flex-col pt-6">
        <div className="flex-1 px-4 md:px-8 w-full max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#111111]">Agents Management</h1>
            <p className="text-[#6B6B6B] mt-1 text-sm">Manage all land & plot agents in your system.</p>
          </div>
          <button 
            onClick={handleAddClick}
            className="bg-[#C6A769] hover:bg-[#b0945b] text-white px-5 py-2.5 rounded-[10px] font-semibold text-sm transition shadow-sm flex items-center gap-2"
          >
            <Plus size={18} />
            Add Agent
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e0d8] mb-6 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#e5e0d8] rounded-[10px] focus:outline-none focus:border-[#C6A769] focus:ring-1 focus:ring-[#C6A769] text-sm"
            />
          </div>
          
          <div className="flex flex-wrap lg:flex-nowrap gap-4 flex-grow lg:flex-grow-0">
             <div className="w-[180px]">
                <CustomDropdown 
                  options={['All Status', 'Active', 'Inactive']}
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Status"
                />
             </div>
             <div className="w-[220px]">
                <CustomDropdown 
                  options={['All Specializations', 'Residential Plots', 'Commercial Land', 'Farm Land', 'Industrial Land']}
                  value={specFilter}
                  onChange={setSpecFilter}
                  placeholder="Specialization"
                />
             </div>
          </div>
        </div>

        {/* Table Section */}
        <AgentsTable 
          agents={paginatedAgents}
          isLoading={isLoading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onToggleStatus={handleToggleStatusClick}
        />

        {/* Pagination Controls */}
        {!isLoading && filteredAgents.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 px-2 gap-4">
             <p className="text-sm text-[#6B6B6B]">
               Showing <span className="font-semibold text-[#111111]">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-[#111111]">{Math.min(currentPage * itemsPerPage, filteredAgents.length)}</span> of <span className="font-semibold text-[#111111]">{filteredAgents.length}</span> entries
             </p>
             <div className="flex gap-2">
               <button 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className="px-3 py-1.5 rounded-[6px] bg-[#f3efe8] hover:bg-[#e5e0d8] text-sm text-[#111111] disabled:opacity-50 disabled:cursor-not-allowed transition"
               >
                 &larr; Prev
               </button>
               {Array.from({ length: totalPages }).map((_, i) => (
                 <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1.5 rounded-[6px] text-sm font-medium transition ${
                      currentPage === i + 1
                        ? 'bg-[#c5a46d] text-white shadow-sm'
                        : 'bg-[#f3efe8] text-[#111111] hover:bg-[#e5e0d8]'
                    }`}
                 >
                   {i + 1}
                 </button>
               ))}
               <button
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages}
                 className="px-3 py-1.5 rounded-[6px] bg-[#f3efe8] hover:bg-[#e5e0d8] text-sm text-[#111111] disabled:opacity-50 disabled:cursor-not-allowed transition"
               >
                 Next &rarr;
               </button>
             </div>
          </div>
        )}

      </div>

      {/* Modals */}
      <AddEditAgentModal 
        isOpen={isAddEditOpen} 
        onClose={() => setIsAddEditOpen(false)} 
        onSave={handleSaveAgent}
        editingAgent={editingAgent}
      />

      <ConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        isLoading={isDeleting}
        onConfirm={handleConfirmAction}
        title={confirmAction.type === 'delete' ? 'Delete Agent' : 'Change Status'}
        message={confirmAction.type === 'delete' 
          ? `Are you sure you want to delete ${confirmAction.agent?.name}? This action cannot be undone.` 
          : `Are you sure you want to ${confirmAction.agent?.status === 'Active' ? 'deactivate' : 'activate'} ${confirmAction.agent?.name}?`
        }
        confirmText={confirmAction.type === 'delete' ? 'Delete' : 'Confirm'}
        confirmColor={confirmAction.type === 'delete' ? 'bg-[#e53935]' : 'bg-[#C6A769]'}
      />

    </div>
      <Footer />
    </>
  );
};

export default AdminAgentsPage;
