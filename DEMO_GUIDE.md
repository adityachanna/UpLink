# Quick Start Guide - Auto-QA System Demo

## 🚀 Getting Started (5 Minutes)

### Step 1: Setup Environment
```bash
# Navigate to project
cd HackSmart

# Create .env file with your Supabase credentials
echo VITE_SUPABASE_URL=your_url_here > .env
echo VITE_SUPABASE_ANON_KEY=your_key_here >> .env
```

### Step 2: Install & Run
```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**App will be live at: http://localhost:3000**

---

## 🎯 Demo Walkthrough

### 1. Landing Page (/)
- **What to show**: Clean landing page with 4 feature cards
- **Action**: Click "Sign in with Google"
- **Result**: Redirects to `/dashboard` after authentication

### 2. India Risk Map (/dashboard)
- **What to show**:
  - Color-coded state cards (Red/Yellow/Green based on SOP scores)
  - Click on city names within states
  - Top issues sidebar
  - Overall statistics
- **Key Feature**: "Visual risk assessment across India"

### 3. Leaderboard (/leaderboard)
- **What to show**:
  - Agent rankings with medals (🥇🥈🥉)
  - Sort by different metrics
  - Click "View Details" on any agent
- **Key Feature**: "Performance tracking and comparison"

### 4. City Insights (/city-insights)
- **What to show**:
  - Default Gurgaon data
  - Use search bar to find other cities
  - Top issues and coaching recommendations
- **Key Feature**: "Localized insights for targeted improvement"

### 5. Agent Stats (/agent)
- **What to show**:
  - Search for an agent
  - Performance charts and trends
  - Click "View Analysis Studio"
- **Key Feature**: "Individual performance analytics"

### 6. Analysis Studio (/analysis)
- **What to show**:
  - Split-screen layout
  - Play audio and watch transcript auto-scroll
  - SOP verification checks (passed/failed)
  - AI coaching suggestions
  - Submit admin feedback
- **Key Feature**: "Deep dive into call quality with AI assistance"

### 7. Emergency Calls (/emergency)
- **What to show**:
  - List of high-risk calls
  - Click on a call to see details
  - Play audio with synchronized transcript
  - Red-highlighted critical moments
  - AI suggestions
- **Key Feature**: "Real-time emergency detection and response"
- **Pro Tip**: Mention the 10-second polling and pop-up notifications

---

## 🎨 Design Highlights

### Color Coding System
- **Green**: Healthy performance (SOP > 40%)
- **Yellow**: Warning zone (SOP 15-40%)
- **Red**: Critical issues (SOP < 15%)

### Theme
- Clean, professional design
- Green, beige, white color scheme
- No gradients (solid colors only)
- Consistent card-based layout

---

## 💡 Key Selling Points

1. **100% Call Coverage**: Every call is analyzed
2. **Real-time Risk Detection**: Immediate flagging of emergencies
3. **AI-Powered Coaching**: Actionable suggestions, not generic advice
4. **Multi-level Insights**: Agent → City → State analysis
5. **Explainable Scoring**: Clear SOP checks with pass/fail indicators
6. **Synchronized Playback**: Audio + transcript for precise review

---

## 🎤 Presentation Script

### Opening (30 seconds)
"We built an Auto-QA system that evaluates 100% of Battery Smart's customer support calls. It provides real-time risk detection, AI-powered coaching, and multi-level insights from agent to state level."

### Demo Flow (3-4 minutes)

**India Map**: "Here's our national overview. States are color-coded by SOP compliance. Red means critical issues, yellow is warning zone, green is healthy. We can drill down to any city."

**Leaderboard**: "All agents ranked by performance. Notice the medals for top performers. We can sort by various metrics and dive into individual profiles."

**Agent Stats**: "For any agent, we see comprehensive QA metrics, performance trends, and can jump into their worst call for coaching."

**Analysis Studio**: "This is where coaching happens. Left side - audio with synchronized transcript. Right side - SOP verification showing exactly what was said vs what should have been said. AI suggests improvements, and admins can add feedback."

**Emergency Calls**: "High-risk calls are automatically detected and flagged. System polls every 10 seconds. When a critical call comes in, supervisors get a pop-up notification for immediate review."

### Closing (30 seconds)
"This system scales to handle thousands of calls daily, provides explainable AI insights, and empowers supervisors to take immediate action on high-risk situations."

---

## ⚡ Technical Highlights

- **Frontend**: React 19 + Vite
- **Performance**: Port 3000, optimized build
- **Authentication**: Supabase Google OAuth
- **Real-time**: Polling with pop-up notifications
- **Charts**: Recharts for visualizations
- **API**: Clean integration with backend

---

## 📊 Sample Test Data

If backend is running, you should see:
- Multiple states with varying SOP scores
- Agent leaderboard with ~10-20 agents
- City data for major Indian cities
- Emergency calls flagged by severity
- Audio URLs and transcripts

---

## 🐛 Demo Day Troubleshooting

### If login fails:
- Use mock bypass (comment out auth check in App.jsx temporarily)
- Or ensure Supabase project is active

### If API calls fail:
- Check backend is running at https://hacksmart-backend.onrender.com
- Use browser network tab to debug
- Have mock data ready as backup

### If charts don't render:
- Refresh page
- Check console for errors
- Recharts needs valid data structure

---

## 📱 Mobile Demo Tip

The app is responsive, but demo on desktop for best experience (charts and split-screen layout).

---

## 🏆 Judging Criteria Alignment

✅ **Practical Scoring Design**: Color-coded SOP-based system  
✅ **Explainability**: Clear pass/fail on SOP checks  
✅ **Actionable Insights**: AI suggestions with specific examples  
✅ **Risk Prioritization**: Severity-based emergency queue  
✅ **Scalability**: React architecture ready for scale  
✅ **User Trust**: Transparent scoring, not black box

---

**Good luck with your hackathon presentation! 🚀**
