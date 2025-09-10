import React, { useState, useMemo } from 'react';
import { SearchBar } from './components/SearchBar';
import { JobList } from './components/JobList';
import { JobDetails } from './components/JobDetails';
import { CompanyProfile } from './components/CompanyProfile';
import { Job, Company, SearchFilters } from './types';
import { mockJobs, mockCompanies } from './data/mockData';
import { Briefcase } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    employment_type: '',
    experience_level: '',
    remote_option: false
  });
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isCompanyProfileOpen, setIsCompanyProfileOpen] = useState(false);

  // Filter jobs based on search criteria
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesQuery = !filters.query || 
        job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.company.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.query.toLowerCase());

      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesEmploymentType = !filters.employment_type || 
        job.employment_type === filters.employment_type;

      const matchesExperienceLevel = !filters.experience_level || 
        job.experience_level === filters.experience_level;

      const matchesRemoteOption = !filters.remote_option || job.remote_option;

      return matchesQuery && matchesLocation && matchesEmploymentType && 
             matchesExperienceLevel && matchesRemoteOption;
    });
  }, [filters]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  const handleCompanyClick = (companyId: number) => {
    setSelectedCompanyId(companyId);
    setIsCompanyProfileOpen(true);
  };

  const selectedCompany = selectedCompanyId 
    ? mockCompanies.find(c => c.id === selectedCompanyId) || null 
    : null;

  const companyJobs = selectedCompanyId 
    ? mockJobs.filter(job => job.company.id === selectedCompanyId)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">JobBoard Pro</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Jobs</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Companies</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Post a Job</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover opportunities from top companies around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{mockJobs.length}+</div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{mockCompanies.length}+</div>
              <div className="text-gray-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50k+</div>
              <div className="text-gray-600">Job Seekers</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <SearchBar filters={filters} onFiltersChange={setFilters} />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
          </h3>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Most Recent</option>
            <option>Most Relevant</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

        {/* Job Listings */}
        <JobList 
          jobs={filteredJobs}
          onJobClick={handleJobClick}
          onCompanyClick={handleCompanyClick}
        />
      </main>

      {/* Modals */}
      <JobDetails
        job={selectedJob}
        isOpen={isJobDetailsOpen}
        onClose={() => setIsJobDetailsOpen(false)}
        onCompanyClick={handleCompanyClick}
      />

      <CompanyProfile
        company={selectedCompany}
        companyJobs={companyJobs}
        isOpen={isCompanyProfileOpen}
        onClose={() => setIsCompanyProfileOpen(false)}
        onJobClick={handleJobClick}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 p-2 rounded-lg mr-3">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">JobBoard Pro</h3>
              </div>
              <p className="text-gray-400">
                Connecting talented professionals with amazing opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Search Candidates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JobBoard Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;