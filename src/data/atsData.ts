import { Application, Candidate, ATSStats, ApplicationStatus } from '../types/ats';
import { mockJobs } from './mockData';

export const mockCandidates: Candidate[] = [
  {
    id: 1,
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin_url: 'https://linkedin.com/in/sarahjohnson',
    portfolio_url: 'https://sarahjohnson.dev',
    experience_years: 5,
    current_position: 'Frontend Developer',
    current_company: 'StartupCorp',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    education: [
      {
        id: 1,
        institution: 'Stanford University',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        graduation_year: 2019,
        gpa: 3.8
      }
    ]
  },
  {
    id: 2,
    first_name: 'Michael',
    last_name: 'Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    linkedin_url: 'https://linkedin.com/in/michaelchen',
    experience_years: 3,
    current_position: 'Data Analyst',
    current_company: 'DataTech Inc',
    skills: ['Python', 'SQL', 'Machine Learning', 'Tableau', 'R'],
    education: [
      {
        id: 2,
        institution: 'MIT',
        degree: 'Master of Science',
        field_of_study: 'Data Science',
        graduation_year: 2021,
        gpa: 3.9
      }
    ]
  },
  {
    id: 3,
    first_name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    linkedin_url: 'https://linkedin.com/in/emilyrodriguez',
    experience_years: 4,
    current_position: 'DevOps Engineer',
    current_company: 'CloudSystems',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
    education: [
      {
        id: 3,
        institution: 'University of Washington',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Engineering',
        graduation_year: 2020,
        gpa: 3.7
      }
    ]
  },
  {
    id: 4,
    first_name: 'David',
    last_name: 'Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 321-0987',
    location: 'Austin, TX',
    experience_years: 1,
    skills: ['JavaScript', 'React', 'Python', 'Git'],
    education: [
      {
        id: 4,
        institution: 'University of Texas at Austin',
        degree: 'Bachelor of Science',
        field_of_study: 'Computer Science',
        graduation_year: 2023,
        gpa: 3.6
      }
    ]
  }
];

