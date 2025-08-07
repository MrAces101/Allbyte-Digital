import { neon } from '@neondatabase/serverless';

// Get the database URL from environment variables
const getDatabaseUrl = () => {
  const url = import.meta.env.VITE_NEON_DATABASE_URL;
  if (!url) {
    throw new Error('VITE_NEON_DATABASE_URL environment variable is required');
  }
  return url;
};

// Create the SQL client
let sql: ReturnType<typeof neon> | null = null;

export function getNeonClient() {
  if (!sql) {
    const databaseUrl = getDatabaseUrl();
    sql = neon(databaseUrl);
  }
  return sql;
}

// Initialize database tables
export async function initializeDatabase() {
  const sql = getNeonClient();
  
  try {
    console.log('Initializing Neon database tables...');

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create stripe_customers table
    await sql`
      CREATE TABLE IF NOT EXISTS stripe_customers (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        customer_id VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
      )
    `;

    // Create stripe_orders table
    await sql`
      CREATE TABLE IF NOT EXISTS stripe_orders (
        id SERIAL PRIMARY KEY,
        checkout_session_id VARCHAR(255) NOT NULL,
        payment_intent_id VARCHAR(255) NOT NULL,
        customer_id VARCHAR(255) NOT NULL,
        amount_subtotal INTEGER NOT NULL,
        amount_total INTEGER NOT NULL,
        currency VARCHAR(10) NOT NULL,
        payment_status VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
      )
    `;

    // Create subscription status enum type (only if it doesn't exist)
    await sql`
      DO $$ BEGIN
        CREATE TYPE subscription_status AS ENUM (
          'not_started', 'incomplete', 'incomplete_expired', 'trialing',
          'active', 'past_due', 'canceled', 'unpaid', 'paused'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$
    `;

    // Create stripe_subscriptions table
    await sql`
      CREATE TABLE IF NOT EXISTS stripe_subscriptions (
        id SERIAL PRIMARY KEY,
        customer_id VARCHAR(255) UNIQUE NOT NULL,
        subscription_id VARCHAR(255) DEFAULT NULL,
        price_id VARCHAR(255) DEFAULT NULL,
        current_period_start BIGINT DEFAULT NULL,
        current_period_end BIGINT DEFAULT NULL,
        cancel_at_period_end BOOLEAN DEFAULT FALSE,
        payment_method_brand VARCHAR(50) DEFAULT NULL,
        payment_method_last4 VARCHAR(4) DEFAULT NULL,
        status subscription_status NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
      )
    `;

    console.log('✅ Neon database tables initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing Neon database:', error);
    throw error;
  }
}

// User management functions
export async function createUser(email: string, passwordHash: string, fullName?: string) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      INSERT INTO users (email, password_hash, full_name)
      VALUES (${email}, ${passwordHash}, ${fullName || null})
      RETURNING *
    `;
    
    return result[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;
    
    return result[0] || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

export async function getUserById(id: number) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id}
    `;
    
    return result[0] || null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
}

// Customer management functions
export async function createCustomer(userId: number, customerId: string) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      INSERT INTO stripe_customers (user_id, customer_id)
      VALUES (${userId}, ${customerId})
      RETURNING *
    `;
    
    return result[0];
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function getCustomerByUserId(userId: number) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT * FROM stripe_customers 
      WHERE user_id = ${userId} AND deleted_at IS NULL
    `;
    
    return result[0] || null;
  } catch (error) {
    console.error('Error getting customer by user ID:', error);
    throw error;
  }
}

// Order management functions
export async function createOrder(orderData: {
  checkout_session_id: string;
  payment_intent_id: string;
  customer_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  status?: string;
}) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      INSERT INTO stripe_orders (
        checkout_session_id, payment_intent_id, customer_id,
        amount_subtotal, amount_total, currency, payment_status, status
      ) VALUES (
        ${orderData.checkout_session_id},
        ${orderData.payment_intent_id},
        ${orderData.customer_id},
        ${orderData.amount_subtotal},
        ${orderData.amount_total},
        ${orderData.currency},
        ${orderData.payment_status},
        ${orderData.status || 'pending'}
      )
      RETURNING *
    `;
    
    return result[0];
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrdersByCustomerId(customerId: string) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT * FROM stripe_orders 
      WHERE customer_id = ${customerId} AND deleted_at IS NULL
      ORDER BY created_at DESC
    `;
    
    return result;
  } catch (error) {
    console.error('Error getting orders by customer ID:', error);
    throw error;
  }
}

