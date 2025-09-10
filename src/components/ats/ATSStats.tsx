import React from 'react';
import { Users, TrendingUp, Clock, Target, Calendar, Award } from 'lucide-react';
import { ATSStats as ATSStatsType } from '../../types/ats';

interface ATSStatsProps {
  stats: ATSStatsType;
}

export const ATSStats: React.FC<ATSStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Applications</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total_applications}</p>
            <p className="text-sm text-green-600">
              +{stats.applications_this_week} this week
            </p>
          </div>
          <div className="bg-[#2c54fc]/10 p-3 rounded-lg">
            <Users className="w-6 h-6 text-[#2c54fc]" />
          </div>
        </div>
      </div>

      {/* This Month */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">This Month</p>
            <p className="text-3xl font-bold text-gray-900">{stats.applications_this_month}</p>
            <p className="text-sm text-[#fc9324]">
              {Math.round((stats.applications_this_month / stats.total_applications) * 100)}% of total
            </p>
          </div>
          <div className="bg-[#fc9324]/10 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-[#fc9324]" />
          </div>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Interview Rate</p>
            <p className="text-3xl font-bold text-gray-900">{stats.conversion_rates.screening_to_interview}%</p>
            <p className="text-sm text-green-600">
              Screening to Interview
            </p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Time to Hire */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg. Time to Hire</p>
            <p className="text-3xl font-bold text-gray-900">{stats.average_time_to_hire}</p>
            <p className="text-sm text-gray-600">days</p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Conversion Rates Detail */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Screening → Interview</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-[#2c54fc] h-2 rounded-full" 
                  style={{ width: `${stats.conversion_rates.screening_to_interview}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{stats.conversion_rates.screening_to_interview}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Interview → Offer</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-[#fc9324] h-2 rounded-full" 
                  style={{ width: `${stats.conversion_rates.interview_to_offer}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{stats.conversion_rates.interview_to_offer}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Offer → Hire</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${stats.conversion_rates.offer_to_hire}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{stats.conversion_rates.offer_to_hire}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Application Sources</h3>
        <div className="space-y-3">
          {stats.top_sources.map((source, index) => (
            <div key={source.source} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  index === 0 ? 'bg-[#2c54fc]' :
                  index === 1 ? 'bg-[#fc9324]' :
                  index === 2 ? 'bg-green-500' :
                  index === 3 ? 'bg-purple-500' :
                  'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-700 capitalize">
                  {source.source.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">{source.count}</span>
                <span className="text-sm font-medium text-gray-900">{source.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};