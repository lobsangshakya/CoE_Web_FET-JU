
import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { mockUsersById } from '../../../data/mockData';

const ApproveProjects = () => {
    const { projects, updateProject } = useData();
    const { coeId } = useParams<{ coeId: string }>();

    const proposedProjects = projects.filter(p => p.coeId === coeId && p.progress === 'Proposed');

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Approve New Projects</h1>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposed By</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {proposedProjects.length > 0 ? proposedProjects.map(project => {
                            const proposer = mockUsersById[project.proposerId];
                            return (
                                <tr key={project.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{project.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proposer?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            {project.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="success"
                                                className="px-2 py-1 text-xs"
                                                onClick={() => updateProject(project.id, { progress: 'Assigned' })}
                                            >Approve</Button>
                                            <Button
                                                variant="danger"
                                                className="px-2 py-1 text-xs"
                                                onClick={() => updateProject(project.id, { progress: 'Rejected' })}
                                            >Reject</Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : (
                           <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    No new projects awaiting approval.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ApproveProjects;