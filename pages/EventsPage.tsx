import React from 'react';
import { NavLink } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Event, EventStatus } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { CalendarIcon, UsersIcon } from '../components/icons';

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <Card className="flex flex-col md:flex-row">
    <div className="p-6 md:w-1/4 bg-blue-50 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-gray-200">
        <p className="text-4xl font-bold text-blue-600">{new Date(event.date).getDate()}</p>
        <p className="text-lg font-semibold text-gray-700">{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
        <p className="text-sm text-gray-500">{new Date(event.date).getFullYear()}</p>
    </div>
    <div className="p-6 md:w-3/4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{event.type}</span>
        <h3 className="mt-3 text-xl font-bold text-gray-900">{event.title}</h3>
        <div className="mt-2 text-gray-600 space-y-1 text-sm">
            <p className="flex items-center"><CalendarIcon className="h-4 w-4 mr-2 text-gray-400" /> {event.time}</p>
            <p className="flex items-center"><UsersIcon className="h-4 w-4 mr-2 text-gray-400" /> {event.location}</p>
        </div>
        <p className="mt-3 text-gray-700">{event.description}</p>
        <div className="mt-4">
            <NavLink to={`/events/${event.id}`}>
                <Button>View Details</Button>
            </NavLink>
        </div>
    </div>
  </Card>
);

const EventsPage = () => {
  const { events } = useData();
  const approvedEvents = events.filter(event => event.status === EventStatus.APPROVED);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Events & Workshops</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Join our workshops, seminars, and hackathons to learn, innovate, and network.
          </p>
        </div>

        <div className="mt-12 space-y-8">
            {approvedEvents.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
        
        <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Event Calendar</h2>
            <p className="mt-2 text-gray-600">Explore our full event calendar for more details.</p>
             <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                 {/* Placeholder for a calendar component */}
                <p className="text-gray-500">Full calendar view coming soon...</p>
             </div>
        </div>

      </div>
    </div>
  );
};

export default EventsPage;