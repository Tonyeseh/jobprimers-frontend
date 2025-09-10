import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onFiltersChange }) => {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Query */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Job title, keywords..."
            value={filters.query}
            onChange={(e) => updateFilter('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent transition-colors"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Location"
            value={filters.location}
            onChange={(e) => updateFilter('location', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent transition-colors"
          />
        </div>

        {/* Employment Type */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.employment_type}
            onChange={(e) => updateFilter('employment_type', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent transition-colors appearance-none bg-white"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <select
            value={filters.experience_level}
            onChange={(e) => updateFilter('experience_level', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent transition-colors appearance-none bg-white"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="executive">Executive</option>
          </select>
        </div>
      </div>

      {/* Remote Option Toggle */}
      <div className="mt-4 flex items-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.remote_option}
            onChange={(e) => updateFilter('remote_option', e.target.checked)}
            className="w-4 h-4 text-[#2c54fc] border-gray-300 rounded focus:ring-[#2c54fc]"
          />
          <span className="ml-2 text-gray-700">Remote positions only</span>
        </label>
      </div>
    </div>
  );
};