import React from 'react';
import { X, ExternalLink, MapPin, Users, Calendar, Building } from 'lucide-react';
import { Company, Job } from '../types';
import { JobCard } from './JobCard';

interface CompanyProfileProps {
  company: Company | null;
  companyJobs: Job[];
  isOpen: boolean;
  onClose: () => void;
  onJobClick: (job: Job) => void;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ 
  company, 
  companyJobs, 
  isOpen, 
  onClose, 
  onJobClick 
}) => {
  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
              <p className="text-gray-600 text-lg">{company.industry}</p>
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
          {/* Company Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{company.location}</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <Users className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Company Size</div>
                <div className="font-medium">{company.size} employees</div>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-4 rounded-lg">
              <Building className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Industry</div>
                <div className="font-medium">{company.industry}</div>
              </div>
            </div>
            {company.founded_year && (
              <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-500">Founded</div>
                  <div className="font-medium">{company.founded_year}</div>
                </div>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About {company.name}</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{company.description}</p>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </a>
            )}
          </div>

          {/* Open Positions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Open Positions ({companyJobs.length})
              </h2>
            </div>
            
            {companyJobs.length > 0 ? (
              <div className="space-y-6">
                {companyJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onJobClick={onJobClick}
                    onCompanyClick={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-2">No open positions</div>
                <div className="text-gray-500">Check back later for new opportunities</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};