import { supabase } from './supabase';

interface CreateCheckoutSessionParams {
  priceId: string;
  mode: 'payment' | 'subscription';
  successUrl: string;
  cancelUrl: string;
  userId: string; // Changed from number to string for Supabase compatibility
}

interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export async function createCheckoutSession({
  priceId,
  mode,
  successUrl,
  cancelUrl,
  userId,
}: CreateCheckoutSessionParams): Promise<CheckoutSessionResponse> {
  try {
    // Get the current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      throw new Error('Authentication required');
    }

    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: priceId,
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) {
      console.error('Stripe checkout error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }

    if (!data || !data.url) {
      throw new Error('Invalid response from checkout service');
    }

    return {
      sessionId: data.sessionId,
      url: data.url,
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Helper function to create customer in database
export async function createLocalCustomer(userId: string): Promise<string> {
  const customerId = `cus_local_${userId}_${Date.now()}`;
  
  const { error } = await supabase
    .from('stripe_customers')
    .insert({
      user_id: userId,
      customer_id: customerId,
    });

  if (error) {
    throw new Error('Failed to create customer record');
  }

  return customerId;
}

// Helper function to create/update subscription in database
export async function createLocalSubscription(customerId: string, priceId: string) {
  const { error } = await supabase
    .from('stripe_subscriptions')
    .upsert({
      customer_id: customerId,
      price_id: priceId,
      status: 'active',
      current_period_start: Math.floor(Date.now() / 1000),
      current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
    }, {
      onConflict: 'customer_id'
    });

  if (error) {
    throw new Error('Failed to create subscription record');
  }
}