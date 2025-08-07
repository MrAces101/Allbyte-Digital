import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Packages', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Resources', href: '#resources' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/95 to-gray-900/95 backdrop-blur-sm border-b border-slate-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-white">Allbyte Digital</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* User Menu or Login Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <UserMenu />
            ) : (
              <a
                href="/login"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
              >
                Sign In
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/20">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {user ? (
                <div className="pt-4 border-t border-slate-700/20">
                  <UserMenu />
                </div>
              ) : (
                <a
                  href="/login"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;