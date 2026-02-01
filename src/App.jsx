import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './utils/supabase';
import Layout from './components/Layout';
import EnhancedLanding from './pages/EnhancedLanding';
import IndiaMap from './pages/IndiaMap';
import Leaderboard from './pages/Leaderboard';
import CityInsights from './pages/CityInsights';
import AgentStats from './pages/AgentStats';
import AnalysisStudio from './pages/AnalysisStudio';
import Emergency from './pages/Emergency';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6b7280'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={session ? <Navigate to="/dashboard" /> : <EnhancedLanding />} />
        
        <Route element={session ? <Layout /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<IndiaMap />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/city-insights" element={<CityInsights />} />
          <Route path="/agent" element={<AgentStats />} />
          <Route path="/analysis" element={<AnalysisStudio />} />
          <Route path="/emergency" element={<Emergency />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
