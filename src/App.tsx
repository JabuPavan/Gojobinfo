import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { RoleSwitcher } from './components/ui/RoleSwitcher';
import { useAuthStore } from './store/useAuthStore';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { BookingFlow } from './pages/BookingFlow';
import { Businesses } from './pages/Businesses';
import { BusinessDetail } from './pages/BusinessDetail';
import { Subscriptions } from './pages/Subscriptions';
import { Jobs } from './pages/Jobs';
import { JobDetail } from './pages/JobDetail';
import { Auth } from './pages/Auth';
import { Advertise } from './pages/Advertise';
import { Shopping } from './pages/Shopping';
import { Investors } from './pages/Investors';
import { Contact } from './pages/Contact';

// Dashboards
import { UserDashboard } from './pages/dashboards/UserDashboard';
import { ProfessionalDashboard } from './pages/dashboards/ProfessionalDashboard';
import { BusinessDashboard } from './pages/dashboards/BusinessDashboard';
import { RecruiterDashboard } from './pages/dashboards/RecruiterDashboard';

import { ScrollToTop } from './components/layout/ScrollToTop';

// Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50/50">
        
        {/* Sticky Global Navigation */}
        <Header />

        {/* Route Pages Layout Content */}
        <main className="flex-grow">
          <Routes>
            {/* Core pages */}
            <Route path="/" element={<Home />} />
            
            {/* Services marketplace */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/profile/:id" element={<ServiceDetail />} />
            <Route path="/services/booking" element={
              <ProtectedRoute>
                <BookingFlow />
              </ProtectedRoute>
            } />

            {/* Business directory */}
            <Route path="/businesses" element={<Businesses />} />
            <Route path="/businesses/detail/:id" element={<BusinessDetail />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/contact" element={<Contact />} />

            {/* Job Portal */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            {/* Auth login/register */}
            <Route path="/auth" element={<Auth />} />

            {/* Dashboards */}
            <Route path="/dashboard/user" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/professional" element={
              <ProtectedRoute>
                <ProfessionalDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/business" element={
              <ProtectedRoute>
                <BusinessDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/recruiter" element={
              <ProtectedRoute>
                <RecruiterDashboard />
              </ProtectedRoute>
            } />

            {/* Catch-all fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating Developer Reviews switcher */}
        <RoleSwitcher />
        
      </div>
    </BrowserRouter>
  );
};

export default App;
