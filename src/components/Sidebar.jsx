import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MapIcon, 
  TrophyIcon, 
  BuildingIcon, 
  UserIcon, 
  AlertTriangleIcon,
  LogOutIcon 
} from 'lucide-react';
import { supabase } from '../utils/supabase';
import logo from '../assets/logo.png';
import './Sidebar.css';

const Sidebar = () => {

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      // Clear any local storage
      localStorage.clear();
      sessionStorage.clear();
      // Force redirect to landing page
      window.location.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even if there's an error
      window.location.replace('/');
    }
  };

  const navItems = [
    { path: '/dashboard', icon: MapIcon, label: 'India Map' },
    { path: '/leaderboard', icon: TrophyIcon, label: 'Leaderboard' },
    { path: '/city-insights', icon: BuildingIcon,className: 'city-insights', label: 'City Wise Insights' },
    { path: '/agent', icon: UserIcon, label: 'Agent' },
    { path: '/emergency', icon: AlertTriangleIcon, label: 'Emergency Calls' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-background">
        <div className="bg-pattern"></div>
        <div className="bg-gradient"></div>
      </div>
      
      <div className="sidebar-content">
        <div className="sidebar-header">
          <img src={logo} alt="Uplink Logo" className="sidebar-logo" />
          <h1 className="sidebar-title">Uplink</h1>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="sidebar-icon" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOutIcon className="sidebar-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
