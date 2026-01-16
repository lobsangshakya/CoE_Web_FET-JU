
import React from 'react';
import { NavLink } from 'react-router-dom';
import { mockCOEs } from '../../../data/mockData';
import { COE } from '../../../types';
import * as Icons from '../../../components/icons';
import Button from '../../../components/common/Button';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
  CpuChipIcon: Icons.CpuChipIcon,
  ShieldCheckIcon: Icons.ShieldCheckIcon,
  CubeTransparentIcon: Icons.CubeTransparentIcon,
  CloudIcon: Icons.CloudIcon,
  CodeBracketSquareIcon: Icons.CodeBracketSquareIcon,
  SparklesIcon: Icons.SparklesIcon,
};

const COECard: React.FC<{ coe: COE }> = ({ coe }) => {
    const IconComponent = iconMap[coe.logoUrl] || Icons.SparklesIcon;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-6">
                <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <IconComponent className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{coe.longName}</h3>
                        <p className="text-sm text-gray-500">{coe.tagline}</p>
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <NavLink to={`/admin/coe/${coe.id}`}>
                        <Button>Manage COE</Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};


const AdminHubPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                     <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                     <p className="mt-1 text-gray-600">Select a Center of Excellence to manage.</p>

                    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {mockCOEs.map(coe => (
                            <COECard key={coe.id} coe={coe} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHubPage;
