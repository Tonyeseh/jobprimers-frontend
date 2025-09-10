export interface Application {
  id: number;
  job_id: number;
  candidate: Candidate;
  status: ApplicationStatus;
  applied_date: string;
  last_updated: string;
  resume_url?: string;
  cover_letter?: string;
  notes: ApplicationNote[];
  interviews: Interview[];
  rating?: number;
  tags: string[];
  source: ApplicationSource;
}

export interface Candidate {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location: string;
  linkedin_url?: string;
  portfolio_url?: string;
  experience_years: number;
  current_position?: string;
  current_company?: string;
  skills: string[];
  education: Education[];
  avatar_url?: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  graduation_year: number;
  gpa?: number;
}

export interface ApplicationNote {
  id: number;
  author: string;
  content: string;
  created_date: string;
  is_internal: boolean;
}

export interface Interview {
  id: number;
  type: InterviewType;
  scheduled_date: string;
  duration_minutes: number;
  interviewer: string;
  status: InterviewStatus;
  location?: string;
  meeting_link?: string;
  notes?: string;
  feedback?: InterviewFeedback;
}

export interface InterviewFeedback {
  technical_skills: number;
  communication: number;
  cultural_fit: number;
  overall_rating: number;
  comments: string;
  recommendation: 'hire' | 'no-hire' | 'maybe';
}

export type ApplicationStatus = 
  | 'applied' 
  | 'screening' 
  | 'phone_interview' 
  | 'technical_interview' 
  | 'final_interview' 
  | 'offer_extended' 
  | 'hired' 
  | 'rejected' 
  | 'withdrawn';

export type InterviewType = 
  | 'phone_screening' 
  | 'video_call' 
  | 'technical' 
  | 'behavioral' 
  | 'final' 
  | 'onsite';

export type InterviewStatus = 
  | 'scheduled' 
  | 'completed' 
  | 'cancelled' 
  | 'no_show';

export type ApplicationSource = 
  | 'direct' 
  | 'linkedin' 
  | 'indeed' 
  | 'glassdoor' 
  | 'referral' 
  | 'company_website';

export interface ATSFilters {
  status: ApplicationStatus | '';
  job_id: number | '';
  date_range: {
    start: string;
    end: string;
  };
  rating_min: number;
  source: ApplicationSource | '';
  search_query: string;
}

export interface ATSStats {
  total_applications: number;
  applications_this_week: number;
  applications_this_month: number;
  conversion_rates: {
    screening_to_interview: number;
    interview_to_offer: number;
    offer_to_hire: number;
  };
  average_time_to_hire: number;
  top_sources: Array<{
    source: ApplicationSource;
    count: number;
    percentage: number;
  }>;
  status_breakdown: Array<{
    status: ApplicationStatus;
    count: number;
    percentage: number;
  }>;
}