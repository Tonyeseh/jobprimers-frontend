import React from 'react';
import { Calendar, Star, MapPin, Briefcase, Clock, Mail, Phone, ExternalLink } from 'lucide-react';
import { Application, ApplicationStatus } from '../../types/ats';

interface ApplicationCardProps {
  application: Application;
  onApplicationClick: (application: Application) => void;
  onScheduleInterview: (application: Application) => void;
  getStatusColor: (status: ApplicationStatus) => string;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onApplicationClick,
  onScheduleInterview,
  getStatusColor
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getJobTitle = () => {
    // In a real app, you'd fetch this from your jobs data
    const jobTitles: { [key: number]: string } = {
      1: 'Senior Frontend Developer',
      2: 'Data Scientist',
      3: 'DevOps Engineer',
      4: 'Junior Full Stack Developer',
      5: 'Product Manager'
    };
    return jobTitles[application.job_id] || 'Unknown Position';
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const getSourceColor = (source: string) => {
    const colors = {
      linkedin: 'bg-blue-100 text-blue-800',
      indeed: 'bg-green-100 text-green-800',
      glassdoor: 'bg-teal-100 text-teal-800',
      referral: 'bg-purple-100 text-purple-800',
      direct: 'bg-gray-100 text-gray-800',
      company_website: 'bg-indigo-100 text-indigo-800'
    };
    return colors[source as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 
                className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-[#2c54fc] transition-colors"
                onClick={() => onApplicationClick(application)}
              >
                {application.candidate.first_name} {application.candidate.last_name}
              </h3>
              <div className="flex items-center text-gray-600 mt-1">
                <Briefcase className="w-4 h-4 mr-1" />
                <span className="text-sm">{getJobTitle()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {renderStars(application.rating)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                {application.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span className="text-sm">{application.candidate.email}</span>
            </div>
            {application.candidate.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{application.candidate.phone}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{application.candidate.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">Applied {formatDate(application.applied_date)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(application.source)}`}>
                {application.source.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-sm text-gray-600">
                {application.candidate.experience_years} years experience
              </span>
              {application.candidate.current_position && (
                <span className="text-sm text-gray-600">
                  {application.candidate.current_position}
                  {application.candidate.current_company && ` at ${application.candidate.current_company}`}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {application.candidate.linkedin_url && (
                <a
                  href={application.candidate.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-[#2c54fc] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => onScheduleInterview(application)}
                className="px-3 py-1 bg-[#fc9324] text-white rounded text-sm hover:bg-[#e8851f] transition-colors"
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                Schedule
              </button>
              <button
                onClick={() => onApplicationClick(application)}
                className="px-3 py-1 bg-[#2c54fc] text-white rounded text-sm hover:bg-[#1e3a8a] transition-colors"
              >
                View Details
              </button>
            </div>
          </div>

          {application.tags.length > 0 && (
            <div className="flex items-center space-x-2 mt-3">
              {application.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};