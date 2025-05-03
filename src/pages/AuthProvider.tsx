import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabaseClient';
import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({ session: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}