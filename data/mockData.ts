
import { Project, ResearchPaper, Announcement, Event, PaperStatus, Achievement, User, CommunityPost, UserRole, EventStatus, COE } from '../types';
import { rawStudentData } from './mockStudents';

// --- NEW FACULTY DATA STRUCTURE ---
const facultyData: { [key: string]: { name: string; coes: string[]; description: string } } = {
    // AI & ML
    'n-satheesh': { name: 'Dr. N. Satheesh', coes: ['ai-ml', 'networking-hpc'], description: "Dr. N. Satheesh is an accomplished academician and researcher with a Ph.D. in Computer Science and Engineering from Karpagam University. With over 18 years of teaching, research, and administrative experience, he has significantly contributed to higher education through leadership in accreditation, curriculum development, and R&D initiatives. His expertise spans Artificial Intelligence, Machine Learning, IoT, Cybersecurity, and Wireless Networks." },
    'aishwarya-r': { name: 'Ms. Aishwarya R', coes: ['ai-ml'], description: "Aishwarya R is an Assistant Professor in Jain University. She holds a master's degree in CSE and has experience in both teaching and industry. Her academic areas of interest include Data Science, Software engineering and HCI/UI-UX design." },
    'devaraj-verma-c': { name: 'Dr. Devaraj Verma C', coes: ['ai-ml'], description: "Dr. Devaraj Verma C is a Professor of Computer Science and Engineering at Jain (Deemed-to-be University) with over 23 years of academic, research, and leadership experience. His vision for a Center of Excellence in Artificial Intelligence and Machine Learning is to foster cutting-edge research, drive interdisciplinary collaboration, strengthen industry-academia partnerships, and nurture talent to address real-world challenges through AI-driven solutions." },
    'sunena-rose-m-v': { name: 'Mrs. Sunena Rose M V', coes: ['ai-ml'], description: "I have over six years of experience spanning teaching and research, with a strong foundation in computer science and applied machine learning. My work emphasizes developing efficient, accurate, and deployable AI models to support early diagnosis in real-world clinical settings. My long-term goal is to contribute to the advancement of intelligent systems that can address critical challenges in medicine and beyond." },
    'sankar-k': { name: 'Dr. Sankar K', coes: ['ai-ml'], description: "I am an enthusiastic Artificial Intelligence and Machine Learning (AIML) professional with strong foundations in data-driven problem solving, algorithm design, and model deployment. My expertise spans supervised and unsupervised learning, deep learning, and natural language processing. I have a keen interest in transforming complex datasets into meaningful insights and building intelligent systems that add real-world value." },
    'a-suresh-kumar': { name: 'Dr. A Suresh Kumar', coes: ['ai-ml'], description: "Having 20+ years of teaching and research experience, Dr. Suresh Kumar Arumugam has published 15 SCI articles and more than 40 Scopus articles in peer reviewed journals. His main research interest is in the area of Wireless Sensor Network, Internet of Things, Artificial Intelligence and Machine Learning." },
    'shivam-swarup': { name: 'Dr. Shivam Swarup', coes: ['ai-ml', 'cyber-security', 'iot-robotics', 'networking-hpc'], description: "A results-driven professional proficient in AI/ML-based programming languages, including Python (OpenCV, TensorFlow, Keras), RStudio, and IBM SPSS, and skilled in developing various Machine Learning and Deep Learning models. Also has over 4 years of experience in Software development and testing." },
    'jayashri-abhayakumar-inchal': { name: 'Dr. Jayashri Abhayakumar Inchal', coes: ['ai-ml', 'theoretical-cs'], description: "With over 20 years of teaching experience, her primary research interests lie in Image Processing, Artificial Intelligence, Machine Learning, and Deep Learning, with her work consistently aligning with cutting-edge advancements in these domains." },
    's-nagaraj': { name: 'Dr. S. Nagaraj', coes: ['ai-ml'], description: "With 15 years of teaching experience, he has published over 10 papers in renowned international and national journals. His research interests include Data Analytics, Fuzzy Systems, Machine Learning, and Deep Learning." },
    // Cyber Security
    'harinee-s': { name: 'Dr. Harinee. S', coes: ['cyber-security'], description: "Dr. S. Harinee is a dedicated researcher specializing in the convergence of cybersecurity, machine learning, and healthcare informatics. Her work emphasizes the role of secure and intelligent systems in safeguarding sensitive medical data and ensuring trustworthy clinical decision-making. With a strong command of cryptographic principles, threat modeling, and defensive cybersecurity strategies, she focuses on bridging the gap between technical innovation and real-world applicability." },
    'preeti-gupta': { name: 'Dr. Preeti Gupta', coes: ['cyber-security', 'networking-hpc'], description: "I preeti gupta wants to work in \"Networking in High Performance Computing\". I have done two papers on Networking protocols, analyze their performance based on scalability, letancy, bandwidth, packet loss, jitter etc. I can also work in Cyber and system security. I have written research paper on blockchain security and IoT security." },
    'n-priya': { name: 'Dr. N Priya', coes: ['cyber-security'], description: "Dr. Priya N is an esteemed cybersecurity and blockchain researcher with a strong academic background. She has CompTIA Security + SY0-701 certification. She has certified blockchain expert and certified blockchain architect certifications. Her research interests span blockchain technology, cyber forensics, web application security, and malware analysis within educational institutions." },
    'ravikumar-sethuraman': { name: 'Dr. Ravikumar Sethuraman', coes: ['cyber-security'], description: "I have completed my PhD in CSE and my specialization is Sofware Safety and Security. I have published 21 SCI journals and 28 Scopus. My area of interest is Cyber Security." },
    // Added for Project Data Integration
    'r-vijayanand': { name: 'Dr. R. Vijayanand', coes: ['cyber-security'], description: "Professor specializing in Network Security, WAF, and Intrusion Detection Systems." },
    'aniruddha-prabhu': { name: 'Prof. Aniruddha Prabhu B.P.', coes: ['cyber-security', 'theoretical-cs'], description: "Professor focusing on Quantum Cryptography, AI in Security, and Cyber Deception." },
    'vasanth-ravi': { name: 'Prof. Vasanth Ravi', coes: ['cyber-security'], description: "Specialist in Application Security, LLM Defense, and Privacy-Preserving AI." },
    'ambili-kn': { name: 'Dr. Ambili K.N.', coes: ['cyber-security', 'networking-hpc'], description: "Expert in Cloud Security, Network Automation, and Secure Communications." },
    
    // IoT
    'somashekhara-reddy-d': { name: 'Dr. Somashekhara Reddy D', coes: ['iot-robotics'], description: "I have around 20 years of experience from both industry and Teaching and completed my PhD in Mobile Communication." },
    'ajay-kumar-singh': { name: 'Dr. Ajay Kumar Singh', coes: ['iot-robotics'], description: "His area of interest is Artificial Intelligence, Data Science, Cloud Computing and Networking. He has published 72 research papers 5 international patents and presented his paper in India and abroad." },
    'sowmya-m-s': { name: 'Dr. Sowmya M S', coes: ['iot-robotics'], description: "I have 16 plus years of teaching experience in building knowledge for Engineering students in the domain of Computer science & Engineering and Information Science & Engineering. I have five Scopus indexed and 1 Web of Science indexed publications and 15plus good impact journal publications. I have 3 patents published in IPR." },
    'puja-das': { name: 'Ms. Puja Das', coes: ['iot-robotics'], description: "I’m doing research in blockchain and cybersecurity. Interested to explore cybersecurity space." },
    // Networking
    'suriya-prakash': { name: 'Dr. Suriya Prakash', coes: ['networking-hpc'], description: "Dr. Suriya Prakash J is a dedicated academician and researcher currently serving at JAIN (Deemed-to-be University), Bengaluru. His research interests include Distributed Databases, Cloud Computing, Computer Networks, and the integration of modern computing paradigms into real-world problem-solving." },
    'shajahan-b': { name: 'Dr. Shajahan B', coes: ['networking-hpc'], description: "He is a goal-oriented professional with nearly 20+ years of experience in Teaching Operations and research. He has published 30+ research papers, books, and patents. His research focus is on developing a security framework in Wireless network and computational intelligence." },
    // Theoretical CS
    'abhisek-midya': { name: 'Ms. Abhisek Midya', coes: ['theoretical-cs'], description: "Research interest : Automata & Logic. Research experience : Scientific researcher in the SWS group, Radboud university, The Netherlands. Junior research fellow : Theoretical computer science group, VIT Vellore. Pursuing phd : BITS Pilani, Goa - working in automata on infinite words." },
    'sonal-sharma': { name: 'Dr. Sonal Sharma', coes: ['theoretical-cs'], description: "Dr. Sonal Sharma, having 18+ years of experience in teaching Computer Science subjects. Her research area is Artificial Intelligence, Cloud Computing, Cyber Security, and Nature Inspired Algorithm. She published more than 25 papers in Journals, International Conferences. She got so many awards for her research activities including Dynamic Professor of the Year 2024." },
    'narasimhayya-b-e': { name: 'Mr. Narasimhayya B E', coes: ['theoretical-cs'], description: "I am Narasimhayya B E from CSE AI. My area of research is Reinforcement learning for energy efficient systems. Subjects that i am good with are Programming languages like Java and python, Web programming had exposure for ASP.net of web application development." },
    's-saravanakumar': { name: 'Dr. S Saravanakumar', coes: ['theoretical-cs'], description: "Dr. S. Saravanakumar is an Associate Professor in the School of Computer Science & Engineering. His research contributions include 50 international journal papers published in platforms such as SCI, SCOPUS, and UGC CARE. He has presented 60 research papers at international conferences." },
    'b-swaminathan': { name: 'Dr. B. Swaminathan', coes: ['theoretical-cs'], description: "My areas of interest are Cloud Computing. He extensively published papers in multi attribute decision making mechanism for peer selection in collaborative peer-to-peer systems and papers in Artificial Engineering." },
    'shobha-h-r': { name: 'Ms Shobha H R', coes: ['theoretical-cs'], description: "My areas of interest include Artificial Intelligence, Machine lLearning, Deep Learning, Quantum Computing, Internet of Things, Cyber Security, and Theoretical Computer Science. I believe in nurturing critical thinking, creativity, and holistic growth among students." },
};

