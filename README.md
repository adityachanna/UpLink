# 🎯 UpLink - Auto-QA System

<div align="center">

**A comprehensive call quality analysis and agent performance management system**

Built for Battery Smart Hackathon 2026

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📖 Overview

**UpLink** is an intelligent Auto-QA system that evaluates 100% of customer support calls in real-time. It provides actionable insights, AI-powered coaching recommendations, and risk-based prioritization to help supervisors improve call quality and agent performance across India.

### 🎯 Key Objectives

- **100% Call Coverage**: Analyze every customer interaction, not just samples
- **Real-time Risk Detection**: Immediately flag high-risk calls for supervisor review
- **AI-Powered Coaching**: Generate specific, actionable improvement suggestions
- **Multi-level Insights**: Comprehensive analytics from agent to city to state level
- **Explainable Scoring**: Transparent SOP-based evaluation system

---

## ✨ Features

### 1. 🗺️ India Risk Map
State-wide quality oversight with intelligent color coding:
- **Red States** (SOP < 15%): Critical issues requiring immediate attention
- **Yellow States** (SOP 15-40%): Warning zone with improvement opportunities
- **Green States** (SOP > 40%): Healthy performance metrics
- Click-through navigation to city-level details
- Top issues breakdown per state
- Call frequency statistics

### 2. 🏆 Leaderboard
Gamified agent performance tracking:
- Real-time agent rankings with medal system (🥇🥈🥉)
- Sortable by score, calls handled, or emergency situations
- Quick access to individual agent profiles
- Visual score bars and sentiment indicators
- Performance comparison metrics

### 3. 🏙️ City Wise Insights
Localized performance analytics:
- Detailed city-level performance breakdowns
- Smart search functionality across all cities
- Top recurring issues identification
- Targeted coaching recommendations
- Agent performance distribution per city

### 4. 📊 Agent Stats
Individual performance deep-dive:
- Comprehensive QA-relevant metrics dashboard
- Performance trend visualization (Recharts)
- Call distribution and pattern analysis
- Search agents by name
- Direct link to Analysis Studio for worst-performing calls

### 5. 🎧 Analysis Studio
AI-powered call analysis workspace:
- Split-screen layout: audio player + synchronized transcript
- SOP verification sidebar with pass/fail indicators
- "What should have been said" AI suggestions
- Poorest performance call highlighting
- Admin feedback submission system
- Real-time transcript auto-scroll sync

### 6. 🚨 Emergency Calls (Recovery Queue)
Real-time high-risk call monitoring:
- Automatic severity classification (Critical/High/Medium)
- 10-second polling for new emergency calls
- Pop-up notifications for critical situations
- Synchronized audio and transcript playback
- Critical moment highlighting in red
- AI-powered resolution recommendations

---

## 🎥 Demo

### Visual Tour

```
Landing Page → Google OAuth → Dashboard
     ↓
India Map → Click State/City → City Insights
     ↓
Leaderboard → Select Agent → Agent Stats
     ↓
Analysis Studio → Play Call → SOP Verification
     ↓
Emergency Queue → Critical Call Alert → Immediate Review
```

### Live Demo Flow
1. **Login** with Google OAuth (Supabase)
2. **Dashboard** shows national overview with color-coded states
3. **Navigate** to any city for localized insights
4. **Review** agent leaderboard and select top/bottom performers
5. **Analyze** individual calls with AI coaching in Analysis Studio
6. **Monitor** emergency queue for real-time critical call alerts

---

## 🚀 Installation

### Prerequisites
- **Node.js** 18+ (with npm)
- **Supabase Account** for authentication
- **Backend API** running at `https://hacksmart-backend.onrender.com`

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/JastejS28/UpLink.git
cd UpLink
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Create .env file in root directory
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

Build output will be in the `dist/` directory.

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2.0** - Modern UI library with latest features
- **Vite 7.2.4** - Lightning-fast build tool and dev server
- **React Router DOM 7.13.0** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Custom CSS** - Separate stylesheets per page for modularity
- **Lucide React 0.563.0** - Beautiful icon library
- **Framer Motion 12.29.2** - Smooth animations

### Data Visualization
- **Recharts 3.7.0** - Composable charting library
- **Chart.js 4.5.1** - Flexible JavaScript charts
- **AmCharts 5.15.5** - Advanced mapping and visualization
- **React ChartJS 2 5.3.1** - React wrapper for Chart.js

