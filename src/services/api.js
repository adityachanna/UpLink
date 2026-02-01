import axios from 'axios';

// Use proxy in development to avoid CORS issues
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://hacksmartb-698063521469.asia-south1.run.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// India Map & State Data
export const getStateData = async () => {
  try {
    const response = await api.get('/dashboard/india-map');
    return response.data;
  } catch (error) {
    console.error('Error fetching state data:', error);
    throw error;
  }
};

// City Data
export const getCityData = async (cityId) => {
  try {
    const response = await api.get(`/cities/${cityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error;
  }
};

// Generate City Insights
export const generateCityInsights = async (cityId) => {
  try {
    const response = await api.post(`/cities/${cityId}/generate-insights`);
    return response.data;
  } catch (error) {
    console.error('Error generating city insights:', error);
    throw error;
  }
};

// Leaderboard
export const getLeaderboard = async () => {
  try {
    const response = await api.get('/agents/leaderboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};

// Agent Performance
export const getAgentPerformance = async (agentName) => {
  try {
    const response = await api.get(`/agent-performance/${agentName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent performance:', error);
    throw error;
  }
};

// Generate Agent Insights
export const generateAgentInsights = async (agentId) => {
  try {
    const response = await api.post(`/agents/${agentId}/generate-insights`);
    return response.data;
  } catch (error) {
    console.error('Error generating agent insights:', error);
    throw error;
  }
};

// Get Agent Stats
export const getAgentStats = async (agentId) => {
  try {
    const response = await api.get(`/agents/${agentId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent performance:', error);
    throw error;
  }
};

// Worst Performing Call
export const getWorstCall = async (agentName) => {
  try {
    const response = await api.get(`/worst-call/${agentName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching worst call:', error);
    throw error;
  }
};

// Emergency Calls
export const getEmergencyCalls = async () => {
  try {
    const response = await api.get('/emergency-calls');
    return response.data;
  } catch (error) {
    console.error('Error fetching emergency calls:', error);
    throw error;
  }
};

// Submit Feedback
export const submitFeedback = async (agentName, callId, feedback) => {
  try {
    const response = await api.post('/submit-feedback', {
      agent_name: agentName,
      call_id: callId,
      feedback: feedback,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Get Escalations
export const getEscalations = async () => {
  try {
    const response = await api.get('/escalations/monitor');
    return response.data;
  } catch (error) {
    console.error('Error fetching escalations:', error);
    throw error;
  }
};

export default api;
