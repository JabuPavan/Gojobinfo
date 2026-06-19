// Mock data for GOJOBINFORMATION

export interface ServiceProfessional {
  id: string;
  name: string;
  category: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  experience: number; // in years
  pricePerHour: number;
  availability: 'Available Today' | 'Available Tomorrow' | 'Booked';
  location: string;
  bio: string;
  skills: string[];
  certifications: string[];
  languages: string[];
  verified: boolean;
  portfolio: string[]; // SVG styles or colors
  reviews: {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  logoColor: string;
  bannerColor: string;
  rating: number;
  reviewsCount: number;
  location: string;
  description: string;
  services: string[];
  phone: string;
  email: string;
  verified: boolean;
  tier: 'Basic' | 'Premium' | 'Gold' | 'Platinum';
  galleryColors: string[];
  reviews: {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  companyLogoColor: string;
  location: string;
  salaryRange: string;
  experienceRequired: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  jobType: 'Full-Time' | 'Part-Time' | 'Contract';
  industry: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  postedDaysAgo: number;
}

// Categories list
export const SERVICE_CATEGORIES = [
  { id: 'electrician', name: 'Electricians', icon: 'Zap' },
  { id: 'plumber', name: 'Plumbers', icon: 'Droplet' },
  { id: 'driver', name: 'Drivers', icon: 'Car' },
  { id: 'carpenter', name: 'Carpenters', icon: 'Hammer' },
  { id: 'painter', name: 'Painters', icon: 'Paintbrush' },
  { id: 'tutor', name: 'Tutors', icon: 'BookOpen' },
  { id: 'mechanic', name: 'Mechanics', icon: 'Wrench' },
  { id: 'photographer', name: 'Photographers', icon: 'Camera' },
  { id: 'cleaning', name: 'Cleaning Services', icon: 'Sparkles' },
  { id: 'ac-tech', name: 'AC Technicians', icon: 'Wind' },
  { id: 'event-services', name: 'Event Services', icon: 'Gift' }
];

export const BUSINESS_CATEGORIES = [
  { id: 'grocery', name: 'Grocery Stores', icon: 'ShoppingBag' },
  { id: 'clothing', name: 'Clothing & Apparel', icon: 'Shirt' },
  { id: 'electronics', name: 'Electronics Shops', icon: 'Tv' },
  { id: 'furniture', name: 'Furniture Showrooms', icon: 'Sofa' },
  { id: 'restaurants', name: 'Restaurants & Cafes', icon: 'Utensils' },
  { id: 'medical', name: 'Medical Stores', icon: 'Activity' },
  { id: 'hardware', name: 'Hardware Stores', icon: 'Hammer' },
  { id: 'automobile', name: 'Automobile Dealers', icon: 'CarFront' },
  { id: 'construction', name: 'Construction & Materials', icon: 'Building' },
  { id: 'education', name: 'Education Centres', icon: 'GraduationCap' }
];

// Mock Service Professionals
export const mockProfessionals: ServiceProfessional[] = [
  {
    id: 'prof-1',
    name: 'Rajesh Kumar',
    category: 'Electricians',
    avatar: 'RK',
    rating: 4.8,
    reviewsCount: 124,
    experience: 8,
    pricePerHour: 250,
    availability: 'Available Today',
    location: 'Mumbai, Maharashtra',
    bio: 'Certified electrical specialist with 8+ years of residential and commercial experience. Expert in smart home wiring, inverter installation, and safety checks.',
    skills: ['House Wiring', 'Smart Home Setup', 'Fault Finding', 'Inverter Setup', 'Appliance Repair'],
    certifications: ['Govt. License Wireman (Grade A)', 'Smart Automation Expert'],
    languages: ['Hindi', 'English', 'Marathi'],
    verified: true,
    portfolio: ['from-blue-500 to-indigo-600', 'from-indigo-600 to-cyan-500', 'from-cyan-500 to-teal-500'],
    reviews: [
      { id: 'rev-1', userName: 'Amit Shah', rating: 5, date: '2026-06-15', comment: 'Excellent work. Arrived on time and solved the short circuit issue within an hour. Highly recommended!' },
      { id: 'rev-2', userName: 'Pooja Patel', rating: 4, date: '2026-06-10', comment: 'Very professional, did the entire living room wiring neatly.' }
    ]
  },
  {
    id: 'prof-2',
    name: 'Suresh Patil',
    category: 'Plumbers',
    avatar: 'SP',
    rating: 4.6,
    reviewsCount: 98,
    experience: 6,
    pricePerHour: 200,
    availability: 'Available Today',
    location: 'Pune, Maharashtra',
    bio: 'Experienced in leakage diagnostics, bathroom fixture installations, and main line piping. Fast service and transparent pricing.',
    skills: ['Leak Repair', 'Pipe Installation', 'Water Heater Repair', 'Drain Cleaning'],
    certifications: ['ITI Plumber License', 'Modern Fittings Specialist'],
    languages: ['Hindi', 'Marathi'],
    verified: true,
    portfolio: ['from-teal-500 to-emerald-600', 'from-emerald-600 to-blue-500'],
    reviews: [
      { id: 'rev-3', userName: 'Vikram Joshi', rating: 5, date: '2026-06-18', comment: 'Quick response. Fixed the bathroom pipeline leakage instantly.' }
    ]
  },
  {
    id: 'prof-3',
    name: 'Ravi Teja',
    category: 'Drivers',
    avatar: 'RT',
    rating: 4.9,
    reviewsCount: 230,
    experience: 12,
    pricePerHour: 180,
    availability: 'Available Today',
    location: 'Hyderabad, Telangana',
    bio: 'Professional driver for both luxury cars and commercial trucks. Clean driving record, background verified. Polite and punctual.',
    skills: ['City Driving', 'Highway Driving', 'Luxury Vehicles', 'Navigation Apps', 'Basic Car Maintenance'],
    certifications: ['Heavy & Light Motor Vehicle License', 'Defensive Driving Certification'],
    languages: ['Telugu', 'Hindi', 'English'],
    verified: true,
    portfolio: ['from-slate-700 to-slate-900', 'from-indigo-900 to-slate-800'],
    reviews: [
      { id: 'rev-4', userName: 'Srinivas R.', rating: 5, date: '2026-06-17', comment: 'Ravi is a fantastic driver. Drove our family to Bangalore safely and smoothly.' }
    ]
  },
  {
    id: 'prof-4',
    name: 'Vikram Singh',
    category: 'Carpenters',
    avatar: 'VS',
    rating: 4.7,
    reviewsCount: 76,
    experience: 9,
    pricePerHour: 300,
    availability: 'Available Tomorrow',
    location: 'Delhi NCR',
    bio: 'Custom modular kitchens, wardrobe designs, and furniture restoration expert. Precision work using high-quality tools.',
    skills: ['Modular Kitchens', 'Sofa Restoration', 'Door Fitting', 'Wooden Flooring', 'Wardrobe Customization'],
    certifications: ['National Skill Development Corp Certified Carpenter'],
    languages: ['Hindi', 'Punjabi'],
    verified: true,
    portfolio: ['from-amber-600 to-amber-900', 'from-yellow-600 to-amber-700'],
    reviews: [
      { id: 'rev-5', userName: 'Geeta Phogat', rating: 5, date: '2026-06-11', comment: 'Created an outstanding TV unit for our home. The finishing is flawless!' }
    ]
  },
  {
    id: 'prof-5',
    name: 'Aisha Rahman',
    category: 'Tutors',
    avatar: 'AR',
    rating: 4.9,
    reviewsCount: 84,
    experience: 5,
    pricePerHour: 350,
    availability: 'Available Tomorrow',
    location: 'Bangalore, Karnataka',
    bio: 'M.Sc. in Mathematics, helping students crack competitive exams (IIT-JEE) and school boards. Custom worksheets and patient mentoring.',
    skills: ['Mathematics (Algebra, Calculus)', 'Physics (Mechanics)', 'Exam Preparation', 'Online & Offline Teaching'],
    certifications: ['Post Graduate Degree in Math (IISc)', 'B.Ed.'],
    languages: ['English', 'Hindi', 'Kannada'],
    verified: true,
    portfolio: ['from-rose-500 to-pink-600', 'from-pink-600 to-purple-500'],
    reviews: [
      { id: 'rev-6', userName: 'Karan Mehra', rating: 5, date: '2026-06-14', comment: 'Aisha cleared my son\'s calculus concepts within a few sessions. Very dedicated teacher.' }
    ]
  },
  {
    id: 'prof-6',
    name: 'Deepak Sharma',
    category: 'AC Technicians',
    avatar: 'DS',
    rating: 4.5,
    reviewsCount: 110,
    experience: 7,
    pricePerHour: 220,
    availability: 'Available Today',
    location: 'Mumbai, Maharashtra',
    bio: 'Expert in AC installation, repair, and gas refilling. Experienced with Split, Window, and Centralized HVAC duct systems.',
    skills: ['Split AC Install', 'Gas Charging', 'Compressor Repair', 'HVAC Servicing'],
    certifications: ['Diploma in Refrigeration & Air Conditioning'],
    languages: ['Hindi', 'English'],
    verified: false,
    portfolio: ['from-sky-400 to-blue-600', 'from-cyan-400 to-teal-500'],
    reviews: [
      { id: 'rev-7', userName: 'Rohan Deshmukh', rating: 4, date: '2026-06-16', comment: 'Fixed our office AC leak. Good pricing and quick work.' }
    ]
  }
];

// Mock Businesses
export const mockBusinesses: BusinessListing[] = [
  {
    id: 'biz-1',
    name: 'Sharma Electronics & Appliances',
    category: 'Electronics Shops',
    logoColor: 'bg-blue-600',
    bannerColor: 'from-blue-600 via-indigo-600 to-purple-600',
    rating: 4.7,
    reviewsCount: 312,
    location: 'New Delhi, Delhi',
    description: 'One-stop shop for all your electrical appliance needs. Authorized dealer of Sony, Samsung, LG, and Whirlpool. Offering heavy discounts, easy EMIs, and free delivery.',
    services: ['Smart TVs', 'Refrigerators', 'Washing Machines', 'Air Conditioners', 'Home Delivery & Installation'],
    phone: '+91 98765 43210',
    email: 'info@sharmaelectronics.com',
    verified: true,
    tier: 'Platinum',
    galleryColors: ['from-blue-500 to-blue-700', 'from-violet-500 to-indigo-700', 'from-pink-500 to-purple-700'],
    reviews: [
      { id: 'rev-b1', userName: 'Gaurav K.', rating: 5, date: '2026-06-12', comment: 'Bought a smart TV. The sales staff was helpful, and installation was completed on the same day.' }
    ]
  },
  {
    id: 'biz-2',
    name: 'Taste of Punjab Restaurant',
    category: 'Restaurants & Cafes',
    logoColor: 'bg-orange-500',
    bannerColor: 'from-orange-500 via-red-500 to-amber-600',
    rating: 4.5,
    reviewsCount: 520,
    location: 'Chandigarh',
    description: 'Experience the rich culinary heritage of Punjab. Famous for Butter Chicken, Paneer Tikka, Dal Makhani, and giant Amritsari Naans. Family-friendly ambiance with live music.',
    services: ['Dine-In', 'Takeaway', 'Home Delivery', 'Catering for Events', 'Private Party Hall'],
    phone: '+91 91234 56789',
    email: 'contact@tasteofpunjab.com',
    verified: true,
    tier: 'Gold',
    galleryColors: ['from-orange-400 to-amber-600', 'from-yellow-400 to-orange-500', 'from-rose-500 to-red-700'],
    reviews: [
      { id: 'rev-b2', userName: 'Preeti S.', rating: 5, date: '2026-06-14', comment: 'Amazing food, especially the Dal Makhani. The staff was polite.' }
    ]
  },
  {
    id: 'biz-3',
    name: 'Green & Fresh Supermarket',
    category: 'Grocery Stores',
    logoColor: 'bg-emerald-600',
    bannerColor: 'from-emerald-500 via-teal-600 to-green-600',
    rating: 4.4,
    reviewsCount: 140,
    location: 'Bangalore, Karnataka',
    description: 'We stock organic vegetables, farm-fresh fruits, household essentials, dairy products, and imported items at wholesale rates.',
    services: ['Fresh Produce', 'Monthly Groceries', 'Organic Section', 'Same-day Doorstep Delivery'],
    phone: '+91 80123 45678',
    email: 'support@greenfresh.com',
    verified: true,
    tier: 'Premium',
    galleryColors: ['from-emerald-400 to-teal-500', 'from-green-400 to-emerald-600'],
    reviews: [
      { id: 'rev-b3', userName: 'Sunita Nair', rating: 4, date: '2026-06-16', comment: 'Veggies are always fresh. Great delivery service.' }
    ]
  },
  {
    id: 'biz-4',
    name: 'Apex Multispecialty Clinic & Pharmacy',
    category: 'Medical Stores',
    logoColor: 'bg-red-500',
    bannerColor: 'from-rose-500 to-rose-700',
    rating: 4.8,
    reviewsCount: 188,
    location: 'Mumbai, Maharashtra',
    description: 'Offering emergency medicine delivery, diagnostic facilities, and consultancy from top cardiologists and pediatricians.',
    services: ['24/7 Medicine Delivery', 'Consultation', 'Blood Test Home Collection'],
    phone: '+91 22987 6543',
    email: 'contact@apexclinic.com',
    verified: true,
    tier: 'Gold',
    galleryColors: ['from-rose-400 to-rose-600', 'from-red-400 to-rose-500'],
    reviews: [
      { id: 'rev-b4', userName: 'Kunal M.', rating: 5, date: '2026-06-17', comment: 'Very reliable pharmacy. They carry hard-to-find prescription medicines.' }
    ]
  }
];

// Mock Jobs
export const mockJobs: JobListing[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer (React)',
    companyName: 'TechVibe Solutions',
    companyLogoColor: 'bg-indigo-600',
    location: 'Bangalore, Karnataka',
    salaryRange: '₹12,00,000 - ₹18,00,000 P.A.',
    experienceRequired: '4 - 7 years',
    workMode: 'Hybrid',
    jobType: 'Full-Time',
    industry: 'IT Services & Consulting',
    description: 'We are looking for a Senior React Developer who will lead frontend system design, implement complex state patterns, optimize performance, and collaborate with UX designers to deliver enterprise dashboard platforms.',
    requirements: [
      'Strong proficiency in JavaScript, TypeScript, React, and Next.js.',
      'Experience with modern state management libraries (Zustand, Redux Toolkit).',
      'Solid understanding of build tools like Vite, Webpack, and Tailwind CSS.',
      'Experience leading a team and conducting code reviews.'
    ],
    responsibilities: [
      'Design, build, and maintain efficient, reusable, and reliable front-end code.',
      'Optimize application speed and render performance for Core Web Vitals.',
      'Mentor junior developers and participate in sprint planning sessions.'
    ],
    postedDaysAgo: 2
  },
  {
    id: 'job-2',
    title: 'Business Development Manager',
    companyName: 'GrowthLink Agencies',
    companyLogoColor: 'bg-emerald-600',
    location: 'Mumbai, Maharashtra',
    salaryRange: '₹6,00,000 - ₹9,00,000 P.A.',
    experienceRequired: '2 - 5 years',
    workMode: 'On-site',
    jobType: 'Full-Time',
    industry: 'Marketing & Advertising',
    description: 'Grow business partnerships and directory subscriptions. You will identify target local merchant associations, Pitch B2B enterprise listings, and lead negotiation workflows.',
    requirements: [
      'Proven experience in B2B sales or business development.',
      'Strong communication, presentation, and negotiating skills.',
      'Ability to hit targets and travel locally.'
    ],
    responsibilities: [
      'Generate leads of local businesses and schedule demos.',
      'Convince merchants to upgrade to Platinum and Gold subscriptions.',
      'Maintain long-term relations with major vendors.'
    ],
    postedDaysAgo: 4
  },
  {
    id: 'job-3',
    title: 'HVAC Maintenance Engineer',
    companyName: 'BreatheEasy Climates',
    companyLogoColor: 'bg-sky-500',
    location: 'Delhi NCR',
    salaryRange: '₹3,50,000 - ₹5,00,000 P.A.',
    experienceRequired: '1 - 3 years',
    workMode: 'On-site',
    jobType: 'Full-Time',
    industry: 'Facilities Management',
    description: 'Join our facility management squad. Handle industrial air conditioning systems, chiller maintenance, and oversee local AC service technicians.',
    requirements: [
      'Diploma/B.Tech in Mechanical/Air Conditioning engineering.',
      'Practical knowledge of industrial compressor maintenance.',
      'Troubleshooting wiring faults and duct blockages.'
    ],
    responsibilities: [
      'Perform periodic inspections on company central HVAC systems.',
      'Handle breakdown emergencies at client commercial hubs.'
    ],
    postedDaysAgo: 5
  },
  {
    id: 'job-4',
    title: 'Remote UI/UX Designer',
    companyName: 'PixelCraft Creative',
    companyLogoColor: 'bg-rose-500',
    location: 'Remote (India)',
    salaryRange: '₹8,00,000 - ₹12,00,000 P.A.',
    experienceRequired: '3 - 6 years',
    workMode: 'Remote',
    jobType: 'Contract',
    industry: 'Design & Creative',
    description: 'Create interfaces that wow. Design responsive, high-converting layouts, wireframes, and design languages for professional services marketplaces.',
    requirements: [
      'Advanced Figma expertise with structured component libraries.',
      'Strong portfolio demonstrating high aesthetic web and mobile designs.',
      'Understanding of HTML5/CSS capability for clean handover.'
    ],
    responsibilities: [
      'Mock up page user-flows, interactive prototypes, and custom icons.',
      'Run a/b user tests and adjust alignment spacing based on user recordings.'
    ],
    postedDaysAgo: 1
  }
];

// Mock Subscription Plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'sub-basic',
    name: 'Basic',
    price: 'Free',
    billing: 'Forever',
    color: 'border-slate-200 bg-white text-slate-800',
    features: [
      'Standard Listing in directory',
      'Standard search placement',
      'Address & Phone visibility',
      'Receive up to 5 customer enquiries/month',
      'Standard review dashboard'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    id: 'sub-premium',
    name: 'Premium',
    price: '₹999',
    billing: 'month',
    color: 'border-teal-200 bg-teal-50/20 text-teal-900',
    features: [
      'Premium Directory Listing badge',
      'Higher placement in search queries',
      'Add Business Gallery & Photos',
      'Receive up to 30 enquiries/month',
      'SMS alerts for customer leads',
      'Link website & Social pages'
    ],
    cta: 'Upgrade to Premium',
    popular: false
  },
  {
    id: 'sub-gold',
    name: 'Gold Business',
    price: '₹2,499',
    billing: 'month',
    color: 'border-brand-blue/30 bg-blue-50/20 text-blue-900',
    features: [
      'Gold Verified Badge',
      'Top 5 Search Placement in category',
      'Featured on category landing page',
      'Unlimited enquiries & email leads',
      'WhatsApp notification alerts',
      'Analytical click & views tracker',
      '1 Featured banner promotion slot'
    ],
    cta: 'Go Gold Partner',
    popular: true
  },
  {
    id: 'sub-platinum',
    name: 'Platinum Partner',
    price: '₹4,999',
    billing: 'month',
    color: 'border-amber-400 bg-amber-50/20 text-slate-900',
    features: [
      'Platinum Crown Verification Logo',
      'Guaranteed Rank #1 or #2 in search',
      'Homepage Featured Business visibility',
      'Instant lead dispatch (10-sec priority)',
      'Dedicated relationship manager',
      'Monthly Lead Generation consultations',
      '3 Featured banner promotions'
    ],
    cta: 'Join Platinum Tier',
    popular: false
  }
];
