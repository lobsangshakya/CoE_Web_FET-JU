
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../context/DataContext';
import Card from '../../components/common/Card';
import { NavLink } from 'react-router-dom';

const StudentDashboard = () => {
    const { user } = useAuth();
    const { projects, events } = useData();

    const myProjects = projects.filter(p => p.assignedStudentIds.includes(user?.id || ''));
    const registeredEvents = events.slice(0, 2);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <p className="mt-2 text-gray-600">Here's a summary of your activities at the Center of Excellence.</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* My Projects */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Projects</h2>
                        <ul className="mt-4 space-y-3">
                            {myProjects.length > 0 ? myProjects.slice(0,3).map(project => (
                                <li key={project.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <p className="font-medium text-gray-900">{project.title}</p>
                                        <p className="text-sm text-gray-500">Status: {project.progress}</p>
                                    </div>
                                    <NavLink to="/student/projects" className="text-orange-600 hover:underline text-sm font-semibold">View</NavLink>
                                </li>
                            )) : (
                                <p className="text-gray-500">You are not assigned to any projects yet.</p>
                            )}
                        </ul>
                         <NavLink to="/student/projects" className="text-orange-600 hover:underline text-sm font-semibold mt-4 inline-block">View All Projects &rarr;</NavLink>
                    </div>
                </Card>

                {/* My Events */}
                <Card>
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800">My Registered Events</h2>
                         <ul className="mt-4 space-y-3">
                            {registeredEvents.map(event => (
                                <li key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                                    <div>
                                        <p className="font-medium text-gray-900">{event.title}</p>
                                        <p className="text-sm text-gray-500">{event.date}</p>
                                    </div>
                                    <NavLink to="/student/events" className="text-orange-600 hover:underline text-sm font-semibold">Details</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default StudentDashboard;