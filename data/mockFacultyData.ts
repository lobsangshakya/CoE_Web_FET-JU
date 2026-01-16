
export interface FacultyProject {
    title: string;
    description: string;
    team?: string[];
}

export interface FacultyPublication {
    title: string;
    citations: string;
    link: string;
    doi: string;
    pdfUrl: string; // Placeholder
}

export interface FacultyProfile {
    id: string; // URL-friendly unique ID
    name: string;
    title: string;
    imageUrl: string;
    description: string;
    projects: FacultyProject[];
    publications: FacultyPublication[];
    researchInterests: string[];
}

export const mockFacultyProfiles: FacultyProfile[] = [
    {
        id: 'swati-gupta',
        name: 'Dr. Swati Gupta',
        title: 'Assistant Professor | AI & ML CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=swati',
        description: "Dr. Swati Gupta is currently serving as an Assistant Professor in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Jain University. She earned her Ph.D. in Computer Science and Engineering from the Indian Institute of Technology (IIT) Roorkee in 2019 and completed her M.Tech. in Information Technology from the Indian Institute of Information Technology (IIIT) Allahabad in 2014. Her research interests span across Text Mining, Natural Language Processing (NLP), Computer Vision, Machine Learning, and Deep Learning. She has disseminated her research findings through publications in reputed international journals and conferences, including NeurIPS, HyperText, and Knowledge and Information Systems (KAIS).",
        projects: [
            {
                title: 'Ethical AI Framework for Autonomous Systems',
                description: 'Researching and defining a comprehensive ethical framework and decision-making model for autonomous vehicles.',
                team: ['Priya Singh']
            },
            {
                title: 'Federated Learning for Medical Image Analysis',
                description: 'Creating a decentralized machine learning model that allows multiple hospitals to collaboratively train an AI for disease detection.',
                team: ['Kavya Murthy']
            }
        ],
        publications: [
            {
                title: 'A Novel Approach to Sentiment Analysis in Low-Resource Languages',
                citations: 'NeurIPS 2022',
                link: '#',
                doi: '10.1109/NEURIPS.2022.01234',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Text Mining', 'Natural Language Processing', 'Computer Vision', 'Machine Learning', 'Deep Learning']
    },
    {
        id: 'sunanda-das',
        name: 'Dr. Sunanda Das',
        title: 'Professor | Cyber & Systems Security CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=sunanda',
        description: "Dr. Sunanda Das is a leading expert in cybersecurity with a focus on blockchain technology, network forensics, and malware analysis. With over 15 years of experience in both academia and industry, her work aims to build resilient and secure digital infrastructures. She mentors numerous student teams in developing practical security tools.",
        projects: [
            {
                title: 'Custom USB Rubber Ducky with Active Threat Prevention for Windows',
                description: 'Development of a custom keystroke injection tool to simulate physical access attacks, paired with a defensive Windows subsystem.',
                team: ['Abhishek Maurya', 'Nilesh Dutta', 'Vaibhav Dhonde']
            },
            {
                title: 'Ransomware Detection and Response Using Machine Learning',
                description: 'Utilizing behavioral analysis to identify ransomware activity in real-time and trigger automated backups.',
                team: ['Sreyashi Mallick', 'Sreya S. Kumar', 'Twisha Arvind Arali']
            },
            {
                title: 'Decentralized Digital Identity using Blockchain',
                description: 'Implementation of a self-sovereign identity system on a permissioned blockchain.',
                team: ['Vikram Kumar']
            }
        ],
        publications: [
            {
                title: 'Scalable and Secure Voting Systems Using Blockchain',
                citations: 'IEEE Security & Privacy, 2020',
                link: '#',
                doi: '10.1109/MSP.2020.2989761',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Blockchain Security', 'Network Forensics', 'Malware Analysis', 'Threat Intelligence']
    },
    {
        id: 'vikram-neerugatti',
        name: 'Dr. Vikram Neerugatti',
        title: 'Associate Professor | IoT, Robotics & Emerging Tech CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=vikram',
        description: "Dr. Vikram Neerugatti, an Associate Professor at JAIN (Deemed-to-be University)'s School of Computer Science and Engineering, brings over 14 years of teaching experience. His research areas encompass the Internet of Things, Augmented Reality and Virtual Reality, Fog/Edge Computing, and AI.",
        projects: [
            {
                title: 'AI-Powered Predictive Maintenance for IoT',
                description: 'Leveraging machine learning models to analyze real-time sensor data from industrial machinery.',
                team: ['Diya Patel']
            },
            {
                title: 'VR Simulation for Surgical Training',
                description: 'Building an immersive virtual reality environment for medical students.',
                team: ['Aarav Sharma']
            }
        ],
        publications: [
            {
                title: 'Energy-Efficient Routing Protocols for Wireless Sensor Networks',
                citations: 'ACM Transactions on Sensor Networks, 2019',
                link: '#',
                doi: '10.1145/3310328',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Internet of Things (IoT)', 'AR/VR', 'Fog/Edge Computing', 'Machine Learning']
    },
    {
        id: 'nishant-tripathi',
        name: 'Dr. Nishant Tripathi',
        title: 'Associate Professor | Networking & HPC CoE Lead',
        imageUrl: 'https://i.pravatar.cc/200?u=nishant',
        description: "Dr. Nishant Tripathi is an academician and researcher with over 16 years of experience. His research spans distributed systems, scalable networks, wireless communication, IoT, cloud security, and high-performance computing (HPC).",
        projects: [
            {
                title: 'High-Performance Computing for Genomic Sequencing',
                description: 'Utilizing parallel computing and advanced algorithms on HPC clusters.',
                team: ['Karan Verma']
            }
        ],
        publications: [
            {
                title: 'Performance Analysis of Load Balancing Algorithms in Cloud Computing',
                citations: 'IEEE Transactions on Parallel and Distributed Systems, 2021',
                link: '#',
                doi: '10.1109/TPDS.2021.3061412',
                pdfUrl: '#'
            }
        ],
        researchInterests: ['Distributed Systems', 'Scalable Networks', 'HPC', 'Cloud Security']
    },
    {
        id: 'r-vijayanand',
        name: 'Dr. R. Vijayanand',
        title: 'Professor | Cyber Security',
        imageUrl: 'https://i.pravatar.cc/200?u=vijayanand',
        description: "Dr. R. Vijayanand is a distinguished Professor specializing in Network Security and Intrusion Detection Systems. He focuses on developing practical, real-time defense mechanisms against evolving cyber threats in web and automotive environments.",
        projects: [
            {
                title: 'WAFinabr',
                description: 'A robust Web Application Firewall designed to filter, monitor, and block HTTP traffic to prevent SQLi and XSS.',
                team: ['V. Adithya', 'Madhav Ram K M']
            },
            {
                title: 'Early Network Intrusion Detection Using Attention Mechanism',
                description: 'Implementing deep learning models with attention mechanisms to detect zero-day attacks.',
                team: ['Adwaitha Ashuthosh', 'Basireddy Jahnavi']
            },
            {
                title: 'Building a Simple Intrusion Detection System for Automobiles',
                description: 'A lightweight IDS designed for the CAN bus protocol to detect malicious command injection.',
                team: ['Harshitha Arveti', 'S. Vijay', 'R. Vasthick']
            }
        ],
        publications: [],
        researchInterests: ['Intrusion Detection', 'Network Security', 'Automotive Security', 'Web Application Security']
    },
    {
        id: 'aniruddha-prabhu',
        name: 'Prof. Aniruddha Prabhu B.P.',
        title: 'Professor | Quantum & AI Security',
        imageUrl: 'https://i.pravatar.cc/200?u=aniruddha',
        description: "Prof. Aniruddha Prabhu B.P. leads research initiatives at the intersection of Artificial Intelligence and Quantum Computing within Cybersecurity. His work involves developing autonomous defense platforms and educational tools for next-gen cryptography.",
        projects: [
            {
                title: 'Quantum Cryptanalysis in Action',
                description: 'Visualizing the Impact of Shor’s Algorithm on classical encryption.',
                team: ['Rohan Nayakanti', 'Kurapati Harshith', 'Maneeth Dhananjaya']
            },
            {
                title: 'AI-Driven Cybersecurity for Financial Transactions',
                description: 'An AI-based framework for detecting fraudulent transactions in fintech.',
                team: ['Anagha Upadyaya', 'Amogha Upadyaya', 'S. Thanmai Sree']
            },
            {
                title: 'DeceptiNet: Autonomous Cyber Deception',
                description: 'A dynamic deception platform with AI-driven Red Team simulation.',
                team: ['Vasvi N. Jain', 'Dhrutikkumar Patel', 'Daksh Sharma']
            },
            {
                title: 'VenomPot',
                description: 'A specialized honeypot architecture designed to mimic vulnerable IoT devices.',
                team: ['G. Rohan Krishna', 'Darshan Parappagoudar', 'Ganesh R']
            }
        ],
        publications: [],
        researchInterests: ['Quantum Cryptography', 'AI in Security', 'Cyber Deception', 'FinTech Security']
    },
    {
        id: 'vasanth-ravi',
        name: 'Prof. Vasanth Ravi',
        title: 'Professor | Application Security',
        imageUrl: 'https://i.pravatar.cc/200?u=vasanth',
        description: "Prof. Vasanth Ravi specializes in Application Security and Privacy-Preserving AI. His research focuses on securing large language models, auditing credentials, and implementing federated learning for threat detection.",
        projects: [
            {
                title: 'Password Auditor - Credential & WiFi Recovery Tool',
                description: 'Security auditing tool to test password strength and recover lost credentials.',
                team: ['Sarvesh T.S.', 'Chirag Anil Ramamurthy', 'Krish Gupta']
            },
            {
                title: 'Prompt Injection Defense',
                description: 'Defense mechanisms against prompt injection attacks in Large Language Models.',
                team: ['Vidun Kumaran S.', 'Nikhil A']
            },
            {
                title: 'Federated Learning for Privacy-Preserving Threat Detection',
                description: 'Decentralized machine learning to train threat models without sharing raw data.',
                team: ['V. Almas', 'Premkrishna Padmanabhan', 'Daniel Moses']
            }
        ],
        publications: [],
        researchInterests: ['LLM Security', 'Federated Learning', 'Credential Auditing', 'Privacy']
    },
    {
        id: 'ravikumar-sethuraman',
        name: 'Dr. Ravikumar Sethuraman',
        title: 'Professor | Secure Software Systems',
        imageUrl: 'https://i.pravatar.cc/200?u=ravikumar',
        description: "Dr. Ravikumar Sethuraman focuses on Secure Software Engineering and integrated security systems. His projects range from secure database management to integrating honeypots with Intrusion Detection Systems.",
        projects: [
            {
                title: 'CypherTrap: Tracking threats through Honeypot-IDS integration',
                description: 'Integrated security system combining honeypots with IDS.',
                team: ['Amoghavasha K.', 'Likith R']
            },
            {
                title: 'HR Management DBMS Dashboard',
                description: 'Secure DBMS featuring role-based access control and encryption.',
                team: ['Nityasri Rajkumar Tirpude', 'Sunkara Bharadwaj', 'Suriyanarayanan P.K.']
            }
        ],
        publications: [],
        researchInterests: ['Software Security', 'Honeypots', 'Secure DBMS']
    },
    {
        id: 'ambili-kn',
        name: 'Dr. Ambili K.N.',
        title: 'Professor | Network & Cloud Security',
        imageUrl: 'https://i.pravatar.cc/200?u=ambili',
        description: "Dr. Ambili K.N. is an expert in Network Security and Cloud Infrastructure protection. Her work emphasizes automated security configurations, secure communication protocols, and AI-powered threat detection in cloud environments.",
        projects: [
            {
                title: 'Secure Chat Application using End-to-End Encryption',
                description: 'Messaging app utilizing Signal Protocol for privacy.',
                team: ['Gandikota Abhiram', 'Sadhu Kartheek Reddy', 'K. Bhavana']
            },
            {
                title: 'Automatic firewall rules configuration',
                description: 'Adaptive system updating firewall rules based on network changes.',
                team: ['Arul Prasanth', 'Manoj Babu', 'Kamalesh']
            },
            {
                title: 'Shadownet Sentinel: AI-Powered Threat Detection in Cloud',
                description: 'Cloud-native tool using AI to monitor shadow IT and detect anomalies.',
                team: ['K. Sharath Chandra', 'Rithvik G.S.']
            }
        ],
        publications: [],
        researchInterests: ['Cloud Security', 'Network Automation', 'Secure Communication']
    },
    {
        id: 'harinee-s',
        name: 'Dr. Harinee S.',
        title: 'Professor | Cyber Defense',
        imageUrl: 'https://i.pravatar.cc/200?u=harinee',
        description: "Dr. Harinee S. specializes in defensive cybersecurity strategies, including anti-reverse engineering techniques and automated vulnerability scanning. Her projects aim to harden systems against sophisticated intrusions.",
        projects: [
            {
                title: 'Network Intrusion Detection and Response System',
                description: 'Holistic security solution coupling detection algorithms with an automated firewall.',
                team: ['Tenzin Chogyal', 'Tanish C', 'Rishav Ranjan']
            },
            {
                title: 'ARMED (Anti-Reverse Malware Engineering Defense)',
                description: 'Obfuscation techniques to protect software from reverse-engineering.',
                team: ['Sutheekshan B.', 'Maalavika S', 'Priya P. Prabhu']
            },
            {
                title: 'Automated Web Vulnerability Scanner',
                description: 'Web crawler identifying common vulnerabilities like SQLi and XSS.',
                team: ['V. Megha Rao', 'Mohamed Farhaan K', 'Dharun D']
            }
        ],
        publications: [],
        researchInterests: ['Malware Defense', 'Vulnerability Assessment', 'Network Defense']
    }
];

export const mockFacultyDataById = mockFacultyProfiles.reduce((acc, faculty) => {
    acc[faculty.id] = faculty;
    return acc;
}, {} as { [key: string]: FacultyProfile });
