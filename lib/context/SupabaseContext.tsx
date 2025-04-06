import React, { createContext, useContext, ReactNode } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { Database } from '../../types/supabase';

interface SupabaseContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  supabase: typeof supabase;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const supabaseData = useSupabase();

  return (
    <SupabaseContext.Provider value={supabaseData}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabaseContext() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabaseContext must be used within a SupabaseProvider');
  }
  return context;
} 