# Auto-QA System - Implementation Guide

## ✅ Completed Implementation

All 6 major features have been successfully implemented:

### 1. India Risk Map ✓
**Location**: `/dashboard`
**Features**:
- Color-coded state cards (Red < 0.15, Yellow 0.15-0.4, Green > 0.4)
- Top issues per state
- Call statistics
- City navigation buttons
- Overall statistics sidebar
**Files**: `src/pages/IndiaMap.jsx`, `src/pages/IndiaMap.css`

### 2. Leaderboard ✓
**Location**: `/leaderboard`
**Features**:
- Agent ranking table with medals
- Sortable by overall score, calls, emergencies
- Visual score bars
- Sentiment indicators
- Click agent name to view details
**Files**: `src/pages/Leaderboard.jsx`, `src/pages/Leaderboard.css`

### 3. City Wise Insights ✓
**Location**: `/city-insights`
**Features**:
- Default shows Gurgaon data
- Search bar for other cities
- Metrics: total calls, SOP score, sentiment, emergencies
- Top issues list
- Coaching recommendations
- Agent performance table
**Files**: `src/pages/CityInsights.jsx`, `src/pages/CityInsights.css`

### 4. Agent Stats ✓
**Location**: `/agent`
**Features**:
- Search by agent name
- QA-relevant metrics dashboard
- Performance trend charts (Recharts)
- Call distribution bar charts
- Coaching insights
- Link to Analysis Studio
**Files**: `src/pages/AgentStats.jsx`, `src/pages/AgentStats.css`

### 5. Analysis Studio ✓
**Location**: `/analysis`
**Features**:
- Split view layout
- Left panel: Audio player + synchronized transcript
- Right panel: SOP verification sidebar
- Shows poorest performance call (past week)
- AI coaching suggestions
- Admin feedback form with toast notification
- Auto-scrolling transcript highlights
- Critical moment indicators (red text)
**Files**: `src/pages/AnalysisStudio.jsx`, `src/pages/AnalysisStudio.css`

### 6. Emergency Calls (Recovery Queue) ✓
**Location**: `/emergency`
**Features**:
- List of high-risk/angry calls
- Real-time polling (10-second intervals)
- Pop-up notification for new emergencies
- Severity badges (Critical, High, Medium)
- Click to view full details
- Synchronized audio + transcript playback
- AI suggestions for critical moments
- Red-colored critical transcript items
**Files**: `src/pages/Emergency.jsx`, `src/pages/Emergency.css`

## 🎨 Design Implementation

### Color Scheme (No Gradients)
- Primary Green: `#22c55e`
- Dark Green: `#15803d`
- Beige Background: `#f5f1e8`
- Beige Accent: `#d4c4a8`
- White: `#ffffff`
- Alert Red: `#ef4444`
- Warning Yellow: `#eab308`

### Layout
- Left sidebar navigation (280px fixed)
- Main content area with padding
- Responsive grid layouts
- Card-based design system

## 📁 Project Structure

```
HackSmart/
├── src/
│   ├── components/
│   │   ├── Layout.jsx & .css          # Main layout wrapper
│   │   └── Sidebar.jsx & .css         # Navigation sidebar
│   ├── pages/
│   │   ├── Landing.jsx & .css         # Auth landing page
│   │   ├── IndiaMap.jsx & .css        # Risk map
│   │   ├── Leaderboard.jsx & .css     # Agent rankings
│   │   ├── CityInsights.jsx & .css    # City data
│   │   ├── AgentStats.jsx & .css      # Agent metrics
│   │   ├── AnalysisStudio.jsx & .css  # Call analysis
│   │   └── Emergency.jsx & .css       # Emergency queue
│   ├── services/
│   │   └── api.js                     # API integration
│   ├── utils/
│   │   └── supabase.js                # Auth config
│   ├── App.jsx                        # Main app with routing
│   └── index.css                      # Global styles
├── public/                            # Static assets
├── .env                              # Environment variables
├── .env.example                      # Template
├── package.json                      # Dependencies
├── vite.config.js                    # Vite config (port 3000)
├── tailwind.config.js                # Tailwind config
└── README_PROJECT.md                 # Documentation
```

