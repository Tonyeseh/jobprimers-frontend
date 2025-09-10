import React, { useState } from 'react';
import { X, Star, Calendar, MapPin, Mail, Phone, ExternalLink, FileText, MessageSquare, Clock, User, Award } from 'lucide-react';
import { Application, ApplicationNote, InterviewStatus } from '../../types/ats';

interface ApplicationDetailsProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleInterview: (application: Application) => void;
}

export const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  isOpen,
  onClose,
  onScheduleInterview
}) => {
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'notes'>('overview');

  if (!isOpen || !application) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInterviewStatusColor = (status: InterviewStatus) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      no_show: 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  const renderStars = (rating: number) => {
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
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    // In a real app, this would make an API call
    console.log('Adding note:', newNote);
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {application.candidate.first_name} {application.candidate.last_name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{application.candidate.email}</span>
                </div>
                {application.candidate.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    <span>{application.candidate.phone}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{application.candidate.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-8 mt-6">
            {['overview', 'interviews', 'notes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-2 border-b-2 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-[#2c54fc] text-[#2c54fc]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Application Status & Rating */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Application Status</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {application.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Rating</h3>
                  {application.rating ? renderStars(application.rating) : <span className="text-gray-500">Not rated</span>}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Applied Date</h3>
                  <span className="text-gray-700">{formatDate(application.applied_date)}</span>
                </div>
              </div>

              {/* Candidate Information */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Experience</h4>
                    <p className="text-gray-700">{application.candidate.experience_years} years</p>
                    {application.candidate.current_position && (
                      <>
                        <h4 className="font-medium text-gray-900 mb-2 mt-4">Current Position</h4>
                        <p className="text-gray-700">
                          {application.candidate.current_position}
                          {application.candidate.current_company && ` at ${application.candidate.current_company}`}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {application.candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#2c54fc]/10 text-[#2c54fc] rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {application.candidate.linkedin_url && (
                  <div className="mt-4">
                    <a
                      href={application.candidate.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#2c54fc] hover:text-[#1e3a8a] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>

              {/* Education */}
              {application.candidate.education.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {application.candidate.education.map((edu) => (
                      <div key={edu.id} className="border-l-4 border-[#2c54fc] pl-4">
                        <h4 className="font-medium text-gray-900">{edu.degree} in {edu.field_of_study}</h4>
                        <p className="text-gray-700">{edu.institution}</p>
                        <p className="text-gray-600 text-sm">
                          Graduated {edu.graduation_year}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {application.cover_letter && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h3>
                  <p className="text-gray-700 whitespace-pre-line">{application.cover_letter}</p>
                </div>
              )}

              {/* Resume */}
              {application.resume_url && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
                  <a
                    href={application.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#2c54fc] hover:text-[#1e3a8a] transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Resume
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Interview History</h3>
                <button
                  onClick={() => onScheduleInterview(application)}
                  className="bg-[#2c54fc] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Schedule Interview
                </button>
              </div>

              {application.interviews.length > 0 ? (
                <div className="space-y-4">
                  {application.interviews.map((interview) => (
                    <div key={interview.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 capitalize">
                            {interview.type.replace('_', ' ')} Interview
                          </h4>
                          <p className="text-gray-600">with {interview.interviewer}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInterviewStatusColor(interview.status)}`}>
                          {interview.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(interview.scheduled_date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{interview.duration_minutes} minutes</span>
                        </div>
                      </div>

                      {interview.meeting_link && (
                        <div className="mb-4">
                          <a
                            href={interview.meeting_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#2c54fc] hover:text-[#1e3a8a] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Join Meeting
                          </a>
                        </div>
                      )}

                      {interview.notes && (
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                          <p className="text-gray-700">{interview.notes}</p>
                        </div>
                      )}

                      {interview.feedback && (
                        <div className="border-t border-gray-200 pt-4">
                          <h5 className="font-medium text-gray-900 mb-3">Interview Feedback</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <span className="text-sm text-gray-600">Technical Skills</span>
                              {renderStars(interview.feedback.technical_skills)}
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Communication</span>
                              {renderStars(interview.feedback.communication)}
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Cultural Fit</span>
                              {renderStars(interview.feedback.cultural_fit)}
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Overall</span>
                              {renderStars(interview.feedback.overall_rating)}
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              interview.feedback.recommendation === 'hire' ? 'bg-green-100 text-green-800' :
                              interview.feedback.recommendation === 'no-hire' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {interview.feedback.recommendation.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-700">{interview.feedback.comments}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h4>
                  <p className="text-gray-500 mb-4">Schedule the first interview to get started.</p>
                  <button
                    onClick={() => onScheduleInterview(application)}
                    className="bg-[#2c54fc] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors"
                  >
                    Schedule Interview
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Notes</h3>
                
                {/* Add Note */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note about this candidate..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={addNote}
                      disabled={!newNote.trim()}
                      className="bg-[#2c54fc] text-white px-4 py-2 rounded-lg hover:bg-[#1e3a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Notes List */}
                {application.notes.length > 0 ? (
                  <div className="space-y-4">
                    {application.notes.map((note) => (
                      <div key={note.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="font-medium text-gray-900">{note.author}</span>
                            {note.is_internal && (
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                Internal
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{formatDate(note.created_date)}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h4>
                    <p className="text-gray-500">Add the first note about this candidate.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl">
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2c54fc] focus:border-transparent">
                <option value={application.status}>Change Status</option>
                <option value="screening">Move to Screening</option>
                <option value="phone_interview">Schedule Phone Interview</option>
                <option value="technical_interview">Schedule Technical Interview</option>
                <option value="final_interview">Schedule Final Interview</option>
                <option value="offer_extended">Extend Offer</option>
                <option value="hired">Mark as Hired</option>
                <option value="rejected">Reject Application</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onScheduleInterview(application)}
                className="px-4 py-2 bg-[#fc9324] text-white rounded-lg hover:bg-[#e8851f] transition-colors"
              >
                Schedule Interview
              </button>
              <button className="px-4 py-2 bg-[#2c54fc] text-white rounded-lg hover:bg-[#1e3a8a] transition-colors">
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};