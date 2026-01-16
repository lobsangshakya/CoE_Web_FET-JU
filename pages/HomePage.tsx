
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { mockProjects, mockAnnouncements, mockEvents, mockCOEs } from '../data/mockData';
import { COE } from '../types';
import { TrophyIcon, SearchIcon, HandshakeIcon, GlobeIcon, CalendarIcon, UsersIcon, ChevronDownIcon } from '../components/icons';
import Card from '../components/common/Card';

// IMPROVED: StatItem component with darker glass, border, and enhanced icons
const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) => (
    <div className="p-6 text-center flex flex-col items-center justify-center group 
                   bg-black/20 backdrop-blur-md border border-white/30 
                   rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl
                   transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
        
        {/* Improvised Icon Container */}
        <div className="mb-4 bg-orange-500/10 rounded-full p-4 border border-orange-500/30 transition-all duration-300 group-hover:bg-orange-500/20 group-hover:border-orange-500/50">
            <div className="text-orange-400 transition-transform duration-300 group-hover:scale-110">{icon}</div>
        </div>
        
        <p className="text-4xl font-bold text-white">{value}</p>
        <p className="text-gray-300 mt-1">{label}</p>
    </div>
);

// NEW: CommitteeMemberCard component
const CommitteeMemberCard: React.FC<{ name: string; title: string }> = ({ name, title }) => (
    <div className="bg-black/20 backdrop-blur-md border border-white/30 rounded-lg p-6 text-center transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-orange-400 mt-1">{title}</p>
    </div>
);

