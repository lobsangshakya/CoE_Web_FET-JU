
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import { LightbulbIcon, UsersIcon } from '../../components/icons';

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
    <Card className="p-5 flex items-center">
        <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </Card>
);


const FacultyDashboard = () => {
    const { user } = useAuth();
    const { projects } = useData();
    
    const myProjects = projects.filter(p => p.proposerId === user?.id);
    const totalStudentsAssigned = myProjects.reduce((acc, p) => acc + p.assignedStudentIds.length, 0);
    const completedProjects = myProjects.filter(p => p.progress === 'Completed').length;
    const inProgressProjects = myProjects.length - completedProjects;


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="mt-2 text-gray-600">Your faculty dashboard for managing research and mentorship.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Projects Proposed" value={myProjects.length} icon={<LightbulbIcon className="h-6 w-6"/>} />
                <StatCard title="Total Students Assigned" value={totalStudentsAssigned} icon={<UsersIcon className="h-6 w-6"/>} />
                <StatCard title="Completed vs In-Progress" value={completedProjects} icon={<LightbulbIcon className="h-6 w-6"/>} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Projects */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Recent Projects</h2>
                        <ul className="mt-4 space-y-3">
                            {myProjects.slice(0, 5).map(project => (
                                <li key={project.id} className="p-3 bg-gray-50 rounded-md">
                                    <p className="font-medium text-gray-900">{project.title}</p>
                                    <p className="text-sm text-gray-500">Status: {project.progress}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>

                {/* My Publications */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Students</h2>
                         <ul className="mt-4 space-y-3">
                            {/* Placeholder for student list */}
                            <li className="p-3 bg-gray-50 rounded-md">
                                <p className="font-medium text-gray-900">Priya Sharma</p>
                                <p className="text-sm text-gray-500">Working on: Project Title 1</p>
                            </li>
                             <li className="p-3 bg-gray-50 rounded-md">
                                <p className="font-medium text-gray-900">Rohit Verma</p>
                                <p className="text-sm text-gray-500">Working on: Project Title 3</p>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default FacultyDashboard;