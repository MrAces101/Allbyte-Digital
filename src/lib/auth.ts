import { supabase } from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthResult {
  user: User | null;
  error: string | null;
}

export async function signUp(email: string, password: string, fullName?: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return {
        user: null,
        error: error.message,
      };
    }

    if (data.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata,
          created_at: data.user.created_at!,
          updated_at: data.user.updated_at!,
        },
        error: null,
      };
    }

    return {
      user: null,
      error: 'Failed to create user',
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      user: null,
      error: error instanceof Error ? error.message : 'An error occurred during sign up',
    };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        user: null,
        error: error.message,
      };
    }

    if (data.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          user_metadata: data.user.user_metadata,
          created_at: data.user.created_at!,
          updated_at: data.user.updated_at!,
        },
        error: null,
      };
    }

    return {
      user: null,
      error: 'Failed to sign in',
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      user: null,
      error: error instanceof Error ? error.message : 'An error occurred during sign in',
    };
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      return {
        id: user.id,
        email: user.email!,
        user_metadata: user.user_metadata,
        created_at: user.created_at!,
        updated_at: user.updated_at!,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Session management is handled automatically by Supabase
export function saveUserSession(user: User): void {
  // No longer needed - Supabase handles this automatically
}

export function getUserSession(): User | null {
  // No longer needed - use getCurrentUser() instead
  return null;
}

export function clearUserSession(): void {
  // No longer needed - Supabase handles this automatically
}