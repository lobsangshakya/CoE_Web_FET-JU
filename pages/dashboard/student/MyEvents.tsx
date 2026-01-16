import React from 'react';
import { useData } from '../../../context/DataContext';
import { useAuth } from '../../../hooks/useAuth';
import { Event } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { CalendarIcon, UsersIcon } from '../../../components/icons';
import { NavLink } from 'react-router-dom';

// FIX: Changed EventCard to a React.FC to fix an issue where the 'key' prop was being incorrectly assigned, causing a type error.
const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <Card variant="elevated">
        <div className="p-6">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-accent/10 text-orange-accent">{event.type}</span>
            <h3 className="mt-3 text-xl font-bold text-gray-900">{event.title}</h3>
            <div className="mt-2 text-gray-600 space-y-1 text-sm">
                <p className="flex items-center"><CalendarIcon className="h-4 w-4 mr-2 text-gray-400" /> {event.date} at {event.time}</p>
                <p className="flex items-center"><UsersIcon className="h-4 w-4 mr-2 text-gray-400" /> {event.location}</p>
            </div>
            <p className="mt-3 text-gray-700">{event.description}</p>
            <div className="mt-4">
                <Button variant="secondary">Download Certificate</Button>
            </div>
        </div>
    </Card>
);

const MyEvents = () => {
    const { user } = useAuth();
    const { events } = useData();

    const registeredEvents = events.filter(event => 
        event.registeredUsers?.includes(user?.id || '')
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Registered Events</h1>
            {registeredEvents.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {registeredEvents.map((event: Event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <Card>
                    <div className="p-6 text-center text-gray-500">
                        You are not registered for any upcoming events. Explore the <NavLink to="/events" className="text-orange-accent underline hover:text-orange-400">Events page</NavLink> to find some!
                    </div>
                </Card>
            )}
        </div>
    );
};

export default MyEvents;