import { useState, useEffect } from 'react';
import { User, signIn, signUp, signOut, getCurrentUser } from '../lib/auth';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at!,
            updated_at: session.user.updated_at!,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInUser = async (email: string, password: string) => {
    const result = await signIn(email, password);
    return result;
  };

  const signUpUser = async (email: string, password: string, fullName?: string) => {
    const result = await signUp(email, password, fullName);
    return result;
  };

  const signOutUser = async () => {
    await signOut();
    setUser(null);
  };

  return {
    user,
    loading,
    signIn: signInUser,
    signUp: signUpUser,
    signOut: signOutUser,
  };
}