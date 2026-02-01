import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Error logging in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-hero">
          <h1 className="landing-title">Auto-QA System</h1>
          <p className="landing-subtitle">
            Comprehensive Call Quality Analysis & Agent Performance Management
          </p>
          
          <div className="landing-features">
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Monitor call quality across all regions and agents</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>SOP Adherence</h3>
              <p>Track script compliance and key step completion</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🚨</div>
              <h3>Risk Detection</h3>
              <p>Automatic flagging of high-risk calls for review</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💡</div>
              <h3>AI Coaching</h3>
              <p>Personalized insights for agent improvement</p>
            </div>
          </div>

          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="google-login-btn"
          >
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
