import React from 'react';
import { mockUsersById, mockProjects } from '../../../data/mockData';
import { User, UserRole } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const Mentorship = () => {
    // Mock data: Students mentored by the current faculty member
    const mentoredStudents = [
        mockUsersById['user-1'], 
        mockUsersById['user-4'],
        mockUsersById['user-5'],
    ].filter(Boolean);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentorship Overview</h1>
            
            <Card>
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">My Mentees</h2>
                    <ul className="divide-y divide-gray-200">
                        {mentoredStudents.map(student => (
                            <li key={student.id} className="py-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <img className="h-10 w-10 rounded-full" src={student.avatarUrl} alt={student.name} />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                        <p className="text-sm text-gray-500">{student.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">Project: {mockProjects[1].title}</p>
                                    <Button variant="secondary" className="mt-1 px-2 py-1 text-xs">View Progress</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default Mentorship;
