// ─────────────────────────────────────────────────────────
//  P.A.C.E. – Shared Mock Data
// ─────────────────────────────────────────────────────────

export interface Student {
  id: string;
  name: string;
  program: 'BSIT' | 'BSCS' | 'BSECE' | 'BSME' | 'BSCE';
  yearLevel: 1 | 2 | 3 | 4;
  gpa: number;
  skills: string[];
  email: string;
  avatarInitials: string;
  avatarColor: string;
  location: string;
  bio: string;
  status: 'active' | 'hired' | 'seeking';
  appliedJobs: string[];
}

export interface Counselor {
  id: string;
  name: string;
  department: string;
  email: string;
  activeStudents: number;
  appointmentsToday: number;
  status: 'active' | 'inactive';
  joinDate: string;
  phone: string;
}

export interface Recruiter {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  status: 'pending' | 'approved' | 'suspended';
  joinDate: string;
  industry: string;
  jobsPosted: number;
  candidatesHired: number;
}

export interface Appointment {
  id: string;
  studentName: string;
  counselorName: string;
  date: string;
  time: string;
  type: 'Career Counseling' | 'Resume Review' | 'Mock Interview' | 'Job Matching';
  status: 'completed' | 'pending' | 'cancelled';
  notes?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Contract';
  deadline: string;
  applicants: number;
  status: 'active' | 'closed';
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  postedDate: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatarInitials: string;
  avatarColor: string;
  messages: Message[];
}

// ── Students ──────────────────────────────────────────────
export const students: Student[] = [
  {
    id: 'stu-001',
    name: 'Maria Santos',
    program: 'BSIT',
    yearLevel: 4,
    gpa: 3.85,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Figma'],
    email: 'maria.santos@msuiit.edu.ph',
    avatarInitials: 'MS',
    avatarColor: '#7A0016',
    location: 'Iligan City',
    bio: 'Passionate full-stack developer with a focus on building scalable web applications. Active contributor to open-source projects.',
    status: 'seeking',
    appliedJobs: ['job-001', 'job-003'],
  },
  {
    id: 'stu-002',
    name: 'Juan dela Cruz',
    program: 'BSCS',
    yearLevel: 4,
    gpa: 3.92,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'],
    email: 'juan.delacruz@msuiit.edu.ph',
    avatarInitials: 'JC',
    avatarColor: '#5C0011',
    location: 'Cagayan de Oro',
    bio: 'ML enthusiast researching computer vision applications in agriculture. Published two papers in undergraduate research journals.',
    status: 'seeking',
    appliedJobs: ['job-002'],
  },
  {
    id: 'stu-003',
    name: 'Ana Reyes',
    program: 'BSECE',
    yearLevel: 3,
    gpa: 3.75,
    skills: ['Embedded Systems', 'Arduino', 'C++', 'IoT', 'PCB Design'],
    email: 'ana.reyes@msuiit.edu.ph',
    avatarInitials: 'AR',
    avatarColor: '#9B0020',
    location: 'Iligan City',
    bio: 'Hardware enthusiast with a knack for IoT solutions. Built a smart irrigation system for local farmers as a thesis project.',
    status: 'active',
    appliedJobs: [],
  },
  {
    id: 'stu-004',
    name: 'Carlo Mendoza',
    program: 'BSCS',
    yearLevel: 4,
    gpa: 3.68,
    skills: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'AWS'],
    email: 'carlo.mendoza@msuiit.edu.ph',
    avatarInitials: 'CM',
    avatarColor: '#7A0016',
    location: 'Marawi City',
    bio: 'Backend engineer with experience in microservices architecture. Has interned at two tech companies in Cebu.',
    status: 'seeking',
    appliedJobs: ['job-001', 'job-004'],
  },
  {
    id: 'stu-005',
    name: 'Liza Fernandez',
    program: 'BSIT',
    yearLevel: 3,
    gpa: 3.55,
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'HTML', 'CSS', 'JavaScript'],
    email: 'liza.fernandez@msuiit.edu.ph',
    avatarInitials: 'LF',
    avatarColor: '#D4881A',
    location: 'Iligan City',
    bio: 'Design-first developer who bridges the gap between aesthetics and functionality. Portfolio showcases 15+ projects.',
    status: 'active',
    appliedJobs: ['job-003'],
  },
  {
    id: 'stu-006',
    name: 'Ramon Villanueva',
    program: 'BSCS',
    yearLevel: 4,
    gpa: 3.97,
    skills: ['Cybersecurity', 'Ethical Hacking', 'Linux', 'Networking', 'Python'],
    email: 'ramon.villanueva@msuiit.edu.ph',
    avatarInitials: 'RV',
    avatarColor: '#5C0011',
    location: 'Cagayan de Oro',
    bio: 'Security researcher who has found and responsibly disclosed vulnerabilities in 3 major Philippine government websites.',
    status: 'seeking',
    appliedJobs: ['job-002', 'job-005'],
  },
  {
    id: 'stu-007',
    name: 'Patricia Gomez',
    program: 'BSIT',
    yearLevel: 2,
    gpa: 3.40,
    skills: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Git'],
    email: 'patricia.gomez@msuiit.edu.ph',
    avatarInitials: 'PG',
    avatarColor: '#9B0020',
    location: 'Iligan City',
    bio: 'Self-taught web developer who started freelancing at 16. Manages three clients while maintaining excellent academic standing.',
    status: 'active',
    appliedJobs: [],
  },
  {
    id: 'stu-008',
    name: 'Alejandro Cruz',
    program: 'BSECE',
    yearLevel: 4,
    gpa: 3.72,
    skills: ['FPGA', 'VHDL', 'Signal Processing', 'MATLAB', 'Robotics'],
    email: 'alejandro.cruz@msuiit.edu.ph',
    avatarInitials: 'AC',
    avatarColor: '#7A0016',
    location: 'Lanao del Norte',
    bio: 'Robotics enthusiast who led MSU-IIT\'s team to 3rd place in the Philippine Robotics Olympiad 2024.',
    status: 'seeking',
    appliedJobs: ['job-004'],
  },
  {
    id: 'stu-009',
    name: 'Bianca Torres',
    program: 'BSCS',
    yearLevel: 3,
    gpa: 3.88,
    skills: ['Data Science', 'Python', 'Tableau', 'Statistics', 'Pandas'],
    email: 'bianca.torres@msuiit.edu.ph',
    avatarInitials: 'BT',
    avatarColor: '#D4881A',
    location: 'Iligan City',
    bio: 'Data storyteller passionate about transforming raw data into actionable insights for social good.',
    status: 'active',
    appliedJobs: ['job-002'],
  },
  {
    id: 'stu-010',
    name: 'Kenneth Lim',
    program: 'BSIT',
    yearLevel: 4,
    gpa: 3.60,
    skills: ['React Native', 'Flutter', 'Firebase', 'iOS', 'Android'],
    email: 'kenneth.lim@msuiit.edu.ph',
    avatarInitials: 'KL',
    avatarColor: '#5C0011',
    location: 'Iligan City',
    bio: 'Mobile developer with 4 published apps on both Google Play and the App Store. Specializes in cross-platform development.',
    status: 'seeking',
    appliedJobs: ['job-001', 'job-003'],
  },
];

