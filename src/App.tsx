import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ThreatModeling from './pages/ThreatModeling';
import UploadOpflow from './pages/UploadOpflow';
import BlueTeam from './pages/BlueTeam';
import RedTeam from './pages/RedTeam';
import Settings from './pages/Settings';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          roles: ['user']
        });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          roles: ['user']
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="threat-modeling" element={<ThreatModeling />} />
          <Route path="threat-modeling/upload" element={<UploadOpflow />} />
          <Route path="blue-team" element={<BlueTeam />} />
          <Route path="red-team" element={<RedTeam />} />
          <Route path="settings/*" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;