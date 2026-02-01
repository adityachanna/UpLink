import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../services/api';
import { TrophyIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('overall_score');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboard();
      // Handle different response formats
      const agents = data.agents || data.data || (Array.isArray(data) ? data : []);
      setLeaderboard(agents);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentClick = (agentName) => {
    navigate(`/agent?name=${agentName}`);
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (sortBy === 'overall_score') return b.overall_score - a.overall_score;
    if (sortBy === 'calls') return b.calls_received - a.calls_received;
    if (sortBy === 'emergencies') return b.emergencies - a.emergencies;
    return 0;
  });

  const getScoreColor = (score) => {
    if (score >= 0.7) return '#22c55e';
    if (score >= 0.4) return '#eab308';
    return '#ef4444';
  };

  const getMedalIcon = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return null;
  };

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="header-title">
          <TrophyIcon className="title-icon" />
          <h1>Agent Leaderboard</h1>
        </div>
        
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="overall_score">Overall Score</option>
            <option value="calls">Total Calls</option>
            <option value="emergencies">Emergency Calls</option>
          </select>
        </div>
      </div>

      <div className="leaderboard-stats">
        <div className="stat-card">
          <h3>Total Agents</h3>
          <p className="stat-value">{leaderboard.length}</p>
        </div>
        <div className="stat-card">
          <h3>Avg Score</h3>
          <p className="stat-value">
            {(leaderboard.reduce((sum, agent) => sum + agent.overall_score, 0) / leaderboard.length * 100).toFixed(1)}%
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Calls</h3>
          <p className="stat-value">
            {leaderboard.reduce((sum, agent) => sum + (agent.calls_received || 0), 0)}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Emergencies</h3>
          <p className="stat-value">
            {leaderboard.reduce((sum, agent) => sum + (agent.emergencies || 0), 0)}
          </p>
        </div>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Agent Name</th>
              <th>Overall Score</th>
              <th>Calls Received</th>
              <th>Emergencies</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((agent, index) => (
              <tr key={agent.agent_id || agent.name} className="agent-row">
                <td className="rank-cell">
                  <span className="rank-number">{agent.rank || index + 1}</span>
                  {getMedalIcon(index) && (
                    <span className="medal">{getMedalIcon(index)}</span>
                  )}
                </td>
                <td className="agent-name-cell">
                  <span className="agent-name">{agent.name}</span>
                </td>
                <td>
                  <div className="score-cell">
                    <div 
                      className="score-bar" 
                      style={{ 
                        width: `${agent.overall_score * 100}%`,
                        backgroundColor: getScoreColor(agent.overall_score)
                      }}
                    ></div>
                    <span className="score-text">
                      {(agent.overall_score * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="calls-cell">{agent.calls_received || 0}</td>
                <td className="emergency-cell">
                  <span className={`emergency-badge ${agent.emergencies > 0 ? 'has-emergency' : ''}`}>
                    {agent.emergencies || 0}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn"
                    onClick={() => handleAgentClick(agent.name)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