// ── Counselors ────────────────────────────────────────────
export const counselors: Counselor[] = [
  {
    id: 'cou-001',
    name: 'Dr. Elena Macaraeg',
    department: 'College of Information Technology',
    email: 'elena.macaraeg@msuiit.edu.ph',
    activeStudents: 45,
    appointmentsToday: 6,
    status: 'active',
    joinDate: '2019-08-15',
    phone: '+63 912 345 6789',
  },
  {
    id: 'cou-002',
    name: 'Prof. Ricardo Abad',
    department: 'College of Engineering',
    email: 'ricardo.abad@msuiit.edu.ph',
    activeStudents: 38,
    appointmentsToday: 4,
    status: 'active',
    joinDate: '2020-06-01',
    phone: '+63 917 234 5678',
  },
  {
    id: 'cou-003',
    name: 'Ms. Grace Tan',
    department: 'Office of Student Affairs',
    email: 'grace.tan@msuiit.edu.ph',
    activeStudents: 62,
    appointmentsToday: 8,
    status: 'active',
    joinDate: '2018-11-20',
    phone: '+63 918 345 6789',
  },
  {
    id: 'cou-004',
    name: 'Dr. Bernard Ocampo',
    department: 'College of Science',
    email: 'bernard.ocampo@msuiit.edu.ph',
    activeStudents: 29,
    appointmentsToday: 3,
    status: 'active',
    joinDate: '2021-01-10',
    phone: '+63 921 456 7890',
  },
  {
    id: 'cou-005',
    name: 'Prof. Luz Dimalanta',
    department: 'Career Development Center',
    email: 'luz.dimalanta@msuiit.edu.ph',
    activeStudents: 0,
    appointmentsToday: 0,
    status: 'inactive',
    joinDate: '2017-03-05',
    phone: '+63 915 567 8901',
  },
  {
    id: 'cou-006',
    name: 'Mr. Anthony Reyes',
    department: 'College of Information Technology',
    email: 'anthony.reyes@msuiit.edu.ph',
    activeStudents: 41,
    appointmentsToday: 5,
    status: 'active',
    joinDate: '2022-08-01',
    phone: '+63 916 678 9012',
  },
];

