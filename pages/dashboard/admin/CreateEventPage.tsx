
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const CreateEventPage = () => {
    const navigate = useNavigate();
    const { coeId } = useParams<{ coeId: string }>();
    const { createApprovedEvent } = useData();
    const { addToast } = useToast();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'Workshop' | 'Hackathon' | 'Guest Lecture' | 'Seminar'>('Workshop');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!coeId) {
            addToast('Could not create event. COE identifier is missing.', 'error');
            return;
        }

        const newEventData = {
            title,
            date,
            time,
            location,
            description,
            type,
        };

        createApprovedEvent(newEventData, coeId);
        addToast('Event created successfully!', 'success');
        navigate(`/admin/coe/${coeId}/events`);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Event</h1>
            <Card>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
                        <input type="text" id="eventName" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
                            <input type="date" id="eventDate" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        </div>
                        <div>
                            <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">Event Time</label>
                            <input type="time" id="eventTime" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                         <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">Event Type</label>
                         <select id="eventType" value={type} onChange={e => setType(e.target.value as any)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                             <option>Workshop</option>
                             <option>Hackathon</option>
                             <option>Guest Lecture</option>
                             <option>Seminar</option>
                         </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={5} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div className="pt-4 flex justify-end">
                        <Button type="submit" variant="primary">Create Event</Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateEventPage;