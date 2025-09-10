export interface Job {
  id: number;
  title: string;
  company: Company;
  location: string;
  salary_range: string;
  employment_type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  description: string;
  requirements: string[];
  posted_date: string;
  application_deadline?: string;
  remote_option: boolean;
  experience_level: 'entry' | 'mid' | 'senior' | 'executive';
}

export interface Company {
  id: number;
  name: string;
  logo?: string;
  website?: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  founded_year?: number;
}

export interface SearchFilters {
  query: string;
  location: string;
  employment_type: string;
  experience_level: string;
  remote_option: boolean;
}