// Subscription management functions
export async function createOrUpdateSubscription(subscriptionData: {
  customer_id: string;
  subscription_id?: string;
  price_id?: string;
  current_period_start?: number;
  current_period_end?: number;
  cancel_at_period_end?: boolean;
  payment_method_brand?: string;
  payment_method_last4?: string;
  status: string;
}) {
  const sql = getNeonClient();
  
  try {
    // Try to update existing subscription first
    const existing = await sql`
      SELECT id FROM stripe_subscriptions 
      WHERE customer_id = ${subscriptionData.customer_id} AND deleted_at IS NULL
    `;
    
    if (existing.length > 0) {
      // Update existing subscription
      const result = await sql`
        UPDATE stripe_subscriptions 
        SET 
          subscription_id = ${subscriptionData.subscription_id || null},
          price_id = ${subscriptionData.price_id || null},
          current_period_start = ${subscriptionData.current_period_start || null},
          current_period_end = ${subscriptionData.current_period_end || null},
          cancel_at_period_end = ${subscriptionData.cancel_at_period_end || false},
          payment_method_brand = ${subscriptionData.payment_method_brand || null},
          payment_method_last4 = ${subscriptionData.payment_method_last4 || null},
          status = ${subscriptionData.status}::subscription_status,
          updated_at = NOW()
        WHERE customer_id = ${subscriptionData.customer_id} AND deleted_at IS NULL
        RETURNING *
      `;
      
      return result[0];
    } else {
      // Create new subscription
      const result = await sql`
        INSERT INTO stripe_subscriptions (
          customer_id, subscription_id, price_id, current_period_start,
          current_period_end, cancel_at_period_end, payment_method_brand,
          payment_method_last4, status
        ) VALUES (
          ${subscriptionData.customer_id},
          ${subscriptionData.subscription_id || null},
          ${subscriptionData.price_id || null},
          ${subscriptionData.current_period_start || null},
          ${subscriptionData.current_period_end || null},
          ${subscriptionData.cancel_at_period_end || false},
          ${subscriptionData.payment_method_brand || null},
          ${subscriptionData.payment_method_last4 || null},
          ${subscriptionData.status}::subscription_status
        )
        RETURNING *
      `;
      
      return result[0];
    }
  } catch (error) {
    console.error('Error creating/updating subscription:', error);
    throw error;
  }
}

export async function getSubscriptionByCustomerId(customerId: string) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT * FROM stripe_subscriptions 
      WHERE customer_id = ${customerId} AND deleted_at IS NULL
    `;
    
    return result[0] || null;
  } catch (error) {
    console.error('Error getting subscription by customer ID:', error);
    throw error;
  }
}

// View functions for user data
export async function getUserSubscription(userId: number) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT
        c.customer_id,
        s.subscription_id,
        s.status as subscription_status,
        s.price_id,
        s.current_period_start,
        s.current_period_end,
        s.cancel_at_period_end,
        s.payment_method_brand,
        s.payment_method_last4
      FROM stripe_customers c
      LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
      WHERE c.user_id = ${userId}
      AND c.deleted_at IS NULL
      AND s.deleted_at IS NULL
    `;
    
    return result[0] || null;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
}

export async function getUserOrders(userId: number) {
  const sql = getNeonClient();
  
  try {
    const result = await sql`
      SELECT
        c.customer_id,
        o.id as order_id,
        o.checkout_session_id,
        o.payment_intent_id,
        o.amount_subtotal,
        o.amount_total,
        o.currency,
        o.payment_status,
        o.status as order_status,
        o.created_at as order_date
      FROM stripe_customers c
      LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
      WHERE c.user_id = ${userId}
      AND c.deleted_at IS NULL
      AND o.deleted_at IS NULL
      ORDER BY o.created_at DESC
    `;
    
    return result;
  } catch (error) {
    console.error('Error getting user orders:', error);
    throw error;
  }
}