const createNewFacultyUser = (id: string, data: { name: string; coes: string[]; description: string }): User => ({
    id: `faculty-${id}`, // Note: This prefix strategy is used for auto-generated, but some manual overrides exist below
    name: data.name,
    email: `${id}@jain.com`,
    role: UserRole.FACULTY,
    avatarUrl: `https://i.pravatar.cc/100?u=${id}`,
    department: 'Computer Science & Engineering',
    coeId: data.coes[0],
    description: data.description,
});

const newFacultyPool: User[] = Object.entries(facultyData).map(([id, data]) => createNewFacultyUser(id, data));

// --- NEW STUDENT DATA PROCESSING ---
const associationToCoeIdMap: { [key: string]: string } = {
    'AI & ML': 'ai-ml',
    'Cyber & Systems Security': 'cyber-security',
    'IoT, Robotics & Emerging Tech': 'iot-robotics',
    'Networking & HPC': 'networking-hpc',
    'Theoretical CS': 'theoretical-cs',
};

// Create User objects from the new raw data
const newStudentPool: User[] = rawStudentData.map(student => {
    const id = student.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return {
        id: `student-${id}`,
        name: student.name,
        email: `${id}@jain.com`,
        role: UserRole.STUDENT,
        avatarUrl: student.imageUrl,
        department: student.year,
        coeId: associationToCoeIdMap[student.association],
        description: student.role, 
    };
});


