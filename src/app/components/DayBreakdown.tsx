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

export default function DayBreakdown() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentActivityIndex, setCurrentActivityIndex] = useState(-1);

  // Convert time string to minutes
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Get current activity index
  const getCurrentActivityIndex = (): number => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (let i = 0; i < schedule.length; i++) {
      const activity = schedule[i];
      const startMinutes = timeToMinutes(activity.start);
      const endMinutes = timeToMinutes(activity.end);
      
      if (startMinutes <= currentMinutes && currentMinutes < endMinutes) {
        return i;
      }
    }
    
    return -1; // No current activity
  };

  // Check if activity is completed
  const isActivityCompleted = (activity: ScheduleActivity): boolean => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    const endMinutes = timeToMinutes(activity.end);
    return endMinutes <= currentMinutes;
  };

  // Update current time and activity
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      for (let i = 0; i < schedule.length; i++) {
        const activity = schedule[i];
        const startMinutes = timeToMinutes(activity.start);
        const endMinutes = timeToMinutes(activity.end);
        
        if (startMinutes <= currentMinutes && currentMinutes < endMinutes) {
          setCurrentActivityIndex(i);
          return;
        }
      }
      
      setCurrentActivityIndex(-1);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container day-breakdown-container">
      <div className="window-header">
        <div className="window-title">Day Breakdown</div>
        <div className="window-buttons">
          <div className="window-btn minimize"></div>
          <div className="window-btn maximize"></div>
          <div className="window-btn close"></div>
        </div>
      </div>
      
      <div className="breakdown-scroll">
        {schedule.map((activity, index) => {
          const isCurrent = index === currentActivityIndex;
          const isCompleted = isActivityCompleted(activity);
          const isPending = !isCompleted && !isCurrent;
          
          return (
            <div 
              key={index}
              className={`breakdown-item ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${isPending ? 'pending' : ''} ${activity.type}`}
            >
              <div className="breakdown-time">
                <span className="start-time">{activity.start}</span>
                <span className="time-separator">-</span>
                <span className="end-time">{activity.end}</span>
              </div>
              <div className="breakdown-content">
                <span className="breakdown-icon">{activity.icon}</span>
                <span className="breakdown-name">{activity.name}</span>
                {isCurrent && <span className="current-indicator">← NOW</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