### Authentication & Backend
- **Supabase 2.93.3** - Authentication with Google OAuth
- **Axios 1.13.4** - HTTP client for API calls
- **Backend API** - Node.js/Express server at `hacksmart-backend.onrender.com`

### Audio Processing
- **WaveSurfer.js 7.12.1** - Audio waveform visualization
- **@wavesurfer/react 1.0.12** - React integration

### Development Tools
- **ESLint 9.39.1** - Code quality and consistency
- **TypeScript Config** - Type safety (optional)
- **PostCSS 8.5.6** - CSS transformations

---

## 📂 Project Structure

```
UpLink/
├── public/                   # Static assets
├── src/
│   ├── assets/              # Images, fonts, icons
│   ├── components/          # Reusable React components
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── Layout.css       # Layout styles
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   └── Sidebar.css      # Sidebar styles
│   ├── pages/               # Route-based page components
│   │   ├── Landing.jsx      # Login/landing page
│   │   ├── Landing.css
│   │   ├── IndiaMap.jsx     # State-level risk map
│   │   ├── IndiaMap.css
│   │   ├── Leaderboard.jsx  # Agent rankings
│   │   ├── Leaderboard.css
│   │   ├── CityInsights.jsx # City-level analytics
│   │   ├── CityInsights.css
│   │   ├── AgentStats.jsx   # Individual agent metrics
│   │   ├── AgentStats.css
│   │   ├── AnalysisStudio.jsx  # Call analysis interface
│   │   ├── AnalysisStudio.css
│   │   ├── Emergency.jsx    # Emergency call queue
│   │   └── Emergency.css
│   ├── services/
│   │   └── api.js           # Backend API integration
│   ├── utils/
│   │   └── supabase.js      # Supabase configuration
│   ├── App.jsx              # Main app with routing
│   ├── App.css
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── animations.css       # Animation utilities
├── .env.example             # Environment variables template
├── .gitignore
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS theme
├── tsconfig.json            # TypeScript configuration
├── vite.config.js           # Vite build configuration
├── DEMO_GUIDE.md            # Presentation walkthrough
├── IMPLEMENTATION_GUIDE.md  # Technical implementation details
├── PROJECT_COMPLETE.md      # Project completion checklist
├── QUICK_REF.md             # Quick reference guide
└── README_PROJECT.md        # Original project documentation
```

---

## 🔌 API Integration

### Backend Endpoint
```
Base URL: https://hacksmart-backend.onrender.com
```

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/state-qa-data` | GET | Retrieve all state-level QA metrics |
| `/city-qa-data/{city}` | GET | Get city-specific performance data |
| `/leaderboard` | GET | Fetch agent rankings and scores |
| `/agent-performance/{agent}` | GET | Individual agent metrics and trends |
| `/worst-call/{agent}` | GET | Retrieve poorest performance call recording |
| `/emergency-calls` | GET | List of high-risk calls requiring attention |
| `/submit-feedback` | POST | Submit admin feedback for call analysis |

### Example API Call

```javascript
import axios from 'axios';

const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(
      'https://hacksmart-backend.onrender.com/leaderboard'
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
  }
};
```

---

## 🎨 Design System

### Color Palette

Our design follows a clean, professional theme with **no gradients** (solid colors only):

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Green | `#22c55e` | Buttons, success states, healthy metrics |
| Dark Green | `#15803d` | Hover states, accents |
| Light Green | `#dcfce7` | Backgrounds, subtle highlights |
| Beige Background | `#f5f1e8` | Page backgrounds |
| Beige Border | `#d4c4a8` | Card borders, dividers |
| White | `#ffffff` | Card backgrounds, text on dark |
| Alert Red | `#ef4444` | Critical issues, failed SOP checks |
| Warning Yellow | `#eab308` | Warning states, medium severity |

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: 700 weight
- **Body Text**: 400 weight
- **Code**: Monospace

### Layout Principles
- **Sidebar Width**: 280px fixed left navigation
- **Card Border Radius**: 12px for modern feel
- **Button Border Radius**: 6px for clickable elements
- **Padding**: Consistent 24px spacing in containers

---

## 🔐 Authentication

### Supabase Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com/)
   - Create a new project
   - Copy Project URL and Anon Key

2. **Configure OAuth Provider**
   - Navigate to Authentication → Providers
   - Enable Google OAuth
   - Add authorized redirect URLs:
     - `http://localhost:3000`
     - Your production domain

