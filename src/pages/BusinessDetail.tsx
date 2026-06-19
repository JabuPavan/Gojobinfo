import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, MapPin, Mail, Phone, ArrowLeft, Send, CheckCircle, X } from 'lucide-react';
import { useBusinessStore } from '../store/useBusinessStore';
import { useAuthStore } from '../store/useAuthStore';

export const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { businesses, addBusinessReview, addQuoteRequest } = useBusinessStore();
  const { user, addNotification, isAuthenticated } = useAuthStore();

  // Find business details
  const business = useMemo(() => {
    return businesses.find(b => b.id === id);
  }, [businesses, id]);

  // Modal quote state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteName, setQuoteName] = useState(user?.name || '');
  const [quoteEmail, setQuoteEmail] = useState(user?.email || '');
  const [quotePhone, setQuotePhone] = useState(user?.phone || '');
  const [quoteMsg, setQuoteMsg] = useState('');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Review states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync modal trigger from query parameter (e.g. ?quote=true)
  useEffect(() => {
    if (searchParams.get('quote') === 'true' && business) {
      if (!isAuthenticated) {
        navigate(`/auth?redirect=${encodeURIComponent(`/businesses/detail/${business?.id}?quote=true`)}`, { replace: true });
      } else {
        setShowQuoteModal(true);
      }
    }
  }, [searchParams, business, isAuthenticated, navigate]);

  // Sync user info for quotes when logged in
  useEffect(() => {
    if (user) {
      setQuoteName(user.name || '');
      setQuoteEmail(user.email || '');
      setQuotePhone(user.phone || '');
    }
  }, [user]);

  const handleQuoteClick = () => {
    if (!isAuthenticated) {
      navigate(`/auth?redirect=${encodeURIComponent(`/businesses/detail/${business?.id}?quote=true`)}`);
    } else {
      setShowQuoteModal(true);
    }
  };

  if (!business) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Business listing not found</h2>
        <p className="text-slate-500 mt-2">The listing ID may be incorrect or has been deactivated.</p>
        <Link to="/businesses" className="mt-5 inline-block bg-brand-orange text-white px-5 py-2 rounded-lg font-bold text-xs">
          Back to Directory
        </Link>
      </div>
    );
  }

  // Handle Review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) return;

    addBusinessReview(business.id, reviewerName, rating, comment);
    setReviewerName('');
    setComment('');
    setRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  // Handle Quote Enquiry submission
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName.trim() || !quoteEmail.trim() || !quotePhone.trim() || !quoteMsg.trim()) return;

    addQuoteRequest(business.id, quoteName, quoteEmail, quotePhone, business.category, quoteMsg);
    
    // Dispatch system notification
    addNotification(
      'Enquiry Dispatched',
      `Your request for quote has been sent to ${business.name}. They will reach you shortly.`,
      'lead'
    );

    setQuoteMsg('');
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setShowQuoteModal(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Back button */}
      <Link 
        to="/businesses" 
        className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-orange text-xs font-bold mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Business Directory
      </Link>

      {/* Hero Header Banner color card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-8 relative">
        <div className={`h-36 sm:h-48 bg-gradient-to-r ${business.bannerColor} relative`}>
          <span className="absolute top-4 right-4 bg-white/20 border border-white/30 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
            ★ {business.tier} Listing
          </span>
        </div>
        
        <div className="p-6 relative flex flex-col sm:flex-row gap-5 items-start">
          {/* Logo initials badge */}
          <div className={`w-20 h-20 rounded-2xl ${business.logoColor} text-white flex items-center justify-center font-extrabold text-3xl uppercase shadow shadow-orange-100 border-4 border-white -mt-16 sm:-mt-20 relative z-10 shrink-0`}>
            {business.name.substring(0, 2)}
          </div>
          
          <div className="flex-1 -mt-1 sm:-mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {business.name}
              </h1>
              {business.verified && (
                <span className="w-fit flex items-center gap-1 bg-orange-50 border border-orange-200 text-brand-orange text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Store
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-brand-orange font-bold uppercase tracking-wider mt-0.5">
              {business.category}
            </p>

            <div className="flex items-center gap-3.5 mt-3 flex-wrap">
              <div className="flex items-center gap-0.5 text-brand-orange">
                <Star className="w-4 h-4 fill-brand-orange" />
                <span className="text-xs font-bold text-slate-800">{business.rating}</span>
              </div>
              <span className="text-xs text-slate-400">({business.reviewsCount} verified reviews)</span>
              <span className="text-slate-200">|</span>
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <MapPin className="w-4 h-4 text-slate-450 shrink-0" /> {business.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2-spans): General Description and Catalog details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* About business block */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">About Us</h3>
            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed">
              {business.description}
            </p>

            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3.5 mt-8">Products & Services Offered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {business.services.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-650">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo gallery */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Store Photo Gallery</h3>
            <div className="grid grid-cols-3 gap-4">
              {business.galleryColors.map((color, i) => (
                <div 
                  key={i} 
                  className={`h-24 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white/40 text-[10px] font-bold uppercase shadow-inner`}
                >
                  Gallery View {i+1}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Rating Feed */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6">Customer Reviews</h3>
            
            {/* Review List */}
            <div className="divide-y divide-slate-100 mb-8">
              {business.reviews.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">No reviews have been written yet. Be the first to leave a feedback!</p>
              ) : (
                business.reviews.map((rev) => (
                  <div key={rev.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-850">{rev.userName}</h4>
                        <div className="flex gap-0.5 text-brand-orange mt-0.5">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-3.5 h-3.5 ${idx < rev.rating ? 'fill-brand-orange text-brand-orange' : 'text-slate-250'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

            {/* Form */}
            <div className="border-t border-slate-100 pt-6">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4">Write a Review</h4>
              
              {reviewSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-205 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-600" /> Your review has been added!
                </div>
              )}

              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      required
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-700 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Star Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-700 font-bold"
                    >
                      <option value="5">★★★★★ (5 Stars)</option>
                      <option value="4">★★★★☆ (4 Stars)</option>
                      <option value="3">★★★☆☆ (3 Stars)</option>
                      <option value="2">★★☆☆☆ (2 Stars)</option>
                      <option value="1">★☆☆☆☆ (1 Star)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Your Comment</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your purchase or service interaction with this store..."
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-700 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs py-2 px-5 rounded-lg shadow w-fit self-end transition-all active:scale-95"
                >
                  Submit Review
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Right Column: Contact Details Sidebar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm sticky top-24 h-fit">
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-slate-100 pb-2.5">
              Contact Vendor
            </h3>

            <div className="flex flex-col gap-4 text-xs text-slate-600 mb-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>{business.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="truncate">{business.email}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${business.phone}`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Calling: ${business.phone}`);
                }}
                className="w-full text-center border border-slate-200 hover:bg-slate-50 text-slate-750 font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Call Supplier
              </a>
              
              <button
                onClick={handleQuoteClick}
                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-lg shadow-md shadow-orange-500/10 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Send className="w-4 h-4" /> Request Call / Quote
              </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
              Dispatched enquiries will land immediately on the vendor's dashboard inbox.
            </p>
          </div>
        </div>

      </div>

      {/* GET QUOTE MODAL OVERLAY */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowQuoteModal(false)}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 sm:p-8 animate-fade-in z-10">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-2 flex items-center gap-2">
              Request Price Quote
            </h3>
            <p className="text-xs text-slate-450 mb-5">
              Submit your specific service needs or order requirements to <strong className="text-brand-orange">{business.name}</strong>.
            </p>

            {quoteSuccess ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-3 animate-bounce" />
                <h4 className="text-sm font-bold text-slate-850">Quote Request Submitted!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Lead sent to vendor. They will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-705 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={quoteEmail}
                      onChange={(e) => setQuoteEmail(e.target.value)}
                      className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-705 font-medium"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={quotePhone}
                      onChange={(e) => setQuotePhone(e.target.value)}
                      className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-705 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">What are you looking for?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about products, quantities, custom requirements, or appointment queries..."
                    value={quoteMsg}
                    onChange={(e) => setQuoteMsg(e.target.value)}
                    className="border border-slate-205 rounded-lg p-2.5 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-orange/15 text-slate-705 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase py-3 rounded-lg shadow-lg shadow-orange-500/10 active:scale-95 transition-all mt-2"
                >
                  Send Enquiry Lead
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
export default BusinessDetail;
