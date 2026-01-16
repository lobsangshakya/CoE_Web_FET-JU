
import React, { createContext, useState, ReactNode, useContext, useCallback } from 'react';
import { ResearchPaper, Event, UserRole, PaperStatus, Project, User, EventStatus, ProjectProgress } from '../types';
import { mockPapers, mockEvents, mockProjects, mockUsersById } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { secureFetch } from '../services/apiService';

interface DataContextType {
  papers: ResearchPaper[];
  events: Event[];
  projects: Project[];
  users: User[];
  submitPaper: (paper: Omit<ResearchPaper, 'id' | 'status' | 'fileUrl' | 'submittedBy' | 'submissionDate'>) => void;
  updatePaperStatus: (paperId: string, status: PaperStatus) => void;
  createApprovedEvent: (event: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => void;
  proposeEvent: (event: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => void;
  updateEventStatus: (eventId: string, status: EventStatus) => void;
  registerForEvent: (eventId: string) => void;
  addProject: (project: Omit<Project, 'id' | 'imageUrl' | 'status' | 'progress' | 'proposerId' | 'assignedStudentIds' | 'team'>) => Promise<boolean>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<boolean>;
  addUser: (user: Omit<User, 'id' | 'avatarUrl' | 'coeId'>, coeId: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth(); // Assume useAuth provides firebase token in Phase 4
  const [papers, setPapers] = useState<ResearchPaper[]>(mockPapers);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [users, setUsers] = useState<User[]>(Object.values(mockUsersById));

  // Mocking token for demonstration - in production, this comes from firebase.auth().currentUser.getIdToken()
  const getAuthToken = async () => "MOCK_FIREBASE_TOKEN";

  const submitPaper = (paperData: Omit<ResearchPaper, 'id' | 'status' | 'fileUrl' | 'submittedBy' | 'submissionDate'>) => {
    if (!user) return;
    const newPaper: ResearchPaper = {
      ...paperData,
      id: `paper-${Date.now()}`,
      status: PaperStatus.PENDING,
      submittedBy: user.id,
      fileUrl: '#',
      submissionDate: new Date().toISOString(),
    };
    setPapers(prevPapers => [newPaper, ...prevPapers]);
  };

  const updatePaperStatus = (paperId: string, newStatus: PaperStatus) => {
    setPapers(prevPapers =>
        prevPapers.map(p => (p.id === paperId ? { ...p, status: newStatus } : p))
    );
  };
  
  const createApprovedEvent = (eventData: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => {
      const newEvent: Event = {
          ...eventData,
          id: `evt-${Date.now()}`,
          status: EventStatus.APPROVED,
          submittedBy: user?.id || 'user-3',
          coeId,
      };
      setEvents(prevEvents => [newEvent, ...prevEvents]);
  };
  
  const proposeEvent = (eventData: Omit<Event, 'id' | 'status' | 'submittedBy' | 'coeId'>, coeId: string) => {
    if (!user) return;
    const newEvent: Event = {
        ...eventData,
        id: `evt-${Date.now()}`,
        status: EventStatus.PENDING,
        submittedBy: user.id,
        coeId,
    };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
  };
  
  const updateEventStatus = (eventId: string, newStatus: EventStatus) => {
    setEvents(prevEvents =>
        prevEvents.map(e => (e.id === eventId ? { ...e, status: newStatus } : e))
    );
  };

  const registerForEvent = (eventId: string) => {
    if (!user) return;
    setEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          const registeredUsers = event.registeredUsers || [];
          if (!registeredUsers.includes(user.id)) {
            return { ...event, registeredUsers: [...registeredUsers, user.id] };
          }
        }
        return event;
      })
    );
  };

  const addProject = async (projectData: any) => {
    if(!user) return false;
    
    const token = await getAuthToken();
    const result = await secureFetch('submitProject', projectData, token);

    if (result.success) {
      const newProject: Project = {
          ...projectData,
          id: result.projectId,
          status: 'Ongoing',
          progress: 'Proposed',
          proposerId: user.id,
          assignedStudentIds: [],
          team: [user.name],
          imageUrl: `https://picsum.photos/seed/${result.projectId}/600/400`,
      };
      setProjects(prevProjects => [newProject, ...prevProjects]);
      return true;
    }
    return false;
  };

  const updateProject = async (projectId: string, updates: any) => {
    const token = await getAuthToken();
    
    // If it's an admin approval action
    if (updates.progress === 'Assigned' || updates.progress === 'Rejected') {
      const result = await secureFetch('approveProject', { 
        projectId, 
        status: updates.progress 
      }, token);
      
      if (!result.success) return false;
    }

    setProjects(prevProjects =>
        prevProjects.map(p => p.id === projectId ? { ...p, ...updates } : p)
    );
    return true;
  };

  const addUser = (userData: Omit<User, 'id' | 'avatarUrl' | 'coeId'>, coeId: string) => {
    const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        avatarUrl: `https://picsum.photos/seed/user${Date.now()}/100/100`,
        coeId,
    };
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  return (
    <DataContext.Provider value={{ 
      papers, events, projects, users, 
      submitPaper, updatePaperStatus, createApprovedEvent, 
      proposeEvent, updateEventStatus, registerForEvent, 
      addProject, updateProject, addUser 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
