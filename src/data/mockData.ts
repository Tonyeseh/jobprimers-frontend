import { Job, Company } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    description: 'Leading technology company specializing in AI and cloud solutions.',
    industry: 'Technology',
    size: '500-1000',
    location: 'San Francisco, CA',
    founded_year: 2010,
    website: 'https://techcorp.com'
  },
  {
    id: 2,
    name: 'DataFlow Systems',
    description: 'Data analytics and business intelligence solutions provider.',
    industry: 'Data Analytics',
    size: '100-500',
    location: 'New York, NY',
    founded_year: 2015,
    website: 'https://dataflow.com'
  },
  {
    id: 3,
    name: 'CloudTech Innovations',
    description: 'Cloud infrastructure and DevOps solutions company.',
    industry: 'Cloud Computing',
    size: '50-100',
    location: 'Seattle, WA',
    founded_year: 2018,
    website: 'https://cloudtech.com'
  }
];

export const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: mockCompanies[0],
    location: 'San Francisco, CA',
    salary_range: '$120,000 - $160,000',
    employment_type: 'full-time',
    description: 'We are looking for a passionate Senior Frontend Developer to join our growing team. You will be responsible for developing user-facing features using modern JavaScript frameworks.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Modern CSS frameworks', 'Testing frameworks (Jest, Cypress)'],
    posted_date: '2025-01-10',
    remote_option: true,
    experience_level: 'senior'
  },
  {
    id: 2,
    title: 'Data Scientist',
    company: mockCompanies[1],
    location: 'New York, NY',
    salary_range: '$100,000 - $140,000',
    employment_type: 'full-time',
    description: 'Join our data science team to build machine learning models and derive insights from large datasets.',
    requirements: ['Python/R proficiency', 'Machine Learning experience', 'SQL expertise', 'Statistics background'],
    posted_date: '2025-01-09',
    remote_option: false,
    experience_level: 'mid'
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: mockCompanies[2],
    location: 'Seattle, WA',
    salary_range: '$110,000 - $150,000',
    employment_type: 'full-time',
    description: 'Looking for a DevOps Engineer to help us scale our cloud infrastructure and improve our deployment processes.',
    requirements: ['AWS/Azure experience', 'Docker & Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
    posted_date: '2025-01-08',
    remote_option: true,
    experience_level: 'mid'
  },
  {
    id: 4,
    title: 'Junior Full Stack Developer',
    company: mockCompanies[0],
    location: 'San Francisco, CA',
    salary_range: '$80,000 - $100,000',
    employment_type: 'full-time',
    description: 'Great opportunity for a junior developer to grow their skills in a supportive environment.',
    requirements: ['JavaScript fundamentals', 'React basics', 'Node.js experience', 'Git version control'],
    posted_date: '2025-01-07',
    remote_option: true,
    experience_level: 'entry'
  },
  {
    id: 5,
    title: 'Product Manager',
    company: mockCompanies[1],
    location: 'Remote',
    salary_range: '$130,000 - $170,000',
    employment_type: 'full-time',
    description: 'Lead product strategy and work with cross-functional teams to deliver exceptional user experiences.',
    requirements: ['3+ years product management', 'Agile/Scrum experience', 'Data-driven decision making', 'Stakeholder management'],
    posted_date: '2025-01-06',
    remote_option: true,
    experience_level: 'senior'
  }
];