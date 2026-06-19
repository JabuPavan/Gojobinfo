import { create } from 'zustand';
import { mockBusinesses } from '../utils/mockData';
import type { BusinessListing } from '../utils/mockData';

export interface BusinessLead {
  id: string;
  businessId: string;
  businessName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  category: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
}

export interface BusinessState {
  businesses: BusinessListing[];
  leads: BusinessLead[];
  
  // Actions
  addBusinessListing: (listing: Omit<BusinessListing, 'id' | 'rating' | 'reviewsCount' | 'reviews' | 'verified' | 'tier'>) => void;
  addBusinessReview: (businessId: string, userName: string, rating: number, comment: string) => void;
  addQuoteRequest: (
    businessId: string,
    clientName: string,
    clientEmail: string,
    clientPhone: string,
    category: string,
    message: string
  ) => void;
  upgradeSubscription: (businessId: string, tier: BusinessListing['tier']) => void;
  updateLeadStatus: (leadId: string, status: BusinessLead['status']) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  businesses: mockBusinesses,
  leads: [
    {
      id: 'lead-1',
      businessId: 'biz-1',
      businessName: 'Sharma Electronics & Appliances',
      clientName: 'Rahul Verma',
      clientEmail: 'rahul.v@example.com',
      clientPhone: '+91 98888 77777',
      category: 'Electronics Shops',
      message: 'Looking for a wholesale quote for 5 split air conditioners (1.5 Ton, 5 Star) for my new office space in Saket.',
      date: '2026-06-18',
      status: 'New'
    }
  ],

  addBusinessListing: (listing) => set((state) => {
    const newBiz: BusinessListing = {
      ...listing,
      id: `biz-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      verified: false,
      tier: 'Basic',
      reviews: []
    };
    return { businesses: [newBiz, ...state.businesses] };
  }),

  addBusinessReview: (businessId, userName, rating, comment) => set((state) => {
    const updated = state.businesses.map((biz) => {
      if (biz.id === businessId) {
        const newReview = {
          id: `rev-${Date.now()}`,
          userName,
          rating,
          date: new Date().toISOString().split('T')[0],
          comment,
        };
        const newReviews = [newReview, ...biz.reviews];
        const newRating = parseFloat(
          (newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length).toFixed(1)
        );
        return {
          ...biz,
          reviews: newReviews,
          reviewsCount: newReviews.length,
          rating: newRating,
        };
      }
      return biz;
    });
    return { businesses: updated };
  }),

  addQuoteRequest: (businessId, clientName, clientEmail, clientPhone, category, message) => set((state) => {
    const business = state.businesses.find(b => b.id === businessId);
    const newLead: BusinessLead = {
      id: `lead-${Date.now()}`,
      businessId,
      businessName: business ? business.name : 'Unknown Business',
      clientName,
      clientEmail,
      clientPhone,
      category,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    return { leads: [newLead, ...state.leads] };
  }),

  upgradeSubscription: (businessId, tier) => set((state) => ({
    businesses: state.businesses.map(b => b.id === businessId ? { ...b, tier } : b)
  })),

  updateLeadStatus: (leadId, status) => set((state) => ({
    leads: state.leads.map(l => l.id === leadId ? { ...l, status } : l)
  }))
}));
