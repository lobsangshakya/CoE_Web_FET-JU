
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useData } from '../../../context/DataContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { mockUsersById } from '../../../data/mockData';
import { Project, ProjectProgress } from '../../../types';
import ProgressBar from '../../../components/common/ProgressBar';

const progressSteps: ProjectProgress[] = ['Assigned', 'Started', 'In Progress', 'Approval', 'Completed'];

const ProjectCard: React.FC<{ project: Project; isAssigned?: boolean }> = ({ project, isAssigned = false }) => {
    const proposer = mockUsersById[project.proposerId];
    return (
        <Card variant="elevated">
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Proposed by: <span className="font-semibold">{proposer?.name || 'Unknown'}</span></p>
                <p className="mt-3 text-gray-700 line-clamp-2">{project.description}</p>
                {isAssigned ? (
                    <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Your Progress</p>
                        <ProgressBar steps={progressSteps} currentStep={project.progress} />
                    </div>
                ) : (
                    <div className="mt-4 flex justify-end">
                        <Button>Request to Join</Button>
                    </div>
                )}
            </div>
        </Card>
    );
};

const StudentProjectsPage = () => {
    const [activeTab, setActiveTab] = useState<'assigned' | 'available'>('assigned');
    const { user } = useAuth();
    const { projects } = useData();

    const assignedProjects = useMemo(() => 
        projects.filter(p => p.assignedStudentIds.includes(user?.id || ''))
    , [projects, user]);

    const availableProjects = useMemo(() => 
        projects.filter(p => p.coeId === user?.coeId && p.progress === 'Assigned' && !p.assignedStudentIds.includes(user?.id || ''))
    , [projects, user]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Projects</h1>
            
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('assigned')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assigned' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Assigned Projects ({assignedProjects.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('available')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'available' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Available Projects ({availableProjects.length})
                    </button>
                </nav>
            </div>

            <div>
                {activeTab === 'assigned' && (
                    <div className="space-y-6">
                        {assignedProjects.length > 0 ? (
                            assignedProjects.map(project => <ProjectCard key={project.id} project={project} isAssigned />)
                        ) : (
                            <p className="text-center text-gray-500 py-10">You are not currently assigned to any projects.</p>
                        )}
                    </div>
                )}
                {activeTab === 'available' && (
                     <div className="space-y-6">
                        {availableProjects.length > 0 ? (
                            availableProjects.map(project => <ProjectCard key={project.id} project={project} />)
                        ) : (
                            <p className="text-center text-gray-500 py-10">There are no available projects in your COE right now.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentProjectsPage;
