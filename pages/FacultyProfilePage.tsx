
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockFacultyDataById } from '../data/mockFacultyData';
import { DocumentTextIcon, LightbulbIcon, PencilIcon } from '../components/icons';
import Card from '../components/common/Card';

const FacultyProfilePage = () => {
    const { facultyId } = useParams<{ facultyId: string }>();
    const faculty = facultyId ? mockFacultyDataById[facultyId] : undefined;

    if (!faculty) {
        return <Navigate to="/" replace />;
    }
    
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.85)), url('https://i.postimg.cc/9zH91CXP/download.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    return (
        <div style={backgroundStyle} className="min-h-screen pt-20 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Profile Header */}
                <Card className="p-8 bg-black/20 backdrop-blur-md border border-white/20 mb-12">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img 
                            src={faculty.imageUrl} 
                            alt={faculty.name}
                            className="h-48 w-48 rounded-full object-cover border-4 border-orange-500 shadow-lg"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-extrabold text-white">{faculty.name}</h1>
                            <p className="mt-2 text-xl text-orange-400 font-semibold">{faculty.title}</p>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Biography */}
                        <Card className="p-8 bg-black/20 backdrop-blur-md border border-white/20">
                            <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                                <PencilIcon className="h-7 w-7 mr-3 text-orange-400" />
                                About Me
                            </h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{faculty.description}</p>
                        </Card>
                        
                        {/* Research Projects */}
                        <Card className="p-8 bg-black/20 backdrop-blur-md border border-white/20">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                                <LightbulbIcon className="h-7 w-7 mr-3 text-orange-400" />
                                Research Projects
                            </h2>
                            <div className="space-y-6">
                                {faculty.projects.map((project, index) => (
                                    <div key={index} className="border-l-4 border-orange-500 pl-4">
                                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                        <p className="text-gray-300 mt-1">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Publications */}
                        <Card className="p-8 bg-black/20 backdrop-blur-md border border-white/20">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                                <DocumentTextIcon className="h-7 w-7 mr-3 text-orange-400" />
                                Publications
                            </h2>
                            <div className="space-y-4">
                                {faculty.publications.map((pub, index) => (
                                    <div key={index} className="bg-black/30 p-4 rounded-md">
                                        <h3 className="font-semibold text-white">{pub.title}</h3>
                                        <p className="text-sm text-gray-400 mt-1">Citations: {pub.citations} | DOI: {pub.doi}</p>
                                        <div className="mt-2 flex gap-4">
                                            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline text-sm font-medium">View Link</a>
                                            <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline text-sm font-medium">View PDF</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Sidebar for Research Interests */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                             <Card className="p-8 bg-black/20 backdrop-blur-md border border-white/20">
                                <h2 className="text-2xl font-bold text-white mb-4">Research Interests</h2>
                                <div className="flex flex-wrap gap-2">
                                    {faculty.researchInterests.map((interest, index) => (
                                        <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacultyProfilePage;