3. **Add Credentials to .env**
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Authentication Flow

```javascript
// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Sign in with Google
const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
};

// Sign out
const signOut = async () => {
  await supabase.auth.signOut();
};
```

---

## 📊 Key Features Deep Dive

### Real-time Emergency Detection

The system polls the emergency endpoint every 10 seconds and displays pop-up notifications for new critical calls:

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    fetchEmergencyCalls();
  }, 10000); // Poll every 10 seconds

  return () => clearInterval(interval);
}, []);
```

### Synchronized Audio Transcript

Analysis Studio features auto-scrolling transcript that syncs with audio playback:

```javascript
const handleTimeUpdate = () => {
  const currentTime = audioRef.current.currentTime;
  // Find matching transcript segment
  // Auto-scroll to current position
};
```

### SOP Verification System

Each call is evaluated against Standard Operating Procedures:
- ✅ **Pass**: Agent followed SOP correctly
- ❌ **Fail**: Agent missed critical step
- 💡 **Suggestion**: AI-generated alternative phrasing

---

## 📈 Performance & Optimization

- **Code Splitting**: React lazy loading for route-based components
- **Optimized Build**: Vite production build with tree-shaking
- **Image Optimization**: Lazy loading for assets
- **API Caching**: Intelligent caching of leaderboard and state data
- **Debounced Search**: Efficient city/agent search with debouncing

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Google OAuth login works
- [ ] Dashboard displays state data with color coding
- [ ] City navigation functions properly
- [ ] Leaderboard sorts by different metrics
- [ ] Agent search returns accurate results
- [ ] Charts render without errors
- [ ] Audio player controls work
- [ ] Transcript syncs with audio playback
- [ ] Feedback submission succeeds with toast notification
- [ ] Emergency polling detects new calls
- [ ] Pop-up notifications appear for critical calls
- [ ] All sidebar navigation links work
- [ ] Logout returns to landing page

### Run Lint Check

```bash
npm run lint
```

---

## 📖 Documentation

This repository includes comprehensive documentation:

- **[README_PROJECT.md](./README_PROJECT.md)** - Original project overview and setup
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Hackathon presentation walkthrough
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Technical implementation details
- **[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)** - Project completion checklist
- **[QUICK_REF.md](./QUICK_REF.md)** - Quick reference for common tasks

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: `npm run dev` fails with port error
```bash
# Solution: Kill process on port 3000
npx kill-port 3000
npm run dev
```

**Issue**: Supabase authentication not working
```bash
# Solution: Verify .env file exists and has correct credentials
cat .env
# Ensure no extra spaces or quotes around values
```

**Issue**: Charts not rendering
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Issue**: API calls returning 404
- Verify backend is running at `https://hacksmart-backend.onrender.com`
- Check browser Network tab for failed requests
- Ensure correct endpoint paths in `src/services/api.js`

---

## 🤝 Contributing

While this is a hackathon project, contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🏆 Hackathon Compliance

### Battery Smart Scoring Criteria

✅ **Practical Scoring Design**: Color-coded SOP-based system with clear thresholds  
✅ **Explainability**: Transparent pass/fail indicators for every SOP check  
✅ **Actionable Insights**: AI-generated specific suggestions, not generic advice  
✅ **Risk Prioritization**: Severity-based emergency queue with real-time monitoring  
✅ **Agent Trust**: Open scoring system that agents can learn from  
✅ **Scalability**: React architecture designed for thousands of daily calls  

---

## 📝 License

This project was built for the Battery Smart Hackathon 2026.

---

## 👤 Author

**Jastej Singh**
- GitHub: [@JastejS28](https://github.com/JastejS28)
- Repository: [UpLink](https://github.com/JastejS28/UpLink)

---

## 🙏 Acknowledgments

- **Battery Smart** for hosting the hackathon
- **Supabase** for authentication infrastructure
- **React Team** for the amazing framework
- **Vite Team** for blazing-fast build tools
- **Tailwind CSS** for rapid styling

---

## 📧 Support

For questions or issues:
1. Check the [Documentation](#-documentation) section
2. Review [Troubleshooting](#-troubleshooting) guide
3. Open an issue on GitHub

---

<div align="center">

**Built with ❤️ for Battery Smart Hackathon 2026**

⭐ Star this repo if you found it useful!

</div>