const getFacultyIdsForCOE = (coeId: string): string[] => {
    return Object.entries(facultyData)
        .filter(([, data]) => data.coes.includes(coeId))
        .map(([id]) => `faculty-${id}`); // This aligns with the createNewFacultyUser ID generation
};

const allUsers: User[] = [
    { id: 'user-2', name: 'Dr. Ramesh Kumar', email: 'faculty@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=ramesh', department: 'Electronics Engineering', coeId: 'ai-ml' },
    { id: 'user-3', name: 'Admin', email: 'admin@jain.com', role: UserRole.ADMIN, avatarUrl: 'https://i.pravatar.cc/100?u=admin', coeId: 'ai-ml' },
    // Manual Faculty Overrides to match ID patterns used in mockFacultyData.ts
    { id: 'swati-gupta', name: 'Dr. Swati Gupta', email: 'swati-gupta@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=swati', coeId: 'ai-ml'},
    { id: 'sunanda-das', name: 'Dr. Sunanda Das', email: 'sunanda-das@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=sunanda', coeId: 'cyber-security'},
    { id: 'vikram-neerugatti', name: 'Dr. Vikram Neerugatti', email: 'vikram-neerugatti@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=vikram', coeId: 'iot-robotics'},
    { id: 'nishant-tripathi', name: 'Dr. Nishant Tripathi', email: 'nishant-tripathi@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=nishant', coeId: 'networking-hpc'},
    { id: 'faculty-subhankar-ghosal', name: 'Dr. Subhankar Ghosal', email: 'subhankar-ghosal@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=subhankar', coeId: 'theoretical-cs'},
    // New Faculty from Project List (Manual ID alignment)
    { id: 'r-vijayanand', name: 'Dr. R. Vijayanand', email: 'vijayanand@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=vijayanand', coeId: 'cyber-security' },
    { id: 'aniruddha-prabhu', name: 'Prof. Aniruddha Prabhu B.P.', email: 'aniruddha@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=aniruddha', coeId: 'cyber-security' },
    { id: 'vasanth-ravi', name: 'Prof. Vasanth Ravi', email: 'vasanth@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=vasanth', coeId: 'cyber-security' },
    { id: 'ravikumar-sethuraman', name: 'Dr. Ravikumar Sethuraman', email: 'ravikumar@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=ravikumar', coeId: 'cyber-security' },
    { id: 'ambili-kn', name: 'Dr. Ambili K.N.', email: 'ambili@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=ambili', coeId: 'cyber-security' },
    { id: 'harinee-s', name: 'Dr. Harinee S.', email: 'harinee@jain.com', role: UserRole.FACULTY, avatarUrl: 'https://i.pravatar.cc/100?u=harinee', coeId: 'cyber-security' },
    
    ...newFacultyPool.filter(u => !['sunanda-das', 'swati-gupta', 'vikram-neerugatti', 'nishant-tripathi'].some(id => u.id.includes(id))), // Deduplicate auto-generated vs manual
    ...newStudentPool
];


