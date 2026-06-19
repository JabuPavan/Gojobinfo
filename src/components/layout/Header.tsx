import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, LogOut, ChevronDown, Bookmark, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import type { UserRole } from '../../store/useAuthStore';
import { Logo } from '../../brand/Logo';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { user, isAuthenticated, logout, notifications, markAllNotificationsRead } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdowns on route changes
  useEffect(() => {
    setIsOpen(false);
    setShowProfileDropdown(false);
    setShowNotifications(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = (role: UserRole) => {
    switch (role) {
      case 'professional': return '/dashboard/professional';
      case 'business': return '/dashboard/business';
      case 'recruiter': return '/dashboard/recruiter';
      default: return '/dashboard/user';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/businesses', label: 'Businesses' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/subscriptions', label: 'Pricing Plans' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 shadow-md border-b border-slate-200/80 backdrop-blur-md' 
        : 'bg-white/80 border-b border-slate-100/50 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-brand-blue bg-blue-50/50'
                      : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Controls (Notifications, Auth, Dashboard link) */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <>
                {/* Notifications Icon Button */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileDropdown(false);
                      if (!showNotifications) markAllNotificationsRead();
                    }}
                    className="p-2 text-slate-500 hover:text-brand-blue hover:bg-slate-100 rounded-full relative transition-all duration-200"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-brand-orange text-white text-[9px] font-bold flex items-center justify-center rounded-full animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown Panel */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden transform origin-top-right transition-all">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-55 flex justify-between items-center bg-slate-50">
                        <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="text-xs text-brand-blue font-medium">{unreadCount} unread</span>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-slate-400 text-sm">
                            No notifications yet.
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div key={notif.id} className={`p-4 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/20' : ''}`}>
                              <h4 className="text-xs font-bold text-slate-800 flex items-center justify-between">
                                {notif.title}
                                <span className="text-[10px] text-slate-400 font-normal">{notif.time}</span>
                              </h4>
                              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notif.description}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Profile Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(!showProfileDropdown);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-slate-200 hover:border-brand-blue hover:bg-slate-50 rounded-full transition-all duration-200 text-slate-700 font-semibold text-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-brand-teal text-white flex items-center justify-center text-xs font-bold shadow-inner">
                      {user.avatar}
                    </div>
                    <span className="max-w-[80px] truncate">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Profile Dropdown Options */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
                      <div className="px-4 py-3 bg-slate-50/50">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-semibold text-brand-orange bg-orange-50 border border-orange-100 rounded px-1.5 py-0.5">
                          {user.role} workspace
                        </span>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          to={getDashboardPath(user.role)}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          My Dashboard
                        </Link>
                        <Link
                          to="/dashboard/user"
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-blue font-medium transition-colors"
                        >
                          <Bookmark className="w-4 h-4" />
                          Saved Bookmarks
                        </Link>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dashboard Shortcut Button */}
                <Link
                  to={getDashboardPath(user.role)}
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg shadow-blue-500/10 flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  className="text-slate-600 hover:text-brand-blue text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth?register=true"
                  className="bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-blue-500/10"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-brand-blue hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Navigation Overlay) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          {/* Menu Drawer Content */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white pt-5 pb-4 shadow-xl border-r border-slate-150 animate-slide-in">
            <div className="flex items-center px-4 justify-between">
              <Logo />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-8 flex-1 h-0 overflow-y-auto px-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-base font-bold transition-all duration-200 ${
                        isActive
                          ? 'text-brand-blue bg-blue-50'
                          : 'text-slate-600 hover:text-brand-blue hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="px-4 border-t border-slate-100 pt-4 bg-slate-50/50">
              {isAuthenticated && user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {user.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{user.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to={getDashboardPath(user.role)}
                    className="w-full text-center bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm py-2 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full border border-slate-200 text-center text-slate-700 hover:bg-red-50 hover:text-red-600 font-bold text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/auth"
                    className="w-full text-center text-slate-700 hover:bg-slate-100 font-bold text-sm py-2 rounded-lg transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth?register=true"
                    className="w-full text-center bg-brand-blue hover:bg-blue-700 text-white font-bold text-sm py-2 rounded-lg shadow-md transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
