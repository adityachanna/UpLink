import React, { useState } from 'react';
import './IndiaMapSVG.css';

const IndiaMapSVG = ({ stateData, onStateClick }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Get state data by name
  const getStateInfo = (stateName) => {
    return stateData?.find(s => 
      s.state_name?.toLowerCase() === stateName.toLowerCase() ||
      s.state?.toLowerCase() === stateName.toLowerCase()
    );
  };

  // Get color based on SOP score
  const getStateColor = (stateName) => {
    const state = getStateInfo(stateName);
    if (!state) return '#e5e7eb'; // Default gray
    
    const score = state.avg_sop_score || state.sop_score || 0;
    if (score < 0.15) return '#ef4444'; // Red - High Risk
    if (score < 0.4) return '#eab308'; // Yellow - Medium Risk
    return '#22c55e'; // Green - Healthy
  };

  const handleMouseEnter = (stateName, event) => {
    const state = getStateInfo(stateName);
    if (state) {
      setHoveredState(state);
      updateTooltipPosition(event);
    }
  };

  const handleMouseMove = (event) => {
    if (hoveredState) {
      updateTooltipPosition(event);
    }
  };

  const updateTooltipPosition = (event) => {
    const svg = event.currentTarget.closest('svg');
    const rect = svg.getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const handleClick = (stateName) => {
    const state = getStateInfo(stateName);
    if (state && onStateClick) {
      onStateClick(state);
    }
  };

  // India map paths with state names
  const states = {
    'Jammu and Kashmir': 'M250,50 L280,45 L310,50 L320,70 L315,90 L290,95 L270,90 L255,75 Z',
    'Himachal Pradesh': 'M290,95 L315,90 L330,100 L325,115 L305,120 L285,110 Z',
    'Punjab': 'M270,90 L290,95 L285,110 L275,115 L260,110 L265,95 Z',
    'Haryana': 'M275,115 L285,110 L295,120 L290,135 L275,140 L270,125 Z',
    'Delhi': 'M285,125 L290,125 L290,130 L285,130 Z',
    'Uttarakhand': 'M305,120 L325,115 L340,125 L335,140 L315,145 L300,135 Z',
    'Uttar Pradesh': 'M290,135 L315,145 L335,140 L360,150 L380,165 L385,180 L370,190 L340,185 L310,180 L285,175 L275,160 L280,145 Z',
    'Rajasthan': 'M260,110 L275,115 L280,145 L275,160 L270,180 L250,200 L230,195 L220,175 L225,150 L240,125 Z',
    'Gujarat': 'M220,175 L230,195 L225,220 L210,245 L190,250 L175,235 L180,210 L195,190 Z',
    'Madhya Pradesh': 'M250,200 L270,180 L285,175 L310,180 L330,185 L345,195 L350,215 L340,235 L315,240 L285,235 L265,225 L245,215 Z',
    'Maharashtra': 'M210,245 L240,235 L265,225 L285,235 L295,255 L285,280 L260,290 L235,285 L215,270 Z',
    'Goa': 'M215,270 L225,270 L225,280 L215,280 Z',
    'Karnataka': 'M235,285 L260,290 L270,310 L265,335 L245,345 L225,340 L220,320 L225,300 Z',
    'Kerala': 'M220,320 L225,340 L220,365 L205,375 L195,365 L200,340 L210,325 Z',
    'Tamil Nadu': 'M245,345 L265,335 L280,345 L285,365 L275,385 L255,390 L235,385 L230,365 L235,350 Z',
    'Andhra Pradesh': 'M270,310 L295,305 L315,315 L320,335 L310,355 L285,365 L280,345 L275,325 Z',
    'Telangana': 'M285,280 L295,255 L310,260 L315,280 L310,295 L295,305 L285,295 Z',
    'Odisha': 'M340,235 L360,240 L380,255 L385,275 L375,295 L355,300 L335,290 L330,270 L335,250 Z',
    'Chhattisgarh': 'M315,240 L340,235 L355,245 L360,265 L350,285 L330,290 L315,280 L310,260 L315,250 Z',
    'Jharkhand': 'M370,190 L385,180 L405,190 L410,210 L400,230 L380,235 L365,225 L365,205 Z',
    'Bihar': 'M340,185 L370,190 L385,180 L410,185 L425,195 L420,210 L405,215 L385,210 L365,205 L350,200 Z',
    'West Bengal': 'M400,230 L410,210 L430,220 L445,235 L445,255 L435,270 L415,265 L405,250 Z',
    'Sikkim': 'M425,195 L435,195 L435,205 L425,205 Z',
    'Assam': 'M445,235 L465,235 L485,245 L490,260 L480,275 L455,275 L445,260 Z',
    'Meghalaya': 'M445,255 L455,255 L455,265 L445,265 Z',
    'Tripura': 'M455,275 L465,275 L465,290 L455,290 Z',
    'Mizoram': 'M455,290 L465,290 L465,305 L455,305 Z',
    'Manipur': 'M480,275 L495,275 L495,290 L480,290 Z',
    'Nagaland': 'M485,245 L500,245 L500,260 L485,260 Z',
    'Arunachal Pradesh': 'M465,215 L500,210 L520,225 L515,245 L500,250 L485,240 L470,230 Z',
  };

  return (
    <div className="india-map-svg-container">
      <svg
        viewBox="0 0 600 450"
        xmlns="http://www.w3.org/2000/svg"
        className="india-map-svg"
        onMouseMove={handleMouseMove}
      >
        {/* Map background */}
        <rect width="600" height="450" fill="#f5f1e8" />
        
        {/* State paths */}
        {Object.entries(states).map(([stateName, pathData]) => (
          <path
            key={stateName}
            d={pathData}
            fill={getStateColor(stateName)}
            stroke="#ffffff"
            strokeWidth="2"
            className="state-path"
            onMouseEnter={(e) => handleMouseEnter(stateName, e)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(stateName)}
          />
        ))}

        {/* Tooltip */}
        {hoveredState && (
          <g transform={`translate(${tooltipPosition.x + 15}, ${tooltipPosition.y - 60})`}>
            <rect
              x="0"
              y="0"
              width="220"
              height="90"
              rx="8"
              fill="white"
              stroke="#d4c4a8"
              strokeWidth="2"
              filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))"
            />
            <text x="10" y="20" fontSize="14" fontWeight="bold" fill="#15803d">
              {hoveredState.state_name || hoveredState.state}
            </text>
            <text x="10" y="40" fontSize="12" fill="#666">
              SOP Score: {((hoveredState.avg_sop_score || hoveredState.sop_score || 0) * 100).toFixed(1)}%
            </text>
            <text x="10" y="60" fontSize="12" fill="#666">
              Total Calls: {hoveredState.total_calls || 0}
            </text>
            <text x="10" y="80" fontSize="12" fill="#666">
              Sentiment: {(hoveredState.avg_sentiment || hoveredState.sentiment || 0).toFixed(2)}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="map-legend-svg">
        <div className="legend-item-svg">
          <div className="legend-color-svg" style={{ backgroundColor: '#22c55e' }}></div>
          <span>Healthy (SOP &gt; 0.4)</span>
        </div>
        <div className="legend-item-svg">
          <div className="legend-color-svg" style={{ backgroundColor: '#eab308' }}></div>
          <span>Medium Risk (0.15 - 0.4)</span>
        </div>
        <div className="legend-item-svg">
          <div className="legend-color-svg" style={{ backgroundColor: '#ef4444' }}></div>
          <span>High Risk (&lt; 0.15)</span>
        </div>
      </div>
    </div>
  );
};

export default IndiaMapSVG;