// ── Recruiters ────────────────────────────────────────────
export const recruiters: Recruiter[] = [
  {
    id: 'rec-001',
    company: 'TechCorp Philippines',
    contactPerson: 'Mark Rivera',
    email: 'mark.rivera@techcorp.ph',
    status: 'approved',
    joinDate: '2024-01-15',
    industry: 'Software Development',
    jobsPosted: 12,
    candidatesHired: 8,
  },
  {
    id: 'rec-002',
    company: 'Accenture Philippines',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@accenture.com',
    status: 'approved',
    joinDate: '2024-02-20',
    industry: 'IT Consulting',
    jobsPosted: 25,
    candidatesHired: 18,
  },
  {
    id: 'rec-003',
    company: 'Innovatech Solutions',
    contactPerson: 'James Park',
    email: 'j.park@innovatech.io',
    status: 'pending',
    joinDate: '2024-10-01',
    industry: 'AI/ML',
    jobsPosted: 0,
    candidatesHired: 0,
  },
  {
    id: 'rec-004',
    company: 'Globe Telecom',
    contactPerson: 'Maria Luna',
    email: 'maria.luna@globe.com.ph',
    status: 'approved',
    joinDate: '2023-11-05',
    industry: 'Telecommunications',
    jobsPosted: 18,
    candidatesHired: 11,
  },
  {
    id: 'rec-005',
    company: 'Concentrix Philippines',
    contactPerson: 'David Chen',
    email: 'd.chen@concentrix.com',
    status: 'suspended',
    joinDate: '2024-03-10',
    industry: 'BPO',
    jobsPosted: 6,
    candidatesHired: 2,
  },
  {
    id: 'rec-006',
    company: 'SolidTech PH',
    contactPerson: 'Angela Ramos',
    email: 'a.ramos@solidtech.ph',
    status: 'pending',
    joinDate: '2024-10-15',
    industry: 'Hardware & IoT',
    jobsPosted: 0,
    candidatesHired: 0,
  },
];

// ── Appointments ──────────────────────────────────────────
export const appointments: Appointment[] = [
  { id: 'apt-001', studentName: 'Maria Santos', counselorName: 'Dr. Elena Macaraeg', date: '2024-10-27', time: '09:00', type: 'Career Counseling', status: 'completed', notes: 'Discussed job prospects in web dev.' },
  { id: 'apt-002', studentName: 'Juan dela Cruz', counselorName: 'Prof. Ricardo Abad', date: '2024-10-27', time: '10:30', type: 'Resume Review', status: 'pending' },
  { id: 'apt-003', studentName: 'Carlo Mendoza', counselorName: 'Dr. Elena Macaraeg', date: '2024-10-27', time: '14:00', type: 'Mock Interview', status: 'pending' },
  { id: 'apt-004', studentName: 'Liza Fernandez', counselorName: 'Ms. Grace Tan', date: '2024-10-26', time: '11:00', type: 'Job Matching', status: 'completed', notes: 'Matched with TechCorp UI role.' },
  { id: 'apt-005', studentName: 'Ramon Villanueva', counselorName: 'Mr. Anthony Reyes', date: '2024-10-25', time: '13:00', type: 'Career Counseling', status: 'cancelled', notes: 'Student rescheduled.' },
  { id: 'apt-006', studentName: 'Patricia Gomez', counselorName: 'Ms. Grace Tan', date: '2024-10-28', time: '09:30', type: 'Resume Review', status: 'pending' },
  { id: 'apt-007', studentName: 'Alejandro Cruz', counselorName: 'Prof. Ricardo Abad', date: '2024-10-28', time: '15:00', type: 'Mock Interview', status: 'pending' },
  { id: 'apt-008', studentName: 'Bianca Torres', counselorName: 'Dr. Bernard Ocampo', date: '2024-10-24', time: '10:00', type: 'Career Counseling', status: 'completed' },
];