export const mockUsersById = allUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
}, {} as { [key: string]: User });

export const mockCOEs: COE[] = [
    {
        id: 'ai-ml',
        name: 'AI & ML',
        longName: 'Artificial Intelligence & Machine Learning',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=AI%26ML',
        leader: {
            name: 'Dr. Swati Gupta',
            title: 'CoE Leader, AI & ML',
            imageUrl: 'https://i.pravatar.cc/200?u=swati',
            description: "Dr. Swati Gupta is currently serving as an Assistant Professor in the Department of Computer Science and Engineering (Artificial Intelligence and Machine Learning) at Jain University. She earned her Ph.D. in Computer Science and Engineering from the Indian Institute of Technology (IIT) Roorkee in 2019 and completed her M.Tech. in Information Technology from the Indian Institute of Information Technology (IIIT) Allahabad in 2014. Her research interests span across Text Mining, Natural Language Processing (NLP), Computer Vision, Machine Learning, and Deep Learning. She has disseminated her research findings through publications in reputed international journals and conferences, including NeurIPS, HyperText, and Knowledge and Information Systems (KAIS)."
        },
        facultyIds: ['swati-gupta', ...getFacultyIdsForCOE('ai-ml')],
        studentIds: newStudentPool.filter(s => s.coeId === 'ai-ml').map(s => s.id),
        tagline: 'Led by Dr. Swati Gupta'
    },
    {
        id: 'cyber-security',
        name: 'Cyber & Systems Security',
        longName: 'Cyber & Systems Security',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=Cyber',
        leader: {
            name: 'Dr. Sunanda Das',
            title: 'CoE Leader, Cyber Security',
            imageUrl: 'https://i.pravatar.cc/200?u=sunanda',
            description: 'Profile URL provided, direct description not available in the source data: https://scholar.google.com/citations?user=o2bbeFEAAAAJ&hl=en&oi=ao'
        },
        facultyIds: ['sunanda-das', 'r-vijayanand', 'aniruddha-prabhu', 'vasanth-ravi', 'ravikumar-sethuraman', 'ambili-kn', 'harinee-s', ...getFacultyIdsForCOE('cyber-security')],
        studentIds: newStudentPool.filter(s => s.coeId === 'cyber-security').map(s => s.id),
        tagline: 'Led by Dr. Sunanda Das'
    },
    {
        id: 'iot-robotics',
        name: 'IoT, Robotics & Embedded Systems',
        longName: 'IoT, Robotics & Embedded Systems',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=IoT',
        leader: {
            name: 'Dr. Vikram Neerugatti',
            title: 'CoE Leader, IoT & Robotics',
            imageUrl: 'https://i.pravatar.cc/200?u=vikram',
            description: "Dr. Vikram Neerugatti, an Associate Professor at JAIN (Deemed-to-be University)'s School of Computer Science and Engineering, brings over 14 years of teaching experience and a strong academic background. With a Ph.D. in Computer Science and Engineering from Sri Venkateshwara University, his research areas encompass the Internet of Things, Augmented Reality and Virtual Reality, Fog/Edge Computing, Machine Learning, Artificial Intelligence, and Data Science. Dr. Neerugatti boasts an impressive research track record, including 21 patents (including 3 granted), four published textbooks, and over 30 publications in international conferences and SCI/Scopus-indexed journals."
        },
        facultyIds: ['vikram-neerugatti', ...getFacultyIdsForCOE('iot-robotics')],
        studentIds: newStudentPool.filter(s => s.coeId === 'iot-robotics').map(s => s.id),
        tagline: 'Led by Dr. Vikram Neerugatti'
    },
    {
        id: 'networking-hpc',
        name: 'Networking & HPC',
        longName: 'Networking & High-Performance Computing',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=HPC',
        leader: {
            name: 'Dr. Nishant Tripathi',
            title: 'CoE Leader, Networking & HPC',
            imageUrl: 'https://i.pravatar.cc/200?u=nishant',
            description: "Dr. Nishant Tripathi is an academician and researcher with over 16 years of experience in engineering education, research, and academic leadership. I possess a Ph.D. in Wireless Communication (Wireless Sensor Networks) and have authored over 40 peer-reviewed articles [SCOPUS/WoS/UGC], three books, and two patents. My research spans distributed systems, scalable networks, wireless communication, IoT, cloud security, image processing, and high-performance computing (HPC). I aim to make impactful contributions to networking and high-performance computing through collaborative CoE initiatives."
        },
        facultyIds: ['nishant-tripathi', ...getFacultyIdsForCOE('networking-hpc')],
        studentIds: newStudentPool.filter(s => s.coeId === 'networking-hpc').map(s => s.id),
        tagline: 'Led by Dr. Nishant Tripathi'
    },
    {
        id: 'theoretical-cs',
        name: 'Theoretical CS',
        longName: 'Theoretical Computer Science',
        logoUrl: 'https://via.placeholder.com/128/FF951C/0A192F?text=CS',
        leader: {
            name: 'Dr. Subhankar Ghosal',
            title: 'CoE Leader, Theoretical CS',
            imageUrl: 'https://i.pravatar.cc/200?u=subhankar',
            description: "I am Dr. Subhankar Ghosal, currently working as an Assistant Professor in the Department of Computer Science and Engineering at Jain University. My research focuses on randomized algorithms and their applications. These algorithms use random numbers to make decisions at different steps of computation to improve complexity. Unlike traditional heuristics, randomized algorithms provide provable performance guarantees, ensuring correctness, reliability, and efficiency. My research emphasizes both theoretical rigor and applied relevance, aiming to bridge fundamental computer science with practical innovation."
        },
        facultyIds: ['faculty-subhankar-ghosal', ...getFacultyIdsForCOE('theoretical-cs')],
        studentIds: newStudentPool.filter(s => s.coeId === 'theoretical-cs').map(s => s.id),
        tagline: 'Led by Dr. Subhankar Ghosal'
    },
];


