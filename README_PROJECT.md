# Auto-QA System - Battery Smart Hackathon

A comprehensive call quality analysis and agent performance management system built for the Battery Smart hackathon.

## Features

### 1. India Risk Map
- State-wise risk visualization with color-coded indicators
- RED: Overall SOP score < 0.15
- YELLOW: SOP score 0.15 - 0.4
- GREEN: SOP score > 0.4
- Top issues per state
- Call frequency statistics
- City navigation within states

### 2. Leaderboard
- Agent ranking by overall score
- Sortable by score, calls received, or emergencies
- Quick access to agent performance details

### 3. City Wise Insights
- Detailed city-level performance metrics
- Search functionality for different cities
- Top issues and coaching recommendations
- Agent performance breakdown

### 4. Agent Stats
- Comprehensive QA-relevant metrics
- Performance trend charts
- Call distribution analytics
- Search by agent name
- Direct link to Analysis Studio

### 5. Analysis Studio
- Audio playback with synchronized transcript
- SOP verification sidebar
- Poorest performance call analysis
- AI-powered coaching suggestions
- Admin feedback submission

### 6. Emergency Calls (Recovery Queue)
- Real-time emergency call monitoring
- Polling for new high-risk calls
- Pop-up notifications for critical calls
- Synchronized audio and transcript playback
- AI recommendations for improvement

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + Custom CSS
- **Charts**: Recharts, AmCharts, Chart.js
- **Authentication**: Supabase (Google OAuth)
- **API Integration**: Axios
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account for authentication

### Installation

1. Clone the repository
```bash
cd HackSmart
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.jsx      # Main layout with sidebar
│   └── Sidebar.jsx     # Navigation sidebar
├── pages/              # Page components
│   ├── Landing.jsx     # Landing page with auth
│   ├── IndiaMap.jsx    # Risk map visualization
│   ├── Leaderboard.jsx # Agent rankings
│   ├── CityInsights.jsx # City-level insights
│   ├── AgentStats.jsx  # Agent performance
│   ├── AnalysisStudio.jsx # Call analysis
│   └── Emergency.jsx   # Emergency calls
├── services/           # API services
│   └── api.js         # Backend API integration
├── utils/             # Utility functions
│   └── supabase.js    # Supabase configuration
└── styles/            # Additional styles

```

## API Integration

The frontend integrates with the backend API at: `https://hacksmart-backend.onrender.com`

### Endpoints Used:
- `/state-qa-data` - State-level metrics
- `/city-qa-data/{city}` - City-specific data
- `/leaderboard` - Agent rankings
- `/agent-performance/{agent}` - Agent metrics
- `/worst-call/{agent}` - Poorest call recording
- `/emergency-calls` - High-risk calls
- `/submit-feedback` - Admin feedback submission

## Color Theme

- **Primary Green**: #22c55e
- **Dark Green**: #15803d
- **Beige**: #f5f1e8, #d4c4a8
- **White**: #ffffff
- **Alert Red**: #ef4444
- **Warning Yellow**: #eab308

No gradients are used - solid colors only as per requirements.

## Key Features Implementation

### Authentication
- Google OAuth via Supabase
- Session management
- Protected routes

### Real-time Updates
- Emergency call polling (10-second interval)
- Pop-up notifications for new critical calls

### Audio Playback
- Synchronized transcript with audio
- Timestamp tracking
- Critical moment highlighting

### Data Visualization
- Recharts for trends and distributions
- Color-coded risk indicators
- Interactive charts and tables

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## License

Built for Battery Smart Hackathon 2026
