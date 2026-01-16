
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { EventStatus } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { mockUsersById } from '../../../data/mockData';

const ManageEvents = () => {
    const { coeId } = useParams<{ coeId: string }>();
    const { events, updateEventStatus } = useData();
    const [filter, setFilter] = useState<EventStatus>(EventStatus.PENDING);

    const filteredEvents = events.filter(e => e.coeId === coeId && e.status === filter);
    
    const getStatusColor = (status: EventStatus) => {
        switch (status) {
            case EventStatus.APPROVED: return 'bg-green-100 text-green-800';
            case EventStatus.REJECTED: return 'bg-red-100 text-red-800';
            case EventStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
                <NavLink to={`/admin/coe/${coeId}/events/new`}>
                    <Button variant="primary">Create Approved Event</Button>
                </NavLink>
            </div>

            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button
                        onClick={() => setFilter(EventStatus.PENDING)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${filter === EventStatus.PENDING ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Pending Approval
                    </button>
                    <button
                        onClick={() => setFilter(EventStatus.APPROVED)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${filter === EventStatus.APPROVED ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Approved
                    </button>
                    <button
                        onClick={() => setFilter(EventStatus.REJECTED)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${filter === EventStatus.REJECTED ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Rejected
                    </button>
                </nav>
            </div>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted By</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            {filter === EventStatus.PENDING && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEvents.length > 0 ? filteredEvents.map(event => (
                            <tr key={event.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mockUsersById[event.submittedBy]?.name || 'Unknown'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </td>
                                {filter === EventStatus.PENDING && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Button variant="success" className="px-2 py-1 text-xs" onClick={() => updateEventStatus(event.id, EventStatus.APPROVED)}>Approve</Button>
                                            <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => updateEventStatus(event.id, EventStatus.REJECTED)}>Reject</Button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        )) : (
                           <tr>
                                <td colSpan={filter === EventStatus.PENDING ? 5 : 4} className="px-6 py-12 text-center text-gray-500">
                                    No events found in this category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ManageEvents;