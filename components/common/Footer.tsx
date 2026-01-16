
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-orange-accent text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-orange-200 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li><NavLink to="/" className="text-base text-white hover:text-orange-100">Home</NavLink></li>
              <li><NavLink to="/current-projects" className="text-base text-white hover:text-orange-100">Current Projects</NavLink></li>
              <li><NavLink to="/research-repository" className="text-base text-white hover:text-orange-100">Research Repository</NavLink></li>
              <li><NavLink to="/events" className="text-base text-white hover:text-orange-100">Events</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-orange-200 tracking-wider uppercase">Blog</h3>
            <ul className="mt-4 space-y-4">
                <li><NavLink to="/blog" className="text-base text-white hover:text-orange-100">Blog Feed</NavLink></li>
                <li><a href="#" className="text-base text-white hover:text-orange-100">Forums</a></li>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-orange-200 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-white hover:text-orange-100">Vision & Mission</a></li>
                <li><a href="#" className="text-base text-white hover:text-orange-100">Our Team</a></li>
                <li><NavLink to="/contact" className="text-base text-white hover:text-orange-100">Contact Us</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-orange-200 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-white hover:text-orange-100">Privacy Policy</a></li>
              <li><a href="#" className="text-base text-white hover:text-orange-100">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-orange-500 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-base text-orange-200 md:mt-0 md:order-1">
            &copy; 2024 Jain University, Center of Excellence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
