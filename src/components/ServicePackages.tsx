import React, { useState } from 'react';
import { Check, Star, Loader2 } from 'lucide-react';
import { stripeProducts } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';
import { createCheckoutSession } from '../lib/stripe';
import ProjectIntakeForm from './ProjectIntakeForm/ProjectIntakeForm';

const ServicePackages = () => {
  const { user } = useAuth();
  const [loadingPackage, setLoadingPackage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showIntakeForm, setShowIntakeForm] = useState(false);

  const handleGetStarted = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user) {
      // Show intake form for non-authenticated users
      setShowIntakeForm(true);
      return;
    }

    setLoadingPackage(priceId);
    setError(null);

    try {
      const result = await createCheckoutSession({
        priceId,
        mode,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: window.location.href,
        userId: user.id, // Now using string ID from Supabase
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message || 'Failed to start checkout. Please try again.');
    } finally {
      setLoadingPackage(null);
    }
  };

  const handleIntakeFormSuccess = () => {
    setShowIntakeForm(false);
    // You could redirect to a thank you page or show a success message
  };

  return (
    <>
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Package
            </h2>
            <p className="text-xl text-gray-600">
              Transparent pricing with no hidden fees - find the right solution for your business
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stripeProducts.map((pkg, index) => {
              const isPopular = pkg.name === 'Professional';
              const isLoading = loadingPackage === pkg.priceId;
              
              return (
                <div key={index} className={`bg-white rounded-xl border-2 ${isPopular ? 'border-cyan-500' : 'border-gray-200'} p-8 relative hover:shadow-xl transition-all duration-300 ${isPopular ? 'scale-105' : ''}`}>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                        <Star className="mr-1" size={16} />
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="text-4xl font-bold text-gray-900">
                      {pkg.price}
                      <span className="text-lg text-gray-500 font-normal"> / project</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="text-cyan-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handleGetStarted(pkg.priceId, pkg.mode)}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center ${
                      isPopular 
                        ? 'bg-cyan-500 hover:bg-cyan-600 text-white disabled:bg-cyan-400' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 disabled:bg-gray-50'
                    } ${isLoading ? 'cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Processing...
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Need a custom solution? We'd love to discuss your unique requirements.
            </p>
            <button 
              onClick={() => setShowIntakeForm(true)}
              className="bg-slate-700 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </section>

      {/* Project Intake Form Modal */}
      {showIntakeForm && (
        <ProjectIntakeForm
          onClose={() => setShowIntakeForm(false)}
          onSuccess={handleIntakeFormSuccess}
        />
      )}
    </>
  );
};

export default ServicePackages;