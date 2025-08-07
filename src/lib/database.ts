import initSqlJs, { Database } from 'sql.js';

let db: Database | null = null;
let isInitialized = false;

export async function initDatabase(): Promise<Database> {
  if (db && isInitialized) {
    return db;
  }

  try {
    // Initialize SQL.js
    const SQL = await initSqlJs({
      locateFile: (file) => `https://sql.js.org/dist/${file}`
    });

    // Create a new database
    db = new SQL.Database();
    
    // Create tables
    await createTables();
    
    isInitialized = true;
    console.log('SQLite database initialized successfully');
    
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

async function createTables() {
  if (!db) throw new Error('Database not initialized');

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Customers table (for Stripe integration)
  db.run(`
    CREATE TABLE IF NOT EXISTS stripe_customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      customer_id TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS stripe_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      checkout_session_id TEXT NOT NULL,
      payment_intent_id TEXT NOT NULL,
      customer_id TEXT NOT NULL,
      amount_subtotal INTEGER NOT NULL,
      amount_total INTEGER NOT NULL,
      currency TEXT NOT NULL,
      payment_status TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    )
  `);

  // Subscriptions table
  db.run(`
    CREATE TABLE IF NOT EXISTS stripe_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id TEXT UNIQUE NOT NULL,
      subscription_id TEXT DEFAULT NULL,
      price_id TEXT DEFAULT NULL,
      current_period_start INTEGER DEFAULT NULL,
      current_period_end INTEGER DEFAULT NULL,
      cancel_at_period_end BOOLEAN DEFAULT FALSE,
      payment_method_brand TEXT DEFAULT NULL,
      payment_method_last4 TEXT DEFAULT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    )
  `);

  console.log('Database tables created successfully');
}

export async function getDatabase(): Promise<Database> {
  if (!db || !isInitialized) {
    return await initDatabase();
  }
  return db;
}

// User management functions
export async function createUser(email: string, passwordHash: string, fullName?: string) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      INSERT INTO users (email, password_hash, full_name)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run([email, passwordHash, fullName || null]);
    stmt.free();
    
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      SELECT * FROM users WHERE email = ?
    `);
    
    const result = stmt.getAsObject([email]);
    stmt.free();
    
    return Object.keys(result).length > 0 ? result : null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

export async function getUserById(id: number) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      SELECT * FROM users WHERE id = ?
    `);
    
    const result = stmt.getAsObject([id]);
    stmt.free();
    
    return Object.keys(result).length > 0 ? result : null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
}

// Customer management functions
export async function createCustomer(userId: number, customerId: string) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      INSERT INTO stripe_customers (user_id, customer_id)
      VALUES (?, ?)
    `);
    
    const result = stmt.run([userId, customerId]);
    stmt.free();
    
    return result;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
}

export async function getCustomerByUserId(userId: number) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      SELECT * FROM stripe_customers 
      WHERE user_id = ? AND deleted_at IS NULL
    `);
    
    const result = stmt.getAsObject([userId]);
    stmt.free();
    
    return Object.keys(result).length > 0 ? result : null;
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
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      INSERT INTO stripe_orders (
        checkout_session_id, payment_intent_id, customer_id,
        amount_subtotal, amount_total, currency, payment_status, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run([
      orderData.checkout_session_id,
      orderData.payment_intent_id,
      orderData.customer_id,
      orderData.amount_subtotal,
      orderData.amount_total,
      orderData.currency,
      orderData.payment_status,
      orderData.status || 'pending'
    ]);
    stmt.free();
    
    return result;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrdersByCustomerId(customerId: string) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      SELECT * FROM stripe_orders 
      WHERE customer_id = ? AND deleted_at IS NULL
      ORDER BY created_at DESC
    `);
    
    const result = stmt.get([customerId]);
    stmt.free();
    
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
  const database = await getDatabase();
  
  try {
    // First, try to update existing subscription
    const existingStmt = database.prepare(`
      SELECT id FROM stripe_subscriptions 
      WHERE customer_id = ? AND deleted_at IS NULL
    `);
    
    const existing = existingStmt.getAsObject([subscriptionData.customer_id]);
    existingStmt.free();
    
    if (Object.keys(existing).length > 0) {
      // Update existing subscription
      const updateStmt = database.prepare(`
        UPDATE stripe_subscriptions 
        SET subscription_id = ?, price_id = ?, current_period_start = ?,
            current_period_end = ?, cancel_at_period_end = ?,
            payment_method_brand = ?, payment_method_last4 = ?,
            status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE customer_id = ? AND deleted_at IS NULL
      `);
      
      const result = updateStmt.run([
        subscriptionData.subscription_id || null,
        subscriptionData.price_id || null,
        subscriptionData.current_period_start || null,
        subscriptionData.current_period_end || null,
        subscriptionData.cancel_at_period_end || false,
        subscriptionData.payment_method_brand || null,
        subscriptionData.payment_method_last4 || null,
        subscriptionData.status,
        subscriptionData.customer_id
      ]);
      updateStmt.free();
      
      return result;
    } else {
      // Create new subscription
      const insertStmt = database.prepare(`
        INSERT INTO stripe_subscriptions (
          customer_id, subscription_id, price_id, current_period_start,
          current_period_end, cancel_at_period_end, payment_method_brand,
          payment_method_last4, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const result = insertStmt.run([
        subscriptionData.customer_id,
        subscriptionData.subscription_id || null,
        subscriptionData.price_id || null,
        subscriptionData.current_period_start || null,
        subscriptionData.current_period_end || null,
        subscriptionData.cancel_at_period_end || false,
        subscriptionData.payment_method_brand || null,
        subscriptionData.payment_method_last4 || null,
        subscriptionData.status
      ]);
      insertStmt.free();
      
      return result;
    }
  } catch (error) {
    console.error('Error creating/updating subscription:', error);
    throw error;
  }
}

export async function getSubscriptionByCustomerId(customerId: string) {
  const database = await getDatabase();
  
  try {
    const stmt = database.prepare(`
      SELECT * FROM stripe_subscriptions 
      WHERE customer_id = ? AND deleted_at IS NULL
    `);
    
    const result = stmt.getAsObject([customerId]);
    stmt.free();
    
    return Object.keys(result).length > 0 ? result : null;
  } catch (error) {
    console.error('Error getting subscription by customer ID:', error);
    throw error;
  }
}