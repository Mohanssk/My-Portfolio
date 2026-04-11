export const projectFilters = [
  { label: 'All', value: 'all' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'AI/ML', value: 'ai' },
  { label: 'Backend', value: 'backend' },
  { label: 'Frontend', value: 'frontend' },
];

export const skillsByCategory = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
      { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
      { name: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus/00599C' },
      { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
      { name: 'CSS3', logo: 'https://cdn.simpleicons.org/css/1572B6' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'React.js', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
      { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/FFFFFF' },
      { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      { name: 'Bootstrap 5', logo: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
      { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/FFFFFF' },
      { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Vercel', logo: 'https://cdn.simpleicons.org/vercel/FFFFFF' },
      { name: 'npm', logo: 'https://cdn.simpleicons.org/npm/CB3837' },
      { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
    ],
  },
  {
    title: 'Core Concepts',
    skills: [
      { name: 'Data Structures', logo: 'https://cdn.simpleicons.org/leetcode/FFA116' },
      { name: 'Algorithms', logo: 'https://cdn.simpleicons.org/codeforces/1F8ACB' },
      { name: 'REST APIs', logo: 'https://cdn.simpleicons.org/swagger/85EA2D' },
      { name: 'OOP', logo: 'https://cdn.simpleicons.org/openjdk/ED8B00' },
      { name: 'Auth', logo: 'https://cdn.simpleicons.org/auth0/EB5424' },
      { name: 'Responsive Design', logo: 'https://cdn.simpleicons.org/css/1572B6' },
    ],
  },
];

export const projects = [
  {
    title: 'Gyan Ganga',
    stack: 'React.js | Node.js | REST APIs',
    description:
      'Gamified Ed-Tech platform for grades 6-12 with NCERT-aligned content, XP system, and teacher dashboards for progress tracking.',
    categories: ['fullstack', 'frontend', 'backend'],
    tags: ['Full Stack', 'Frontend', 'Backend'],
    links: {
      live: 'https://gyan-ganga-mk7.vercel.app/',
      code: 'https://github.com/Mohanssk/gyan-ganga',
    },
  },
  {
    title: 'Sign Vision',
    stack: 'Python | Computer Vision | TensorFlow | React',
    description:
      'Real-time ASL to speech translator using webcam input with offline capability and accessibility-first interface design.',
    categories: ['ai', 'fullstack', 'frontend'],
    tags: ['AI/ML', 'Full Stack', 'Frontend'],
    links: {
      live: 'https://sign-vision-mk7.vercel.app/',
      code: 'https://github.com/Mohanssk/Sign-Vision',
    },
  },
  {
    title: 'AI Career Roadmap Generator',
    stack: 'React.js | Node.js | AI APIs | Vercel',
    description:
      'Personalized roadmap generator with interactive node-based progression and AI mentor guidance for career planning.',
    categories: ['ai', 'fullstack', 'frontend', 'backend'],
    tags: ['AI/ML', 'Full Stack', 'Backend'],
    links: {
      live: 'https://roadmap-project-mk7.vercel.app/',
      code: 'https://github.com/Mohanssk/Ai-powerd-leaningpath',
    },
  },
  {
    title: 'SemPrep',
    stack: 'React.js | Node.js | MongoDB | Auth',
    description:
      'Role-based academic notes platform for students and teachers with structured metadata and search-friendly upload workflows.',
    categories: ['fullstack', 'frontend', 'backend'],
    tags: ['Full Stack', 'Backend', 'Frontend'],
    links: {
      live: 'https://sem-prep.vercel.app/',
      code: 'https://github.com/Mohanssk/Sem_Prep',
    },
  },
  {
    title: 'Iris Data API',
    stack: 'Node.js | Express.js | REST | Vercel',
    description:
      'Production-style API for the Iris dataset with collection and individual lookup endpoints and interactive testing support.',
    categories: ['backend'],
    tags: ['Backend', 'API Design'],
    links: {
      live: 'https://iris-api-mk7.vercel.app/',
      code: 'https://github.com/Mohanssk/Iris-API',
    },
  },
  {
    title: 'Task Management App',
    stack: 'JavaScript | HTML5 | CSS3 | Local Storage',
    description:
      'Clean task manager with CRUD actions, persistent browser storage, and responsive layouts for daily productivity.',
    categories: ['frontend'],
    tags: ['Frontend', 'JavaScript'],
    links: {
      live: 'https://to-do-list-mk7.vercel.app/',
      code: 'https://github.com/Mohanssk/To-do-list',
    },
  },
];

export const timelineItems = [
  {
    index: '01',
    title: 'Diploma - BVC Institute of Technology and Science',
    description: 'Computer Engineering | CGPA 8.8',
    dateLocation: 'June 2021 - April 2024 | Andhra Pradesh, India',
  },
  {
    index: '02',
    title: 'Karvy Data Management Services Limited',
    description: 'Quality Control Operator Internship',
    dateLocation: 'December 2023 - May 2024 | Hyderabad, India',
  },
  {
    index: '03',
    title: 'B.Tech - BVC Engineering College (BVCE)',
    description: 'Computer Science and Engineering | CGPA 8.29',
    certification:
      'Certification: The Complete Full-Stack Web Development Bootcamp (The App Brewery / Udemy), 2024',
    certificationLink:
      'https://www.udemy.com/certificate/UC-8580e863-b7c9-41d1-a9e5-cb022e56957e/',
    certificationLabel: 'View Certificate',
    dateLocation: 'July 2024 - April 2027 | Andhra Pradesh, India',
  },
];
