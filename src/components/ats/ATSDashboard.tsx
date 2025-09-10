import React, { useState, useMemo } from 'react';
import { Users, TrendingUp, Clock, Target, Filter, Search, Calendar, Star } from 'lucide-react';
import { Application, ATSFilters, ApplicationStatus } from '../../types/ats';
import { mockApplications, mockATSStats } from '../../data/atsData';
import { ApplicationCard } from './ApplicationCard';
import { ApplicationDetails } from './ApplicationDetails';
import { ATSStats } from './ATSStats';
import { InterviewScheduler } from './InterviewScheduler';

export const ATSDashboard: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isApplicationDetailsOpen, setIsApplicationDetailsOpen] = useState(false);
  const [isInterviewSchedulerOpen, setIsInterviewSchedulerOpen] = useState(false);
  const [filters, setFilters] = useState<ATSFilters>({
    status: '',
    job_id: '',
    date_range: { start: '', end: '' },
    rating_min: 0,
    source: '',
    search_query: ''
  });

  const filteredApplications = useMemo(() => {
    return mockApplications.filter(app => {
      const matchesStatus = !filters.status || app.status === filters.status;
      const matchesJob = !filters.job_id || app.job_id === filters.job_id;
      const matchesRating = app.rating ? app.rating >= filters.rating_min : filters.rating_min === 0;
      const matchesSource = !filters.source || app.source === filters.source;
      const matchesSearch = !filters.search_query || 
        app.candidate.first_name.toLowerCase().includes(filters.search_query.toLowerCase()) ||
        app.candidate.last_name.toLowerCase().includes(filters.search_query.toLowerCase()) ||
        app.candidate.email.toLowerCase().includes(filters.search_query.toLowerCase());

      return matchesStatus && matchesJob && matchesRating && matchesSource && matchesSearch;
    });
  }, [filters]);

  const handleApplicationClick = (application: Application) => {
    setSelectedApplication(application);
    setIsApplicationDetailsOpen(true);
  };

  const handleScheduleInterview = (application: Application) => {
    setSelectedApplication(application);
    setIsInterviewSchedulerOpen(true);
  };

  const getStatusColor = (status: ApplicationStatus) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      screening: 'bg-yellow-100 text-yellow-800',
      phone_interview: 'bg-purple-100 text-purple-800',
      technical_interview: 'bg-indigo-100 text-indigo-800',
      final_interview: 'bg-pink-100 text-pink-800',
      offer_extended: 'bg-green-100 text-green-800',
      hired: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800',
      withdrawn: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ATS Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage applications and track candidates</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-[#2c54fc] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors">
                Export Data
              </button>
              <button 
                onClick={() => setIsInterviewSchedulerOpen(true)}
                className="bg-[#fc9324] text-white px-4 py-2 rounded-lg hover:bg-[#e8851f] transition-colors"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <ATSStats stats={mockATSStats} />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Filter Applications</h2>
            <button
              onClick={() => setFilters({
                status: '',
                job_id: '',
                date_range: { start: '', end: '' },
                rating_min: 0,
                source: '',
                search_query: ''
              })}
              className="text-[#2c54fc] hover:text-[#1e3a8a] text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={filters.search_query}
                onChange={(e) => setFilters({ ...filters, search_query: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
              />
            </div>

            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as ApplicationStatus })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
            >
              <option value="">All Statuses</option>
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="phone_interview">Phone Interview</option>
              <option value="technical_interview">Technical Interview</option>
              <option value="final_interview">Final Interview</option>
              <option value="offer_extended">Offer Extended</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value as any })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
            >
              <option value="">All Sources</option>
              <option value="direct">Direct</option>
              <option value="linkedin">LinkedIn</option>
              <option value="indeed">Indeed</option>
              <option value="glassdoor">Glassdoor</option>
              <option value="referral">Referral</option>
              <option value="company_website">Company Website</option>
            </select>

            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-gray-400" />
              <select
                value={filters.rating_min}
                onChange={(e) => setFilters({ ...filters, rating_min: Number(e.target.value) })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
              >
                <option value={0}>Any Rating</option>
                <option value={1}>1+ Stars</option>
                <option value={2}>2+ Stars</option>
                <option value={3}>3+ Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Applications ({filteredApplications.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>Most Recent</option>
                  <option>Highest Rated</option>
                  <option>Status</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onApplicationClick={handleApplicationClick}
                onScheduleInterview={handleScheduleInterview}
                getStatusColor={getStatusColor}
              />
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ApplicationDetails
        application={selectedApplication}
        isOpen={isApplicationDetailsOpen}
        onClose={() => setIsApplicationDetailsOpen(false)}
        onScheduleInterview={handleScheduleInterview}
      />

      <InterviewScheduler
        application={selectedApplication}
        isOpen={isInterviewSchedulerOpen}
        onClose={() => setIsInterviewSchedulerOpen(false)}
      />
    </div>
  );
};