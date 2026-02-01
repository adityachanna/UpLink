import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStateData } from '../services/api';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_indiaLow from '@amcharts/amcharts5-geodata/indiaLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import './IndiaMap.css';

const IndiaMap = () => {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topIssues, setTopIssues] = useState([]);
  const [hoveredState, setHoveredState] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const chartRef = useRef(null);
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStateData();
  }, []);

  useEffect(() => {
    if (!loading && stateData.length > 0) {
      initializeMap();
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.dispose();
      }
    };
  }, [stateData, loading]);

  const fetchStateData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getStateData();
      console.log('India Map API Response:', response);
      
      const states = response.data || response.states || (Array.isArray(response) ? response : []);
      setStateData(states);
      
      // Collect top issues from all states
      const issuesMap = {};
      states.forEach(state => {
        if (state.top_issue) {
          issuesMap[state.top_issue] = (issuesMap[state.top_issue] || 0) + 1;
        }
      });
      
      const sortedIssues = Object.entries(issuesMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      setTopIssues(sortedIssues);
    } catch (error) {
      console.error('Error fetching state data:', error);
      setError('Failed to load India map data. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStateColor = (sopScore) => {
    if (sopScore < 0.83) return am5.color(0xef4444); // Red for < 83%
    if (sopScore < 0.85) return am5.color(0xeab308); // Yellow for 83-85%
    return am5.color(0x22c55e); // Green for >= 85%
  };

  const normalizeStateName = (name) => {
    const mapping = {
      'IN-AN': 'Andaman and Nicobar', 'IN-AP': 'Andhra Pradesh', 'IN-AR': 'Arunachal Pradesh',
      'IN-AS': 'Assam', 'IN-BR': 'Bihar', 'IN-CH': 'Chandigarh', 'IN-CT': 'Chhattisgarh',
      'IN-DL': 'Delhi', 'IN-DN': 'Dadra and Nagar Haveli', 'IN-GA': 'Goa', 'IN-GJ': 'Gujarat',
      'IN-HP': 'Himachal Pradesh', 'IN-HR': 'Haryana', 'IN-JH': 'Jharkhand',
      'IN-JK': 'Jammu and Kashmir', 'IN-KA': 'Karnataka', 'IN-KL': 'Kerala', 'IN-LD': 'Lakshadweep',
      'IN-MH': 'Maharashtra', 'IN-ML': 'Meghalaya', 'IN-MN': 'Manipur', 'IN-MP': 'Madhya Pradesh',
      'IN-MZ': 'Mizoram', 'IN-NL': 'Nagaland', 'IN-OR': 'Odisha', 'IN-PB': 'Punjab',
      'IN-PY': 'Puducherry', 'IN-RJ': 'Rajasthan', 'IN-SK': 'Sikkim', 'IN-TG': 'Telangana',
      'IN-TN': 'Tamil Nadu', 'IN-TR': 'Tripura', 'IN-UP': 'Uttar Pradesh', 'IN-UT': 'Uttarakhand',
      'IN-WB': 'West Bengal',
    };
    return mapping[name] || name;
  };

  const initializeMap = () => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, { geoJSON: am5geodata_indiaLow })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '',
      toggleKey: 'active',
      interactive: true,
      strokeWidth: 2,
      stroke: am5.color(0x22c55e),
    });

    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      const dataContext = target.dataItem?.dataContext;
      if (dataContext) {
        const stateName = normalizeStateName(dataContext.id);
        const state = stateData.find(s => 
          s.state && s.state.toLowerCase() === stateName.toLowerCase()
        );
        if (state) {
          const score = state.overall_sop_score || 0;
          return getStateColor(score);
        }
      }
      return am5.color(0x1f1f1f);
    });

    polygonSeries.mapPolygons.template.states.create('hover', {
      fill: am5.color(0x16a34a),
      strokeWidth: 3,
    });

    polygonSeries.mapPolygons.template.events.on('pointerover', (ev) => {
      const dataContext = ev.target.dataItem?.dataContext;
      if (dataContext) {
        const stateCode = dataContext.id;
        const stateName = normalizeStateName(stateCode);
        
        const state = stateData.find(s => 
          s.state && s.state.toLowerCase().trim() === stateName.toLowerCase().trim()
        );
        
        if (state) {
          const rect = chartRef.current.getBoundingClientRect();
          let x = ev.point.x + rect.left + 20;
          let y = ev.point.y + rect.top + 20;
          
          // Keep card within viewport
          const cardWidth = 320;
          const cardHeight = 300;
          
          if (x + cardWidth > window.innerWidth) {
            x = ev.point.x + rect.left - cardWidth - 20;
          }
          if (y + cardHeight > window.innerHeight) {
            y = window.innerHeight - cardHeight - 20;
          }
          
          setHoverPosition({ x, y });
          setHoveredState(state);
        }
      }
    });

    polygonSeries.mapPolygons.template.events.on('pointerout', () => {
      setHoveredState(null);
    });

    polygonSeries.mapPolygons.template.events.on('click', (ev) => {
      const dataContext = ev.target.dataItem?.dataContext;
      if (dataContext) {
        const stateName = normalizeStateName(dataContext.id);
        const state = stateData.find(s => 
          s.state && s.state.toLowerCase() === stateName.toLowerCase()
        );
        if (state && state.cities && state.cities.length > 0) {
          const firstCity = state.cities[0];
          navigate(`/city-insights?city=${firstCity.name}`);
        }
      }
    });

    polygonSeries.appear(1000, 100);
  };

  const handleCityClick = (city) => {
    const cityName = typeof city === 'string' ? city : city.name;
    navigate(`/city-insights?city=${cityName}`);
  };

  if (loading) {
    return (
      <div className="india-map-container">
        <div className="loading">Loading India map data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="india-map-container">
        <div className="error-message">
          <h2>Unable to Load Map</h2>
          <p>{error}</p>
          <button onClick={fetchStateData} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="india-map-container">
      <div className="map-header">
        <h1>India Risk Map</h1>
        <p className="map-subtitle">Interactive state-wise QA analysis • Hover over states for details</p>
      </div>

      <div className="map-content">
        <div className="map-section">
          <div ref={chartRef} className="amcharts-map"></div>
          <div className="map-legend">
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#22c55e' }}></div>
              <span>Excellent (≥ 85%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#eab308' }}></div>
              <span>Good (83-85%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
              <span>Needs Improvement (&lt; 83%)</span>
            </div>
          </div>
        </div>

        <div className="info-sidebar">
          <div className="info-card">
            <h3>Top Issues Nationwide</h3>
            <div className="issues-list">
              {topIssues.map(([issue, count], idx) => (
                <div key={idx} className="issue-item">
                  <span className="issue-name">{issue}</span>
                  <span className="issue-count">{count} states</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="info-card">
            <h3>Overall Statistics</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span className="stat-label">Total States</span>
                <span className="stat-value">{stateData.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg SOP Score</span>
                <span className="stat-value">
                  {stateData.length > 0 
                    ? (stateData.reduce((sum, state) => sum + (state.overall_sop_score || 0), 0) / stateData.length * 100).toFixed(1)
                    : 0}%
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Call Volume</span>
                <span className="stat-value">
                  {stateData.reduce((sum, state) => sum + (state.total_call_volume_pct || 0), 0).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating State Detail Card on Hover */}
      {hoveredState && (
        <div 
          className="state-hover-card"
          style={{
            left: `${hoverPosition.x + 20}px`,
            top: `${hoverPosition.y + 20}px`,
          }}
        >
          <div className="hover-card-header">
            <h3>{hoveredState.state}</h3>
            <span className={`risk-badge ${getStateRiskLevel(hoveredState).toLowerCase().replace(' ', '-')}`}>
              {getStateRiskLevel(hoveredState)}
            </span>
          </div>
          
          <div className="hover-card-metrics">
            <div className="metric">
              <span className="metric-label">SOP Score</span>
              <span className="metric-value">
                {((hoveredState.overall_sop_score || 0) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Call Volume</span>
              <span className="metric-value">
                {(hoveredState.total_call_volume_pct || 0).toFixed(1)}%
              </span>
            </div>
          </div>
          
          {hoveredState.top_issue && (
            <div className="hover-card-issue">
              <span className="issue-label">Top Issue:</span>
              <p>{hoveredState.top_issue}</p>
            </div>
          )}
          
          {hoveredState.cities && hoveredState.cities.length > 0 && (
            <div className="hover-card-cities">
              <span className="cities-label">Cities:</span>
              <div className="cities-tags">
                {hoveredState.cities.map((city, idx) => (
                  <button 
                    key={idx} 
                    className="city-tag"
                    onClick={() => handleCityClick(city)}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const getStateCardColor = (state) => {
  const score = state.overall_sop_score || 0;
  if (score < 0.83) return '#ef4444'; // Red
  if (score < 0.85) return '#eab308'; // Yellow
  return '#22c55e'; // Green
};

const getStateRiskLevel = (state) => {
  const score = state.overall_sop_score || 0;
  if (score < 0.83) return 'Needs Improvement';
  if (score < 0.85) return 'Good';
  return 'Excellent';
};

export default IndiaMap;
