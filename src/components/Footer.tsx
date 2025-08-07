import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'E-commerce Solutions',
    'SEO Optimization',
    'Maintenance & Support',
  ];

  return (
    <footer id="contact" className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Allbyte Digital</span>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-md">
              We're a full-service digital agency specializing in creating beautiful, 
              high-performing websites that drive real business results. Let's build 
              something amazing together.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-3 text-cyan-400" size={20} />
                <span className="text-gray-300">hello@allbytedigital.com</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-3 text-cyan-400" size={20} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="mr-3 text-cyan-400" size={20} />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Allbyte Digital. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-200">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;