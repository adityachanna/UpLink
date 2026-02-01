import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Play, Pause, RefreshCw, Clock, User, MapPin, TrendingDown, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import './Emergency.css';
import { getEscalations } from '../services/api';

const Emergency = () => {
    const [escalations, setEscalations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCallId, setExpandedCallId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [lastUpdate, setLastUpdate] = useState(null);
    const [audioError, setAudioError] = useState(false);
    const [coachingRemark, setCoachingRemark] = useState('');
    const [showToast, setShowToast] = useState(false);
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const waveformRefs = useRef({});

    // Fetch escalations from API
    const fetchEscalations = async () => {
        try {
            const data = await getEscalations();
            
            if (data.status === 'success') {
                setEscalations(data.flagged_calls || []);
                setLastUpdate(new Date(data.timestamp));
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching escalations:', error);
            setLoading(false);
        }
    };

    // Poll API every minute
    useEffect(() => {
        fetchEscalations();
        const interval = setInterval(fetchEscalations, 60000); // 60 seconds
        return () => clearInterval(interval);
    }, []);

    // Initialize WaveSurfer when a call is expanded
    useEffect(() => {
        const expandedCall = escalations.find(call => call.call_id === expandedCallId);
        
        if (expandedCall && waveformRefs.current[expandedCallId]) {
            setAudioError(false);
            
            // Destroy previous instance
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
                wavesurfer.current = null;
            }

            // Wait for DOM to be ready before creating WaveSurfer
            setTimeout(() => {
                if (!waveformRefs.current[expandedCallId]) return;

                // Create new WaveSurfer instance
                wavesurfer.current = WaveSurfer.create({
                    container: waveformRefs.current[expandedCallId],
                    waveColor: '#6b7280',
                    progressColor: '#22c55e',
                    cursorColor: '#22c55e',
                    barWidth: 3,
                    barRadius: 3,
                    cursorWidth: 1,
                    height: 100,
                    barGap: 2,
                    responsive: true,
                    normalize: true,
                    backend: 'WebAudio',
                    xhr: {
                        requestHeaders: [],
                        withCredentials: false,
                        mode: 'cors'
                    }
                });

                // Load audio with error handling
                try {
                    wavesurfer.current.load(expandedCall.audio_url);
                } catch (error) {
                    console.error('Error loading audio:', error);
                    setAudioError(true);
                }

                // Update current time
                wavesurfer.current.on('audioprocess', () => {
                    setCurrentTime(wavesurfer.current.getCurrentTime());
                });

                // Handle play event
                wavesurfer.current.on('play', () => {
                    setIsPlaying(true);
                });

                // Handle pause event
                wavesurfer.current.on('pause', () => {
                    setIsPlaying(false);
                });

                // Handle finish
                wavesurfer.current.on('finish', () => {
                    setIsPlaying(false);
                });

                // Handle ready
                wavesurfer.current.on('ready', () => {
                    console.log('Audio loaded successfully');
                    setAudioError(false);
                });

                // Handle errors
                wavesurfer.current.on('error', (error) => {
                    console.error('WaveSurfer error:', error);
                    setAudioError(true);
                });
            }, 100);

            return () => {
                if (wavesurfer.current) {
                    wavesurfer.current.destroy();
                    wavesurfer.current = null;
                }
            };
        }
    }, [expandedCallId, escalations]);

    const togglePlayPause = () => {
        if (wavesurfer.current) {
            if (wavesurfer.current.isPlaying()) {
                wavesurfer.current.pause();
                setIsPlaying(false);
            } else {
                wavesurfer.current.play();
                setIsPlaying(true);
            }
        }
    };

    const handleCoachingSubmit = (e) => {
        e.preventDefault();
        const expandedCall = escalations.find(call => call.call_id === expandedCallId);
        
        if (coachingRemark.trim() && expandedCall) {
            // Store remark in sessionStorage
            const remarks = JSON.parse(sessionStorage.getItem('coachingRemarks') || '[]');
            remarks.push({
                callId: expandedCall.call_id,
                agentName: expandedCall.agent.name,
                agentId: expandedCall.agent.employee_id,
                remark: coachingRemark,
                timestamp: new Date().toISOString()
            });
            sessionStorage.setItem('coachingRemarks', JSON.stringify(remarks));
            
            // Clear form and show toast
            setCoachingRemark('');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const seekToDeviation = (startTime) => {
        if (wavesurfer.current) {
            const duration = wavesurfer.current.getDuration();
            if (duration && duration > 0) {
                const seekPosition = startTime / duration;
                wavesurfer.current.seekTo(seekPosition);
                if (!isPlaying) {
                    wavesurfer.current.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    const getSeverityColor = (severity) => {
        if (severity >= 0.7) return 'critical';
        if (severity >= 0.4) return 'high';
        return 'medium';
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="emergency-container">
                <div className="loading-spinner">
                    <div className="spinner" />
                    <p>Loading escalations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="emergency-container">
           

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-content">
                        <p className="stat-label">Active Escalations</p>
                        <p className="stat-value">{escalations.length}</p>
                    </div>
                    <div className="stat-icon critical">
                        <AlertTriangle size={24} />
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-content">
                        <p className="stat-label">Avg Quality Score</p>
                        <p className="stat-value">
                            {escalations.length > 0 
                                ? Math.round(escalations.reduce((acc, call) => acc + call.scores.overall_quality, 0) / escalations.length * 100)
                                : 0}%
                        </p>
                    </div>
                    <div className="stat-icon">
                        <TrendingDown size={24} />
                    </div>
                </div>
            </div>

            {/* Escalations List */}
            <div className="escalations-list">
                {escalations.length === 0 ? (
                    <div className="empty-state">
                        <AlertTriangle size={48} />
                        <h3>No Active Escalations</h3>
                        <p>All calls are within acceptable parameters</p>
                    </div>
                ) : (
                    escalations.map((call) => {
                        const isExpanded = expandedCallId === call.call_id;
                        
                        return (
                            <div key={call.call_id} className="escalation-card">
                                {/* Card Header - Always Visible */}
                                <div 
                                    className="card-header" 
                                    onClick={() => setExpandedCallId(isExpanded ? null : call.call_id)}
                                >
                                    <div className="header-left">
                                        <div className="badge-critical">
                                            <AlertTriangle size={14} />
                                            FLAGGED
                                        </div>
                                        <div className="agent-info">
                                            <div className="agent-name">
                                                <User size={16} />
                                                {call.agent.name}
                                            </div>
                                            <div className="agent-location">
                                                <MapPin size={14} />
                                                {call.city.name}, {call.city.state}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="header-right">
                                        <div className="metrics">
                                            <div className="metric">
                                                <span className="metric-label">Quality</span>
                                                <span className="metric-value">{Math.round(call.scores.overall_quality * 100)}%</span>
                                            </div>
                                            <div className="metric">
                                                <span className="metric-label">SOP</span>
                                                <span className="metric-value">{Math.round(call.scores.sop_compliance * 100)}%</span>
                                            </div>
                                            <div className="metric">
                                                <span className="metric-label">Deviations</span>
                                                <span className="metric-value critical">{call.sop_deviations.length}</span>
                                            </div>
                                        </div>
                                        <button className="expand-btn">
                                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Issue Summary - Always Visible */}
                                <div className="card-summary">
                                    <div className="issue-badge">{call.primary_issue_category}</div>
                                    <p className="issue-description">{call.analysis.why_flagged}</p>
                                    <span className="call-time">
                                        {formatDistanceToNow(new Date(call.call_timestamp), { addSuffix: true })}
                                    </span>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="card-expanded">
                                        {/* Audio Section */}
                                        <div className="section audio-section">
                                            <div className="section-header">
                                                <h3>
                                                    <Volume2 size={18} />
                                                    Audio Playback
                                                </h3>
                                                <span className="audio-time">
                                                    {formatTime(currentTime)} / {formatTime(call.duration_seconds)}
                                                </span>
                                            </div>
                                            
                                            {audioError ? (
                                                <div className="audio-error">
                                                    <AlertTriangle size={20} />
                                                    <p>Unable to load audio due to CORS restrictions</p>
                                                    <a href={call.audio_url} target="_blank" rel="noopener noreferrer" className="link-button">
                                                        Open Audio in New Tab
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="audio-player">
                                                    <div 
                                                        ref={(el) => waveformRefs.current[call.call_id] = el}
                                                        className="waveform"
                                                    />
                                                    <button onClick={togglePlayPause} className="play-button">
                                                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                                        {isPlaying ? 'Pause' : 'Play'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* SOP Deviations */}
                                        <div className="section deviations-section">
                                            <div className="section-header">
                                                <h3>SOP Deviations ({call.sop_deviations.length})</h3>
                                            </div>
                                            <div className="deviations-grid">
                                                {call.sop_deviations.map((deviation, index) => (
                                                    <div key={index} className={`deviation-card ${getSeverityColor(deviation.severity)}`}>
                                                        <div className="deviation-header">
                                                            <button 
                                                                className={`time-badge ${audioError ? 'disabled' : ''}`}
                                                                onClick={() => !audioError && seekToDeviation(deviation.start_time)}
                                                                disabled={audioError}
                                                            >
                                                                <Play size={12} />
                                                                {formatTime(deviation.start_time)} - {formatTime(deviation.end_time)}
                                                            </button>
                                                            <span className={`severity-badge ${getSeverityColor(deviation.severity)}`}>
                                                                {Math.round(deviation.severity * 100)}% severity
                                                            </span>
                                                        </div>
                                                        <div className="deviation-issue">
                                                            <strong>Issue:</strong> {deviation.what_was_wrong.replace(/_/g, ' ').toUpperCase()}
                                                        </div>
                                                        <div className="deviation-content">
                                                            <div className="deviation-block incorrect">
                                                                <span className="label">What was said:</span>
                                                                <p>{deviation.deviated_phrase}</p>
                                                            </div>
                                                            <div className="deviation-block correct">
                                                                <span className="label">Should have said:</span>
                                                                <p>{deviation.should_have_said}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sentiment Chart */}
                                        <div className="section sentiment-section">
                                            <div className="section-header">
                                                <h3>Sentiment Trajectory</h3>
                                            </div>
                                            <div className="chart-container">
                                                <ResponsiveContainer width="100%" height={250}>
                                                    <AreaChart data={call.sentiment_trajectory}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(34, 197, 94, 0.1)" />
                                                        <XAxis 
                                                            dataKey="turn" 
                                                            stroke="#22c55e"
                                                            label={{ value: 'Turn', position: 'insideBottom', offset: -5, fill: '#22c55e' }}
                                                        />
                                                        <YAxis 
                                                            domain={[0, 1]}
                                                            stroke="#22c55e"
                                                            label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#22c55e' }}
                                                        />
                                                        <Tooltip 
                                                            contentStyle={{ 
                                                                backgroundColor: '#000000', 
                                                                border: '1px solid #22c55e',
                                                                borderRadius: '6px',
                                                                color: '#ffffff'
                                                            }}
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            dataKey="score" 
                                                            stroke="#22c55e" 
                                                            strokeWidth={2}
                                                            fill="#22c55e"
                                                            fillOpacity={0.1}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* Insights */}
                                        <div className="section insights-section">
                                            <div className="insights-grid">
                                                <div className="insight-card">
                                                    <h4>Business Insight</h4>
                                                    <p>{call.analysis.business_insight}</p>
                                                </div>
                                                <div className="insight-card">
                                                    <h4>Coaching Insight</h4>
                                                    <p>{call.analysis.coaching_insight}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Coaching Action Form */}
                                        <div className="section coaching-action-section">
                                            <div className="section-header">
                                                <h3>Coaching Action</h3>
                                            </div>
                                            <form onSubmit={handleCoachingSubmit} className="coaching-form">
                                                <textarea
                                                    value={coachingRemark}
                                                    onChange={(e) => setCoachingRemark(e.target.value)}
                                                    placeholder="Enter your coaching remarks for the agent..."
                                                    className="coaching-textarea"
                                                    rows="4"
                                                />
                                                <button type="submit" className="submit-button" disabled={!coachingRemark.trim()}>
                                                    Submit Feedback
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="toast-notification">
                    Feedback sent to Agent ✓
                </div>
            )}
        </div>
    );
};

export default Emergency;
