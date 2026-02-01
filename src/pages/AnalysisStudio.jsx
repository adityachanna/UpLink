import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getWorstCall, submitFeedback } from '../services/api';
import { PlayIcon, PauseIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import './AnalysisStudio.css';

const AnalysisStudio = () => {
  const [searchParams] = useSearchParams();
  const [agentName, setAgentName] = useState(searchParams.get('agent') || '');
  const [callData, setCallData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const audioRef = useRef(null);

  useEffect(() => {
    if (agentName) {
      fetchWorstCall();
    }
  }, [agentName]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const fetchWorstCall = async () => {
    try {
      setLoading(true);
      const data = await getWorstCall(agentName);
      setCallData(data);
    } catch (error) {
      console.error('Error fetching worst call:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      setSubmitting(true);
      await submitFeedback(agentName, callData.call_id, feedback);
      setShowSuccess(true);
      setFeedback('');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getCurrentTranscript = () => {
    if (!callData?.transcript) return null;
    return callData.transcript.find(
      (item) => currentTime >= item.start && currentTime <= item.end
    );
  };

  const currentTranscript = getCurrentTranscript();

  if (loading) {
    return (
      <div className="analysis-studio-container">
        <div className="loading">Loading call data...</div>
      </div>
    );
  }

  if (!callData) {
    return (
      <div className="analysis-studio-container">
        <div className="error-message">
          <p>No call data available for this agent.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-studio-container">
      <div className="studio-header">
        <div>
          <h1>Analysis Studio</h1>
          <p className="studio-subtitle">
            Agent: <strong>{callData.agent_name}</strong> | Call Date: <strong>{callData.call_date}</strong>
          </p>
          <p className="worst-call-badge">🔻 Poorest Performance Recording (Past Week)</p>
        </div>
      </div>

      <div className="studio-content">
        <div className="left-panel">
          <div className="audio-player-section">
            <h3>Audio Player</h3>
            <div className="audio-player">
              <audio
                ref={audioRef}
                src={callData.audio_url}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <button onClick={togglePlayPause} className="play-btn">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <div className="audio-info">
                <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="transcript-section">
            <h3>Live Transcript</h3>
            <div className="transcript-container">
              {callData.transcript && callData.transcript.map((item, idx) => (
                <div
                  key={idx}
                  className={`transcript-item ${
                    currentTime >= item.start && currentTime <= item.end ? 'active' : ''
                  } ${item.is_critical ? 'critical' : ''}`}
                >
                  <span className="timestamp">{new Date(item.start * 1000).toISOString().substr(14, 5)}</span>
                  <p className="transcript-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="sop-verification-section">
            <h3>SOP Verification</h3>
            <div className="sop-checks">
              {callData.sop_checks && callData.sop_checks.map((check, idx) => (
                <div key={idx} className={`sop-check-item ${check.passed ? 'passed' : 'failed'}`}>
                  <div className="check-header">
                    {check.passed ? (
                      <CheckCircleIcon className="check-icon success" />
                    ) : (
                      <XCircleIcon className="check-icon error" />
                    )}
                    <span className="check-name">{check.name}</span>
                  </div>
                  {!check.passed && check.expected && (
                    <div className="check-details">
                      <p className="what-said">Said: "{check.actual}"</p>
                      <p className="should-say">Should have said: "{check.expected}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ai-suggestions-section">
            <h3>AI Coaching Suggestions</h3>
            <div className="suggestions-list">
              {callData.ai_suggestions && callData.ai_suggestions.map((suggestion, idx) => (
                <div key={idx} className="suggestion-item">
                  <div className="suggestion-icon">🤖</div>
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="feedback-section">
            <h3>Admin Feedback</h3>
            <form onSubmit={handleSubmitFeedback}>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Type your feedback for the agent..."
                rows="4"
                disabled={submitting}
              />
              <button type="submit" disabled={submitting || !feedback.trim()}>
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
            {showSuccess && (
              <div className="success-toast">
                ✓ Feedback sent to Agent
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisStudio;
