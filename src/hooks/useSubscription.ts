import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getProductByPriceId } from '../stripe-config';
import { useAuth } from './useAuth';

interface UserSubscription {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error fetching subscription:', error);
        setSubscription(null);
      } else if (data) {
        setSubscription(data as UserSubscription);
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPlan = () => {
    if (!subscription?.price_id) return null;
    return getProductByPriceId(subscription.price_id);
  };

  return {
    subscription,
    loading,
    currentPlan: getCurrentPlan(),
    refetch: fetchSubscription,
  };
}