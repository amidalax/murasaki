import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    if (data.user) {
      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          roles: ['user'] // Default role, you can fetch actual roles from user_roles table
        }
      });
    }
  },
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    
    if (data.user) {
      // After signup, user needs to be signed in
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          roles: ['user']
        }
      });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));