export const mockApplications: Application[] = [
  {
    id: 1,
    job_id: 1,
    candidate: mockCandidates[0],
    status: 'technical_interview',
    applied_date: '2025-01-08',
    last_updated: '2025-01-12',
    resume_url: '/resumes/sarah-johnson.pdf',
    cover_letter: 'I am excited to apply for the Senior Frontend Developer position...',
    rating: 4,
    tags: ['strong-candidate', 'react-expert'],
    source: 'linkedin',
    notes: [
      {
        id: 1,
        author: 'HR Manager',
        content: 'Strong technical background, excellent portfolio',
        created_date: '2025-01-09',
        is_internal: true
      },
      {
        id: 2,
        author: 'Tech Lead',
        content: 'Impressed with React expertise and problem-solving approach',
        created_date: '2025-01-11',
        is_internal: true
      }
    ],
    interviews: [
      {
        id: 1,
        type: 'phone_screening',
        scheduled_date: '2025-01-10T14:00:00Z',
        duration_minutes: 30,
        interviewer: 'Jane Smith (HR)',
        status: 'completed',
        notes: 'Great communication skills, cultural fit looks good',
        feedback: {
          technical_skills: 4,
          communication: 5,
          cultural_fit: 5,
          overall_rating: 4,
          comments: 'Excellent candidate, moving to technical round',
          recommendation: 'hire'
        }
      },
      {
        id: 2,
        type: 'technical',
        scheduled_date: '2025-01-15T10:00:00Z',
        duration_minutes: 90,
        interviewer: 'John Doe (Tech Lead)',
        status: 'scheduled',
        meeting_link: 'https://meet.google.com/abc-defg-hij'
      }
    ]
  },
  {
    id: 2,
    job_id: 2,
    candidate: mockCandidates[1],
    status: 'screening',
    applied_date: '2025-01-07',
    last_updated: '2025-01-10',
    resume_url: '/resumes/michael-chen.pdf',
    rating: 3,
    tags: ['data-science', 'python'],
    source: 'direct',
    notes: [
      {
        id: 3,
        author: 'Hiring Manager',
        content: 'Good technical skills, need to assess cultural fit',
        created_date: '2025-01-10',
        is_internal: true
      }
    ],
    interviews: []
  },
  {
    id: 3,
    job_id: 3,
    candidate: mockCandidates[2],
    status: 'offer_extended',
    applied_date: '2025-01-05',
    last_updated: '2025-01-13',
    resume_url: '/resumes/emily-rodriguez.pdf',
    cover_letter: 'I have extensive experience in DevOps and cloud infrastructure...',
    rating: 5,
    tags: ['top-candidate', 'devops-expert', 'aws-certified'],
    source: 'referral',
    notes: [
      {
        id: 4,
        author: 'CTO',
        content: 'Exceptional candidate, perfect fit for our DevOps needs',
        created_date: '2025-01-12',
        is_internal: true
      }
    ],
    interviews: [
      {
        id: 3,
        type: 'phone_screening',
        scheduled_date: '2025-01-08T15:00:00Z',
        duration_minutes: 30,
        interviewer: 'Sarah Wilson (HR)',
        status: 'completed',
        feedback: {
          technical_skills: 5,
          communication: 4,
          cultural_fit: 5,
          overall_rating: 5,
          comments: 'Outstanding candidate with deep DevOps knowledge',
          recommendation: 'hire'
        }
      },
      {
        id: 4,
        type: 'technical',
        scheduled_date: '2025-01-11T11:00:00Z',
        duration_minutes: 120,
        interviewer: 'Mike Johnson (DevOps Lead)',
        status: 'completed',
        feedback: {
          technical_skills: 5,
          communication: 4,
          cultural_fit: 5,
          overall_rating: 5,
          comments: 'Excellent technical skills, great problem-solving approach',
          recommendation: 'hire'
        }
      },
      {
        id: 5,
        type: 'final',
        scheduled_date: '2025-01-13T14:00:00Z',
        duration_minutes: 60,
        interviewer: 'Alex Thompson (CTO)',
        status: 'completed',
        feedback: {
          technical_skills: 5,
          communication: 5,
          cultural_fit: 5,
          overall_rating: 5,
          comments: 'Perfect fit for the team, extending offer immediately',
          recommendation: 'hire'
        }
      }
    ]
  },
  {
    id: 4,
    job_id: 4,
    candidate: mockCandidates[3],
    status: 'applied',
    applied_date: '2025-01-12',
    last_updated: '2025-01-12',
    resume_url: '/resumes/david-kim.pdf',
    rating: 2,
    tags: ['entry-level', 'new-grad'],
    source: 'company_website',
    notes: [],
    interviews: []
  },
  {
    id: 5,
    job_id: 1,
    candidate: {
      id: 5,
      first_name: 'Lisa',
      last_name: 'Wang',
      email: 'lisa.wang@email.com',
      phone: '+1 (555) 654-3210',
      location: 'Los Angeles, CA',
      experience_years: 6,
      current_position: 'Senior Frontend Developer',
      current_company: 'TechGiant',
      skills: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'GraphQL'],
      education: [
        {
          id: 5,
          institution: 'UCLA',
          degree: 'Bachelor of Science',
          field_of_study: 'Computer Science',
          graduation_year: 2018,
          gpa: 3.5
        }
      ]
    },
    status: 'rejected',
    applied_date: '2025-01-06',
    last_updated: '2025-01-11',
    resume_url: '/resumes/lisa-wang.pdf',
    rating: 2,
    tags: ['overqualified'],
    source: 'indeed',
    notes: [
      {
        id: 5,
        author: 'Hiring Manager',
        content: 'Overqualified for the position, looking for more senior role',
        created_date: '2025-01-11',
        is_internal: true
      }
    ],
    interviews: [
      {
        id: 6,
        type: 'phone_screening',
        scheduled_date: '2025-01-09T16:00:00Z',
        duration_minutes: 30,
        interviewer: 'Jane Smith (HR)',
        status: 'completed',
        feedback: {
          technical_skills: 5,
          communication: 4,
          cultural_fit: 3,
          overall_rating: 3,
          comments: 'Great skills but seems overqualified and may not stay long',
          recommendation: 'no-hire'
        }
      }
    ]
  }
];

export const mockATSStats: ATSStats = {
  total_applications: 156,
  applications_this_week: 23,
  applications_this_month: 89,
  conversion_rates: {
    screening_to_interview: 65,
    interview_to_offer: 35,
    offer_to_hire: 85
  },
  average_time_to_hire: 18,
  top_sources: [
    { source: 'linkedin', count: 45, percentage: 28.8 },
    { source: 'direct', count: 38, percentage: 24.4 },
    { source: 'indeed', count: 32, percentage: 20.5 },
    { source: 'referral', count: 25, percentage: 16.0 },
    { source: 'company_website', count: 16, percentage: 10.3 }
  ],
  status_breakdown: [
    { status: 'applied', count: 45, percentage: 28.8 },
    { status: 'screening', count: 32, percentage: 20.5 },
    { status: 'phone_interview', count: 28, percentage: 17.9 },
    { status: 'technical_interview', count: 18, percentage: 11.5 },
    { status: 'final_interview', count: 12, percentage: 7.7 },
    { status: 'offer_extended', count: 8, percentage: 5.1 },
    { status: 'hired', count: 6, percentage: 3.8 },
    { status: 'rejected', count: 7, percentage: 4.5 }
  ]
};