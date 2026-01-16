import React from 'react';
import Card from '../components/common/Card';
import { EnvelopeIcon, PhoneIcon } from '../components/icons';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            We'd love to hear from you. Reach out to us for collaborations, inquiries, or any other information.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Main Address Card */}
          <Card variant="elevated" className="p-8">
            <h2 className="text-2xl font-bold text-dark-blue">JAIN Faculty of Engineering and Technology</h2>
            <address className="mt-6 not-italic text-gray-600 space-y-4">
              <p>Jakkasandra Post, Kanakapura Taluk, Ramanagara District - 562112</p>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-orange-accent"/>
                <span>+91 80 2757 7231 / +91 80 2757 7232</span>
              </div>
               <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-orange-accent"/>
                <a href="mailto:info@jainuniversity.ac.in" className="hover:text-orange-accent transition-colors">info@jainuniversity.ac.in</a>
              </div>
            </address>
          </Card>

          {/* Map Placeholder */}
          <Card variant="elevated">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.498869123849!2d77.44186481534017!3d12.68025172605804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bade7067253c09b%3A0x2442477382d6286!2sJain%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1689932168925!5m2!1sen!2sin" 
                width="100%" 
                height="350" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-lg"
              ></iframe>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;