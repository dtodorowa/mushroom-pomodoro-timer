'use client';

import { useState, useEffect, useRef } from 'react';

interface ScheduleActivity {
  start: string;
  end: string;
  type: string;
  name: string;
  icon: string;
}

const schedule: ScheduleActivity[] = [
  // Early Morning (6:00 - 8:10)
  { start: "06:00", end: "06:25", type: "pomodoro", name: "Morning Focus 1", icon: "🌅" },
  { start: "06:25", end: "06:30", type: "break", name: "Short Break", icon: "☕" },
  { start: "06:30", end: "06:55", type: "pomodoro", name: "Morning Focus 2", icon: "🌅" },
  { start: "06:55", end: "07:00", type: "break", name: "Short Break", icon: "☕" },
  
  // Pre-Work (7:00 - 10:20)
  { start: "07:00", end: "07:25", type: "pomodoro", name: "Morning Focus 3", icon: "🌅" },
  { start: "07:25", end: "07:30", type: "break", name: "Short Break", icon: "☕" },
  { start: "07:30", end: "07:55", type: "pomodoro", name: "Morning Focus 4", icon: "🌅" },
  { start: "07:55", end: "08:10", type: "break", name: "Long Break", icon: "🌸" },
  { start: "08:10", end: "08:35", type: "pomodoro", name: "Prep Focus 1", icon: "📚" },
  { start: "08:35", end: "08:40", type: "break", name: "Short Break", icon: "☕" },
  { start: "08:40", end: "09:05", type: "pomodoro", name: "Prep Focus 2", icon: "📚" },
  
  // Go to work
  { start: "09:05", end: "09:10", type: "break", name: "Short Break", icon: "☕" },
 
  // Work Morning (9:10 - 11:50)
  { start: "09:10", end: "09:35", type: "pomodoro", name: "Work Block 1", icon: "💼" },
  { start: "09:35", end: "09:40", type: "break", name: "Short Break", icon: "☕" },
  { start: "09:40", end: "10:05", type: "pomodoro", name: "Work Block 2", icon: "💼" },
  { start: "10:05", end: "10:20", type: "break", name: "Long Break", icon: "🌸" },
  
  { start: "10:20", end: "10:45", type: "pomodoro", name: "Work Block 3", icon: "💼" },
  { start: "10:45", end: "10:50", type: "break", name: "Short Break", icon: "☕" },
  { start: "10:50", end: "11:15", type: "pomodoro", name: "Work Block 4", icon: "💼" },
  { start: "11:15", end: "11:20", type: "break", name: "Short Break", icon: "☕" },
  { start: "11:20", end: "11:45", type: "pomodoro", name: "Work Block 5", icon: "💼" },
  { start: "11:45", end: "11:50", type: "break", name: "Short Break", icon: "☕" },
  
  // Lunch
  { start: "11:50", end: "12:15", type: "pomodoro", name: "Work Block 6", icon: "💼" },
  { start: "12:15", end: "12:30", type: "break", name: "Long Break", icon: "🌸" },
  { start: "12:30", end: "12:55", type: "pomodoro", name: "Work Block 7", icon: "💼" },
  { start: "12:55", end: "13:00", type: "break", name: "Short Break", icon: "☕" },
  
  // Work Afternoon (13:00 - 14:40)
  { start: "13:00", end: "13:25", type: "pomodoro", name: "Work Block 8", icon: "💼" },
  { start: "13:25", end: "13:30", type: "break", name: "Short Break", icon: "☕" },
  { start: "13:30", end: "13:55", type: "pomodoro", name: "Work Block 9", icon: "💼" },
  { start: "13:55", end: "14:00", type: "break", name: "Short Break", icon: "☕" },
  { start: "14:00", end: "14:25", type: "pomodoro", name: "Work Block 10", icon: "💼" },
  { start: "14:25", end: "14:40", type: "break", name: "Long Break", icon: "🌸" },
  
  // Work Late Afternoon (14:40 - 16:50)
  { start: "14:40", end: "15:05", type: "pomodoro", name: "Work Block 11", icon: "💼" },
  { start: "15:05", end: "15:10", type: "break", name: "Short Break", icon: "☕" },
  { start: "15:10", end: "15:35", type: "pomodoro", name: "Work Block 12", icon: "💼" },
  { start: "15:35", end: "15:40", type: "break", name: "Short Break", icon: "☕" },
  { start: "15:40", end: "16:05", type: "pomodoro", name: "Work Block 13", icon: "💼" },
  { start: "16:05", end: "16:10", type: "break", name: "Short Break", icon: "☕" },
  { start: "16:10", end: "16:35", type: "pomodoro", name: "Work Block 14", icon: "💼" },
  { start: "16:35", end: "16:50", type: "break", name: "Long Break", icon: "🌸" },
  { start: "16:50", end: "17:15", type: "pomodoro", name: "Work Block 15", icon: "💼" },
 
  // Work End + Personal (17:15 - 19:00)
  { start: "17:15", end: "17:20", type: "break", name: "Short Break", icon: "☕" },
  { start: "17:20", end: "17:45", type: "pomodoro", name: "Personal Block 1", icon: "✨" },
  { start: "17:45", end: "17:50", type: "break", name: "Short Break", icon: "☕" },
  { start: "17:50", end: "18:15", type: "pomodoro", name: "Personal Block 2", icon: "✨" },
  { start: "18:15", end: "18:20", type: "break", name: "Short Break", icon: "☕" },
  { start: "18:20", end: "18:45", type: "pomodoro", name: "Personal Block 3", icon: "✨" },
  { start: "18:45", end: "19:00", type: "break", name: "Long Break", icon: "🌸" },
  
  // Evening (19:00 - 21:10)
  { start: "19:00", end: "19:25", type: "pomodoro", name: "Evening Block 1", icon: "🌆" },
  { start: "19:25", end: "19:30", type: "break", name: "Short Break", icon: "☕" },
  { start: "19:30", end: "19:55", type: "pomodoro", name: "Evening Block 2", icon: "🌆" },
  { start: "19:55", end: "20:00", type: "break", name: "Short Break", icon: "☕" },
  { start: "20:00", end: "20:25", type: "pomodoro", name: "Evening Block 3", icon: "🌆" },
  { start: "20:25", end: "20:30", type: "break", name: "Short Break", icon: "☕" },
  { start: "20:30", end: "20:55", type: "pomodoro", name: "Evening Block 4", icon: "🌆" },
  { start: "20:55", end: "21:10", type: "break", name: "Long Break", icon: "🌸" },
  
  // Night (21:10 - 23:00)
  { start: "21:10", end: "21:35", type: "pomodoro", name: "Night Focus 1", icon: "🌙" },
  { start: "21:35", end: "21:40", type: "break", name: "Short Break", icon: "☕" },
  { start: "21:40", end: "22:05", type: "pomodoro", name: "Night Focus 2", icon: "🌙" },
  { start: "22:05", end: "22:10", type: "break", name: "Short Break", icon: "☕" },
  { start: "22:10", end: "22:35", type: "pomodoro", name: "Night Focus 3", icon: "🌙" },
  { start: "22:35", end: "22:40", type: "break", name: "Short Break", icon: "☕" },
  { start: "22:40", end: "23:05", type: "pomodoro", name: "Night Focus 4", icon: "🌙" },
  { start: "23:05", end: "06:00", type: "sleep", name: "Sleep", icon: "😴" }
];

