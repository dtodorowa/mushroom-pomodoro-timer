'use client';

import { useState, useEffect, useRef } from 'react';
import TimerWindow from './TimerWindow';
import ScheduleWindow from './ScheduleWindow';
import DayBreakdown from './DayBreakdown';
import './PomodoroTimer.css';

export default function PomodoroTimer() {
  return (
    <div className="pomodoro-app">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      {/* <TimerWindow /> */}
      <ScheduleWindow />
      <DayBreakdown />
    </div>
  );
}