// ── Jobs ──────────────────────────────────────────────────
export const jobs: Job[] = [
  {
    id: 'job-001',
    title: 'Junior Full-Stack Developer',
    company: 'TechCorp Philippines',
    type: 'Full-time',
    deadline: '2024-11-30',
    applicants: 23,
    status: 'active',
    description: 'Join our growing engineering team to build scalable web applications for enterprise clients across Southeast Asia.',
    requirements: ['React or Vue.js', 'Node.js', 'SQL/NoSQL', 'REST APIs', 'Git'],
    location: 'Makati City (Hybrid)',
    salary: 'PHP 35,000 – 50,000/mo',
    postedDate: '2024-10-01',
  },
  {
    id: 'job-002',
    title: 'Data Science Intern',
    company: 'TechCorp Philippines',
    type: 'Internship',
    deadline: '2024-11-15',
    applicants: 41,
    status: 'active',
    description: 'Work alongside our data team to build predictive models and dashboards for client analytics platforms.',
    requirements: ['Python', 'Pandas/NumPy', 'SQL', 'Basic ML knowledge', 'Tableau (nice to have)'],
    location: 'Remote',
    salary: 'PHP 8,000/mo allowance',
    postedDate: '2024-10-05',
  },
  {
    id: 'job-003',
    title: 'UI/UX Designer',
    company: 'TechCorp Philippines',
    type: 'Full-time',
    deadline: '2024-12-15',
    applicants: 17,
    status: 'active',
    description: 'Design beautiful and intuitive interfaces for our suite of B2B SaaS products used by 500+ companies.',
    requirements: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS (basic)'],
    location: 'Makati City (On-site)',
    salary: 'PHP 40,000 – 60,000/mo',
    postedDate: '2024-10-10',
  },
  {
    id: 'job-004',
    title: 'Backend Engineer (Java)',
    company: 'TechCorp Philippines',
    type: 'Full-time',
    deadline: '2024-11-20',
    applicants: 9,
    status: 'active',
    description: 'Help architect and maintain our microservices infrastructure handling 1M+ daily transactions.',
    requirements: ['Java 17+', 'Spring Boot', 'Docker', 'Kafka', 'PostgreSQL'],
    location: 'BGC, Taguig (Hybrid)',
    salary: 'PHP 55,000 – 80,000/mo',
    postedDate: '2024-09-28',
  },
  {
    id: 'job-005',
    title: 'IT Security Analyst',
    company: 'TechCorp Philippines',
    type: 'Full-time',
    deadline: '2024-10-31',
    applicants: 5,
    status: 'closed',
    description: 'Safeguard our infrastructure through continuous monitoring, threat analysis, and incident response.',
    requirements: ['Network Security', 'SIEM tools', 'Penetration Testing', 'CompTIA Security+ (preferred)', 'Linux'],
    location: 'Pasig City (On-site)',
    salary: 'PHP 50,000 – 70,000/mo',
    postedDate: '2024-09-15',
  },
];

