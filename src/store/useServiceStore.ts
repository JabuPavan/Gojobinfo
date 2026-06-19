import { create } from 'zustand';
import { mockProfessionals } from '../utils/mockData';
import type { ServiceProfessional } from '../utils/mockData';

export interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalCategory: string;
  date: string;
  slot: string;
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  pricePaid: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  bookingId: string; // alphanumeric ID e.g. GJB-XXXXXX
  paymentMethod: string;
}

export interface BookingFlowState {
  activeStep: number;
  selectedCategory: string | null;
  selectedProfessionalId: string | null;
  selectedDate: string | null;
  selectedSlot: string | null;
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  } | null;
  paymentDetails: {
    method: string;
  } | null;
  completedBooking: Booking | null;
}

export interface ServiceState {
  professionals: ServiceProfessional[];
  bookings: Booking[];
  bookingFlow: BookingFlowState;
  
  // Actions
  setProfessionals: (profs: ServiceProfessional[]) => void;
  addReview: (profId: string, userName: string, rating: number, comment: string) => void;
  startBookingFlow: (profId: string, category: string) => void;
  setBookingStep: (step: number) => void;
  selectDate: (date: string) => void;
  selectSlot: (slot: string) => void;
  setBookingAddress: (address: BookingFlowState['address']) => void;
  submitBooking: (paymentMethod: string) => void;
  resetBookingFlow: () => void;
  cancelBooking: (bookingId: string) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
}

const initialBookingFlow: BookingFlowState = {
  activeStep: 1,
  selectedCategory: null,
  selectedProfessionalId: null,
  selectedDate: null,
  selectedSlot: null,
  address: null,
  paymentDetails: null,
  completedBooking: null,
};

export const useServiceStore = create<ServiceState>((set) => ({
  professionals: mockProfessionals,
  bookings: [
    {
      id: 'b-1',
      professionalId: 'prof-1',
      professionalName: 'Rajesh Kumar',
      professionalCategory: 'Electricians',
      date: '2026-06-21',
      slot: '10:00 AM - 12:00 PM',
      address: {
        fullName: 'Pavan Kumar',
        street: 'Flat 402, Royal Enclave, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400050',
        phone: '+91 99887 76655'
      },
      pricePaid: 500, // 2 hours
      status: 'Confirmed',
      bookingId: 'GJB-983120',
      paymentMethod: 'UPI (GPay)'
    }
  ],
  bookingFlow: initialBookingFlow,

  setProfessionals: (profs) => set({ professionals: profs }),

  addReview: (profId, userName, rating, comment) => set((state) => {
    const updated = state.professionals.map((prof) => {
      if (prof.id === profId) {
        const newReview = {
          id: `rev-${Date.now()}`,
          userName,
          rating,
          date: new Date().toISOString().split('T')[0],
          comment,
        };
        const newReviews = [newReview, ...prof.reviews];
        const newRating = parseFloat(
          (newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length).toFixed(1)
        );
        return {
          ...prof,
          reviews: newReviews,
          reviewsCount: newReviews.length,
          rating: newRating,
        };
      }
      return prof;
    });
    return { professionals: updated };
  }),

  startBookingFlow: (profId, category) => set(() => ({
    bookingFlow: {
      ...initialBookingFlow,
      selectedProfessionalId: profId,
      selectedCategory: category,
      activeStep: 3, // Directly starts at date/slot choice if profile selected
    }
  })),

  setBookingStep: (step) => set((state) => ({
    bookingFlow: {
      ...state.bookingFlow,
      activeStep: step
    }
  })),

  selectDate: (date) => set((state) => ({
    bookingFlow: {
      ...state.bookingFlow,
      selectedDate: date
    }
  })),

  selectSlot: (slot) => set((state) => ({
    bookingFlow: {
      ...state.bookingFlow,
      selectedSlot: slot
    }
  })),

  setBookingAddress: (address) => set((state) => ({
    bookingFlow: {
      ...state.bookingFlow,
      address,
      activeStep: 6 // Go to payment
    }
  })),

  submitBooking: (paymentMethod) => set((state) => {
    const { selectedProfessionalId, selectedDate, selectedSlot, address } = state.bookingFlow;
    const professional = state.professionals.find(p => p.id === selectedProfessionalId);
    
    if (!professional || !selectedDate || !selectedSlot || !address) {
      return {};
    }

    const uniqueId = Math.floor(100000 + Math.random() * 900000).toString();
    const finalBookingId = `GJB-${uniqueId}`;
    
    // Assume fixed 2 hours booking
    const pricePaid = professional.pricePerHour * 2;

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      professionalId: professional.id,
      professionalName: professional.name,
      professionalCategory: professional.category,
      date: selectedDate,
      slot: selectedSlot,
      address,
      pricePaid,
      status: 'Confirmed',
      bookingId: finalBookingId,
      paymentMethod
    };

    return {
      bookings: [newBooking, ...state.bookings],
      bookingFlow: {
        ...state.bookingFlow,
        activeStep: 7, // Confirmation step
        completedBooking: newBooking
      }
    };
  }),

  resetBookingFlow: () => set({ bookingFlow: initialBookingFlow }),

  cancelBooking: (bookingId) => set((state) => ({
    bookings: state.bookings.map(b => b.bookingId === bookingId ? { ...b, status: 'Cancelled' } : b)
  })),

  updateBookingStatus: (bookingId, status) => set((state) => ({
    bookings: state.bookings.map(b => b.bookingId === bookingId ? { ...b, status } : b)
  }))
}));
