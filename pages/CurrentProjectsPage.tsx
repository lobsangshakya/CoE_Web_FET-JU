
import React, { useState, useMemo } from 'react';

// --- NEW UNIFIED PROJECT DATA ---
const projects = [
    // Existing projects, refactored
    {
        id: 1,
        title: "Quantum-Resistant Cryptography Algorithms",
        description: "Developing and testing novel lattice-based cryptographic algorithms to secure communications against threats from future quantum computers.",
        category: "Quantum",
        status: "Ongoing",
        facultyLead: "Dr. Ananya Sharma",
        studentLead: "Tanvi Mehta",
    },
    {
        id: 2,
        title: "AI-Powered Predictive Maintenance for IoT",
        description: "Leveraging machine learning models to analyze real-time sensor data from industrial machinery, predicting failures before they occur to minimize downtime.",
        category: "IoT",
        status: "Ongoing",
        facultyLead: "Dr. Vikram Neerugatti",
        studentLead: "Diya Patel",
    },
    // --- NEW CYBERSECURITY BATCH DATA ---
    {
        id: 101,
        title: "WAFinabr",
        description: "A robust Web Application Firewall designed to filter, monitor, and block HTTP traffic to and from a web application. This project focuses on preventing attacks such as SQL injection and Cross-Site Scripting (XSS) by implementing custom rule sets and real-time threat analysis.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. R. Vijayanand",
        studentLead: "V. Adithya",
    },
    {
        id: 104,
        title: "Quantum Cryptanalysis in Action: Visualizing the Impact of Shor’s Algorithm",
        description: "An educational visualization tool demonstrating how Shor's Algorithm threatens classical RSA encryption. This project aims to demystify quantum computing concepts for cybersecurity students by simulating the integer factorization process.",
        category: "Quantum Security",
        status: "Ongoing",
        facultyLead: "Prof. Aniruddha Prabhu B.P.",
        studentLead: "Rohan Nayakanti",
    },
    {
        id: 105,
        title: "Password Auditor - Credential & WiFi Recovery Tool",
        description: "A comprehensive security auditing tool designed to test password strength and recover lost credentials from local systems and WiFi networks. The tool aids system administrators in identifying weak security policies.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Prof. Vasanth Ravi",
        studentLead: "Sarvesh T.S.",
    },
    {
        id: 106,
        title: "Custom USB Rubber Ducky with Active Threat Prevention for Windows",
        description: "Development of a custom keystroke injection tool to simulate physical access attacks, paired with a defensive Windows subsystem designed to detect and block rapid keystroke injection signatures.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. Sunanda Das",
        studentLead: "Abhishek Maurya",
    },
    {
        id: 107,
        title: "Early Network Intrusion Detection Using Attention Mechanism",
        description: "Implementing deep learning models with attention mechanisms to analyze network traffic patterns. The system focuses on detecting anomalies and zero-day attacks earlier than traditional signature-based IDS.",
        category: "AI in Security",
        status: "Ongoing",
        facultyLead: "Dr. R. Vijayanand",
        studentLead: "Adwaitha Ashuthosh",
    },
    {
        id: 108,
        title: "AI-Driven Cybersecurity for Monitoring Financial Transactions and Ensuring Regulatory Compliance",
        description: "An AI-based framework tailored for the fintech sector to detect fraudulent transactions in real-time while automatically generating compliance reports for regulatory bodies.",
        category: "AI in Security",
        status: "Ongoing",
        facultyLead: "Prof. Aniruddha Prabhu B.P.",
        studentLead: "Anagha Upadyaya",
    },
    {
        id: 109,
        title: "DeceptiNet: Autonomous Cyber Deception and Red Team Simulation Platform with AI-Driven Evasion",
        description: "A dynamic deception platform that deploys autonomous decoys to confuse attackers. It includes an AI-driven Red Team simulator to continuously test the efficacy of the deception strategy against evolving evasion techniques.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Prof. Aniruddha Prabhu B.P.",
        studentLead: "Vasvi N. Jain",
    },
    {
        id: 110,
        title: "Prompt Injection Defense",
        description: "Researching and developing defense mechanisms against prompt injection attacks in Large Language Models (LLMs). The project aims to sanitize inputs and validate outputs to prevent manipulation of AI behavior.",
        category: "Generative AI Security",
        status: "Ongoing",
        facultyLead: "Prof. Vasanth Ravi",
        studentLead: "Vidun Kumaran S.",
    },
    {
        id: 111,
        title: "Federated Learning for Privacy-Preserving Threat Detection",
        description: "A decentralized machine learning approach that trains threat detection models across multiple devices without sharing raw data. This ensures user privacy while improving the collective intelligence of the security system.",
        category: "AI in Security",
        status: "Ongoing",
        facultyLead: "Prof. Vasanth Ravi",
        studentLead: "V. Almas",
    },
    {
        id: 112,
        title: "CypherTrap: Tracking Threats Through Honeypot-IDS Integration",
        description: "An integrated security system combining high-interaction honeypots with Intrusion Detection Systems. CypherTrap lures attackers to isolate them while simultaneously analyzing their behavior to update IDS signatures.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. Ravikumar Sethuraman",
        studentLead: "Amoghavasha K.",
    },
    {
        id: 113,
        title: "VenomPot",
        description: "A specialized honeypot architecture designed to mimic vulnerable IoT devices. VenomPot collects payloads and exploit techniques used by botnets to enhance threat intelligence feeds.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Prof. Aniruddha Prabhu B.P.",
        studentLead: "G. Rohan Krishna",
    },
    {
        id: 114,
        title: "Secure Chat Application Using End-to-End Encryption",
        description: "A messaging application built with privacy-first principles, utilizing Signal Protocol for end-to-end encryption to ensure that only communicating users can read the messages.",
        category: "Cyber Security",
        status: "Completed",
        facultyLead: "Dr. Ambili K.N.",
        studentLead: "Gandikota Abhiram",
    },
    {
        id: 115,
        title: "Building a Simple Intrusion Detection System for Automobiles",
        description: "A lightweight IDS designed for the CAN bus protocol in vehicles. The system monitors vehicular network traffic to detect malicious injection of commands that could compromise vehicle safety.",
        category: "IoT Security",
        status: "Ongoing",
        facultyLead: "Dr. R. Vijayanand",
        studentLead: "Harshitha Arveti",
    },
    {
        id: 116,
        title: "Network Intrusion Detection and Response System with Integrated Firewall",
        description: "A holistic network security solution that couples detection algorithms with an automated response firewall. It instantly blocks IPs exhibiting malicious patterns identified by the detection engine.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. Harinee S.",
        studentLead: "Tenzin Chogyal",
    },
    {
        id: 117,
        title: "ARMED (Anti-Reverse Malware Engineering Defense)",
        description: "A suite of obfuscation and anti-debugging techniques designed to protect legitimate software from being reverse-engineered or tampered with by malicious actors.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. Harinee S.",
        studentLead: "Sutheekshan B.",
    },
    {
        id: 118,
        title: "Ransomware Detection and Response Using Machine Learning and Behavioral Analysis",
        description: "Utilizing behavioral analysis to identify ransomware activity, such as mass file encryption, in real-time. The system triggers automated backups and isolates infected endpoints to mitigate damage.",
        category: "AI in Security",
        status: "Ongoing",
        facultyLead: "Dr. Sunanda Das",
        studentLead: "Sreyashi Mallick",
    },
    {
        id: 119,
        title: "Automated Web Vulnerability Scanner",
        description: "A web crawler and scanner that automatically identifies common vulnerabilities like SQLi, XSS, and CSRF. It provides developers with detailed reports and remediation steps.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. Harinee S.",
        studentLead: "V. Megha Rao",
    },
    {
        id: 120,
        title: "HR Management DBMS Dashboard",
        description: "A secure Database Management System for HR operations featuring role-based access control (RBAC) and encryption of sensitive employee data to ensure GDPR compliance.",
        category: "Secure Software",
        status: "Completed",
        facultyLead: "Dr. Ravikumar Sethuraman",
        studentLead: "Nityasri Rajkumar Tirpude",
    },
    {
        id: 121,
        title: "Automatic Firewall Rules Configuration Based on Changes Inside the Network",
        description: "An adaptive security system that dynamically updates firewall rules based on changes in network topology or the detection of new services, reducing manual configuration errors.",
        category: "Cyber Security",
        status: "Ongoing",
        facultyLead: "Dr. Ambili K.N.",
        studentLead: "Arul Prasanth",
    },
    {
        id: 122,
        title: "Shadownet Sentinel: AI-Powered Threat Detection in Cloud Environments",
        description: "A cloud-native security tool leveraging AI to monitor shadow IT usage and detect anomalous behavior in cloud infrastructure, ensuring visibility and compliance.",
        category: "Cloud Security",
        status: "Ongoing",
        facultyLead: "Dr. Ambili K.N.",
        studentLead: "K. Sharath Chandra",
    }
];

