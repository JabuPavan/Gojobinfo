import { create } from 'zustand';

export type UserRole = 'user' | 'professional' | 'business' | 'recruiter';

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'booking' | 'job' | 'lead' | 'system';
}

export interface UserState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    avatar: string;
    avatarUrl: string;
  } | null;
  savedJobs: string[]; // job IDs
  savedBusinesses: string[]; // business IDs
  savedProfessionals: string[]; // professional IDs
  notifications: Notification[];
  
  // Actions
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  toggleSaveJob: (jobId: string) => void;
  toggleSaveBusiness: (businessId: string) => void;
  toggleSaveProfessional: (profId: string) => void;
  addNotification: (title: string, description: string, type: Notification['type']) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

export const useAuthStore = create<UserState>((set) => ({
  isAuthenticated: false, // Default to false for guest experience
  user: null, // Default to null for guest experience
  savedJobs: [],
  savedBusinesses: [],
  savedProfessionals: [],
  notifications: [
    {
      id: 'n-1',
      title: 'Welcome to GOJOBINFORMATION!',
      description: 'Your account is ready. Explore service bookings, business listings, and the job portal.',
      time: 'Just now',
      read: false,
      type: 'system'
    },
    {
      id: 'n-2',
      title: 'Job Shortlisted',
      description: 'Congratulations! TechVibe Solutions has shortlisted your profile for Senior Frontend Developer.',
      time: '2 hours ago',
      read: false,
      type: 'job'
    }
  ],

  login: (email, role) => set(() => {
    const name = email.split('@')[0];
    const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);
    return {
      isAuthenticated: true,
      user: {
        name: uppercaseName,
        email,
        phone: '+91 98765 43210',
        role,
        avatar: uppercaseName.substring(0, 2).toUpperCase(),
        avatarUrl: `https://i.pravatar.cc/150?u=${email}`
      }
    };
  }),

  logout: () => set(() => ({
    isAuthenticated: false,
    user: null,
    savedJobs: [],
    savedBusinesses: [],
    savedProfessionals: []
  })),

  setRole: (role) => set((state) => {
    if (!state.user) return state;
    
    // Auto-generate some context-relevant notifications when role changes
    const roleNames: Record<UserRole, string> = {
      user: 'General Customer',
      professional: 'Service Professional',
      business: 'Business Owner',
      recruiter: 'Corporate Recruiter'
    };
    
    const newNotification: Notification = {
      id: `n-role-${Date.now()}`,
      title: `Switched Workspace Mode`,
      description: `You are now interacting in the ${roleNames[role]} environment.`,
      time: 'Just now',
      read: false,
      type: 'system'
    };

    return {
      user: {
        ...state.user,
        role
      },
      notifications: [newNotification, ...state.notifications]
    };
  }),

  toggleSaveJob: (jobId) => set((state) => {
    const isSaved = state.savedJobs.includes(jobId);
    return {
      savedJobs: isSaved 
        ? state.savedJobs.filter(id => id !== jobId) 
        : [...state.savedJobs, jobId]
    };
  }),

  toggleSaveBusiness: (businessId) => set((state) => {
    const isSaved = state.savedBusinesses.includes(businessId);
    return {
      savedBusinesses: isSaved 
        ? state.savedBusinesses.filter(id => id !== businessId) 
        : [...state.savedBusinesses, businessId]
    };
  }),

  toggleSaveProfessional: (profId) => set((state) => {
    const isSaved = state.savedProfessionals.includes(profId);
    return {
      savedProfessionals: isSaved 
        ? state.savedProfessionals.filter(id => id !== profId) 
        : [...state.savedProfessionals, profId]
    };
  }),

  addNotification: (title, description, type) => set((state) => {
    const newNotif: Notification = {
      id: `n-${Date.now()}`,
      title,
      description,
      time: 'Just now',
      read: false,
      type
    };
    return {
      notifications: [newNotif, ...state.notifications]
    };
  }),

  markAllNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),

  clearNotifications: () => set(() => ({
    notifications: []
  }))
}));