// ── Messages / Conversations ──────────────────────────────
export const conversations: Conversation[] = [
  {
    id: 'conv-001',
    participantName: 'Maria Santos',
    participantRole: 'BSIT 4th Year — GPA 3.85',
    lastMessage: 'Thank you for considering my application!',
    timestamp: '10:42 AM',
    unread: 2,
    avatarInitials: 'MS',
    avatarColor: '#7A0016',
    messages: [
      { id: 'm-001', senderId: 'rec-001', senderName: 'Mark Rivera', receiverId: 'stu-001', receiverName: 'Maria Santos', content: 'Hi Maria! I came across your profile and I\'m impressed with your React and Node.js experience. Would you be interested in our Junior Full-Stack Developer role?', timestamp: '09:15 AM', read: true },
      { id: 'm-002', senderId: 'stu-001', senderName: 'Maria Santos', receiverId: 'rec-001', receiverName: 'Mark Rivera', content: 'Hello Mr. Rivera! Yes, absolutely. I\'ve been following TechCorp\'s work and I\'d love to learn more about the opportunity.', timestamp: '09:48 AM', read: true },
      { id: 'm-003', senderId: 'rec-001', senderName: 'Mark Rivera', receiverId: 'stu-001', receiverName: 'Maria Santos', content: 'Great! Could you share your portfolio? We\'d love to schedule a technical interview as early as next week.', timestamp: '10:12 AM', read: true },
      { id: 'm-004', senderId: 'stu-001', senderName: 'Maria Santos', receiverId: 'rec-001', receiverName: 'Maria Santos', content: 'Thank you for considering my application!', timestamp: '10:42 AM', read: false },
    ],
  },
  {
    id: 'conv-002',
    participantName: 'Juan dela Cruz',
    participantRole: 'BSCS 4th Year — GPA 3.92',
    lastMessage: 'I will send my transcript today.',
    timestamp: 'Yesterday',
    unread: 0,
    avatarInitials: 'JC',
    avatarColor: '#5C0011',
    messages: [
      { id: 'm-005', senderId: 'rec-001', senderName: 'Mark Rivera', receiverId: 'stu-002', receiverName: 'Juan dela Cruz', content: 'Hi Juan, your ML research background is exactly what our data team is looking for. Interested in the Data Science Intern role?', timestamp: 'Yesterday 2:00 PM', read: true },
      { id: 'm-006', senderId: 'stu-002', senderName: 'Juan dela Cruz', receiverId: 'rec-001', receiverName: 'Mark Rivera', content: 'Hi! Yes, I am very interested. I will send my transcript today.', timestamp: 'Yesterday 4:30 PM', read: true },
    ],
  },
  {
    id: 'conv-003',
    participantName: 'Kenneth Lim',
    participantRole: 'BSIT 4th Year — GPA 3.60',
    lastMessage: 'Looking forward to the interview!',
    timestamp: 'Mon',
    unread: 1,
    avatarInitials: 'KL',
    avatarColor: '#5C0011',
    messages: [
      { id: 'm-007', senderId: 'rec-001', senderName: 'Mark Rivera', receiverId: 'stu-010', receiverName: 'Kenneth Lim', content: 'Kenneth, we saw your apps on the Play Store — very impressive for a student! We\'d like to discuss a Full-Stack role with a mobile focus.', timestamp: 'Mon 11:00 AM', read: true },
      { id: 'm-008', senderId: 'stu-010', senderName: 'Kenneth Lim', receiverId: 'rec-001', receiverName: 'Mark Rivera', content: 'Looking forward to the interview!', timestamp: 'Mon 3:00 PM', read: false },
    ],
  },
];

// ── Analytics Data ────────────────────────────────────────
export const monthlyHiredData = [
  { month: 'Nov', value: 185 },
  { month: 'Dec', value: 142 },
  { month: 'Jan', value: 198 },
  { month: 'Feb', value: 221 },
  { month: 'Mar', value: 267 },
  { month: 'Apr', value: 310 },
  { month: 'May', value: 289 },
  { month: 'Jun', value: 334 },
  { month: 'Jul', value: 298 },
  { month: 'Aug', value: 356 },
  { month: 'Sep', value: 401 },
  { month: 'Oct', value: 446 },
];

export const appointmentStatusData = [
  { label: 'Completed', value: 1243, color: '#10b981' },
  { label: 'Pending',   value:  489, color: '#F5A623' },
  { label: 'Cancelled', value:  198, color: '#ef4444' },
];

export const industryPlacementData = [
  { industry: 'Software Dev',    count: 847, color: '#7A0016' },
  { industry: 'IT Consulting',   count: 623, color: '#9B0020' },
  { industry: 'BPO/Outsourcing', count: 541, color: '#F5A623' },
  { industry: 'Telecommunications', count: 389, color: '#D4881A' },
  { industry: 'Banking/Finance', count: 278, color: '#5C0011' },
  { industry: 'Government/NGO',  count: 169, color: '#FFD700' },
];

export const engagementData = [
  { day: 'Oct 20', users: 312 },
  { day: 'Oct 21', users: 289 },
  { day: 'Oct 22', users: 198 },
  { day: 'Oct 23', users: 156 },
  { day: 'Oct 24', users: 421 },
  { day: 'Oct 25', users: 398 },
  { day: 'Oct 26', users: 445 },
  { day: 'Oct 27', users: 502 },
];

export const systemActivityLog = [
  { id: 'log-001', event: 'New recruiter registration', actor: 'SolidTech PH', time: '2 min ago', type: 'recruiter' },
  { id: 'log-002', event: 'Student profile approved', actor: 'Ramon Villanueva', time: '15 min ago', type: 'student' },
  { id: 'log-003', event: 'Counselor deactivated', actor: 'Prof. Luz Dimalanta', time: '1 hr ago', type: 'counselor' },
  { id: 'log-004', event: 'Job posting flagged for review', actor: 'Concentrix Philippines', time: '3 hrs ago', type: 'job' },
  { id: 'log-005', event: 'System backup completed', actor: 'SYSTEM', time: '6 hrs ago', type: 'system' },
  { id: 'log-006', event: 'Recruiter account approved', actor: 'TechCorp Philippines', time: '1 day ago', type: 'recruiter' },
];
