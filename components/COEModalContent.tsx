
import React from 'react';
import { NavLink } from 'react-router-dom';
import { COE } from '../types';
import { mockUsersById } from '../data/mockData';
import { UsersIcon, AcademicCapIcon } from './icons';
import Button from './common/Button';

const COEModalContent: React.FC<{ coe: COE }> = ({ coe }) => {
    return (
        <div className="space-y-6 text-gray-300">
            {/* Leader Section */}
            <div className="flex flex-col sm:flex-row gap-6 bg-black/20 p-4 rounded-lg border border-white/20">
                <img src={coe.leader.imageUrl} alt={coe.leader.name} className="h-24 w-24 rounded-full object-cover border-4 border-orange-500/50 self-center sm:self-start" />
                <div>
                    <h3 className="text-xl font-bold text-white">{coe.leader.name}</h3>
                    <p className="text-orange-400 font-semibold">{coe.leader.title}</p>
                    <p className="mt-2 text-sm">{coe.leader.description}</p>
                </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg flex items-center gap-3">
                    <UsersIcon className="h-8 w-8 text-orange-400" />
                    <div>
                        <p className="text-2xl font-bold text-white">{coe.facultyIds.length}</p>
                        <p className="text-sm">Faculty Members</p>
                    </div>
                </div>
                <div className="bg-black/20 p-4 rounded-lg flex items-center gap-3">
                    <AcademicCapIcon className="h-8 w-8 text-orange-400" />
                    <div>
                        <p className="text-2xl font-bold text-white">{coe.studentIds.length}</p>
                        <p className="text-sm">Students Enrolled</p>
                    </div>
                </div>
            </div>

            {/* Faculty List */}
            <div>
                <h4 className="font-semibold text-gray-200 mb-2">Core Faculty</h4>
                <div className="max-h-40 overflow-y-auto bg-black/20 p-2 rounded-lg space-y-1">
                    {coe.facultyIds.slice(0, 5).map(id => {
                        const faculty = mockUsersById[id];
                        return faculty ? (
                            <p key={id} className="text-sm p-1 rounded hover:bg-white/10">{faculty.name}</p>
                        ) : null;
                    })}
                    {coe.facultyIds.length > 5 && <p className="text-sm p-1">... and more.</p>}
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <NavLink to={`/coe/${coe.id}`}>
                    <Button variant="primary">Visit Full COE Page</Button>
                </NavLink>
            </div>
        </div>
    );
};

export default COEModalContent;
