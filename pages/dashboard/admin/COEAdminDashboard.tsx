
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useData } from '../../../context/DataContext';
import { DocumentTextIcon, LightbulbIcon, UsersIcon, AcademicCapIcon } from '../../../components/icons';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { mockCOEs } from '../../../data/mockData';
import { UserRole } from '../../../types';

const chartData = [
  { name: 'Jan', papers: 4, projects: 2 },
  { name: 'Feb', papers: 3, projects: 1 },
  { name: 'Mar', papers: 5, projects: 3 },
  { name: 'Apr', papers: 2, projects: 4 },
  { name: 'May', papers: 6, projects: 2 },
  { name: 'Jun', papers: 8, projects: 5 },
];

const StatCard = ({ title, value, icon, link }: { title: string; value: number | string; icon: React.ReactNode; link?: string }) => (
    <Card className="p-5 flex items-center transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
             {link && <NavLink to={link} className="text-sm text-orange-600 hover:underline">View</NavLink>}
        </div>
    </Card>
);

const COEAdminDashboard = () => {
    const { coeId } = useParams<{ coeId: string }>();
    const { users, projects } = useData();
    
    const currentCoe = mockCOEs.find(c => c.id === coeId);

    if (!currentCoe) {
        return <div>COE not found. Please go back to the <NavLink to="/admin" className="text-orange-600 underline">Admin Hub</NavLink>.</div>;
    }

    const coeFaculty = users.filter(u => u.coeId === coeId && u.role === UserRole.FACULTY).length;
    const coeStudents = users.filter(u => u.coeId === coeId && u.role === UserRole.STUDENT).length;

    const coeProjects = projects.filter(p => p.coeId === coeId);
    const proposedProjects = coeProjects.filter(p => p.progress === 'Proposed').length;
    const inProgressProjects = coeProjects.filter(p => p.progress === 'In Progress' || p.progress === 'Started').length;
    const completedProjects = coeProjects.filter(p => p.progress === 'Completed').length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">COE Leader Dashboard</h1>
            <p className="mt-1 text-gray-600">Overview for the {currentCoe.longName}.</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Faculty in CoE" value={coeFaculty} icon={<UsersIcon className="h-6 w-6"/>} />
                <StatCard title="Total Students in CoE" value={coeStudents} icon={<AcademicCapIcon className="h-6 w-6"/>} />
                <StatCard title="Proposed Projects" value={proposedProjects} icon={<DocumentTextIcon className="h-6 w-6"/>} link={`/admin/coe/${coeId}/projects`} />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <StatCard title="Total Projects" value={coeProjects.length} icon={<LightbulbIcon className="h-6 w-6"/>} />
                 <StatCard title="In Progress Projects" value={inProgressProjects} icon={<LightbulbIcon className="h-6 w-6"/>} />
                 <StatCard title="Completed Projects" value={completedProjects} icon={<LightbulbIcon className="h-6 w-6"/>} />
            </div>

            <div className="mt-8">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Activity</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="papers" fill="#ff951c" name="Publications" />
                                <Bar dataKey="projects" fill="#0A192F" name="New Projects" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

             <div className="mt-8">
                <Card className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Button variant="secondary">Create Announcement</Button>
                        <NavLink to={`/admin/coe/${coeId}/events/new`}>
                            <Button variant="success">Add New Event</Button>
                        </NavLink>
                         <NavLink to={`/admin/coe/${coeId}/users`}>
                            <Button variant="primary">Manage Users</Button>
                        </NavLink>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default COEAdminDashboard;