// --- UPDATED ProjectCard Component ---
const ProjectCard: React.FC<{ project: typeof projects[0] }> = ({ project }) => {
    const statusColor = 
        project.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
        project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'; // For 'Proposed'

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900 pr-4 leading-tight">{project.title}</h2>
                <span className={`flex-shrink-0 px-3 py-1 text-xs font-semibold rounded-full self-start ${statusColor}`}>
                    {project.status}
                </span>
            </div>
            <div className="text-sm text-gray-500 mb-4 space-y-1">
                <p>Faculty Lead: <span className="font-medium text-orange-600">{project.facultyLead}</span></p>
                <p>Student Lead: <span className="font-medium text-orange-600">{project.studentLead}</span></p>
            </div>
            <p className="text-gray-700 flex-grow text-sm">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-dark-blue text-white">{project.category}</span>
            </div>
        </div>
    );
};

const CurrentProjectsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Projects');
    
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(projects.map(p => p.category))];
        return ['All Projects', ...uniqueCategories];
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All Projects') {
            return projects;
        }
        return projects.filter(project => project.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="bg-white min-h-screen pt-20 text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">Current Projects</h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                        A snapshot of the cutting-edge research and development happening at our Centers of Excellence.
                    </p>
                </div>

                {/* --- NEW Circular Category Filter --- */}
                <div className="mb-12">
                    <div className="flex items-center space-x-4 pb-4 overflow-x-auto">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex flex-col items-center justify-center flex-shrink-0 w-24 h-24 rounded-full transition-all duration-300 ease-in-out focus:outline-none transform hover:scale-105
                                    ${selectedCategory === category
                                        ? 'bg-dark-blue text-white shadow-lg border-2 border-orange-400'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`
                                }
                            >
                                <span className="text-sm font-semibold text-center px-1">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrentProjectsPage;
