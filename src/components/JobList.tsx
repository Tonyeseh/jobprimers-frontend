import React from 'react';
import { JobCard } from './JobCard';
import { Job } from '../types';

interface JobListProps {
  jobs: Job[];
  onJobClick: (job: Job) => void;
  onCompanyClick: (companyId: number) => void;
  loading?: boolean;
}

export const JobList: React.FC<JobListProps> = ({ jobs, onJobClick, onCompanyClick, loading }) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No jobs found</div>
        <div className="text-gray-500">Try adjusting your search filters</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onJobClick={onJobClick}
          onCompanyClick={onCompanyClick}
        />
      ))}
    </div>
  );
};