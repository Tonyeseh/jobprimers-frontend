import React from 'react';
import { X, MapPin, DollarSign, Clock, Building, Wifi, Users, Calendar, ExternalLink } from 'lucide-react';
import { Job } from '../types';

interface JobDetailsProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onCompanyClick: (companyId: number) => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ job, isOpen, onClose, onCompanyClick }) => {
  if (!isOpen || !job) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <button
                onClick={() => onCompanyClick(job.company.id)}
                className="text-[#2c54fc] hover:text-[#1e3a8a] font-medium text-lg transition-colors"
              >
                {job.company.name}
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Job Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{job.location}</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <DollarSign className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Salary</div>
                <div className="font-medium">{job.salary_range}</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <Clock className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Type</div>
                <div className="font-medium capitalize">{job.employment_type.replace('-', ' ')}</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <Users className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Level</div>
                <div className="font-medium capitalize">{job.experience_level}</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 mb-2" />
              <div className="text-sm text-gray-500">Posted</div>
              <div className="font-medium">{formatDate(job.posted_date)}</div>
            </div>
            {job.remote_option && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <Wifi className="w-5 h-5 text-gray-500 mb-2" />
                <div className="text-sm text-gray-500">Work Style</div>
                <div className="font-medium">Remote Available</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-[#2c54fc] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">About {job.company.name}</h2>
              {job.company.website && (
                <a
                  href={job.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#2c54fc] hover:text-[#1e3a8a] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Website
                </a>
              )}
            </div>
            <p className="text-gray-700 mb-4">{job.company.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Industry</div>
                <div className="font-medium">{job.company.industry}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Company Size</div>
                <div className="font-medium">{job.company.size} employees</div>
              </div>
              {job.company.founded_year && (
                <div>
                  <div className="text-sm text-gray-500">Founded</div>
                  <div className="font-medium">{job.company.founded_year}</div>
                </div>
              )}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#2c54fc] text-white py-3 px-6 rounded-lg hover:bg-[#1e3a8a] transition-colors font-medium">
              Apply Now
            </button>
            <button 
              onClick={() => onCompanyClick(job.company.id)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              View Company
            </button>
            <button className="px-6 py-3 bg-[#fc9324] text-white rounded-lg hover:bg-[#e8851f] transition-colors font-medium">
              Save Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};