import React, { useState } from 'react';
import { X, Calendar, Clock, User, Video, MapPin, FileText } from 'lucide-react';
import { Application, InterviewType } from '../../types/ats';

interface InterviewSchedulerProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  application,
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    type: 'phone_screening' as InterviewType,
    date: '',
    time: '',
    duration: 30,
    interviewer: '',
    location: '',
    meeting_link: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to schedule the interview
    console.log('Scheduling interview:', formData);
    onClose();
  };

  const interviewTypes = [
    { value: 'phone_screening', label: 'Phone Screening', icon: '📞' },
    { value: 'video_call', label: 'Video Call', icon: '💻' },
    { value: 'technical', label: 'Technical Interview', icon: '⚡' },
    { value: 'behavioral', label: 'Behavioral Interview', icon: '🧠' },
    { value: 'final', label: 'Final Interview', icon: '🎯' },
    { value: 'onsite', label: 'On-site Interview', icon: '🏢' }
  ];

  const durationOptions = [
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 45, label: '45 minutes' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Schedule Interview</h1>
              {application && (
                <p className="text-gray-600 mt-1">
                  with {application.candidate.first_name} {application.candidate.last_name}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Interview Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interview Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interviewTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value as InterviewType })}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    formData.type === type.value
                      ? 'border-[#2c54fc] bg-[#2c54fc]/5 text-[#2c54fc]'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-lg mb-1">{type.icon}</div>
                  <div className="text-sm font-medium">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
            >
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Interviewer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interviewer
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                required
                placeholder="Enter interviewer name and role"
                value={formData.interviewer}
                onChange={(e) => setFormData({ ...formData, interviewer: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
              />
            </div>
          </div>

          {/* Location or Meeting Link */}
          {formData.type === 'onsite' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter office address or meeting room"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Link
              </label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  placeholder="Enter video call link (Zoom, Google Meet, etc.)"
                  value={formData.meeting_link}
                  onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <textarea
                placeholder="Add any additional notes or instructions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2c54fc] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors"
            >
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};