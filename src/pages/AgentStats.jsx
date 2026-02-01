import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateAgentInsights, getAgentStats } from '../services/api';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './AgentStats.css';

// Hardcoded agent list
const AGENTS = [
  { rank: 1, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789001", name: "Khushboo 1", overall_score: 0.945, calls_received: 620, emergencies: 2 },
  { rank: 2, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789005", name: "Jyoti Rani", overall_score: 0.93, calls_received: 540, emergencies: 3 },
  { rank: 3, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789002", name: "Aniket Solanki", overall_score: 0.912, calls_received: 590, emergencies: 4 },
  { rank: 4, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789009", name: "Varsha Swain", overall_score: 0.905, calls_received: 560, emergencies: 4 },
  { rank: 5, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789004", name: "Prateeksha", overall_score: 0.855, calls_received: 510, emergencies: 5 },
  { rank: 6, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789003", name: "Prakhar Pandey", overall_score: 0.82, calls_received: 480, emergencies: 8 },
  { rank: 7, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789006", name: "Kumkum Sisodiya", overall_score: 0.81, calls_received: 430, emergencies: 7 },
  { rank: 8, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789010", name: "Deepa Upadhyay", overall_score: 0.795, calls_received: 390, emergencies: 5 },
  { rank: 9, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789008", name: "Rocky Pandey", overall_score: 0.76, calls_received: 400, emergencies: 6 },
  { rank: 10, agent_id: "6f8e4d3a-1b2c-4e5f-8a9d-123456789007", name: "Vikas", overall_score: 0.64, calls_received: 310, emergencies: 14 }
];

const AgentStats = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAgentId, setSelectedAgentId] = useState("6f8e4d3a-1b2c-4e5f-8a9d-123456789005"); // Default to Jyoti Rani
  const [agentData, setAgentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const agentParam = searchParams.get('agent');
    if (agentParam) {
      const agent = AGENTS.find(a => a.name.toLowerCase() === agentParam.toLowerCase());
      if (agent) {
        setSelectedAgentId(agent.agent_id);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAgentData(selectedAgentId);
  }, [selectedAgentId]);

  const fetchAgentData = async (agentId) => {
    try {
      setLoading(true);
      // First generate insights
      await generateAgentInsights(agentId);
      // Then fetch stats
      const response = await getAgentStats(agentId);
      setAgentData(response.data || response);
    } catch (error) {
      console.error('Error fetching agent data:', error);
      setAgentData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentChange = (e) => {
    const agentId = e.target.value;
    setSelectedAgentId(agentId);
    const agent = AGENTS.find(a => a.agent_id === agentId);
    if (agent) {
      setSearchParams({ agent: agent.name });
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUpIcon className="trend-icon trend-up" />;
    if (trend === 'down') return <TrendingDownIcon className="trend-icon trend-down" />;
    return <MinusIcon className="trend-icon trend-stable" />;
  };

  if (loading) {
    return (
      <div className="agent-stats-container">
        <div className="loading">Loading agent data...</div>
      </div>
    );
  }

  if (!agentData) {
    return (
      <div className="agent-stats-container">
        <div className="error-message">
          <p>Agent data not found. Please try another agent.</p>
          <div className="agent-selector">
            <label>Select Agent:</label>
            <select value={selectedAgentId} onChange={handleAgentChange}>
              {AGENTS.map(agent => (
                <option key={agent.agent_id} value={agent.agent_id}>
                  {agent.name} (Rank #{agent.rank})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  const currentAgent = AGENTS.find(a => a.agent_id === selectedAgentId);
  const profile = agentData.agent_profile || {};
  const currentStats = agentData.current_stats || {};
  const history = agentData.history_comparison || {};
  const trends = agentData.trend_data || [];
  const insights = agentData.llm_insights || {};

  return (
    <div className="agent-stats-container">
      <div className="agent-header">
        <div>
          <h1>{profile.name || currentAgent?.name}</h1>
          <p className="agent-subtitle">
            {profile.employee_id} • {profile.languages?.join(', ') || 'N/A'}
          </p>
        </div>
        
        <div className="agent-selector">
          <label>Select Agent:</label>
          <select value={selectedAgentId} onChange={handleAgentChange} className="agent-dropdown">
            {AGENTS.map(agent => (
              <option key={agent.agent_id} value={agent.agent_id}>
                {agent.name} (Rank #{agent.rank})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card primary">
          <h3>Quality Score</h3>
          <p className="metric-value">{((currentStats.quality_score || 0) * 100).toFixed(1)}%</p>
          {trends.find(t => t.metric === 'quality_score') && (
            <div className="trend-indicator">
              {getTrendIcon(trends.find(t => t.metric === 'quality_score').trend)}
              <span className="trend-text">
                {trends.find(t => t.metric === 'quality_score').trend}
              </span>
            </div>
          )}
        </div>
        
        <div className="metric-card">
          <h3>SOP Compliance</h3>
          <p className="metric-value">{((currentStats.sop_compliance || 0) * 100).toFixed(1)}%</p>
          {trends.find(t => t.metric === 'sop_compliance') && (
            <div className="trend-indicator">
              {getTrendIcon(trends.find(t => t.metric === 'sop_compliance').trend)}
            </div>
          )}
        </div>
        
        <div className="metric-card">
          <h3>Sentiment Score</h3>
          <p className="metric-value">{((currentStats.sentiment_stabilization || 0) * 100).toFixed(0)}%</p>
          {trends.find(t => t.metric === 'sentiment_stabilization') && (
            <div className="trend-indicator">
              {getTrendIcon(trends.find(t => t.metric === 'sentiment_stabilization').trend)}
            </div>
          )}
        </div>
        
        <div className="metric-card">
          <h3>Escalation Rate</h3>
          <p className="metric-value">{((currentStats.escalation_rate || 0) * 100).toFixed(2)}%</p>
          {trends.find(t => t.metric === 'escalation_rate') && (
            <div className="trend-indicator">
              {getTrendIcon(trends.find(t => t.metric === 'escalation_rate').trend)}
            </div>
          )}
        </div>

        <div className="metric-card">
          <h3>Calls Today</h3>
          <p className="metric-value">{currentStats.calls_handled_today || 0}</p>
        </div>
        
        <div className="metric-card alert">
          <h3>Emergencies Today</h3>
          <p className="metric-value emergency">{currentStats.emergencies_today || 0}</p>
        </div>
      </div>

      <div className="comparison-section">
        <h2>Month-over-Month Comparison</h2>
        <div className="comparison-grid">
          <div className="comparison-card">
            <h4>Quality Score</h4>
            <div className="comparison-values">
              <div className="current-value">
                <span className="label">Current </span>
                <span className="value">{((currentStats.quality_score || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="prev-value">
                <span className="label">Previous</span>
                <span className="value">{((history.prev_month_quality || 0) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <h4>SOP Compliance</h4>
            <div className="comparison-values">
              <div className="current-value">
                <span className="label">Current </span>
                <span className="value">{((currentStats.sop_compliance || 0) * 100).toFixed(1)}%</span>
              </div>
              <div className="prev-value">
                <span className="label">Previous</span>
                <span className="value">{((history.prev_month_sop || 0) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <h4>Sentiment</h4>
            <div className="comparison-values">
              <div className="current-value">
                <span className="label">Current </span>
                <span className="value">{((currentStats.sentiment_stabilization || 0) * 100).toFixed(0)}%</span>
              </div>
              <div className="prev-value">
                <span className="label">Previous</span>
                <span className="value">{((history.prev_month_sentiment || 0) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          <div className="comparison-card">
            <h4>Escalation Rate</h4>
            <div className="comparison-values">
              <div className="current-value">
                <span className="label">Current </span>
                <span className="value">{((currentStats.escalation_rate || 0) * 100).toFixed(2)}%</span>
              </div>
              <div className="prev-value">
                <span className="label">Previous</span>
                <span className="value">{((history.prev_month_escalation || 0) * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="insights-section">
        <h2>Agent Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Overall Performance</h4>
            <p>{insights.overall_insight_text || 'No insights available'}</p>
          </div>
          
          {insights.latest_month_insight && (
            <div className="insight-card">
              <h4>Latest Month Insight</h4>
              <p>{insights.latest_month_insight}</p>
            </div>
          )}
          
          {insights.latest_change_summary && (
            <div className="insight-card">
              <h4>Recent Changes</h4>
              <p>{insights.latest_change_summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentStats;
