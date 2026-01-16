
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Project, ProjectLevel, ProjectProgress, User } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../../components/common/Modal';
import { mockCOEs, mockUsersById } from '../../../data/mockData';
import { UsersIcon } from '../../../components/icons';

const progressSteps: ProjectProgress[] = ['Assigned', 'Started', 'In Progress', 'Approval', 'Completed'];

const ProjectCard: React.FC<{ project: Project; onAssign: (p: Project) => void; onUpdateProgress: (p: Project, newProgress: ProjectProgress) => void; }> = ({ project, onAssign, onUpdateProgress }) => (
    <Card variant="elevated" className="flex flex-col">
        <img className="h-48 w-full object-cover" src={project.imageUrl} alt={project.title} />
        <div className="p-6 flex-grow flex flex-col">
            <div className="flex justify-between items-start">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full self-start ${
                    project.progress === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.progress === 'Proposed' ? 'bg-yellow-100 text-yellow-800' :
                    project.progress === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                }`}>{project.progress}</span>
                {project.progress !== 'Proposed' && project.progress !== 'Rejected' && (
                    <select
                        value={project.progress}
                        onChange={(e) => onUpdateProgress(project, e.target.value as ProjectProgress)}
                        className="text-xs bg-gray-200 border-gray-300 rounded"
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                    >
                        {progressSteps.map(step => <option key={step} value={step}>{step}</option>)}
                    </select>
                )}
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">{project.title}</h3>
            <p className="mt-2 text-gray-600 flex-grow line-clamp-3">{project.description}</p>
            <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Assigned Students</p>
                        <p className="text-sm text-gray-600">{project.assignedStudentIds.length} members</p>
                    </div>
                    <Button 
                        variant="secondary" 
                        onClick={() => onAssign(project)}
                        disabled={project.progress === 'Proposed' || project.progress === 'Rejected'}
                    >
                        <UsersIcon className="h-4 w-4 mr-2"/> Assign
                    </Button>
                </div>
            </div>
        </div>
    </Card>
);

const MyProjects = () => {
    const { user } = useAuth();
    const { projects, addProject, users, updateProject } = useData();
    const { addToast } = useToast();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [projectToAssign, setProjectToAssign] = useState<Project | null>(null);
    const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState<ProjectLevel>('UG');
    const [department, setDepartment] = useState(user?.department || 'Computer Science');
    const [coeId, setCoeId] = useState(user?.coeId || mockCOEs[0]?.id || 'ai-ml');

    const myProjects = projects.filter(p => p.proposerId === user?.id);
    const studentsInMyCOE = useMemo(() => users.filter(u => u.role === 'STUDENT' && u.coeId === user?.coeId), [users, user]);

    const handleOpenAssignModal = (project: Project) => {
        setProjectToAssign(project);
        setSelectedStudentIds(project.assignedStudentIds);
        setIsAssignModalOpen(true);
    };

    const handleAssignStudents = () => {
        if (!projectToAssign) return;
        const studentNames = selectedStudentIds.map(id => mockUsersById[id]?.name).filter(Boolean);
        const team = [user?.name || 'Faculty', ...studentNames];
        updateProject(projectToAssign.id, { assignedStudentIds: selectedStudentIds, team });
        addToast('Student assignments updated!', 'success');
        setIsAssignModalOpen(false);
        setProjectToAssign(null);
    };
    
    const handleUpdateProgress = (project: Project, newProgress: ProjectProgress) => {
        updateProject(project.id, { progress: newProgress });
        addToast(`Project status updated to "${newProgress}"`, 'success');
    };

    const resetAndCloseModal = () => {
        setTitle('');
        setDescription('');
        setLevel('UG');
        setDepartment(user?.department || 'Computer Science');
        setCoeId(user?.coeId || mockCOEs[0]?.id || 'ai-ml');
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            addToast('Please fill all fields.', 'error');
            return;
        }
        addProject({ title, description, level, department, coeId });
        addToast('New project proposed for approval!', 'success');
        resetAndCloseModal();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Propose New Project</Button>
            </div>
            
            {myProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onAssign={handleOpenAssignModal} onUpdateProgress={handleUpdateProgress} />
                    ))}
                </div>
            ) : (
                <Card><div className="p-6 text-center text-gray-500">You have not proposed any projects.</div></Card>
            )}

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Propose a New Project">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form fields from previous version, adjusted for new workflow */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Project Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    {/* Other fields like level, department etc. */}
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                        <Button type="submit" variant="primary">Submit for Approval</Button>
                    </div>
                </form>
            </Modal>
            
            <Modal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} title={`Assign Students to "${projectToAssign?.title}"`}>
                <div className="space-y-4">
                    <p className="text-gray-300">Select students from your COE to assign to this project.</p>
                    <div className="max-h-60 overflow-y-auto space-y-2 p-2 bg-black/20 rounded-md">
                        {studentsInMyCOE.map(student => (
                            <label key={student.id} className="flex items-center space-x-3 p-2 rounded hover:bg-white/10 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                    checked={selectedStudentIds.includes(student.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedStudentIds(prev => [...prev, student.id]);
                                        } else {
                                            setSelectedStudentIds(prev => prev.filter(id => id !== student.id));
                                        }
                                    }}
                                />
                                <span>{student.name}</span>
                            </label>
                        ))}
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</Button>
                        <Button type="button" variant="primary" onClick={handleAssignStudents}>Save Assignments</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyProjects;
