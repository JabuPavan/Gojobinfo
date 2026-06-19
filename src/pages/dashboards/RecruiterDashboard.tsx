import React, { useState } from 'react';
import { useJobStore } from '../../store/useJobStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Briefcase, Users, FileText, Plus, Calendar, Clock, Award, X } from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const { user, addNotification } = useAuthStore();
  const { jobs, applications, postJob, updateApplicationStatus, deleteJob } = useJobStore();

  const [activeTab, setActiveTab] = useState<'applications' | 'active-jobs' | 'post-job'>('applications');

  // Input states for posting a new job
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('TechVibe Solutions');
  const [location, setLocation] = useState('Bangalore, Karnataka');
  const [salaryRange, setSalaryRange] = useState('₹10,00,000 - ₹15,00,000 P.A.');
  const [experienceRequired, setExperienceRequired] = useState('2 - 5 years');
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site'>('Hybrid');
  const [jobType, setJobType] = useState<'Full-Time' | 'Part-Time' | 'Contract'>('Full-Time');
  const [industry] = useState('IT Services & Consulting');
  const [description, setDescription] = useState('');
  const [requirementsInput, setRequirementsInput] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  
  // Local interview state scheduler
  const [schedulerAppId, setSchedulerAppId] = useState<string | null>(null);
  const [interviewDate, setInterviewDate] = useState('');

  // Handle post job
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim() || !description.trim() || !requirementsInput.trim() || !responsibilitiesInput.trim()) {
      alert('Please fill out all mandatory job posting details.');
      return;
    }

    const requirements = requirementsInput.split('\n').filter(r => r.trim() !== '');
    const responsibilities = responsibilitiesInput.split('\n').filter(r => r.trim() !== '');

    postJob({
      title: jobTitle,
      companyName,
      companyLogoColor: 'bg-indigo-650',
      location,
      salaryRange,
      experienceRequired,
      workMode,
      jobType,
      industry,
      description,
      requirements,
      responsibilities
    });

    // Notify auth store
    addNotification(
      'New Job Published',
      `You successfully posted the job opening for ${jobTitle} at ${companyName}.`,
      'system'
    );

    // Reset fields
    setJobTitle('');
    setDescription('');
    setRequirementsInput('');
    setResponsibilitiesInput('');
    
    alert('Job published successfully!');
    setActiveTab('active-jobs');
  };

  // Interview submit
  const handleScheduleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulerAppId || !interviewDate) return;

    updateApplicationStatus(schedulerAppId, 'Interview Scheduled', interviewDate);
    
    // Find candidate details
    const app = applications.find(a => a.id === schedulerAppId);
    if (app) {
      addNotification(
        'Interview Booked',
        `Interview scheduled for ${app.candidateName} for ${app.jobTitle} on ${interviewDate}.`,
        'job'
      );
    }
    
    setSchedulerAppId(null);
    setInterviewDate('');
    alert('Interview scheduled successfully!');
  };

  // Recruiter stats metrics
  const pendingApps = applications.filter(a => a.status === 'Applied' || a.status === 'Reviewing').length;
  const shortlistedApps = applications.filter(a => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300 bg-purple-950/20 px-2.5 py-1 rounded">
            Recruiter Workspace
          </span>
          <h1 className="text-2xl font-black mt-2">Welcome Back, {user?.name}!</h1>
          <p className="text-xs text-purple-100 mt-1">
            Managing corporate applications and posting vacancies for <strong>TechVibe Solutions</strong>.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('post-job')}
          className="bg-white text-purple-800 hover:bg-slate-50 font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all select-none flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Publish New Vacancy
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Published Jobs', val: jobs.length, desc: 'Active job openings posted', icon: Briefcase, color: 'text-purple-600' },
          { label: 'Total Applications', val: applications.length, desc: 'Resumes received', icon: Users, color: 'text-indigo-500' },
          { label: 'Shortlisted Talent', val: shortlistedApps, desc: 'Talents advanced to interview stages', icon: Award, color: 'text-brand-teal' },
          { label: 'Pending Reviews', val: pendingApps, desc: 'Unreviewed applications', icon: Clock, color: 'text-brand-orange' }
        ].map((met, i) => {
          const IconComp = met.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold text-slate-400">{met.label}</span>
                <IconComp className={`w-4 h-4 ${met.color}`} />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">{met.val}</h3>
              <p className="text-[9px] text-slate-400 mt-0.5">{met.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Main split tab view */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-4 shadow-sm h-fit">
          <div className="flex flex-col gap-1 text-xs">
            {[
              { id: 'applications', label: 'Candidate Applications', icon: Users },
              { id: 'active-jobs', label: 'Manage Posted Jobs', icon: Briefcase },
              { id: 'post-job', label: 'Post a New Job', icon: Plus }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left p-3 rounded-lg font-bold flex items-center gap-2.5 transition-all ${
                    active 
                      ? 'bg-purple-50 text-purple-700 font-extrabold border-l-4 border-purple-700' 
                      : 'hover:bg-slate-50 text-slate-655'
                  }`}
                >
                  <TabIcon className="w-4.5 h-4.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport content */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: APPLICATIONS LIST */}
          {activeTab === 'applications' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Candidate Applications Inbox
              </h3>

              {applications.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No talent applications received yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {applications.map((app) => (
                    <div 
                      key={app.id} 
                      className="border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-3 hover:shadow-sm"
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-850">
                            Candidate: {app.candidateName}
                          </h4>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            Applied For: <strong className="text-brand-blue">{app.jobTitle}</strong>
                          </p>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          app.status === 'Applied' ? 'bg-orange-50 text-brand-orange border border-orange-100' :
                          app.status === 'Shortlisted' ? 'bg-teal-50 text-brand-teal border border-teal-100' :
                          app.status === 'Interview Scheduled' ? 'bg-blue-50 text-brand-blue border border-blue-100' :
                          'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 mt-2 bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                          <span>Resume: <strong className="text-slate-800 underline cursor-pointer" onClick={() => alert(`Mock Downloading File: ${app.resumeName}`)}>{app.resumeName}</strong></span>
                        </div>
                        {app.coverLetter && (
                          <p className="mt-1 leading-normal italic">Cover Letter: "{app.coverLetter}"</p>
                        )}
                        {app.interviewDate && (
                          <div className="mt-1.5 p-2 bg-blue-50 border border-blue-100 rounded text-brand-blue font-bold flex items-center gap-1">
                            <Calendar className="w-4.5 h-4.5 text-brand-blue" />
                            Interview Scheduled: {app.interviewDate}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center border-t border-slate-100 pt-3 mt-2 text-[10px] text-slate-450 font-bold">
                        <span>Applied on {app.appliedDate}</span>
                        <div className="flex gap-1.5">
                          {app.status === 'Applied' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Reviewing')}
                              className="text-[10px] border border-slate-200 text-slate-655 hover:bg-slate-50 px-2.5 py-1 rounded transition-colors"
                            >
                              Review Resume
                            </button>
                          )}
                          {app.status !== 'Shortlisted' && app.status !== 'Interview Scheduled' && app.status !== 'Rejected' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Shortlisted')}
                              className="text-[10px] border border-teal-200 text-brand-teal hover:bg-teal-50 px-2.5 py-1 rounded transition-colors"
                            >
                              Shortlist Candidate
                            </button>
                          )}
                          {(app.status === 'Shortlisted' || app.status === 'Reviewing' || app.status === 'Applied') && (
                            <button
                              onClick={() => setSchedulerAppId(app.id)}
                              className="text-[10px] bg-brand-blue hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded shadow-sm transition-all"
                            >
                              Schedule Interview
                            </button>
                          )}
                          {app.status !== 'Rejected' && (
                            <button
                              onClick={() => updateApplicationStatus(app.id, 'Rejected')}
                              className="text-[10px] text-red-655 hover:bg-red-50 font-bold px-2.5 py-1 rounded transition-colors"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTIVE JOBS */}
          {activeTab === 'active-jobs' && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Manage Active Job Openings
              </h3>

              <div className="flex flex-col gap-4">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-slate-200 rounded-xl p-4.5 flex justify-between items-center gap-4 hover:shadow-sm">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{job.title}</h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                        {job.location} | Exp: {job.experienceRequired} | Salary: {job.salaryRange}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to remove the job listing: ${job.title}?`)) {
                          deleteJob(job.id);
                        }
                      }}
                      className="text-[10px] text-red-500 hover:text-red-700 font-bold border border-red-100 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors shrink-0"
                    >
                      Delete Post
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: POST A JOB */}
          {activeTab === 'post-job' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                Publish a New Job Opening
              </h3>

              <form onSubmit={handlePostJob} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Job Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior React Developer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700 text-slate-705 font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Company Name</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700 text-slate-705 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Job Location</label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700 text-slate-705 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Salary Range</label>
                    <input
                      type="text"
                      required
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700 text-slate-750 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Experience Needed</label>
                    <input
                      type="text"
                      required
                      value={experienceRequired}
                      onChange={(e) => setExperienceRequired(e.target.value)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Work Setup</label>
                    <select
                      value={workMode}
                      onChange={(e) => setWorkMode(e.target.value as any)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="On-site">On-site</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Job Type</label>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value as any)}
                      className="border border-slate-200 rounded-lg p-2.5 text-xs bg-slate-50"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Job Description Summary</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide overview of role scope..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700 text-slate-705 leading-relaxed"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Skills Requirements (one per line)</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Proficiency in React and TypeScript&#10;Experience with state managers..."
                    value={requirementsInput}
                    onChange={(e) => setRequirementsInput(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Core Responsibilities (one per line)</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Design modular frontend React components&#10;Conduct code reviews..."
                    value={responsibilitiesInput}
                    onChange={(e) => setResponsibilitiesInput(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow transition-all active:scale-95 w-fit self-end"
                >
                  Publish Job Posting
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* SCHEDULE INTERVIEW DIALOG */}
      {schedulerAppId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSchedulerAppId(null)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full border border-slate-205 p-6 animate-fade-in z-10">
            <button
              onClick={() => setSchedulerAppId(null)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-extrabold text-slate-900 mb-2">Schedule Job Interview</h3>
            <p className="text-xs text-slate-450 mb-5">
              Select date & time for the candidate's interview session.
            </p>

            <form onSubmit={handleScheduleInterviewSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-slate-400">Choose Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-purple-700 text-slate-705 font-bold"
                />
              </div>

              <button
                type="submit"
                className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-sm transition-all active:scale-95 mt-2"
              >
                Book Interview Slot
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
export default RecruiterDashboard;
