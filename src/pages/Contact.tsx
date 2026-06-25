import React, { useState } from 'react';
import { MapPin, Mail, Phone, ArrowRight, Building, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Form submission logic would go here
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Container Banner Hero - Matching our exact Theme */}
        <div className="bg-black text-white p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="flex-1">
            <span className="bg-white text-black px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest inline-block mb-3 shadow-sm">
              Our Motive
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-tight mb-3 drop-shadow-md">
              Democratizing Opportunity <br className="hidden lg:block" /> Across India
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed font-semibold">
              GoJob Information was built to bridge the gap between hard-working individuals and the businesses that need them. We are committed to fostering growth and empowering millions.
            </p>
          </div>
          <div className="mt-6 md:mt-0 shrink-0">
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black hover:bg-slate-200 font-extrabold px-6 py-3 uppercase tracking-widest text-xs transition-colors shadow-lg"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Vision & Leadership - Full Width Section */}
        <div className="editorial-panel rounded-none border-t-4 border-black mb-12 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left: Text */}
            <div className="p-8 sm:p-16 md:w-3/5 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-8">Founder's Vision</h2>
              <div className="text-brand-blue text-6xl font-serif leading-none mb-4">"</div>
              <p className="text-slate-700 font-medium leading-relaxed italic text-lg sm:text-xl mb-10">
                My vision for GoJob Information has always been simple: create a platform where talent meets opportunity effortlessly. We are building more than a job portal; we are building an ecosystem that respects every worker and accelerates every business. Every connection made on our platform is a step towards a more robust, self-reliant India.
              </p>
              <div>
                <h4 className="font-black text-black uppercase tracking-tight text-4xl mb-2">Prasad</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest bg-slate-100 inline-block px-3 py-1.5 border border-slate-200">
                  Founder & CEO
                </p>
              </div>
            </div>
            
            {/* Right: Elevated Image */}
            <div className="p-8 sm:p-16 md:w-2/5 bg-slate-50/50 flex items-center justify-center border-l border-slate-100">
              {/* Elevated polaroid-style image frame matching reference */}
              <div className="relative bg-white p-3 sm:p-4 pb-0 sm:pb-0 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-b-8 border-brand-blue transform hover:-translate-y-2 transition-transform duration-500 w-full max-w-sm mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" 
                  alt="Prasad - Founder" 
                  className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="h-4 sm:h-5 bg-white"></div> {/* Spacing above the blue border */}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left Column: Contact Info Details */}
          <div className="lg:col-span-5">
            <div className="editorial-panel rounded-none p-8 sm:p-12 bg-white border-t-4 border-black shadow-xl h-full">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Reach Out</h3>
              <p className="text-sm font-medium text-slate-600 mb-10 leading-relaxed">
                Whether you're looking for support, partnership opportunities, or just want to share feedback, our team is ready to hear from you.
              </p>
              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-none shrink-0 shadow-sm">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Email Us</h4>
                    <a href="mailto:support@gojobinformation.com" className="text-sm font-bold text-black hover:text-brand-blue transition-colors block">support@gojobinformation.com</a>
                    <a href="mailto:partnerships@gojobinformation.com" className="text-sm font-bold text-black hover:text-brand-blue transition-colors block mt-2">partnerships@gojobinformation.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-none shrink-0 shadow-sm">
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Call Us</h4>
                    <p className="text-sm font-bold text-black">+91 1800 123 4567</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Mon - Sat, 9am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div id="contact-form" className="editorial-panel rounded-none border-t-4 border-brand-blue p-8 sm:p-12 h-full shadow-xl">
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Send a Message</h3>
              <p className="text-slate-500 mb-10 text-sm font-medium">Please fill out the form below and our team will get back to you promptly.</p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-green-100 rounded-none flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase">Message Sent</h4>
                  <p className="text-slate-600 text-sm font-medium">Thank you for reaching out. A member of our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-slate-200 p-3.5 text-sm font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-slate-200 p-3.5 text-sm font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Subject *</label>
                    <select 
                      required
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full border border-slate-200 p-3.5 text-sm font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50"
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option value="support">General Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="feedback">Product Feedback</option>
                      <option value="career">Careers at GoJob</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Message *</label>
                    <textarea 
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full border border-slate-200 p-3.5 text-sm font-bold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all rounded-none bg-slate-50/50 resize-none"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-black text-white font-black uppercase tracking-widest text-sm px-8 py-5 hover:bg-slate-800 transition-colors shadow-lg hover:-translate-y-1 inline-flex items-center justify-center gap-2 mt-4"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Our Branches (Separate Full-Width Block) */}
        <div className="rounded-none p-8 sm:p-16 bg-black text-white shadow-2xl border-t-4 border-slate-800">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4 drop-shadow-sm">Our Branches</h2>
            <p className="text-slate-300 font-bold tracking-wide">Visit us at any of our regional headquarters across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-700">
            <div className="md:pr-6 pt-6 md:pt-0 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6 w-full">
                <MapPin className="w-8 h-8 text-brand-blue shrink-0" />
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-wider text-white">Hyderabad <span className="text-[10px] bg-white text-black px-2 py-1 ml-2 font-black shadow-sm uppercase align-middle">(HQ)</span></h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed text-center md:text-left md:pl-11">
                GoJob Tech Park, Phase 2, Hitech City<br/>
                Hyderabad, Telangana 500081
              </p>
            </div>

            <div className="md:px-6 pt-8 md:pt-0 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6 w-full">
                <MapPin className="w-8 h-8 text-brand-blue shrink-0" />
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-wider text-white">Bengaluru</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed text-center md:text-left md:pl-11">
                Innovation Hub, Koramangala 4th Block<br/>
                Bengaluru, Karnataka 560034
              </p>
            </div>

            <div className="md:pl-6 pt-8 md:pt-0 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6 w-full">
                <MapPin className="w-8 h-8 text-brand-blue shrink-0" />
                <h3 className="font-black text-xl sm:text-2xl uppercase tracking-wider text-white">Mumbai</h3>
              </div>
              <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed text-center md:text-left md:pl-11">
                Business Center, Bandra Kurla Complex<br/>
                Mumbai, Maharashtra 400051
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