export const mockProjects: Project[] = Array.from({ length: 120 }, (_, i) => {
    const coe = mockCOEs[i % mockCOEs.length];
    const levels: Project['level'][] = ['University', 'National', 'SIH', 'Internal'];
    const progresses: Project['progress'][] = ['Proposed', 'Assigned', 'Started', 'In Progress', 'Approval', 'Completed', 'Rejected'];
    const statuses: Project['status'][] = ['Ongoing', 'Completed'];
    
    const proposerId = coe.facultyIds.length > 0 ? coe.facultyIds[i % coe.facultyIds.length] : 'user-2';
    const proposer = mockUsersById[proposerId];
    
    const assignedStudents = (coe.studentIds.length > 2) ? [coe.studentIds[i % coe.studentIds.length], coe.studentIds[(i+1) % coe.studentIds.length]] : [];
    const team = [proposer?.name, ...assignedStudents.map(id => mockUsersById[id]?.name)].filter(Boolean);

    let progress = progresses[i % progresses.length];
    // Ensure some projects are in 'Proposed' state for admin approval demo
    if (i % 5 === 0) {
      progress = 'Proposed';
    }

    return {
        id: `proj-${i + 1}`,
        title: `Project Title ${i + 1}`,
        description: `This is a detailed description for project ${i + 1}. It focuses on solving a critical problem within the domain of ${coe.longName}, leveraging advanced techniques and collaborative efforts from students and faculty. The project aims to deliver a scalable and efficient solution with real-world impact.`,
        team: team as string[],
        status: progress === 'Completed' || progress === 'Rejected' ? 'Completed' : 'Ongoing',
        imageUrl: `https://picsum.photos/seed/project${i+1}/600/400`,
        coeId: coe.id,
        level: levels[i % levels.length],
        progress: progress,
        department: proposer?.department || 'Computer Science',
        proposerId: proposerId,
        assignedStudentIds: progress === 'Proposed' ? [] : assignedStudents,
    };
});