## 🔌 API Integration

All API calls are centralized in `src/services/api.js`

### Endpoints:
1. `GET /state-qa-data` - State metrics
2. `GET /city-qa-data/{cityName}` - City metrics
3. `GET /leaderboard` - Agent rankings
4. `GET /agent-performance/{agentName}` - Agent data
5. `GET /worst-call/{agentName}` - Poorest call
6. `GET /emergency-calls` - High-risk calls
7. `POST /submit-feedback` - Admin feedback

## 🔐 Authentication

**Supabase Google OAuth**
- Landing page with Google Sign-in button
- Session management
- Protected routes (redirects to `/` if not authenticated)
- Logout button in sidebar

### Setup:
1. Create Supabase project
2. Enable Google OAuth provider
3. Add credentials to `.env`:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

## 🚀 Running the Project

### Development:
```bash
npm run dev
```
Runs on: `http://localhost:3000`

### Build:
```bash
npm run build
```

### Preview Production:
```bash
npm run preview
```

## 📊 Chart Libraries Used

- **Recharts**: Line charts (performance trends) and bar charts (call distribution)
- **Chart.js**: Available for future enhancements
- **AmCharts**: Installed, can be used for advanced visualizations

## 🎯 Key Features

### Real-time Updates
- Emergency calls poll every 10 seconds
- New emergency pop-up notifications
- Live audio synchronization with transcripts

### Audio Playback
- HTML5 audio element
- Custom controls with play/pause
- Progress bar
- Timestamp display
- Auto-scroll transcript to current position

### Navigation
- React Router DOM
- Protected routes
- URL query parameters for search
- Direct navigation between features

### Data Visualization
- Color-coded risk indicators
- Progress bars for scores
- Trend indicators (up/down arrows)
- Interactive tables and cards

## 📝 Notes for Development

### Adding New Pages:
1. Create component in `src/pages/`
2. Create corresponding CSS file
3. Add route in `src/App.jsx`
4. Add navigation item in `src/components/Sidebar.jsx`

### API Error Handling:
- Try-catch blocks in all API calls
- Console error logging
- User-friendly error messages
- Loading states

### Styling Guidelines:
- Separate CSS file for each page/component
- Use Tailwind utility classes where appropriate
- Maintain color scheme consistency
- No gradients (solid colors only)
- Responsive design with flexbox/grid

## 🐛 Troubleshooting

### If dependencies fail:
```bash
rm -rf node_modules package-lock.json
npm install
```

### If Supabase auth fails:
- Check `.env` file exists and has correct values
- Verify Supabase project is active
- Check Google OAuth is enabled in Supabase dashboard
- Ensure redirect URLs are configured

### If API calls fail:
- Verify backend API is running
- Check network tab in browser dev tools
- Ensure CORS is enabled on backend
- Verify API endpoints match documentation

## 🔄 Next Steps / Enhancements

1. Add error boundaries for better error handling
2. Implement data caching for performance
3. Add loading skeletons instead of simple loaders
4. Enhance mobile responsiveness
5. Add unit tests
6. Implement WebSocket for real-time updates instead of polling
7. Add export functionality for reports
8. Implement advanced filtering and search
9. Add user preferences/settings
10. Create admin dashboard for system configuration

## 📖 API Documentation

Full API documentation available at:
`https://hacksmart-backend.onrender.com/docs`

## 🎓 Learning Resources

- React Router: https://reactrouter.com/
- Recharts: https://recharts.org/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Tailwind CSS: https://tailwindcss.com/docs

---

**Built with ❤️ for Battery Smart Hackathon 2026**
