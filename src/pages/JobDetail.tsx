import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Upload, FileText, CheckCircle, X } from 'lucide-react';
import { useJobStore } from '../store/useJobStore';
import { useAuthStore } from '../store/useAuthStore';

export const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { jobs, applyJob, applications } = useJobStore();
  const { user, addNotification, isAuthenticated } = useAuthStore();

  // Find job details
  const job = useMemo(() => {
    return jobs.find(j => j.id === id);
  }, [jobs, id]);

  // Modal apply state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<string>('');
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState('');

  // Sync modal trigger from URL ?apply=true
  useEffect(() => {
    if (searchParams.get('apply') === 'true' && job) {
      if (!isAuthenticated) {
        navigate(`/auth?redirect=${encodeURIComponent(`/jobs/${job?.id}?apply=true`)}`, { replace: true });
      } else {
        setShowApplyModal(true);
      }
    }
  }, [searchParams, job, isAuthenticated, navigate]);

  // Sync user profile state
  useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=${encodeURIComponent(`/jobs/${job?.id}?apply=true`)}`);
    } else {
      setShowApplyModal(true);
    }
  };

  // Check if already applied
  const isAlreadyApplied = useMemo(() => {
    if (!job) return false;
    return applications.some(app => app.jobId === job.id && app.candidateEmail === user?.email);
  }, [applications, job, user]);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Job vacancy not found</h2>
        <p className="text-slate-500 mt-2">The job post ID may be incorrect or has been closed by the recruiter.</p>
        <Link to="/jobs" className="mt-5 inline-block bg-brand-blue text-white px-5 py-2 rounded-lg font-bold text-xs">
          Back to Jobs Board
        </Link>
      </div>
    );
  }

  // Handle Application Submit
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setApplyError('Please fill out all mandatory contact fields.');
      return;
    }
    if (!resumeFile) {
      setApplyError('Please upload your resume to proceed.');
      return;
    }

    setApplyError('');
    applyJob(job.id, fullName, email, phone, resumeFile, coverLetter);

    // Add notification to Zustand store
    addNotification(
      'Application Submitted',
      `You successfully applied for the position of ${job.title} at ${job.companyName}.`,
      'job'
    );

    setApplySuccess(true);
    setCoverLetter('');
    setTimeout(() => {
      setApplySuccess(false);
      setShowApplyModal(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Back Link */}
      <Link 
        to="/jobs" 
        className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-blue text-xs font-bold mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Jobs Board
      </Link>

      {/* Main Grid: Details columns left, CTA apply sidebar right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2-spans): Job Description requirements */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Header Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex gap-4 items-start">
              <div className={`w-14 h-14 rounded-2xl ${job.companyLogoColor} text-white flex items-center justify-center font-extrabold text-lg uppercase shadow shrink-0`}>
                {job.companyName.substring(0, 2)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {job.title}
                </h1>
                <p className="text-sm text-brand-blue font-bold mt-1">{job.companyName}</p>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-slate-400" /> {job.location}
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-slate-400" /> {job.jobType} / {job.workMode}
                  </span>
                  <span className="text-slate-200">|</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    {job.salaryRange}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Specifications Body */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm text-xs sm:text-sm text-slate-650 flex flex-col gap-6 leading-relaxed">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Job Description</h3>
              <p>{job.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Key Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Requirements & Skills</h3>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Right Column: CTA Apply Sidebar card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-24 h-fit">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2.5">
              Application Portal
            </h3>

            <div className="flex flex-col gap-3.5 mb-6 text-xs text-slate-600">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-450">Experience required:</span>
                <span className="font-bold text-slate-800">{job.experienceRequired}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-450">Employment Type:</span>
                <span className="font-bold text-slate-850">{job.jobType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-semibold text-slate-450">Work Setup:</span>
                <span className="font-bold text-slate-850">{job.workMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-455">Industry:</span>
                <span className="font-bold text-slate-850">{job.industry}</span>
              </div>
            </div>

            {isAlreadyApplied ? (
              <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-semibold p-3.5 rounded-xl text-center flex items-center justify-center gap-1.5 mb-4">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" /> Application submitted already!
              </div>
            ) : (
              <button
                onClick={handleApplyClick}
                className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-1.5 active:scale-95 uppercase tracking-wider"
              >
                Apply for Position
              </button>
            )}

            <p className="text-[10px] text-center text-slate-400 mt-4 leading-normal">
              Recruiters typically review applications within 48 business hours.
            </p>
          </div>
        </div>

      </div>

      {/* QUICK APPLY MODAL OVERLAY */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowApplyModal(false)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-205 p-6 sm:p-8 animate-fade-in z-10">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1 flex items-center gap-2">
              Apply for Vacancy
            </h3>
            <p className="text-xs text-slate-450 mb-5">
              Apply for <strong className="text-brand-blue">{job.title}</strong> at {job.companyName}.
            </p>

            {applyError && (
              <div className="mb-4 text-xs font-semibold text-red-650 bg-red-50 border border-red-150 p-2.5 rounded-lg">
                ⚠️ {applyError}
              </div>
            )}

            {applySuccess ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-3 animate-bounce" />
                <h4 className="text-sm font-bold text-slate-850">Application Dispatched!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Resume submitted to recruiter inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Contact Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 font-medium"
                    />
                  </div>
                </div>

                {/* Mock File Uploader */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Upload Resume (PDF, DOCX)</label>
                  
                  {resumeFile ? (
                    <div className="border border-green-200 bg-green-50/20 rounded-xl p-3 flex justify-between items-center text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="font-bold">{resumeFile}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setResumeFile('')} 
                        className="text-red-500 hover:text-red-700 font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setResumeFile('Pavan_Kumar_Resume.pdf')}
                      className="border-2 border-dashed border-slate-250 hover:border-brand-blue bg-slate-50 hover:bg-blue-50/5 rounded-xl p-6 text-center cursor-pointer transition-colors"
                    >
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                      <span className="text-xs font-bold text-slate-700 block">Click to upload resume</span>
                      <span className="text-[10px] text-slate-400">PDF, DOCX up to 5MB (Mock Upload)</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Brief Cover Note (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Introduce yourself to the recruiter in a few sentences..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue/15 text-slate-705 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-xs uppercase py-3 rounded-lg shadow-lg shadow-blue-500/10 active:scale-95 transition-all mt-2"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
export default JobDetail;
