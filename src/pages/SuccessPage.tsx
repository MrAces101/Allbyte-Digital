import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Package, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import { useSubscription } from '../hooks/useSubscription';
import { supabase } from '../lib/supabase';

interface SuccessPageProps {
  onNavigateHome: () => void;
}

interface Order {
  order_id: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onNavigateHome }) => {
  const { user } = useAuth();
  const { subscription, currentPlan, refetch } = useSubscription();
  const [loading, setLoading] = useState(true);
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      onNavigateHome();
      return;
    }

    // Fetch recent order and subscription data
    const fetchData = async () => {
      try {
        // Refetch subscription data
        await refetch();
        
        // Get recent orders from the view
        const { data: orders, error } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .order('order_date', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching orders:', error);
        } else if (orders && orders.length > 0) {
          setRecentOrder(orders[0] as Order);
        }
      } catch (error) {
        console.error('Error fetching success page data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure database operations are complete
    const timer = setTimeout(fetchData, 1000);
    return () => clearTimeout(timer);
  }, [user, onNavigateHome, refetch]);

  if (!user) {
    return null;
  }

  const formatAmount = (amount: number, currency: string) => {
    if (currency.toLowerCase() === 'ttd') {
      return new Intl.NumberFormat('en-TT', {
        style: 'currency',
        currency: 'TTD',
      }).format(amount / 100);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Thank you for choosing Allbyte Digital. We're excited to bring your vision to life!
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <p className="text-gray-600 mt-4">Processing your order...</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <Package className="w-8 h-8 text-cyan-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              </div>
              
              {currentPlan || recentOrder ? (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {currentPlan ? currentPlan.name : 'Web Development Package'}
                      </h3>
                      <p className="text-gray-600">
                        {currentPlan ? currentPlan.description : 'Professional web development service'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {recentOrder 
                          ? formatAmount(recentOrder.amount_total, recentOrder.currency)
                          : currentPlan?.price || 'N/A'
                        }
                      </p>
                      <p className="text-sm text-gray-500">One-time payment</p>
                    </div>
                  </div>
                  
                  {recentOrder && (
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Order ID:</span>
                          <span className="ml-2 font-medium">#{recentOrder.order_id}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <span className="ml-2 font-medium text-green-600 capitalize">
                            {recentOrder.order_status}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Payment:</span>
                          <span className="ml-2 font-medium text-green-600 capitalize">
                            {recentOrder.payment_status}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <span className="ml-2 font-medium">
                            {new Date(recentOrder.order_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {currentPlan && (
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
                      <ul className="space-y-2">
                        {currentPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Order details are being processed...</p>
                </div>
              )}
            </div>
          )}

          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 rounded-xl p-8 text-white text-center">
            <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">1</div>
                <h3 className="font-semibold mb-2">Project Kickoff</h3>
                <p className="text-gray-300 text-sm">We'll contact you within 24 hours to schedule your project kickoff call and gather detailed requirements</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">2</div>
                <h3 className="font-semibold mb-2">Design & Development</h3>
                <p className="text-gray-300 text-sm">Our expert team will start working on your project according to your package specifications and timeline</p>
              </div>
              <div>
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2">3</div>
                <h3 className="font-semibold mb-2">Launch & Support</h3>
                <p className="text-gray-300 text-sm">We'll launch your website and provide ongoing support as included in your selected package</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateHome}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Back to Home
                <ArrowRight className="ml-2" size={20} />
              </button>
              <a 
                href="mailto:hello@allbytedigital.com"
                className="border-2 border-white/20 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SuccessPage;