interface Stats {
  today: number;
  total: number;
  streak: number;
}

export default function TimerWindow() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentActivity, setCurrentActivity] = useState<ScheduleActivity | null>(null);
  const [activityProgress, setActivityProgress] = useState({ percentage: 0, remaining: 0 });
  const [stats, setStats] = useState<Stats>({ today: 0, total: 0, streak: 0 });
  const [mushroomCapStyle, setMushroomCapStyle] = useState({});
  const [mushroomAnimation, setMushroomAnimation] = useState('bob 2s infinite ease-in-out');
  
  const mushroomRef = useRef<HTMLDivElement>(null);

  // Convert time string to minutes
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Get current activity
  const getCurrentActivity = (): ScheduleActivity => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (const activity of schedule) {
      const startMinutes = timeToMinutes(activity.start);
      const endMinutes = timeToMinutes(activity.end);
      
      if (startMinutes <= currentMinutes && currentMinutes < endMinutes) {
        return activity;
      }
    }
    
    // Default to sleep if nothing matches
    return schedule[schedule.length - 1];
  };

  // Calculate activity progress
  const getActivityProgress = (activity: ScheduleActivity) => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const startMinutes = timeToMinutes(activity.start);
    const endMinutes = timeToMinutes(activity.end);
    
    const elapsed = currentMinutes - startMinutes;
    const total = endMinutes - startMinutes;
    
    return {
      percentage: Math.min(100, Math.max(0, (elapsed / total) * 100)),
      remaining: Math.max(0, endMinutes - currentMinutes)
    };
  };

  // Count completed pomodoros for stats
  const getCompletedPomodoros = (): number => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    let completed = 0;
    
    for (const activity of schedule) {
      if (activity.type === 'pomodoro') {
        const endMinutes = timeToMinutes(activity.end);
        if (endMinutes <= currentMinutes) {
          completed++;
        }
      }
    }
    
    return completed;
  };

  // Initialize stats from localStorage
  useEffect(() => {
    const savedTotal = parseInt(localStorage.getItem('totalPomodoros') || '0');
    const savedStreak = parseInt(localStorage.getItem('streak') || '0');
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('lastDate');
    
    const todayCount = getCompletedPomodoros();
    let currentStreak = savedStreak;
    
    if (savedDate !== today) {
      localStorage.setItem('lastDate', today);
      if (savedDate && new Date(savedDate).getTime() < Date.now() - 86400000) {
        currentStreak = 0;
        localStorage.setItem('streak', '0');
      }
    }
    
    setStats({ today: todayCount, total: savedTotal, streak: currentStreak });
  }, []);

  // Helper function to adjust color brightness
  const adjustColor = (color: string, amount: number): string => {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Update mushroom appearance based on activity type
  const updateMushroom = (activity: ScheduleActivity) => {
    let color = '#87ceeb'; // default pomodoro color
    
    if (activity.type === 'break') {
      color = '#ffb5c5';
    } else if (activity.type === 'sleep') {
      color = '#b8a3d0';
    }
    
    setMushroomCapStyle({
      background: `linear-gradient(180deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`
    });
    
    // Set animation based on activity
    if (activity.type === 'pomodoro') {
      setMushroomAnimation('bob 1s infinite ease-in-out');
    } else {
      setMushroomAnimation('bob 2s infinite ease-in-out');
    }
  };

  // Format time remaining with seconds
  const formatTimeRemaining = (totalMinutes: number): string => {
    const totalSeconds = Math.floor(totalMinutes * 60);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update all dashboard data
  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      setCurrentTime(now);
      
      // Get current activity inline to avoid stale closure
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let current = schedule[schedule.length - 1]; // default to sleep
      
      for (const activity of schedule) {
        const startMinutes = timeToMinutes(activity.start);
        const endMinutes = timeToMinutes(activity.end);
        
        if (startMinutes <= currentMinutes && currentMinutes < endMinutes) {
          current = activity;
          break;
        }
      }
      
      // Calculate progress inline
      const startMinutes = timeToMinutes(current.start);
      const endMinutes = timeToMinutes(current.end);
      const elapsed = currentMinutes - startMinutes;
      const total = endMinutes - startMinutes;
      
      const progress = {
        percentage: Math.min(100, Math.max(0, (elapsed / total) * 100)),
        remaining: Math.max(0, endMinutes - currentMinutes)
      };
      
      // Count completed pomodoros inline
      let todayCount = 0;
      for (const activity of schedule) {
        if (activity.type === 'pomodoro') {
          const activityEndMinutes = timeToMinutes(activity.end);
          if (activityEndMinutes <= currentMinutes) {
            todayCount++;
          }
        }
      }
      
      setCurrentActivity(current);
      setActivityProgress(progress);
      setStats(prev => ({ ...prev, today: todayCount }));
      
      updateMushroom(current);
    };

    updateData();
    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="window-header">
        <div className="window-title">Pomodoro Timer</div>
        <div className="window-buttons">
          <div className="window-btn minimize"></div>
          <div className="window-btn maximize"></div>
          <div className="window-btn close"></div>
        </div>
      </div>
      
      <div className="mushroom-container" ref={mushroomRef}>
        <div className="mushroom" style={{ animation: mushroomAnimation }}>
          <div className="mushroom-cap" style={mushroomCapStyle}>
            <div className="mushroom-spots"></div>
          </div>
          <div className="mushroom-face">
            <div className="mushroom-eyes"></div>
            <div className="mushroom-mouth"></div>
          </div>
        </div>
      </div>
      
      <div className="mode-selector">
        <button 
          className={`mode-btn ${currentActivity?.type === 'pomodoro' ? 'active' : ''}`}
          disabled
        >
          Work
        </button>
        <button 
          className={`mode-btn ${currentActivity?.type === 'break' && currentActivity?.name.includes('Short') ? 'active' : ''}`}
          disabled
        >
          Short
        </button>
        <button 
          className={`mode-btn ${currentActivity?.type === 'break' && currentActivity?.name.includes('Long') ? 'active' : ''}`}
          disabled
        >
          Long
        </button>
      </div>
      
      <div className="timer-display">
        <div className="timer-text">{formatTimeRemaining(activityProgress.remaining)}</div>
        <div className="timer-label">{currentActivity?.name || 'Loading...'}</div>
      </div>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${activityProgress.percentage}%` }}></div>
      </div>
      
      <div className="controls">
        <button className="btn" disabled style={{ opacity: 0.6 }}>Auto Mode</button>
        <button className="btn secondary" disabled style={{ opacity: 0.6 }}>Synced</button>
      </div>
      
      <div className="stats">
        <div className="stat-item">
          <div className="stat-value">{stats.today}</div>
          <div className="stat-label">Today</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.streak}</div>
          <div className="stat-label">Streak</div>
        </div>
      </div>
    </div>
  );
}
