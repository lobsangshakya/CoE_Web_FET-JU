import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';
import { ChevronDownIcon, LogoutIcon } from '../icons';

// FIX: Changed component definition to use React.FC to correctly handle children prop type.
const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
        isActive
          ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(255,149,28,0.8)] scale-105'
          : 'text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,149,28,0.7)] hover:scale-105'
      }`
    }
  >
    {children}
  </NavLink>
);

const Header = () => {
  const { user, isAuthenticated, logout, role } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = () => {
    switch (role) {
      case UserRole.ADMIN:
        return '/admin';
      case UserRole.FACULTY:
        return '/faculty';
      case UserRole.STUDENT:
        return '/student';
      default:
        return '/';
    }
  };

  const renderNavLinks = () => (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/current-projects">Current Projects</NavItem>
      <NavItem to="/coe">CoE</NavItem>
      <NavItem to="/blog">Blog</NavItem>
      <NavItem to="/research-repository">Research Repository</NavItem>
      <NavItem to="/events">Events</NavItem>
      <NavItem to="/contact">Contact Us</NavItem>
    </>
  );

  return (
    <header className="fixed w-full top-0 md:top-4 z-50 px-4 transition-all duration-300">
      {/* Glassy Navbar */}
      <div className="max-w-7xl mx-auto bg-dark-blue/10 backdrop-blur-xl border border-dark-blue/100 rounded-full shadow-[0_0_20px_rgba(255,149,28,0.15)]">
        <div className="flex items-center justify-between h-20 px-4 sm:px-6">
          {/* Logo + Nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/">
                <img
                  className="h-[150px] w-auto object-contain"
                  src="https://i.postimg.cc/rs8nTBx4/logo-jain-white.png"
                  alt="Jain University Logo"
                />
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">{renderNavLinks()}</div>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                    className="bg-black/20 hover:bg-black/40 rounded-full flex items-center text-sm p-1 pr-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                    <span className="ml-2 text-white font-medium">{user.name}</span>
                    <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-300" />
                  </button>
                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <NavLink
                        to={getDashboardPath()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogoutIcon className="h-4 w-4 mr-2" />
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <NavLink
                    to="/login"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center text-sm px-4 py-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(255,149,28,0.7)]"
                  >
                    Admin
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-800/50 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-gray-800/90 backdrop-blur-lg rounded-xl shadow-lg border border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {renderNavLinks()}
            {isAuthenticated && user ? (
              <>
                <NavLink
                  to={getDashboardPath()}
                  className="text-gray-200 hover:bg-black/20 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all hover:drop-shadow-[0_0_8px_rgba(255,149,28,0.6)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-200 hover:bg-black/20 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all hover:drop-shadow-[0_0_8px_rgba(255,149,28,0.6)]"
                >
                  Sign out
                </a>
              </>
            ) : (
              <NavLink
                to="/login"
                className="text-gray-200 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(255,149,28,0.6)] block px-3 py-2 rounded-md text-base font-medium transition-all"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;