// NEW: AccordionItem component
const AccordionItem: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/20 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 px-4 text-left text-lg font-semibold text-white hover:bg-white/10 transition-colors"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40' : 'max-h-0'
                }`}
            >
                <div className="p-4 bg-black/20 text-gray-300">
                    {children}
                </div>
            </div>
        </div>
    );
};

const executiveCommittee = [
    { name: 'Dr. Kamlesh Tiwari', title: 'HoD / CSE' },
    { name: 'Dr. Deepak Sinha', title: 'Professor / CSE' },
    { name: 'Dr. A. Suresh Kumar', title: 'Professor / CSE' },
    { name: 'Dr. T. R. Mahesh', title: 'Associate Professor' }
];

const coeLeaders = [
    { title: 'AI & ML CoE', content: 'Dr. Swati Gupta – AI & ML CoE Leader' },
    { title: 'Cyber & Systems Security CoE', content: 'Dr. Sunanda Das – Cyber & Systems Security CoE Leader' },
    { title: 'IoT, Robotics & Emerging Tech CoE', content: 'Dr. Vikram Neerugatti – IoT, Robotics & Emerging Tech CoE Leader' },
    { title: 'Networking & HPC CoE', content: 'Dr. Nishant Tripathi – Networking & HPC CoE Leader' },
    { title: 'Theoretical CS CoE', content: 'Dr. Subhankar Ghosal – Theoretical CS CoE Leader' }
];

const coeLogoMap: { [key: string]: string } = {
    'ai-ml': 'https://i.postimg.cc/BZ71Rf5t/image.png',
    'cyber-security': 'https://i.postimg.cc/vZrTYJn9/image.png',
    'iot-robotics': 'https://i.postimg.cc/J0H79vm0/image.png',
    'networking-hpc': 'https://i.postimg.cc/XNt9p0rg/image.png',
    'theoretical-cs': 'https://i.postimg.cc/fbH9Z44d/image.png',
};

const HomePage = () => {
    const featuredProject = mockProjects[0];
    const latestAnnouncement = mockAnnouncements[0];
    const upcomingEvent = mockEvents[0];
    
    const newEvents = [
        { title: 'AI in Healthcare Webinar', date: '2024-10-15', category: 'WEBINAR', day: '15', month: 'OCT' },
        { title: 'Cybersecurity Workshop Series', date: '2024-10-22', category: 'WORKSHOP', day: '22', month: 'OCT' },
        { title: 'Annual Robotics Competition', date: '2024-11-01', category: 'COMPETITION', day: '01', month: 'NOV' },
        { title: 'Guest Lecture: Quantum Computing', date: '2024-11-10', category: 'LECTURE', day: '10', month: 'NOV' },
    ];

    const getCategoryTagStyle = (category: string) => {
        switch (category) {
            case 'WEBINAR': return 'bg-blue-500/50 text-blue-200';
            case 'WORKSHOP': return 'bg-purple-500/50 text-purple-200';
            case 'COMPETITION': return 'bg-green-500/50 text-green-200';
            case 'LECTURE': return 'bg-indigo-500/50 text-indigo-200';
            default: return 'bg-gray-500/50 text-gray-200';
        }
    };
    
    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.7), rgba(10, 25, 47, 0.7)), url('https://i.postimg.cc/9zH91CXP/download.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
    };

    return (
        <div style={backgroundStyle}>
            <section className="pt-12 pb-8 text-center">
                <div className="flex items-center justify-center gap-3 sm:gap-4 px-4">
                    <div className="h-16 m:h-20 lg:h-24 flex-shrink-0">
                        <img
                            src="https://i.postimg.cc/zv1LJqfk/image.png"
                            alt="Center of Excellence Logo"
                            className="h-full w-auto"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center [text-shadow:1px_1px_2px_#cc6e00,-1px_-1px_2px_#cc6e00,1px_-1px_2px_#cc6e00,-1px_1px_2px_#cc6e00]">
                                The Department of Computer Science and Engineering
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white text-center [text-shadow:1px_1px_2px_#cc6e00,-1px_-1px_2px_#cc6e00,1px_-1px_2px_#cc6e00,-1px_1px_2px_#cc6e00] mt-1">
                            Center of Excellence
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        <div className="lg:w-3/4">
                            {/* Modified CoE Layout: 3 Top, 2 Bottom Centered */}
                            <div className="flex flex-col gap-6">
                                {/* Top Row: 3 Items */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {mockCOEs.slice(0, 3).map(coe => (
                                        <NavLink
                                            key={coe.id}
                                            to={`/coe/${coe.id}`}
                                            className="group text-center p-6 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:shadow-orange-glow"
                                            aria-label={`Navigate to ${coe.name} page`}
                                        >
                                            <div className="flex justify-center mb-4">
                                                <img 
                                                    src={coeLogoMap[coe.id] || coe.logoUrl}
                                                    alt={`${coe.name} Logo`}
                                                    className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{coe.name}</h3>
                                            <p className="text-sm text-gray-400 mt-1">{coe.longName}</p>
                                        </NavLink>
                                    ))}
                                </div>
                                {/* Bottom Row: 2 Items Centered */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {/* Offset div for centering on medium+ screens */}
                                    <div className="hidden sm:block"></div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:col-span-2 sm:-ml-[50%]">
                                        {mockCOEs.slice(3, 5).map(coe => (
                                            <NavLink
                                                key={coe.id}
                                                to={`/coe/${coe.id}`}
                                                className="group text-center p-6 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg transition-all duration-300 hover:bg-black/40 hover:scale-105 hover:shadow-orange-glow"
                                                aria-label={`Navigate to ${coe.name} page`}
                                            >
                                                <div className="flex justify-center mb-4">
                                                    <img 
                                                        src={coeLogoMap[coe.id] || coe.logoUrl}
                                                        alt={`${coe.name} Logo`}
                                                        className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                </div>
                                                <h3 className="text-xl font-bold text-white">{coe.name}</h3>
                                                <p className="text-sm text-gray-400 mt-1">{coe.longName}</p>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section (25%) - Creative Events Panel */}
                        <div className="lg:w-1/4">
                             <div className="h-full flex flex-col bg-black/20 backdrop-blur-md border border-white/30 rounded-lg p-6">
                                <h3 className="text-2xl font-bold text-white mb-6">Events & Notifications</h3>
                                <div className="space-y-4 flex-grow overflow-y-auto pr-2">
                                     {newEvents.map((event, index) => (
                                        <div key={index} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="flex-shrink-0 text-center bg-orange-accent/80 rounded-md p-2 w-16">
                                                <p className="text-2xl font-bold text-white">{event.day}</p>
                                                <p className="text-xs font-semibold text-white uppercase">{event.month}</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white leading-tight">{event.title}</p>
                                                <span className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getCategoryTagStyle(event.category)}`}>{event.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <NavLink to="/events" className="text-orange-400 font-semibold border-2 border-orange-400 rounded-full px-6 py-2 text-sm transition-all duration-300 hover:bg-orange-400 hover:text-dark-blue">
                                        View All
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Impact at a Glance</h2>
                        <p className="mt-4 text-lg text-gray-300">Driving innovation and excellence across disciplines.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatItem icon={<SearchIcon className="h-12 w-12" />} value="200+" label="Faculty Enrolled" />
                        <StatItem icon={<HandshakeIcon className="h-12 w-12" />} value="12+" label="Industry Collaborations" />
                        <StatItem icon={<TrophyIcon className="h-12 w-12" />} value="25+" label="Papers Published" />
                        <StatItem icon={<GlobeIcon className="h-12 w-12" />} value="40+" label="International Patents" />
                    </div>
                </div>
            </section>
            
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    <div>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Executive Committee</h2>
                            <p className="mt-4 text-lg text-gray-300">Guiding the vision and strategy of the Center of Excellence.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {executiveCommittee.map(member => <CommitteeMemberCard key={member.name} name={member.name} title={member.title} />)}
                        </div>
                    </div>
                    <div>
                         <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Center of Excellence in FETJU</h2>
                            <p className="mt-4 text-lg text-gray-300">Fostering specialized research and innovation across key domains.</p>
                        </div>
                         <div className="max-w-3xl mx-auto bg-black/20 backdrop-blur-md border border-white/30 rounded-lg overflow-hidden">
                            {coeLeaders.map(leader => <AccordionItem key={leader.title} title={leader.title}>{leader.content}</AccordionItem>)}
                         </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-dark-blue mb-12">Highlights</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card variant="elevated">
                            <img className="h-48 w-full object-cover" src={featuredProject.imageUrl} alt={featuredProject.title} />
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-orange-accent">Featured Project</h3>
                                <p className="mt-2 text-xl font-bold text-dark-blue">{featuredProject.title}</p>
                                <p className="mt-2 text-gray-600 line-clamp-3">{featuredProject.description}</p>
                            </div>
                        </Card>

                        <Card variant="elevated">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-orange-accent">Latest News</h3>
                                <p className="mt-2 text-xl font-bold text-dark-blue">{latestAnnouncement.title}</p>
                                <p className="mt-1 text-sm text-gray-500">{latestAnnouncement.date} - {latestAnnouncement.category}</p>
                                <p className="mt-2 text-gray-600 line-clamp-4">{latestAnnouncement.content}</p>
                                <NavLink to="/blog" className="mt-4 inline-block text-orange-accent font-semibold hover:text-orange-400 transition-colors">Read more &rarr;</NavLink>
                            </div>
                        </Card>

                        <Card variant="elevated">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-orange-accent">Upcoming Event</h3>
                                <p className="mt-2 text-xl font-bold text-dark-blue">{upcomingEvent.title}</p>
                                <div className="mt-2 text-gray-600 space-y-1">
                                    <p className="flex items-center"><CalendarIcon className="h-5 w-5 mr-2 text-gray-500" /> {upcomingEvent.date}</p>
                                    <p className="flex items-center"><UsersIcon className="h-5 w-5 mr-2 text-gray-500" /> {upcomingEvent.location}</p>
                                </div>
                                <p className="mt-2 text-gray-600 line-clamp-3">{upcomingEvent.description}</p>
                                <NavLink to="/events" className="mt-4 inline-block text-orange-accent font-semibold hover:text-orange-400 transition-colors">View details &rarr;</NavLink>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