export const mockPapers: ResearchPaper[] = [
  {
    id: 'paper-1',
    title: 'Advancements in Neural Network Pruning',
    authors: ['Dr. Ramesh Kumar', 'Aarav Sharma'],
    publicationYear: 2023,
    department: 'Computer Science',
    abstract: 'This paper explores novel techniques for pruning deep neural networks to reduce computational cost without significant loss in accuracy.',
    fileUrl: '#',
    doi: '10.1109/CVPR.2023.01234',
    status: PaperStatus.APPROVED,
    submittedBy: 'user-2',
  },
  {
    id: 'paper-2',
    title: 'A Study on Photovoltaic Cell Efficiency',
    authors: ['Sunita Patil', 'Dr. Anand Joshi'],
    publicationYear: 2022,
    department: 'Electronics Engineering',
    abstract: 'An empirical study on improving the efficiency of silicon-based photovoltaic cells through surface texturing.',
    fileUrl: '#',
    doi: '10.1016/j.solener.2022.05.018',
    status: PaperStatus.APPROVED,
    submittedBy: 'user-2',
  },
  {
    id: 'paper-3',
    title: 'The Impact of Social Media on Political Discourse',
    authors: ['Rohan Gupta'],
    publicationYear: 2023,
    department: 'Humanities',
    abstract: 'An analysis of how major social media platforms have shaped political conversations and voter behavior in recent elections.',
    fileUrl: '#',
    doi: '10.1080/1369118X.2023.1234567',
    status: PaperStatus.PENDING,
    submittedBy: 'student-aaravsharma',
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Dr. Ramesh Kumar awarded "Innovator of the Year"',
    content: 'We are proud to announce that Dr. Ramesh Kumar from the Computer Science department has been awarded the "Innovator of the Year" by the National Tech Council for his work on AI.',
    date: '2024-07-20',
    category: 'Faculty Achievements',
    author: 'CoE Admin',
  },
  {
    id: 'ann-2',
    title: 'Student Team Wins National Hackathon "CodeStorm 2024"',
    content: 'Congratulations to Aarav Sharma and his team for securing first place at CodeStorm 2024, a national-level hackathon focused on sustainable development goals.',
    date: '2024-07-18',
    category: 'Student Achievements',
    author: 'CoE Admin',
  },
  {
    id: 'ann-3',
    title: 'Guest Lecture on "The Future of Quantum Computing"',
    content: 'Join us for an insightful guest lecture by Dr. Aruna Desai from MIT on the exciting advancements in quantum computing. The event will be held on August 5th in the main auditorium.',
    date: '2024-07-15',
    category: 'General',
    author: 'CoE Admin',
  },
];

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Workshop on Deep Learning with PyTorch',
    date: '2024-08-10',
    time: '09:00 AM - 04:00 PM',
    location: 'AI & Robotics Lab',
    description: 'A hands-on workshop covering the fundamentals of deep learning and practical implementation using the PyTorch framework.',
    type: 'Workshop',
    status: EventStatus.APPROVED,
    submittedBy: 'user-2',
    coeId: 'ai-ml',
  },
  {
    id: 'evt-2',
    title: 'Jain Innovate Hackathon 2024',
    date: '2024-09-05',
    time: 'Starts 10:00 AM',
    location: 'Virtual',
    description: 'A 24-hour hackathon focused on creating innovative solutions for real-world problems. Exciting prizes to be won!',
    type: 'Hackathon',
    status: EventStatus.APPROVED,
    submittedBy: 'user-3',
    coeId: 'cyber-security',
  },
  {
    id: 'evt-3',
    title: 'Seminar on Intellectual Property Rights',
    date: '2024-08-22',
    time: '02:00 PM - 03:30 PM',
    location: 'Seminar Hall B',
    description: 'An essential seminar for all researchers and innovators on the importance of patents, copyrights, and trademarks.',
    type: 'Seminar',
    status: EventStatus.APPROVED,
    submittedBy: 'user-2',
    coeId: 'theoretical-cs',
  },
  {
    id: 'evt-4',
    title: 'Guest Lecture on 5G Technology',
    date: '2024-10-15',
    time: '11:00 AM - 12:30 PM',
    location: 'Main Auditorium',
    description: 'A guest lecture by an industry expert on the rollout and impact of 5G technology.',
    type: 'Guest Lecture',
    status: EventStatus.PENDING,
    submittedBy: 'user-2',
    coeId: 'networking-hpc',
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Best Research Paper Award at IEEE Conference',
    recipient: 'Dr. Ramesh Kumar',
    category: 'Faculty',
    date: '2024-06-15',
    description: 'Dr. Kumar was recognized for his outstanding contribution to the field of artificial intelligence with his paper on efficient neural network architectures.',
    imageUrl: 'https://picsum.photos/seed/award1/600/400',
  },
  {
    id: 'ach-2',
    title: 'First Place at Smart India Hackathon 2024',
    recipient: 'Aarav Sharma & Team',
    category: 'Student',
    date: '2024-05-20',
    description: 'A team of students won the top prize for their innovative solution in the healthcare domain, developing an AI-powered diagnostic tool.',
    imageUrl: 'https://picsum.photos/seed/award2/600/400',
  },
  {
    id: 'ach-3',
    title: 'Ranked Top 5 in National Innovation Rankings',
    recipient: 'Jain University',
    category: 'University',
    date: '2024-04-30',
    description: 'The Center of Excellence played a key role in Jain University being recognized as one of the top 5 institutions for innovation and research output nationwide.',
    imageUrl: 'https://picsum.photos/seed/award3/600/400',
  },
   {
    id: 'ach-4',
    title: 'Young Scientist Fellowship',
    recipient: 'Anjali Gupta',
    category: 'Student',
    date: '2024-03-10',
    description: 'Anjali Gupta was awarded the prestigious Young Scientist Fellowship by the Department of Science and Technology for her promising research in renewable energy.',
    imageUrl: 'https://picsum.photos/seed/award4/600/400',
  },
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-2', // Dr. Ramesh Kumar
    content: 'Just published a new paper on advancements in neural network pruning. Exciting to see where this research leads! #AI #MachineLearning',
    timestamp: '2024-07-28T10:00:00Z',
    likes: ['student-aaravsharma', 'user-3'],
    comments: [
      {
        id: 'comment-1-1',
        authorId: 'student-aaravsharma', // Priya Sharma
        content: 'Congratulations, Dr. Kumar! That sounds fascinating.',
        timestamp: '2024-07-28T10:05:00Z',
      },
    ],
  },
  {
    id: 'post-2',
    authorId: 'student-aaravsharma', // Priya Sharma
    content: 'Our team is gearing up for the Jain Innovate Hackathon 2024! Any tips for last-minute preparations? 🚀 #Hackathon #Innovation',
    timestamp: '2024-07-27T15:30:00Z',
    likes: ['user-2'],
    comments: [],
  },
];
