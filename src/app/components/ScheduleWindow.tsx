'use client';

import { useState, useEffect } from 'react';

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

export default function ScheduleWindow() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentActivity, setCurrentActivity] = useState<ScheduleActivity | null>(null);
  const [nextActivity, setNextActivity] = useState<ScheduleActivity | null>(null);
  const [activityProgress, setActivityProgress] = useState({ percentage: 0, remaining: 0 });
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [periodStats, setPeriodStats] = useState({ morning: 0, work: 0, evening: 0 });

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

  // Get next activity
  const getNextActivity = (): ScheduleActivity => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (let i = 0; i < schedule.length; i++) {
      const startMinutes = timeToMinutes(schedule[i].start);
      if (startMinutes > currentMinutes) {
        return schedule[i];
      }
    }
    
    // Return first activity of next day
    return schedule[0];
  };

  // Calculate time remaining
  const getTimeRemaining = (targetTime: string): string => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const targetMinutes = timeToMinutes(targetTime);
    
    let diff = targetMinutes - currentMinutes;
    if (diff < 0) diff += 1440; // Add 24 hours if next day
    
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
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

  // Count completed pomodoros
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

  // Calculate period stats
  const getPeriodStats = () => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    let morningCompleted = 0, workCompleted = 0, eveningCompleted = 0;
    
    schedule.forEach(activity => {
      if (activity.type === 'pomodoro' && timeToMinutes(activity.end) <= currentMinutes) {
        const startHour = parseInt(activity.start.split(':')[0]);
        if (startHour >= 6 && startHour < 9) {
          morningCompleted++;
        } else if ((startHour === 9 && parseInt(activity.start.split(':')[1]) >= 10) || (startHour > 9 && startHour < 17)) {
          workCompleted++;
        } else if (startHour === 16 && parseInt(activity.start.split(':')[1]) >= 50) {
          workCompleted++; // 16:50 block ends at 17:15
        } else if (startHour >= 17) {
          eveningCompleted++;
        }
      }
    });
    
    return { morning: morningCompleted, work: workCompleted, evening: eveningCompleted };
  };

  // Update all data
  const updateScheduleData = () => {
    const now = new Date();
    setCurrentTime(now);
    
    const current = getCurrentActivity();
    const next = getNextActivity();
    const progress = getActivityProgress(current);
    const completed = getCompletedPomodoros();
    const stats = getPeriodStats();
    
    setCurrentActivity(current);
    setNextActivity(next);
    setActivityProgress(progress);
    setCompletedPomodoros(completed);
    setPeriodStats(stats);
  };

  // Update every second
  useEffect(() => {
    const updateData = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const current = getCurrentActivity();
      const next = getNextActivity();
      const progress = getActivityProgress(current);
      const completed = getCompletedPomodoros();
      const stats = getPeriodStats();
      
      setCurrentActivity(current);
      setNextActivity(next);
      setActivityProgress(progress);
      setCompletedPomodoros(completed);
      setPeriodStats(stats);
    };

    updateData();
    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="window-header">
        <div className="window-title">Daily Schedule</div>
        <div className="window-buttons">
          <div className="window-btn minimize"></div>
          <div className="window-btn maximize"></div>
          <div className="window-btn close"></div>
        </div>
      </div>
      
      <div className="clock-display">
        <div className="digital-clock">
          {currentTime.toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          })}
        </div>
        <div className="date-display">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
      
      {currentActivity && (
        <div className="current-activity">
          <div className="activity-icon">{currentActivity.icon}</div>
          <div className="activity-label">Current Activity</div>
          <div className="activity-name">{currentActivity.name}</div>
          <div className="activity-progress">
            <div className="activity-progress-bar">
              <div 
                className="activity-progress-fill" 
                style={{ width: `${activityProgress.percentage}%` }}
              ></div>
            </div>
            <div className="activity-timer">
              {Math.floor(activityProgress.remaining)}:{Math.floor((activityProgress.remaining - Math.floor(activityProgress.remaining)) * 60).toString().padStart(2, '0')} left
            </div>
          </div>
        </div>
      )}
      
      {nextActivity && (
        <div className="next-activity">
          <div className="next-label">Next Up</div>
          <div className="next-name">{nextActivity.icon} {nextActivity.name}</div>
          <div className="next-time">in {getTimeRemaining(nextActivity.start)}</div>
        </div>
      )}
      
      <div className="day-progress">
        <div className="day-label">Day Progress</div>
        <div className="pomodoro-count">
          <span>{completedPomodoros}</span> / <span>32</span> pomodoros
        </div>
        <div className="day-progress-bar">
          <div 
            className="day-progress-fill" 
            style={{ width: `${(completedPomodoros / 32) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="schedule-stats">
        <div className="schedule-stat">
          <div className="schedule-icon">☀️</div>
          <div className="schedule-stat-value">{periodStats.morning}/6</div>
          <div className="schedule-stat-label">Morning</div>
        </div>
        <div className="schedule-stat">
          <div className="schedule-icon">🍽️</div>
          <div className="schedule-stat-value">{periodStats.work}/15</div>
          <div className="schedule-stat-label">Work</div>
        </div>
        <div className="schedule-stat">
          <div className="schedule-icon">🌙</div>
          <div className="schedule-stat-value">{periodStats.evening}/11</div>
          <div className="schedule-stat-label">Evening</div>
        </div>
      </div>
    </div>
  );
}
