'use client';

import { useState, useEffect, useRef } from 'react';

interface TimerMode {
  minutes: number;
  label: string;
  color: string;
}

const TIMER_MODES: Record<string, TimerMode> = {
  pomodoro: { minutes: 25, label: 'Focus Time!', color: '#87ceeb' },
  short: { minutes: 5, label: 'Short Break', color: '#ffb5c5' },
  long: { minutes: 15, label: 'Long Break', color: '#b8a3d0' }
};

interface Stats {
  today: number;
  total: number;
  streak: number;
}

export default function TimerWindow() {
  const [currentMode, setCurrentMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.pomodoro.minutes * 60);
  const [totalTime, setTotalTime] = useState(timeLeft);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stats, setStats] = useState<Stats>({ today: 0, total: 0, streak: 0 });
  const [mushroomCapStyle, setMushroomCapStyle] = useState({});
  const [mushroomAnimation, setMushroomAnimation] = useState('bob 2s infinite ease-in-out');
  const [mouthStyle, setMouthStyle] = useState({});
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mushroomRef = useRef<HTMLDivElement>(null);

  // Initialize stats from localStorage
  useEffect(() => {
    const savedTotal = parseInt(localStorage.getItem('totalPomodoros') || '0');
    const savedStreak = parseInt(localStorage.getItem('streak') || '0');
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('lastDate');
    
    let todayCount = 0;
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

  // Update mushroom appearance based on mode
  const updateMushroom = () => {
    const mode = TIMER_MODES[currentMode];
    setMushroomCapStyle({
      background: `linear-gradient(180deg, ${mode.color} 0%, ${adjustColor(mode.color, -20)} 100%)`
    });
  };

  useEffect(() => {
    updateMushroom();
  }, [currentMode]);

  // Format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Create sparkle effect
  const createSparkle = () => {
    if (!mushroomRef.current) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 0.5 + 's';
    mushroomRef.current.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  };

  // Celebration animation
  const celebrate = () => {
    // Create sparkles
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        createSparkle();
      }, i * 100);
    }
    
    // Happy mushroom animation
    setMouthStyle({
      borderRadius: '15px 15px 0 0',
      borderBottom: 'none',
      borderTop: '3px solid #333'
    });
    
    setTimeout(() => {
      setMouthStyle({});
    }, 2000);
  };

  // Play notification sound
  const playNotification = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Complete timer
  const completeTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    
    // Update stats if it was a pomodoro
    if (currentMode === 'pomodoro') {
      const newStats = {
        today: stats.today + 1,
        total: stats.total + 1,
        streak: stats.streak + 1
      };
      setStats(newStats);
      localStorage.setItem('totalPomodoros', newStats.total.toString());
      localStorage.setItem('streak', newStats.streak.toString());
      
      // Celebration animation
      celebrate();
    }
    
    // Play notification sound
    playNotification();
    
    // Auto switch to break
    setTimeout(() => {
      let nextMode: string;
      if (currentMode === 'pomodoro') {
        nextMode = 'short';
      } else {
        nextMode = 'pomodoro';
      }
      
      setCurrentMode(nextMode);
      const newTime = TIMER_MODES[nextMode].minutes * 60;
      setTimeLeft(newTime);
      setTotalTime(newTime);
      setIsPaused(false);
      setMushroomAnimation('bob 2s infinite ease-in-out');
    }, 3000);
  };

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            completeTimer();
            return 0;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // Start timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      setMushroomAnimation('bob 1s infinite ease-in-out');
    }
  };

  // Pause timer
  const pauseTimer = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
      setMushroomAnimation('bob 2s infinite ease-in-out paused');
    } else if (isRunning && isPaused) {
      setIsPaused(false);
      setMushroomAnimation('bob 1s infinite ease-in-out');
    }
  };

  // Reset timer
  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    const newTime = TIMER_MODES[currentMode].minutes * 60;
    setTimeLeft(newTime);
    setTotalTime(newTime);
    setMushroomAnimation('bob 2s infinite ease-in-out');
    setMouthStyle({});
  };

  // Mode selection
  const selectMode = (mode: string) => {
    if (!isRunning) {
      setCurrentMode(mode);
      const newTime = TIMER_MODES[mode].minutes * 60;
      setTimeLeft(newTime);
      setTotalTime(newTime);
    }
  };

  // Calculate progress
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  // Get timer label
  const getTimerLabel = () => {
    if (isRunning && !isPaused) {
      return TIMER_MODES[currentMode].label;
    } else if (isPaused) {
      return 'Paused';
    } else if (timeLeft === 0) {
      return 'Complete! 🎉';
    } else {
      return 'Ready to focus!';
    }
  };

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
            <div className="mushroom-mouth" style={mouthStyle}></div>
          </div>
        </div>
      </div>
      
      <div className="mode-selector">
        <button 
          className={`mode-btn ${currentMode === 'pomodoro' ? 'active' : ''}`}
          onClick={() => selectMode('pomodoro')}
        >
          Work
        </button>
        <button 
          className={`mode-btn ${currentMode === 'short' ? 'active' : ''}`}
          onClick={() => selectMode('short')}
        >
          Short
        </button>
        <button 
          className={`mode-btn ${currentMode === 'long' ? 'active' : ''}`}
          onClick={() => selectMode('long')}
        >
          Long
        </button>
      </div>
      
      <div className="timer-display">
        <div className="timer-text">{formatTime(timeLeft)}</div>
        <div className="timer-label">{getTimerLabel()}</div>
      </div>
      
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="controls">
        {!isRunning ? (
          <button className="btn" onClick={startTimer}>Start</button>
        ) : (
          <button className="btn secondary" onClick={pauseTimer}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
        <button className="btn secondary" onClick={resetTimer}>Reset</button>
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
