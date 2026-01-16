
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { DataProvider } from './context/DataContext';
import { UserRole } from './types';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import DashboardLayout from './pages/dashboard/DashboardLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const COEHubPage = lazy(() => import('./pages/coe/COEHubPage'));
const COESubPage = lazy(() => import('./pages/coe/COESubPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ResearchRepositoryPage = lazy(() => import('./pages/ResearchRepositoryPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const CurrentProjectsPage = lazy(() => import('./pages/CurrentProjectsPage'));
const FacultyProfilePage = lazy(() => import('./pages/FacultyProfilePage'));


// Dashboards
const AdminHubPage = lazy(() => import('./pages/dashboard/admin/AdminHubPage'));
const COEAdminDashboard = lazy(() => import('./pages/dashboard/admin/COEAdminDashboard'));
const StudentDashboard = lazy(() => import('./pages/dashboard/StudentDashboard'));
const FacultyDashboard = lazy(() => import('./pages/dashboard/FacultyDashboard'));
const ApproveProjects = lazy(() => import('./pages/dashboard/admin/ApproveProjects'));
const ManageUsers = lazy(() => import('./pages/dashboard/admin/ManageUsers'));
const ManageEvents = lazy(() => import('./pages/dashboard/admin/ManageEvents'));
const CreateEventPage = lazy(() => import('./pages/dashboard/admin/CreateEventPage'));


// Student Dashboard Pages
const StudentProjectsPage = lazy(() => import('./pages/dashboard/student/StudentProjectsPage'));
const MyEvents = lazy(() => import('./pages/dashboard/student/MyEvents'));
const MyAchievements = lazy(() => import('./pages/dashboard/student/MyAchievements'));

// Faculty Dashboard Pages
const MyProjects = lazy(() => import('./pages/dashboard/faculty/MyProjects'));
const MyPublications = lazy(() => import('./pages/dashboard/faculty/MyPublications'));
const Mentorship = lazy(() => import('./pages/dashboard/faculty/Mentorship'));
const MyFacultyEvents = lazy(() => import('./pages/dashboard/faculty/MyEvents'));


const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-28">
      <Suspense fallback={<div className="flex justify-center items-center h-screen text-white">Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
);

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <DataProvider>
          <HashRouter>
            <Routes>
              {/* Main Site Routes with Header and Footer */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="coe" element={<COEHubPage />} />
                <Route path="coe/:coeId" element={<COESubPage />} />
                <Route path="blog" element={<CommunityPage />} />
                <Route path="research-repository" element={<ResearchRepositoryPage />} />
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:eventId" element={<EventDetailsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="current-projects" element={<CurrentProjectsPage />} />
                <Route path="faculty/:facultyId" element={<FacultyProfilePage />} />
              </Route>
              
              {/* Standalone Authentication Routes */}
              <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>} />
              <Route path="/signup" element={<Suspense fallback={<div>Loading...</div>}><SignupPage /></Suspense>} />


              {/* Admin Dashboard Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                    <Suspense fallback={<div className="flex h-full w-full items-center justify-center">Loading...</div>}>
                      <Outlet />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminHubPage />} />
                <Route path="coe/:coeId" element={<DashboardLayout><Outlet/></DashboardLayout>}>
                    <Route index element={<COEAdminDashboard />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="projects" element={<ApproveProjects />} />
                    <Route path="events" element={<ManageEvents />} />
                    <Route path="events/new" element={<CreateEventPage />} />
                </Route>
              </Route>

              {/* Student Dashboard Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <DashboardLayout><Outlet /></DashboardLayout>
                  </ProtectedRoute>
                }
              >
                <Route index element={<StudentDashboard />} />
                <Route path="projects" element={<StudentProjectsPage />} />
                <Route path="events" element={<MyEvents />} />
                <Route path="achievements" element={<MyAchievements />} />
              </Route>

              {/* Faculty Dashboard Routes */}
              <Route
                path="/faculty"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.FACULTY]}>
                    <DashboardLayout><Outlet /></DashboardLayout>
                  </ProtectedRoute>
                }
              >
                <Route index element={<FacultyDashboard />} />
                <Route path="projects" element={<MyProjects />} />
                <Route path="publications" element={<MyPublications />} />
                <Route path="events" element={<MyFacultyEvents />} />
                <Route path="mentorship" element={<Mentorship />} />
              </Route>

            </Routes>
          </HashRouter>
        </DataProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
