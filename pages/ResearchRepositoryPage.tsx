import React, { useState } from 'react';
import { ResearchPaper, PaperStatus } from '../types';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { SearchIcon } from '../components/icons';
import Modal from '../components/common/Modal';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

const PaperListItem: React.FC<{ paper: ResearchPaper }> = ({ paper }) => (
  <Card className="p-6">
    <h3 className="text-lg font-bold text-blue-700">{paper.title}</h3>
    <p className="text-sm text-gray-600 mt-1">By {paper.authors.join(', ')} - {paper.publicationYear}</p>
    <p className="text-sm text-gray-500">{paper.department}</p>
    <p className="mt-3 text-gray-700 line-clamp-3">{paper.abstract}</p>
    <div className="mt-4 flex justify-between items-center">
      <a href={paper.fileUrl} download className="text-blue-600 font-semibold hover:underline">Download PDF</a>
      <span className="text-xs text-gray-400">DOI: {paper.doi}</span>
    </div>
  </Card>
);

// FIX: Changed ResearchRepositoryPage to a React.FC to fix a type error when used as a route element.
const ResearchRepositoryPage: React.FC = () => {
  const { isAuthenticated, role, user } = useAuth();
  const { papers, submitPaper } = useData();
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [publicationYear, setPublicationYear] = useState(new Date().getFullYear());
  const [department, setDepartment] = useState('');
  const [abstract, setAbstract] = useState('');
  const [doi, setDoi] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const approvedPapers = papers.filter(p => p.status === PaperStatus.APPROVED);

  const departments = ['All', ...Array.from(new Set(approvedPapers.map(p => p.department)))];
  const years = ['All', ...Array.from(new Set(approvedPapers.map(p => p.publicationYear.toString())))].sort().reverse();
  
  const filteredPapers = approvedPapers.filter(paper => 
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (departmentFilter === 'All' || paper.department === departmentFilter) &&
    (yearFilter === 'All' || paper.publicationYear.toString() === yearFilter)
  );
  
  const handleOpenModal = () => {
    if (user) {
        setAuthors(user.name); // Pre-fill author name
        setDepartment(user.department || ''); // Pre-fill department
    }
    setUploadModalOpen(true);
  };

  const resetAndCloseModal = () => {
    setTitle('');
    setAuthors('');
    setPublicationYear(new Date().getFullYear());
    setDepartment('');
    setAbstract('');
    setDoi('');
    setFile(null);
    setUploadModalOpen(false);
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !authors || !publicationYear || !department || !abstract) {
        addToast('Please fill all required fields.', 'error');
        return;
    }

    const newPaper = {
        title,
        authors: authors.split(',').map(a => a.trim()).filter(Boolean),
        publicationYear: Number(publicationYear),
        department,
        abstract,
        doi: doi || 'N/A',
    };

    submitPaper(newPaper);
    addToast('Paper submitted for review successfully!', 'success');
    resetAndCloseModal();
  };


  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Research Repository</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Access a repository of research papers and find resources for your next project.
          </p>
        </div>
        
        {/* Research Repository */}
        <div className="mt-12">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Research Papers</h2>
                {isAuthenticated && (role === UserRole.STUDENT || role === UserRole.FACULTY) && (
                    <Button onClick={handleOpenModal}>Upload Paper</Button>
                )}
            </div>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-white rounded-lg shadow">
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search papers..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <select onChange={(e) => setDepartmentFilter(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
                  {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <select onChange={(e) => setYearFilter(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md">
                   {years.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>)}
                </select>
              </div>
            </div>
            
            {/* Paper List */}
            <div className="space-y-6">
                {filteredPapers.length > 0 ? (
                    filteredPapers.map(paper => <PaperListItem key={paper.id} paper={paper} />)
                ) : (
                    <p className="text-center text-gray-500 py-10">No papers found matching your criteria.</p>
                )}
            </div>
        </div>
      </div>
       <Modal isOpen={isUploadModalOpen} onClose={resetAndCloseModal} title="Upload New Research Paper">
            <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">Paper Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="authors" className="block text-sm font-medium text-gray-300">Authors (comma-separated)</label>
                    <input type="text" id="authors" value={authors} onChange={e => setAuthors(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pubYear" className="block text-sm font-medium text-gray-300">Publication Year</label>
                        <input type="number" id="pubYear" value={publicationYear} onChange={e => setPublicationYear(Number(e.target.value))} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-300">Department</label>
                        <input type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="abstract" className="block text-sm font-medium text-gray-300">Abstract</label>
                    <textarea id="abstract" value={abstract} onChange={e => setAbstract(e.target.value)} required rows={4} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                </div>
                 <div>
                    <label htmlFor="doi" className="block text-sm font-medium text-gray-300">DOI</label>
                    <input type="text" id="doi" value={doi} onChange={e => setDoi(e.target.value)} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300">Upload File (PDF only)</label>
                    <input type="file" id="file-upload" accept=".pdf" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-accent/20 file:text-orange-300 hover:file:bg-orange-accent/30"/>
                </div>
                <div className="pt-4 flex justify-end space-x-3">
                    <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                    <Button type="submit" variant="primary">Submit for Review</Button>
                </div>
            </form>
        </Modal>
    </div>
  );
};

export default ResearchRepositoryPage;