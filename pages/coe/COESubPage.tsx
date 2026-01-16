


import React, { useState, useMemo } from 'react';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { mockCOEs, mockProjects, mockUsersById } from '../../data/mockData';
import { Project, ProjectLevel, ProjectProgress, User } from '../../types';
import * as Icons from '../../components/icons';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';

const coeLogoMap: { [key: string]: string } = {
    'ai-ml': 'https://i.postimg.cc/BZ71Rf5t/image.png',
    'cyber-security': 'https://i.postimg.cc/vZrTYJn9/image.png',
    'iot-robotics': 'https://i.postimg.cc/J0H79vm0/image.png',
    'networking-hpc': 'https://i.postimg.cc/XNt9p0rg/image.png',
    'theoretical-cs': 'https://i.postimg.cc/fbH9Z44d/image.png',
};

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
    <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-6 flex items-center gap-4 hover:bg-black/40 transition-colors">
        <div className="bg-orange-500/10 rounded-full p-3 border border-orange-500/30">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-gray-300">{label}</p>
        </div>
    </div>
);


const COESubPage = () => {
  const { coeId } = useParams();
  const [levelFilter, setLevelFilter] = useState<ProjectLevel | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const projectsPerPage = 7;

  const coe = useMemo(() => mockCOEs.find(c => c.id === coeId), [coeId]);
  const projectsForCOE = useMemo(() => mockProjects.filter(p => p.coeId === coeId), [coeId]);

  const filteredProjects = useMemo(() => {
    return projectsForCOE.filter(p => levelFilter === 'All' || p.level === levelFilter);
  }, [projectsForCOE, levelFilter]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (!coe) {
    return <Navigate to="/coe" replace />;
  }

  const facultyMembers = coe.facultyIds.map(id => mockUsersById[id]).filter(Boolean);
  const projectLevels: ProjectLevel[] = ['University', 'National', 'SIH', 'Internal'];
  const progressSteps: ProjectProgress[] = ['Proposed', 'Assigned', 'Started', 'In Progress', 'Approval', 'Completed'];

  return (
    <div className="bg-transparent min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/20 pb-8">
          <div className="bg-white rounded-full p-5 border-4 border-orange-500">
             <img 
                src={coeLogoMap[coe.id] || coe.logoUrl}
                alt={`${coe.longName} Logo`}
                className="h-24 w-24 object-contain"
            />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{coe.longName}</h1>
            <p className="mt-2 text-lg text-gray-300">Exploring the frontiers of {coe.name}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Leader Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Led By</h2>
              <div className="flex flex-col sm:flex-row gap-6 bg-black/20 p-6 rounded-lg border border-white/20">
                <img src={coe.leader.imageUrl} alt={coe.leader.name} className="h-32 w-32 rounded-full object-cover border-4 border-orange-500/50" />
                <div>
                  <h3 className="text-2xl font-bold">{coe.leader.name}</h3>
                  <p className="text-orange-400 font-semibold">{coe.leader.title}</p>
                  <p className="mt-3 text-gray-300">{coe.leader.description}</p>
                </div>
              </div>
            </section>
            
            {/* Stats Section */}
            <section className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <StatCard icon={<Icons.UsersIcon className="h-8 w-8 text-orange-400" />} value={`${coe.facultyIds.length}`} label="Faculty Enrolled" />
                    <StatCard icon={<Icons.AcademicCapIcon className="h-8 w-8 text-orange-400" />} value={`${coe.studentIds.length}`} label="Students Enrolled" />
                </div>
            </section>

            {/* Projects Section */}
            <section className="mt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold">Projects</h2>
                <div className="relative">
                  <select 
                    value={levelFilter} 
                    onChange={e => {
                      setLevelFilter(e.target.value as any);
                      setCurrentPage(1);
                    }}
                    className="bg-gray-800 border border-white/30 rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-orange-accent appearance-none"
                  >
                    <option value="All">All Levels</option>
                    {projectLevels.map(level => <option key={level} value={level}>{level} Level</option>)}
                  </select>
                  <Icons.ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Project Title (PS)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Proposed By</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {paginatedProjects.map(project => (
                                <tr key={project.id} onClick={() => setSelectedProject(project)} className="hover:bg-white/10 cursor-pointer transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">{project.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{mockUsersById[project.proposerId]?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-500/20 text-gray-300">
                                            {project.level}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                  <div className="mt-6 flex justify-between items-center">
                    <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</Button>
                    <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
                    <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                  </div>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside>
            <div className="sticky top-28 space-y-8">
              <div className="bg-black/20 p-6 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold mb-4">Registered Faculty</h3>
                <ul className="space-y-1 max-h-[40rem] overflow-y-auto pr-2">
                  {facultyMembers.map(faculty => (
                    <li key={faculty.id}>
                      <NavLink
                        to={`/faculty/${faculty.id}`}
                        className="w-full flex items-start gap-3 p-2 rounded-md hover:bg-white/10 transition-colors text-left"
                        aria-label={`View profile for ${faculty.name}`}
                      >
                        <img src={faculty.avatarUrl} alt={faculty.name} className="h-10 w-10 rounded-full flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold">{faculty.name}</p>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {selectedProject && (
        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject.title}>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-200">Description</h4>
              <p className="text-gray-300 bg-black/20 p-3 rounded-md mt-1">{selectedProject.description}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-200">Proposed By</h4>
              <p className="text-gray-300 mt-1">{mockUsersById[selectedProject.proposerId]?.name || 'Unknown'}</p>
            </div>
            {selectedProject.assignedStudentIds.length > 0 && (
                <div>
                    <h4 className="font-semibold text-gray-200">Assigned Students</h4>
                    <ul className="list-disc list-inside text-gray-300 mt-1">
                        {selectedProject.assignedStudentIds.map(id => (
                            <li key={id}>{mockUsersById[id]?.name || 'Unknown Student'}</li>
                        ))}
                    </ul>
                </div>
            )}
             <div>
              <h4 className="font-semibold text-gray-200 mb-4">Project Progress</h4>
              <ProgressBar steps={progressSteps} currentStep={selectedProject.progress} />
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setSelectedProject(null)}>Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default COESubPage;
