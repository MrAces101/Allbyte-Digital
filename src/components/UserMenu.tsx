import React, { useState } from 'react';
import { User, LogOut, Package, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';

const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { currentPlan } = useSubscription();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
          <User size={16} className="text-white" />
        </div>
        <span className="hidden md:block">{user.email}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
            {currentPlan && (
              <div className="flex items-center mt-1">
                <Package size={14} className="text-cyan-500 mr-1" />
                <p className="text-xs text-gray-600">{currentPlan.name}</p>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;