
import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import { CalendarIcon, UsersIcon } from '../components/icons';

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const { events, registerForEvent } = useData();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const event = useMemo(() => events.find(e => e.id === eventId), [events, eventId]);

  useEffect(() => {
    if (isAuthenticated && user) {
        setName(user.name);
        setEmail(user.email);
    }
  }, [isAuthenticated, user, isRegisterModalOpen]);

  if (!event) {
    return <Navigate to="/events" replace />;
  }
  
  const isRegistered = useMemo(() => {
    if (!user || !event.registeredUsers) return false;
    return event.registeredUsers.includes(user.id);
  }, [user, event]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
        if (!name || !email) {
            addToast('Please enter your name and email.', 'error');
            return;
        }
        addToast(`Registration successful for ${name}!`, 'success');
        setIsRegisterModalOpen(false);
        return;
    }
    registerForEvent(event.id);
    addToast('Registration successful! See you there.', 'success');
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card variant="elevated">
          <div className="p-8">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-orange-accent/10 text-orange-accent">{event.type}</span>
            <h1 className="mt-4 text-4xl font-extrabold text-gray-900">{event.title}</h1>
            
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 text-gray-600">
                <p className="flex items-center"><CalendarIcon className="h-5 w-5 mr-2 text-gray-400" /> {event.date} at {event.time}</p>
                <p className="flex items-center"><UsersIcon className="h-5 w-5 mr-2 text-gray-400" /> {event.location}</p>
            </div>

            <div className="mt-8 prose max-w-none text-gray-700">
                <p>{event.description}</p>
            </div>

            <div className="mt-10">
                <Button 
                    className="w-full sm:w-auto text-lg px-8 py-4"
                    onClick={() => setIsRegisterModalOpen(true)}
                    disabled={isRegistered}
                >
                    {isRegistered ? 'Registered ✓' : 'Register Now'}
                </Button>
            </div>
          </div>
        </Card>
      </div>

      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} title={`Register for ${event.title}`}>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                    readOnly={isAuthenticated}
                    className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm read-only:opacity-70" />
              </div>
              <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    readOnly={isAuthenticated}
                    className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm read-only:opacity-70" />
              </div>
              <div className="pt-4 flex justify-end">
                  <Button type="submit" variant="primary">Confirm Registration</Button>
              </div>
          </form>
      </Modal>
    </div>
  );
};

export default EventDetailsPage;
