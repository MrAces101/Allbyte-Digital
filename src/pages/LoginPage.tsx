import React, { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

interface LoginPageProps {
  onNavigateHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigateHome }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { user, loading } = useAuth();

  // If user is already authenticated and not loading, redirect immediately
  if (!loading && user) {
    onNavigateHome();
    return null;
  }

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  const handleSuccess = () => {
    onNavigateHome();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onNavigateHome}
            className="flex items-center text-cyan-600 hover:text-cyan-700 mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          
          <AuthForm 
            mode={mode}
            onToggleMode={handleToggleMode}
            onSuccess={handleSuccess}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;