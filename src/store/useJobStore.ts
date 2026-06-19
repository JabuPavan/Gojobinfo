import { create } from 'zustand';
import { mockJobs } from '../utils/mockData';
import type { JobListing } from '../utils/mockData';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  resumeName: string;
  coverLetter?: string;
  appliedDate: string;
  status: 'Applied' | 'Reviewing' | 'Shortlisted' | 'Rejected' | 'Interview Scheduled';
  interviewDate?: string;
}

export interface JobState {
  jobs: JobListing[];
  applications: JobApplication[];
  
  // Actions
  postJob: (job: Omit<JobListing, 'id' | 'postedDaysAgo'>) => void;
  applyJob: (
    jobId: string,
    candidateName: string,
    candidateEmail: string,
    candidatePhone: string,
    resumeName: string,
    coverLetter?: string
  ) => void;
  updateApplicationStatus: (appId: string, status: JobApplication['status'], interviewDate?: string) => void;
  deleteJob: (jobId: string) => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: mockJobs,
  applications: [
    {
      id: 'app-1',
      jobId: 'job-1',
      jobTitle: 'Senior Frontend Developer (React)',
      companyName: 'TechVibe Solutions',
      candidateName: 'Pavan Kumar',
      candidateEmail: 'pavan.kumar@example.com',
      candidatePhone: '+91 99887 76655',
      resumeName: 'Pavan_Kumar_Resume.pdf',
      appliedDate: '2026-06-19',
      status: 'Shortlisted'
    }
  ],

  postJob: (job) => set((state) => {
    const newJob: JobListing = {
      ...job,
      id: `job-${Date.now()}`,
      postedDaysAgo: 0
    };
    return { jobs: [newJob, ...state.jobs] };
  }),

  applyJob: (jobId, candidateName, candidateEmail, candidatePhone, resumeName, coverLetter) => set((state) => {
    const job = state.jobs.find(j => j.id === jobId);
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job ? job.title : 'Unknown Job',
      companyName: job ? job.companyName : 'Unknown Company',
      candidateName,
      candidateEmail,
      candidatePhone,
      resumeName,
      coverLetter,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Applied'
    };
    return { applications: [newApp, ...state.applications] };
  }),

  updateApplicationStatus: (appId, status, interviewDate) => set((state) => ({
    applications: state.applications.map((app) => 
      app.id === appId 
        ? { ...app, status, interviewDate: interviewDate || app.interviewDate } 
        : app
    )
  })),

  deleteJob: (jobId) => set((state) => ({
    jobs: state.jobs.filter(j => j.id !== jobId)
  }))
}));
