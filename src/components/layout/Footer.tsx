import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '../../brand/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Logo and brief company summary */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <Logo lightHeader={false} />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              GOJOBINFORMATION is a comprehensive digital ecosystem connecting recruiters, job seekers, local businesses, and skilled service professionals. Find opportunities, hire experts, and grow your enterprise with trust.
            </p>
            <div className="flex gap-4">
              {/* Facebook Icon */}
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue text-slate-350 hover:text-white flex items-center justify-center transition-all duration-300">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              {/* Twitter Icon */}
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue text-slate-355 hover:text-white flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              {/* Instagram Icon */}
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue text-slate-355 hover:text-white flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Linkedin Icon */}
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-brand-blue text-slate-355 hover:text-white flex items-center justify-center transition-all duration-300">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links: Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Professional Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/services?category=electrician" className="hover:text-brand-teal transition-colors">Electricians</Link></li>
              <li><Link to="/services?category=plumber" className="hover:text-brand-teal transition-colors">Plumbers</Link></li>
              <li><Link to="/services?category=tutor" className="hover:text-brand-teal transition-colors">Home Tutors</Link></li>
              <li><Link to="/services?category=cleaning" className="hover:text-brand-teal transition-colors">Cleaning Services</Link></li>
              <li><Link to="/services?category=ac-tech" className="hover:text-brand-teal transition-colors">AC Technicians</Link></li>
            </ul>
          </div>

          {/* Quick links: Businesses & Jobs */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Ecosystem Modules</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/businesses" className="hover:text-brand-teal transition-colors">Business Directory</Link></li>
              <li><Link to="/jobs" className="hover:text-brand-teal transition-colors">Job Openings</Link></li>
              <li><Link to="/subscriptions" className="hover:text-brand-teal transition-colors">Business Subscriptions</Link></li>
              <li><Link to="/auth" className="hover:text-brand-teal transition-colors">Create Account</Link></li>
              <li><Link to="/auth" className="hover:text-brand-teal transition-colors">Partner Dashboard</Link></li>
            </ul>
          </div>

          {/* Quick contact information */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Get In Touch</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                <span>Metro Heights, Suite 104, Bandra Kurla Complex, Mumbai, 400051</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-teal shrink-0" />
                <span>+91 22 4567 8900</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-teal shrink-0" />
                <span>support@gojobinformation.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer section */}
        <div className="border-t border-slate-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 GOJOBINFORMATION. All rights reserved. Built for professional empowerment.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Trust & Safety Guidelines</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
