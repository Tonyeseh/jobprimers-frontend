import React from 'react';
import { MapPin, Clock, DollarSign, Building, Wifi } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onJobClick: (job: Job) => void;
  onCompanyClick: (companyId: number) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onJobClick, onCompanyClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-[#2c54fc]/10 text-[#2c54fc]';
      case 'part-time': return 'bg-[#fc9324]/10 text-[#fc9324]';
      case 'contract': return 'bg-teal-100 text-teal-800';
      case 'freelance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'entry': return 'bg-emerald-100 text-emerald-800';
      case 'mid': return 'bg-[#fc9324]/10 text-[#fc9324]';
      case 'senior': return 'bg-[#2c54fc]/10 text-[#2c54fc]';
      case 'executive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 
            className="text-xl font-semibold text-gray-900 mb-1 hover:text-[#2c54fc] transition-colors cursor-pointer"
            onClick={() => onJobClick(job)}
          >
            {job.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompanyClick(job.company.id);
            }}
            className="text-[#2c54fc] hover:text-[#1e3a8a] font-medium transition-colors"
          >
            {job.company.name}
          </button>
        </div>
        <div className="text-right">
          <div className="flex items-center text-gray-600 mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatDate(job.posted_date)}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{job.location}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="text-sm">{job.salary_range}</span>
        </div>
        <div className="flex items-center">
          <Building className="w-4 h-4 mr-1" />
          <span className="text-sm">{job.company.industry}</span>
        </div>
        {job.remote_option && (
          <div className="flex items-center">
            <Wifi className="w-4 h-4 mr-1" />
            <span className="text-sm">Remote</span>
          </div>
        )}
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-3">
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(job.employment_type)}`}>
            {job.employment_type.replace('-', ' ').toUpperCase()}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExperienceColor(job.experience_level)}`}>
            {job.experience_level.toUpperCase()} LEVEL
          </span>
        </div>
        <button
          onClick={() => onJobClick(job)}
          className="px-4 py-2 bg-[#2c54fc] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};