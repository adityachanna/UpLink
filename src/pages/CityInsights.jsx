import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateCityInsights, getCityData } from '../services/api';
import './CityInsights.css';

// Hardcoded city list
const CITIES = [
  { id: 3, name: 'Bengaluru', state: 'Karnataka' },
  { id: 2, name: 'Gurugram', state: 'Haryana' },
  { id: 6, name: 'Hyderabad', state: 'Telangana' },
  { id: 5, name: 'Jaipur', state: 'Rajasthan' },
  { id: 4, name: 'Lucknow', state: 'Uttar Pradesh' },
  { id: 1, name: 'New Delhi', state: 'Delhi' },
];

const CityInsights = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCityId, setSelectedCityId] = useState(2); // Default to Gurugram
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cityParam = searchParams.get('city');
    if (cityParam) {
      const city = CITIES.find(c => c.name.toLowerCase() === cityParam.toLowerCase());
      if (city) {
        setSelectedCityId(city.id);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    fetchCityData(selectedCityId);
  }, [selectedCityId]);

  const fetchCityData = async (cityId) => {
    try {
      setLoading(true);
      // First generate insights
      await generateCityInsights(cityId);
      // Then fetch city data
      const response = await getCityData(cityId);
      // Handle response structure: response.data contains city_info, metrics, volume, etc.
      setCityData(response.data || response);
    } catch (error) {
      console.error('Error fetching city data:', error);
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e) => {
    const cityId = parseInt(e.target.value);
    setSelectedCityId(cityId);
    const city = CITIES.find(c => c.id === cityId);
    if (city) {
      setSearchParams({ city: city.name });
    }
  };

  if (loading) {
    return (
      <div className="city-insights-container">
        <div className="loading">Loading city data...</div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="city-insights-container">
        <div className="error-message">
          <p>City data not found. Please try another city.</p>
          <div className="city-selector">
            <label>Select City:</label>
            <select value={selectedCityId} onChange={handleCityChange}>
              {CITIES.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  const currentCity = CITIES.find(c => c.id === selectedCityId);

  return (
    <div className="city-insights-container">
      <div className="city-header">
        <div>
          <h1>{cityData.city_info?.name || currentCity?.name} Insights</h1>
          <p className="city-subtitle">{cityData.city_info?.state || currentCity?.state}</p>
        </div>
        
        <div className="city-selector">
          <label>Select City:</label>
          <select value={selectedCityId} onChange={handleCityChange} className="city-dropdown">
            {CITIES.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}, {city.state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="city-metrics-grid stagger-children">
        <div className="metric-card">
          <h3>Avg Quality Score</h3>
          <p className="metric-value">{((cityData.metrics?.avg_quality_score || 0) * 100).toFixed(1)}%</p>
          {/* <span className="metric-trend">{cityData.metrics?.quality_trend || 'N/A'}</span> */}
        </div>
        
        <div className="metric-card">
          <h3>Avg SOP Compliance</h3>
          <p className="metric-value">{((cityData.metrics?.avg_sop_compliance || 0) * 100).toFixed(1)}%</p>
        </div>
        
        <div className="metric-card">
          <h3>Avg Sentiment</h3>
          <p className="metric-value">{(cityData.metrics?.avg_sentiment_score || 0).toFixed(2)}</p>
        </div>
        
        <div className="metric-card">
          <h3 color='blue'>Monthly Calls</h3>
          <p className="metric-value">{cityData.volume?.monthly_volume || 0}</p>
        </div>

        <div className="metric-card">
          <h3>Today's Calls</h3>
          <p className="metric-value">{cityData.volume?.total_calls_today || 0}</p>
        </div>
        
        <div className="metric-card">
          <h3>Emergencies Today</h3>
          <p className="metric-value emergency">{cityData.volume?.total_emergencies_today || 0}</p>
        </div>

        <div className="metric-card">
          <h3>Escalation Rate</h3>
          <p className="metric-value">{((cityData.metrics?.avg_escalation_rate || 0) * 100).toFixed(2)}%</p>
        </div>
      </div>

      <div className="city-content">
        <div className="insights-section">
          <h2>Agent Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Daily Operations</h4>
              <p>{cityData.llm_insights?.daily_ops_insight || 'No insights available'}</p>
            </div>
            <div className="insight-card">
              <h4>Latest Month</h4>
              <p>{cityData.llm_insights?.latest_month_insight || 'No insights available'}</p>
            </div>
            <div className="insight-card">
              <h4>Overall City</h4>
              <p>{cityData.llm_insights?.overall_city_insight || 'No insights available'}</p>
            </div>
            <div className="insight-card">
              <h4>Coaching Focus</h4>
              <p>{cityData.llm_insights?.coaching_focus_for_city || cityData.llm_insights?.coaching_focus || 'No coaching recommendations'}</p>
            </div>
          </div>
        </div>

        <div className="insights-section">
          <h2>Operational Risks</h2>
          <div className="risks-grid">
            {cityData.operational_risks && cityData.operational_risks.length > 0 ? (
              cityData.operational_risks.map((risk, idx) => (
                <div key={idx} className="risk-card">
                  <span className="risk-number">{idx + 1}</span>
                  <span className="risk-text">{risk}</span>
                </div>
              ))
            ) : (
              <p className="no-data">No operational risks reported</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityInsights;
