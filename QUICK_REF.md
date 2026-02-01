# QUICK REFERENCE CARD

## 🔥 INSTANT START
```bash
npm run dev
```
**Live at**: http://localhost:3000

---

## 🗺️ PAGE ROUTES

| Page | Route | Key Feature |
|------|-------|-------------|
| Landing | `/` | Google OAuth Login |
| India Map | `/dashboard` | Risk visualization |
| Leaderboard | `/leaderboard` | Agent rankings |
| City Insights | `/city-insights` | City-level data |
| Agent Stats | `/agent` | Performance metrics |
| Analysis Studio | `/analysis` | Call review |
| Emergency | `/emergency` | High-risk calls |

---

## 🎨 COLOR CODES

| Status | Color | SOP Score |
|--------|-------|-----------|
| 🟢 GREEN | #22c55e | > 0.4 (Healthy) |
| 🟡 YELLOW | #eab308 | 0.15-0.4 (Warning) |
| 🔴 RED | #ef4444 | < 0.15 (Critical) |

---

## 📡 API ENDPOINTS

```
BASE: https://hacksmart-backend.onrender.com

GET  /state-qa-data
GET  /city-qa-data/{city}
GET  /leaderboard
GET  /agent-performance/{agent}
GET  /worst-call/{agent}
GET  /emergency-calls
POST /submit-feedback
```

---

## 🔑 ENV VARIABLES

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 🚀 KEY FEATURES

✅ 100% call coverage  
✅ Real-time risk detection  
✅ AI-powered coaching  
✅ Multi-level insights  
✅ SOP verification  
✅ Synchronized playback  
✅ Emergency polling (10s)  
✅ Pop-up notifications

---

## 📊 COMPONENTS

**Charts**: Recharts  
**Icons**: Lucide React  
**Auth**: Supabase  
**HTTP**: Axios  
**Router**: React Router DOM

---

## 🎯 DEMO FLOW

1. Landing → Sign in
2. Dashboard → Show risk map
3. Click city → City insights
4. Leaderboard → Agent rankings
5. Click agent → View stats
6. Analysis Studio → Audio + SOP
7. Emergency → High-risk queue

**Time**: ~3-4 minutes

---

## 🐛 QUICK FIXES

**Server won't start?**
```bash
rm -rf node_modules
npm install
npm run dev
```

**Auth not working?**
- Check .env file exists
- Verify Supabase credentials
- Enable Google OAuth in Supabase

**API calls failing?**
- Check backend is running
- Verify network connectivity
- Check browser console for CORS

**Charts not rendering?**
- Refresh page
- Check data structure matches Recharts format
- Open console for errors

---

## 📱 BROWSER SUPPORT

✅ Chrome (Recommended)  
✅ Edge  
✅ Firefox  
⚠️ Safari (test audio)

---

## 💾 BUILD

**Dev**: `npm run dev`  
**Build**: `npm run build`  
**Preview**: `npm run preview`

---

## 📞 HELP

**Docs**: See IMPLEMENTATION_GUIDE.md  
**Demo**: See DEMO_GUIDE.md  
**Setup**: See README_PROJECT.md

---

**STATUS**: ✅ PRODUCTION READY  
**PORT**: 3000  
**VERSION**: 1.0.0
