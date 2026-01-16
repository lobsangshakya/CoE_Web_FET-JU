
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { Event, EventStatus } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';

const MyEvents = () => {
    const { user } = useAuth();
    const { events, proposeEvent } = useData();
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'Workshop' | 'Hackathon' | 'Guest Lecture' | 'Seminar'>('Workshop');

    const myProposedEvents = events.filter(e => e.submittedBy === user?.id);

    const resetAndCloseModal = () => {
        setTitle('');
        setDate('');
        setTime('');
        setLocation('');
        setDescription('');
        setType('Workshop');
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !date || !time || !location || !description) {
            addToast('Please fill all fields.', 'error');
            return;
        }
        // FIX: Added check for user's coeId and passed it to proposeEvent.
        // The proposeEvent function requires the coeId as a second argument.
        if (!user?.coeId) {
            addToast('Cannot propose event: User COE not found.', 'error');
            return;
        }
        proposeEvent({ title, date, time, location, description, type }, user.coeId);
        addToast('Event proposed successfully! It is now pending admin approval.', 'success');
        resetAndCloseModal();
    };

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
                <h1 className="text-3xl font-bold text-gray-900">My Proposed Events</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Propose New Event</Button>
            </div>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {myProposedEvents.length > 0 ? myProposedEvents.map(event => (
                            <tr key={event.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                                    You have not proposed any events.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Propose a New Event">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Event Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
                            <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-300">Time</label>
                            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                         <label htmlFor="eventType" className="block text-sm font-medium text-gray-300">Event Type</label>
                         <select id="eventType" value={type} onChange={e => setType(e.target.value as any)} className="mt-1 block w-full bg-gray-800 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                             <option>Workshop</option>
                             <option>Hackathon</option>
                             <option>Guest Lecture</option>
                             <option>Seminar</option>
                         </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                        <Button type="submit" variant="primary">Submit for Approval</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MyEvents;
